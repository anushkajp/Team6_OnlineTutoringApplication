import React, { useState } from "react";

class User {
  constructor(firstName, lastName, middleName,
      password, userId, username, courses, phone, email, major,
      hours, longBio, shortBio, pfp) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.middleName = middleName;
      this.password = password;
      this.userId = userId;
      this.username = username;
      this.courses = courses;
      this.phone = phone;
      this.email = email;
      this.major = major;
      this.hours = hours;
      this.longBio = longBio;
      this.shortBio = shortBio;
      this.pfp = pfp;
  }
}
class Student extends User {
  constructor(firstName, lastName, middleName,
      password, userId, userName, courses, phone, email, major, hours,
      longBio, shortBio, pfp) {
      super(firstName, lastName, middleName,
          password, userId, userName, courses, phone, email, major,
          longBio, shortBio, pfp);
  }
}

const SignUpStudent = () => {
  //   const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   university: "",
  //   profile_photo: "",
  //   password: "",
  // });

  const initialStudent = new Student();
  const [student, setStudent] = useState(initialStudent);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const createFields = (student,setStudent)=>{
    const fieldsToSkip=['userId'
    ]
    return(
    <div className="form-group">
        {Object.keys(student).map((fields,index)=>{
          if (fieldsToSkip.includes(fields)){
            return null;
          }
          return (<div key={index}  className="form-group">
            <label key={index} htmlFor={fields}>{fields}</label>
            <input
            type={fields==="pfp"? "file" : "text"}
            id={fields}
            name={fields}
            value={student[fields]}
            onChange={(e)=>setStudent({...student,[fields]:e.target.value})}
            required
          />
          </div>
          )
        }
        
        
        
        )}

</div>

    )
  }
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form data submitted:", formData);
  //   // Clear the form fields
  //   setFormData({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //     university: "",
  //     profile_photo: "",
  //     password: "",
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", student);
    // Clear the form fields
    setStudent(new Student());
  };

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
            {createFields(student,setStudent)}
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
