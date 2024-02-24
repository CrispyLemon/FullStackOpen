const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Total = (props) => {
  const parts = props.parts;
  return (
    <>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercise}</p>
    </>
  );
};

const Content = (props) => {
  const parts = props.parts;
  return (
    <>
      <Part name={parts[0].name} exercise={parts[0].exercises}></Part>
      <Part name={parts[1].name} exercise={parts[1].exercises}></Part>
      <Part name={parts[2].name} exercise={parts[2].exercises}></Part>
    </>
  );
};

const App = () => {
  const course = {name:'Half Stack application development',
  parts : [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]
}
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;