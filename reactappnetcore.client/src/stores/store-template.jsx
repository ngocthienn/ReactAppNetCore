// store.js
import Store from 'beedle';

const apiUrl = import.meta.env.VITE_API_URL;
const url = `${apiUrl}/Template/GetTemplates`;

const initialState = {
  data: [],
};

const actions = {
  async fetchData(context) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      context.commit('setData', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};

const mutations = {
  setData(state, payload) {
    state.data = payload;
    return state;
  },
};

const storeTemplate = new Store({
  actions,
  mutations,
  initialState,
  plugins: [],
  strict: true,
});

export default storeTemplate;
