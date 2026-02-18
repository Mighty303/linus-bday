import { useState, useRef } from "react";
import TopNav from "./components/TopNav";
import LobbyHeader from "./components/LobbyHeader";
import TeamsContainer from "./components/TeamsContainer";
import LobbyBottom from "./components/LobbyBottom";
import LobbyFooter from "./components/LobbyFooter";
import MessagesSection from "./components/MessagesSection";
import Confetti from "./components/Confetti";
import LoadingScreen from "./components/LoadingScreen";
import CollectionPage from "./components/CollectionPage";
import { players, photos } from "./data";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const messagesRef = useRef(null);

  const handleStartGame = () => {
    if (gameStarted) return;
    setGameStarted(true);
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowMessages(true);
    setTimeout(() => {
      messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <TopNav onOpenCollection={() => setShowCollection(true)} />
        <LobbyHeader />

        {/* Main Lobby Area */}
        <div
          className="relative flex-1 bg-cover bg-center px-10 py-4 max-md:px-5 overflow-auto"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,20,40,0.6) 0%, rgba(5,10,20,0.85) 100%), url('/images/bg.png')",
          }}
        >
          <TeamsContainer players={players} />
          <LobbyBottom />
        </div>

        <LobbyFooter onStartGame={handleStartGame} gameStarted={gameStarted} />
      </div>

      {showLoading && (
        <LoadingScreen players={players} onComplete={handleLoadingComplete} />
      )}

      {showCollection && (
        <CollectionPage
          photos={photos}
          players={players}
          onClose={() => setShowCollection(false)}
        />
      )}

      <MessagesSection
        ref={messagesRef}
        players={players}
        photos={photos}
        visible={showMessages}
      />

      <Confetti active={showMessages} />
    </>
  );
}
