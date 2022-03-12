import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Todo = () => {
  const [todos, getTodos] = useState([]);
  const baseURL = 'http://localhost:3000/todo'

  const fetchTodos = () => {
    axios.get(baseURL)
    .then((response) => {
      const data = response.data
      getTodos(data)
    }).then(()=>{
      console.log(todos);
    })
  } 

  const deleteTodo = (id) => {
    axios.delete(`${baseURL}/${id}`)
    .then(() => {
      fetchTodos()
    })
  } 

  // fetchTodos(() => {
  // getTodos();
  //   console.log(todos)
  // }, [])

  const displayTodo = () => {
    if(todos.length !== 0) {
      console.log('yes')
      return (<>
        {
          todos.map((element) => (
            <div className="todo">
              <label className="todo_check" htmlFor={element.id}>
                <div>
                  <input type="checkbox" id={element.id}/>
                  <span className="checkmark" />
                  <b className="todo_name"> {element.name} </b>
                </div>
                <div className="deleteTodo" onClick={() => deleteTodo(element.id)}>
                 <b> X</b>
                </div>
              </label>
            </div>
          ))
        }
      </>)
    } else {
      console.log(todos.length)
    }
  }
  

  return (
    <div className="todo_div">
      <div className="todo_header">
          <input type="text" placeholder='Task name:' className='box_in' />
          <button type="button" className='box_in' onClick={fetchTodos}><b>ADD TODO</b></button>
      </div>
      <div className="todo_body box_in">
        <div>

        </div>
        <div className='todoList'>
          {displayTodo()}
        </div>
      </div>
      {/* <div className="elevation">hello</div>  */}
    </div>
  )
}

export default Todo