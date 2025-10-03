import { NextResponse } from "next/server";
import { getAvailableYears } from "@/lib/race-data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const years = await getAvailableYears(params.id);
    return NextResponse.json({ years });
  } catch (error) {
    console.error("Error fetching years:", error);
    return NextResponse.json({ years: [] }, { status: 500 });
  }
}

