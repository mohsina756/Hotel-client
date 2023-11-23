import { useState } from "react";
import { Link } from "react-router-dom";
import BookedRoom from "./BookedRoom";
import { Helmet } from "react-helmet";
import bookedFav from "/booked.svg";
// import { useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
import { useEffect } from "react";
import { useContext } from "react";
import { context } from "./ContextProvider/Provider";
// import Aos from "aos";
import axios from "axios";
// import Aos from "aos";
// import Swal from "sweetalert2";

const Booked = () => {
  // const Room = useLoaderData();
  const { user } = useContext(context);

  // const navigate = useNavigate();
  const [bookedRooms, setBookedRooms] = useState();
  useEffect(() => {
    // Aos.refresh();
    axios
      .get(`http://localhost:5000/booked/${user.email}`, {
        withCredentials: true,
      })
      .then((res) => setBookedRooms(res.data));
  }, [user?.email]);

  return (
    <div>
      <Helmet>
        <link rel="icon" href={bookedFav} type="image/x-icon" />
        <title>Booked Rooms</title>
      </Helmet>
      <div
      // data-aos="fade-up" data-aos-duration="2000"
      >
        <h1 className="text-center rounded-xl border border-l-4 border-slate-200 m-5 bg-blue-200 md:text-3xl font-bold py-2">
          Booked Rooms:{bookedRooms?.length}
        </h1>
      </div>

      {bookedRooms?.length === 0 ? (
        <div
          // data-aos="fade-down"
          // data-aos-duration="2000"
          className="text-center space-y-10 my-10"
        >
          <p className="text-2xl mt-5 font-bold text-red-600">
            Sorry ! You Currently have no bookings
          </p>
          <Link
            to="/room"
            className="btn btn-sm lg:btn-md  shadow-slate-600 shadow-md text-white border-none bg-blue-400  normal-case hover:text-black"
          >
            Book your room
          </Link>
        </div>
      ) : (
        <div
          // data-aos="fade-up"
          // data-aos-duration="2000"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 my-5 gap-8"
        >
          {bookedRooms?.map((Room) => (
            <BookedRoom
              key={Room._id}
              Room={Room}
              setBookedRooms={setBookedRooms}
              bookedRooms={bookedRooms}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Booked;
