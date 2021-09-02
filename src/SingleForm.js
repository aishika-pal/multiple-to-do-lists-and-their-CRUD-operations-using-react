import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './SingleForm.css';


class SingleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      // id: '',
      completed: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ task: e.target.value })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.addTask({ newTask: this.state.task, taskID: uuid(), listID: this.props.listID } );
    this.setState({ task: '' });
  }

  render() {

    return(
      <div className='SingleForm'>
        <form onSubmit={this.handleSubmit}>
          <p>New Task</p>
          <div className='input-container'>
            <label htmlFor='task'></label>
            <input
              type='text'
              value={this.state.task}
              name='task'
              placeholder='task'
              onChange={this.handleChange}
            >
            </input>
            <button>Submit</button>
          </div>
          

        </form>
      </div>
    )
  }

}

export default SingleForm;