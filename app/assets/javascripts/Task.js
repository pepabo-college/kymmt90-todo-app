import React from "react";

export default class Task extends React.Component {
  constructor(props){
    super(props);
    this.state = {color: "#f0f0f0"}
    switch (this.props.status) {
      case "todo": return this.state.color = "#ff9797"
      case "doing": return this.state.color = "#f4ff97"
      case "done": return this.state.color = "#979aff"
    }
  }
  render() {
    return (
      <tr style={{backgroundColor: this.state.color}} key={this.props.id}>
        <td>
          {this.props.content}
        </td>
        <td>
          <select className="form-control" defaultValue={this.props.status} onChange={this.handleUpdate.bind(this)} >
            <option value="todo" key="todo">todo</option>
            <option value="doing" key="doing">doing</option>
            <option value="done" key="done">done</option>
          </select>
        </td>
      </tr>
    );
  }

  handleUpdate(e){
    e.preventDefault();
    this.props.onTaskUpdate({task: {id: this.props.id, status: e.target.value}})};
}
