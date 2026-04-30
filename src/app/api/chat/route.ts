import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { isValidInput } from '@/utils/sanitize';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERAI_API_KEY || '' });

/**
 * POST handler for "Ballot Buddy" chatbot queries using Gemini API.
 * Secured on the server to prevent exposing the API key.
 * 
 * @param {Request} req - The incoming Next.js request object.
 * @returns {Promise<NextResponse>} - The JSON response containing the AI reply.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { message } = await req.json();

    if (!isValidInput(message)) {
      return NextResponse.json({ error: 'Invalid message provided.' }, { status: 400 });
    }

    const prompt = `You are Ballot Buddy, a neutral, highly trustworthy, and concise election assistant. 
    Explain the following election concept, proposition, or question simply and non-partisanly. 
    If the question is completely unrelated to elections, civics, or voting, politely decline to answer.
    Question: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    const reply = response.text || "I'm having trouble retrieving an answer right now.";

    return NextResponse.json({ response: reply });
  } catch (error) {
    // Zero console.logs allowed, so we just return a generic 500 error.
    return NextResponse.json({ 
      response: "An error occurred while connecting to the election database. Please try again later." 
    }, { status: 500 });
  }
}
