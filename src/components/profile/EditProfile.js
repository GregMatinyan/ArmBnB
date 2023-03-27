import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { addDoc } from "firebase/firestore";
// import { auth, googleProvider, usersListRef } from "../../configs/firebase";
import styles from "./EditProfile.module.css";

export default function EditProfile({ open, handleClose, updateData, avatar }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [uploaded, setUploaded] = useState(null);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          setName("");
          setSurname("");
        }}
      >
        <DialogTitle className={styles.title}>
          Create your ArmBnB account
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <label htmlFor="upload-img">
            <img
              style={{ borderRadius: "10px" }}
              width="120px"
              src={avatar}
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
