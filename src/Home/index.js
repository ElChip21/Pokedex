import React from "react";
import ReactDOM from 'react-dom/client';
import SearchBar from "./components/searchbar";
import ListPokemon from "./components/List/ListPokemon";

const Home = () => {
return (
<main>
    <SearchBar />
    <ListPokemon />
</main>
);
}

export default Home;


