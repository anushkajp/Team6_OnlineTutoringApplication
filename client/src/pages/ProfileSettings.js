import React , { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import LogoutButton from '../components/LogoutButton'
import { fetchFromAPI } from '../services/api'

const ProfileSettings = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('sampleemail@gmail.com');
  const [editedEmail, setEditedEmail] = useState('');
  const [phone, setPhone] = useState(4445559999);
  const [editedPhone, setEditedPhone] = useState('');
  const [editedMethod, setEditedMethod] = useState('');
  const [renderData, setData] = useState({
    userName:'Sad Cat',
    schoolName: 'Erik Jonsson School of CS',
    subject_expertise: ['Math', 'English'],
    member_since: 'August 2023',
    skills: ['ASL', 'Project Management'],
  })

  useEffect(() => {
    fetchFromAPI(`${props.renderType}/${props.studentName}`) 
      .then(data => {
        setData(data);
        console.log(data)
      })
      .catch(error => {
        setData({
          userName:'Sad Cat',
          schoolName: 'Erik Jonsson School of CS',
          subject_expertise: ['Math', 'English'],
          member_since: 'August 2023',
          skills: ['ASL', 'Project Management'],
        });
        console.log(error);
      });
  }, []);


  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEmail(editedEmail);
    setPhone(editedPhone);
  };

  const handleInputChange = (field, event) => {
    switch (field) {
      case 'editedEmail':
        setEditedEmail(event.target.value);
        break;
      case 'editedPhone':
        setEditedPhone(event.target.value);
        break;
      case 'editedMethod':
        setEditedMethod(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
      <div>
        <div>
          <LogoutButton></LogoutButton>
        </div>
        <div className="profile_page">
          <div className="sidebar">
            <Sidebar renderType={props.renderType}></Sidebar>
          </div>
          <div className="profile_settings">
              <div className="profile_info">
                  <div className="profile_photo">
                    <img src="https://picsum.photos/400/400" alt="Profile" />
                  </div>
                  <div className="profile_details"> 
                    <h3>{renderData.userName}</h3>
                    <h5><span class="header_text">School Name:</span> {renderData.schoolName}</h5>
                    <h5><span class="header_text">Subject Expertise:</span> {renderData.subject_expertise.join(', ')}</h5>
                    <h5><span class="header_text">Member Since:</span> {renderData.member_since}</h5>
                    <h5><span class="header_text">Skills:</span> {renderData.skills.join(', ')}</h5>
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
                <span className="readOnly" id="emailDisplay">{email}</span>
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
                <span className="readOnly" id="phoneDisplay">{phone}</span>
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
      </div>
    );
  }


export default ProfileSettings;