import React, { Component } from 'react';
import './TitleForm.css';


class TitleForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editTitle(this.state.title, this.props.id );

  }


  render() {
    let title;
    this.props.titleCompleted ? 
    title = ( 
        <h1 onClick={ () => this.props.toggleTitleForm(this.props.id) }> {this.props.title} </h1>
    ) :
    title = (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={this.state.title}></label>
          <input 
            id={this.state.title}
            value={this.state.title}
            name={this.state.title}
            onChange={this.handleChange}
            placeholder='title'
          >
          </input>
          <button>Save</button>
        </form>
    );

    return(
      <div className='TitleForm'>
        <div className='Title-container'>{ title }</div>
        <p>A simple React List App</p>
      </div>
    ) ;
  }

}

export default TitleForm;