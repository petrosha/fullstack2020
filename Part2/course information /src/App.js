import React from 'react';
import Course from './components/Course';

const App = ({courses}) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((elem) => (<Course key={elem.id} course={elem} />))}
    </div>
  )
}

export default App