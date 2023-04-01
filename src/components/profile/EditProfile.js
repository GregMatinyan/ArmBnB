import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./EditProfile.module.css";

export default function EditProfile({
  open,
  handleClose,
  updateData,
  userData,
}) {
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surname);
  const [uploaded, setUploaded] = useState(null);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <DialogTitle className={styles.title}>
          Edit your profile data
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <label htmlFor="upload-img">
            <img
              style={{ borderRadius: "10px" }}
              width="120px"
              src={userData.url}
              alt="avatar"
            />
          </label>
          <TextField
            className={styles.input}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            className={styles.input}
            autoFocus
            margin="dense"
            id="name"
            label="Surname"
            type="text"
            fullWidth
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            variant="outlined"
          />

          <input
            style={{ display: "none" }}
            id="upload-img"
            type="file"
            onChange={(e) => setUploaded(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            sx={{ color: "#3f3b34", borderColor: "#3f3b34" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await updateData(name, surname, uploaded);
              handleClose();
              window.location.reload(false);
            }}
            sx={{
              color: "#3f3b34",
              borderColor: "#3f3b34",
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
