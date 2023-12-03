import React, { useState, useEffect } from "react";
import { fetchFromAPI,uploadToAPI } from '../services/api'
import Student from '../models/student'
import CreateFields from '../components/CreateFields'
import bcrypt from "bcryptjs-react"

const SignUpStudent = () => {
  const initialStudent = new Student();
  const [student, setStudent] = useState(initialStudent);

  const hashPassword = async(password) =>{
    const gennedHash = await new Promise((resolve, reject)=> {
      bcrypt.hash(password,10,function(error, hash){
        if(error){
          reject(error)
        }else{
          resolve(hash)
        }

        
      })
    })
    // console.log("Hash generated: "+gennedHash)
    
    return gennedHash
    // return hash
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    (async ()=>{
      const pwdHash = await hashPassword(student.password)
      student.password=  pwdHash
      console.log("Form data submitted:", student);
      const data = await uploadToAPI("student/",student)
      console.log(data)
    })()

    // Clear the form fields
    // setStudent(new Student());
  };
  const labelData = {
    firstName: { label: "First name", regex:/^[A-Za-z]{2,}$/, maxLength:20 },
    lastName: { label: "Last name", regex:/^[A-Za-z]{2,}$/,maxLength:30 },
    middleName: { label: "Middle name", regex:/^[A-Za-z]{2,}$/,maxLength:30},
    password: { label: "Password", regex:/^[A-Za-z]{8,}$/,maxLength:30},
    username: { label: "Username", regex:/^[A-Za-z0-9]{8,}$/,maxLength:10 },
    phone: { label: "Phone number", regex:/^[0-9]{8,13}$/,maxLength:10  },
    email: { label: "Email", regex:/^[A-Za-z0-9]+@[A-Za-z0-9.]+[.][A-Za-z]{3}$/,maxLength:30 },
    major: { label: "Major" },
    pfp: { label: "Profile Picture" }


  }



  return (
    <div className="page-container">
      <div className="signup-container">
        <h2>Start Your Journey Today!</h2>
        <div className="form-fields">
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="university">University/School</label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
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
            </div> */}
            {CreateFields(student,setStudent,labelData)}
            <button className="create_acc_student_button" type="submit">
              Create Student Account
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

export default SignUpStudent;
