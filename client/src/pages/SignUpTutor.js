import React, { useState, useEffect} from "react";
import { fetchFromAPI,uploadToAPI } from '../services/api'
import Tutor from '../models/tutor'
import Major from '../models/major'
import Course from '../models/course'
import CreateFields from '../components/CreateFields'





const SignUpTutor = () => {




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", tutor);
    (async ()=>{
      try{
      const data = await uploadToAPI("tutor/",tutor)
      console.log(data)
      }catch(e){
        console.log(e)
      }
      
    })()

    // Clear the form fields
    // setStudent(new Student());
  };

  const labelData = {
    firstName: { "label": "First name" },
    lastName: { "label": "Last name" },
    middleName: { "label": "Middle name" },
    password: { "label": "Password" },
    username: { "label": "Username" },
    courses: { "label": "Courses" },
    phone: { "label": "Phone number" },
    email: { "label": "Email" },
    major: { "label": "Major" },
    pfp: { "label": "Profile Picture" }


  }
  const initialTutor = new Tutor();
  const [tutor, setTutor] = useState(initialTutor);


 

  return (
    <div className="page-container">
      <div className="signup-container">
        <h2>Start Your Journey Today!</h2>
        <div className="form-fields">
          <form onSubmit={handleSubmit}>
            {CreateFields(tutor,setTutor,labelData)}
            {/* <div className="form-group">
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
              <label htmlFor="subjects">Subjects</label>
              <input
                type="text"
                id="Subjects"
                name="Subjects"
                value={formData.subjects}
                onChange={handleChange}
              />
            </div> */}
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
