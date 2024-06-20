import { useState } from 'react'

import React from 'react'

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


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)


  const findIndexOfHighestVote = (array) => {

    const compareNumbers = (maxIndex, currentNumber, currentIndex, arr) => {
      return currentNumber = currentNumber > arr[maxIndex] ? currentIndex : maxIndex;
    };

    const largestIndex = array.reduce(compareNumbers, 0);
    setMostVotes(largestIndex)
    console.log(`The Anecdote with most vote is: ${anecdotes[largestIndex]} `)

    return largestIndex;

  }

  const changeAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    const currentAnecdote = randomNumber
    setSelected(currentAnecdote)
    console.log(`current anecdote:${currentAnecdote}`);
  }

  const calculateVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(copy);
    findIndexOfHighestVote(copy)
  }


  return (
    <div>
      <Header title='Anecdote of the day' />
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <Button onPress={calculateVote} text='vote' />
      <Button onPress={changeAnecdote} text='next anecdote' />
      <Header title='Anecdote with most votes' />
      {anecdotes[mostVotes]}
      <div>has {votes[mostVotes]} votes</div>
    </div>
  )
}

export default App