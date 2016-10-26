import React from 'react';
import {shallow} from 'enzyme';
import Task from '../../app/assets/javascripts/Task.js';

test("TaskのDOMが正しいこと", () => {
    const task = shallow(
        <Task content="test" status="todo" id="1" />
    );
    expect(task.find("td").first().text()).toEqual("test");
});
