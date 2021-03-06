import axios from "axios";

//Just the init state
const state = {
  todos: [],
};

//Kinda like useSelector
const getters = {
  allTodos: (state) => state.todos,
};

//These are the dispatched actions
const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data);
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    commit("newTodo", response.data);
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      id,
    });
    commit("removeTodo", id);
  },

  async filterTodos({ commit }, e) {
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },

  async updateTodo({ commit }, todo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
    commit("setTodo", response.data);
  },
};

//Kinda like reducers
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  setTodo: (state, upTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === upTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, upTodo);
    }
  },
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
