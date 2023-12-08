import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Sidebar from "../components/sidebar";
import LogoutButton from "../components/LogoutButton";
import { fetchFromAPI, sendAPIPatchRequest } from "../services/api";
import Layout from "../components/Layout";
import edit from "../assets/edit.png";

function ProfileSettings(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("sampleemail@gmail.com");
  const [editedEmail, setEditedEmail] = useState("");
  const [phone, setPhone] = useState(4445559999);
  const [bio, setBio] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [renderData, setData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchFromAPI(`${user.accountType}/${user.username}`)
      .then((data) => {
        const render_data = Object.entries(data).map(([key, value]) => ({
          key,
          firstName: value.firstName,
          lastName: value.lastName,
          middleName: value.middleName,
          password: value.password,
          userId: value.userId,
          userName: value.userName,
          courses: value.courses,
          phone: value.phone,
          email: value.email,
          major: value.major,
          hours: value.hours,
          longBio: value.longBio,
        }));
        setEditedEmail(render_data.email);
        setEditedPhone(render_data.phone);
        setEditedBio(renderData.longBio);
        setData(render_data[0]);
      })
      .catch((error) => {
        setData({
          firstName: "Loading...",
          lastName: "Loading...",
          middleName: null,
          password: "Loading...",
          userId: "Loading...",
          userName: "Loading...",
          courses: [],
          phone: "Loading...",
          email: "Loading...",
          major: "Loading...",
          hours: null,
          longBio: null,
        });
        console.log(error);
      });
  }, []);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEmail(editedEmail);
    setPhone(editedPhone);
    setBio(editedBio);

    sendAPIPatchRequest(`${user.accountType}/${user.username}`, {
      email: editedEmail,
      phone: editedPhone,
      longBio: editedBio,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (field, event) => {
    switch (field) {
      case "editedEmail":
        setEditedEmail(event.target.value);
        break;
      case "editedPhone":
        setEditedPhone(event.target.value);
        break;
      case "editedBio":
        setEditedBio(event.target.value);
        break;
      default:
        break;
    }
  };

  const excludedFields = [
    "password",
    "userId",
    "firstName",
    "middleName",
    "lastName",
    "key",
  ];

  return (
    <Layout>
      <div className="profile_page">
        <div className="profile_settings">
          <div className="profile_info">
            <div className="bio_photo">
              <img src="https://picsum.photos/400/400" alt="Profile" />
            </div>
            <div className="profile_details">
              <p className="header-name-ps">
                {renderData.firstName + " " + renderData.lastName}
                <img src={edit} className="edit-ps"/>
              </p>
              {Object.entries(renderData).map(
                ([field, value]) =>
                  !excludedFields.includes(field) &&
                  value != null && (
                    <div key={field}>
                      <h4 className="bio_h4">
                        <span className="header-text-ps">{field}: </span>
                        {Array.isArray(value) ? value.join(", ") : value}
                      </h4>
                    </div>
                  )
              )}
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div className="editFields">
            <form className="settingsForm">
              <label htmlFor="email" className="label-ps">
                My email address
              </label>
              <br></br>
              {isEditing ? (
                <input
                  className="input-ps"
                  placeholder="hi"
                  type="email"
                  id="emailInput"
                  value={editedEmail}
                  onChange={(e) => handleInputChange("editedEmail", e)}
                />
              ) : (
                <span className="readOnly" id="emailDisplay">
                  {renderData.email}
                </span>
              )}

              <br></br>
              <br></br>
              <br></br>

              <label htmlFor="phone" className="label-ps">
                My phone number
              </label>
              <br></br>
              {isEditing ? (
                <input
                  className="input-ps"
                  type="tel"
                  placeholder="hi"
                  id="phoneInput"
                  value={editedPhone}
                  onChange={(e) => handleInputChange("editedPhone", e)}
                />
              ) : (
                <span className="readOnly" id="phoneDisplay">
                  {renderData.phone}
                </span>
              )}

              <br></br>
              <br></br>
              <br></br>

              <label htmlFor="bio" className="label-ps">
                Bio
              </label>
              <br></br>
              {isEditing ? (
                <input
                  className="input-ps"
                  type="text"
                  placeholder="hi"
                  id="bioInput"
                  value={editedBio}
                  onChange={(e) => handleInputChange("editedBio", e)}
                />
              ) : (
                <span className="readOnly" id="bioDisplay">
                  {renderData.longBio}
                </span>
              )}

              <div className="button-container">
                {isEditing ? (
                  <button className="settingsButton" onClick={handleSaveClick}>
                    save changes
                  </button>
                ) : (
                  <button className="settingsButton" onClick={handleEditClick}>
                    edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </Layout>
  );
}

export default ProfileSettings;
