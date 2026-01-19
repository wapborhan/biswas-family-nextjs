import mongoose from "mongoose";
const { Schema } = mongoose;

const OccupationSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    organization: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String },
    endDate: { type: String },
  },
  { _id: false },
);

const RewardSchema = new mongoose.Schema(
  {
    title: { type: String },
    year: { type: String },
    description: { type: String },
  },
  { _id: false },
);

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    fatherId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },

    motherId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    birth: {
      date: String,
      time: String,
      place: String,
    },

    weeding: {
      date: String,
      time: String,
      place: String,
    },

    death: {
      date: String,
      time: String,
      place: String,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    address: {
      presentAddress: String,
      permanentAddress: String,
    },

    education: {
      primarySchool: String,
      secondarySchool: String,
      higherSecondarySchool: String,
      university: String,
    },

    occupation: [OccupationSchema],

    rewards: [RewardSchema],

    spousesIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],

    childrensId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],

    pictures: {
      type: String,
      default: "",
    },

    contact: {
      mobileNo: String,
      whatsapp: String,
      email: String,
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      website: String,
    },

    isClanRoot: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Prevent model overwrite in Next.js
const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);

export default Member;
