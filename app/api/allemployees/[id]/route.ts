import { connectToDB } from "@/lib/mongodb";
import Employee from "@/models/employeemodel";
import { Iparams } from "@/types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { parseArgs } from "util";

export async function PUT(req: NextRequest, { params }: { params: Iparams }) {
  const { id } = params;
  const {
    newName: name,
    newSurname: surname,
    newPassport: passport,
    newEmail: email,
  } = await req.json();

  if (mongoose.connection.readyState !== 1) {
    await connectToDB();
  }

  await Employee.findByIdAndUpdate(id, { name, surname, passport, email });

  return NextResponse.json(
    { message: `${name} details updated` },
    { status: 200 }
  );
}

export async function GET(req: NextRequest, { params }: { params: Iparams }) {
  const { id } = params;

  if (mongoose.connection.readyState !== 1) {
    await connectToDB();
  }

  const singleEmployee = await Employee.findOne({ _id: id });
  return NextResponse.json({ singleEmployee }, { status: 200 });
}
