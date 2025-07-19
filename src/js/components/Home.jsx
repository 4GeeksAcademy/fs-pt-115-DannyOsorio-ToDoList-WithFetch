import React from "react";
import { useState, useEffect } from "react";

//create your first component



const Home = () => {

	const [inputValue, setInputValue] = useState('')
	const [todo, setTodo] = useState([])

	const handleDelete = (indexToDelete) => {
		setTodo(todo.filter((_, index) => index !== indexToDelete));
	};

	const createUser = async () => {
		try {
			const newUser = await fetch('https://playground.4geeks.com/todo/users/danny', {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});

			const user = await newUser.json();
			console.log(newUser);
		} catch (error) {
			console.log(error);
		}
	};




	const getUser = async () => {
		try {
			const request = await fetch('https://playground.4geeks.com/todo/users/danny', {
				method: "GET",
				headers: {
					'Accept': 'application/json'
				}
			});

			const response = await request.json();
			console.log(response);

		} catch (error) {
			console.log(error);
		}
	};


	const createTodo = async () => {
		try {
			const postTodo = await fetch('https://playground.4geeks.com/todo/todos/danny', {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					label: todo,
					is_done: false
				})
			});
			const respuesta = await postTodo.json();
			setTodo(prevTodo => [...prevTodo, respuesta]);
		} catch (error) {
			console.log(error);
		}

	};

	useEffect(() => {
		createUser();
		getUser()
		createTodo();
	}, []);




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
						className="list-group-item d-flex justify-content-between align-items-center tarea-item"
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