import { connectToDB } from "@/lib/mongodb";
import leaveapplication from "@/models/leavemodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (mongoose.connection.readyState === 1) {
    try {
      const leaveapplications = await leaveapplication.find();
      console.log(`Fetched all leave applications: ${leaveapplications}`);
      return NextResponse.json({ leaveapplications }, { status: 200 });
    } catch (error) {
      console.log(`Error fetching leave applications: ${error}`);
      return NextResponse.json(
        `This error occured while fetching leave applications: ${error}`
      );
    }
  } else {
    await connectToDB();
    try {
      const leaveapplications = await leaveapplication.find();
      console.log(`Fetched all leave applications: ${leaveapplications}`);
      return NextResponse.json({ leaveapplications }, { status: 200 });
    } catch (error) {
      console.log(`Error fetching leave applications: ${error}`);
      return NextResponse.json(
        `This error occured while fetching leave applications: ${error}`
      );
    }
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (mongoose.connection.readyState !== 1) {
    await connectToDB();
  }
  await leaveapplication.findByIdAndDelete(id);
  return NextResponse.json(
    { message: `Leave application with ID: ${id} deleted` },
    { status: 200 }
  );
}
