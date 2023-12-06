import React from "react";
import logo from "../assets/TT_Logo_Design.png";
import laptop from "../assets/laptop.png";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/SignUpTutor");
  };

  const navigateToSignUpStudent = () => {
    navigate("/SignUpStudent");
  };

  const navigateToLogin = () => {
    navigate("/Login");
  };

  const navigateToContact = () => {
    navigate("/Contact");
  };

  const navigateToHome = () => {
    navigate("/Home");
  };

  const pageStyle = {
    background: "#F1EFEF",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const serviceId = "service_dz0xhzf";
    const templateId = "template_kxj0eqi";
    const userId = "cWti8bd46sTP6-Sgr";

    emailjs
      .send(serviceId, templateId, { name, email, message }, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });

    alert("Email Sent!");
  };

  return (
    <div style={pageStyle}>
      <div className="flex-container">
        <img className="logo-top" src={logo} onClick={navigateToHome} />
        <div className="link-row">
          <a href="#">
            <p onClick={navigateToLogin}>Log in</p>
          </a>
          <a href="#">
            <p onClick={navigateToContact}>Contact</p>
          </a>
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-container-bottom">
          <img className="img-laptop" src={laptop}></img>
        </div>
        <div class="flex-container-bottom">
          <p class="header-text-home">Don't hesitate to contact us!</p>
          <p class="header-text-des-contact">We want to hear from you!</p>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <form onSubmit={handleSubmit}>
            <div class="input">
              <input
                type="text"
                class="input-txt"
                name="name"
                placeholder="name"
              ></input>
            </div>
            <br></br>
            <br></br>
            <div class="input">
              <input
                type="email"
                class="input-txt"
                name="email"
                placeholder="email"
              ></input>
            </div>

            <br></br>
            <br></br>

            <div class="input">
              <textarea
                class="textbox"
                name="message"
                placeholder="message"
              ></textarea>
            </div>

            <br></br>
            <br></br>

            <div className="input">
              <button type="submit" className="submit-button">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
