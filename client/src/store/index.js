
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  state: {
    tabs: [],
    tabValue: '',
    tabIndex: 0,
  },
  mutations: {
    addTab(state, payload) {
      let newTabName = ++state.tabIndex + '',
          tabs = [ ...state.tabs ];

      var tab = {
        title: payload.meta.title,
        name: newTabName,
        content: payload.fullPath,
        path: payload.path,
      }
      if (payload.path === '/login') return;
      let isExist = tabs.filter(v => v.path === tab.path).length > 0;
      if (isExist) return ;

      tabs.push(tab);
      state.tabs = tabs;
      state.tabValue = newTabName;
    },
    removeTab(state, targetName) {
      let tabs = [ ...state.tabs ];
      let activeName = state.tabValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      state.tabValue = activeName;
      tabs.length > 1 && (state.tabs = tabs.filter(tab => tab.name !== targetName));
    },
    clickTab(state, payload) {
      let { tabIndex, tabs } = state;
      const item = tabs.filter(v => v.name === tabIndex);
      if (item.length > 0) {
        const url = item[0].content;
        payload(url);
      }
    }
  }
})

export default store
