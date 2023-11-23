import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div>
      <div className="relative ">
        <div className="">
          <img
            className="h-full w-full"
            src="https://i.ibb.co/5TkqnQ3/1.jpg"
            alt=""
          />
        </div>
        <Link
          to="/room"
          className="btn btn-xs md:btn-md lg:btn-lg md:btn-wide shadow-black md:shadow-2xl text-white border-none bg-blue-400 absolute top-[103px] md:top-[260px] lg:top-[435px]  lg:left-[65px]  normal-case hover:text-black"
        >
          Explore Rooms!
        </Link>
      </div>
    </div>
  );
};

export default Slider;
