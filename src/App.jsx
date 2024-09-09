import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever  } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if(todosString){
      let t = JSON.parse(localStorage.getItem("todos"));
      setTodos(t);
    }
  }, [])
  

  const SaveToLocalStorege = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const HandleEdit = (e,id) => {
    let mytodo = todos.filter(i=>i.id === id)
    setTodo(mytodo[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })

    setTodos(newTodos)

    SaveToLocalStorege()

  }

  const ToggleFinished = () => {
    setShowFinished(!showFinished)

  }

  const HandleDelete = (e,id) => {
    let a = confirm("Are you really want to Delete this ToDo ?....")
    if(a == true){
      let newTodos = todos.filter(item=>{
        return item.id!==id;
      })
  
      setTodos(newTodos)
      SaveToLocalStorege()
    }
  }

  const HandleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    SaveToLocalStorege()
  }

  const HandleChange = (e) => {
    setTodo(e.target.value)
  }

  const HandleCheckbox = (e)=>{
    let id = e.target.name;

    let ind = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[ind].isCompleted = !newTodos[ind].isCompleted;

    setTodos(newTodos)
    SaveToLocalStorege()
  }

  return (
    <>
      <Navbar />
      <div className="container bg-violet-200 mx-3 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-xl sm:text-2xl text-center text-[#b35757b3]'>iTask -- Manage Your ToDos in One Place...</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h1 className="text-lg sm:text-xl font-bold"> Add a Todo...</h1>
          <div className="flex gap-5">
            <input onChange={HandleChange} value={todo} className='w-full rounded-full px-5 py-1' type="text" />
            <button onClick={HandleSave} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 transition-all text-white p-4 py-2 rounded-full font-bold disabled:border-violet-600 cursor-pointer'>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={ToggleFinished} className='cursor-pointer' checked={showFinished}/><span className='ml-3 font-semibold'>Show Finished Todo..</span>
        <div className='h-[2px] bg-black opacity-15 w-1/2 m-auto my-3'></div>
        <h1 className='text-lg sm:text-xl font-bold'>Your Todos --</h1>
        {todos.length === 0 && <div className='my-5 font-semibold w-1/2 text-center'>No ToDos to Display...</div>} 

        <div className="todos">
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between lg:w-1/2 items-center my-4">

              <div className='flex gap-4 items-center justify-center'>
                <input className='cursor-pointer' onChange={HandleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>{HandleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 transition-all text-white  p-3 py-1 rounded-md mx-2 font-bold'><FaEdit /></button>

                <button onClick={(e)=>{HandleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 transition-all text-white  p-3 py-1 rounded-md mx-2 font-bold'><MdDeleteForever  /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
