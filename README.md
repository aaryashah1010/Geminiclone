
# Gemini AI Chat Application

This project is built using React with Vite and integrates the Gemini AI service via GoogleGenerativeAI. It demonstrates how to initiate a chat session with the Gemini model, process inline data (like downloadable file outputs), and handle responses.

## Features

- **Chat Integration:** Connects to the Gemini AI model to send prompts and receive responses.
- **File Handling:** Processes inline data (encoded in Base64) and converts it into downloadable files.
- **Environment Configuration:** Uses a `.env` file for storing sensitive configuration data such as API keys.
- **Modern Tooling:** Built with React and bundled with Vite for fast development and build performance.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/gemini-ai-chat.git
   cd gemini-ai-chat
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

This project uses a `.env` file located in the root of the project to store environment variables such as your API key. **Note:** The `.env` file is ignored by Git (thanks to the `.gitignore` configuration), so it will not be committed to the repository. This helps keep your sensitive information secure.

### Setting Up the `.env` File

1. **Create a `.env` file** in the root directory of your project if it doesn't exist.
2. **Add your environment variables**. For example:

   ```env
   VITE_GENERATIVE_API_KEY=your_api_key_here
   ```

3. **Usage in Code**

   In your React (client-side) code, access the variable like so:

   ```js
   const apiKey = import.meta.env.VITE_GENERATIVE_API_KEY || "";
   ```

   This leverages Vite’s environment variable system, which exposes variables prefixed with `VITE_` to the client code.

## Running the Application

Start the development server with:

```bash
npm run dev
# or
yarn dev
```

Then open your browser and navigate to the URL provided by Vite (typically `http://localhost:3000`).

## Building for Production

To create an optimized production build, run:

```bash
npm run build
# or
yarn build
```

## Usage

Once the application is running:
- Use the chat interface to send prompts to the Gemini AI model.
- The application processes responses, converting inline data into downloadable files automatically.
- Check the browser’s console for logs regarding file outputs and other debugging information.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
