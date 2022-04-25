import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./ProfilePageListing.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import mongoose from "mongoose";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onClickSold = async (e) => {
    const updatedItem = {
      id: mongoose.Types.ObjectId(product._id),
      sold: "true",
    };

    try {
      await axios.put("/api/products/", updatedItem);
      window.location.reload(false);
    } catch (err) {}
  };
  const onClickNotSold = async (e) => {
    const updatedItem = {
      id: mongoose.Types.ObjectId(product._id),
      sold: "false",
    };

    try {
      await axios.put("/api/products/", updatedItem);
      window.location.reload(false);
    } catch (err) {}
  };
  const onClickCat = () => {
    try {
      navigate(`/search/${product.category}`, { replace: true });
    } catch (err) {}
  };
  const onEdit = () => {
    try {
      navigate(`/product/${product._id}/edit`, { replace: true });
    } catch (err) {}
  };

  const onClickCourse = () => {
    try {
      navigate(`/search/${product.course}`, { replace: true });
    } catch (err) {}
  };

  // useEffect(() => {
  //   const fetchproduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productNumber}`);
  //     setProduct(data[0]);
  //   };
  //   fetchproduct();
  // }, []);
  if (!product.sold) {
    return (
      <div className="wrapper  row">
        <Card className="edge my-2 p-2">
          <div className="row ">
            <div className="col-sm-3">
              <Link to={`/product/${product._id}`}>
                <Card.Img
                  className="card-img-top"
                  src={product.image}
                  variant="top"
                  style={{ maxWidth: "87%", maxHeight: "400px" }}
                />
              </Link>
            </div>
            <div className="col-sm-6">
              <h4>
                <Link to={`/product/${product._id}`}>
                  <strong>{product.name}</strong>
                </Link>
              </h4>
              <br></br>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Author:</strong> {product.author}
              </Card.Text>
              <Card.Text>
                <strong>ISBN:</strong> {product.isbn}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>
              <div className="tags" style={{}}>
                <button
                  className="rounded-pill btn btn-warning btn-sm m-1"
                  onClick={onClickCat}
                >
                  <b>{product.category}</b>
                </button>
                <button
                  className="rounded-pill btn btn-warning btn-sm m-1"
                  onClick={onClickCourse}
                >
                  {product.course}
                </button>
                <button className="rounded-pill btn btn-warning btn-sm m-1">
                  {product.condition}
                </button>
              </div>
            </div>
            <div className="col-sm-2">
              {user.username === product.seller && (
                <>
                  <button className="btn btn-secondary mx-2" onClick={onEdit}>
                    Edit
                  </button>
                  <button className="btn btn-secondary " onClick={onClickSold}>
                    Mark as sold
                  </button>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="wrapper  row">
        <Card className="edge my-2 p-2">
          <div className="row ">
            <div className="col-sm-3">
              <Link to={`/product/${product._id}/sold`}>
                <Card.Img
                  className="card-img-top"
                  src={product.image}
                  variant="top"
                  style={{ maxWidth: "87%", maxHeight: "400px" }}
                />
              </Link>
            </div>
            <div className="col-sm-4">
              <h4>
                <Link to={`/product/${product._id}/sold`}>
                  <strong>{product.name} - SOLD</strong>
                </Link>
              </h4>
              <br></br>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Author:</strong> {product.author}
              </Card.Text>
              <Card.Text>
                <strong>ISBN:</strong> {product.isbn}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>
              <div className="tags" style={{}}>
                <button
                  className="rounded-pill btn btn-warning btn-sm m-1"
                  onClick={onClickCat}
                >
                  <b>{product.category}</b>
                </button>
                <button
                  className="rounded-pill btn btn-warning btn-sm m-1"
                  onClick={onClickCourse}
                >
                  {product.course}
                </button>
                <button className="rounded-pill btn btn-warning btn-sm m-1">
                  {product.condition}
                </button>
              </div>
            </div>
            <div className="col-sm-5 text-center ">
              {user.username === product.seller && (
                <button className="btn btn-secondary" onClick={onClickNotSold}>
                  Mark as not sold
                </button>
              )}
              <Card.Text></Card.Text>
              <Card.Img
                className="card-img-top"
                src="/images/sold-sign.png"
                variant=""
                style={{ width: "70%", height: "60%" }}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
};

export default Product;
