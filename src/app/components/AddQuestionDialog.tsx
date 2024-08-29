import React from "react";
import { Button as MuiButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Question } from "../components/interfaces";

interface AddQuestionDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmitQuestion: () => void;
  newQuestion: Question;
  setNewQuestion: React.Dispatch<React.SetStateAction<Question>>;
}

const AddQuestionDialog: React.FC<AddQuestionDialogProps> = ({
  open,
  handleClose,
  handleSubmitQuestion,
  newQuestion,
  setNewQuestion,
}) => {
  const handleAddOption = () => {
    setNewQuestion({ ...newQuestion, option: [...newQuestion.option, ""] });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.option];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, option: updatedOptions });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Question</DialogTitle>
      <DialogContent>
        <TextField
          label="Subject"
          fullWidth
          margin="normal"
          value={newQuestion.subject}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, subject: e.target.value })
          }
        />
        <TextField
          label="Question"
          fullWidth
          margin="normal"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
        />
        <TextField
          label="Type"
          fullWidth
          margin="normal"
          value={newQuestion.type}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, type: e.target.value })
          }
        />
        {/* Dynamic Options */}
        <div className="flex items-center">
          <label className="block mb-2">Options:</label>
          <IconButton
            onClick={handleAddOption}
            color="primary"
            aria-label="add option"
          >
            <AddIcon />
          </IconButton>
        </div>
        {newQuestion.option.map((opt, index) => (
          <TextField
            key={index}
            label={`Option ${index + 1}`}
            fullWidth
            margin="normal"
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <TextField
          label="Answer"
          fullWidth
          margin="normal"
          value={newQuestion.answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, answer: e.target.value })
          }
        />
        <TextField
          label="Marks"
          type="number"
          fullWidth
          margin="normal"
          value={newQuestion.marks}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              marks: parseInt(e.target.value, 10),
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={handleSubmitQuestion} color="primary" variant="contained">
          Submit
        </MuiButton>
        <MuiButton onClick={handleClose} color="secondary">
          Close
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionDialog;
