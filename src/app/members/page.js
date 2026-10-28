import { Suspense } from "react";
import MembarCard from "@/components/shared/MembarCard";
import { fetchMembers } from "@/lib/fetchMembers";

export const metadata = {
  title: "পরিবারের সদস্য - বিশ্বাস বংশ",
  description: "বিশ্বাস বংশের সকল সদস্যদের তালিকা",
};

// 🔄 Loading Skeleton / Spinner
function MembersLoading() {
  return (
    <div className="col-12 text-center py-5">
      <div
        className="spinner-border text-primary mb-3"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">লোড হচ্ছে...</span>
      </div>
      <h4 className="text-muted">ডাটাবেজ থেকে সদস্যদের তথ্য লোড হচ্ছে...</h4>
    </div>
  );
}

// 📦 Async Member List component that loads from database
async function MembersList() {
  const members = await fetchMembers();
  const hasMembers = Array.isArray(members) && members.length > 0;

  if (!hasMembers) {
    return (
      <div className="col-12 text-center py-5">
        <h4 className="text-black">কোনো সদস্য পাওয়া যায়নি</h4>
      </div>
    );
  }

  return (
    <>
      {members.map((member, idx) => (
        <MembarCard member={member} key={member._id || idx} />
      ))}
    </>
  );
}

export default function MembersPage() {
  return (
    <div
      className="rn-service-area rn-section-gap section-separator"
      id="features"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="section-title text-center aos-init aos-animate pt--40"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay="100"
              data-aos-once="true"
            >
              <span className="subtitle">বিশ্বাস বংশের</span>
              <h2 className="title">সদস্যবৃন্দ</h2>
            </div>
          </div>
        </div>

        {/* 👥 Members Grid with Async Loading */}
        <div className="row row--25 mt_md--10 mt_sm--10">
          <Suspense fallback={<MembersLoading />}>
            <MembersList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
