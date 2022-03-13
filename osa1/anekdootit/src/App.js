import { useState } from 'react'

const Anecdote = ({anecdote, votes}) => (
  <>
    {anecdote} <br></br>
    has {votes} votes <br></br>
  </>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const handleVoteClick = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }
  const handleNextClick = () => setSelected(Math.floor(Math.random()*anecdotes.length))

  const pointsMaxIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[pointsMaxIndex]} votes={points[pointsMaxIndex]} />
    </div>
  )
}

export default App