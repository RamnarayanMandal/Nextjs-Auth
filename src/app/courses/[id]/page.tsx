"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
} from "@mui/material";
import { Button } from "../../components/ui/moving-border";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { UserSideBar } from "../../components/UserSideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Page = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const { id } = useParams();
  const router = useRouter();

  const fetchAssignments = async () => {
    if (!id) return;

    try {
      const response = await fetch(
        `/api/assignment/getByCourseId?course=${encodeURIComponent(id)}`
      );
      const data = await response.json();
      if (data.message === "Assignments fetched successfully") {
        setAssignments(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchUserDetails();

    const email = localStorage.getItem("UserId");
    if (email) {
      setUserEmail(email);
    }
  }, [id]);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`/api/users/aboutme`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(response.data.data._id);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    if (currentQuestions.length > 0) {
      setTimer(currentQuestions.length * 60);
    }
  }, [currentQuestions]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && currentQuestions.length > 0) {
      handleSubmit();
    }
  }, [timer, currentQuestions]);

  const handleTakeTest = (subject) => {
    const questionsForSubject = assignments.filter(
      (assignment) => assignment.subject === subject
    );
    setCurrentQuestions(questionsForSubject);
    setCurrentQuestionIndex(0);
  };

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    if (currentQuestion.answer === userAnswer) {
      setScore((prevScore) => prevScore + 5);
      toast.success("Correct answer!");
    } else {
      toast.error("Wrong answer!");
    }

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Save mock data after all questions are answered
      saveMockData(assignments[currentQuestionIndex].subject, id, score);
      setCurrentQuestions([]);
    }

    setUserAnswer("");
  };

  const saveMockData = async (subject, courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/users/test`,
        {
          userId: userId,
          courseId: courseId,
          subjectName: subject,
          mockTestScore: score,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Mock test data saved successfully!");
    } catch (error) {
      console.error("Failed to save mock test data:", error);
    }
  };

  const uniqueSubjects = [...new Set(assignments.map((a) => a.subject))];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleOnclick = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex">
      <div
        className={`w-30 h-screen bg-gray-800 flex flex-col items-center p-4 text-white `}
      >
        <UserSideBar />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <Button
          borderRadius="1.75rem"
          className="flex items-center gap-2 bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          onClick={handleOnclick}
        >
          <FaUser className="text-lg" />
          Log out
        </Button>
      </div>

      <div className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0 bg-slate-900">
        {userEmail && (
          <div className="mb-4 p-4 bg-gray-700 text-white rounded-lg">
            <Typography variant="body1">User Email: {userEmail}</Typography>
          </div>
        )}

        {uniqueSubjects.map((subject) => (
          <Card
            key={subject}
            sx={{
              maxWidth: 500,
              minInlineSize: 250,
              maxHeight: 400,
              minHeight: 200,
              marginBottom: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="text-center mb-4"
              >
                {subject}
              </Typography>

              <Typography
                gutterBottom
                component="div"
                className="text-center mb-4"
              >
                No of Question: {assignments?.length}
                <br /> (time: {assignments?.length * 1} min)
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleTakeTest(subject)}
              >
                Take Test
              </Button>
            </CardContent>
          </Card>
        ))}

        <Dialog
          open={currentQuestions.length > 0}
          onClose={() => setCurrentQuestions([])}
        >
          {currentQuestions.length > 0 && (
            <>
              <DialogTitle>
                {currentQuestions[currentQuestionIndex].question}
              </DialogTitle>
              <DialogContent>
                <RadioGroup value={userAnswer} onChange={handleAnswerChange}>
                  {currentQuestions[currentQuestionIndex].option.map(
                    (opt, index) => (
                      <FormControlLabel
                        key={index}
                        value={opt}
                        control={<Radio />}
                        label={opt}
                      />
                    )
                  )}
                </RadioGroup>
                <Typography variant="h6" align="center">
                  Time Remaining: {formatTime(timer)}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit} color="primary">
                  Submit Answer
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {score > 0 && (
          <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
            <Typography variant="h6">Your Score: {score}</Typography>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
