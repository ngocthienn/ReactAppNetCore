import Store from 'beedle';
import { get, post } from './requests';

let _saveUrl;
let _onPost;
let _onLoad;

const store = new Store({
  actions: {
    setData(context, data, saveData) {
      context.commit('setData', data);
      if (saveData) this.save(data, context);
    },

    load(context, { loadUrl, saveUrl, data, saveAlways }) {
      _saveUrl = saveUrl;
      const saveA = saveAlways || saveAlways === undefined;
      context.commit('setSaveAlways', saveA);
      if (_onLoad) {
        _onLoad().then(x => {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach(y => x.push(y));
          }
          this.setData(context, x);
        });
      } else if (loadUrl) {
        get(loadUrl).then(x => {
          x = x.map(itemX => {
            return {
              ...itemX.taskData,
              ...itemX,
              taskData: undefined
            };
          });
          if (data && data.length > 0 && x.length === 0) {
            data.forEach(y => x.push(y));
          }
          this.setData(context, x);
        });
      } else {
        this.setData(context, data);
      }
    },

    create(context, element) {
      const { data, saveAlways } = context.state;
      data.push(element);
      this.setData(context, data, saveAlways);
    },

    delete(context, element) {
      const { data, saveAlways } = context.state;
      data.splice(data.indexOf(element), 1);
      this.setData(context, data, saveAlways);
    },

    deleteLastItem(context) {
      const { lastItem } = context.state;
      if (lastItem) {
        this.delete(context, lastItem);
        context.commit('setLastItem', null);
      }
    },

    resetLastItem(context) {
      const { lastItem } = context.state;
      if (lastItem) {
        context.commit('setLastItem', null);
        // console.log('resetLastItem');
      }
    },

    post(context) {
      const { data } = context.state;
      this.setData(context, data, true);
    },

    updateOrder(context, elements) {
      const { saveAlways } = context.state;
      const newData = elements.filter(x => x && !x.parentId);
      elements.filter(x => x && x.parentId).forEach(x => newData.push(x));
      this.setData(context, newData, saveAlways);
    },

    insertItem(context, item) {
      // console.log('insertItem', item);
      context.commit('setLastItem', item.isContainer ? null : item);
    },

    save(data, context) {
      if (_onPost) {
        _onPost({ task_data: data });
      } else if (_saveUrl) {
        let newData = data.map(item => {
          return {
              templateId: item.templateId,
              fieldNo: item.fieldNo,
              taskData: {
                  ...item,
                  template: null
              }
          };
        });
        let res = post(_saveUrl, newData );
        if(res !== undefined && res !== '') {
          context.commit('setTemplateId', res);
        }
      }
    },
  },

  mutations: {
    setData(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.data = payload;
      return state;
    },
    setAnswer(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.answer = payload;
      return state;
    },
    setSaveAlways(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.saveAlways = payload;
      return state;
    },
    setLastItem(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.lastItem = payload;
      // console.log('setLastItem', payload);
      return state;
    },
    setTemplateId(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.templateId = payload;
      return state;
    },
  },

  initialState: {
    data: [],
    saveAlways: true,
    lastItem: null,
    answer : {},
    templateId : '',
  },
});

store.setExternalHandler = (onLoad, onPost) => {
  _onLoad = onLoad;
  _onPost = onPost;
};

export default store;
