
export interface Question {
    subject: string;
    question: string;
    type: string;
    option: string[];
    answer: string;
    instructorId: string;
    marks: number;
  }
  
  export interface AddQuestionDialogProps {
    open: boolean;
    handleClose: () => void;
    handleSubmitQuestion: () => void;
    newQuestion: Question;
    setNewQuestion: React.Dispatch<React.SetStateAction<Question>>;
  }
  


  export interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    instructor?: string; // Optional field for the instructor's ID
    createdAt?: string;
    updatedAt?: string;
  }