import React, { Component } from 'react';
import SingleList from './SingleList';
import SingleForm from './SingleForm';
import TitleForm from './TitleForm';
import selectCell from './selectCell';
import uuid from 'uuid/v4';
import './ListContainer.css';


class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {
          title:'Title here...',
          titleCompleted: true,
          listID: uuid(),
          tasks: [
            { task: 'vacuum', id: uuid()}
          ],
          isActive: false
        },
        {
          title:'Title 2 ...',
          titleCompleted: true,
          listID: uuid(),
          tasks: [
            { task: 'Clean floor', id: uuid()}
          ],
          isActive: false
        },
        {
          title:'Title 3 ...',
          titleCompleted: true,
          listID: uuid(),
          tasks: [
            { task: 'Clean floor', id: uuid()}
          ],
          isActive: false
        },
        {
          title:'Title 4 ...',
          titleCompleted: true,
          listID: uuid(),
          tasks: [
            { task: 'Clean floor', id: uuid()}
          ],
          isActive: false
        },
        {
          title:'Title 5 ...',
          titleCompleted: true,
          listID: uuid(),
          tasks: [
            { task: 'Clean floor', id: uuid()}
          ],
          isActive: false
        },
        {
          title:'Title 6 ...',
          titleCompleted: true,
          listID: uuid(),
          tasks: [
            { task: 'Clean floor', id: uuid()}
          ],
          isActive: false
        },
        {
          title:'Title 7 ...',
          titleCompleted: true,
          listID: uuid(),
          tasks: [
            { task: 'Clean floor', id: uuid()}
          ],
          isActive: false
        }
       ],
       rotateY: 0,
       currentCell: {},
       counter: 0,
    }

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleToggleTitle = this.handleToggleTitle.bind(this);
    this.handleToggleActivePanel = this.handleToggleActivePanel.bind(this);
  }

  static defaultProps = {
    cellWidth: 390,
    cellHeight: 140, 
    margin: 5,
    backgroundColors: ['green', '#ffcd00', 'red', 'blue', 'maroon', 'orange', 'purple'],
  }

  componentDidMount() {
    const cellData = selectCell(this.state.lists, this.props.backgroundColors);
    this.setState({ currentCell: cellData[0] })
  }

  handleAddTask(obj) {
    const { newTask, listID, taskID } = obj;
    const newLists = this.state.lists.map(list => {
      if (list.listID === listID) {
        return { ...list, tasks: [...list.tasks, {task: newTask, id: taskID}]};
      } else {
        return list;
      }
    })
    this.setState({ lists: newLists })
  }
  
  handleDelete(obj) {
    const { taskID, listID } = obj;

    this.setState(st => ({
      lists: st.lists.map(list => (
        list.listID === listID ? {...list, tasks: list.tasks.filter(task => 
          taskID !== task.id)} : list 
      ))
    }))
  }

  handleUpdateTask(obj) {
    const { listID, taskID } = obj;
    const newTask = obj.task;
    
    this.setState( st => ({
      lists: st.lists.map(list => (
        list.listID === listID ? 
        {...list, 
          tasks: list.tasks.map(task => (
            task.id === taskID ? 
            {...task, task: newTask } : 
            task
          )) } : 
        list
      ))
    }))
  }

  handleEditTitle(title, id) {
    this.setState( st => ({
      lists: st.lists.map(el => el.listID === id ? { ...el, title:title, titleCompleted: true }: el )
    }) 
    )
  }

  handleToggleTitle(id) {
    console.log('handleToggleTitle', id)
    this.setState( st => ({
      lists: st.lists.map(el => (
        el.listID === id ? 
        { ...el, titleCompleted: false } :
         el 
        )
      )
    })
    )
  }

  handleCarousel(dir, deg) {
    const cellData = selectCell(this.state.lists, this.props.backgroundColors);
    const counter = (() => {
      if (this.state.counter === 0 && dir === -1) {
        return cellData.length - 1;
      } else if (this.state.counter === cellData.length - 1 && dir === 1) {
       return 0;
      } else {
        return this.state.counter + (1 * dir);
      }
    })();
    const rotate = this.state.rotateY - deg * dir;
    
    this.setState({ currentCell: cellData[counter], rotateY: rotate, counter: counter })
  }

  handleToggleActivePanel() {
    this.setState(st => ({
      lists: st.lists.map(list => {
        return list.listID === st.currentCell.listID ? 
        {...list, isActive: !list.isActive } : 
        list
      }),
    }))
  }

  render() {
    let rotateY;
    const carouselData = {
      numOfCells: this.state.lists.length,
      width: this.props.cellWidth ,
      degree: 360 / this.state.lists.length,
      translateZ: function() { 
        return Math.round((this.width / 2) / Math.tan(Math.PI / this.numOfCells))
      },
      rotateY: function() {
        rotateY = rotateY + this.degree;
      }
    }

    const lists = this.state.lists.map((list, i) => {
      rotateY = i * carouselData.degree;

      const cellStyle = {
        backgroundColor: `${this.props.backgroundColors[i]}`,
        opacity: `${list.isActive ? 1 : 0.9 }`,
        width: `${this.props.cellWidth - (2 * this.props.margin)}px`,
        minHeight: `${this.props.cellHeight - (2 * this.props.margin)}px`,
        transform:
          `rotateY(${rotateY}deg) 
          translateZ(${list.isActive ? carouselData.translateZ() + 200 : carouselData.translateZ() }px)` ,
        left: `${this.props.margin}px`, 
        top: `${this.props.margin}px`, 
      }
    

      return(
      <div className=' carousel-cell'  style={cellStyle}>
        <div className='singleList-container'>
          <TitleForm 
            title={list.title}
            editTitle={this.handleEditTitle}
            titleCompleted={list.titleCompleted}
            key={list.listID}
            id={list.listID}
            toggleTitleForm={this.handleToggleTitle}
          />
          <SingleList 
            tasks={list.tasks}
            listID={list.listID}
            deleteTask={this.handleDelete}
            updateTask={this.handleUpdateTask}
            // completed={this.handleCompleted}
          />
          <SingleForm 
            addTask={this.handleAddTask}
            listID={list.listID}
          />
        </div>
        
      </div>
      )
    })



    return (
      <div className='main-container'>
        <div className='nav'>
          <h1 style={{color: `${this.state.currentCell.color}`}}>React - Keep-Me-Busy App</h1>
          <div className='button-container'>
            <button 
              className='btn button-left' 
              onClick={() => this.handleCarousel(-1, carouselData.degree)}
            ><i className="fas fa-angle-double-left" style={{color: `${this.state.currentCell.color}`}}></i></button>
            <button className='btn select-panel' onClick={() => this.handleToggleActivePanel()}><i className="fas fa-check-circle" style={{color: `${this.state.currentCell.color}`}}></i></button>
            <button 
              className='btn button-right' 
              onClick={() => this.handleCarousel(1, carouselData.degree)}
            ><i className="fas fa-angle-double-right" style={{color: `${this.state.currentCell.color}`}}></i></button>
          </div>
        </div>
        <div className='carousel-scene' 
          style={{
            width:`${this.props.cellWidth}px`,
            height: `${this.props.cellHeight}px`,
          }}>
          <div className='carousel-carousel' 
            style={
              {transform:
                `translateZ(-${carouselData.translateZ()}px) 
                rotateY(${this.state.rotateY}deg)`
              }
            }
          >
            { lists } 
          </div>
        </div>
        
      </div>
    );
  }
}


export default ListContainer;