import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup.jsx";
import Signin from "../pages/Signin.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;