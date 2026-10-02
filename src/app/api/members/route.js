import dbConnect from "@/lib/dbConnect";
import Member from "@/Models/Member";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const members = await Member.find({})
      .populate("fatherId", "name")
      .populate("motherId", "name")
      .populate("spouseIds", "name")
      .populate("childrenIds", "name");

    if (!members.length) {
      return NextResponse.json(
        { message: "No records found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: `${members.length} records found`,
      status: 200,
      data: members,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const POST = async (request) => {
  const memberData = await request.json();

  try {
    await dbConnect();

    const member = await Member.create(memberData);

    return NextResponse.json({
      message: `Member created successfully`,
      status: 200,
      data: member,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
