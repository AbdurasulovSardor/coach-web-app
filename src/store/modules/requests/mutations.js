export default {
  newRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequest(state, payload) {
    state.requests = payload;
  },
};
