import React, { Component } from 'react';
import './SingleTask.css';


class SingleTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      isShowing: false,
      completed: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleForm() {
    this.setState({ isShowing: !this.state.isShowing })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateTask({ task: this.state.task, taskID:this.props.taskID, listID: this.props.listID });
    this.setState({ isShowing: !this.state.isShowing })
  }

  handleCompleted() {
    this.setState({ completed: !this.state.completed })
  }

  render() {
    const taskData = this.props;
    let result;
    if (this.state.isShowing) {  
      result = (
        <form onSubmit={ this.handleSubmit } className='SingleTask-form'>
          <input 
            onChange={this.handleChange}
            name='task'
            value={this.state.task}
          />
          <button>Save</button>
        </form>
      );
    } else {
      result = (
        <div className='task-container'>
         
          <li 
            className={`task ${this.state.completed ? 'completed' : ''}`}
            onClick={this.handleCompleted}
          >
            {this.props.task}
          </li>
          <div className='btn-container'>
            <button onClick={ this.toggleForm }><i className='fas fa-edit' /></button>
            <button onClick={ () => this.props.delete(taskData) }><i className='fas fa-trash' /></button>
          </div>
        </div>
      );
    }
      return result;
    
  }
  
}


export default SingleTask;
