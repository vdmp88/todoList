import todos from "./todos.js";
import { ui } from "./renderUI.js";

const tabLinks = document.querySelectorAll(".tab__links");
const tabContent = document.querySelectorAll(".tab__content");
const list = document.querySelector(".js-list");
const addForm = document.querySelector(".js-add-item");
const titleInput = addForm["title"];
const bodyInput = addForm["body"];
const dropdownButton = document.querySelector(".dropdown__content");

function showTabContent(e) {
	tabContent.forEach((element) => {
		if (e.target.dataset.id === element.id) {
			element.classList.toggle("active");
		} else {
			element.classList.remove("active");
		}
	});
}

tabLinks.forEach((btns) => {
	btns.addEventListener("click", showTabContent);
});

addForm.addEventListener("submit", (e) => {
	e.preventDefault();

	todos.addNewItem({
		title: titleInput.value,
		body: bodyInput.value,
	});

	addForm.reset();
});

list.addEventListener("click", (e) => {
	const currentTarget = e.target;
	let id = currentTarget.closest(".card").dataset.id;
	if (currentTarget.classList.contains("js-editStatus")) {
		todos.setStatus(id, "edit");
	} else if (currentTarget.classList.contains("js-removeStatus")) {
		todos.removeTodo(id);
	} else if (currentTarget.classList.contains("js-doneStatus")) {
		todos.setStatus(id, "done");
	} else if (currentTarget.classList.contains("js-holdStatus")) {
		todos.hasStatus(id, "hold")
			? todos.setStatus(id, "pending")
			: todos.setStatus(id, "hold");
	}
});

list.addEventListener("submit", (e) => {
	e.preventDefault();

	const form = e.target;
	const id = form.parentNode.dataset.id;
	const title = form["editTitle"];
	const body = form["editBody"];
	const newTodo = {
		id: id,
		title: title.value,
		body: body.value,
		status: "pending",
	};

	if (form.classList.contains("js-edit-form")) {
		todos.editTodo(id, newTodo);
	}
});

dropdownButton.addEventListener("click", (e) => {
	const currentTarget = e.target;
	if (currentTarget.classList.contains("js-holdAll")) {
		todos.holdAll();
	} else if (currentTarget.classList.contains("js-doneAll")) {
		todos.doneAll();
	} else if (currentTarget.classList.contains("js-cancelAll")) {
		todos.deleteAll();
	}
});

ui.renderTodos(todos.data);
