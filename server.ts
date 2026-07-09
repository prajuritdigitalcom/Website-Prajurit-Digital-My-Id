import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_LINTING",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: '10mb' }));

  // API: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API: Google Keyword Suggest Scraper
  app.get("/api/keyword-suggest", async (req, res) => {
    try {
      const q = req.query.q as string;
      if (!q) {
        return res.status(400).json({ error: "Query parameter 'q' is required." });
      }

      // Query Google Suggest API (chrome client format returns clean suggestions array)
      const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(q)}&hl=id`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Google suggest service returned status ${response.status}`);
      }

      const data = await response.json();
      // Data format: [query, [suggestions], [descriptions], ...]
      const suggestions = data[1] || [];
      res.json({ suggestions });
    } catch (error: any) {
      console.error("Error fetching Google Suggest keywords:", error);
      res.status(500).json({ error: error.message || "Failed to fetch keyword suggestions." });
    }
  });

  // API: AI Product Description Rewriter (Gemini 3.5 Flash)
  app.post("/api/rewrite-description", async (req, res) => {
    try {
      const { description, tone, length, platform } = req.body;
      if (!description) {
        return res.status(400).json({ error: "Description is required." });
      }

      const ai = getGeminiClient();
      const prompt = `
Anda adalah seorang Copywriter Profesional dan Ahli SEO E-commerce.
Tugas Anda adalah menulis ulang (rewrite) deskripsi produk berikut agar menjadi jauh lebih menarik, persuasif, memiliki nilai jual tinggi, SEO-friendly, dan dioptimasi khusus untuk platform ${platform || "Umum"}.

Ketentuan:
- Nada bicara (Tone): ${tone || "Profesional & Persuasif"}
- Panjang tulisan: ${length || "Sedang"}
- Platform target: ${platform || "Umum"}

Struktur tulisan yang diinginkan:
1. Headline menarik yang membuat penasaran atau langsung memberikan solusi.
2. Deskripsi singkat produk dan mengapa produk ini penting (USP/Unique Selling Proposition).
3. Daftar fitur utama dan keuntungannya (gunakan bullet points dengan emoji yang sesuai).
4. Cara pemakaian atau detail spesifikasi produk jika relevan.
5. Call to Action (CTA) yang kuat untuk mendorong pembelian.

Deskripsi Produk Asli:
"""
${description}
"""

Tuliskan hasil rewrite yang rapi dengan format markdown yang indah, menarik, dan siap pakai. Jangan sertakan teks penjelasan lainnya selain hasil rewrite deskripsi produk itu sendiri.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const rewrittenText = response.text || "";
      res.json({ rewrittenText });
    } catch (error: any) {
      console.error("Error rewriting product description:", error);
      res.status(500).json({ error: error.message || "Failed to rewrite description." });
    }
  });

  // API: AI Image Generator (Gemini 3.1 Flash Lite Image)
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      const ai = getGeminiClient();
      console.log(`Generating image with prompt: "${prompt}" and aspect ratio: "${aspectRatio || '1:1'}"`);

      // Using gemini-3.1-flash-lite-image as the default image generation model
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-image",
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio || "1:1",
          }
        }
      });

      let base64Image = "";
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }
      }

      if (!base64Image) {
        throw new Error("No image data returned from Gemini image generation model.");
      }

      res.json({ image: `data:image/png;base64,${base64Image}` });
    } catch (error: any) {
      console.error("Error generating AI image:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI image." });
    }
  });

  // Vite middleware setup for development, or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Prajurit Digital Tools v2 server running on port ${PORT}`);
  });
}

startServer();
