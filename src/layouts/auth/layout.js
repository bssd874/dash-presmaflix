import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Logo } from "src/components/logo";

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            // alignItems: "center",
            // background: "radial-gradient(50% 50% at 50% 50%, black 0%, #131313 100%)",
            color: "white",
            backgroundImage: "url(/empty-rows-movie-theatre.jpg)",
            backgroundSize: "200%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            // justifyContent: "center",
            justifyContent: "center",
            alignItems: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              // backgroundSize: "500%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                mb: 1,
              }}
              variant="h1"
            >
              Welcome to{" "}
              <Box component="a" sx={{ color: "#E50914" }} target="_blank">
                Presmaflix
              </Box>
            </Typography>
            <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
              Content Management System Presmaflix.
            </Typography>
            {/* <img
              alt=""
              src="/assets/auth-illustration.svg"
            /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node,
};
