import React, {useState} from 'react';
import './CounterApp.css';
import CounterView from './CounterView';

// class CounterApp extends React.Component{
//   constructor(){
//     super();
//     console.log("constructor is called");
//     // this.state = { count: 0}
//     // this.increment = this.increment.bind(this);
//     // this.decrement = this.decrement.bind(this);
//     this.state = { count: 0 }
//   }
//   // state = { count: 0 }
  
//   increment = (step) =>{
//     console.log("button clicked",this);
//     this.setState((state) => {
//       return { count : state.count + step }
//     })
//   }

  
//   render(){
//     const { count } = this.state;
//     const { title } = this.props;
//     return(
//       <div>
//         <h2 className="value">Hello World</h2>
//         <div className="counter-app">
//           <h1>{title}</h1>
//            <h2 className="value">{count}</h2>
//            <button onClick={() => this.increment(1)}>Increment</button>
//            <button onClick={() => this.increment(-1)}>Decrement</button>
//          </div>
//       </div>
//     )
//   }
// }

const CounterApp = (props) => {
  const[count,setCount] = useState(0);

  const { title } = props;

  const increment = (step) =>() => setCount(count + step)
  
  
    return(
      <div>
        
        <div className="counter-app">
          <h2 className="value">Hello World</h2>
          <h1>{title}</h1>
          <CounterView
            countValue={count}
            handleIncrement={increment} 
          />
        </div>
      </div>
    )
}

export default CounterApp;