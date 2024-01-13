import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (mongoose.connection.readyState === 1) {
    } else {
      await connectToDB();
      const { email } = await req.json();
      const user = await Employee.findOne({ email }).select("_id");
      console.log(`this user exists in DB: ${user}`);
      return NextResponse.json({ user });
    }
  } catch (error) {
    console.log(`Error validating user: ${error}`);
  }
}
