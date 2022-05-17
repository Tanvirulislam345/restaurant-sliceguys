import React from "react";

function ProfileNav({ setCurrentNav, currentNav }) {
  return (
    <div className="profileNav">
      <p
        style={{
          fontWeight: currentNav === "My Profile" && "bold",
          backgroundColor: currentNav === "My Profile" && "#ebebeb",
        }}
        onClick={() => setCurrentNav("My Profile")}
      >
        My Profile
      </p>
      <p
        style={{
          fontWeight: currentNav === "My Order" && "bold",
          backgroundColor: currentNav === "My Order" && "#ebebeb",
        }}
        onClick={() => setCurrentNav("My Order")}
      >
        Order History
      </p>
      {/* <p
        style={{
          fontWeight: currentNav === "My Address" && "bold",
          backgroundColor: currentNav === "My Address" && "#ebebeb",
        }}
        onClick={() => setCurrentNav("My Address")}
      >
        My Address
      </p> */}
    </div>
  );
}

export default ProfileNav;
