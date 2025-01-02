import { useState } from 'react';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);

  const votesInit = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(votesInit);

  function Anecdote({ anecdotes, selected, votes }) {
    const voteHandler = () => {
      const updatedVotes = votes.map((vote, index) => {
        return index === selected ? vote + 1 : vote;
      });

      setVotes(updatedVotes);
    };

    const randomHandler = () => {
      const randomNumber = Math.floor(Math.random() * anecdotes.length);
      setSelected(randomNumber);
    };
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={voteHandler}>vote</button>
        <button onClick={randomHandler}>next anecdote</button>
      </div>
    );
  }

  function MostVoted({ votes }) {
    const mostVoted = Math.max(...votes);
    const mostVotedIndex = votes.indexOf(mostVoted);

    return (
      <div>
        <h1>Anecdote with most voted</h1>
        <p>{anecdotes[mostVotedIndex]}</p>
        <p>has {votes[mostVotedIndex]} votes </p>
      </div>
    );
  }

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <MostVoted votes={votes} />
    </div>
  );
}

export default App;
