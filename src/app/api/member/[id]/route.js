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
      .populate("fatherId", "name")
      .populate("motherId", "name")
      .populate("spouseIds", "name")
      .populate("childrenIds", "name");

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
