import React , {useState} from 'react'
import Sidebar from '../components/sidebar'
import LogoutButton from '../components/LogoutButton'

const ProfileSettings = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('sampleemail@gmail.com');
  const [editedEmail, setEditedEmail] = useState('');
  const [phone, setPhone] = useState(4445559999);
  const [editedPhone, setEditedPhone] = useState('');
  const [preferredMethod, setPreferredMethod] = useState('email');
  const [editedMethod, setEditedMethod] = useState('');

  const renderData = {
    schoolName: 'Erik Jonsson School of CS',
    subject_expertise: ['Math', 'English'],
    member_since: 'August 2023',
    skills: ['ASL', 'Project Management'],
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setEmail(editedEmail);
    setPhone(editedPhone);
    setPreferredMethod(editedMethod);
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
                    <img src="https://picsum.photos/300/300" alt="Profile" />
                  </div>
                  <div className="profile_details"> 
                    <h5><span class="header_text">School Name:</span> {renderData.schoolName}</h5>
                    <h5><span class="header_text">Subject Expertise:</span> {renderData.subject_expertise}</h5>
                    <h5><span class="header_text">Member Since:</span> {renderData.member_since}</h5>
                    <h5><span class="header_text">Skills:</span> {renderData.skills.join(', ')}</h5>
                  </div>
              </div>
              <div className="editFields">
              <form>
              <label htmlFor="email">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  id="emailInput"
                  value={editedEmail}
                  onChange={(e) => handleInputChange('editedEmail', e)}
                />
              ) : (
                <span id="emailDisplay">{email}</span>
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
                <span id="phoneDisplay">{phone}</span>
              )}

              {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )}
            </form>
              </div>
          </div>
        </div>
      </div>
    );
  }


export default ProfileSettings;