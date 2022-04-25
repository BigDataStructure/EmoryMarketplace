import ReactRoundedImage from "react-rounded-image";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "./ProfilePage.css";
import { Row, Col } from "react-bootstrap";
import FormData from "form-data";

// import Rating1 from "../userStars/userStars";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const EditProfilePage = () => {
  const { user } = useContext(AuthContext);
  const username = user.username;
  const [users, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState(0);
  const [bio, setBio] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchuser = async () => {
      const { data } = await axios.get(`/api/users/${username}`);
      setUser(data[0]);
      setProfilePic(data[0].image);
      setName(data[0].name);
      setPhone(data[0].phone);
      setMajor(data[0].major);
      setYear(data[0].year);
      setBio(data[0].bio);
    };
    fetchuser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = user.image;
    //console.log(profilePic);
    if (profilePic) {
      const formData = new FormData();
      formData.append("file", profilePic);
      formData.append("upload_preset", "TESTUP");
      // console.log(formData);
      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/digf0lyi8/image/upload",
        formData
      );
      imageUrl = dataRes.data.url;
    }

    // // Details of the uploaded file
    // console.log(this.state.selectedFile);

    // // Request made to the backend api
    // // Send formData object
    // axios.post("api/uploadfile", formData);

    const updatedUserProfile = {
      username: users.username,
      image: imageUrl,
      name: name,
      email: users.email,
      phone: phone,
      bio: bio,
      major: major,
      year: year,
    };

    try {
      await axios.put("/api/users", updatedUserProfile);
      navigate(`/own`, { replace: true });
    } catch (err) {}
  };
  return (
    <>
      <div className="div-wrapper2"></div>
      <div className="div-wrapper">
        <div className="card bl-corner my-3 div-row w-75">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <div className="wrapper my-3 mx-2">
                  <ReactRoundedImage
                    className="wrapper"
                    image={users.image}
                    roundedColor="#EFBC75"
                    imageWidth="150"
                    imageHeight="150"
                    roundedSize="13"
                    borderRadius="70"
                  />
                </div>
                <label className="wrapper mx-2">
                  <h6>
                    Change Profile Picture:
                    <input
                      className="mx-2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    ></input>
                  </h6>
                </label>
                <h3>
                  <strong>Name: </strong>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </h3>
                <h5 className="card-title text-muted m-2 wrapper">
                  <i className="fas fa-user wrapper"></i> @{users.username}
                </h5>
                {/* <div className="mx-2 wrapper">
            <Rating1
              rating={users.rating}
              numReview={` ${users.reviews} reviews`}
            />
          </div> */}
                <div className="card-body">
                  <h5 className="card-title mx-2">
                    <b>Bio:</b>
                  </h5>
                  <p className="card-body">
                    <textarea
                      value={bio}
                      rows="5"
                      cols="50"
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </p>
                </div>
              </Col>
              <Col>
                <br />
                {/* Names */}
                <h5 className="card-header subtitle text-white mx-2">
                  <b>Contact</b>
                </h5>
                <div className="card-body">
                  {/* Username */}

                  <h6 className="card-title text-muted">
                    <i className="fa-solid fa-phone"></i> Number:{" "}
                    <input
                      type="text"
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </h6>
                  <br></br>
                  <h6 className="card-title text-muted">
                    <i className="fa-solid fa-envelope"></i> {users.email}
                  </h6>
                </div>

                <h5 className="card-header subtitle mx-2 text-white">
                  About Me
                </h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h5>
                      <strong>Major: </strong>
                      <input
                        type="text"
                        required
                        multiple
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                      />
                    </h5>
                  </li>
                  <li className="list-group-item">
                    <h5>
                      <strong>Year: </strong>
                      <input
                        type="number"
                        value={year}
                        required
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </h5>
                  </li>
                </ul>
              </Col>
              <label className="wrapper">
                <input type="submit"></input>
              </label>
            </Row>
          </form>
        </div>
      </div>
    </>
  );
};
//   return (
//     <>
//       <div className="div-wrapper2">
//         <h2>Edit Profile Page</h2>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="div-wrapper ">
//           <div className="card mb-3 div-row w-50 ">
//             <div className="wrapper">
//               <ReactRoundedImage
//                 className="wrapper"
//                 image={profilePic}
//                 roundedColor="white"
//                 imageWidth="150"
//                 imageHeight="150"
//                 roundedSize="13"
//                 borderRadius="70"
//               />
//             </div>
//             <label className="wrapper mx-2">
//               <h7>
//                 Change Profile Picture:{" "}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setProfilePic(e)}
//                 ></input>
//               </h7>
//             </label>
//             <label className="m-2 wrapper">
//               <h2>
//                 <strong>Name: </strong>
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </h2>
//             </label>
//             <h5 className="card-title text-muted m-2 wrapper">
//               <i className="fas fa-user wrapper"></i> @{users.username}
//             </h5>
//             <div className="mx-2 wrapper">
//               <Rating1
//                 rating={users.rating}
//                 numReview={` ${users.reviews} reviews`}
//               />
//             </div>
//             <br />
//             {/* Names */}
//             <h3 className="card-header bg-info text-white">Contact</h3>
//             <div className="card-body">
//               {/* Username */}

//               <label className="card-title text-muted">
//                 <h6>
//                   <i className="fa-solid fa-phone"></i> Enter your number:{" "}
//                   <input
//                     type="text"
//                     value={phone}
//                     required
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </h6>
//               </label>

//               <br></br>
//               <h7 className="card-title text-muted">
//                 <i className="fa-solid fa-envelope"></i> {users.email}
//               </h7>
//             </div>
//             <h4 className="card-header bg-info text-white">About Me</h4>
//             <ul className="list-group list-group-flush">
//               <li className="list-group-item">
//                 <label>
//                   <h5>
//                     <strong>Major: </strong>
//                     <input
//                       type="text"
//                       required
//                       multiple
//                       value={major}
//                       onChange={(e) => setMajor(e.target.value)}
//                     />
//                   </h5>
//                 </label>
//               </li>
//               <li className="list-group-item">
//                 <label>
//                   <h5>
//                     <strong>Year: </strong>
//                     <input
//                       type="number"
//                       value={year}
//                       required
//                       onChange={(e) => setYear(e.target.value)}
//                     />
//                   </h5>
//                 </label>
//               </li>
//             </ul>
//             <div className="card-body">
//               <h4 className="-title">
//                 <strong>Bio:</strong>
//               </h4>
//               <label className="card-body wrapper">
//                 {
//                   <textarea
//                     value={bio}
//                     rows="5"
//                     cols="90"
//                     onChange={(e) => setBio(e.target.value)}
//                   />
//                 }
//               </label>
//               <label className="wrapper">
//                 <input type="submit"></input>
//               </label>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

export default EditProfilePage;
