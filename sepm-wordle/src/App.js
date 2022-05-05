import React, { useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useState } from "react";
import { boardClean, generateGuessSet } from "./Tools";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardClean);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [guessSet, setGuessSet] = useState(new Set());

  const answer = "RIGHT";

  useEffect(() => {
    generateGuessSet().then((words) => {
    setGuessSet(words.guessSet);
    });
  });

  const onPickLetter = (keyval) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyval;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onDeleteClick = () => {
    if (currentAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };
  const onEnterClick = () => {
    if (currentAttempt.letterPosition !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (guessSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0 });
    } else {
      alert("NO");
    }
  };
  return (
    <div className="App">
      <nav>
        <h1>SEPM Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          setCurrentAttempt,
          currentAttempt,
          onPickLetter,
          onDeleteClick,
          onEnterClick,
          answer,
        }}
      >
        <div className="site">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
