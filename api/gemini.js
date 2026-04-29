export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { model, contents, generationConfig } = req.body;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig })
    });

    const data = await response.json();

    // Si Google nos da un error, lo mandamos a la consola para saber qué es
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error de conexión con el servidor" });
  }
}
