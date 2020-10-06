import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.data.part1.name} {props.data.part1.exercises }
      </p>
      <p>
        {props.data.part2.name} {props.data.part2.exercises }
      </p>
      <p>
        {props.data.part3.name} {props.data.part3.exercises }
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
       <p>Number of exercises {props.exercises}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  //object to use one argument insted of 6 in the Content component. 
  const contentData = {
    part1: {
      name: part1,
      exercises: exercises1
    },
    part2: {
      name: part2,
      exercises: exercises2
    },
    part3: {
      name: part3,
      exercises: exercises3
    }
  }

  return (
    <>
      <Header name={course} />
      <Content data={contentData} />
      <Total exercises={exercises1+exercises2+exercises3} />
    </>
  )

}


ReactDOM.render(<App />, document.getElementById('root'));