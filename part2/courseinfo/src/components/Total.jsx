const Total = ({ parts }) => {
  return (
    <strong>
      total of{' '}
      {parts.reduce((acc, part) => {
        return acc + part.exercises
      }, 0)}{' '}
      exercises
    </strong>
  )
}

export default Total
