import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Spreadsheet from "react-spreadsheet";
import { Form } from 'semantic-ui-react'
import FittingMethod from './fittingMethod';
import FittingOption from './fittingOption';
import FittingOrder from './fittingOrder';
import FittingEquation from './fittingEquation';
import Plotting from './plotting';

function App() {
  const [userMethod, setUserMethod] = useState(
    {
      'method': null,
      'option': null,
      'order': null,
    }
  )
  const [method, setMethod] = useState(null)
  const [userData, setUserData] = useState([
    [{ value: "X" }, { value: "Y" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }],
  ])
  const [plotArray, setPlotArray] = useState({
    'arrayX': [],
    'arrayY': [],
  })
  const [calculatedArray, setCalulatedArray] = useState({
    'calculatedX': [],
    'calculatedY': [],
  })
  
  const selectHandler = (name, newValue) => {
    setUserMethod(prevState => ({
      ...prevState,
      [name]: newValue
    }))
  }

  const updatePlotHandler = (name, newValue) => {
    setCalulatedArray(prevState => ({
      ...prevState,
      [name]: newValue
    }))
  }

  useEffect(() => {
    let countUsable = 0
    let isGood = true
    let arrayX = []
    let arrayY = []
    userData.map((row, index) => {
      if (index > 0 && row[0] && row[1]) {
        if (isNaN(row[0].value) || isNaN(row[1].value)) {
          isGood = false
        }
        if (isGood && +(row[0].value) && +(row[1].value)) {
          arrayX.push(+(row[0].value))
          arrayY.push(+(row[1].value))
          countUsable++
        }
      }
      return(false)
    })
    if (isGood && countUsable > 2) {
      setPlotArray(prevState => (
        { ...prevState, 'arrayX': arrayX, 'arrayY': arrayY }
      ))
    }
  }, [userData, userMethod.method])



  useEffect(() => {
    // axios.get('https://react-flask-tutorial.herokuapp.com/flask/hello').then(response => {
    //   console.log("SUCCESS", response)
    //   setGetMessage(response)
    // }).catch(error => {
    //   console.log(error)
    // })

    axios.get('http://localhost:5000/flask/equation').then(response => {
      console.log("SUCCESS", response)
      setMethod(response.data)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  return (
    <div className="App">

      <h1>Curve fitting Calculator</h1>
      <div className="Data">
        <h3>Data</h3>
        <Spreadsheet key="DataTable" data={userData} className="DataTable" onChange={(e) => setUserData(e)} />
      </div>
      <div className="Method">
        <Form>
          <FittingMethod method={method} selectHandler={selectHandler} />
          <FittingOption method={method} userMethod={userMethod} selectHandler={selectHandler} />
          <FittingOrder method={method} userMethod={userMethod} selectHandler={selectHandler} />
        </Form>
        {userMethod.method && <FittingEquation userMethod={userMethod} plotArray={plotArray} updatePlotHandler={updatePlotHandler}/>}
      </div>
      {<Plotting plotArray={plotArray} calculatedArray={calculatedArray}/>}
    </div>
  );
}

export default App;
