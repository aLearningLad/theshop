import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import { Iparams } from "@/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Iparams }) {
  const { id } = params;

  if (mongoose.connection.readyState !== 1) {
    await connectToDB();
  }

  const singleEmployee = await Employee.findOne({ email: id });
  console.log("This is the employee with payslip:", singleEmployee);
  return NextResponse.json({ singleEmployee }, { status: 200 });
}
