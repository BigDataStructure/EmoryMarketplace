import axios from "axios";
import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import "./itempage.css";
import FormData from "form-data";
// import ProfilePic from "./ItemPageProfilePic";
import { AuthContext } from "../../context/AuthContext";
import mongoose from "mongoose";

const EditItem = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [isbn, setIsbn] = useState(0);
  const [seller, setSeller] = useState("");
  const [course, setCourse] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      setName(data.name);
      setImage(data.image);
      setDescription(data.description);
      setCategory(data.category);
      setPrice(data.price);
      setCondition(data.condition);
      setIsbn(data.isbn);
      setSeller(data.seller);
      setCourse(data.course);
      setAuthor(data.author);
    };
    fetchproduct();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = product.image;
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "TESTUP");
      console.log(formData);
      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/digf0lyi8/image/upload",
        formData
      );
      imageUrl = dataRes.data.url;
    }

    const updatedItem = {
      id: mongoose.Types.ObjectId(id),
      name: name,
      image: imageUrl,
      description: description,
      category: category,
      price: price,
      condition: condition,
      isbn: isbn,
      seller: product.seller,
      course: course,
      author: author,
    };

    try {
      console.log(id);
      await axios.put("/api/products/", updatedItem);
      navigate(`/product/${product._id}`, { replace: true });
    } catch (err) {}
  };

  return (
    <>
      {seller === user.username && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="item-wrapper card" style={{}}>
              <br></br>

              <div className="img-wrapper">
                <img
                  src={product.image}
                  className="rounded pt-2 pb-2"
                  alt="..."
                  style={{ maxWidth: "21.9rem" }}
                />
                <input
                  className="mx-2"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                ></input>
              </div>

              <h1 className="txt-left w-75 card-header">
                Title:
                <input
                  className="mx-2"
                  type="text"
                  size="50"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />{" "}
              </h1>
              <div className=" w-75 card-body">
                <h4 className="txt-left ">
                  <b>Tags: </b>
                </h4>

                <h5>
                  <b>Course: </b>
                  <input
                    type="text"
                    size="20"
                    required
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  />
                </h5>
                <h5>
                  <b>Category: </b>
                  <input
                    type="text"
                    size="20"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </h5>
                <h5>
                  <b>Condition: </b>
                </h5>
                <select
                  value={condition}
                  required
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option selected value="Fair">
                    Fair
                  </option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <ul className="list-group list-group-flush txt-left w-75 card-body">
                <li className="list-group-item">
                  <h5>
                    <b>Author: </b>
                    <input
                      type="text"
                      size="50"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </h5>
                </li>
                <li className="list-group-item">
                  <h5>
                    <b>ISBN: </b>
                    <input
                      type="number"
                      size="60"
                      required
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                    />{" "}
                  </h5>
                </li>
                <li className="list-group-item">
                  <h5>
                    <b>Description: </b>
                    <textarea
                      type="number"
                      cols="80"
                      rows="4"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />{" "}
                  </h5>
                </li>
              </ul>
              <Container className="w-75">
                <Row className="item-bar card-body">
                  <Col className="bar-col1">
                    {/* <ProfilePic username={sellers} /> */}

                    <Link
                      className=" card-subtitle text seller-link"
                      title={product.seller}
                      to={`/${product.seller}`}
                    >
                      <h4 className="mx-2">
                        <b> {seller}</b>
                      </h4>
                    </Link>
                  </Col>
                  <Col className="bar-col2">
                    <h3 className="m-5">
                      Price: $
                      <input
                        type="number"
                        className="mx-2"
                        step="0.01"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </h3>
                    {/* <Button variant="primary" size="lg" onClick={handleSubmit}>
                Chat
              </Button> */}
                  </Col>
                  <input type="submit"></input>
                </Row>
              </Container>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditItem;
