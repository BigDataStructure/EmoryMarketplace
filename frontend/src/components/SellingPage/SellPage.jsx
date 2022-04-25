import axios from "axios";
import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./sellpage.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SellPage = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  // const [users, setUser] = useState({});
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [isbn, setIsbn] = useState(0);
  const [price, setPrice] = useState(0);
  const [course, setCourse] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "TESTUP");
      console.log(formData);
      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/digf0lyi8/image/upload",
        formData
      );
      imageUrl = dataRes.data.url;
    }
    const newProduct =
      //
      {
        user: user._id,
        name: name,
        image: imageUrl,
        description: description,
        category: category,
        price: price,
        condition: condition,
        isbn: isbn,
        seller: user.username,
        course: course,
        author: author,
        reviews: [],
      };
    try {
      await axios.post("/api/products", newProduct);

      navigate(`/`, { replace: true });
    } catch (err) {}
  };
  const formId = "list";
  return (
    <Container>
      <Form id={formId} onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2" controlId="formAuthor">
              <Form.Label>Add Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author Name"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="formISBN">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ISBN"
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-2 w-75" controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Course Name"
                onChange={(e) => setCourse(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Row>
            <Col>
              <Form.Group className="mb-2" controlId="formDept">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Department(s)"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2" controlId="formCondition">
                <Form.Label>Condition</Form.Label>
                <Form.Select
                  id="selectCondition"
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option>Select a Condiiton</option>
                  <option>New</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2" controlId="formCampus">
                <Form.Label>Campus</Form.Label>
                <Form.Select id="selectCampus">
                  <option>Select a campus</option>
                  <option>Atlanta</option>
                  <option>Oxford</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
          </Row>
        </Row>
        <Form.Group className="mb-2" controlId="form.Textarea">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add a Description..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-5" controlId="Imag">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="$"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col>
            <Form.Group className="mb-5" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="$"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Button
            variant="primary"
            type="submit"
            form={formId}
            style={{ backgroundColor: "#D28E00", borderColor: "#D28E00" }}
          >
            Post Listing
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default SellPage;
