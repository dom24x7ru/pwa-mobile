export default {
  getSections: state => () => {
    let list = [];
    state.flats.forEach(flat => list.push(flat.section));
    return [...new Set(list)];
  },
  getFloorsCount: state => section => {
    let flats = state.flats.filter(flat => flat.section == section);
    return Math.max(...flats.map(flat => flat.floor));
  },
  getFlats: state => ({ section, floor }) => {
    let flats = state.flats.filter(flat => flat.section == section);
    let floors = {};
    flats.forEach(flat => {
      if (floor != null && floor != flat.floor) return;
      if (floors[flat.floor] == null) floors[flat.floor] = { number: flat.floor, flats: [] };
      floors[flat.floor].flats.push(flat);
    });
    return floors;
  },
};