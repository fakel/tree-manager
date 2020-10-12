export function saveUserState({ commit }, payload) {
  commit('setUserState', payload);
}
export function saveTreeID({ commit }, payload) {
  commit('setTreeID', payload);
}
