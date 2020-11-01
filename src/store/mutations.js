export default {
  setClient(state, client) {
    state.client = client;
  },
  setTitle(state, title) {
    state.pageName = title;
  },
  setFlats(state, flats) {
    state.flats = flats;
  },
  setFlat(state, flat) {
    if (state.flats == null) state.flats = [];
    const flats = state.flats.filter(item => item.number == flat.number);
    if (flats.length == 0) state.flats.push(flat);
  },
  setUser(state, user) {
    state.user = user;
  },
};