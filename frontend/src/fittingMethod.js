import { Dropdown } from 'semantic-ui-react'

const FittingMethod = (props) => {
    let formFittingMethod = null
    if (props.method) {
        formFittingMethod = Object.keys(props.method.fittingMethod).map((element, index) => {
            return { key: 'fitting' + index, text: element, value: index }
        })
    }
    return (
        <div>
            <h3>Fitting Method</h3>
            <Dropdown
                placeholder='Select Method'
                fluid
                selection
                options={formFittingMethod}
                onChange={(e, data) => {
                    props.selectHandler('method', data.options[data.value].text)
                    props.selectHandler('order', null)
                    props.selectHandler('option', null)
                }}
            />
        </div>
    )
}

export default FittingMethod;