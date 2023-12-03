import { auth,app } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { useState,useContext } from "react";
import { UserContext } from "../UserContext";

const SignUpTutor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [arrayValue, setArrayValue] = useState([]);
  const userContext = useContext(UserContext);
  let navigate = useNavigate();
  const db = getDatabase(app);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: [],
    profile_photo: "",
    password: "",
    accountType: "tutor"
  });

  const addUserToRealtimeDB = (userId, formData) => {
    set(ref(db, 'users/' + userId), formData)
    .then(() => console.log("Data saved successfully!"))
    .catch((error) => console.error("Failed to save data", error));
  };

  const handleChange = (e) => {
    setEmail(e.target.value)
    setPassword(e.target.value)

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const convertToArray = () => {
    const values = inputValue.split(',').map((item) => item.trim());
    setArrayValue(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    convertToArray();
    console.log("Form data submitted:", formData);
    try {
      const { email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      addUserToRealtimeDB(formData);
      //const user = userCredential.user;
      // localStorage.setItem('token', user.accessToken);
      // localStorage.setItem('user', JSON.stringify(user));
      navigate("/Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <div className="signup-container">
        <h2>Start Your Journey Today!</h2>
        <div className="form-fields">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="profile_photo">Upload Profile Photo</label>
              <input
                type="file"
                id="profile_photo"
                name="profile_photo"
                value={formData.profile_photo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Phone Number">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subjects">Subjects (list separated by commas)</label>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter comma-separated values"
              />
            </div>
            <button className="create_acc_student_button" type="submit">
              Create Tutor Account
            </button>
          </form>
        </div>
      </div>
      <div className="logo-container-signup">
        <img src="tutortopialogo.png" alt="logo" />
      </div>
    </div>
  );
};

export default SignUpTutor;