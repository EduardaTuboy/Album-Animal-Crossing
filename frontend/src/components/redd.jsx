import { useState } from "react";
import card from "../assets/unlocked.png";
import redd from "../assets/Redd.png";
import dialog1 from "../assets/Redd-dialogue-1.png";
import dialog2 from "../assets/Redd-dialogue-2.png";
import "../styles/redd.css";

// Importe os hooks do arquivo onde você os definiu
import { useUserProfile, useClaimCard } from "../api/usersQueries.js";

function Redd({ email }) {
  const [dialogStep, setDialogStep] = useState(0);

  // 1. Busca o perfil usando o hook existente (isso já traz as 12 cartas!)
  const { data: userProfile, isLoading: isProfileLoading } =
    useUserProfile(email);
  const availableCards = userProfile?.acumulated_cards || 0;

  // 2. Prepara o hook de resgate que acabamos de criar
  const claimCardMutation = useClaimCard();
  const handleClaimCard = async () => {
    // Transformamos a função em async
    // Evita cliques duplos enquanto a mutation está carregando
    if (availableCards > 0 && !claimCardMutation.isPending) {
      // Criamos uma lista para armazenar os dados de todas as figurinhas resgatadas
      const stickersGanhos = [];

      try {
        // Fazemos um loop baseado na quantidade de cartas que o usuário tem
        for (let i = 0; i < availableCards; i++) {
          // Usamos mutateAsync (em vez de mutate) para poder usar o 'await'
          const data = await claimCardMutation.mutateAsync(email);

          // Guardamos o número e a raridade na nossa lista
          stickersGanhos.push(
            `Figurinha ${data.sticker.number} (${data.rarityDrawn})`,
          );
        }
      } catch (error) {
        // Se a internet cair no meio do processo, avisamos o usuário
        alert(
          error.message || "Houve um erro ao resgatar algumas de suas cartas.",
        );
      } finally {
        // Por fim, fechamos o diálogo do Redd independentemente de sucesso ou erro
        setDialogStep(0);
      }
    }
  };

  return (
    <div className="redd-container">
      <div className="cards">
        {/* Renderiza o badge dinamicamente se houver cartas disponíveis */}
        {availableCards > 1 && <div className="badge">{availableCards}</div>}
        {availableCards > 0 && <img src={card} alt="Card" />}
      </div>

      <button
        onClick={() => setDialogStep(1)}
        disabled={claimCardMutation.isPending || isProfileLoading}
      >
        <img src={redd} alt="Redd" />
      </button>

      {dialogStep === 1 && (
        <img src={dialog1} alt="Dialogue 1" onClick={() => setDialogStep(2)} />
      )}

      {dialogStep === 2 && (
        <img
          src={dialog2}
          alt="Dialogue 2"
          onClick={handleClaimCard}
          style={{
            cursor: claimCardMutation.isPending ? "not-allowed" : "pointer",
          }}
        />
      )}
    </div>
  );
}

export default Redd;
