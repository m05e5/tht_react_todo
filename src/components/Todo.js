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
    })
  }

  const check_filled = () => {
    const todoInput = document.getElementById('todo_input')
    const add_todo_btn = document.getElementById('add_todo')
    if(todoInput.value !== '') {
      add_todo_btn.classList.add('bg_shadow')
    } else {
      add_todo_btn.classList.remove('bg_shadow')
    }
  }
  

  const submitTodo = () => {
    const todoInput = document.getElementById('todo_input')
    if(todoInput.value !== '') {
        axios.post(baseURL, {
          name: todoInput.value,
          completed: false
        }).then (() => {
          fetchTodos();
          todoInput.value = '';
          document.getElementById('add_todo').classList.remove('bg_shadow')
        })
    }
  }

  const deleteTodo = (id) => {
    axios.delete(`${baseURL}/${id}`)
    .then(() => {
      fetchTodos()
    })
  } 

  const clearTodo = () => {
    todos.forEach((element)=>{
      if(element.completed === true) {
        deleteTodo(element.id);
      }
    })
    fetchTodos()
  }


  const checkTodo = (todoId) => {
    const todoCheck = document.getElementById(todoId)
    if(todoCheck.checked === true) {
      axios.patch(`${baseURL}/${todoId}`, {
        completed: true,
      })
      .then(() => {
        fetchTodos()
      });
    } else {
        axios.patch(`${baseURL}/${todoId}`, {
          completed: false,
        })
        .then(() => {
          fetchTodos()
        });
    }

  }
  useEffect(() => {
    fetchTodos()
  }, []);

  const displayTodo = () => {
    if(todos.length !== 0) {
      return (<>
        {
          todos.map((element) => (
            <div key={element.id} className="todo">
              <label className="todo_check" htmlFor={element.id}>
                <div>
                  <input className="todo_check" defaultChecked={element.completed === true ? true : false} onClick={() => checkTodo(element.id)} type="checkbox" id={element.id}/>
                  <span className="checkmark" />
                  {/* {element.completed === true ? checked : null} */}
                  <b 
                    className={`todo_name ${element.completed ? 'completed' : null}`}
                  >
                    {element.name} 
                  </b>
                </div>
                <button className="deleteTodo" onClick={() => deleteTodo(element.id)}>
                  X
                </button>
              </label>
            </div>
          ))
        }
      </>)
    }
  }
  

  return (
    <div className="todo_div">
      <div className="todo_header">
          <input type="text" placeholder='Task name:' onChange={check_filled} id="todo_input" className=' box_in' />
          <button type="button" className='box_in' id='add_todo' onClick={submitTodo}><b>ADD TODO</b></button>
      </div>
      <div className="todo_body box_in">
        <div className="clear_done_div">
          <div className='count'>
            <b>
              {todos.filter(todo => todo.completed ===true).length}
              {' '}
              /
              {' '}
              {todos.length}
            </b>
          </div>
          <button className="clear_done" onClick={clearTodo}>
           X CLEAR DONE TODOS
          </button>
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