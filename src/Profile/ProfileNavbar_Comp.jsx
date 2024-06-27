import React from "react";

// libraries
import { Link } from "react-router-dom";

// icons
import { MdAccountCircle } from "react-icons/md";

function ProfileNavbar_Comp() {
  return (
    <>
      <div className="setupLinks">
        <Link
          style={{
            textDecoration: "none",
            color: "rgb(227 3 3)",
            margin: "5px",
          }}
          to="/profile"
        >
          View Profile <MdAccountCircle />
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "rgb(227 3 3)",
            margin: "5px",
          }}
          to="/CreateProfile"
        >
          Create New Profile <MdAccountCircle />
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "rgb(227 3 3)",
            margin: "5px",
          }}
          to="/UpdateEmail_Comp"
        >
          Update Email <MdAccountCircle />
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "rgb(227 3 3)",
            margin: "5px",
          }}
          to="/ResetPassword_Comp"
        >
          Reset Password <MdAccountCircle />
        </Link>
      </div>
    </>
  );
}

export default ProfileNavbar_Comp;
