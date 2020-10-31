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
};