import axios from "axios";

export const getAllPokemons = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/pokemons/");
        return response.data; 
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
};

// export const getPokemonById = async (id) => {
//     try {
//         const response = await axios.get("http://localhost:3000/api/pokemons/" + id);
//         return response.data; 
//     } catch (error) {
//         console.error("Erreur API:", error);
//         return null;
//     }
// }

// export const deletePokemon = async (id) => {
//     try {
//         const response = await axios.delete("http://localhost:3000/api/pokemons/" + id);
//         console.log("Supprimer avec succès")
//         return response.data; 
//     } catch (error) {
//         console.error("Erreur API:", error);
//         return []
//     }
// }

// export const createPokemon = async (id, data) => {
//     try {
//         const response = await axios.post("http://localhost:3000/api/pokemons/", data);
//         return response.data; 
//     } catch (error) {
//         console.error("Erreur API:", error);
//         return []
//     }
// }

// export const updatePokemon = async (id, data) => {
//     try {
//         const response = await axios.put("http://localhost:3000/api/pokemons/" + id, data);
//         return response.data; 
//     } catch (error) {
//         console.error("Erreur API:", error);
//         return []
//     }
// }