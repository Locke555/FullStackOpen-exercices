import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})

  const handleSelected = () =>{
    let anecdote = Math.floor(Math.random() * (8));
    while (anecdote === selected) { anecdote = Math.floor(Math.random() * (8)); }
    setSelected((prev)=>anecdote);
    console.log(anecdote)
  }

  const handleVotes = () => {
    const copy = {...votes};
    copy[selected] += 1;
    setVotes((prev)=>copy);
    console.log(copy)
  }

  const indexOfMostVoted = () => {
    let bigger = 0;
    let index = 0
    for (const props in votes) {
      if (votes[props] > bigger) {
        bigger = votes[props];
        index = props
      }
    }

    return parseInt(index);
  }
  const mostVoted = indexOfMostVoted();
  console.log(mostVoted)
  

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleSelected}>Next anecdote</button>
      <button onClick={handleVotes}>Vote</button>
      <h2>Anecdote With Most Votes</h2>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

export default App