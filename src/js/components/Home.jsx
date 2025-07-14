import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component



const Home = () => {

	const [inputValue, setInputValue] = useState('')
	const [todo, setTodo] = useState([])
	
	return (
		<div className="container text-center">
			<h1>TO DO LIST</h1>
			<ul>
				<li><input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") { setTodo(todo.concat(inputValue))
							setInputValue("")
						 };
						}}
					placeholder="Tarea Pendiente..." /> </li>

				{todo.map((item, index) => (
					<li key={index}>{item}  </li>
				))}

			</ul>
			<div>{todo.length} Tareas Pendientes</div>
		</div>
	);
};

export default Home;