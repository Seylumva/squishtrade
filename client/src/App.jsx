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
        <ToastContainer
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          style={{ top: "80px" }}
          limit={1}
          hideProgressBar={true}
          autoClose={1500}
          theme="colored"
        />
      </HelmetProvider>
    </>
  );
}

export default App;
