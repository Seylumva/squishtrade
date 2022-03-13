import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <AppRoutes />
        </main>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
