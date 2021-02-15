export default {
  setAppCurrentVertion(state, version) {
    state.appCurrentVersion = version;
  },
  setClient(state, client) {
    state.client = client;
  },
  setTitle(state, title) {
    state.pageName = title;
  },
  setFlats(state, flats) {
    state.flats = flats;
    state.ready.flats = true;
  },
  setHouse(state, house) {
    state.house = house;
    state.ready.house = true;
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
    state.ready.posts = true;
  },
  setPost(state, post) {
    if (state.posts == null) state.posts = [];
    const posts = state.posts.filter(item => item.id == post.id);
    if (posts.length == 0) state.posts.unshift(post);
  },
  setPinnedPost(state, post) {
    if (state.pinnedPosts == null) state.pinnedPosts = [];
    const posts = state.pinnedPosts.filter(item => item.id == post.id);
    if (posts.length == 0) state.pinnedPosts.unshift(post);
  },
  setInstruction(state, instruction) {
    if (state.instructions == null) state.instructions = [];
    const instructions = state.instructions.filter(item => item.id == instruction.id);
    if (instructions.length == 0) state.instructions.push(instruction);
  },
  setInvites(state, invites) {
    state.invites = invites;
    state.ready.invites = true;
  },
  setInvite(state, invite) {
    if (state.invites == null) state.invites = [];
    const invites = state.invites.filter(item => item.id == invite.id);
    if (invites.length == 0) state.invites.unshift(invite);
  },
  setDocument(state, document) {
    if (state.documents == null) state.documents = [];
    const documents = state.documents.filter(item => item.id == document.id);
    if (documents.length == 0) state.documents.push(document);
  },
  setFAQ(state, answer) {
    if (state.faq == null) state.faq = [];
    const faq = state.faq.filter(item => item.id == answer.id);
    if (faq.length == 0) state.faq.push(answer);
  },
  setRecommendation(state, recommendation) {
    if (state.recommendations == null) state.recommendations = [];
    const recommendations = state.recommendations.filter(item => item.id == recommendation.id);
    if (recommendations.length == 0) state.recommendations.push(recommendation);
  },
  setVote(state, vote) {
    if (state.votes == null) state.votes = [];
    for (let i = 0; i < state.votes.length; i++) {
      if (state.votes[i].id == vote.id) {
        state.votes.splice(i, 1, vote);
        state.changed.votes++;
        return;
      }
    }
    state.votes.unshift(vote);
  },
  setIMChannel(state, channel) {
    if (state.imChannels == null) state.imChannels = [];
    for (let i = 0; i < state.imChannels.length; i++) {
      if (state.imChannels[i].id == channel.id) {
        state.imChannels.splice(i, 1, channel);
        state.changed.imChannels++;
        return;
      }
    }
    state.imChannels.unshift(channel);
  },
  setIMChannelMute(state, mute) {
    state.imChannelMute = mute;
  },
  setChannelsReady(state, { channel, status }) {
    state.ready[channel] = status;
  }
};