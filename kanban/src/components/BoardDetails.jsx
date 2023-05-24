import React, { useState } from 'react'
import Button from './Button'
import PopUp from './PopUp'

function BoardDetails({ board, data }) {
  const columnColors = ['#49C4E5', '#8471f2', '#67e2ae', '#FFA500', '#FFC0CB']
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [status, setStatus] = useState('')

  const openPopUp = (taskTitle, taskDesc, status) => {
    setPopUpOpen(true);
    setTaskName(taskTitle)
    setTaskDescription(taskDesc)
    setStatus(status)
  };

  const closePopUp = () => {
    setPopUpOpen(false);
  };

  if (board) {
    return (
      <>
        <div className='board-details'>
          <ul>
            {board.columns.map((column, index) => (
              <li key={column.name}>
                <h2 className={`column-title ${index < columnColors.length ? 'has-color' : ''}`}>
                  <span
                    className="color-circle"
                    style={{ backgroundColor: columnColors[index % columnColors.length] }}
                  ></span>
                  {column.name} ({column.tasks.length})
                </h2>
                <ul>
                  {column.tasks.map((task) => (
                    <li key={task.title} onClick={() => openPopUp(task.title, task.description, task.status)} >
                      <h3>{task.title}</h3>
                      <p>
                        {task.subtasks.filter((subtask) => subtask.isCompleted).length} of {task.subtasks.length} subtasks
                      </p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        {isPopUpOpen && <PopUp type="EditTask" onClose={closePopUp} data={data} taskName={taskName} taskDescr={taskDescription} selectBoard={board} status={status} />}
      </>
    )
  } else {
    return (
      <div className="empty">
        <p>This board is empty. Create a new column to get started.</p>
        <Button type="btn-primary" content="+ Add New Column" />
      </div>
    )
  }
}

export default BoardDetails
