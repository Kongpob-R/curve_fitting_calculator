import { Form, Radio } from 'semantic-ui-react'

const FittingOption = (props) => {
    let form = null
    if (props.method && props.userMethod.method) {
        form = props.method.fittingMethod[props.userMethod.method].order.map((element, index) => {
            return (
                <div className="Orders">
                    <Form.Field>
                        <Radio
                            key={'order' + index}
                            label={element}
                            name={'radio_order'}
                            value={element}
                            // checked={}
                            onChange={() => props.selectHandler('order', element) }
                        />
                    </Form.Field>
                </div>
            )
        })
    }
    return (
        <div>
            {form && form.length > 0 ? (<h4>Fitting Order</h4>) : ''}
            {form}
        </div>
    )
}
export default FittingOption;