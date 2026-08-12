import { generateText } from 'ai'
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

  const conversationHistory: any[] = []

  while (true) {
    const userInput = await ask('You: ')

    if (userInput.toLowerCase() === 'exit') {
      console.log('Goodbye!')
      rl.close()
      break
    }

    conversationHistory.push({
      role: 'user',
      content: userInput
    })

    console.log('Agent: Thinking...')

    const { text } = await generateText({
      model: google('gemini-3.5-flash'),
      instructions: 'You are a helpful AI assistant. Be concise and friendly.',
      messages: conversationHistory
    })

    console.log(`Agent: ${text}\n`)

    conversationHistory.push({
      role: 'assistant',
      content: text
    })
  }
}

main()