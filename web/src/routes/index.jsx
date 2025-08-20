import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignIn from "../pages/Sigin"
import Register from "../pages/Register"
import LadingPage from "../pages/ladingpage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LadingPage />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
