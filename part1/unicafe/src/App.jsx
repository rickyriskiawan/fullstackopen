import { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackHandler = (state, setState) => {
    setState(state + 1);
  };

  function Feedback({ goodHandler, neutralHandler, badHandler }) {
    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={goodHandler}>good</button>
        <button onClick={neutralHandler}>neutral</button>
        <button onClick={badHandler}>bad</button>
      </div>
    );
  }

  function Statistics({ good, neutral, bad }) {
    const totalFeedback = good + neutral + bad;
    const avarage = (good * 1 + bad * -1) / totalFeedback;
    const positif = (good / totalFeedback) * 100;

    return (
      <div>
        <h1>statistics</h1>
        {totalFeedback === 0 ? (
          <p>No feedback given</p>
        ) : (
          <table>
            <tbody>
              <StatisticLine text='good' value={good} />
              <StatisticLine text='neutal' value={neutral} />
              <StatisticLine text='bad' value={bad} />
              <StatisticLine text='all' value={totalFeedback} />
              <StatisticLine text='avarage' value={avarage.toFixed(2)} />
              <StatisticLine text='positif' value={positif.toFixed(1)} />
            </tbody>
          </table>
        )}
      </div>
    );
  }

  function StatisticLine({ text, value }) {
    return (
      <tr>
        <td>{text}</td>
        <td>{text === 'positif' ? `${value}%` : value} </td>
      </tr>
    );
  }

  return (
    <div>
      <Feedback
        goodHandler={() => feedbackHandler(good, setGood)}
        neutralHandler={() => feedbackHandler(neutral, setNeutral)}
        badHandler={() => feedbackHandler(bad, setBad)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
