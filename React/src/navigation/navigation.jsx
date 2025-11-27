import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "../pages/HomeScreen";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        {/* <Route path="*" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
