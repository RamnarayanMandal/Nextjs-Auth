"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Button as MuiButton } from "@mui/material";
import { UserSideBar } from "@/app/components/UserSideBar";
import { Button } from "../../components/ui/moving-border";
import { toast, ToastContainer } from "react-toastify";
import AddQuestionDialog from "../../components/AddQuestionDialog";
import UpdateQuestionDialog from "../../components/UpdateQuestionDialog";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import { Question } from "../../components/interfaces";
import "react-toastify/dist/ReactToastify.css";
import { IoAddCircle } from "react-icons/io5";

const Page: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question>({
    subject: "",
    question: "",
    type: "",
    option: [],
    answer: "",
    instructorId: "",
    marks: 0,
  });
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const handleOnClickLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const userId = localStorage.getItem("userId");

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`/api/assignment/getByCourseId?course=${id}`);
      setQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to fetch questions.");
    }
  };

  const handleOnClickAddQuestion = () => {
    setOpen(true);
  };

  const handleUpdateQuestion = async (updatedQuestion: Question) => {
    try {
      await axios.patch(`/api/assignment/updateQuestion/`, {
        ...updatedQuestion,
        assignmentId: updatedQuestion._id
      });
      toast.success("Question updated successfully!");
      fetchQuestion();
      setUpdateOpen(false);
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question.");
    }
  };

  const handleSubmitQuestion = async () => {
    try {
      await axios.post("/api/assignment/PostQuestion", {
        ...newQuestion,
        course: id,
        instructorId: userId,
      });
      toast.success("Question added successfully!");
      fetchQuestion();
      setOpen(false);
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/assignment/deleteQuestion/`, {
        data: { id: id }
      });
      toast.success("Question deleted successfully!");
      fetchQuestion();
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question.");
    }
  };

  const handleConfirmDelete = () => {
    if (deleteQuestionId) {
      handleDelete(deleteQuestionId);
      setConfirmationOpen(false);
      setDeleteQuestionId(null);
    }
  };

  return (
    <div className="flex">
      <div className="w-30 min-h-screen bg-gray-800 flex flex-col items-center p-4 text-white">
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

      <div className="min-h-screen w-full flex flex-col justify-center relative overflow-hidden mx-auto py-10 md:py-0 bg-slate-900">
        {/* Questions Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {questions.map((question) => (
            <div
              key={question._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between space-y-4"
            >
              <div>
                <h3 className="font-bold text-lg">{question.subject}</h3>
                <p className="mt-2 text-sm">{question.question}</p>
                <p className="mt-2 text-sm"><strong>Type:</strong> {question.type}</p>
                <p className="mt-2 text-sm"><strong>Options:</strong> {question.option.join(", ")}</p>
                <p className="mt-2 text-sm"><strong>Answer:</strong> {question.answer}</p>
                <p className="mt-2 text-sm"><strong>Marks:</strong> {question.marks}</p>
              </div>
              <div className="lg:flex md:flex block my-4 justify-between items-center content-center">
                <MuiButton
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setSelectedQuestion(question);
                    setUpdateOpen(true);
                  }}
                  className="self-end"
                >
                  Update Question
                </MuiButton>
                <MuiButton
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setDeleteQuestionId(question._id);
                    setConfirmationOpen(true);
                  }}
                  className="self-start"
                >
                  Delete
                </MuiButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute lg:top-4 md:top-4 top-10 lg:left-52 md:left-24 left-4 z-20">
        <MuiButton
          variant="contained"
          color="primary"
          onClick={handleOnClickAddQuestion}
          className="mt-4 "
        >
          <IoAddCircle />
          <span className="lg:block md:block hidden">Add Question</span>
        </MuiButton>
      </div>

      {/* Add Question Dialog */}
      <AddQuestionDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmitQuestion={handleSubmitQuestion}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
      />

      {/* Update Question Dialog */}
      {selectedQuestion && (
        <UpdateQuestionDialog
          open={updateOpen}
          handleClose={() => setUpdateOpen(false)}
          handleUpdateQuestion={handleUpdateQuestion}
          question={selectedQuestion}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this question?"
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Page;
