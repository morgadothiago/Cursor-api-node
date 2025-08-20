import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignIn from "../pages/Sigin"
import LadingPage from "../pages/ladingpage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LadingPage />} />
        <Route path="*" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
