import styles from "./App.module.css";
import React from "react";
function App() {
  const [winner, setWinner] = React.useState(null);
  const [turn, setTurn] = React.useState(1);
  const [playerPositions, setPlayerPositions] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const winnerPositions = [
    { indexes: [0, 1, 2], orientation: "horizontal" },
    { indexes: [3, 4, 5], orientation: "horizontal" },
    { indexes: [6, 7, 8], orientation: "horizontal" },

    { indexes: [0, 3, 6], orientation: "vertical" },
    { indexes: [1, 4, 7], orientation: "vertical" },
    { indexes: [2, 5, 8], orientation: "vertical" },

    { indexes: [0, 4, 8], orientation: "diagonal1" },
    { indexes: [2, 4, 6], orientation: "diagonal2" },
  ];

  function handleClick(index) {
    if (playerPositions[index] !== "") {
      return;
    }

    if (winner) {
      return;
    }

    setPlayerPositions((prev) => {
      const gameData = [...prev];
      gameData[index] = turn === 1 ? "X" : "O";
      return gameData;
    });
    setTurn((prev) => (prev === 1 ? 2 : 1));
  }

  const checkWinner = React.useCallback(() => {
    winnerPositions.forEach((el) => {
      const { indexes } = el;
      if (
        playerPositions[indexes[0]] === "X" &&
        playerPositions[indexes[1]] === "X" &&
        playerPositions[indexes[2]] === "X"
      ) {
        setWinner(el);
      }
      if (
        playerPositions[indexes[0]] === "O" &&
        playerPositions[indexes[1]] === "O" &&
        playerPositions[indexes[2]] === "O"
      ) {
        setWinner(el);
      }
    });
  }, [playerPositions]);

  const handleDraw = React.useCallback(() => {
    const checkDraw = playerPositions.every((el) => el !== "");
    if (checkDraw) {
      setTimeout(() => {
        handleResetGame();
      }, 1000);
    }
  }, [playerPositions]);

  React.useEffect(() => {
    checkWinner();
    handleDraw();
  }, [playerPositions, checkWinner, handleDraw]);

  React.useEffect(() => {
    if (winner)
      setTimeout(() => {
        handleResetGame();
      }, 1000);
  }, [winner]);

  const handleResetGame = () => {
    setWinner(null);
    setPlayerPositions(["", "", "", "", "", "", "", "", ""]);
    setTurn(1);
  };

  return (
    <div className={styles.container}>
      {playerPositions.map((el, index) => (
        <div
          onClick={() => handleClick(index)}
          className={`${styles.element} ${
            winner && winner.indexes.includes(index)
              ? styles[winner.orientation]
              : null
          }  `}
          key={index}
        >
          {el}
        </div>
      ))}
      <div className={styles.vez}>
        <h2 className={styles.h2}>Vez:{turn === 1 ? "X" : "O"}</h2>
        <button onClick={handleResetGame} className={styles.button}>
          Resetar
        </button>
      </div>
    </div>
  );
}

export default App;
