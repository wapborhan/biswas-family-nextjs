import MembarCard from "./shared/MembarCard";

const Members = ({ members, isLoading }) => {
  const hasMembers = Array.isArray(members) && members.length > 0;
  return (
    <div className="row row--25 mt_md--10 mt_sm--10">
      {/* 🔄 Loading */}
      {isLoading && (
        <div className="col-12 text-center">
          <h4>লোড হচ্ছে...</h4>
        </div>
      )}

      {/* ❌ No members */}
      {!isLoading && !hasMembers && (
        <div className="col-12 text-center">
          <h4 className="text-black">কোনো সদস্য পাওয়া যায়নি</h4>
        </div>
      )}

      {/* ✅ Members list */}
      {hasMembers &&
        members.map((member, idx) => <MembarCard member={member} key={idx} />)}
    </div>
  );
};

export default Members;
