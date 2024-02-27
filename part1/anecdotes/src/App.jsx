import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(Math.floor(Math.random() * 8));
  const [votes, setVotes] = useState(new Uint8Array(8).fill(0));

  const next = () => {
    setSelected(Math.floor(Math.random() * 8)); 
  };

  const voting = () => {
    const updatedVote = votes[selected] + 1; 
    const updatedVotes = [...votes]; 
    updatedVotes[selected] = updatedVote;
  
    setVotes(updatedVotes);
  };
  

  const maxVote = Math.max(...votes); 
  const maxIndex = votes.indexOf(maxVote);
  const maxAnecdote = anecdotes[maxIndex];

  return (
    <div>
      <h3>Anecdote of the day:</h3>
      {anecdotes[selected]}<br />
      The number of votes is {votes[selected]}
      <div>
        <button onClick={next}>Next</button>
        <button onClick={voting}>Vote</button>
      </div>
      <div>
        <h3>Highest voted anecdote:</h3><br />
        {maxAnecdote}
      </div>
    </div>
  );
};

export default App;
