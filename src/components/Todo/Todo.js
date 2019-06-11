import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import List from './List';
import './Todo.css';

class Todo extends Component {
  constructor() {
    super();


    this.state = {
      task: '',
      items: []
    };
  }

  componentWillMount() {
    this.setState({
      items: [
        {
          id: uuidv4(),
          task: 'Contacto 1',
          completed: false
        }   
      ]
    });
  }

  handleOnChange = e => {
    const { target: { value } } = e;
    this.setState({
      task: value
    });
  }

  handleOnSubmit = e => {
    e.preventDefault();

    this.setState({
      task: '',
      items: [
        ...this.state.items,
        {
          id: uuidv4(),
          task: this.state.task,
          complete: false
        }
      ]
    });
  }

  markAsCompleted = id => {
    const foundTask = this.state.items.find(task => task.id === id);

    foundTask.completed = true;

    this.setState({
      items: [
        ...this.state.items,
        ...foundTask
      ]
    });
  }

  removeTask = id => {
    const filteredTasks = this.state.items.filter(task => task.id !== id);

    this.setState({
      items: filteredTasks
    });
  }

  render() {
    return (
      <div className="Todo">
        <h1>Nuevo contacto:</h1>

        <form onSubmit={this.handleOnSubmit}>
          <input value={this.state.task} onChange={this.handleOnChange} />
        </form>

         <List
           items={this.state.items}
           markAsCompleted={this.markAsCompleted}
           removeTask={this.removeTask}
         />
      </div>
    );
  }
}

export default Todo;
