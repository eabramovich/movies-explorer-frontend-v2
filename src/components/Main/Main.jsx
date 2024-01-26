import React from "react";
import "./Main.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Technology from "../Technology/Technology";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main() {
  const { isLoggedIn } = React.useContext(CurrentUserContext);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="content">
        <Promo />
        <AboutProject />
        <Technology />
        <AboutMe />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}

export default Main;
