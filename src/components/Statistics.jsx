function Statistics({ gamesPlayed, gamesWon }) {
  const winPercentage =
    gamesPlayed === 0
      ? 0
      : Math.round((gamesWon / gamesPlayed) * 100);

  return (
    <div className="statistics">
      <h2>Statistics</h2>

      <div className="stats-container">
        <div>
          <h3>{gamesPlayed}</h3>
          <p>Played</p>
        </div>

        <div>
          <h3>{gamesWon}</h3>
          <p>Won</p>
        </div>

        <div>
          <h3>{winPercentage}%</h3>
          <p>Win Rate</p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;