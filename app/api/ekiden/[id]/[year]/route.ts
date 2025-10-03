import { NextResponse } from "next/server";
import { getRaceData } from "@/lib/race-data";

export async function GET(
  request: Request,
  { params }: { params: { id: string; year: string } }
) {
  try {
    const year = parseInt(params.year, 10);
    if (isNaN(year)) {
      return NextResponse.json(
        { error: "Invalid year" },
        { status: 400 }
      );
    }

    const data = await getRaceData(params.id, year);
    
    if (!data) {
      return NextResponse.json(
        { error: "Data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching race data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

