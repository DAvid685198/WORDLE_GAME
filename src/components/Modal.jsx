
function Modal({ gameStatus, solutionWord, onRestart }) {

  if (gameStatus === "IN_PROGRESS") {
    return null;
  }

  const won = gameStatus === "WON";

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {won ? "Congratulations!" : "Game Over!"}
        </h2>

        <p>
          {won
            ? "You successfully guessed the word!"
            : "Better luck next time!"}
        </p>

        <div className="solution">
          The correct word was:
          <h3>{solutionWord}</h3>
        </div>

        <button onClick={onRestart}>
          PLAY AGAIN
        </button>

      </div>

    </div>
  );
}

export default Modal;
