import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Featured = ({ Room }) => {
  useEffect(() => {
    Aos.refresh();
  }, []);
  return (
    <div>
      <div
        data-aos="flip-left"
        data-aos-duration="2000"
        className="card bg-blue-200 shadow-2xl"
      >
        <figure>
          <img src={Room.image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {Room.price}$
            <div className="badge bg-red-600 text-white shadow-black shadow-sm">
              featured
            </div>
          </h2>
          <p>{Room.short_description}</p>
          <div className="card-actions justify-end">
            <Link
              to={`/room/details/${Room._id}`}
              className="btn btn-sm lg:btn-md  shadow-slate-600 shadow-md text-white border-none bg-blue-400  normal-case hover:text-black"
            >
              Book Now !
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
