import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/header";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
    const [characters, setCharacters] = useState([]);

    const fetchAllCharacters = async () => {
        try {
            const response = await axios.get(
                // "https://potterapi-fedeperin.vercel.app/en/characters"
                // "https://potterhead-api.vercel.app/api/characters"
                "https://magical-companion-api.vercel.app/characters"
            );
            // const response = await axios.get('https://api.potterdb.com/v1/characters');
            console.log(response.data);
            setCharacters(response.data);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    useEffect(() => {
        fetchAllCharacters();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            Characters Characters size: {characters?.length}
            {characters?.length === 0 ? (
                <p>Loading characters...</p>
            ) : (
                characters.map((character) => (
                    <div key={character.id}>
                        <Link to={`/characters/${character.name}`}>
                            <h2>{character.name}</h2>
                        </Link>
                        {/* <p>House: {character.house}</p>
                        <p>Patronus: {character.patronus}</p> */}
                    </div>
                ))
            )}
        </div>
    );
};

export default Characters;
