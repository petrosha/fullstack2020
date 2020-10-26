import React from 'react';

const Header = (props) => (<h2>{props.data.name}</h2>);

const Content = ({ data }) => data.parts.map((elem) => (<Part key={elem.id} data={elem} />));

const Total = (props) => (<p><b>Total of exercises</b> {props.data.parts.reduce((prev, elem) => prev + elem.exercises, 0)}</p>);

const Part = (props) => (<p>{props.data.name} {props.data.exercises}</p>);

const Course = ({ course }) => {
  return (
    <>
      <Header data={course} />
      <Content data={course} />
      <Total data={course} />
    </>
  )
}

export default Course