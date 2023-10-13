import Trivia from "@/components/trivia/trivia";
import Timer from "@/components/timer/timer";
// mock data
const quizData = {
  id: 1,
  question:
    "What is the <on></on>ly continent with land in all four hemispheres?",
  answers: ["Asia", "Africa", "Europe", "South America"],
  correctAnswer: "answer1",
};
function App() {
  return (
    <div className="grid h-screen place-content-center bg-neutral-200">
      <div className="container max-w-2xl space-y-12">
        <Timer />
        <Trivia {...quizData} />
      </div>
    </div>
  );
}

export default App;
