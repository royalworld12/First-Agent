import { generateText, streamText } from 'ai'
import { google } from '@ai-sdk/google'
import * as dotenv from 'dotenv'
import * as readline from 'readline'

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve)
  })
}

async function main() {
  console.log('🤖 AI Agent Started. Type "exit" to quit.\n')

  let conversationHistory: any[] = []

  while (true) {
    const userInput = await ask('You: ')

    if (userInput.toLowerCase() === 'exit') {
      console.log('Goodbye!')
      rl.close()
      break
    }

     // Reset command
    if (userInput.toLowerCase() === '/reset') {
      conversationHistory = []
      console.log('🔄 Chat history reset!\n')
      continue
    }

    conversationHistory.push({
      role: 'user',
      content: userInput
    })

    console.log('Agent: Thinking...')

    const result = await streamText({
      model: google('gemini-3.5-flash'),
        instructions: `
        You are a helpful AI programming assistant.
        Be concise, friendly, and explain programming concepts clearly.
       and friendly.`,
      messages: conversationHistory
    })

    // Collect streamed response
    let assistantResponse = ''

    for await (const chunk of result.textStream) {
      process.stdout.write(chunk)
      assistantResponse += chunk
    }

    console.log('\n')

    conversationHistory.push({
      role: 'assistant',
      content: assistantResponse
    })
  }
}

main()