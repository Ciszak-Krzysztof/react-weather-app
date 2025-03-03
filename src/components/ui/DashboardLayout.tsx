import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  List,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Drawer } from "./Drawer";
import { NavigationLinks } from "./NavigationLinks";

export default function DashboardLayout() {
  const [drawerOpened, setDrawerOpened] = React.useState(true);

  const toggleDrawerOpened = () => {
    setDrawerOpened((prev) => !prev);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute">
          <Toolbar
            disableGutters
            sx={{
              pl: "20px",
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawerOpened}
              sx={{
                marginRight: "36px",
                ...(drawerOpened && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={drawerOpened}
          sx={{
            overflowX: "hidden",
            ".MuiPaper-root": {
              display: "flex",
              justifyContent: "space-between",
              overflowX: "hidden",
            },
          }}
        >
          <Box>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawerOpened}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <NavigationLinks />
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100dvh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth={false}
            sx={{
              px: { xs: 0 },
              height: "calc(100dvh - 64px)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ height: "100%", overflow: "auto" }}>
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
}
