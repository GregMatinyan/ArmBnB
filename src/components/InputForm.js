import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import styles from "./InputForm.module.css";

export default function InputForm() {
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
        className={styles.inputForm}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          placeholder="Name"
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Input
          placeholder="Surname"
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Input
          placeholder="Email"
          type="email"
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Input
          placeholder="Password"
          type="password"
          required
          sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Box>
  );
}
