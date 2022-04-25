import { React, useContext } from "react";
import { Routes, Route, Link, Navigate, BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Headers/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/signUp/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ItemScreen from "./screens/ItemScreen";
import HeaderSignedIn from "./components/Headers/HeaderSignedIn";
import SellingScreen from "./screens/SellingScreen";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import EditProfilePage from "./components/ProfilePage/EditProfilePage";
import SearchPage from "./components/SearchPage/SearchPage";
import Messanger from "./screens/Messenger/Messanger";
import OwnProfilePage from "./components/ProfilePage/OwnProfilePage";
import { AuthContext } from "./context/AuthContext";
import IfOwnProfile from "./screens/ifOwnProfile";
import EditItem from "./components/ItemPage/editItem";
import HomePage from "./components/HomePage/HomePage";
import SoldItemPage from "./components/ItemPage/SoldItemPage";
import LoginWrongPass from "./components/Login/LoginWrongPass";

// function App() {
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <main>
                  <Container>
                    <h1>Welcome Emory Exchange</h1>
                    <HomeScreen />
                  </Container>
                </main>
                <Footer />)
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/product/:id"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <ItemScreen />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/product/:id/edit"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <EditItem />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/product/:id/sold"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <SoldItemPage />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>

      <Route
        path="/search/:key"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <SearchPage />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/search/"
        element={
          <>
            {user ? (
              <>
                <Navigate to="/" />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/:username"
        element={
          <>
            {user ? (
              <>
                <IfOwnProfile />
                {/* <HeaderSignedIn />
            <ProfilePage /> */}
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/own/edit"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <EditProfilePage />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/own"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <OwnProfilePage />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/login"
        // element={ <Navigate to="/login" />}
        element={<>{user ? <Navigate to="/" /> : <LoginScreen />}</>}
      ></Route>
      <Route
        path="/login2"
        // element={ <Navigate to="/login" />}
        element={<>{user ? <Navigate to="/" /> : <LoginWrongPass />}</>}
      ></Route>
      <Route
        path="/chat"
        element={
          <>
            <HeaderSignedIn />
            <Messanger />
          </>
        }
      ></Route>

      <Route
        path="/login/forgotPassword"
        element={
          <>
            <Header />
            <ForgotPasswordScreen />
          </>
        }
      ></Route>
      <Route
        path="/sell"
        element={
          <>
            {user ? (
              <>
                <HeaderSignedIn />
                <SellingScreen />
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <>
            <Header />
            <SignUpScreen />
          </>
        }
      ></Route>
    </Routes>
  );
};

export default App;
