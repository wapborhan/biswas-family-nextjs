export default function Loading() {
  return (
    <div
      className="rn-service-area rn-section-gap section-separator"
      id="features"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center pt--40">
              <span className="subtitle">বিশ্বাস বংশের</span>
              <h2 className="title">সদস্যবৃন্দ</h2>
            </div>
          </div>
        </div>

        <div className="row row--25 mt_md--10 mt_sm--10">
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
        </div>
      </div>
    </div>
  );
}
