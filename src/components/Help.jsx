import { useState } from "react";

function Help() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="help-container">
      <button
        className="help-button"
        onClick={() => setShowHelp(!showHelp)}
      >
        ?
      </button>

      {showHelp && (
        <div className="help-box">
          <button
            className="close-help"
            onClick={() => setShowHelp(false)}
          >
            ×
          </button>

          <h2>How to Play</h2>

          <p>1. Guess the hidden five-letter word.</p>
          <p>2. You have six attempts.</p>
          <p>3. Press Enter to submit your guess.</p>
          <p>4. Use Backspace to remove a letter.</p>

          <div className="help-example">
            <div className="example-tile correct">C</div>
            <span>Correct letter and position</span>

            <div className="example-tile present">R</div>
            <span>Correct letter, wrong position</span>

            <div className="example-tile absent">A</div>
            <span>Letter is not in the word</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Help;