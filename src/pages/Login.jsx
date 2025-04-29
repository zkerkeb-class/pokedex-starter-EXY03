import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher les erreurs
  const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
  const [success, setSuccess] = useState(""); // Pour afficher un message de succès
  const navigate = useNavigate(); // Hook pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      // Si la connexion est réussie, on peut traiter la réponse (par exemple stocker le token)
      localStorage.setItem("token", response.data.token); 
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);
      setSuccess("Connexion réussie!");

      // Redirection vers la page du Pokedex après la connexion
      navigate("/pokedex"); 

    } catch (err) {
      // En cas d'erreur, on affiche le message d'erreur
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour se connecter en tant qu'invité
  const handleGuestLogin = () => {
    navigate("/pokedex");
  };

  return (
    <div>
      <h1>Connexion</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>

      <div>
        <p>
          Pas de compte ?{" "}
          <button onClick={() => navigate("/register")}>Cliquez ici pour vous inscrire</button>
        </p>
        {/* Bouton pour se connecter en tant qu'invité */}
        <button onClick={handleGuestLogin}>Se connecter en tant qu'invité</button>
      </div>
    </div>
  );
};

export default Login;
