/**
 * INFO 6150 - Modern JS Exercises
 * Exercise A: Dynamic To-Do List (DOM + Event Delegation)
 * Exercise B: Fetch User & Posts (Promise chaining + async/await + try/catch) + DOM rendering
 */

// -------------------------
// Exercise A — To-Do List
// -------------------------
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");

// Add item
addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();

  if (!text) {
    alert("Please enter a to-do item.");
    todoInput.focus();
    return;
  }

  const li = document.createElement("li");
  li.className = "todo-item";

  // store text in a span for clarity
  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  // mark it so event delegation can detect it
  removeBtn.dataset.action = "remove";

  li.append(span, removeBtn);
  todoList.appendChild(li);

  todoInput.value = "";
  todoInput.focus();
});

// Event delegation for remove
todoList.addEventListener("click", (event) => {
  const target = event.target;

  // Only handle clicks on Remove buttons
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.action !== "remove") return;

  const li = target.closest("li");
  if (li) li.remove();
});

// Optional: Enter key to add
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// -------------------------
// Exercise B — Fetch User & Posts
// -------------------------
const userIdInput = document.querySelector("#user-id");
const runPromiseBtn = document.querySelector("#run-promise");
const runAsyncBtn = document.querySelector("#run-async");

const statusEl = document.querySelector("#status");
const userEl = document.querySelector("#user");
const postsEl = document.querySelector("#posts");

// Base URL
const API = "https://jsonplaceholder.typicode.com";

/**
 * Requirement: Create a function getUser(id) that fetches a user
 */
function getUser(id) {
  return fetch(`${API}/users/${id}`).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
    return res.json();
  });
}

/**
 * Requirement: Create a function getPosts(userId) that fetches posts
 */
function getPosts(userId) {
  return fetch(`${API}/users/${userId}/posts`).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    return res.json();
  });
}

// Render to DOM (Requirement: show name/email + post titles)
function renderUserAndPosts(user, posts) {
  userEl.innerHTML = `
    <div><strong>Name:</strong> ${user.name}</div>
    <div><strong>Email:</strong> ${user.email}</div>
  `;

  postsEl.innerHTML = "";
  for (const p of posts) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.textContent = p.title;
    postsEl.appendChild(li);
  }
}

function clearResult() {
  userEl.innerHTML = "";
  postsEl.innerHTML = "";
}

function setStatus(msg) {
  statusEl.textContent = msg;
}

// ---- Promise chaining version (Requirement) ----
function runWithPromiseChaining(userId) {
  clearResult();
  setStatus("Loading with Promise chaining...");

  // Workflow:
  // 1) Fetch user
  // 2) Fetch posts
  // 3) Log results (user name + post titles)
  return getUser(userId)
    .then((user) => {
      console.log("User:", user.name);

      return getPosts(user.id).then((posts) => {
        console.log("Post titles:");
        posts.forEach((p) => console.log("-", p.title));

        renderUserAndPosts(user, posts);
        setStatus("Done (Promise chaining).");
      });
    })
    .catch((err) => {
      console.error("Promise chain error:", err);
      setStatus(`Error: ${err.message}`);
    });
}

// ---- async/await + try/catch version (Requirement) ----
async function runWithAsyncAwait(userId) {
  clearResult();
  setStatus("Loading with async/await...");

  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);

    // Log results (user name + post titles)
    console.log("User:", user.name);
    console.log("Post titles:");
    posts.forEach((p) => console.log("-", p.title));

    renderUserAndPosts(user, posts);
    setStatus("Done (async/await).");
  } catch (err) {
    console.error("Async/await error:", err);
    setStatus(`Error: ${err.message}`);
  }
}

// Wire buttons
runPromiseBtn.addEventListener("click", () => {
  const id = Number(userIdInput.value);
  if (!Number.isInteger(id) || id < 1 || id > 10) {
    alert("User ID must be an integer from 1 to 10.");
    return;
  }
  runWithPromiseChaining(id);
});

runAsyncBtn.addEventListener("click", () => {
  const id = Number(userIdInput.value);
  if (!Number.isInteger(id) || id < 1 || id > 10) {
    alert("User ID must be an integer from 1 to 10.");
    return;
  }
  runWithAsyncAwait(id);
});

// Initial hint
setStatus("Ready. Choose a User ID (1-10) and run Promise chain or Async/Await.");
