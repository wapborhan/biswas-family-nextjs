import { familyMember } from "@/assets/data/nodes";
import Members from "@/components/Members";
import React from "react";

const page = () => {
  const biswasFamilyMember = familyMember.filter(
    (member) => member.isClanRoot === true
  );
  return (
    <div>
      <Members members={biswasFamilyMember} />
    </div>
  );
};

export default page;
