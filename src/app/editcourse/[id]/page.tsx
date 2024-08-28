"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button as MuiButton,
  TextField,
} from "@mui/material";
import { UserSideBar } from "@/app/components/UserSideBar";
import { Button } from "../../components/ui/moving-border";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();
  const {  id } = useParams(); 
  const [open, setOpen] = useState(false); 
  const [questions, setQuestions] = useState([]); 
  const [newQuestion, setNewQuestion] = useState({
    subject: "",
    question: "",
    type: "",
    option: [],
    answer: "",
    instructorId: "",
    marks: 0,
  });

  

  const handleOnClickLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  useEffect(()=>{
    fetchQuestion();
  },[])


  const fetchQuestion= async()=>{
    try {
      const response = await axios.get(`/api/assignment/getByCourseId?course=${id}`);
      setQuestions(response.data); // Set fetched data to state
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to fetch questions.");
    }
  }

  const handleOnClickAddQuestion = async () => {
    setOpen(true); 
  };

  const handleSubmitQuestion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/assignment/PostQuestion",
        { ...newQuestion, course: id }
      );
      toast.success("Question added successfully!");
      fetchQuestion()
      setOpen(false);

    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question.");
    }
  };

  return (
    <div className="flex">
      <div className="w-30 h-screen bg-gray-800 flex flex-col items-center p-4 text-white">
        <UserSideBar />

      </div>

      <div className="absolute top-4 right-4 z-20">
        <Button
          borderRadius="1.75rem"
          className="flex items-center gap-2 bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={handleOnClickLogout}
        >
          <FaUser className="text-lg" />
          Log out
        </Button>

      </div>


      <div className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0 bg-slate-900"></div>
      <div className="absolute top-4 left-52 z-20">
        <MuiButton
          variant="contained"
          color="primary"
          onClick={handleOnClickAddQuestion}
          className="mt-4"
        >
          Add Question
        </MuiButton>
      </div>
      {/* Dialog for adding questions */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={newQuestion.subject}
            onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
          />
          <TextField
            label="Question"
            fullWidth
            margin="normal"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          />
          <TextField
            label="Type"
            fullWidth
            margin="normal"
            value={newQuestion.type}
            onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
          />
          {/* Add fields for options, answer, instructorId, and marks */}
          {/* For simplicity, here are examples for options and answer */}
          <TextField
            label="Options (comma-separated)"
            fullWidth
            margin="normal"
            value={newQuestion.option.join(",")}
            onChange={(e) => setNewQuestion({ ...newQuestion, option: e.target.value.split(",") })}
          />
          <TextField
            label="Answer"
            fullWidth
            margin="normal"
            value={newQuestion.answer}
            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
          />
          <TextField
            label="Marks"
            type="number"
            fullWidth
            margin="normal"
            value={newQuestion.marks}
            onChange={(e) => setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleSubmitQuestion} color="primary">
            Submit
          </MuiButton>
          <MuiButton onClick={() => setOpen(false)} color="secondary">
            Close
          </MuiButton>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Page;
