import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";
import UserProfile from "./components/UserProfile/UserProfile";
import Layout from "./components/Layout/Layout";
const Login = lazy(() => import("./components/Authentication/Login"));
const Logout = lazy(() => import("./components/Authentication/Logout"));
const CartDetails = lazy(() => import("./components/Cart/CartDetails"));

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<Loading />}>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/login"
                element={
                  <PageWrapper>
                    <Login />
                  </PageWrapper>
                }
              />
              <Route
                path="/cart"
                element={
                  <PageWrapper>
                    <CartDetails />
                  </PageWrapper>
                }
              />
              <Route
                path="/logout"
                element={
                  <PageWrapper>
                    <Logout />
                  </PageWrapper>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <PageWrapper>
                    <UserProfile />
                  </PageWrapper>
                }
              />
            </Routes>
          </Layout>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default App;
