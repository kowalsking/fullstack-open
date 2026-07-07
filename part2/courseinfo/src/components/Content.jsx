import Part from './Part'

const Content = (props) => {
  const parts = props.parts
  return (
    <div>
      {parts.map((p) => {
        return <Part key={p.id} part={p.name} exercises={p.exercises} />
      })}
    </div>
  )
}

export default Content
