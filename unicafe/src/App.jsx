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

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <Header title='statistics' />
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header title='statistics' />
      <Statistic text='good' score={props.good} />
      <Statistic text='neutral' score={props.neutral} />
      <Statistic text='bad' score={props.bad} />
      <Statistic text='all' score={props.all} />
      <Statistic text='average' score={props.average} />
      <Statistic text='positive' score={props.positive} />
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />

    </div>
  )
}

export default App