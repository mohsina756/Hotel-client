import Aos from "aos";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";
import roomFav from "/room.svg";

const Rooms = () => {
  const allRooms = useLoaderData();
  //   console.log(availableRooms);
  const [availableRooms, setAvailableRooms] = useState(allRooms);
  useEffect(() => {
    Aos.refresh();
  }, []);
  console.log(availableRooms);
  const handleSort = (e) => {
    const value = e.target.value;
    fetch(`http://localhost:5000/room/${value}`)
      .then((res) => res.json())
      .then((data) => setAvailableRooms(data));
  };
  return (
    <div>
      <Helmet>
        <link rel="icon" href={roomFav} type="image/x-icon" />
        <title>Rooms</title>
      </Helmet>
      <div className="flex justify-center">
        <select
          className="select select-bordered lg:w-full lg:max-w-xs text-black"
          onChange={handleSort}
        >
          <option value="">Sort by price</option>
          <option value="asc">Sort Low to High Price </option>
          <option value="desc"> Sort High to Low Price</option>
        </select>
      </div>
      <div data-aos="fade-down" data-aos-duration="2000">
        <h1 className="text-center rounded-xl border border-l-4 border-slate-200 m-5 bg-blue-200 md:text-3xl font-bold py-2">
          Available Rooms !
        </h1>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10 mb-10"
      >
        {availableRooms.map((Room) => (
          <div className="card bg-blue-200 shadow-2xl" key={Room._id}>
            <Link className="card-body" to={`/room/details/${Room._id}`}>
              <img className="rounded-lg" src={Room.image} alt="" />
              <div className="flex mt-2">
                <p className="text-center">
                  <p>{Room.review_count} review</p>
                  Price: <span className=" font-bold">{Room.price}</span> $
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
