export default function Footer() {
  const d = new Date();
  return (
    <div className="rn-footer-area rn-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-area text-center">
              <div className="logo">
                <a>
                  <img
                    src="https://www.wapborhan.com/_next/image?url=%2Fwb-logo.png&w=640&q=75"
                    alt="logo"
                  />
                </a>
              </div>
              <p className="description mt--30">
                © {d.getFullYear()}. All rights reserved | Designer{" "}
                <a target="_blank" href="https://wapborhan.com">
                  Borhan Uddin
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
