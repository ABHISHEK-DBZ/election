import { NextResponse } from 'next/server';
import { isValidInput } from '@/utils/sanitize';

const CIVIC_API_KEY = process.env.GOOGLE_CIVIC_API_KEY || '';

/**
 * GET handler for Google Civic Information API (Representatives).
 * Secured on the server to prevent exposing the API key.
 * 
 * @param {Request} req - The incoming Next.js request object.
 * @returns {Promise<NextResponse>} - The JSON response containing civic data.
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (!isValidInput(address)) {
      return NextResponse.json({ error: 'Valid address is required.' }, { status: 400 });
    }

    if (!CIVIC_API_KEY) {
      // Return mock data for hackathon demonstration if API key is missing
      const mockData = {
        offices: [
          { name: 'Governor', officialIndices: [0] },
          { name: 'U.S. Senator', officialIndices: [1, 2] },
          { name: 'Mayor', officialIndices: [3] }
        ],
        officials: [
          { name: 'Jane Doe', party: 'Democratic Party', phones: ['(555) 123-4567'], urls: ['https://example.com'] },
          { name: 'John Smith', party: 'Republican Party', phones: ['(555) 987-6543'], urls: ['https://example.com'] },
          { name: 'Alice Johnson', party: 'Democratic Party', phones: ['(555) 555-5555'], urls: ['https://example.com'] },
          { name: 'Bob Brown', party: 'Nonpartisan', phones: ['(555) 111-2222'], urls: ['https://example.com'] }
        ]
      };
      
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json(mockData);
    }

    const endpoint = `https://www.googleapis.com/civicinfo/v2/representatives?key=${CIVIC_API_KEY}&address=${encodeURIComponent(address)}`;
    
    const response = await fetch(endpoint, { method: 'GET' });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Failed to fetch civic data.', details: errorData }, { status: response.status });
    }

    const data = await response.json();

    // We can return the full data and let the client process it
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ 
      error: "An unexpected error occurred while looking up your representatives." 
    }, { status: 500 });
  }
}
