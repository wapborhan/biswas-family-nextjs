import DashCard from "@/components/shared/DashCard";
import { fetchMembers } from "@/lib/fetchMembers";

const page = async () => {
  const members = await fetchMembers();
  const biswasMembers = members
    ? members.filter((member) => member.isClanRoot === true)
    : [];

  return (
    <>
      <div id="client" className="rn-client-area rn-client-style-2 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                data-aos-once="true"
                className="section-title text-center aos-init aos-animate"
              >
                <span className="subtitle">সদস্য</span>
                <h2 className="title">ড্যাশবোর্ড</h2>
              </div>
              <div className="skill-style-1">
                <div className="client-card">
                  <DashCard
                    count={
                      biswasMembers.filter((member) => member.gender === "male")
                        .length
                    }
                    title="ছেলে সদস্য"
                  />
                  <DashCard
                    count={
                      biswasMembers.filter(
                        (member) => member.gender === "female",
                      ).length
                    }
                    title="মেয়ে সদস্য"
                  />
                  <DashCard count={biswasMembers.length} title="মোট সদস্য" />
                  <DashCard
                    count={
                      members.filter((member) => member.isClanRoot === false)
                        .length
                    }
                    title="যুক্ত সদস্য"
                  />

                  <DashCard count={members.length} title="সর্বমোট সদস্য" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
