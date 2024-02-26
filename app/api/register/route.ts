import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      surname,
      email,
      password,
      day,
      month,
      role,
      moreInfo,
      leaveStatus,
      passport,
      isApplied,
      leaveDays,
      remainingDays,
    } = await req.json();

    const securePassword = await bcrypt.hash(password, 10);
    if (mongoose.connection.readyState === 1) {
      const res = await Employee.create({
        name,
        surname,
        email,
        password: securePassword,
        day,
        month,
        role,
        moreInfo,
        leaveStatus,
        passport,
        isApplied,
        leaveDays,
        remainingDays,
      });
      if (res.ok) {
        console.log(`${name} added to DB`);
      } else {
        console.log(`Unable to register ${name}`);
      }
      return NextResponse.json(
        { message: "Successfully registered" },
        { status: 201 }
      );
    } else {
      await connectToDB();
      const res = await Employee.create({
        name,
        surname,
        email,
        password,
        day,
        month,
        role,
        moreInfo,
        leaveStatus,
        isApplied,
        leaveDays,
        remainingDays,
      });

      if (res.ok) {
        console.log(`${name} added to DB`);
      } else {
        console.log(`Unable to register ${name}`);
      }
      return NextResponse.json(
        { message: "Successfully registered" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(`Unable to register new employee: ${error}`);
    return NextResponse.json(
      { message: `This error occured: ${error}` },
      { status: 500 }
    );
  }
}
