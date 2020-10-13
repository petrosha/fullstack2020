import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <>
      <h1>{props.data.name}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part data={props.data.parts[0]} />
      <Part data={props.data.parts[1]} />
      <Part data={props.data.parts[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.data.parts.reduce((prev,elem)=>prev+elem.exercises,0)}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.data.name} {props.data.exercises}</p>
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
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
      }
    ]
  }


  return (
    <>
      <Header data={course} />
      <Content data={course} />
      <Total data={course} />
    </>
  )

}

ReactDOM.render(<App />, document.getElementById('root'));