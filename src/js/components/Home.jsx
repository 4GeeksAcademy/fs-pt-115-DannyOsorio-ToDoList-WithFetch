import React, { useState, useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [todo, setTodo] = useState([]);

	
	const getUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/danny");
			const data = await response.json();
			if (Array.isArray(data.todos)) {
				setTodo(data.todos);
			}
		} catch (error) {
			console.error("Error al obtener todos:", error);
		}
	};

	
	const createUser = async () => {
		try {
			await fetch("https://playground.4geeks.com/todo/users/danny", {
				method: "POST",
				headers: {
					accept: "application/json",
					"content-type": "application/json"
				},
				body: JSON.stringify({})
			});
		} catch (error) {
			console.error("Error al crear usuario:", error);
		}
	};

	
	const createTodo = async (tarea) => {
		if (!tarea || tarea.trim() === "") return;

		try {
			await fetch("https://playground.4geeks.com/todo/todos/danny", {
				method: "POST",
				headers: {
					accept: "application/json",
					"content-type": "application/json"
				},
				body: JSON.stringify({
					label: tarea,
					is_done: false
				})
			});

			
			getUser();
		} catch (error) {
			console.error("Error creando tarea:", error);
		}
	};

	
	const handleDelete = async (id) => {
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});

			setTodo(todo.filter(item => item.id !== id));
		} catch (error) {
			console.error("Error al eliminar tarea:", error);
		}
	};

	
	useEffect(() => {
		createUser().then(() => getUser());
	}, []);

	return (
		<div className="container text-center">
			<h1 className="m-5">TO DO LIST</h1>

			<ul>
				<li>
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && inputValue.trim() !== "") {
								createTodo(inputValue);
								setInputValue("");
							}
						}}
						placeholder="Tarea Pendiente..."
					/>
				</li>

				{todo.map((item) => (
					<li
						key={item.id}
						className="list-group-item d-flex justify-content-between align-items-center tarea-item"
					>
						<span>{item.label}</span>
						<button
							className="btn btn-danger btn-sm delete-btn"
							onClick={() => handleDelete(item.id)}
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
