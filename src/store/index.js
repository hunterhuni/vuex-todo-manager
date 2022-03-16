import { createStore } from "vuex";
import todos from "./modules/todos";

//Create store
const store = createStore({
  modules: {
    todos,
  },
});

export default store;
