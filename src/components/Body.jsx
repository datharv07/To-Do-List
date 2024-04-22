import React, { useState , useEffect} from 'react';

const Body = ({ filter }) => {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState("");

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                const parsedTasks = JSON.parse(storedTasks);
                setTasks(parsedTasks);
            } catch (error) {
                console.error('Error parsing tasks from local storage:', error);
            }
        }
    }, []); 
    

    const saveTOLocal = () => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const handleAddTask = () => {
        if (newTaskName.trim() === "") return;
        const newTask = {
            id: tasks.length + 1,
            name: newTaskName,
            status: "Not Started"
        };
        setTasks([...tasks, newTask]);
        setNewTaskName("");
        saveTOLocal();
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        saveTOLocal();
    };

    const handleTaskNameChange = (id, newName) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, name: newName };
            }
            return task;
        });
        setTasks(updatedTasks);
        saveTOLocal();
    };

    const handleTaskStatusChange = (id, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
        saveTOLocal();
    };

    // Mapping colors based on status
    const colorMap = {
        "Not Started": "bg-red-200",
        "In Progress": "bg-yellow-200",
        "Completed": "bg-green-200"
    };

    return (
        <div className="container mx-auto my-8 ">
            <div className="mb-4 flex flex-col sm:flex-row items-center m-3">
                <input
                    type="text"
                    placeholder="Add a task..."
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    className="border border-gray-100 px-10 py-2 rounded-md mb-2 sm:mb-0 mr-0 sm:mr-2 w-11/12"
                />
                <button
                    onClick={handleAddTask}
                    // className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 "
                    class="bg-violet-500 text-white px-4 py-2 rounded-md  hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
                >
                    Add Task
                </button>
            </div>
            <div className="grid grid-cols-1  gap-4">  
            {/* sm:grid-cols-3 */ }
                {/* Task sections based on filter */}
                {filter === "all" && (
                    <>
                        <TaskSection title="Completed" tasks={tasks.filter(task => task.status === "Completed")} onNameChange={handleTaskNameChange} onStatusChange={handleTaskStatusChange} onDeleteTask={handleDeleteTask} color="bg-green-200" />
                        <TaskSection title="In Progress" tasks={tasks.filter(task => task.status === "In Progress")} onNameChange={handleTaskNameChange} onStatusChange={handleTaskStatusChange} onDeleteTask={handleDeleteTask} color="bg-yellow-200" />
                        <TaskSection title="Not Started" tasks={tasks.filter(task => task.status === "Not Started")} onNameChange={handleTaskNameChange} onStatusChange={handleTaskStatusChange} onDeleteTask={handleDeleteTask} color="bg-red-200" />
                    </>
                )}
                {filter !== "all" && (
                    <TaskSection title={filter} tasks={tasks.filter(task => task.status === filter)} onNameChange={handleTaskNameChange} onStatusChange={handleTaskStatusChange} onDeleteTask={handleDeleteTask} color={colorMap[filter]} />
                )}
            </div>
        </div>
    );
};

const TaskSection = ({ title, tasks, onNameChange, onStatusChange, onDeleteTask, color }) => {
    return (
        <div className={`${color} p-4 rounded-md max-w-full overflow-x-auto m-3`}>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <ul className="divide-y divide-slate-900 ">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onNameChange={onNameChange}
                        onStatusChange={onStatusChange}
                        onDeleteTask={onDeleteTask}
                    />
                ))}
            </ul>
        </div>
    );
};

const Task = ({ task, onNameChange, onStatusChange, onDeleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);

    const handleSave = () => {
        if (editedName.trim() !== "") {
            onNameChange(task.id, editedName);
            setIsEditing(false);
        }
    };

    return (
        <li className="py-4">
            <div className="flex justify-between items-center">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-md mr-2 max-w-full"
                        style={{ maxWidth: "100%" }}
                    />
                ) : (
                    <div>
                        <h3 className="text-lg font-semibold">{task.name}</h3>
                    </div>
                )}
                <div>
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={() => onDeleteTask(task.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Delete
                    </button>
                    <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-md"
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>
        </li>
    );
};

export default Body;
