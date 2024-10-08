import { NextRequest, NextResponse } from 'next/server';
import { RetrievalQAChain } from "langchain/chains";

let chain: RetrievalQAChain | null = null;

async function fetchChain(): Promise<RetrievalQAChain> {
  if (!chain) {
    const res = await fetch('http://localhost:3000/src/app/api/load-chain');
    const data = await res.json();
    if (data.success) {
      chain = data.chain as RetrievalQAChain;
    } else {
      throw new Error(data.error);
    }
  }
  if (!chain) {
    throw new Error("Chain is not initialized");
  }
  return chain;
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  try {
    const chain = await fetchChain();
    if (!chain) {
      throw new Error("Chain is not available");
    }
    const response = await chain.call({ query });
    return NextResponse.json({ question: query, answer: response.text });
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching answer from chain:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
}
