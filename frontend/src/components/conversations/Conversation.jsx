import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(""); //was null earlier but that gabe errors so switch to 0
  //for image src below
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    // console.log(conversation);
    const getUser = async () => {
      try {
        // console.log(friendId);
        const res = await axios.get("/api/users?userId=" + friendId);
        // console.log(res.data);
        setUser(res.data);

        // console.log(user.username);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImage" src={user.image} alt="" />
      <span className="conversationName">{user.username} </span>
    </div>
  );
}
