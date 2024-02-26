import { connectToDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import Employee from "@/models/employeemodel";
import { NextResponse } from "next/server";

export default async function getLeaveBalance(
  email: string | null | undefined
) {
  try {
    if (mongoose.connection.readyState === 1) {
      const currentEmployee = await Employee.findOne({
        email,
      });
      if (currentEmployee) {
        console.log("employee found");
      }
      return NextResponse.json({ currentEmployee }, { status: 200 });
    } else {
      await connectToDB();

      const currentEmployee = await Employee.findOne({
        email,
      });
      console.log("employee found");
      return NextResponse.json({ currentEmployee }, { status: 200 });
    }
  } catch (error) {
    console.log(`This error occured trying to fetch employee: ${error}`);
    return NextResponse.json(`This error occured: ${error}`);
  }
}
