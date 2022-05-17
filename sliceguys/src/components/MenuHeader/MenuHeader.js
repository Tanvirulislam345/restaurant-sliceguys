import { Grid } from "@mui/material";
import React from "react";
import logo1 from "../../assets/category/logo1.svg";
import logo2 from "../../assets/category/logo2.svg";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { BiHomeAlt } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import pizza from "../../assets/Rectangle 129.png";
import "./MenuHeader.css";

function MenuHeader() {
  const [toggle, setToggle] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState("home");
  const { user, adminData, userSignOut } = useAuth();

  return (
    <Grid container className="menuHeader">
      <Grid item xs={12} className="smallNavMenuIcon" sx={{ m: 2 }}>
        <div className="smallNav">
          <span onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <MenuOpenIcon style={{ fontSize: "3rem" }} />
            ) : (
              <MenuIcon style={{ fontSize: "3rem" }} />
            )}
          </span>
          {toggle && (
            <div
              className="mid-nav"
              style={{ top: toggle && "10%", transition: "0.4s ease-in-out" }}
            >
              {user?.email ? (
                <NavLink to="/profile">
                  <div style={{ margin: "15px 0px" }} className="img">
                    {/* <img src={pizza} alt="" /> */}
                    <Avatar
                      src={pizza}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                </NavLink>
              ) : (
                <div style={{ margin: "15px 0px" }} className="img">
                  <Avatar style={{ width: "40px", height: "40px" }} />
                </div>
              )}
              <NavLink to="/" onClick={() => setActiveNav("home")}>
                <p
                  style={{ border: activeNav === "home" && "2px solid black" }}
                  className="active"
                >
                  <BiHomeAlt />
                </p>
              </NavLink>
              <NavLink
                to="/favourite"
                onClick={() => setActiveNav("favourite")}
              >
                <p
                  style={{
                    border: activeNav === "favourite" && "2px solid black",
                  }}
                >
                  <MdOutlineFavoriteBorder />
                </p>
              </NavLink>

              <NavLink to="/cart" onClick={() => setActiveNav("cart")}>
                <p
                  style={{ border: activeNav === "cart" && "2px solid black" }}
                >
                  <CgShoppingCart />
                </p>
              </NavLink>
              {user?.email && (
                <NavLink
                  to="/nottification"
                  onClick={() => setActiveNav("nottification")}
                >
                  <p
                    style={{
                      border:
                        activeNav === "nottification" && "2px solid black",
                    }}
                  >
                    <IoNotificationsOutline />
                  </p>
                </NavLink>
              )}
              {user?.email && adminData && (
                <NavLink to="/dashboard" onClick={() => setActiveNav("admin")}>
                  <p
                    style={{
                      border: activeNav === "admin" && "2px solid black",
                    }}
                  >
                    <AccountBoxIcon />
                  </p>
                </NavLink>
              )}
              {!user?.email ? (
                <NavLink to="/signin" onClick={() => setActiveNav("signin")}>
                  <p
                    style={{
                      border: activeNav === "signin" && "2px solid black",
                    }}
                  >
                    <LoginIcon />
                  </p>
                </NavLink>
              ) : (
                <NavLink to="/" onClick={userSignOut}>
                  <p
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                    className="navbtn"
                  >
                    <LogoutIcon />
                  </p>
                </NavLink>
              )}
            </div>
          )}
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: '5px' }}>
          <img src={logo1} alt="" className="logo1" />
          <img src={logo2} alt="" className="logo2" />
        </div>
      </Grid>
    </Grid>
  );
}

export default MenuHeader;
