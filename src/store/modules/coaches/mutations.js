export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestap(state) {
    state.lastFetch = new Date().getTime();
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStap = new Date().getTime();
    return (currentTimeStap - lastFetch) / 1000 > 60;
  },
};
