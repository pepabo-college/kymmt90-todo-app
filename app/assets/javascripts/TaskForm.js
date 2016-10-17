import React from "react";
import ReactDOM from "react-dom";

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activateSubmit: false };
  }

  handleSubmit(e){
    e.preventDefault();
    var content = ReactDOM.findDOMNode(this.refs.content).value.trim();
    if (!content){
      return;
    }
    this.props.onTaskSubmit({content: content, status: 'todo'});
    ReactDOM.findDOMNode(this.refs.content).value = '';
    return;
  }

  handleChange(e) {
    var content = ReactDOM.findDOMNode(this.refs.content).value.trim();
    if (!content || /\s+/.test(content)) {
      this.setState({ activateSubmit: false });
    } else {
      this.setState({ activateSubmit: true });
    }
  }

  render() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)}>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="ToDo" ref="content" />
          <span className="input-group-btn">
            <input type="submit" className="btn btn-primary" value="登録" disabled={!this.state.activateSubmit} />
          </span>
        </div>
      </form>
    );
  }
}
