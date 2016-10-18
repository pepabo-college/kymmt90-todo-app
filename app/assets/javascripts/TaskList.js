import React from "react";
import Task from "./Task";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import ReactDnDHTML5Backend from "react-dnd-html5-backend";

@DragDropContext(ReactDnDHTML5Backend)
export default class TaskList extends React.Component {
  render() {
    return(
      <tbody>
      {
        this.props.data.map((task) => {
          return <Task
          key={task.id} id={task.id}
          content={task.content} status={task.status} onTaskUpdate={this.props.onTaskUpdate}
          onDrop={
            (toID, fromID) => {
              const tasks = this.props.data.slice();
              const toIndex = tasks.findIndex(i => i.id == toID);
              const fromIndex = tasks.findIndex(i => i.id == fromID);
              const toTask = tasks[toIndex];
              const fromTask = tasks[fromIndex];
              tasks[toIndex] = fromTask;
              tasks[fromIndex] = toTask;
              this.setState({tasks});
            }
          }
          />
        })
      }
      </tbody>
    );
  }
}
