import { useState, useEffect } from "react";
import card from "../assets/unlocked.png"; //
import redd from "../assets/Redd.png"; //[cite: 9]
import dialog1 from "../assets/Redd-dialogue-1.png"; //[cite: 9]
import dialog2 from "../assets/Redd-dialogue-2.png"; //[cite: 9]
import "../styles/redd.css"; //[cite: 9]

// Adicionado a prop 'email' para identificar o usuário logado
function Redd({ email }) {
  const [dialogStep, setDialogStep] = useState(0); //[cite: 9]
  const [availableCards, setAvailableCards] = useState(0); //[cite: 9]
  const [loading, setLoading] = useState(false);

  // Busca a quantidade de cartas atualizada ao carregar o componente
  useEffect(() => {
    const fetchUserCards = async () => {
      if (!email) return;

      try {
        // Altere a URL base se o seu backend rodar em outra porta (ex: http://localhost:5000)
        const response = await fetch(`/user/profile/${email}`);
        if (response.ok) {
          const data = await response.json();
          // O backend retorna o perfil atualizado e sincronizado com o tempo decorrido
          setAvailableCards(data.acumulated_cards);
        } else {
          console.error("Erro ao buscar o perfil do usuário.");
        }
      } catch (error) {
        console.error("Erro na requisição de perfil:", error);
      }
    };

    fetchUserCards();
  }, [email]);

  const handleClaimCard = async () => {
    if (availableCards > 0 && !loading) {
      setLoading(true);
      try {
        const response = await fetch("/user/claim-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();

          // Atualiza o estado com a nova quantidade exata de cartas devolvida pelo backend
          setAvailableCards(data.acumulatedCards);

          // Opcional: Você pode usar 'data.sticker' aqui para exibir um alerta ou modal
          // mostrando qual figurinha o usuário acabou de ganhar!
          alert(`Parabéns! Você ganhou a figurinha: ${data.sticker.number}`);
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Erro ao resgatar a carta.");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Não foi possível conectar ao servidor.");
      } finally {
        setLoading(false);
        setDialogStep(0); //[cite: 9]
      }
    }
  };

  return (
    <div className="redd-container">
      <div className="cards">
        {/* Renderiza o badge dinamicamente se houver cartas disponíveis */}
        {availableCards > 1 && <div className="badge">{availableCards}</div>}
        {availableCards > 0 && <img src={card} alt="Card" />} {/*[cite: 9] */}
      </div>

      <button onClick={() => setDialogStep(1)} disabled={loading}>
        <img src={redd} alt="Redd" /> {/*[cite: 9] */}
      </button>

      {dialogStep === 1 && ( //[cite: 9]
        <img src={dialog1} alt="Dialogue 1" onClick={() => setDialogStep(2)} /> //[cite: 9]
      )}

      {dialogStep === 2 && ( //[cite: 9]
        <img
          src={dialog2}
          alt="Dialogue 2"
          onClick={handleClaimCard}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        />
      )}
    </div>
  );
}

export default Redd; //[cite: 9]
