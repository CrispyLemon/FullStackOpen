import { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <>
    <tbody>
    <tr><td>{props.text}</td> <td>{props.value}</td></tr><br />
    </tbody>
  </>
  )
}

const Statistics = (props) => {
  const {Good, Bad, Neutral, All, average, Percentage} = props
  if (All == 0){
    return(
      <>
        <h1>Statistics</h1>
        <p>No feedback given.</p>
      </>
    )
  }
  else{
  const percval = Percentage + "%"
  return (
    <>
    <h1>statistics</h1>
      <table>
        <StatisticLine text = "good" value = {Good} />
        <StatisticLine text = "bad" value = {Bad} />
        <StatisticLine text = "neutral" value = {Neutral} />
        <StatisticLine text = "all" value = {All} />
        <StatisticLine text = "average" value = {average} />
        <StatisticLine text = "percentage" value = {percval} />
      </table>
    </>
  )
  }
}

  
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const percentage = all ? (good / all) * 100 : 0;
  const average = all ? ((good - bad) / all) : 0
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedAll = updatedGood + bad + neutral
    setAll(updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = updatedNeutral + bad + good
    setAll(updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(n => updatedBad)
    const updatedAll = updatedBad + good + neutral
    setAll(updatedAll)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Statistics Good={good} Neutral={neutral} Bad={bad} All={all} average = {average} Percentage={percentage} />
    </div>
  )
}

export default App