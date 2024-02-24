const exercises3 = 14;
const exercises2 = 7;
const exercises1 = 10;

const Header = () => {
  const course = "Half Stack application development";
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Total = () => {
  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
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

const Content = () => {
  const part1 = 'Fundamentals of React';

  const part2 = 'Using props to pass data';

  const part3 = 'State of a component';

  return (
    <>
      <Part name={part1} exercise={exercises1}></Part>
      <Part name={part2} exercise={exercises2}></Part>
      <Part name={part3} exercise={exercises3}></Part>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default App;