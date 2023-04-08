import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import close from "../../assets/icons/close.png";
import styles from "./ReviewsDialog.module.css";
import { auth } from "../../configs/firebase";

function ReviewsDialog({ open, closeReview, comments, addComment, reGet }) {
  const [comment, setComment] = useState("");

  return (
    <Dialog
      open={open}
      onClose={closeReview}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginBottom: "12px",
        }}
        id="alert-dialog-title"
      >
        <button className={styles.Xclose} onClick={closeReview}>
          <img alt="X" src={close} />
        </button>
      </DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div className={styles.container}>
          <h3>Reviews</h3>
          {!comments ? (
            <p>No reviews yet</p>
          ) : (
            Object.entries(comments).map((elem) => {
              return (
                <div key={elem[0]}>
                  <div className={styles.userContainer}>
                    <img src={elem[1].avatar} alt="avatar" />
                    <p>{elem[1].name}</p>
                  </div>
                  <div className={styles.commentContainer}>
                    <p>{elem[1].text}</p>
                  </div>
                </div>
              );
            })
          )}
          <div className={styles.addComment}>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={() => {
                addComment(comment);
                reGet();
                setComment("");
              }}
            >
              {comments && comments.hasOwnProperty(auth?.currentUser?.uid)
                ? "Change review"
                : "Add review"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewsDialog;
