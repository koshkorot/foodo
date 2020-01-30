const REGIONS = require('../enum/regions');
const RESTAURANT_TYPE = require('../enum/types');

const restaurants = [
  {
    id: 1,
    name: 'JoGrillFood',
    region: REGIONS.TEHRAN.WEST,
    type: RESTAURANT_TYPE.FAST_FOOD,
    menu: [
      {id: '1-00001-001', price: 30000, name: 'پیتزا آمیگو استیک'},
      {id: '1-00001-002', price: 37000, name: 'پیتزا مخصوص'},
      {id: '1-00001-003', price: 41000, name: 'پیتزا پپرونی'},
      {id: '1-00001-004', price: 44000, name: 'پیتزا سیر و استیک'},
    ]
  },
  {
    id: 2,
    name: 'Shila',
    region: REGIONS.TEHRAN.NORTH,
    type: RESTAURANT_TYPE.FAST_FOOD,
  },
  {
    id: 3,
    name: 'Avani',
    region: REGIONS.TEHRAN.CENTER,
    type: RESTAURANT_TYPE.FAST_FOOD,
  },
  {
    id: 4,
    name: 'Doner-Garden',
    region: REGIONS.TEHRAN.WEST,
    type: RESTAURANT_TYPE.FAST_FOOD,
  },
  {
    id: 5,
    name: 'Mazzeti',
    region: REGIONS.TEHRAN.WEST,
    type: RESTAURANT_TYPE.FAST_FOOD,
  },
  {
    id: 6,
    name: 'Shandiz',
    region: REGIONS.TEHRAN.NORTH,
    type: RESTAURANT_TYPE.TRADITIONAL,
  },
  {
    id: 7,
    name: 'Shandiz-Bam-land',
    region: REGIONS.TEHRAN.WEST,
    type: RESTAURANT_TYPE.TRADITIONAL,
  },
  {
    id: 8,
    name: 'Sam-Cafe',
    region: REGIONS.TEHRAN.WEST,
    type: RESTAURANT_TYPE.CAFE,
  },
  {
    id: 9,
    name: 'Graph-Cafe',
    region: REGIONS.TEHRAN.CENTER,
    type: RESTAURANT_TYPE.CAFE,
  },
  {
    id: 10,
    name: 'Reza Loghme',
    region: REGIONS.TEHRAN.WEST,
    type: RESTAURANT_TYPE.TAKE_AWAY,
  },
];

module.exports = {
  async find(query) {
    let result = restaurants;
    Object.keys(query).forEach(condition =>
      result = result.filter(r =>
        (r[condition] === query[condition]) ||
        (r[condition].toLowerCase().includes(query[condition].toLowerCase()))
      )
    );
    return result;
  },

  async getById(restaurantId) {
    return restaurants.find(r => r.id === restaurantId);
  }
};
