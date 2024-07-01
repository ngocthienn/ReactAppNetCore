import Store from 'beedle';
import { get, post } from './requests';

const apiUrl = import.meta.env.VITE_API_URL;

let _saveUrl;
let _onPost;
let _onLoad;

function updateIdAndOptionsControl(data) {
  if (!Array.isArray(data)) {
    return;
  }
  data.forEach((item, indexControl) => {
    const firstPart = item.field_name.substring(0, item.field_name.lastIndexOf('_'));
    item.field_name = `${firstPart}_${indexControl + 1}`;
    item.id = indexControl + 1;
    if (Array.isArray(item.options)) {
      item.options.forEach((option, indexOption) => {
        option.key = `${item.field_name}_item_${(indexOption + 1)}`;
      });
    }
  });
}

const store = new Store({
  actions: {
    setData(context, data, saveData) {
      context.commit('setData', data);
      context.commit('setSaveControlStatus', false);
      if (saveData) this.save(data);
    },

    // click thì sẽ tạo item ở toolbar
    create(context, element) {
      const { data, saveAlways } = context.state;
      data.push(element);
      updateIdAndOptionsControl(data);
      this.setData(context, data, saveAlways);
    },

    // thực hiện xóa item
    delete(context, element) {
      const { data, saveAlways } = context.state;
      data.splice(data.indexOf(element), 1);
      updateIdAndOptionsControl(data);
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
      updateIdAndOptionsControl(newData);
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
        context.commit('setSaveControlStatus', false);
        const templateCurrent = {
          Id : null,
          name : ''
        };
        context.commit('setTemplateCurrent', templateCurrent);
      } else {
        get(`${apiUrl}/Controls/GetControlsWithTemplateId/${templateId}`).then(res => {
          res.data = res.data.map(itemX => {
            return {
              ...itemX.taskData,
              ...itemX,
              taskData: undefined
            };
          });
          get(`${apiUrl}/Templates/${templateId}`).then(resTemplate => {
            context.commit('setData', res.data);
            context.commit('setSaveControlStatus', true);
            context.commit('setTemplateCurrent', resTemplate.data);
          });
          
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

    saveControlsTemplate(context, { templateId, taskData, templateName }) {
      let controlUpdates = taskData.map(item => {
        return {
          templateId: item.templateId,
          fieldNo: item.fieldNo,
          taskData: {
            ...item,
            template: null
          }
        };
      });

      let templateUpdate = {
        id : null,
        name : templateName
      };

      let newData = {
        controlUpdates,
        templateUpdate
      };

      post(`${apiUrl}/Templates/AddOrUpdateTemplate/${templateId}`, newData).then(res => {
        context.commit('setTemplateId', res.data.templateId);
        context.commit('setSaveControlStatus', true);
        context.commit('setData', taskData);
        templateUpdate.id = templateId;
        context.commit('setTemplateCurrent', templateUpdate);
        if(parseInt(res.data.templateId) !== templateId) {
          context.commit('setNavTemplateId', res.data.templateId);
        }
        alert("Save success");
      }).catch(err => {
        console.log(err);
        alert("Save failed")
      })
    },

    saveAnswersTemplate(context, { templateId, answerData, username }) {
      post(`${apiUrl}/Answers/UpdateAnswerDefaultWithTemplateId/${templateId}`, {
        templateId: templateId,
        answerData: answerData,
        username : username,
      }).then(res => {
          context.commit('setAnswer', answerData);
          alert("Save success");
      }).catch(err => {
        console.log(err);
        alert("Save failed")
      })
    },

    setEditElementMode(context, editElementMode) {
      context.commit('setEditElementMode', editElementMode);
    },

    setTemplateCurrent(context, templateCurrent) {
      context.commit('setTemplateCurrent', templateCurrent);
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
    setEditElementMode(state, payload) {
      state.editElementMode = payload;
      return state;
    },
    setTemplateCurrent(state, payload) {
      state.templateCurrent = payload;
      return state;
    },
  },

  initialState: {
    data: [],
    saveAlways: true,
    lastItem: null,
    answer: [],
    templateId: '',
    templateCurrent : {
      id : null,
      name : ''
    },
    navTemplateId : null,
    errorMessage: '',
    saveControlStatus: true,
    editElementMode : false,
  },
});

store.setExternalHandler = (onLoad, onPost) => {
  _onLoad = onLoad;
  _onPost = onPost;
};

export default store;
