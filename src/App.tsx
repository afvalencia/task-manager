import React, { useState, useRef } from 'react';

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, {name, done: false}]
    setTasks(newTasks)
  };

  const toggleDoneTask = (index: number): void => {
    const newTask: ITask[] = [...tasks];
    newTask[index].done = !newTask[index].done;
    setTasks(newTask); 
  };

  const deleteTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);    
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} className="form-control" ref={taskInput} autoFocus/>
                <button className="btn btn-info btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {
            tasks.map((t: ITask, i: number) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{
                  textDecoration: t.done ? 'line-through' : '',
                  color: t.done ? 'green' : 'red'
                  }}>
                    {t.name}
                </h2>
                <div>
                  <button className="btn btn-secondary" onClick={() => toggleDoneTask(i)}>
                    {t.done ? '✗' : '✓'}
                  </button>
                  <button className="btn btn-danger ml-2" onClick={() => deleteTask(i)}>🗑</button>
                </div>                  
              </div>
            ))
          }
        </div>
      </div>
    </div>    
  );
}

export default App;
