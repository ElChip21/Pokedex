import React from "react";
import SearchComponent from "./components/searchbar";

const Home = ({ currentLanguage }) => { // Recevoir la langue ici
    return (
        <div>
            <SearchComponent language={currentLanguage} /> {/* Passer la langue au composant */}
        </div>
    );
};

export default Home;
