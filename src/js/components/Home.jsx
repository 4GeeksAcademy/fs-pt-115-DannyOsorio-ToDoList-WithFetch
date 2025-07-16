import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component



const Home = () => {

	const [inputValue, setInputValue] = useState('')
	const [todo, setTodo] = useState([])

	const handleDelete = (indexToDelete) => {
		setTodo(todo.filter((_, index) => index !== indexToDelete));
	};

	return (
		<div className="container text-center">
			<h1 className="m-5">TO DO LIST</h1>
			<ul>
				<li><input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setTodo(todo.concat(inputValue))
							setInputValue("")
						};
					}}
					placeholder="Tarea Pendiente..." /> </li>
					

				{todo.map((item, index) => (
					<li
						key={index}
						className="list-group-item d-flex justify-content-beetween align-items-center tarea-item"
					>
						<span>{item}</span>
						<button
							className="btn btn-danger btn-sm delete-btn"
							onClick={() => handleDelete(index)}
						>
							✕
						</button>
					</li>
				))}

			</ul>
			<div>{todo.length} Tareas Pendientes</div>
		</div>
	);
};

export default Home;