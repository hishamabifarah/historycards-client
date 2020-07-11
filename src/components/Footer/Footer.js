import React from "react";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome";
// import faCompass from "@fortawesome/fontawesome-free-solid";
// import faPhone from "@fortawesome/fontawesome-free-solid";
// import faClock from "@fortawesome/fontawesome-free-solid";
// import faEnvelope from "@fortawesome/fontawesome-free-solid";

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">Waves</div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                {/* <FontAwesomeIcon icon="compass" className="icon" /> */}
                <div className="nfo">
                  <div>Address</div>
                  <div>123 Main St</div>
                </div>
              </div>
              <div className="tag">
                {/* <FontAwesomeIcon icon="phone" className="icon" /> */}
                <div className="nfo">
                  <div>Phone</div>
                  <div>123-123-4567</div>
                </div>
              </div>
              <div className="tag">
                {/* <FontAwesomeIcon icon="clock" className="icon" /> */}
                <div className="nfo">
                  <div>Hours</div>
                  <div>9am - 5pm</div>
                </div>
              </div>
              <div className="tag">
                {/* <FontAwesomeIcon icon="envelope" className="icon" /> */}
                <div className="nfo">
                  <div>Email</div>
                  <div>info@waves.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be The First To Know</h2>
            <div>Lorem Ipsum</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;