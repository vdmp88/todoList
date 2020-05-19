import todos from "./todos.js";

class TodosUI {
	constructor() {
		this.list = document.querySelector(".js-list");
		this.loader = document.querySelector(".js-loader");
	}

	renderTodo(todo) {
		const cardItem = `
    <li class="list__item-wrapper">
      <div class="card" data-id=${todo.id}>
      	  <div class="card__status ${
						todo.status === "done"
							? "card__status--done"
							: todo.status === "hold"
							? "card__status--hold"
							: "card__status--pending"
					}">
          ${
						todo.status === "done"
							? "Done"
							: todo.status === "hold"
							? "Hold"
							: "Pending"
					}
        </div>
        <div class="card__text">
          <h4 class="card__title">${todo.title}</h4>
          <p class="card__description">${todo.body}</p>
        </div>
        <ul class="card__buttons">
          <li>
			<button class="button button--edit js-editStatus" ${
				todo.status === "done"
					? "disabled"
					: todo.status === "hold"
					? "disabled"
					: ""
			}>
				Edit
			</button>
          </li>
          <li>
            <button class="button button--cancel js-removeStatus"${
							todo.status === "hold" ? "disabled" : ""
						}>
				Delete
			</button>
          </li>
          <li>
			<button class="button button--hold js-holdStatus" ${
				todo.status === "done" ? "disabled" : ""
			}>
				${todo.status === "hold" ? "Unhold" : "Hold"}
			</button>
          </li>
          <li>
			<button class="button button--done js-doneStatus" ${
				todo.status === "done"
					? "disabled"
					: todo.status === "hold"
					? "disabled"
					: ""
			}>
				Done
			</button>
          </li>
        </ul>
      </div>
  </li>
  `;

		const cardItemEdit = `
    <li class="card" data-id=${todo.id}>
      <form class="js-edit-form">
        <div class="card__status ${
					todo.status === "done"
						? "card__status--done"
						: todo.status === "hold"
						? "card__status--hold"
						: "card__status--pending"
				}">
          ${
						todo.status === "done"
							? "Done"
							: todo.status === "hold"
							? "Hold"
							: "Pending"
					}
        </div>
        <div class="card__edit-fields">
          <input type="text" name="editTitle" value="${todo.title}">
          <input type="text" name="editBody" value="${todo.body}">
        </div>
        <ul class="card__buttons card__edit-actions">
          <li><button class="button button--done js-saveEdit">Save</button></li>
          <li><button class="button button--cancel js-cancelEdit">Cancel</button></li>
        </ul>
      </form>
    </li>`;

		return todo.status === "edit" ? cardItemEdit : cardItem;
	}

	renderTodos(todosList) {
		this.clearList();

		preloader.show(this.loader);
		
		setTimeout(() => {
			preloader.hide(this.loader);

			if (todosList.length <= 0) {
				this.list.insertAdjacentHTML(
					"afterbegin",
					"<li>Empty list. Please create new task!</li>",
				);
			}

			todosList.forEach((todo) => {
				this.list.insertAdjacentHTML("afterbegin", this.renderTodo(todo));
			});
		}, 500);
	}

	clearList() {
		this.list.innerHTML = "";
	}
}

class LoaderUI {
	constructor() {}

	show(loader) {
		loader.style.display = "flex";
	}

	hide(loader) {
		loader.style.display = "none";
	}
}

const todosUI = new TodosUI();
const preloader = new LoaderUI();

export { todosUI };
