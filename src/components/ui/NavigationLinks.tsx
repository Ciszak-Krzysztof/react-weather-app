import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const NavigationLinks = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActivePath = (path: string) => {
    return path === location?.pathname.split("/")[1];
  };

  const navLinks = [
    {
      icon: <TimelineOutlinedIcon />,
      activeIcon: <TimelineIcon />,
      name: t("navigationLinks.forecast"),
      path: "forecast",
    },
    {
      icon: <ThermostatOutlinedIcon />,
      activeIcon: <ThermostatIcon />,
      name: t("navigationLinks.currentWeather"),
      path: "",
    },
  ];

  const links = navLinks.map((link) => {
    return (
      <Link to={link.path} key={link.path}>
        <ListItemButton
          sx={{
            backgroundColor: () => (isActivePath(link.path) ? "lightblue" : ""),
            color: () => (isActivePath(link.path) ? "blue" : ""),
          }}
        >
          <ListItemIcon
            sx={{
              color: () => (isActivePath(link.path) ? "blue" : ""),
            }}
          >
            {isActivePath(link.path) ? link.activeIcon : link.icon}
          </ListItemIcon>
          <ListItemText
            primary={link.name}
            sx={{
              color: () => (isActivePath(link.path) ? "blue" : ""),
            }}
          />
        </ListItemButton>
      </Link>
    );
  });

  return <React.Fragment>{links}</React.Fragment>;
};
