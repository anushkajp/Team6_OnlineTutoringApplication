import React, { useState, useEffect } from "react";
import { fetchFromAPI } from '../services/api'
import User from '../models/user'
import Student from '../models/student'
import Tutor from '../models/tutor'
import Major from '../models/major'
import Course from '../models/course'



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
  const initialStudent = new Student();
  const [student, setStudent] = useState(initialStudent);

  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);

  const initialMajor = new Major();
  const [selectedMajor, setMajor] = useState(initialMajor);

  const [selectedCourses, setSelectedCourses] = useState([])

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    })
    console.log(student)
  }
  // const getMajors = (e)=>{

  //   fetchFromAPI(`major/`).then(data=>{
  //     for (let i in data){
  //       console.log(data[i])
  //       console.log(data["majorName"])
  //       const thisMajor = new Major(data[i].majorName,Object.keys(data)[0])
  //       console.log(thisMajor)
  //       if(!(thisMajor in major)){
  //         setMajors([...major,thisMajor])
  //       }

  //     }
  //   },(err)=>{
  //     console.log(err)
  //   })
  // }
  useEffect(() => {
    fetchFromAPI(`major/`).then(data => { 
      const majorArray=[]
      const majorKeys=[]
      for (let i in data) { 
        // if(Object.keys(data)[0] in majorKeys){
        //   continue;
        // }
        // console.log(data[i])
        // console.log(data["majorName"]) 
        const majorKey = i
        console.log(i)
        const thisMajor = new Major(data[i].majorName, i)
        // console.log( Object.keys(data)[0])
        // if(!(thisMajor in majors)){
        // setMajors([...majors, thisMajor])
        // }
        majorArray.push(thisMajor)

      }
      setMajors(majorArray)
      // console.log(majors)
    }, (err) => {
      console.log(err)
    })

  }, [])
  useEffect(() => {
    console.log('useEffect for courses is running.');
    console.log('selectedMajor:', selectedMajor);
    setCourses([])
    setSelectedCourses([])
    const courseArray=[]
    const courseKeys=[]
    if (selectedMajor.majorId) {
      // console.log("Past majorId: " + selectedMajor.majorId) 
      // console.log(selectedMajor.majorId)
      fetchFromAPI(`course/${selectedMajor.majorId}`).then(data => {
        console.log(data)  
        for (let i in data) { 
          if(Object.keys(data)[0] in courseKeys){
            continue;
          }
          // console.log(data[i])
          // console.log(data["majorName"])
          // console.log(Object.keys(data)[0])
          const thisCourse = new Course(data[i].courseName, data[i].courseNumber, data[i].majorId, data[i].creditHours)
          // console.log(thisMajor)
          // if(!(thisMajor in majors)){
          // }
          thisCourse["courseId"] = Object.keys(data)[0]
          courseArray.push(thisCourse)
        }
        setCourses(courseArray)

      }, (err) => {
        console.log(err)
      })
    }
    // console.log(courses)
  }, [selectedMajor])

  // useEffect()
  const createFields = (student) => {
    const fieldsToSkip = ['userId', 'hours', "longBio", "shortBio", "middleName"]


    return (
      <div className="form-group">
        {Object.keys(student).map((fields, index) => {
          // console.log(labelData)
          if (fieldsToSkip.includes(fields) || labelData[fields]===undefined) {
            return null;
          }
          return (
            <div key={index} className="form-group">
              <label key={index} htmlFor={fields}>{labelData[fields]["label"]}</label>
              {(() => {
                if (fields === "major") {
                  // getMajors() 
                  return (
                    <select  onChange={(e) => {
                      const selectedMajorName = e.target.value;
                      const selectedMajorObject = majors.find(major => major.majorName === selectedMajorName);
                      setMajor(selectedMajorObject);
                    }}> 
                      {majors.map( (major) => (
                        // console.log(fields1+index1) 
                        <option key={major.majorId} value={major.majorName}>{major.majorName}</option>
              ))}
                    </select>

                  )

                }
                else if (fields === "courses") {
                  return (
                    <select defaultValue={selectedCourses} multiple>
                      {courses.map((course) => (
                        <option key={course.courseId} value={course.courseName}>{course.courseName}</option>
              ))}
                    </select>

                  )
                } else {
                  return (<input
                    type={fields === "pfp" ? "file" : "text"}
                    id={fields}
                    name={fields}
                    value={student[fields]}
                    onChange={handleChange}
                    // onChange={(e)=>setStudent({...student,[fields]:e.target.value})}
                    required
                  />)
                }


              })()
              }


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
            {createFields(student)}
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
