import React from "react";
import ReactDOM from "react-dom";
import TaskApp from "./TaskApp";

$(function(){
  ReactDOM.render(
    <TaskApp url="/tasks" pollInterval={2000} />,
    document.getElementById('container')
  );
});
