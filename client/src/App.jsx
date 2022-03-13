import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Router>
          <Header />
          <main>
            <AppRoutes />
          </main>
        </Router>
        <ToastContainer />
      </HelmetProvider>
    </>
  );
}

export default App;
