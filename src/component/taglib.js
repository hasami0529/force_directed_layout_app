import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTaglib } from "../store/slice/taglib";

export function Taglib(){
  const states = useSelector(selectTaglib); // <-- 拿取資料
  const dispatch = useDispatch();

  return (
    <div>
        {states.tags.map((i) => (
        <div class='form-check' type="checkbox" value="" >      
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
          <label class="form-check-label" for="flexCheckDefault">
            {i.content}
          </label>
        </div>
        ))}
    </div>
  )
}
