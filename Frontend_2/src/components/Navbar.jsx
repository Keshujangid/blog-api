// import { Button } from "@mui/material";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Logout } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import icon from "@/src/assets/icon.svg";
import { useContext, useState } from "react";
import { AuthContext } from "@/src/contexts/UseContexts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-white fixed shadow z-10">
      {/* <div className="container mx-auto px-4 py-4 flex justify-between items-center"> */}
      {/* <h1 className="text-xl font-bold text-blue-600">My Blog</h1> */}
      <nav className="bg-black py-4 flex justify-center items-center w-screen">
        <a href="/" className="absolute left-6">
          <img src={icon} alt="icon" className="w-8 h-8 " />
        </a>
        <ul className="text-white flex gap-x-12">
          <li className="relative table-cell py-2">
            <a
              className="inline-block relative no-underline after-line"
              href="/"
            >
              Home
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-x-4 absolute right-4">
          {!auth.isAuthenticated ? (
            <ThemeProvider theme={theme}>
              <Button variant="outlined" color="primary" href="/login">
                Log in
              </Button>
            </ThemeProvider>
          ) : (
            <>
              <div className=" sm:flex items-center gap-x-4 hidden">
                <h3 className="text-white">
                  {localStorage.getItem("user").toLocaleUpperCase()}
                </h3>
                <ThemeProvider theme={theme}>
                  <Button variant="outlined" color="primary" onClick={logout}>
                    Log Out
                  </Button>
                </ThemeProvider>
              </div>
              <div className="block sm:hidden ">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {localStorage.getItem("user").charAt(0).toLocaleUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> {localStorage.getItem("user")}
                  </MenuItem>
                  <Divider />

                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* </div> */}
    </header>
  );
};
