import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GENERATIVE_API_KEY;
if (!apiKey) {
  console.error("API key is missing! Please set VITE_GENERATIVE_API_KEY in your .env file at the project root.");
}

// No need for fs, using Blob instead
import mime from "mime-types";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const candidates = result.response.candidates;


        for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
            for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
                const part = candidates[candidate_index].content.parts[part_index];
                if (part.inlineData) {
                    try {
                        const extension = mime.extension(part.inlineData.mimeType) || "txt";
                        const filename = `output_${candidate_index}_${part_index}.${extension}`;
                        const blob = new Blob([Buffer.from(part.inlineData.data, "base64")], { type: part.inlineData.mimeType });

                        // Creating a download link
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        console.log(`Output written to: ${filename}`);
                    } catch (err) {
                        console.error("Error writing file:", err);
                    }
                }
            }
        }
        console.log(result.response.text());
        return result.response.text();
    } catch (err) {
        console.error("Error during the chat session:", err);
    }
}

export default run;
