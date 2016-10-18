import React from "react";

var Task = React.createClass({
  getInitialState() {
    return this.getColor(this.props);
  },

  getColor(setProps){
    switch (setProps.status) {
    case "todo":
      return { color: "#ff9797" };
    case "doing":
      return { color: "#f4ff97" };
    case "done":
      return { color: "#979aff" };
    }
    return {};
  },
  // componentWillMount(){
  //   this.setState(this.getColor(this.props));
  // }
  componentWillReceiveProps(nextProps){
    this.setState(this.getColor(nextProps));
  },
  render() {
    return (
      <tr style={{backgroundColor: this.state.color}} key={this.props.id}>
        <td>
          {this.props.content}
        </td>
        <td>
          <select className="form-control" defaultValue={this.props.status} onChange={this.handleUpdate} >
            <option value="todo" key="todo">todo</option>
            <option value="doing" key="doing">doing</option>
            <option value="done" key="done">done</option>
          </select>
        </td>
      </tr>
    );
  },
  handleUpdate(e){
    e.preventDefault();
    this.props.onTaskUpdate({task: {id: this.props.id, status: e.target.value}});
  }
});
export default Task;
