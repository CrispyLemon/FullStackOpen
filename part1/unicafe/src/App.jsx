import { useState } from 'react'

const Statistics = (props) => {
  const {Good, Bad, Neutral, All, Percentage} = props
  return (
    <>
    <h1>statistics</h1>
      <p>
        good {Good} <br />
        neutral {Neutral} <br />
        bad {Bad} <br />
        all {All} <br />
        total {Percentage}% <br />
      </p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const percentage = all ? (good / all) * 100 : 0;

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log(updatedGood)
    const updatedAll = updatedGood + bad + neutral
    setAll(n => updatedAll)
    console.log(all)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = updatedNeutral + good + bad
    setAll(n => updatedAll)
    console.log(all)

  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = updatedBad + good + neutral
    setAll(n => updatedAll)
    console.log(all)
  }
  
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>
        Good
      </button>
      <button onClick={handleNeutralClick}>
        Neutral
      </button>
      <button onClick={handleBadClick}>
        Bad
      </button>
      <Statistics Good={good} Neutral={neutral} Bad={bad} All={all} Percentage={percentage} />
    </div>
  )
}

export default App