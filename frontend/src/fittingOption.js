import { Form, Radio } from 'semantic-ui-react'
import MathJax from 'react-mathjax';

const FittingOption = (props) => {
    let form = null
    if (props.method && props.userMethod.method) {
        form = props.method.fittingMethod[props.userMethod.method].option.map((element, index) => {
            let mathElement = null
            let newElement = element
            if (props.userMethod.method === 'Nonlinear Equation') {
                mathElement = (<MathJax.Provider><MathJax.Node inline formula={element} /></MathJax.Provider>)
                newElement = null
            }
            return (
                <div className="Options">
                    <Form.Field>
                        <span>
                            <Radio
                                key={'option' + index}
                                label={newElement}
                                name={'radio_option'}
                                value={element}
                                // checked={}
                                onChange={() => props.selectHandler('option', element)}
                            />
                        </span>
                        <span>{mathElement}</span>
                    </Form.Field>
                </div>

            )
        })
    }
    return (
        <div>
            {form && form.length > 0 ? (<h4>Fitting Option</h4>) : ''}
            {form}
        </div>
    )
}
export default FittingOption;