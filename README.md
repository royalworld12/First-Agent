# 🤖 My First AI Agent

A simple interactive AI agent built with **TypeScript**, **Vercel AI SDK**, and **Google Gemini**.

The project runs directly in the terminal and demonstrates some core AI-agent concepts, including system instructions, conversation history, streaming responses, and chat commands.

## ✨ Features

* 🤖 AI assistant powered by Google Gemini
* 🧠 Maintains conversation history
* 🎭 Customizable AI personality using system instructions
* ⚡ Streams responses token-by-token instead of waiting for the complete response
* 🔄 `/reset` command to clear conversation history
* 🚪 `exit` command to quit the application
* 🔌 Designed to experiment with different AI models and providers
* 🔐 API keys stored securely using environment variables

## 🛠️ Tech Stack

* **TypeScript**
* **Node.js**
* **Vercel AI SDK**
* **Google Gemini**
* **dotenv**
* **readline**

## 📁 Project Structure

```text
my-first-agent/
├── agent.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd my-first-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

Create a `.env` file in the project root:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

You can use `.env.example` as a template.

> ⚠️ Never commit your `.env` file or expose your API key publicly.

### 4. Run the agent

```bash
npx tsx agent.ts
```

You should see:

```text
🤖 AI Agent Started.
Type /reset to clear the conversation.
Type exit to quit.

You:
```

## 💬 Example

```text
🤖 AI Agent Started.
Type /reset to clear the conversation.
Type exit to quit.

You: What is TypeScript?

Agent: TypeScript is a strongly typed programming language
that builds on JavaScript. It helps developers catch
errors during development and makes large applications
easier to maintain.

You: What is an interface?

Agent: An interface in TypeScript defines the structure
that an object should follow...

You: /reset

🔄 Chat history reset!

You: What is JavaScript?

Agent: JavaScript is a programming language commonly used
to build interactive web applications...
```

## 🎭 AI Personality

The agent's personality is controlled through the AI SDK's `instructions` option:

```ts
instructions: `
  You are a helpful AI programming assistant.
  Be concise, friendly, and explain programming concepts clearly.
`
```

You can experiment with different personalities.

For example:

```ts
instructions: `
  You are a strict programming mentor.
  Point out mistakes clearly and explain how to improve them.
`
```

Or:

```ts
instructions: `
  You are a cheerful programming tutor.
  Explain difficult concepts using simple examples.
`
```

## ⚡ Streaming Responses

Instead of waiting for the complete response, the agent uses `streamText()` to display the response as it is generated:

```ts
const result = streamText({
  model: google('gemini-3.5-flash'),
  instructions: 'You are a helpful AI programming assistant.',
  messages: conversationHistory
})

let assistantResponse = ''

for await (const chunk of result.textStream) {
  process.stdout.write(chunk)
  assistantResponse += chunk
}
```

This creates a more responsive chat experience.

## 🔄 Commands

| Command  | Description                             |
| -------- | --------------------------------------- |
| `/reset` | Clears the current conversation history |
| `exit`   | Exits the application                   |

### Reset conversation

```text
You: /reset

🔄 Chat history reset!
```

After `/reset`, the agent starts a new conversation without the previous messages.

## 🧠 Conversation History

The agent stores user and assistant messages in memory:

```text
User message
     ↓
Conversation History
     ↓
Google Gemini
     ↓
Assistant response
     ↓
Conversation History
```

This allows the model to understand previous messages during the current session.

The conversation history is stored only in memory and is lost when the application exits.

## 🔌 Experimenting With Different Models

The project uses Google Gemini by default:

```ts
model: google('gemini-3.5-flash')
```

You can experiment with other models and providers supported by the Vercel AI SDK.

For example, to use Anthropic models, install the provider:

```bash
npm install @ai-sdk/anthropic
```

Then import it:

```ts
import { anthropic } from '@ai-sdk/anthropic'
```

And change the model:

```ts
model: anthropic('claude-sonnet-4-5')
```

You'll also need the appropriate API key in `.env`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

This makes it easy to compare how different models respond to the same prompts.

## 🔐 Environment Variables

The project uses environment variables for API credentials.

| Variable                       | Description                        |
| ------------------------------ | ---------------------------------- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Generative AI API key       |
| `ANTHROPIC_API_KEY`            | Anthropic API key, if using Claude |

Keep these values inside `.env`.

The `.env` file should **not** be committed to Git.

Example `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
```

## 📚 What I Learned

This project is designed as a learning project for understanding the fundamentals of building AI-powered applications.

Key concepts explored:

* Using the Vercel AI SDK
* Connecting an application to an LLM
* System-level instructions
* Maintaining conversation history
* Streaming model responses
* Handling terminal input with Node.js
* Implementing application commands
* Switching between AI providers and models
* Managing API keys with environment variables

## 🚀 Future Improvements

Possible next steps:

* [ ] Replace `any[]` with proper TypeScript message types
* [ ] Add better error handling
* [ ] Add loading/status indicators
* [ ] Add model selection from the terminal
* [ ] Add persistent conversation storage
* [ ] Add tool/function calling
* [ ] Add web search
* [ ] Add autonomous agent capabilities
* [ ] Build a web interface
* [ ] Add conversation export
* [ ] Add support for multiple conversations

## 📄 License

This project is open source and available under the MIT License.
