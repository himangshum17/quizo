import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SelectCategory = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          Select the cateory in which you want to proceed.
        </h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
            return (
              <Link to={"#"} key={index}>
                <Card>
                  <CardHeader>
                    <img
                      src="https://placehold.co/400x400/png"
                      className="mb-3"
                      alt="alt text"
                    />
                    <CardTitle>Card Title</CardTitle>
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
