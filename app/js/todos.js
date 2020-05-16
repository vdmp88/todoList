import { ui } from "./renderUI.js";

class Todos {
	constructor() {
		this.flag = false;
		this.data = [
			{
				id: this.generateId(),
				title:
					"sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
				body:
					"quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
				status: "pending",
			},
			{
				id: this.generateId(),
				title: "qui est esse",
				body:
					"est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
				status: "done",
			},
			{
				id: this.generateId(),
				title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
				body:
					"et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
				status: "hold",
			},
			{
				id: this.generateId(),
				title: "qui est esse",
				body:
					"est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
				status: "pending",
			},
		];
	}

	generateId() {
		let id = "";
		let words = "123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

		for (let i = 0; i < 15; i++) {
			let position = Math.floor(Math.random() * words.length);
			id += words[position];
		}

		return id;
	}

	setStatus(todoId, todoStatus) {
		this.data.forEach((todo) => {
			if (todo.id === todoId) {
				todo.status = todoStatus;
			}
		});
		ui.renderTodos(this.data);
	}

	holdAll() {
		this.data.forEach((todo) => {
			if (todo.status !== "done") {
				this.flag ? (todo.status = "pending") : (todo.status = "hold");
			}
		});
		this.flag = !this.flag;
		ui.renderTodos(this.data);
	}

	doneAll() {
		this.data.forEach((todo) => {
			todo.status !== "hold" ? (todo.status = "done") : "";
		});
		ui.renderTodos(this.data);
	}

	deleteAll() {
		this.data = [];
		ui.renderTodos(this.data);
	}

	hasStatus(todoId, status) {
		let flag;

		this.data.forEach((todo) => {
			if (todo.id === todoId) {
				flag = todo.status === status ? true : false;
			}
		});

		return flag;
	}

	addNewItem(todo) {
		if (!todo.title || !todo.body) return;

		const newItem = {
			id: this.generateId(),
			title: todo.title,
			body: todo.body,
			status: "pending",
		};
		this.data.push(newItem);

		ui.renderTodos(this.data);
	}

	editTodo(id, newTodo) {
		this.data.forEach((todo) => {
			if (todo.id === id) {
				Object.assign(todo, newTodo);
			}
		});
		ui.renderTodos(this.data);
	}

	removeTodo(id) {
		this.data.forEach((todo, index) => {
			todo.id === id ? this.data.splice(index, 1) : "";
		});

		ui.renderTodos(this.data);
	}
}

const todos = new Todos();

export default todos;
