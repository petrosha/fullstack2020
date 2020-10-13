import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(props.anecdotes.map(() => 0));

  let maxVotesIndex = 0;
  let maxVotes = 0;
  votes.forEach((item, index) => {
    if (item > maxVotes) {
      maxVotes = item;
      maxVotesIndex = index;
    }
  });

  const nextJoke = () => {
    let nextSelected = Math.round(Math.random() * (props.anecdotes.length - 1));
    setSelected(nextSelected);
  }

  const voteJoke = () => {
    let newVotes = [].concat(votes);
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p> {props.anecdotes[selected]}</p>
      <p> Has {votes[selected]} votes!</p>
      <button onClick={nextJoke}>Random Joke</button>
      <button onClick={voteJoke}>Vote Joke</button>
      <hr/>
      <h2>Anecdote with max votes</h2>
      <p> {props.anecdotes[maxVotesIndex]}</p>
      <p> Has {maxVotes} votes!</p>

    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Only wimps use tape backup: real men just upload their important stuff on ftp, and let the rest of the world mirror it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));