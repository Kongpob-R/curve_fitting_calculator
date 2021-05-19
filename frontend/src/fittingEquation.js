import axios from 'axios'
import { useEffect, useState } from 'react'
import MathJax from 'react-mathjax';

const FittingEquation = (props) => {
    const [math, setMath] = useState(
        {
            'formula': null,
            'equation': null,
        }
    )
    useEffect(()=> {
        axios.post('http://localhost:5000/flask/equation',{ 'userMethod': props.userMethod ,'plotArray':props.plotArray},
        { 'headers': { 'Content-Type': 'application/json' } }).then(response => {
            console.log("SUCCESS", response)
            setMath(response.data.math)
            props.updatePlotHandler('calculatedX', response.data.math.calculatedX)
            props.updatePlotHandler('calculatedY', response.data.math.calculatedY)
          }).catch(error => {
            console.log(error)
          })
    },[props.userMethod])
    return ( 
        <div>
            {math.formula && <MathJax.Provider><MathJax.Node formula={math.formula} /></MathJax.Provider>}
            {math.equation && <h3>Fitting Equation</h3>}
            {math.equation && (<MathJax.Provider><MathJax.Node formula={math.equation} /></MathJax.Provider>)}
        </div>
    );
}
 
export default FittingEquation;