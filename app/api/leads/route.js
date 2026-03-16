import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  const result = await pool.query(
    "SELECT * FROM leads ORDER BY created_at DESC"
  );

  return NextResponse.json(result.rows);
}

export async function POST(req) {

  const body = await req.json();

  const result = await pool.query(
    "INSERT INTO leads (name,phone,source) VALUES ($1,$2,$3) RETURNING *",
    [body.name, body.phone, body.source]
  );

  return NextResponse.json(result.rows[0]);
}
