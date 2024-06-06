import Timer from "@/components/timer/timer";
import Trivia from "@/components/trivia/trivia";
import { useParams } from "react-router-dom";
// mock data
const quizData = {
  id: 1,
  question: "What is the only continent with land in all four hemispheres?",
  answers: [
    { id: 1, value: "Asia" },
    { id: 2, value: "Africa" },
    { id: 3, value: "Europe" },
    { id: 4, value: "America" },
  ],
  correctAnswer: "answer1",
};
const QuestionandAnswer = () => {
  const params = useParams();
  const { id } = params;
  return (
    <div className="grid h-screen place-content-center bg-neutral-200">
      <div className="container max-w-2xl space-y-12">
        <Timer />
        <Trivia {...quizData} />
      </div>
    </div>
  );
};
export default QuestionandAnswer;
