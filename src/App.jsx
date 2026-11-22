
import { useState, useEffect } from "react";

import GameBoard from "./components/GameBoard.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Modal from "./components/Modal.jsx";
import { words, validWords } from "./data/words.js";
import Help from "./components/Help.jsx";
import Statistics from "./components/Statistics.jsx";

import "./App.css";

// Evaluate each letter against the solution word
function evaluateGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const remainingLetters = {};

  // First pass: Find correct letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
    } else {
      const letter = solution[i];

      remainingLetters[letter] =
        (remainingLetters[letter] || 0) + 1;
    }
  }

  // Second pass: Find present letters
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") {
      continue;
    }

    const letter = guess[i];

    if (remainingLetters[letter] > 0) {
      result[i] = "present";
      remainingLetters[letter]--;
    }
  }

  return result;
}

function App() {

  // Main game states
  const [solutionWord, setSolutionWord] = useState(
  () => words[Math.floor(Math.random() * words.length)]
  );

  const [currentGuess, setCurrentGuess] = useState("");

  const [pastGuesses, setPastGuesses] = useState([]);

  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  // Virtual keyboard letter colors
  const [keyStatuses, setKeyStatuses] = useState({});

  const [gamesPlayed, setGamesPlayed] = useState(() => {
  return Number(localStorage.getItem("gamesPlayed")) || 0;
  });

  const [gamesWon, setGamesWon] = useState(() => {
  return Number(localStorage.getItem("gamesWon")) || 0;
  });


  // Update virtual keyboard colors
  const updateKeyboard = (guess, result) => {

    setKeyStatuses((previousStatuses) => {

      const updatedStatuses = { ...previousStatuses };

      const priority = {
        absent: 1,
        present: 2,
        correct: 3
      };

      guess.split("").forEach((letter, index) => {

        const newStatus = result[index];
        const oldStatus = updatedStatuses[letter];

        if (
          !oldStatus ||
          priority[newStatus] > priority[oldStatus]
        ) {
          updatedStatuses[letter] = newStatus;
        }

      });

      return updatedStatuses;
    });
  };


  // Handle physical and virtual keyboard input
  const handleKeyPress = (key) => {

    if (gameStatus !== "IN_PROGRESS") {
      return;
    }

    // Accept alphabetical characters only
    if (/^[a-zA-Z]$/.test(key)) {

      if (currentGuess.length < 5) {
        setCurrentGuess((previous) =>
          previous + key.toUpperCase()
        );
      }

      return;
    }

    // Backspace functionality
    if (key === "Backspace") {

      setCurrentGuess((previous) =>
        previous.slice(0, -1)
      );

      return;
    }

    // Enter functionality
    if (key === "Enter") {

      if (currentGuess.length !== 5) {
        alert("Please enter a 5-letter word!");
        return;
      }

      if (!validWords.includes(currentGuess)) {
        alert("Invalid word! Please enter a valid five-letter word.");
        return;
      }

      // Evaluate the submitted word
      const result = evaluateGuess(
        currentGuess,
        solutionWord
      );

      console.log("Guess:", currentGuess);
      console.log("Solution:", solutionWord);
      console.log("Evaluation:", result);

      // Store guess and evaluation
      const newGuess = {
        word: currentGuess,
        result: result
      };

      const updatedGuesses = [
        ...pastGuesses,
        newGuess
      ];

      setPastGuesses(updatedGuesses);

      // Synchronize virtual keyboard
      updateKeyboard(currentGuess, result);

      // Clear current input
      setCurrentGuess("");

      // Winning condition
      if (currentGuess === solutionWord) {
        setGameStatus("WON");
        return;
      }

      // Losing condition
      if (updatedGuesses.length === 6) {
        setGameStatus("LOST");
      }
    }
  };


  
  const restartGame = () => {

    setCurrentGuess("");
    setPastGuesses([]);
    setKeyStatuses({});
    setGameStatus("IN_PROGRESS");

    // Select a new random solution
    setSolutionWord((previousWord) => {

      const availableWords = words.filter(
        (word) => word !== previousWord
      );

      return availableWords[
        Math.floor(Math.random() * availableWords.length)
      ];

    });

  };




  // Listen for physical keyboard events
  useEffect(() => {

    const handleKeyDown = (event) => {

      // Prevent browser default Backspace navigation
      if (
        event.key === "Backspace" ||
        event.key === "Enter"
      ) {
        event.preventDefault();
      }

      handleKeyPress(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [currentGuess, pastGuesses, gameStatus]);

  // Save statistics in browser storage
  useEffect(() => {
    localStorage.setItem("gamesPlayed", gamesPlayed);
    localStorage.setItem("gamesWon", gamesWon);
  }, [gamesPlayed, gamesWon]);




  // Main application interface
  return (

    <div className="app">

      <h1>WORDLE</h1>
      <Help />
        <p className="game-instructions">
          Guess the 5-letter word in 6 attempts.
        </p>

      <GameBoard
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
      />

      <Keyboard
        onKeyPress={handleKeyPress}
        keyStatuses={keyStatuses}
      />

      <Modal
        gameStatus={gameStatus}
        solutionWord={solutionWord}
        onRestart={restartGame}
      />
      <Statistics
        gamesPlayed={gamesPlayed}
        gamesWon={gamesWon}
      />

    </div>

  );
}

export default App;
