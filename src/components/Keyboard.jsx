
function Keyboard({ onKeyPress, keyStatuses }) {

  const keyboardRows = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
  ];

  return (
    <div className="keyboard">

      {keyboardRows.map((row, index) => (

        <div className="keyboard-row" key={index}>

          {index === 2 && (
            <button
              className="special-key"
              onClick={() => onKeyPress("Enter")}
            >
              ENTER
            </button>
          )}

          {row.split("").map((letter) => (

            <button
              key={letter}
              className={`key ${keyStatuses[letter] || ""}`}
              onClick={() => onKeyPress(letter)}
            >
              {letter}
            </button>

          ))}

          {index === 2 && (
            <button
              className="special-key"
              onClick={() => onKeyPress("Backspace")}
            >
              ⌫
            </button>
          )}

        </div>

      ))}

    </div>
  );
}

export default Keyboard;
