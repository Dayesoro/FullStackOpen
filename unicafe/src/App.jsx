import { useState } from "react"

const Header = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}

const Button = ({ onPress, text }) => {
  return (
    <>
      <button onClick={onPress}>{text}</button>
    </>
  )
}


const Statistic = ({ text, score }) => {
  return (
    <div>
      {text} {score}
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const newClick = good + 1;
    setGood(newClick)
  }

  const handleNeutralClick = () => {
    const newClick = neutral + 1;
    setNeutral(newClick)
  }

  const handleBadClick = () => {
    const newClick = bad + 1;
    setBad(newClick)
  }


  return (
    <div>
      <Header title='give feedback' />
      <Button onPress={handleGoodClick} text='good' />
      <Button onPress={handleNeutralClick} text='neutral' />
      <Button onPress={handleBadClick} text='bad' />
      <Header title='statistics' />
      <Statistic text='good' score={good} />
      <Statistic text='neutral' score={neutral} />
      <Statistic text='bad' score={bad} />
    </div>
  )
}

export default App