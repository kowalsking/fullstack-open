import { useState } from 'react'

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const vote = votes[selected]
  const maxVotesCount = Math.max(...votes)
  const maxVoteIndex = votes.indexOf(maxVotesCount)
  const mostVotedAnecdote = anecdotes[maxVoteIndex]

  const nextAnecdote = () => {
    setSelected(Math.floor(anecdotes.length * Math.random()))
  }

  const voteHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {vote} votes</div>
      <Button name="next anecdote" onClick={nextAnecdote}></Button>
      <Button name="vote" onClick={voteHandler}></Button>

      <h1>Anectode with most votes</h1>
      <div>{mostVotedAnecdote}</div>
      <div>has {maxVotesCount} votes</div>
    </>
  )
}

export default App
