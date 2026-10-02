import Members from "@/components/Members";
import { fetchMembers } from "@/lib/fetchMembers";

const page = async () => {
  const members = await fetchMembers();
  return (
    <>
      <div
        className="rn-service-area rn-section-gap section-separator"
        id="features"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="section-title text-center aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay="100"
                data-aos-once="true"
              >
                <span className="subtitle">বিশ্বাস বংশের </span>
                <h2 className="title"> সদস্য</h2>
              </div>
            </div>
          </div>
          <Members members={members} />
        </div>
      </div>
    </>
  );
};

export default page;
