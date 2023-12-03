import React, { useState, useEffect } from "react";
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
const CreateFields = (object, setObject, labelData) => {

  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);

  const initialMajor = new Major();
  const [selectedMajor, setMajor] = useState(initialMajor);

  const [selectedCourses, setSelectedCourses] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (labelData[name].maxLength>=value.length){
        setObject({
          ...object,
          [name]: value
        })
      
    }else{
      alert(`The input size of ${labelData[name].label.toLowerCase()} of ${value.length} is larger than the maximum size of ${labelData[name].maxLength}`)
    
    }
    
    


    // alert(object)
    console.log(object)
  }



  useEffect(() => {
    if ("major" in labelData) {
      fetchFromAPI(`major/`).then(data => {
        const majorArray = []
        const majorKeys = []
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
    }
  }, [])
  useEffect(() => {
    if ("major" in labelData && "courses" in labelData) {
      // console.log('useEffect for courses is running.');
      // console.log('selectedMajor:', selectedMajor);
      setCourses([])
      setSelectedCourses([])
      const courseArray = []
      const courseKeys = []
      if (selectedMajor.majorId) {
        fetchFromAPI(`course/${selectedMajor.majorId}`).then(data => {
          // console.log(data)  
          for (let i in data) {
            const dbId = i
            if (dbId in courseKeys) {
              continue;
            }

            const thisCourse = new Course(data[i].courseName, data[i].courseNumber, data[i].majorId, data[i].creditHours)
            thisCourse["courseId"] = dbId
            courseArray.push(thisCourse)
          }
          setCourses(courseArray)

        }, (err) => {
          console.log(err)
        })
      }
    }
    // console.log(courses)
  }, [selectedMajor])

  return (
    <div className="form-group">
      {Object.keys(object).map((fields, index) => {
        // console.log(labelData)
        if (labelData[fields] === undefined) {
          return null;
        }
        return (
          <div key={index} className="form-group">
            <label key={index} htmlFor={fields}>{labelData[fields]["label"]}</label>
            {(() => {
              if (fields === "major") {
                return (
                  <select onChange={(e) => {
                    const selectedMajorName = e.target.value;
                    const selectedMajorObject = majors.find(major => major.majorName === selectedMajorName);
                    setMajor(selectedMajorObject);
                    // SET MAJOR
                    setObject({
                      ...object,
                      [fields]: selectedMajorObject.majorName
                    })
                  }}>
                    {majors.map((major) => (
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
                      // setSelectedCourses([])
                      const selectedOptions = Array.from(e.target.selectedOptions);
                      console.log(e.target.selectedOptions)
                      const selectedCourseIds = []
                      // const selectedCourseIds = selectedOptions.map((option) => {
                      //   courses.find(course => )
                      // });

                      // Iterate through the selected course IDs and handle selection/deselection
                      selectedOptions.forEach((courseId) => {
                        const dbId = courseId.value
                        console.log(dbId)
                        const course = courses.find(course => course.courseId === dbId)

                        selectedCourseIds.push(course.courseNumber)

                      });
                      setSelectedCourses(selectedCourseIds)
                      console.log("selected Courses : " + selectedCourses)
                      console.log("selected course ids : " + selectedCourseIds)
                      setObject({ ...object, [fields]: selectedCourseIds })
                    }}
                  >
                    {courses.map((course) => (
                      <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
                    ))}
                  </select>

                )
              }
              // else if(fields === "password"){
              //   return(                  
              //   <input
              //     type={"password"}
              //     id={fields}
              //     name={fields}
              //     value={object[fields]}
              //     onChange={async (e)=>{
              //       const hash = await hashPassword(e.target.value)

              //     }}
              //     // onChange={(e)=>setObject({...object,[fields]:e.target.value})}
              //     required
              //   />
              //   )
              // }
              else {
                return (
                  <input
                    type={(fields === "pfp" || fields === "password") ? (fields === "pfp" ? "file" : "password") : "text"}
                    id={fields}
                    name={fields}
                    value={object[fields]}
                    onChange={handleChange}
                    // onChange={(e)=>setObject({...object,[fields]:e.target.value})}
                    required
                  />
                )
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