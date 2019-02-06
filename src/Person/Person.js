import React from 'react';
//import Radium from 'radium';
import './Person.css';

// Functional Component
const person = (props) => {

  // const style ={
  //   '@media (min-width: 500px)': {
  //     width: '450px'
  //   }}
  return(
    <div className="Person">
      <h1 onClick={props.click}> My name is {props.name} age is {props.age} </h1>
      <h1> and the value from the child {props.children} </h1>
      {/* onchange and Value brings in the two way binding */}
      <input type="text" onChange= {props.changed} value={props.name}/>    
    </div>
  );
}


//export default Radium(person);
export default person;