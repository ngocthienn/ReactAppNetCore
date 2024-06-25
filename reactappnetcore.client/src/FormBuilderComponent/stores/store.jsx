import Store from 'beedle';
import { get, post } from './requests';

const apiUrl = import.meta.env.VITE_API_URL;

let _saveUrl;
let _onPost;
let _onLoad;

const store = new Store({
  actions: {
    setData(context, data, saveData) {
      context.commit('setData', data);
      context.commit('setSaveControlStatus', false);
      if (saveData) this.save(data);
    },

    // load(context, { loadUrl, saveUrl, data, saveAlways }) {
    //   _saveUrl = saveUrl;
    //   const saveA = saveAlways || saveAlways === undefined;
    //   context.commit('setSaveAlways', saveA);
    //   if (_onLoad) {
    //     _onLoad().then(x => {
    //       if (data && data.length > 0 && x.length === 0) {
    //         data.forEach(y => x.push(y));
    //       }
    //       this.setData(context, x);
    //     });
    //   } else if (loadUrl) {
    //     // get(loadUrl).then(x => {
    //     //   if (data && data.length > 0 && x.length === 0) {
    //     //     data.forEach(y => x.push(y));
    //     //   }
    //     //   this.setData(context, x);
    //     // });
    //   } else {
    //     this.setData(context, data);
    //   }
    // },

    // click thì sẽ tạo item ở toolbar
    create(context, element) {
      const { data, saveAlways } = context.state;
      data.push(element);
      this.setData(context, data, saveAlways);
    },

    // thực hiện xóa item
    delete(context, element) {
      const { data, saveAlways } = context.state;
      data.splice(data.indexOf(element), 1);
      this.setData(context, data, saveAlways);
    },

    // phần này liên quan đến dustbin - drag, drop
    deleteLastItem(context) {
      const { lastItem } = context.state;
      if (lastItem) {
        this.delete(context, lastItem);
        context.commit('setLastItem', null);
      }
    },

    // phần này liên quan đến dustbin - drag, drop
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

    save(data) {
      if (_onPost) {
        _onPost({ task_data: data });
      } else if (_saveUrl) {
        // post(_saveUrl, { task_data: data });
      }
    },

    setTemplateId(context, templateId) {
      context.commit('setTemplateId', templateId);
    },

    setNavTemplateId(context, navTemplateId) {
      context.commit('setNavTemplateId', navTemplateId);
    },

    getControlWithTemplateId(context, templateId) {
      templateId = parseInt(templateId);
      if (isNaN(templateId)) {
        context.commit('setData', []);
      } else {
        get(`${apiUrl}/Controls/GetControlsWithTemplateId/${templateId}`).then(res => {
          res.data = res.data.map(itemX => {
            return {
              ...itemX.taskData,
              ...itemX,
              taskData: undefined
            };
          });
          context.commit('setData', res.data);
          context.commit('setSaveControlStatus', true);
        })
      }
    },

    getAnswerDefault(context, templateId) {
      templateId = parseInt(templateId);
      if (isNaN(templateId)) {
        context.commit('setAnswer', []);
      } else {
        get(`${apiUrl}/Answers/GetAnswerDefault/${templateId}`).then(res => {
          context.commit('setAnswer', res.data.answerData);
        })
      }
    },

    saveControlsTemplate(context, { templateId, taskData }) {
      let newData = taskData.map(item => {
        return {
          templateId: item.templateId,
          fieldNo: item.fieldNo,
          taskData: {
            ...item,
            template: null
          }
        };
      });
      post(`${apiUrl}/Templates/AddOrUpdateTemplate/${templateId}`, newData).then(res => {
        context.commit('setTemplateId', res.data.templateId);
        context.commit('setSaveControlStatus', true);
        context.commit('setData', taskData);
        if(parseInt(res.data.templateId) !== templateId) {
          context.commit('setNavTemplateId', res.data.templateId);
        }
        alert("Save success");
      }).catch(err => {
        console.log(err);
        alert("Save failed")
      })
    },

    saveAnswersTemplate(context, { templateId, answerData }) {
      post(`${apiUrl}/Answers/UpdateAnswerDefaultWithTemplateId/${templateId}`, {
        templateId: templateId,
        answerData: answerData
      }).then(res => {
          context.commit('setAnswer', answerData);
          alert("Save success");
      }).catch(err => {
        console.log(err);
        alert("Save failed")
      })
    }
  },

  mutations: {
    setData(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.data = payload;
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
    setAnswer(state, payload) {
      state.answer = payload;
      return state;
    },
    setSaveControlStatus(state, payload) {
      state.saveControlStatus = payload;
      return state;
    },
    setNavTemplateId(state, payload) {
      state.navTemplateId = payload;
      return state;
    },
  },

  initialState: {
    data: [],
    saveAlways: true,
    lastItem: null,
    answer: [],
    templateId: '',
    navTemplateId : null,
    errorMessage: '',
    saveControlStatus: true,
  },
});

store.setExternalHandler = (onLoad, onPost) => {
  _onLoad = onLoad;
  _onPost = onPost;
};

export default store;
