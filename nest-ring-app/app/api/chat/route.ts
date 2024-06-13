import { OpenAI } from "openai"
// import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = 'edge' // Provide optimal infrastructure for our API route

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
    const { messages } = await request.json()

    console.log(messages);
    
    // createChatCompletion (get response from GPT-4)
    // const response = await openai.createChatCompletion({
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',        
        messages: [
            { 
                role: "system", 
                content: "You are a helpful assistant. You explain the users their general questions regarding food ordering and events creation that are a part of a food ordering application. Your replies are under 200 characters."
            },
            ...messages,
        ], 
        stream: true,
        temperature: 1,
    })

    // create a stream of data from OpenAI (stream data to frontend)
    const stream = await OpenAIStream(response);

    // send the stream as a response to the client/frontend
    return  new StreamingTextResponse(stream);
} 