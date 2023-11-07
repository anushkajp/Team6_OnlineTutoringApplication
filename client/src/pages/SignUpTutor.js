import React, { useState, useEffect} from "react";
import { fetchFromAPI,uploadToAPI } from '../services/api'
import Tutor from '../models/tutor'
import Major from '../models/major'
import Course from '../models/course'





const SignUpTutor = () => {


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    })
    console.log(student)
  }

  const handleCourseSelection=(selectedCourseId, isSelected)=>{
    setSelectedCourses((prevSelectedCourses)=>{
      if (isSelected){
        return [...prevSelectedCourses,selectedCourseId]
      }else{
        return prevSelectedCourses.filter((id)=> id !== selectedCourseId)
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", student);
    (async ()=>{
      const data = await uploadToAPI("tutor/",student)
      console.log(data)
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
  const initialStudent = new Tutor();
  const [student, setStudent] = useState(initialStudent);

  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);

  const initialMajor = new Major();
  const [selectedMajor, setMajor] = useState(initialMajor);

  const [selectedCourses, setSelectedCourses] = useState([])

  // NOTE: Change student to general object
  // NOTE: there are new changes here to be applied to sign up student
  const CreateFields = (student) => {
    const fieldsToSkip = ['userId', 'hours', "longBio", "shortBio", "middleName"]
    useEffect(() => {
      fetchFromAPI(`major/`).then(data => { 
        const majorArray=[]
        const majorKeys=[]
        for (let i in data) { 
          const majorKey = i
          const thisMajor = new Major(data[i].majorName, i)
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
        fetchFromAPI(`course/${selectedMajor.majorId}`).then(data => {
          console.log(data)  
          for (let i in data) { 
            if(Object.keys(data)[0] in courseKeys){
              continue;
            }
            const thisCourse = new Course(data[i].courseName, data[i].courseNumber, data[i].majorId, data[i].creditHours)
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
  
    return (
      <div className="form-group">
        {Object.keys(student).map((fields, index) => {
          // console.log(labelData)
          if (labelData[fields]===undefined) {
            return null;
          }
          return (
            <div key={index} className="form-group">
              <label key={index} htmlFor={fields}>{labelData[fields]["label"]}</label>
              {(() => {
                if (fields === "major") {
                  return (
                    <select  onChange={(e) => {
                      const selectedMajorName = e.target.value;
                      const selectedMajorObject = majors.find(major => major.majorName === selectedMajorName);
                      setMajor(selectedMajorObject);
                      setStudent({
                        ...student,
                        [fields]: selectedMajorObject.majorId
                      })
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
                    <select defaultValue={selectedCourses} multiple 
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions);
                      const selectedCourseIds = selectedOptions.map((option) => option.value);
        
                      // Iterate through the selected course IDs and handle selection/deselection
                      selectedCourseIds.forEach((courseId) => {
                        const isSelected = selectedCourses.includes(courseId);
        
                        // Call the handleCourseSelection function
                        handleCourseSelection(courseId, isSelected);
                      });
                      setStudent({...student, [fields]:selectedCourses})
                    }}
                  >
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


  return (
    <div className="page-container">
      <div className="signup-container">
        <h2>Start Your Journey Today!</h2>
        <div className="form-fields">
          <form onSubmit={handleSubmit}>
            {CreateFields(student)}
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
