import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <>
      <h1 style={{ color: props.color }}>{props.name}</h1>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.name}
  </button>
)

const Buttons = ({ handleClick }) => (
  <>
    <h2>Please give your feedback</h2>
    <Button name="good" handleClick={handleClick("good")}></Button>
    <Button name="neutral" handleClick={handleClick("neutral")}></Button>
    <Button name="bad" handleClick={handleClick("bad")}></Button>
  </>
)


const Statistic = ({ name, data }) => (<><tr><td>{name}</td><td>{data}</td></tr></>);

const Statistics = ({ data }) => {
  let all = Object.values(data).reduce((prev, elem) => prev + elem, 0);
  if (all === 0) return (
    <>
      <h2>Statistics</h2>
      <p>No feedback given yet.</p>
    </>
  )

  let average = all ? ((data.good - data.bad) / all).toFixed(3) : 0;
  let positive = all ? (data.good*100 / all).toFixed(1)+" %" : 0;

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic name="good" data={data["good"]} />
          <Statistic name="neutral" data={data["neutral"]} />
          <Statistic name="bad" data={data["bad"]} />
          <Statistic name="all" data={all} />
          <Statistic name="average" data={average} />
          <Statistic name="positive" data={positive} />
        </tbody>
      </table>
    </>
  )
}


const App = () => {

  const [data, setData] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const feedbackClick = (name) => {
    const handler = () => {
      let localData = Object.assign({}, data);
      localData[name] += 1;
      setData(localData);
    }
    return handler;
  }

  return (
    <>
      <Header color="purple" name="Unicafe" />
      <hr />
      <Buttons handleClick={feedbackClick}/>
      <Statistics data={data} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));