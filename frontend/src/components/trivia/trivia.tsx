import { Button } from "@/components/ui/button";
type TriviaProps = {
  question: string;
  answers: string[];
};
const Trivia = ({ question, answers }: TriviaProps) => {
  return (
    <div className="rounded-md border bg-white p-10 shadow-2xl">
      <h2 className="py-4 text-xl">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {answers.map((item) => (
          <Button key={item} variant={"outline"} className="py-6 capitalize">
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
