import mongoose from "mongoose";
const { Schema } = mongoose;

/* ================= Occupation ================= */
const OccupationSchema = new Schema(
  {
    title: { type: String, trim: true },
    organization: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
  },
  { _id: false },
);

/* ================= Reward ================= */
const RewardSchema = new Schema(
  {
    title: { type: String, trim: true },
    year: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false },
);

/* ================= Education ================= */
const EducationSchema = new Schema(
  {
    level: {
      type: String,
      enum: ["primary", "secondary", "higher-secondary", "university"],
      required: true,
    },
    institute: { type: String, trim: true },
    passingYear: { type: String, trim: true },
  },
  { _id: false },
);

/* ================= Member ================= */
const MemberSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },

    fatherId: {
      type: Schema.Types.Mixed,
      ref: "Member",
      default: null,
    },

    motherId: {
      type: Schema.Types.Mixed,
      ref: "Member",
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    bloodGroup: {
      type: String,
      trim: true,
    },

    /* ================= Life Events ================= */
    birth: {
      dateTime: { type: Date, default: null },
      place: { type: String, trim: true },
    },

    wedding: {
      dateTime: { type: Date, default: null },
      place: { type: String, trim: true },
      spouseId: {
        type: Schema.Types.ObjectId,
        ref: "Member",
        default: null,
      },
    },

    death: {
      isDeceased: { type: Boolean, default: false },
      dateTime: { type: Date, default: null },
      place: { type: String, trim: true },
      burialPlace: { type: String, trim: true },
    },

    address: {
      present: {
        village: String,
        postOffice: String,
        policeStation: String,
        district: String,
        division: String,
        country: { type: String, default: "Bangladesh" },
        postalCode: String,
      },
      permanent: {
        village: String,
        postOffice: String,
        policeStation: String,
        district: String,
        division: String,
        country: { type: String, default: "Bangladesh" },
        postalCode: String,
      },
    },

    education: [EducationSchema],

    occupations: [OccupationSchema],

    rewards: [RewardSchema],

    spousesIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],

    childrensIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],

    pictures: [
      {
        url: { type: String, trim: true },
        caption: { type: String, trim: true },
      },
    ],

    profilePic: { type: String, trim: true },

    contact: {
      mobileNo: { type: String, trim: true },
      whatsapp: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      website: { type: String, trim: true },
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

// ✅ Clear stale model cache on reload so schema updates take effect immediately
if (mongoose.models.Member) {
  delete mongoose.models.Member;
}

const Member = mongoose.model("Member", MemberSchema);

export default Member;
