import React, { useState } from 'react';
import Modal from 'react-modal';
import "./Modal.css"
function TaskModal({ isOpen, onClose , onSave }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSave = () => {
        // save task to list
        // create task object
        const task = {
            title: taskTitle,
            description: taskDescription,
        }
        // invoke callback function to add task to list
        onSave(task);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Save Task</h2>
            <form>
                <label>
                    Title:
                    <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
                </label>
                <br />
                <button className='btn btn-save' onClick={handleSave}>Save</button>
                <button className='btn btn-cancel' onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
}

export default TaskModal;
