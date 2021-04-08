import { createSlice, createAsyncThunk/* , current */ } from '@reduxjs/toolkit'
import { todosAPI } from '../api/api'


export interface Todo {
  id?: string
  created?: string
  updated?: string
  text: string
  isCompleted: boolean
  urgency: number
}

interface FetchTodosError {
  status: string
  message: string;
}

let initialState = [] as Array<Todo> 

export const fetchNewTodo = createAsyncThunk<
  Todo, 
  Todo, 
    { 
      rejectValue: FetchTodosError 
    }
  >('todos/fetchNewTodo', async (todoUserParams, { rejectWithValue }) => {
    try {
      const { text, isCompleted, urgency }: Todo = todoUserParams
      const response = await todosAPI.createTodo(text, isCompleted, urgency)
      return response.data.todo     
    } catch (err) {
/*       let error: FetchTodosError = err // cast the error for access
      if (error.status === "ERROR") {
        throw err */
      }


/*     if (response.status !== 201) {
      alert("Thunk: Něco se pokazilo, ale můžete to zkusit znovu." )
      return thunkAPI.rejectWithValue({ 
        message: "Thunk: Něco se pokazilo, ale můžete to zkusit znovu."       
      })  
    }  */
/*     .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
      alert("Něco se pokazilo, ale můžete to zkusit znovu.")
    }) */
    
/*     const dispatch = useAppDispatch()
    dispatch(addTask(response.data.todo)) */
    //console.log(response)
    //return response
  }
)

export const fetchAlterTodo = createAsyncThunk<
  Todo, 
  Todo, 
    { 
      rejectValue: FetchTodosError 
    }
  >('todos/fetchAlterTodo', async (todoUserParams, { rejectWithValue }) => {
    try {
      const { text, isCompleted, urgency, id }: Todo = todoUserParams
      const response = await todosAPI.alterTodo(text, isCompleted, urgency, id!)
      return response.data.todo     
    } catch (err) {

      }
  }
)

export const fetchDeleteTodo = createAsyncThunk<
  any, 
  string, 
    { 
      rejectValue: FetchTodosError 
    }
  >('todos/fetchDeleteTodo', async (userId, { rejectWithValue }) => {
    try {
      const id = userId
      const response = await todosAPI.deleteTodo(id)
      return response.data.todos    
    } catch (err) {
      
      }
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewTodo.fulfilled, (state, {payload}) => {
      state.push(payload)     
    })
    builder.addCase(fetchAlterTodo.fulfilled, (state, {payload}) => {
      const changedTodo = state.find(todo => todo.id === payload.id)
        if (changedTodo) {
          const { text, urgency, isCompleted } = payload
          Object.assign(changedTodo, { text, urgency, isCompleted })
        }
        return state
    })
    builder.addCase(fetchDeleteTodo.fulfilled, (state, {payload}) => {
      return state = Object.values(payload)
    })
  } 
})

export default todosSlice.reducer

export {}