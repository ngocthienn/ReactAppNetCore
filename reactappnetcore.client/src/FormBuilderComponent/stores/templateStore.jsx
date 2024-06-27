import Store from 'beedle';
import { get } from './requests';

const apiUrl = import.meta.env.VITE_API_URL;

const templateStore = new Store({
    actions: {
        getAllTemplate(context) {
            get(`${apiUrl}/Templates`).then(res => {
                context.commit('setData', res.data);
            })        
        },
        searchAllTemplate(context, keyword) {
            get(`${apiUrl}/Templates/Search?keyword=${keyword}`).then(res => {
                context.commit('setData', res.data);
            })        
        }
    },

    mutations: {
        setData(state, payload) {
            state.data = payload;
            return state;
        }
    },

    initialState: {
        data : [],
    }
});

export default templateStore;