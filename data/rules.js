// need to use JS file instead of JSON in order to be able to use this without web server

window.RULES = [
  {
    id: 1,
    title: 'truthy',
    body: function (obj) { return !!obj; },
    passed: 2,
    failed: 6
  },
  {
    id: 2,
    title: 'has color',
    body: function (obj) { return !!obj.color; },
    passed: 3,
    failed: 4
  },
  {
    id: 3,
    title: 'is red',
    body: function (obj) { return obj.color === 'red'; },
    passed: 4,
    failed: 4
  },
  {
    id: 4,
    title: 'has width',
    body: function (obj) { return !!obj.width; },
    passed: 5,
    failed: 6
  },
  {
    id: 5,
    title: 'is big',
    body: function (obj) { return obj.width > 100; },
    passed: 6,
    failed: 6
  },
  {
    id: 6,
    title: 'is object',
    body: function (obj) { return typeof obj === 'object'; },
    passed: null,
    failed: null
  }
];
