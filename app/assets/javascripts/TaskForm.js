import React from "react";
import ReactDOM from "react-dom";

export default class TaskForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    var content = ReactDOM.findDOMNode(this.refs.content).value.trim();
    if (!content) return;
    this.props.onTaskSubmit({ content: content, status: 'todo' });
    ReactDOM.findDOMNode(this.refs.content).value = '';
  }

  render() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit.bind(this)} >
        <div className="input-group">
          <input type="text" className="form-control" placeholder="todo" ref="content" />
          <span className="input-group-btn">
            <input type="submit" value="登録" className="btn btn-primary" />
          </span>
        </div>
      </form>
    );
  }
}
