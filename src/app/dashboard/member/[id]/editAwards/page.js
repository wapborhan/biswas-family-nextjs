import dbConnect from "@/lib/dbConnect";
import Member from "@/Models/Member";
import mongoose from "mongoose";
import Link from "next/link";
import EditAwardsForm from "./EditAwardsForm";

export const metadata = {
  title: "পুরস্কার ও অর্জন আপডেট",
};

const EditMemberAwardsPage = async ({ params }) => {
  const { id } = await params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div className="p-4 text-center">
        <h5 className="text-danger">অবৈধ সদস্য আইডি</h5>
        <Link href="/dashboard/members" className="btn btn-sm btn-primary mt-3">
          সদস্য তালিকায় ফিরে যান
        </Link>
      </div>
    );
  }

  await dbConnect();
  const member = await Member.findById(id).lean();

  if (!member) {
    return (
      <div className="p-4 text-center">
        <h5 className="text-danger">সদস্য পাওয়া যায়নি</h5>
        <Link href="/dashboard/members" className="btn btn-sm btn-primary mt-3">
          সদস্য তালিকায় ফিরে যান
        </Link>
      </div>
    );
  }

  const serializedMember = JSON.parse(JSON.stringify(member));

  return <EditAwardsForm member={serializedMember} />;
};

export default EditMemberAwardsPage;
