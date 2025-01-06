import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="grid h-screen w-full place-content-center">
      <div className="flex flex-col items-center gap-1">
        <Loader2 className="animate-spin" />
        <p>loading...</p>
      </div>
    </div>
  );
};
export default Loader;
