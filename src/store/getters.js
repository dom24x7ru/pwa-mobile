export default {
  getSections: state => () => {
    if (state.flats == null) return [];
    let sections = {};
    state.flats.forEach(flat => {
      if (sections[flat.section] == null) sections[flat.section] = { section: flat.section, min: Number.MAX_VALUE, max: 0, floors: 0 };
      if (sections[flat.section].min > flat.number) sections[flat.section].min = flat.number;
      if (sections[flat.section].max < flat.number) sections[flat.section].max = flat.number;
      if (sections[flat.section].floors < flat.floor) sections[flat.section].floors = flat.floor;
    });
    return sections;
  },
  getFloors: state => (section) => {
    if (state.flats == null) return {};
    let flats = state.flats.filter(flat => flat.section == section);
    let floors = {};
    flats.forEach(flat => {
      if (floors[flat.floor] == null) floors[flat.floor] = { floor: flat.floor, min: Number.MAX_VALUE, max: 0 };
      if (floors[flat.floor].min > flat.number) floors[flat.floor].min = flat.number;
      if (floors[flat.floor].max < flat.number) floors[flat.floor].max = flat.number;
    });
    return floors;
  },
  getFlats: state => ({ section, floor }) => {
    if (state.flats == null) return {};
    return state.flats.filter(flat => flat.section == section && flat.floor == floor);
  },
  getFlat: state => (flatNumber) => {
    if (state.flats == null) return null;
    for (let flat of state.flats) {
      if (flat.number == flatNumber) return flat;
    }
    return null;
  },
  getFlatsStat: state => () => {
    let stat = { flats: 0, busy: 0, persons: 0, squares: 0, busySquares: 0, sections: {} };
    if (state.flats == null) return stat;
    
    for (let flat of state.flats) {
      // общая статистика
      stat.flats++;
      if (flat.residents.length != 0) {
        stat.busy++;
        stat.busySquares += flat.square;
      }
      stat.persons += flat.residents.length;
      stat.squares += flat.square;
      
      // статистика по секциям
      if (stat.sections[flat.section] == null) stat.sections[flat.section] = { flats: 0, busy: 0, persons: 0, squares: 0, busySquares: 0, floors: {} };
      stat.sections[flat.section].flats++;
      if (flat.residents.length != 0) {
        stat.sections[flat.section].busy++;
        stat.sections[flat.section].busySquares += flat.square;
      }
      stat.sections[flat.section].persons += flat.residents.length;
      stat.sections[flat.section].squares += flat.square;

      // статистика по этажам
      if (stat.sections[flat.section].floors[flat.floor] == null) stat.sections[flat.section].floors[flat.floor] = { flats: 0, busy: 0, persons: 0, squares: 0, busySquares: 0 };
      stat.sections[flat.section].floors[flat.floor].flats++;
      if (flat.residents.length != 0) {
        stat.sections[flat.section].floors[flat.floor].busy++;
        stat.sections[flat.section].floors[flat.floor].busySquares += flat.square;
      }
      stat.sections[flat.section].floors[flat.floor].persons += flat.residents.length;
      stat.sections[flat.section].floors[flat.floor].squares += flat.square;
    }

    return stat;
  },
  getInstructionsCount: state => () => {
    if (state.instructions == null) return 0;
    return state.instructions.length;
  },
  getDocumentsCount: state => () => {
    if (state.documents == null) return 0;
    return state.documents.length;
  },
  getFAQCount: state => (categoryId) => {
    if (state.faq == null) return 0;
    if (categoryId == null) return state.faq.length;
    return state.faq.filter(item => item.category.id == categoryId).length;
  },
  getFAQCategories: state => () => {
    if (state.faq == null) return [];
    let categories = {};
    for (let answer of state.faq) {
      categories[answer.category.id] = {
        id: answer.category.id,
        name: answer.category.name,
        description: answer.category.description
      };
    }
    return categories;
  },
  getFAQList: state => (categoryId) => {
    if (state.faq == null) return [];
    if (categoryId == null) return state.faq;
    return state.faq.filter(item => item.category.id == categoryId);
  },
  getRecommendation: state => (recommendationId) => {
    if (state.recommendations == null) return null;
    for (let recommendation of state.recommendations) {
      if (recommendation.id == recommendationId) return recommendation;
    }
    return null;
  },
  getRecommendationsCount: state => (categoryId) => {
    if (state.recommendations == null) return 0;
    if (categoryId == null) return state.recommendations.length;
    return state.recommendations.filter(item => item.category.id == categoryId).length;
  },
  getRecommendationCategories: state => () => {
    if (state.recommendations == null) return [];
    let categories = {};
    for (let recommendation of state.recommendations) {
      categories[recommendation.category.id] = {
        id: recommendation.category.id,
        name: recommendation.category.name,
        img: recommendation.category.img
      };
    }
    return categories;
  },
  getRecommendationList: state => (categoryId) => {
    if (state.recommendations == null) return [];
    if (categoryId == null) return state.recommendations;
    return state.recommendations.filter(item => item.category.id == categoryId);
  },
  getVotesCount: state => () => {
    if (state.votes == null) return 0;
    return state.votes.length;
  },
  getVote: state => (voteId) => {
    if (state.votes == null) return null;
    for (let i = 0; i < state.votes.length; i++) {
      if (state.votes[i].id == voteId) return state.votes[i];
    }
    return null;
  },
  getRndVote: state => () => {
    if (state.votes == null) return null;
    const votes = state.votes.filter(vote => {
      // уже закрытые нам не интересны
      if (vote.closed) return false;
      
      // также отфильтровываем те, на которые мы уже ответили
      if (vote.answers == null) return true; // еще никто не ответил
      const person = state.user.person;
      if (person == null) return false; // пока нет данных по нам
      return vote.answers.filter(answer => answer.person.id == person.id).length == 0;
    });
    if (votes.length == 0) return null;
    return votes[0]; // TODO: взять случайный из списка
  },
  getIMChannel: state => (channelId) => {
    if (state.imChannels == null) return null;
    for (let i = 0; i < state.imChannels.length; i++) {
      if (state.imChannels[i].id == channelId) return state.imChannels[i];
    }
    return null;
  },
};