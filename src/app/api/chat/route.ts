import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { isValidInput } from '@/utils/sanitize';

/**
 * Initialize Google Generative AI with API Key from environment.
 */
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERAI_API_KEY || '' });

/**
 * Interface for the expected incoming request body.
 * 
 * @interface ChatRequestBody
 */
interface ChatRequestBody {
  /** The natural language message or question from the user. */
  message: string;
}

/**
 * POST handler for "Ballot Buddy" chatbot queries using Google Gemini API.
 * This route is secured on the server to prevent exposing sensitive API keys to the client.
 * It enforces strict non-partisan responses and sanitizes input to ensure high code quality.
 * 
 * @async
 * @function POST
 * @param {Request} req - The incoming Next.js request object containing the user query.
 * @returns {Promise<NextResponse>} - A JSON response containing the AI-generated reply or an error message.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: ChatRequestBody = await req.json();
    const { message } = body;

    if (!isValidInput(message)) {
      return NextResponse.json({ error: 'Invalid message provided.' }, { status: 400 });
    }

    /**
     * The system prompt designed to keep the assistant neutral and focused on civics.
     */
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
    // Graceful error handling for systems robustness
    return NextResponse.json({ 
      response: "An error occurred while connecting to the election database. Please try again later." 
    }, { status: 500 });
  }
}
