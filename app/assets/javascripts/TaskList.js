import React from "react";
import Task from "./Task";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import ReactDnDHTML5Backend from "react-dnd-html5-backend";
import request from 'superagent';

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

              request.put("/tasks/" + fromTask.id + "/sort")
                .accept('application/json')
                .send({task: { id: fromTask.id,
                               content: fromTask.content,
                               row_order_position: toIndex }})
                .end((err, res) => {
                  if (err || !res.ok) {
                    console.error(this.props.url,
                                  status,
                                  err.toString());
                  } else {
                    this.setState({data: tasks});
                  }
                });
            }
          }
          />
        })
      }
      </tbody>
    );
  }
}
