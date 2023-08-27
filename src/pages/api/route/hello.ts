import { Data } from "@/data";
import { NextResponse } from "next/server";

export default function handler(req:any, res:any) {
    const allData = Data;
    res.status(200).json(allData);
}

export async function POST(req:any, res:any) {
    
    try {
        const data = await req.json();         
        return NextResponse.json({ result: 'created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
