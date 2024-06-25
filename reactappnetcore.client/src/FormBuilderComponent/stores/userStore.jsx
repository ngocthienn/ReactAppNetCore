import Store from "beedle";
import { get, post } from "./requests";
import Constant from "./constants";

const apiUrl = import.meta.env.VITE_API_URL;

const userStore = new Store({
    actions: {
        getUsers(context) {
            get(`${apiUrl}/Users`).then((res) => {
                context.commit("setData", res.data);
            });
        },
        setStatusAction(context, data) {
            context.commit("setStatusAction", data);
        },
        postUsers(context, data) {
            post(`${apiUrl}/Users`, data)
                .then((res) => {
                    this.setStatusAction(context, Constant.ADD_USER_SUCCESS);
                    this.getUsers(context);
                })
                .catch((err) => {
                    console.log(err);
                    setStatusAction(context, Constant.ADD_USER_FAIL);
                });
        },
    },

    mutations: {
        setData(state, payload) {
            state.data = payload;
            return state;
        },
        setStatusAction(state, payload) {
            state.statusAction = payload;
            return state;
        },
    },

    initialState: {
        data: [],
        statusAction: "",
    },
});

export default userStore;
