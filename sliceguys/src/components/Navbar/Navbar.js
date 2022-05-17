import React from "react";
import { Badge, Paper } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Avatar from "@mui/material/Avatar";
import pizza from "../../assets/Rectangle 129.png";
import "./style.css";
import useAuth from "../../Context/useAuth";

function Navbar() {
  const [activeNav, setActiveNav] = React.useState("home");
  const { user, adminData, userSignOut, noti } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    const proced = window.confirm('Are you want to Logout ?');
    if (proced) {
      userSignOut();
      navigate('/');
    }
  }

  return (
    <div className="navbar">
      <div className="upperBar">
        {user?.email ? (
          <NavLink to="/profile">
            <div style={{ margin: "15px 0px" }} className="img">
              <img src={pizza} alt="" />
            </div>
          </NavLink>
        ) : (
          <div style={{ margin: "15px 0px" }} className="img">
            <Avatar style={{ width: '40px', height: '40px' }} />
          </div>
        )}

        <NavLink to="/" onClick={() => setActiveNav("home")}>
          <Paper
            style={{
              backgroundColor: activeNav === "home" && "#8f9d9f",
              color: activeNav === "home" && "white",
            }}
            className="navbtn"
          >
            <HomeIcon />
          </Paper>
        </NavLink>
        <NavLink to="/favourite" onClick={() => setActiveNav("favourite")}>
          <Paper
            style={{
              backgroundColor: activeNav === "favourite" && "#8f9d9f",
              color: activeNav === "favourite" && "white",
            }}
            className="navbtn"
          >
            <FavoriteBorderIcon />
          </Paper>
        </NavLink>

        {user?.email && <NavLink
          to="/nottification"
          onClick={() => setActiveNav("nottification")}
        >
          <Paper
            style={{
              backgroundColor: activeNav === "nottification" && "#8f9d9f",
              color: activeNav === "nottification" && "white",
            }}
            className="navbtn"
          >
            <Badge badgeContent={noti?.length} color="secondary">
              <NotificationsNoneIcon />
            </Badge>
          </Paper>
        </NavLink>}
        {(user?.email && adminData) && <NavLink
          to="/dashboard"
          onClick={() => setActiveNav("admin")}
        >
          <Paper
            style={{
              backgroundColor: activeNav === "admin" && "#8f9d9f",
              color: activeNav === "admin" && "white",
            }}
            className="navbtn"
          >
            <AccountBoxIcon />
          </Paper>
        </NavLink>}
      </div>
      <div className="logout">
        {!user?.email ?
          <NavLink to="/signin" onClick={() => setActiveNav("signin")}>
            <Paper
              style={{
                backgroundColor: activeNav === "signin" && "#8f9d9f",
                color: activeNav === "signin" && "white",
              }}
              className="navbtn"
            >
              <LoginIcon />
            </Paper>
          </NavLink>
          :
          <Paper
            style={{
              backgroundColor: "#8f9d9f",
              color: "white",
            }}
            className="navbtn"
            onClick={handleLogOut}
          >
            <LogoutIcon />
          </Paper>
        }
      </div>
    </div>
  );
}

export default Navbar;
