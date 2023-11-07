import React, { useState, useEffect} from "react";
import { fetchFromAPI } from '../services/api'
import Major from '../models/major'
import Course from '../models/course'
// NOTE: Change student to general object
// NOTE: there are new changes here to be applied to sign up student

// Requires a object, setObject use state initialised on an empty object
// Requires a label dictionary with format shown below, any fields not specified will be excluded from appearing
//   const labelData = {
//     firstName: { "label": "First name" },
//     lastName: { "label": "Last name" },
//     middleName: { "label": "Middle name" },
//     password: { "label": "Password" },
//     username: { "label": "Username" },
//     courses: { "label": "Courses" },
//     phone: { "label": "Phone number" },
//     email: { "label": "Email" },
//     major: { "label": "Major" },
//     pfp: { "label": "Profile Picture" }
//   }
  const CreateFields = (object,setObject,labelData) => {

    const [majors, setMajors] = useState([]);
    const [courses, setCourses] = useState([]);
  
    const initialMajor = new Major();
    const [selectedMajor, setMajor] = useState(initialMajor);
  
    const [selectedCourses, setSelectedCourses] = useState([])
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setObject({
        ...object,
        [name]: value
      })
      console.log(object)
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
        {Object.keys(object).map((fields, index) => {
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
                      setObject({
                        ...object,
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
                      setObject({...object, [fields]:selectedCourses})
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
                    value={object[fields]}
                    onChange={handleChange}
                    // onChange={(e)=>setObject({...object,[fields]:e.target.value})}
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

export default CreateFields