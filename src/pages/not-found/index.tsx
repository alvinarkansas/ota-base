import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
      <div>
        <h1 className="text-center text-7xl font-bold text-ntrl-400 mb-2">
          Sorry
        </h1>
        <p className="text-center">We can't seem to find this page</p>
      </div>
      <Link to="/">
        <Button>Take me back, senpai</Button>
      </Link>
    </div>
  );
};

export default NotFound;
