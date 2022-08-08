import React from 'react';


const CounterView = (props) =>{
    const { countValue , handleIncrement } = props;
    return(
        <div>
            <h2 className="value">{countValue}</h2>
            <button onClick={handleIncrement(1)}>Increment</button>
            <button onClick={handleIncrement(-1)}>Decrement</button>
        </div>
    )
}

export default CounterView;
