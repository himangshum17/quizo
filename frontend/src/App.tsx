import { Button } from "@/components/ui/button";
function App() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="grid grid-cols-2 gap-4">
        <Button>option 1</Button>
        <Button>option 2</Button>
        <Button>option 3</Button>
        <Button>option 4</Button>
      </div>
    </div>
  );
}

export default App;
