import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (mongoose.connection.readyState === 1) {
    try {
      const employeedata = await Employee.find();
      console.log(`Fetched all leave applications: ${employeedata}`);
      return NextResponse.json({ employeedata }, { status: 200 });
    } catch (error) {
      console.log(`Error fetching leave applications: ${error}`);
      return NextResponse.json(
        `This error occured while fetching leave applications: ${error}`
      );
    }
  } else {
    await connectToDB();
    try {
      const employeedata = await Employee.find();
      console.log(`Fetched all leave applications: ${employeedata}`);
      return NextResponse.json({ employeedata }, { status: 200 });
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

  await Employee.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Employee successfully deregistered" },
    { status: 200 }
  );
}
