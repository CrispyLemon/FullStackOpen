import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(n => updatedGood + bad + neutral)
    console.log(all)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(n => updatedNeutral + good + bad)
    console.log(all)

  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(n => updatedBad + good + neutral)
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
      <h1>statistics</h1>
      <p>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
      </p>
    </div>
  )
}

export default App