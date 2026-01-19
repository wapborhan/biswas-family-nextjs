import { fetchMembers } from "@/lib/fetchMembers";
import Form from "./Form";

const AddMemberPage = async () => {
  const members = await fetchMembers();
  const malemembers =
    members && members.filter((member) => member.gender === "male");

  return (
    <div className="rn-service-area rn-section-gap section-separator">
      <div className="container">
        <div className="section-title text-center">
          <span className="subtitle">বিশ্বাস বংশের</span>
          <h2 className="title">সদস্য যুক্ত ফর্ম</h2>
        </div>
        <Form malemembers={malemembers} />
      </div>
    </div>
  );
};

export default AddMemberPage;
