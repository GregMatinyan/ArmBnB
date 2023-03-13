import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import styles from "./InputForm.module.css";

export default function LogInForm() {
  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={styles.inputForm}
      >
        <Input
          placeholder="Username or email address"
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <Input
          placeholder="Password"
          type="password"
          required
          sx={{ mb: 1, bgcolor: "#b9c0e0" }}
        />
        <Button type="submit">Log In</Button>
      </form>
    </Box>
  );
}
