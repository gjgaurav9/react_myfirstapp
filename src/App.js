import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

//class-based components
class App extends Component {

  state = {
    persons: [
      {key: "sdf45", name:"gaurav" ,age:"29"},
      {key: "sdf46",name:"Mohan", age:"24"},
      {key: "sdf47",name:"Pappu", age:"43"},
      {key: "sdf49",name:"Lallu", age:"33"}
    ],
    showPerson: false
  }


  // We were changing the state on the click with the help of this method.

  // onClickHandler = (newName) => {

  //   //console.log('on click');

  //   this.setState({
  //     persons: [
  //       {name:newName ,age:"22"},
  //       {name:"Mohan", age:"24"},
  //       {name:"Pappu", age:"43"}
  //     ]
  //   }
  //   );
  // };

  deletePersonHandler = (personIndex) =>{
 
    //This is not a good practice as this will give the reference of the Array rather a new copy. Working with this may result in an altering the original Array which may lead to data discrepency.
    //JavaScript objects are referencytype. So It will mutate the original objects.
    //const persons = this.state.persons; 

    //This is not working as person.splice is creting a problem
    //const persons = this.state.persons.slice;

    //Spread Operator: Updating the state immutably: This is the best approach to take an Array n convert it into a list. 
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons})

  }

  nameChangedHandler = (event, id) => {
    //console.log('on click');

    const personIndex = this.state.persons.findIndex( p =>{
      return p.key === id;
    });

    //console.log(personIndex);

    const person = {
      ...this.state.persons[personIndex]
    };



    //console.log(person);

    //Alternative approach
    //const person = Object.assign({},this.state.persons[personIndex]);
    person.name = event.target.value;

    console.log(person.name);

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons:persons});

    //console.log(persons);


    //Setting the state 

    // this.setState({
    //   persons: [
    //     { name:"gaurav" ,age:"28"}, 
    //     { name:event.target.value , age:"24"},
    //     { name:"Pappu", age:"43"}
    //   ]
    // });
  };

  //Use this syntax as it allow to be accessed with the 'this' keyword itself
  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({showPerson: !doesShow});
  }

  // This method will rendered fully whenever React renders the page. S
  render() {

    // Styling is scoped to the the component where you are adding it
    // inline CSS
    const style = {
      //We can change this property, even if this is a constant.
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      // for cursor as a pointer
      cursor:"pointer",
      // ':hover':{
      //   backgroundColor:'lightgreen',
      //   color:'black'
      // }
    };


    //Cleaner way of writing the persons list.
    let persons = null;

    if(this.state.showPerson){
      persons = (
        <div>
          {this.state.persons.map((person, index) =>{
            return <Person
             click={() => this.deletePersonHandler(index)}
             name={person.name}
             age={person.age}
             key={person.key}
             changed={(event) => this.nameChangedHandler(event,person.key)}/>
          })}
        
        </div>
      );
      
      style.backgroundColor = 'red';

      style[':hover'] = {
        backgroundColor:'salmon',
        color:'black'
      }

      // Static way of rendering Persons
      
      // (
      //   <div>
      //   <Person 
      //     name={this.state.persons[0].name} 
      //     age= {this.state.persons[0].age}/>

      //   {/* passing the method as a refrence */}
      //   <Person 
      //     name={this.state.persons[1].name} 
      //     age= {this.state.persons[1].age}
      //     click = {this.onClickHandler.bind(this, "Gaurav !!!!!!")}
      //     changed = {this.nameChangedHandler}/> 

      //   <Person 
      //     name={this.state.persons[2].name} 
      //     age={this.state.persons[2].age}> I am have a Child
      //   </Person>
      // </div>
      // )

    }

    //let classes = ['red','bold'].join(' ');

    const classes = [];

    //Building an Array of CSS classes dynamically based on the conditions.
    if(this.state.persons.length<=2){
      classes.push('red');
    }
    if(this.state.persons.length<=1){
      classes.push('bold');
    }

    console.log(classes);

    return (

      // resolve-styles.js:244 Uncaught Error: To use plugins requiring `addCSS` (e.g. keyframes, media queries), please wrap your application in the StyleRoot component. Component name: `person`. StyleRoot can be imported and apllied.
      //<StyleRoot>
        <div className="App">
          <h1 className={classes.join(' ')}>This is how I react</h1>
          {/* inline CSS applied */}
          <button
            style = {style} 
            onClick={this.togglePersonHandler}>Toggle button</button>
          {persons}


          {/* direct method to write a condition*/}
          {/* { 
            this.state.showPerson === true ? */}
                {/* Any Code you want to render */}
              {/* </div> : null
          } */}
          
        </div>  
      //</StyleRoot>

    );
  } 
}


//Wrapping the App component into Radium Component. This is a higher order component.
//export default Radium(App);

export default App;