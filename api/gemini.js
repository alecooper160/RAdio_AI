export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY; // Aquí Vercel leerá la llave en secreto
  const { model, contents, generationConfig } = req.body;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, generationConfig })
  });

  const data = await response.json();
  res.status(200).json(data);
}
