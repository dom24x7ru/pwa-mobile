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
  setInstruction(state, instruction) {
    if (state.instructions == null) state.instructions = [];
    const instructions = state.instructions.filter(item => item.id == instruction.id);
    if (instructions.length == 0) state.instructions.push(instruction);
  },
  setInvite(state, invite) {
    if (state.invites == null) state.invites = [];
    const invites = state.invites.filter(item => item.id == invite.id);
    if (invites.length == 0) state.invites.push(invite);
  },
  setInviteTop(state, invite) {
    if (state.invites == null) state.invites = [];
    const invites = state.invites.filter(item => item.id == invite.id);
    if (invites.length == 0) state.invites.unshift(invite);
  },
  setDocument(state, document) {
    if (state.documents == null) state.documents = [];
    const documents = state.documents.filter(item => item.id == document.id);
    if (documents.length == 0) state.documents.push(document);
  },
  setChannelsReady(state, { channel, status }) {
    state.ready[channel] = status;
  }
};