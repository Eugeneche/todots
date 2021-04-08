import { useState } from 'react'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchNewTodo } from '../../redux/todosSlice'

export const CreatingModal = (props: any) => {

    const [todoText, setTodoText] = useState('')
    const [urgency, setUrgency] = useState(5)
    const dispatch = useAppDispatch()
  
    const onChangeText = (e: any): void => setTodoText(e.target.value)
    const onChangeUrgency = (e: any): void => setUrgency(e.target.value)

    const changeMode = () => {
      props.setMode(false)
    }
  
    return (
      <div className="modal">
        <form className="modal__form"
          onSubmit={e => {
            e.preventDefault()
            if (!todoText.trim()) {
              return
            }
            dispatch(fetchNewTodo({
              text: todoText,
              isCompleted: false,
              urgency: +urgency
            }))
            setTodoText('')
            changeMode()
          }}
        >
          <label>
            New task:
            <textarea value={todoText} onChange={onChangeText} autoFocus />
          </label>
          <label>
            Urgency:
            <select value={urgency} onChange={onChangeUrgency}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option defaultValue="5">5</option>
            </select>
          </label>
          <div className="modal__buttons">
            <button onClick={changeMode}>Cancel</button>
            <button type="submit">Add Todo</button>           
          </div>
        </form>
      </div>
    )
}