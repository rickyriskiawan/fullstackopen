function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  function Header({ course }) {
    return <h1>{course}</h1>;
  }

  function Content({ parts }) {
    return (
      <>
        {parts.map((part, index) => {
          return <Part part={part.name} exercises={part.exercises} key={index} />;
        })}
      </>
    );
  }

  function Part({ part, exercises }) {
    return (
      <p>
        {part} {exercises}
      </p>
    );
  }

  function Total({ parts }) {
    const TotalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p>Number of exercises {TotalExercises}</p>;
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
