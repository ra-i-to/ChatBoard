import React, { useContext, useState } from "react";
import { app } from "../firebase.js";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./Header.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AuthContext } from "../auth/AuthProvider";
import SendIcon from "@material-ui/icons/Send";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Header({ userId }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            className="header-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <Link to="/">
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link to={"/profile/" + userId}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link to="/room-list">
                <ListItemIcon>
                  <GroupIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="RoomList" />
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link to={"/messages/"}>
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link to="/Settings">
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </Link>
            </StyledMenuItem>
          </StyledMenu>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Chat Boad</Link>
          </Typography>
          <Button color="inherit" onClick={() => app.auth().signOut()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
