import Login from "./components/accounts/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useState } from "react";
import CreatePost from "./components/create/CreatePost";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  // if user is authenticate then can move further otherwise send back to login page
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          {/* <Header /> */}
          <div style={{ marginTop: "60px" }}>
            {/* <h1 style={{ textAlign: "center" }}> Hello Bloggers !!👋🏻</h1> */}
            <Routes>
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/" element={<Home />} />
              </Route>

              <Route
                path="/create"
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path="/create" element={<CreatePost />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
