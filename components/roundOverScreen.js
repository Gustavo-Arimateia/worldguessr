import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";

const GameSummary = ({ points, maxPoints, onSubmit }) => {
  const [stars, setStars] = useState([]);
  const [name, setName] = useState("");

  // Calcular estrelas com base nos pontos
  useEffect(() => {
    const percentage = (points / maxPoints) * 100;
    let newStars = [];

    if (percentage <= 20) newStars = ["#b6b2b2"];
    else if (percentage <= 30) newStars = ["#b6b2b2", "#b6b2b2"];
    else if (percentage <= 45) newStars = ["#b6b2b2", "#b6b2b2", "#b6b2b2"];
    else if (percentage <= 60) newStars = ["#CD7F32", "#CD7F32", "#CD7F32"];
    else if (percentage <= 79) newStars = ["#FFC107", "#FFC107", "#FFC107"];
    else newStars = ["#FFD700", "#FFD700", "#FFD700"];

    setStars(newStars);
  }, [points, maxPoints]);

  const handleSubmit = () => {
    if (name.trim() === "") {
      alert("Por favor, insira seu nome!");
      return;
    }
    onSubmit({ name, points });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      color: "white",
      backgroundColor: "#222",
      padding: "2rem",
      textAlign: "center",
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Parabéns!</h1>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        {stars.map((star, index) => (
          <FaStar key={index} color={star} size={32} />
        ))}
      </div>

      <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        {points} / {maxPoints} pontos
      </div>

      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          marginBottom: "1rem",
          width: "250px",
          textAlign: "center"
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "0.5rem 2rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0e84d8",
          color: "white",
          cursor: "pointer"
        }}
      >
        Enviar pontuação
      </button>
    </div>
  );
};

export default GameSummary;
