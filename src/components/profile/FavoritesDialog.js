import React from "react";
import close from "../../assets/icons/close.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./FavoritesDialog.module.css";
import { Link } from "react-router-dom";

function FavoritesDialog({ open, handleClose, favorites }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            backgroundColor: "#fff",
            marginBottom: "30px",
            position: "sticky",
            top: "0",
          }}
          id="alert-dialog-title"
        >
          <button className={styles.Xclose} onClick={handleClose}>
            <img src={close} alt="X" />
          </button>
          <span className={styles.titleName}>Favorite hosts</span>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            overflowY: "visible",
          }}
        >
          {favorites.map((item) => {
            return (
              <div key={item.id} className={styles.favContainer}>
                <div className={styles.hostContainer}>
                  <div className={styles.hostInfo}>
                    <div>
                      <Link to={`/item/${item.id}`}>
                        <img
                          style={{ width: "100%" }}
                          src={item.urls[0]}
                          alt="host img"
                        />
                      </Link>
                    </div>
                    <div style={{ padding: "5px 10px" }}>
                      <p> {item.hostName}</p>
                      <p> {item.location}</p>
                      <p>
                        <strong>{item.price} $</strong> per/night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          <Button
            sx={{
              border: "1px solid #838383",
              color: "#212121",
              padding: "5px 16px",
              borderRadius: "4px",
              textTransform: "capitalize",
            }}
            onClick={handleClose}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FavoritesDialog;
