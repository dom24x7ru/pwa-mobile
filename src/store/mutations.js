export default {
  setTitle(state, title) {
    state.pageName = title;
  },
  setFlats(state, flats) {
    state.flats = flats;
  },
  setFlat(state, flat) {
    if (state.flats == null) state.flats = [];
    state.flats.push(flat);
  },
  setUser(state, user) {
    state.user = user;
  },
};