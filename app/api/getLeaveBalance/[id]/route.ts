import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: any }) {
  const email = params.params.id;

  try {
    if (mongoose.connection.readyState === 1) {
      const currentEmployee = await Employee.findOne({
        email,
      });
      if (currentEmployee) {
        console.log(`Employee found!`);
        return NextResponse.json({ currentEmployee }, { status: 200 });
      } else {
        console.log(`Employee not found!`);
        return NextResponse.json("Employee not found");
      }
    } else {
      await connectToDB();

      const currentEmployee = await Employee.findOne({
        email,
      });
      return NextResponse.json({ currentEmployee }, { status: 200 });
    }
  } catch (error) {
    console.log(
      `This error occured while fetching employee leave balance: ${error}`
    );
    return NextResponse.json(`This error occured: ${error}`);
  }
}
