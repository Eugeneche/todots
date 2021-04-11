import * as React from 'react'
import { useState, useEffect } from 'react'
import { TaskItem } from '../TaskItem/TaskItem'
import { CreatingModal } from '../CreatingModal/CreatingModal'
import { Todo } from '../../redux/todosSlice'
import { useAppSelector } from '../../hooks/hooks'
import '../../App.css'
import add from '../../img/add.svg'


export const Board = () => {
  //let a = useAppSelector(state => state.taskList)
  const [mode, setMode] = useState(false)
  const [order, setOrder] = useState('')
  const [tasks, setTasks] = useState(useAppSelector(state => state.taskList))

  let a = useAppSelector(state => state.taskList)

  //let tasks = useAppSelector(state => state.taskList)

/*   const mappedTasks = (todos: Array<Todo>) => {
    console.log(todos)
    todos.map((task: Todo): JSX.Element => {
      return (
        <TaskItem key={task.id} id={task.id} 
        text={task.text} isCompleted={task.isCompleted} urgency={task.urgency}
        created={task.created} updated={task.updated} />
      )}
    )
  }  */

  const mappedTasks = tasks.map((task: Todo) => {
    //console.log('a')
    return (
      <TaskItem key={task.id} id={task.id} 
      text={task.text} isCompleted={task.isCompleted} urgency={task.urgency}
      created={task.created} updated={task.updated} />
    )
  }
    
  )

  const onChangeFilter = (e: any) => {
    
    switch (e.target.value) {
      
      case 'more_important_first':
        setOrder(e.target.value)
        setTasks([...tasks].sort(function(a,b) {
          return b.urgency - a.urgency
        }))
        //console.log(tasks)
        break

      case 'less_important_first':
        setOrder(e.target.value)
        setTasks([...tasks].sort(function(a,b) {
          return a.urgency - b.urgency
        }))
        //console.log(tasks)
        break
    }
    
  }

  useEffect(() => {
    setTasks(a)
    //console.log(tasks)
  }, [a])

    useEffect(() => {
    setTasks(tasks)
    //console.log(tasks)
  }, [order, tasks])

  return (
    <div className="board board__main">
      {mode && <CreatingModal setMode={setMode} />}     
      <header className="board__header">
        <h1 className="board__title">Task manager</h1>
        {/* <button className="board__filter-btn"><img src={filter} alt="filter button"/></button> */}
        <label className="board__filter-select">
          Sort By:&nbsp;
          <select onChange={onChangeFilter}>
            <option value="more_important_first">More important first</option>
            <option value="less_important_first">Less important first</option>
          </select>
        </label>
        <button className="board__add-btn" onClick={() => setMode(true)}><img src={add} alt="add task button"/></button>            
      </header> 
      <div className="board__tasks">       
        {mappedTasks}
      </div>
    </div>
  );
};
