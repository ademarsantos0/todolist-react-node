import logo from './logo.svg';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
              ></button>
              <p>{todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function handleWithNewButton() {
    console.log("fasfas");
    setInputVisility(!inputVisbility);
  }
  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
  }
  //Lista todas as tarefas
  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
    console.log(response.data);
  }
  //Editar tarefas
  async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  }
  //Deletar tarefas
  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    );
    getTodos();
  }
  //Modificar status das tarefas
  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }
  //Criar nova tarefa
  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }
  ///

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>To Do - Lista de Tarefas</h1>
        </div>
        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="inputName"
        ></input>
        <button
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisbility ? "Confirmar" : "+ Nova Tarefa"}
        </button>
        <Todos todos={todos}></Todos>
        
      </header>
    </div>
  );
}

export default App;