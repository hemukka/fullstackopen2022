const Header = ({name}) => {
    return (
      <h1>
        {name}
      </h1>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <p>
        <b>total of {parts.reduce( (total, part) =>
          total += part.exercises, 0
        )} exercises</b>
      </p>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }

  export default Course