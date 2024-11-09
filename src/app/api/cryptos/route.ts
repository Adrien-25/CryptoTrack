import { NextResponse } from 'next/server';
import { fetchCryptoData } from '@/app/lib/fetchCryptoData';

export async function GET() {
  try {
    const data = await fetchCryptoData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
