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
  setPerson(state, person) {
    if (state.user == null) return;
    state.user.person = person;
  },
  setResident(state, resident) {
    if (state.user == null) return;
    state.user.resident = resident;
  },
  setPosts(state, posts) {
    state.posts = posts;
  },
  setPost(state, post) {
    if (state.posts == null) state.posts = [];
    const posts = state.posts.filter(item => item.id == post.id);
    if (posts.length == 0) state.posts.push(post);
  },
  setChannelsReady(state, status) {
    state.channels.ready = status;
  }
};