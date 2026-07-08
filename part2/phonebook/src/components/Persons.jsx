const Persons = ({ filteredPersons }) => {
  return filteredPersons.map((p) => {
    return (
      <div key={p.name}>
        {p.name} {p.number}
      </div>
    )
  })
}

export default Persons
