import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Member from "@/Models/Member";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const members = await Member.find({})
      .populate({
        path: "spousesIds",
        select:
          "fullName gender profilePic childrensIds address fatherId motherId",
        populate: [
          {
            path: "fatherId",
            select: "fullName _id",
          },
          {
            path: "motherId",
            select: "fullName _id",
          },
          {
            path: "childrensIds",
            select: "fullName _id profilePic gender",
          },
        ],
      })
      .populate({
        path: "childrensIds",
        select: "fullName",
      });

    // Safely populate fatherId and motherId only when they are valid ObjectIds
    const validFatherDocs = members.filter(
      (m) => m.fatherId && mongoose.isValidObjectId(m.fatherId),
    );
    if (validFatherDocs.length) {
      await Member.populate(validFatherDocs, {
        path: "fatherId",
        select: "fullName",
      });
    }

    const validMotherDocs = members.filter(
      (m) => m.motherId && mongoose.isValidObjectId(m.motherId),
    );
    if (validMotherDocs.length) {
      await Member.populate(validMotherDocs, {
        path: "motherId",
        select: "fullName",
      });
    }

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
  try {
    const memberData = await request.json();
    await dbConnect();

    // 1. Normalize fullName
    if (!memberData.fullName && memberData.name) {
      memberData.fullName = memberData.name.trim();
    }

    // 2. Normalize gender (handles react-select object or string)
    if (typeof memberData.gender === "object" && memberData.gender?.value) {
      memberData.gender = memberData.gender.value;
    }

    // 3. Normalize fatherId / motherId
    if (memberData.fatherId === "" || memberData.fatherId === undefined) {
      memberData.fatherId = null;
    }
    if (memberData.motherId === "" || memberData.motherId === undefined) {
      memberData.motherId = null;
    }

    // 4. Normalize isClanRoot
    memberData.isClanRoot = Boolean(memberData.isClanRoot);

    // 5. Normalize birth if sent as date/place/time
    if (!memberData.birth && (memberData.birthDate || memberData.birthPlace)) {
      let dateTime = null;
      if (memberData.birthDate) {
        const d = new Date(memberData.birthDate);
        if (memberData.birthTime) {
          const t = new Date(memberData.birthTime);
          d.setHours(t.getHours(), t.getMinutes(), t.getSeconds());
        }
        dateTime = d;
      }
      memberData.birth = {
        dateTime,
        place: memberData.birthPlace || "",
      };
    }

    // 6. Normalize address if presentAddress/permanentAddress are sent
    if (
      !memberData.address &&
      (memberData.presentAddress || memberData.permanentAddress)
    ) {
      memberData.address = {
        present: {
          village: memberData.presentAddress || "",
        },
        permanent: {
          village: memberData.permanentAddress || "",
        },
      };
    }

    const member = await Member.create(memberData);

    // If fatherId is a valid ObjectId, push to father's childrensIds
    if (member.fatherId && mongoose.isValidObjectId(member.fatherId)) {
      await Member.findByIdAndUpdate(member.fatherId, {
        $addToSet: { childrensIds: member._id },
      });
    }

    // If motherId is a valid ObjectId, push to mother's childrensIds
    if (member.motherId && mongoose.isValidObjectId(member.motherId)) {
      await Member.findByIdAndUpdate(member.motherId, {
        $addToSet: { childrensIds: member._id },
      });
    }

    return NextResponse.json(
      {
        message: "Member created successfully",
        data: member,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.name === "ValidationError" ? 400 : 500 },
    );
  }
};
