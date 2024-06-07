import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Answer = {
  id: number;
  value: string;
};

type TriviaProps = {
  question: string;
  answers: Answer[];
  submitHandler: () => void;
};
const Trivia = ({ question, answers,submitHandler }: TriviaProps) => {
  return (
    <div className="rounded-md border bg-white p-10 shadow-2xl">
      <h2 className="py-4 text-xl">{question}</h2>
      <RadioGroup className="grid grid-cols-2 gap-4">
        {answers.map((item) => (
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
      <Button variant={"default"} className="mt-8 w-full py-6 uppercase" onClick={submitHandler}>
        Proceed
      </Button>
    </div>
  );
};

export default Trivia;
