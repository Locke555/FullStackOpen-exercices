import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Buttons = ({setGood, setNeutral, setBad}) => {
  const handleGood = () => setGood((prev)=>prev+1);

  const handleNeutral = () => setNeutral((prev)=>prev+1);

  const handleBad = () => setBad((prev)=>prev+1);


  return (
    <>
      <Button onClick={handleGood} text={"Good"} />
      <Button onClick={handleNeutral} text={"Neutral"}/>
      <Button onClick={handleBad} text={"Bad"}/>
    </>
  )
}

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({ values }) => {
  const all = values.good + values.bad + values.neutral;
  const average = (values.good - values.bad) / all;
  const pPercentage = ((values.good / all) * 100) + ' %';

  return (
    <div>
      <StatisticLine text={"Good"} value={values.good} />
      <StatisticLine text={"Neutral"} value={values.neutral} />
      <StatisticLine text={"Bad"} value={values.bad} />
      <StatisticLine text={"All"} value={all} />
      <StatisticLine text={"Average"} value={average} />
      <StatisticLine text={"Positive"} value={pPercentage} />
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