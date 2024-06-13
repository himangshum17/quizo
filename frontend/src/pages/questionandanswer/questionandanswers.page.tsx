import Timer from "@/components/timer/timer";
import Trivia from "@/components/trivia/trivia";
// mock data
const quizData = [
  {
    id: 1,
    question: "What is the only continent with land in all four hemispheres?",
    answers: [
      { id: 1, value: "Asia" },
      { id: 2, value: "Africa" },
      { id: 3, value: "Europe" },
      { id: 4, value: "America" },
    ],
    // correctAnswer: "answer1",
  },
  {
    id: 2,
    question: "What is the largest lake in the world?",
    answers: [
      { id: 1, value: "Caspian Sea" },
      { id: 2, value: "Baikal" },
      { id: 3, value: "Lake Superior" },
      { id: 4, value: "Ontario" },
    ],
  },
];
const QuestionandAnswer = () => {
  return (
    <div className="grid min-h-screen place-content-center bg-neutral-200 py-20">
      <div className="container space-y-12">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-700 lg:text-3xl">
            Hello, Koushik
          </h1>
          <div className="flex items-center gap-2">
            Timer : <Timer />
          </div>
        </div>
        <div className="max-w-2xl">
          <Trivia quizData={quizData} />
        </div>
      </div>
    </div>
  );
};
export default QuestionandAnswer;
