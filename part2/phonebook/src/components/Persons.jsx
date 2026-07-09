const Person = ({ person, onClick }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onClick}>Delete</button>
    </div>
  )
}

export default Person
