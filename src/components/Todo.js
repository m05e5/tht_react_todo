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

  const submitTodo = () => {
    const todoInput = document.getElementById('todo_input')
    if(todoInput.value !== '') {
      console.log(todoInput.value);
        axios.post(baseURL, {
          name: todoInput.value,
          completed: false
        }).then((response) => {
          console.log(response);
        }).then (() => {
          fetchTodos();
          todoInput.value = '';
        })
    } else {
      console.log('baka');
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
    console.log(todoCheck.checked)
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
      console.log('yes')
      return (<>
        {
          todos.map((element) => (
            <div key={element.id} className="todo">
              <label className="todo_check" htmlFor={element.id}>
                <div>
                  <input className="todo_check" onClick={() => checkTodo(element.id)} type="checkbox" id={element.id}/>
                  <span className="checkmark" />
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
    } else {
      console.log(todos.length)
    }
  }
  

  return (
    <div className="todo_div">
      <div className="todo_header">
          <input type="text" placeholder='Task name:' id="todo_input" className=' box_in' />
          <button type="button" className='box_in' onClick={submitTodo}><b>ADD TODO</b></button>
      </div>
      <div className="todo_body box_in">
        <div className="clear_done_div">
          <div className='count'>
            <b>
              1
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