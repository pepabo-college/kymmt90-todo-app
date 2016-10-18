import React from "react";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  changeColor(setProps){
    switch (setProps.status) {
    case "todo":
      this.setState({ color: "#ff9797" });
      break;
    case "doing":
      this.setState({ color: "#f4ff97" });
      break;
    case "done":
      this.setState({ color: "#979aff" });
      break;
    }
  };
  componentWillMount(){
    this.changeColor(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.changeColor(nextProps);
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
    this.props.onTaskUpdate({task: {id: this.props.id, status: e.target.value}});
  };
}
