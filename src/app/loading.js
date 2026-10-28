export default function Loading() {
  return (
    <div
      className="rn-service-area rn-section-gap section-separator d-flex justify-content-center align-items-center"
      id="features"
      style={{
        height: "100vh",
        weight: "100vw",
      }}
    >
      <div className="container">
        <div className="row row--25 mt_md--10 mt_sm--10">
          <div className="col-12 text-center py-5">
            <div
              className="spinner-border text-danger mb-3"
              role="status"
              style={{ width: "8rem", height: "8rem", borderWidth: "8px" }}
            >
              <span className="visually-hidden">লোড হচ্ছে...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
