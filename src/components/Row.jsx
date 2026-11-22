
import Tile from "./Tile.jsx";

function Row({ guess, result }) {

  const letters = guess.split("");

  return (
    <div className="row">

      {Array.from({ length: 5 }).map((_, index) => (

        <Tile
          key={index}
          letter={letters[index] || ""}
          status={result ? result[index] : ""}
        />

      ))}

    </div>
  );
}

export default Row;
