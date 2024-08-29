
import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { Question } from "./interfaces";

interface UpdateQuestionDialogProps {
  open: boolean;
  handleClose: () => void;
  handleUpdateQuestion: (updatedQuestion: Question) => void;
  question: Question;
}

const UpdateQuestionDialog: React.FC<UpdateQuestionDialogProps> = ({
  open,
  handleClose,
  handleUpdateQuestion,
  question,
}) => {
  const [updatedQuestion, setUpdatedQuestion] = useState<Question>(question);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    handleUpdateQuestion(updatedQuestion);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Question</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="subject"
          label="Subject"
          type="text"
          fullWidth
          value={updatedQuestion.subject}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="question"
          label="Question"
          type="text"
          fullWidth
          value={updatedQuestion.question}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="type"
          label="Type"
          type="text"
          fullWidth
          value={updatedQuestion.type}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="option"
          label="Options (comma separated)"
          type="text"
          fullWidth
          value={updatedQuestion.option.join(", ")}
          onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, option: e.target.value.split(", ") }))}
        />
        <TextField
          margin="dense"
          name="answer"
          label="Answer"
          type="text"
          fullWidth
          value={updatedQuestion.answer}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="marks"
          label="Marks"
          type="number"
          fullWidth
          value={updatedQuestion.marks}
          onChange={(e) => setUpdatedQuestion((prev) => ({ ...prev, marks: Number(e.target.value) }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateQuestionDialog;
