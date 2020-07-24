import React, { Component } from 'react';
import { TodoBanner } from "./TodoBanner";
import {TodoRow } from "./TodoRow";
import {TodoCreator} from "./TodoCreator";
import {VisibilityControl} from "./VisibilityControl";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Annie",
            todoItems: [{action: "40min Literature reading", done: true},
                {action: "Morning Workout", done: true},
                {action: "Reaction Practicing", done: false},
                {action: "Room Decoration", done: false},
                {action: "Language Study", done: false}],
            showCompleted: true
        }
    }

    changeStateData = () => {
        this.setState({
            userName: this.state.userName === "Annie" ? "Zoe" : "Annie"
        })
    }

    updateNewTextValue = (event) => {
        this.setState({newItemText: event.target.value });
    }

    creatNewTodo = (task) => {
        if(!this.state.todoItems.find(item => item.action === task)) {
            this.setState({
                todoItems: [...this.state.todoItems, { action: task, done: false }]
            }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
        }
    }


    toggleTodo = (todo) => this.setState({ todoItems:
            this.state.todoItems.map( item => item.action === todo.action
                ? { ...item, done: !item.done } : item) });

    todoTableRows = (doneValue) => this.state.todoItems
        .filter( item => item.done === doneValue).map(item =>
            <TodoRow key = { item.action } item = { item }
                     callback = { this.toggleTodo } />);

    componentDidMount = () => {
        let data = localStorage.getItem("todos");
        this.setState(data != null
            ? JSON.parse(data)
            : {
                userName: "Annie",
                todoItems: [{action: "40min Literature reading", done: true},
                    {action: "Morning Workout", done: true},
                    {action: "Reaction Practicing", done: false},
                    {action: "Room Decoration", done: false},
                    {action: "Language Study", done: false}],
                showCompleted: true
            });
    }

    render = () =>
        <div>
            <TodoBanner name = { this.state.userName } tasks = {this.state.todoItems }/>
            <div className="container-fluid">
                <TodoCreator callback = { this.creatNewTodo } />

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr><th> My Tasks </th><th> Status </th></tr>
                    </thead>
                    <tbody>{ this.todoTableRows(false) }</tbody>
                </table>

                <div className="bg-secondary text-white text-center p-2">
                    <VisibilityControl description = "Completed Tasks "
                                       isChecked = {this.state.showCompleted}
                                       callback = { (checked) =>
                                       this.setState({ showCompleted : checked})}/>
                </div>

                { this.state.showCompleted &&
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr><th>Description</th><th>Done</th></tr>
                        </thead>
                        <tbody>{ this.todoTableRows(true) }</tbody>
                    </table>
                }

            </div>

                <button className="btn btn-primary float-right m-2" style={{marginTop: '50px'}}
                        onClick={ this.changeStateData }>
                    Log out
                </button>

        </div>

}

