
import Row from "./Row.jsx";

function GameBoard({ currentGuess, pastGuesses }) {

  return (
    <div className="game-board">

      {Array.from({ length: 6 }).map((_, index) => {

        let guess = "";
        let result = null;

        if (index < pastGuesses.length) {

          guess = pastGuesses[index].word;
          result = pastGuesses[index].result;

        } else if (index === pastGuesses.length) {

          guess = currentGuess;

        }

        return (
          <Row
            key={index}
            guess={guess}
            result={result}
          />
        );

      })}

    </div>
  );
}

export default GameBoard;
