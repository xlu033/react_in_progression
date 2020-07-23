import React, { Component } from 'react';
import { TodoBanner } from "./TodoBanner";
import {TodoRow } from "./TodoRow";
import {TodoCreator} from "./TodoCreator";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Annie",
            todoItems: [{action: "40min Literature reading", done: true},
                {action: "Morning Workout", done: true},
                {action: "Reaction Practicing", done: false},
                {action: "Room Decoration", done: false}],

        }
    }

    updateNewTextValue = (event) => {
        this.setState({newItemText: event.target.value });
    }

    creatNewTodo = (task) => {
        if(!this.state.todoItems.find(item => item.action === task)) {
            this.setState({
                todoItems: [...this.state.todoItems, { action: task, done: false }]
            });
        }
    }


    toggleTodo = (todo) => this.setState({ todoItems:
            this.state.todoItems.map(item => item.action === todo.action
                ? { ...item, done: !item.done } : item) });

    todoTableRows = () => this.state.todoItems.map(item =>
        <tr key={ item.action }>
            <td>{ item.action}</td>
            <td>
                <input type="checkbox" checked={ item.done }
                       onChange={ () => this.toggleTodo(item) } />
            </td>
        </tr> );

    changeStateData = () => {
        this.setState({
            userName: this.state.userName === "Annie" ? "Zoe" : "Annie"
        })
    }

    render = () =>
            <div>
                <h4 className="bg-primary text-white text-center p-2" style={{height: '60px', marginBottom: '20px'}}>
                    {this.state.userName}'s TO DO LIST
                    ({ this.state.todoItems.filter(t => !t.done).length} items to do)
                </h4>


                <div className="container-fluid">
                    <div className="my-1">
                        <input className="form-control"
                               value={ this.state.newItemText }
                               style={{marginBottom: '12px'}}
                               onChange={ this.updateNewTextValue } />
                        <button className="btn btn-primary mt-1" style={{marginBottom: '20px'}}
                                onClick={ this.createNewTodo }> Add Task </button>
                    </div>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr><th>Description</th><th>Done</th></tr>
                        </thead>
                        <tbody>{ this.todoTableRows() }</tbody>
                    </table>
                </div>

                <button className="btn btn-primary float-right m-2" style={{marginTop: '50px'}}
                        onClick={ this.changeStateData }>
                    Log out
                </button>

            </div>

}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/