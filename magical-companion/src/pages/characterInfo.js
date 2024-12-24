import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterInfo = () => {
    const { name } = useParams();
    const [characterInfo, setCharacterInfo] = useState([]);

    useEffect(() => {
        fetchCharacterInfo();
    }, []);

    const fetchCharacterInfo = async () => {
        try {
            const response = await axios.get(
                // `https://api.potterdb.com/v1/characters?filter[name_eq]=${name}`
                `https://potterhead-api.vercel.app/api/characters/harry%20potter`
            );
            // const response = await axios.get('https://api.potterdb.com/v1/characters');
            console.log(response.data);
            setCharacterInfo(response.data);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };
    return (
        <div>
            <h2>Character Information</h2>
            {characterInfo.data?.map((character) => (
                <div key={character.id}>
                    <h3>{character.attributes.name}</h3>
                    {/* <p>Age: {character.age}</p>
                    <p>House: {character.house}</p>
                    <p>Allegiances: {character.allegiances}</p> */}
                    {/* <pre>{JSON.stringify(character, null, 2)}</pre> */}

                </div>
            ))}
        </div>
    );
};

export default CharacterInfo;
