import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodo } from "../store/slice/todo";
import { toDoActions } from "../store/slice/todo";

export function Taglib(){
  const states = useSelector(selectTodo); // <-- 拿取資料
  const dispatch = useDispatch();

  function handleTodo() {
    dispatch(
      toDoActions.addTodo('hi')
    )
  }

  function handleCheck() {
    dispatch(
      toDoActions.addTag()
    )
  }

  return (
    <div>
        {states.todolist.map((i) => (
        <div class='form-check' type="checkbox" value="" >      
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
          <label class="form-check-label" for="flexCheckDefault">
            {i.id}.{i.name}
          </label>
        </div>
        ))}

        <div class='form-check' type="checkbox" value="" >      
          <input onClick={handleCheck} class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
          <label class="form-check-label" for="flexCheckDefault">
            {states.tag}
          </label>
        </div>

    </div>
  )
}
