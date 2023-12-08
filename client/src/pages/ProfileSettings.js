import React , { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import Sidebar from '../components/sidebar'
import LogoutButton from '../components/LogoutButton'
import { fetchFromAPI, sendAPIPatchRequest } from '../services/api'
import Layout from '../components/Layout'

function ProfileSettings(props){
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('sampleemail@gmail.com');
  const [editedEmail, setEditedEmail] = useState('');
  const [phone, setPhone] = useState(4445559999);
  const [bio, setBio] = useState("")
  const [editedBio, setEditedBio] = useState("")
  const [editedPhone, setEditedPhone] = useState('');
  const [renderData, setData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchFromAPI(`${user.accountType}/${user.username}`) 
      .then(data => {
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
          longBio: value.longBio
        }
        ));
        setEditedEmail(render_data.email);
        setEditedPhone(render_data.phone);
        setEditedBio(renderData.longBio);
        setData(render_data[0]);
      })
      .catch(error => {
        setData({
          "firstName": "Loading...",
          "lastName": "Loading...",
          "middleName": null,
          "password": "Loading...",
          "userId": "Loading...",
          "userName": "Loading...",
          "courses": [],
          "phone": "Loading...",
          "email": "Loading...",
          "major": "Loading...",
          "hours": null,
          "longBio": null
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

    sendAPIPatchRequest(`${user.accountType}/${user.username}`, { "email" : editedEmail, "phone" : editedPhone, "longBio": editedBio })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
  };

  const handleInputChange = (field, event) => {
    switch (field) {
      case 'editedEmail':
        setEditedEmail(event.target.value);
        break;
      case 'editedPhone':
        setEditedPhone(event.target.value);
        break;
      case 'editedBio':
          setEditedBio(event.target.value);
          break;
      default:
        break;
    }
  };

  const excludedFields = ["password", "userId", "firstName", "middleName", "lastName", "key"];

  return (
      <Layout>
          <div className="profile_page">
          <div className="profile_settings">
              <div className="profile_info">
                  <div className="profile_photo">
                    <img src="https://picsum.photos/400/400" alt="Profile" />
                  </div>
                  <div className="profile_details"> 
                    <h3>{renderData.firstName + " "  + renderData.lastName}</h3>
                      {Object.entries(renderData).map(([field, value]) => (
                        !excludedFields.includes(field) && value != null && (
                          <div key={field}>
                            <h4 className="bio_h4"><span className="header_text">{field}: </span>{Array.isArray(value) ? value.join(', ') : value}</h4>
                          </div>
                        )))}
                  </div>
              </div>
              <div className="editFields">
              <form className="settingsForm">
              <label htmlFor="email">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  id="emailInput"
                  value={editedEmail}
                  onChange={(e) => handleInputChange('editedEmail', e)}
                />
              ) : (
                <span className="readOnly" id="emailDisplay">{renderData.email}</span>
              )}

              <label htmlFor="phone">Phone:</label>
              {isEditing ? (
                <input
                  type="tel"
                  id="phoneInput"
                  value={editedPhone}
                  onChange={(e) => handleInputChange('editedPhone', e)}
                />
              ) : (
                <span className="readOnly" id="phoneDisplay">{renderData.phone}</span>
              )}

              <label htmlFor="bio">Bio:</label>
              {isEditing ? (
                <input
                  type="text"
                  id="bioInput"
                  value={editedBio}
                  onChange={(e) => handleInputChange('editedBio', e)}
                />
              ) : (
                <span className="readOnly" id="bioDisplay">{renderData.longBio}</span>
              )}  

              {isEditing ? (
                <button className="settingsButton" onClick={handleSaveClick}>Save</button>
              ) : (
                <button className="settingsButton" onClick={handleEditClick}>Edit</button>
              )}

            </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }


export default ProfileSettings;