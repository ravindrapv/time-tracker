import React, { useState } from 'react';
import Modal from "../Modal/Modal"
import "./Timer.css"

function Timer() {
  const [stage, setStage] = useState("stopped");
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  function formatTime(time) {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString({
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  const startTimer = () => {
    setStage("started");
    setIntervalId(setInterval(() => {
      setTime((time) => time + 1);
    }, 1000));
  }

  const pauseTimer = () => {
    clearInterval(intervalId);
    setStage("paused");
  }

  const saveTimer = () => {
    clearInterval(intervalId);
    setStage("saved");
    // Open modal for task details
    setIsModalOpen(true)
  }
  const addTask = (task) => {
    setTasks([...tasks, task])
  }
  return (
    <div>
      <h2>Time Tracking App</h2>
      <div className='displayTimer'>{formatTime(time)}</div>
      <button className='btn btn-start' disabled={stage === "started"} onClick={startTimer}>Start</button>
      <button className='btn btn-pause' disabled={stage === "paused"} onClick={pauseTimer}>Pause</button>
      <button className='btn btn-save' disabled={stage === "saved"} onClick={saveTimer}>Save</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addTask} />
      <ul className='items'>
        {tasks.map((task, index) => (
          <li key={index}>{task.title} <br /> {task.description}- {formatTime(time)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Timer;
