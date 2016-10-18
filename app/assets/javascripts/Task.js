import React from "react";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";

@DropTarget('item', {
  drop(dropProps, monitor, dropComponent) {
    let dragProps = monitor.getItem();
    if (dropProps.id !== dragProps.id) {
      dragProps.onDrop(dragProps.id, dropProps.id);
    }
  },
}, (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
})
@DragSource('item', {
  beginDrag(props) {
    return props
  }
}, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
})
export default class Task extends React.Component {
  render() {
    return this.props.connectDragSource(this.props.connectDropTarget(
        <tr key={this.props.id} className="item" data-model_name="Task" data-update_url={"tasks/" + this.props.id + "/sort"}>
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
    ));
  }

  handleUpdate(e){
    e.preventDefault();
    this.props.onTaskUpdate({task: {id: this.props.id, status: e.target.value}})};
}
