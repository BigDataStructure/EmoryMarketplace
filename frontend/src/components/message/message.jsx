import "./message.css";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Message({ message, own, sender }) {
  const { user } = useContext(AuthContext);
  const [users, setUser] = useState({});
  useEffect(() => {
    const fetchuser = async () => {
      const { data } = await axios.get("/api/users?userId=" + sender);
      setUser(data);
    };
    fetchuser();
  }, []);
  if (own) {
    return (
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img className="messageImg" src={user.image} alt="" />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom"> {format(message.createdAt)}</div>
      </div>
    );
  }
  if (!own) {
    return (
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img className="messageImg" src={users.image} alt="" />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom"> {format(message.createdAt)}</div>
      </div>
    );
  }
}
