import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.name} </td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({ good, bad, netural, all, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine name="good" value={good}></StatisticLine>
        <StatisticLine name="neutral" value={netural}></StatisticLine>
        <StatisticLine name="bad" value={bad}></StatisticLine>
        <StatisticLine name="all" value={all}></StatisticLine>
        <StatisticLine name="average" value={average}></StatisticLine>
        <StatisticLine name="positive" value={positive}></StatisticLine>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = Number.isNaN((good - bad) / all) ? 0 : (good - bad) / all
  const positive = `${(good / all) * 100} %`
  const statsProps = {
    good,
    neutral,
    bad,
    all,
    average,
    positive,
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} name="good"></Button>
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral"></Button>
      <Button onClick={() => setBad(bad + 1)} name="bad"></Button>
      <h2>statistics</h2>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <Statistics {...statsProps}></Statistics>
      )}
    </>
  )
}

export default App
