import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  const result = await pool.query(
    "SELECT * FROM clinics ORDER BY id DESC"
  );

  return NextResponse.json(result.rows);
}

export async function POST(req) {

  const body = await req.json();

  const result = await pool.query(
    "INSERT INTO clinics (name,email,status) VALUES ($1,$2,$3) RETURNING *",
    [body.name, body.email, "active"]
  );

  return NextResponse.json(result.rows[0]);
}
