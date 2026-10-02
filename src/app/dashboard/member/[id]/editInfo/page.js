import { fetchMembers } from "@/lib/fetchMembers";
import EditInfo from "./EditInfo";

const EditMemberPage = async ({ params }) => {
  const { id } = await params;
  const members = await fetchMembers();

  const malemembers = members
    ? members?.filter((member) => member.gender === "male")
    : [];

  return (
    <>
      <EditInfo members={members} malemembers={malemembers} />
    </>
  );
};

export default EditMemberPage;
