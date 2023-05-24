import React, { useState } from 'react';
import Button from './Button';
import X from '../assets/icon-cross.svg';
import VerticalEllipsis from '../assets/icon-vertical-ellipsis.svg';

function PopUp({ type, onClose, data, selectBoard, taskName, taskDescr, status }) {

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Aqui você pode adicionar a lógica para criar uma nova tarefa no data.json
    // com os valores dos campos taskTitle, taskDescription e subtasks

    // Fechar o popup após a criação da tarefa
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
              <div className="subtask" key={subtask.id}>
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

      title = `${taskName}`;
      description = `${taskDescr}`
      content = (
        <form>
          <div className="check-tasks">
            <h3>Subtasks (2 of 3)</h3>
            {data.boards[b].columns.find(stat => stat.name === status).tasks.filter(task => task.title === taskName)[0].subtasks.map(subtask => (
              subtask.isCompleted === true ? (
                <div className="check">
                  <label htmlFor={subtask.title}>
                    <input type="checkbox" name={subtask.title} id={subtask.title} checked />
                    <p>{subtask.title}</p>
                  </label>
                </div>
              ) : (
                <div className="check">
                  <label htmlFor={subtask.title}>
                    <input type="checkbox" name={subtask.title} id={subtask.title} />
                    <p>{subtask.title}</p>
                  </label>
                </div>
              )
            ))}
          </div>
          <div className="input">
            <label htmlFor="columnEditSelector">Status</label>
            <select id="columnEditSelector">
              {data.boards[b].columns.map(column => (
                column.name == status ? (
                  <option key={column.name} value={column.name} selected>
                    {column.name}
                  </option>
                ) : (
                  <option key={column.name} value={column.name}>
                    {column.name}
                  </option>
                )
              ))}
            </select>
          </div>
        </form>
      );
      break;
  }

  return (
    <div className="popup">
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
