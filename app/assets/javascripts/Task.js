import React from "react";

export default class Task extends React.Component {
  render() {
    return (
      <tr key={this.props.id}>
        <td className="col-md-6">
          {this.props.content}
        </td>
        <td className="col-md-2">
          <select className="form-control" defaultValue={this.props.status} onChange={this.handleUpdate.bind(this)} >
            <option value="todo" key="todo">todo</option>
            <option value="doing" key="doing">doing</option>
            <option value="done" key="done">done</option>
          </select>
        </td>
        <td className="col-md-4">
          <textarea value={this.props.memo} onChange={this.handleUpdate.bind(this)}></textarea>
        </td>
      </tr>
    );
  }

  handleUpdate(e){
    e.preventDefault();
    this.props.onTaskUpdate({task: {id: this.props.id, status: e.target.value, memo: this.props.memo}});
  };
}
