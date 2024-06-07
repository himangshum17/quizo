import Timer from "@/components/timer/timer";
import Trivia from "@/components/trivia/trivia";
import { useParams, useSearchParams } from "react-router-dom";
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
    question: 'What is the largest lake in the world?',
    answers: [
      { id: 1, value: 'Caspian Sea' },
      { id: 2, value: 'Baikal' },
      { id: 3, value: 'Lake Superior' },
      { id: 4, value: 'Ontario' },
    ]
  }
];
const QuestionandAnswer = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  // const pagingNumber = Number(page);
  let pageNumber: number = Number(page);
  const { id } = params;

  const submitHandler = () => {
    if (quizData[pageNumber]) {
      pageNumber += 1;
      setSearchParams(`page=${pageNumber}`);
      return false;
    }
    alert('No question are available !');
  }
  if (pageNumber === null) {
    return <div>Not found</div>
  }
  return (
    <div className="grid h-screen place-content-center bg-neutral-200">
      <div className="container max-w-2xl space-y-12">
        <Timer />
        <Trivia {...quizData[pageNumber - 1]} submitHandler={submitHandler} />
      </div>
    </div>
  );
};
export default QuestionandAnswer;
