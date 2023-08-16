import { useEffect, useReducer, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import {AiFillEdit ,AiFillMinusCircle} from "react-icons/ai"





function reducer(state, action) {
  switch (action.type) {

    case 'update_todo': {
       return [...state, { 
            titulo: action.payload,
            id: uuidv4(), 
            completed: false 
       }]
    }
    case 'eliminate_todo': {
      return state.filter((todo)=> todo.id != action.payload.id) 
    }

    case 'Toggle_todo': {
      return state.map((todo)=> {
        return todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo
      })
    }

    
    case 'edit_todo' : {
      return state.map((todo)=> 
      {
        return todo.id === action.payload.id ? {...todo, titulo : action.payload.titulo } : todo
      }
      )
    }
  
    default:
      return;
  }
}

function App() {

  const [todo, dispatch] = useReducer(reducer, [])
  const [task, settask] = useState('')
  const [isEditing, setisEditing] = useState(null)  

  
  
  const handlesubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      dispatch({type: 'edit_todo', payload: { id: isEditing.id, titulo: task}})
      setisEditing(null)
    } else {
      handleAdd()
    }
    settask('')
  }

  const handleAdd = () => {
    dispatch({ type: 'update_todo', payload: task});
    settask('')
  }

  const editTodo = (item) => {
    settask(item.titulo)
    setisEditing(item)
  }

  const eliminateTodo = (key) => {
    dispatch({type: 'eliminate_todo', payload: {id: key}})
  };

  const toggle = (id) => {
    dispatch({type: 'Toggle_todo', payload: {id: id}})
  } 

  const pendingTodos = todo.filter((todos)=>  todos.completed == false)  

  return (
    <>
 


    
    <div className='container'>
   <form onSubmit={handlesubmit}>
    <div className='Addtask'> 
    <h3>Title of the task:</h3>
    <input required onChange={(e)=> settask(e.target.value)} value={task}  className='AddtaskItem' placeholder=' Add a task!'></input>
    <button type="submit" className="btn btn-primary btnadd">{isEditing? 'Save': 'Add'}</button>
    <span className="Addtask">Number of tasks: <strong className="Addtask">{todo.length}</strong></span>
    <span className="Addtask">Pending tasks: <strong className="Addtask">{pendingTodos.length === 0? 'No pending!' : pendingTodos.length}</strong></span>
    </div>
    </form>


    
    
    <div className='tasks'>
    {(
        todo.map((todo) => (
        <div key={todo.id} className="card">
          <div className="card-body">
          <input className="form-check-input completed" onClick={() => toggle(todo.id)}  type="checkbox"  id="flexCheckDefault"></input>
            <h5 className="card-title">{todo.titulo}</h5>
            <button onClick={() => eliminateTodo(todo.id)} className="btn btn-danger btntask">
              Delete <AiFillMinusCircle/>
            </button>
            <button type="button" onClick={() => editTodo(todo)} className="btn btn-warning btntask">Edit <AiFillEdit/></button>
          </div>
        </div>) 
     ))}
    </div>

   

    </div>
    </>
  )
        }

export default App
