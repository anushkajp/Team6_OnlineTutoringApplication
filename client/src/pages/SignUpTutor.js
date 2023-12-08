// import React, { useState, useEffect } from "react";
// import { uploadToAPI } from '../services/api'
// import { Tutor } from '../comp_models/tutor'
// import CreateFields from '../components/CreateFields'
// import bcrypt from "bcryptjs-react"

// const SignUpTutor = () => {

//   const initialTutor = new Tutor();
//   const [tutor, setTutor] = useState(initialTutor);

//   const hashPassword = async (password) => {
//     const gennedHash = await new Promise((resolve, reject) => {
//       bcrypt.hash(password, 10, function (error, hash) {
//         if (error) {
//           reject(error)
//         } else {
//           resolve(hash)
//         }
//       })
//     })
//     // console.log("Hash generated: "+gennedHash)

//     return gennedHash
//     // return hash
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form data submitted:", tutor);
//     // Regex matching
//     var alertString = ""
//     for (const [field, value] of Object.entries(tutor)) {
//       if (field in labelData && "regex" in labelData[field] && !labelData[field].regex.test(value)) {
//         alertString += "Field " + labelData[field].label.toLowerCase() + " does not match input requirements\n"
//       }
//       // console.log(field+" : "+value)
//     }
    
//     if (alertString === "") {
//         try {
//           const pwdHash = await hashPassword(tutor.password) 
//           for (const [field, value] of Object.entries(tutor)) {
//             if(value === null || value ===undefined){
//               tutor[field] = ""
//             }
//             // console.log(field+" : "+value)
//           }
//           const userCredential = await createUserWithEmailAndPassword(auth, tutor.email, tutor.password);
//           tutor.userId = userCredential.user.uid;
//           tutor.password = pwdHash
//           const data = await uploadToAPI("tutor/", tutor).then(() => console.log("Tutor data saved successfully!")).catch((error) => console.log(error))
//         } catch (error) {
//           console.log(e)
//         }


//       // Clear the form fields
//       setTutor(new Tutor());
//     }else{
//       alert(alertString)
//     }

//   };

//   const labelData = {
//     firstName: {
//       label: "First name",
//       regex: /^[A-Za-z]{2,}$/,
//       maxLength: 20
//     },
//     lastName: {
//       label: "Last name",
//       regex: /^[A-Za-z]{2,}$/,
//       maxLength: 30
//     },
//     middleName: {
//       label: "Middle name",
//       regex: /^[A-Za-z]{2,}$/,
//       maxLength: 30
//     },
//     password: {
//       label: "Password",
//       regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
//       maxLength: 30
//     },
//     username: {
//       label: "Username",
//       regex: /^[A-Za-z0-9]+$/,
//       maxLength: 11
//     },
//     phone: {
//       label: "Phone number",
//       regex: /^[0-9]{8,13}$/,
//       maxLength: 13
//     },
//     email: {
//       label: "Email",
//       regex: /^[A-Za-z0-9]+@[A-Za-z0-9.]+[.][A-Za-z]{3}$/,
//       maxLength: 50
//     },
//     major: {
//       label: "Major"
//     },
//     courses:{
//       label:"Courses"
//     },
//     pfp: {
//       label: "Profile Picture"
//     }
//   };





//   return (
//     <div className="page-container">
//       <div className="signup-container">
//         <h2>Start Your Journey Today!</h2>
//         <div className="form-fields">
//           <form onSubmit={handleSubmit}>
//             {CreateFields(tutor, setTutor, labelData)}
//             {/* <div className="form-group">
//               <label htmlFor="profile_photo">Upload Profile Photo</label>
//               <input
//                 type="file"
//                 id="profile_photo"
//                 name="profile_photo"
//                 value={formData.profile_photo}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="firstName">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="lastName">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="Phone Number">Phone Number</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="subjects">Subjects</label>
//               <input
//                 type="text"
//                 id="Subjects"
//                 name="Subjects"
//                 value={formData.subjects}
//                 onChange={handleChange}
//               />
//             </div> */}
//             <button className="create_acc_student_button" type="submit">
//               Create Tutor Account
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className="logo-container-signup">
//         <img src="tutortopialogo.png" alt="logo" />
//       </div>
//     </div>
//   );
// };

// export default SignUpTutor;
import React, { useState, useEffect } from "react";
import { Tutor } from '../comp_models/tutor'
import { fetchFromAPI, uploadToAPI } from '../services/api'
import CreateFields from '../components/CreateFields'
import bcrypt from "bcryptjs-react"
import Layout from "../components/Layout";
import { database, auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpTutor = () => {

  const initialTutor = new Tutor();
  const [tutor, setTutor] = useState(initialTutor);

  const hashPassword = async (password) => {
    const gennedHash = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function (error, hash) {
        if (error) {
          reject(error)
        } else {
          resolve(hash)
        }
      })
    })
    // console.log("Hash generated: "+gennedHash)

    return gennedHash
    // return hash
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Regex matching
    var alertString = ""
    for (const [field, value] of Object.entries(tutor)) {
      if (field in labelData && "regex" in labelData[field] && !labelData[field].regex.test(value)) {
        alertString += "Field " + labelData[field].label.toLowerCase() + " does not match input requirements\n"
      }
      // console.log(field+" : "+value)
    }
    
    if (alertString === "") {
        try {
          const pwdHash = await hashPassword(tutor.password) 
          for (const [field, value] of Object.entries(tutor)) {
            if(value === null || value ===undefined){
              tutor[field] = ""
            }
            // console.log(field+" : "+value)
          }
          const userCredential = await createUserWithEmailAndPassword(auth, tutor.email, tutor.password);
          tutor.userId = userCredential.user.uid;
          tutor.password = pwdHash
          console.log(tutor)
          const data = await uploadToAPI("tutor/", tutor).then(() => console.log("Tutor data saved successfully!")).catch((error) => console.log(error))
        } catch (error) {
          console.log(e)
        }


      // Clear the form fields
      setTutor(new Tutor());
    }else{
      alert(alertString)
    }

  };

  const labelData = {
    firstName: {
      label: "First name",
      regex: /^[A-Za-z]{2,}$/,
      maxLength: 20
    },
    lastName: {
      label: "Last name",
      regex: /^[A-Za-z]{2,}$/,
      maxLength: 30
    },
    middleName: {
      label: "Middle name",
      regex: /^[A-Za-z]{2,}$/,
      maxLength: 30
    },
    password: {
      label: "Password",
      regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      maxLength: 30
    },
    username: {
      label: "Username",
      regex: /^[A-Za-z0-9]+$/,
      maxLength: 11
    },
    phone: {
      label: "Phone number",
      regex: /^[0-9]{8,13}$/,
      maxLength: 13
    },
    email: {
      label: "Email",
      regex: /^[A-Za-z0-9]+@[A-Za-z0-9.]+[.][A-Za-z]{3}$/,
      maxLength: 50
    },
    major: {
      label: "Major"
    },
    bgCheck: {
      label: "Do you have a criminal history?"
    },
    courses:{
      label:"Courses"
    },
    pfp: {
      label: "Profile Picture"
    }
  };

  return (
    <Layout>
        <div className="page-container">
      <div className="signup-container">
        <h2>Start Your Journey Today!</h2>
        <div className="form-fields">
          <form onSubmit={handleSubmit}>
            {CreateFields(tutor, setTutor, labelData)}
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
    </Layout>
  );
};

export default SignUpTutor;