import React from "react";

const AddMemberPage = () => {
  return (
    <div
      className="rn-service-area rn-section-gap section-separator"
      id="features"
    >
      <div className="container">
        <div className="section-title text-center">
          <span className="subtitle">বিশ্বাস বংশের</span>
          <h2 className="title">সদস্য যুক্ত করুণ</h2>
        </div>

        <form className="row rwt-dynamic-form mt-5 form-wrap p-5">
          {/* BASIC INFO */}
          <div className="col-12">
            <h4 className="mb-3">Basic Information</h4>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label>Name</label>
              <input name="name" className="form-control" type="text" />
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label>Father ID</label>
              <input name="fatherId" className="form-control" type="number" />
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label>Mother ID</label>
              <input name="motherId" className="form-control" type="number" />
            </div>
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" className="form-control">
                <option value="">Select</option>
                <option value="male">পুরুষ</option>
                <option value="female">মহিলা</option>
              </select>
            </div>
          </div>

          {/* BIRTH */}
          <div className="col-12">
            <h4 className="mt-4 mb-3">Birth Information</h4>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Birth Date</label>
              <input name="birth.date" type="date" className="form-control" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Birth Time</label>
              <input name="birth.time" type="time" className="form-control" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Birth Place</label>
              <input name="birth.place" type="text" className="form-control" />
            </div>
          </div>

          {/* WEDDING */}
          <div className="col-12">
            <h4 className="mt-4 mb-3">Wedding Information</h4>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Wedding Date</label>
              <input name="weeding.date" type="date" className="form-control" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Wedding Time</label>
              <input name="weeding.time" type="time" className="form-control" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Wedding Place</label>
              <input
                name="weeding.place"
                type="text"
                className="form-control"
              />
            </div>
          </div>

          {/* DEATH */}
          <div className="col-12">
            <h4 className="mt-4 mb-3">Death Information</h4>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Death Date</label>
              <input name="death.date" type="date" className="form-control" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Death Time</label>
              <input name="death.time" type="time" className="form-control" />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="form-group">
              <label>Death Place</label>
              <input name="death.place" type="text" className="form-control" />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="col-12">
            <h4 className="mt-4 mb-3">Address</h4>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <label>Present Address</label>
              <input
                name="presentAddress"
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group">
              <label>Permanent Address</label>
              <input
                name="permanentAddress"
                type="text"
                className="form-control"
              />
            </div>
          </div>

          {/* EDUCATION */}
          <div className="col-12">
            <h4 className="mt-4 mb-3">Education</h4>
          </div>

          <div className="col-lg-3">
            <label>Primary School</label>
            <input name="education.primarySchool" className="form-control" />
          </div>

          <div className="col-lg-3">
            <label>Secondary School</label>
            <input name="education.secondarySchool" className="form-control" />
          </div>

          <div className="col-lg-3">
            <label>Higher Secondary</label>
            <input
              name="education.higherSecondarySchool"
              className="form-control"
            />
          </div>

          <div className="col-lg-3">
            <label>University</label>
            <input name="education.university" className="form-control" />
          </div>

          {/* OCCUPATION */}
          <div className="col-12">
            <h4 className="mt-4 mb-3">Occupation</h4>
          </div>

          <div className="col-lg-4">
            <label>Title</label>
            <input name="occupation[0].title" className="form-control" />
          </div>

          <div className="col-lg-4">
            <label>Organization</label>
            <input name="occupation[0].organization" className="form-control" />
          </div>

          <div className="col-lg-4">
            <label>Location</label>
            <input name="occupation[0].location" className="form-control" />
          </div>

          {/* CONTACT */}
          <div className="col-12">
            <h4 className="mt-4 mb-3">Contact</h4>
          </div>

          <div className="col-lg-4">
            <label>Mobile Number</label>
            <input
              name="contact.mobileNo"
              className="form-control"
              type="text"
            />
          </div>

          <div className="col-lg-4">
            <label>WhatsApp</label>
            <input
              name="contact.whatsapp"
              className="form-control"
              type="text"
            />
          </div>

          <div className="col-lg-4">
            <label>Email</label>
            <input name="contact.email" className="form-control" type="email" />
          </div>

          {/* SOCIAL */}
          <div className="col-lg-4">
            <label>Facebook</label>
            <input name="contact.facebook" className="form-control" />
          </div>

          <div className="col-lg-4">
            <label>Instagram</label>
            <input name="contact.instagram" className="form-control" />
          </div>

          <div className="col-lg-4">
            <label>LinkedIn</label>
            <input name="contact.linkedin" className="form-control" />
          </div>

          {/* BUTTON */}
          <div className="col-12 mt-5">
            <button type="submit" className="rn-btn">
              <span>Submit Member</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberPage;
