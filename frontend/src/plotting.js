import Plot from 'react-plotly.js';

const Plotting = (props) => {
    return (
        <div className="Method">
            <Plot
                data={[
                    {
                        x: props.plotArray.arrayX,
                        y: props.plotArray.arrayY,
                        mode: 'markers',
                        marker: { color: 'red' },
                    },
                    {
                        mode: 'lines',
                        marker: { color: 'blue' },
                        x: props.calculatedArray.calculatedX,
                        y: props.calculatedArray.calculatedY
                    },
                ]}
                layout={{ width: 600, height: 320 }} />
        </div>
    )
}

export default Plotting;