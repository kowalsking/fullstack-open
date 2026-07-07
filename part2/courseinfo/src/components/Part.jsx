const Part = (props) => {
  console.log('part props', props.exercises)

  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

export default Part
