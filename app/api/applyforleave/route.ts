import { connectToDB } from "@/lib/mongodb";
import leaveapplication from "@/models/leavemodel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      surname,
      role,
      email,
      startDay,
      startMonth,
      untilDay,
      untilMonth,
      leaveType,
      leaveStatus,
      sickNote,
      isApplied,
      leaveLength,
    } = await req.json();

    console.log(`User applying is named ${name}`);

    if (mongoose.connection.readyState === 1) {
      const res = await leaveapplication.create({
        name,
        surname,
        role,
        email,
        startDay,
        startMonth,
        untilDay,
        untilMonth,
        leaveType,
        leaveStatus,
        sickNote,
        isApplied,
        leaveLength,
      });
      if (res.ok) {
        console.log(`Leave application by ${name} added to DB`);
      } else {
        console.log(`Unable to log leave application by ${name}`);
        console.log(`This is leavelength: ${leaveLength}`);
      }
      return NextResponse.json(
        {
          message: "Leave application successful",
        },
        { status: 201 }
      );
    } else {
      await connectToDB();
      const res = await leaveapplication.create({
        name,
        surname,
        role,
        email,
        startDay,
        startMonth,
        untilDay,
        untilMonth,
        leaveType,
        leaveStatus,
        sickNote,
        isApplied,
        leaveLength,
      });
      if (res.ok) {
        console.log(`Leave application by ${name} added to DB`);
      } else {
        console.log(`Unable to log leave application by ${name}`);
      }
      return NextResponse.json(
        {
          message: "Leave application successful",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(`Unable to log leave application by user. Error is: ${error}`);
    return NextResponse.json(
      { message: `This error occured: ${error}` },
      { status: 500 }
    );
  }
}
