import { useState } from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { Todo, fetchAlterTodo, fetchDeleteTodo } from '../../redux/todosSlice'
import done from '../../img/done.svg'
import inProgress from '../../img/in_progress.svg'
import bin from '../../img/bin.svg'
import edit from '../../img/edit.svg'


export const TaskItem = (props: Todo) => {

    const [editMode, setMode] = useState(false)
    const [changedText, setChangedText] = useState(props.text)
    const [urgency, setUrgency] = useState(props.urgency)
    const [status, setStatus] = useState(props.isCompleted)
    const [currentId, setCurrentId] = useState('')
    const [visibility, setVisibility] = useState('task-item__edit-block hidden')
    const dispatch = useAppDispatch()

    const onChangeText = (e: any): void => setChangedText(e.target.value)
    const onChangeUrgency = (e: any): void => setUrgency(e.target.value)
    const onChangeStatus = (): void => {
        setStatus(!status)
    }
    
    const editModeOn = (e: any) => {
        setMode(true)
        setCurrentId(e.target.id)
    }

    const editModeOff = (e: any) => {
        setChangedText(e.target.text)
        setUrgency(e.target.urgency)
        setMode(false)
    }

    const showEditBlockDesktop = () => {
        setVisibility('task-item__edit-block visible')
    }

    const showEditBlockMobile = () => {
        setVisibility('task-item__edit-block visible')
    }

    const hideEditBlock = () => {
        setVisibility('task-item__edit-block hidden')
    }

    const deleteTodo = () => {
        dispatch(fetchDeleteTodo(props.id!))
    }

    return (
        <div className="task-item">
            {!editMode ? 
            <div className="task-item__regular-mode" onTouchStart={showEditBlockMobile} 
                                                     onMouseEnter={showEditBlockDesktop}                                                     
                                                     onMouseLeave={hideEditBlock}>
                <div className="task-item__status"><img src={props.isCompleted ? done : inProgress} alt="task status" /></div>
                <div className="task-item__main">
                    <div className="task-item__main-urgency">Urgency: {props.urgency}</div>
                    <div className="task-item__main-text">{props.text}</div>  
                </div>
                <div className={visibility}>
                    <img src={edit} alt="edit" id={props.id} onClick={editModeOn} />
                    <img src={bin} alt="bin" onClick={deleteTodo} />                   
                </div>

            </div>
            :
            <div className="task-item__edit-mode">
                <div className="task-item__status"><img src={status ? done : inProgress} alt="task status" /></div>
                <form className="task-item__edit-form"
                    onSubmit={e => {
                    e.preventDefault()
                    editModeOff(e)
                    dispatch(fetchAlterTodo({
                        text: changedText,
                        isCompleted: status,
                        urgency: +urgency,
                        id: currentId
                    }))
                    }}
                >
                    <label className="task-item__edit-form--checkbox">
                    Is done?
                    <input
                        name="isComplete"
                        type="checkbox"
                        checked={status}
                        onChange={onChangeStatus} />
                    </label>
                    <select defaultValue={props.urgency} onChange={onChangeUrgency}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input className="task-item__edit-form--text" defaultValue={props.text} onChange={onChangeText} />
                    <button type="submit">OK</button>
                </form>
            </div>
            }
        </div>
    )
}


