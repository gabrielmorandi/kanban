import React, { useState, useEffect } from 'react';
import Button from './Button';
import X from '../assets/icon-cross.svg';
import VerticalEllipsis from '../assets/icon-vertical-ellipsis.svg';

function PopUp({ type, onClose, data, selectBoard, taskName, taskDescr, status, theme }) {

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  let title, description, content;

  switch (type) {
    case 'AddNewTask':
      const [taskTitle, setTaskTitle] = useState('');
      const [taskDescription, setTaskDescription] = useState('');
      const [subtasks, setSubtasks] = useState([{ id: 1, content: '' }]);
      const [a, setA] = useState(data.indexOf(data.find((board) => board.name === selectBoard)))

      const handleTaskTitleChange = (event) => {
        setTaskTitle(event.target.value);
      };

      const handleTaskDescriptionChange = (event) => {
        setTaskDescription(event.target.value);
      };

      const handleAddSubtask = () => {
        const newSubtask = { id: Date.now(), content: '' };
        setSubtasks([...subtasks, newSubtask]);
      };

      const handleSubtaskChange = (index, event) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index].content = event.target.value;
        setSubtasks(updatedSubtasks);
      };

      const handleSubtaskDelete = (index) => {
        const updatedSubtasks = subtasks.filter((_, i) => i !== index);
        setSubtasks(updatedSubtasks);
      };

      title = 'Add New Task';
      content = (
        <form onSubmit={handleFormSubmit}>
          <div className="input">
            <label htmlFor="taskTitle">Title</label>
            <input
              type="text"
              id="taskTitle"
              placeholder="e.g. Take coffee break"
              value={taskTitle}
              onChange={handleTaskTitleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
              placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            ></textarea>
          </div>
          <div className="input">
            <label>Subtasks</label>
            {subtasks.map((subtask, index) => (
              <div className="subtask" key={index}>
                <input
                  type="text"
                  name={`subtask-${index}`}
                  value={subtask.content}
                  onChange={(event) => handleSubtaskChange(index, event)}
                />
                <img
                  src={X}
                  alt="Excluir"
                  onClick={() => handleSubtaskDelete(index)}
                />
              </div>
            ))}
            <Button
              type="btn-secundary"
              content="+ Add New Subtask"
              t="button"
              func={handleAddSubtask}
            />
          </div>
          <div className="input">
            <label htmlFor="columnSelector">Status</label>
            <select id="columnSelector">
              {data[a].columns.map((column) => (
                <option key={column.name} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
          <Button type="btn-terciary" content="Create Task" t="submit" />
        </form>
      );
      break;
    case 'EditTask':
      const [b, setB] = useState(data.boards.indexOf(selectBoard))
      const [checkboxes, setCheckboxes] = useState([]);

      useEffect(() => {
        const task = data.boards[b].columns.find(stat => stat.name === status).tasks.filter(task => task.title === taskName)[0];
        const newCheckboxes = task.subtasks.map(subtask => ({ id: subtask.title, isCompleted: subtask.isCompleted }));
        console.log(newCheckboxes)
        setCheckboxes(newCheckboxes);
      }, [data, b, status, taskName]);

      const handleCheckboxClick = (id) => {
        setCheckboxes(prevCheckboxes =>
          prevCheckboxes.map(checkbox =>
            checkbox.id === id
              ? { ...checkbox, isCompleted: !checkbox.isCompleted }
              : checkbox
          )
        );
      };
      

      title = `${taskName}`;
    description = `${taskDescr}`
    content = (
      <form onSubmit={handleFormSubmit}>
        <div className="check-tasks">
          <h3>Subtasks (2 of 3)</h3>
          {checkboxes.map((checkbox, index) => (
            <div className="check" key={index}>
              <label htmlFor={checkbox.id}>
                <input
                  type="checkbox"
                  name={checkbox.id}
                  id={checkbox.id}
                  checked={checkbox.isCompleted}
                  onClick={() => handleCheckboxClick(checkbox.id)}
                />
                <p>Subtask {index + 1}</p>
              </label>
            </div>
          ))}
        </div>
        {/* Restante do código */}
      </form>
    );
    break;
  }

  return (
    <div className={`${theme} popup`} >
      <div className="popup-content">
        {type == 'EditTask' ? (
          <header>
            <h3>{title}</h3>
            <img src={VerticalEllipsis} alt="Menu Vertical" />
          </header>
        ) : <h3>{title}</h3>}
        {description ? (
          <h4>{description}</h4>
        ) : null}
        {content}
        <Button type={'btn-close'} content={"Close"} func={onClose} />
      </div>
    </div>
  );
}

export default PopUp;
