import React from "react";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.onTaskUpdate({ task: { id: this.props.id, status: e.target.value } });
  }

  handleDestroy(e) {
    e.preventDefault();
    this.props.onTaskDestroy(this.props.id);
  }

  render() {
    return (
      <tr key={this.props.id}>
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
        <td>
          <button className="btn btn-danger" onClick={this.handleDestroy.bind(this)}>destroy</button>
        </td>
      </tr>
    );
  }
}
