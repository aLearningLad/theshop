import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import leaveapplication from "@/models/leavemodel";
import { Iparams } from "@/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Iparams }) {
  const { id } = params; //REMEMBER, THIS IS THE LEAVE APPLICATION ID, NOT THE EMPLOYEE'S "USER" ID!
  const { leaveStatus, leaveLength, email } = await req.json();

  try {
    if (mongoose.connection.readyState !== 1) {
      await connectToDB();
    }

    const leaveApp = await leaveapplication.findById(id);

    const employee = await Employee.findOneAndUpdate(email);
    if (!employee) {
      return NextResponse.json(
        {
          message: `Employee not found with email: ${email}`,
        },
        { status: 404 }
      );
    }

    const updatedRemainingDays = employee.remainingDays - leaveLength;
    if (updatedRemainingDays < 0) {
      return NextResponse.json(
        {
          message: `Insufficient remaining leave days for employee: ${employee.name}`,
        },
        { status: 400 }
      );
    }

    await Employee.findOneAndUpdate(
      { email },
      { $set: { remainingDays: updatedRemainingDays } },
      { new: true }
    );

    await leaveapplication.findByIdAndUpdate(
      id,
      { $set: { leaveStatus } },
      { new: true }
    );

    console.log(`${id} leave approved`);

    return NextResponse.json(
      {
        message: `Leave application of id: ${id} approved! Remaining leave days for ${employee.name}: ${updatedRemainingDays}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(`this error occured while approving leave: ${error}`);

    return NextResponse.json(
      {
        message: `Error updating leave application of id: ${id}`,
      },
      { status: 500 }
    );
  }
}
