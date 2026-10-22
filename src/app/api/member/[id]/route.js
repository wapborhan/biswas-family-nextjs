import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Member from "@/Models/Member";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  // ✅ Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid member id" }, { status: 400 });
  }

  try {
    await dbConnect();

    const member = await Member.findById(id)
      .populate("spousesIds", "fullName ")
      .populate("childrensIds", "fullName");

    if (member?.fatherId && mongoose.isValidObjectId(member.fatherId)) {
      await Member.populate(member, { path: "fatherId", select: "fullName" });
    }
    if (member?.motherId && mongoose.isValidObjectId(member.motherId)) {
      await Member.populate(member, { path: "motherId", select: "fullName" });
    }

    if (!member) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: 200,
        data: member,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  const { id } = await params;

  // ✅ Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid member id" }, { status: 400 });
  }

  try {
    await dbConnect();
    const updateData = await req.json();

    const member = await Member.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!member) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Member updated successfully",
      status: 200,
      data: member,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
