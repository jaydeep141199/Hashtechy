import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AppLayout from "./layout/Applayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
