import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoutes";
import Analytics from "./pages/Analytics";
import Applications from "./pages/Applications"
import Profile from "./pages/Profile";
import Settings from "./pages/Settings"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/applications" element={<ProtectedRoute><Applications></Applications></ProtectedRoute>}></Route>
        <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>}/>
        <Route path="/settings" element={<ProtectedRoute><Settings></Settings></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;