import React from "react";

export default class Task extends React.Componet {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr key={this.props.id}>
        <td>
          {this.props.content}
        </td>
        <td>
          <select defaultValue={this.props.status} onChange={this.handleUpdate.bind(this)} >
            <option value="todo" key="todo">todo</option>
            <option value="doing" key="doing">doing</option>
            <option value="done" key="done">done</option>
          </select>
        </td>
      </tr>
    );
  }

  handeleUpdate(e){
    e.preventDefault();
    this.props.onTaskUpdate({task: this.props.id, status: e.target.value})};
}
