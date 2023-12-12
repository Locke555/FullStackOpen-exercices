import { useState } from 'react'

const Buttons = ({setGood, setNeutral, setBad}) => {
  const handleGood = () => setGood((prev)=>prev+1);

  const handleNeutral = () => setNeutral((prev)=>prev+1);

  const handleBad = () => setBad((prev)=>prev+1);


  return (
    <>
    <button onClick={handleGood}>
      Good
    </button>
    <button onClick={handleNeutral}>
      Neutral
    </button>
    <button onClick={handleBad}>
      Bad
    </button>
    </>
  )
}

const Statistics = ({ values }) => {
  const all = values.good + values.bad + values.neutral;
  const average = (values.good - values.bad) / all;
  const pPercentage = ((values.good / all) * 100) + ' %';

  return (
    <div>
      <p>Good {values.good}</p>
      <p>Neutral {values.neutral}</p>
      <p>Bad {values.bad}</p>
      <p>All {all}</p>
      <p>Average {average}</p>
      <p>Positive {pPercentage}</p>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <>
      <h1>Give Some Feedback</h1>
      <Buttons setGood={setGood} setBad={setBad} setNeutral={setNeutral}/>
      <h2>Statistics</h2>
      {(good + neutral + bad) > 0? <Statistics values={{good, neutral, bad}}/> : <h3>No feedback given</h3>}
      </>
  )
}

export default App