import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"


type Answer = {
  id: number;
  value: string;
}
type quizDataProps = {
  id: number;
  question: string;
  answers: Answer[];
};

type TriviaProps = {
  quizData: quizDataProps[];
};
const Trivia = ({ quizData }: TriviaProps) => {
  const { toast } = useToast()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  let pageNumber: number = Number(page);

  const optionHandler = () => {
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  }

  const submitHandler = () => {
    if (quizData[pageNumber]) {
      setIsButtonDisabled(true);
      pageNumber += 1;
      setSearchParams(`page=${pageNumber}`);
      return false;
    }
    toast({
      variant: "destructive",
      title: "No question are available !",
    })
  }
  return (
    <div className="rounded-md border bg-white p-10 shadow-2xl">
      <h2 className="py-4 text-xl">{quizData[pageNumber - 1]?.question}</h2>
      <RadioGroup onValueChange={optionHandler} className="grid grid-cols-2 gap-4">
        {quizData[pageNumber - 1]?.answers.map((item) => (
          <div
            className="has-[span]:ring-indigo-600 group relative flex items-center space-x-2 rounded-md bg-gray-100 px-8 py-4 ring-2 ring-gray-300"
            key={item.id}
          >
            <RadioGroupItem
              value={item.value}
              id={item.value}
              className="data-[state=checked]:border-indigo-600 data-[state=checked]:text-indigo-600"
            />
            <Label
              htmlFor={item.value}
              className="group-has-[span]:text-indigo-600 cursor-pointer overflow-hidden after:absolute after:inset-0"
            >
              {item.value}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Button variant={"default"} className="mt-8 w-full py-6 uppercase" disabled={isButtonDisabled} onClick={submitHandler}>
        Proceed
      </Button>
    </div>
  );
};

export default Trivia;
