import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { selectAuthState } from "./auth/authSelector";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store/store";
import { addTodo, deleteTodo } from "../store/auth/todoSlice";
import uuid4 from "uuid4";

const Home: NextPage = () => {
  const todoState = useSelector((state: AppState) => state.todo.todos);
  const dispatch = useDispatch();

  const [todoItem, setTodoItem] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoItem((prevTodo) => {
      return {
        ...prevTodo,
        [name]: value,
      };
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: uuid4(),
        title: todoItem.title,
        content: todoItem.content,
      })
    );
    setTodoItem({
      title: "",
      content: "",
    });
  };

  return (
    <>
      <Box>
        {/* Form */}
        <form onSubmit={submitHandler}>
          <input name="title" onChange={handleChange} placeholder="title" value={todoItem.title} style={{ border: "1px solid black" }} />

          <input
            name="content"
            placeholder="content"
            onChange={handleChange}
            value={todoItem.content}
            style={{ border: "1px solid black" }}
          />
          <button type="submit">ADD TODO</button>
        </form>

        {/* List Item */}
        <ul>
          {todoState.map((item: any, index) => {
            return (
              <li
                onClick={() => {
                  dispatch(deleteTodo(item.id)); //Delete TODO
                }}
                key={index}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </Box>

      
      {/* const authState = useSelector(selectAuthState);
      <Box w={"full"}>
        <div>{authState ? "Logged in" : "Not Logged in"}</div>
        <button onClick={() => dispatch(setAuthState(authState))}> click </button>
      </Box> */}
    </>
  );
};

export default Home;
