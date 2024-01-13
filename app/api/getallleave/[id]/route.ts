import { connectToDB } from "@/lib/mongodb";
import leaveapplication from "@/models/leavemodel";
import { Iparams } from "@/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Iparams }) {
  const { id } = params;
  const { leaveStatus } = await req.json();

  try {
    if (mongoose.connection.readyState !== 1) {
      await connectToDB();
    }

    await leaveapplication.findByIdAndUpdate(
      id,
      { $set: { leaveStatus } },
      { new: true }
    );

    console.log(`${id} leave approved`);

    return NextResponse.json(
      {
        message: `Leave application of id: ${id} approved!`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: `Error updating leave application of id: ${id}`,
      },
      { status: 500 }
    );
  }
}
