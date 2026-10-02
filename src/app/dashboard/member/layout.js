import UpdateSidebar from "./UpdateSidebar";

const layout = ({ children }) => {
  return (
    <div className="rn-service-area mt--50">
      <div className="container ">
        <div className="section-title text-center">
          <h2 className="title">সদস্য তথ্য আপডেট ফর্ম</h2>
        </div>
        <div className="rwt-dynamic-form mt-5 form-wrap">
          <div className="row">
            <div className="col-lg-3">
              <UpdateSidebar />
            </div>
            <div className="col-lg-9">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
