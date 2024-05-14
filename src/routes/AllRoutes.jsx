import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Feedback from "../pages/Feedback";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
};

export default AllRoutes;
