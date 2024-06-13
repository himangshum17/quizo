import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/routes";
import { Link, createSearchParams } from "react-router-dom";

const categoryList = [
  {
    id: 1,
    name: "Fun Quizzes",
    image: "https://placehold.co/400",
  },
  {
    id: 2,
    name: "Trivia Quizzes",
    image: "https://placehold.co/400",
  },
  {
    id: 3,
    name: "Animal Quizzes",
    image: "https://placehold.co/400",
  },
  {
    id: 4,
    name: "Education Quizzes",
    image: "https://placehold.co/400",
  },
  {
    id: 5,
    name: "Car Quizzes",
    image: "https://placehold.co/400",
  },
  {
    id: 6,
    name: "Beauty Quizzes",
    image: "https://placehold.co/400",
  },
  {
    id: 7,
    name: "Blogging Quizzes",
    image: "https://placehold.co/400",
  },
  {
    id: 8,
    name: "Business Quizzes",
    image: "https://placehold.co/400",
  },
];
const SelectCategory = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Select the cateory in which you want to proceed.
        </h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categoryList.map((item) => {
            return (
              <Link
                to={`${ROUTES.QUESTIOANDANSWER}/${item?.id}?${createSearchParams({ page: "1" })}`}
                key={item.id}
              >
                <Card>
                  <CardHeader>
                    <img src={item?.image} className="mb-3" alt="alt text" />
                    <CardTitle>{item?.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default SelectCategory;
