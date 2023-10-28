require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const OpenAI = require("openai");
const apiKey = process.env.APIKEY;
const bodyParser = require("body-parser");


const openai = new OpenAI({
  apiKey: apiKey,
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("frontend"));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Content Generation" });
});
app.post("/generate-text", async (req, res) => {
  try {
    // Retrieve user-provided code and target language from the request
    const { prompt } = req.body;

    // Use the openai library to send a prompt to GPT-3 for code conversion
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Act as content creator",
        },
        {
          role: "user",
          content: `Generate creative and contextually relevant text for the following topic: "${prompt}". Produce complete sentences. If the text is too long, prioritize finishing the current sentence before starting a new one.`,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });

    // Extract the converted code from the GPT-3 response
    const generatedText = response.choices[0].message.content;
    console.log(generatedText);

    // Send the converted code back to the frontend
    res.json({ generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Text generation failed", message: error });
  }
});

app.post("/summarize-text", async (req, res) => {
  try {
    const { textToSummarize } = req.body;

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Act as content creator",
        },
        {
          role: "user",
          content: `Summarize the following text: "${textToSummarize}". Ensure that the summary consists of complete sentences and captures the key information.`,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });
    const summarizedText = response.choices[0].message.content;
    res.json({ summarizedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Text summarization failed" });
  }
});

app.post("/translate-text", async (req, res) => {
  try {
    const { textToTranslate, targetLanguage } = req.body;

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Act as Translator. Who is proficient in every language. Who has great knowledge about all the languages in the world.Always print complete sentences",
        },
        {
          role: "user",
          content: `Act as a translator proficient in every language and possessing extensive knowledge of all languages in the world. Translate the following text to "${targetLanguage}": "${textToTranslate}". Ensure that the translation is in the form of complete and grammatically correct sentences.`,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });
    const translatedText = response.choices[0].message.content;
    res.json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Text translation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
