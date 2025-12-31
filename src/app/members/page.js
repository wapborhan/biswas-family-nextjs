import { familyMember } from "@/assets/data/nodes";
import Members from "@/components/Members";
import { fetchMembers } from "@/lib/fetchMembers";
import React from "react";

const page = async ({}) => {
  const biswasFamilyMember = await fetchMembers();
  console.log(biswasFamilyMember);

  // const biswasFamilyMember = familyMember.filter(
  //   (member) => member.isClanRoot === true
  // );
  return (
    <div>
      <Members members={biswasFamilyMember} />
    </div>
  );
};

export default page;
