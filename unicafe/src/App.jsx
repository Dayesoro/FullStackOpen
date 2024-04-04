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


const Statistic = (props) => {
  if (props.text === 'positive') {
    return (
      <div>
        {props.text} {props.score} %
      </div>
    )
  }
  return (
    <div>
      {props.text} {props.score}
    </div>
  )
}




const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)



  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedAll = all + 1
    setAll(updatedAll)
    const averageScore = (updatedGood * 1 + neutral * 0 + bad * -1) / updatedAll || 0; // Handle division by zero
    setAverage(averageScore)
    const positivePercentage = (updatedGood / updatedAll) * 100 || 0; // Calculate positive feedback percentage
    setPositive(positivePercentage)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = all + 1
    setAll(updatedAll)
    const averageScore = (good * 1 + updatedNeutral * 0 + bad * -1) / updatedAll || 0; // Handle division by zero
    setAverage(averageScore)
    const positivePercentage = (good / updatedAll) * 100 || 0; // Calculate positive feedback percentage
    setPositive(positivePercentage)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = all + 1
    setAll(updatedAll)
    const averageScore = (good * 1 + neutral * 0 + updatedBad * -1) / updatedAll || 0; // Handle division by zero
    setAverage(averageScore)
    const positivePercentage = (good / updatedAll) * 100 || 0; // Calculate positive feedback percentage
    setPositive(positivePercentage)
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
      <Statistic text='all' score={all} />
      <Statistic text='average' score={average} />
      <Statistic text='positive' score={positive} />

    </div>
  )
}

export default App