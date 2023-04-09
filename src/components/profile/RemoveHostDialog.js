import React from "react";
import {
  auth,
  offersCollection,
  usersCollection,
} from "../../configs/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import styles from "./RemoveHostDialog.module.css";

function RemoveHostDialog({ removeOpen, closeRemove, hosts }) {
  return (
    <div>
      <Dialog open={removeOpen.open} onClose={closeRemove}>
        <DialogTitle className={styles.title}>
          Are you sure you want delete this host?
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <p>{removeOpen.host.hostName}</p>
          <img width="200px" alt="pic" src={removeOpen.host.urls[0]} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            sx={{ color: "#3f3b34", borderColor: "#3f3b34" }}
            onClick={closeRemove}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await updateDoc(doc(usersCollection, auth?.currentUser?.uid), {
                userHosts: hosts.filter((item) => item !== removeOpen.host.id),
              });
              await deleteDoc(doc(offersCollection, removeOpen.host.id));
              closeRemove();
              window.location.reload(false);
            }}
            sx={{
              color: "#3f3b34",
              borderColor: "#3f3b34",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RemoveHostDialog;
