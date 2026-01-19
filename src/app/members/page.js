import Members from "@/components/Members";
import { fetchMembers } from "@/lib/fetchMembers";

const page = async ({}) => {
  const biswasFamilyMember = await fetchMembers();

  return (
    <div>
      <Members members={biswasFamilyMember} />
    </div>
  );
};

export default page;
