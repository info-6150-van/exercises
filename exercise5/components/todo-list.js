class TodoList extends HTMLElement {
  constructor() {
    super();
    this.items = [];

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .box {
          border: 1px solid #ccc;
          padding: 12px;
          width: 220px;
          font-family: sans-serif;
        }
        ul {
          padding-left: 18px;
        }
        input {
          width: 120px;
        }
      </style>

      <div class="box">
        <input id="input" placeholder="New item">
        <button id="add">Add</button>
        <ul id="list"></ul>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot
      .getElementById("add")
      .addEventListener("click", () => {
        const input = this.shadowRoot.getElementById("input");
        const text = input.value.trim();
        if (!text) return;

        this.items.push(text);
        input.value = "";
        this.render();
        this.emitChange();
      });
  }

  render() {
    const ul = this.shadowRoot.getElementById("list");
    ul.innerHTML = "";

    this.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  emitChange() {
    this.dispatchEvent(
      new CustomEvent("listChanged", {
        detail: { items: this.items },
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.define("todo-list", TodoList);
