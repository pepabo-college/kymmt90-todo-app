import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import request from 'superagent';

export default class TaskApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  loadTaskFromServer() {
    request
      .get(this.props.url)
      .accept('application/json')
      .end((err, res) => {
        if(err || !res.ok){
          console.error(this.props.url,
                        status, err.toString());
        } else {
          this.setState({data: res.body});
        }
      });
  }

  handleTaskSubmit(task) {
    var tasks = this.state.data;
    var newTasks = tasks.concat([task]);
    this.setState({data: newTasks});
    request
      .post(this.props.url)
      .accept('application/json')
      .send({task: task})
      .end((err, res) => {
        if(err || !res.ok){
          console.error(this.props.url,
                        status, err.toString());
        } else {
          this.setState({data: newTasks});
        }
      });
  }

  componentDidMount(){
    this.loadTaskFromServer();
    setInterval(this.loadTaskFromServer.bind(this),
                this.props.pollInterval);
  }

  render() {
    return (
      <div className="taskApp">
        <TaskForm
        onTaskSubmit={this.handleTaskSubmit.bind(this)} />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Content</th>
              <th>Status</th>
              <th colSpan="3"></th>
            </tr>
          </thead>
          <TaskList data={this.state.data} onTaskUpdate={this.taskUpdate.bind(this)} />
        </table>
      </div>
    );
  }

  taskUpdate(task) {
    request
      .patch(this.props.url + '/' + task.task.id)
      .accept('application/json')
      .send(task)
      .end((err, res) => {
        if(err || !res.ok){
          console.error(this.props.url, status, err.toString());
        } else {
          var tasks = this.state.data;
          var updated_task_index = tasks.findIndex((t) => t.id === task.task.id);
          tasks[updated_task_index] = res.body;
          this.setState({data: tasks});
        }
      });
  }
}
