import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router"; // Import du hook useNavigate

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher les erreurs
  const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
  const [success, setSuccess] = useState(""); // Pour afficher un message de succès
  const navigate = useNavigate(); // Hook pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { username, email, password }
      );

      setSuccess("Inscription réussie !");
      localStorage.setItem("token", response.data.token); // Exemple de stockage du token dans le localStorage

      // Rediriger l'utilisateur vers la page de Pokedex ou d'autres pages après l'inscription
      navigate("/pokedex"); // Changez cela selon votre logique d'application

    } catch (err) {
      setError("Erreur lors de l'inscription : " + err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          {loading ? "Chargement..." : "S'inscrire"}
        </button>
      </form>

      <div>
        <p>
          Déjà un compte ?{" "}
          <button onClick={() => navigate("/login")}>Cliquez ici pour vous connecter</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
