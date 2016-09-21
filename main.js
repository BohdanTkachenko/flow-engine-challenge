var START_RULE = 1;

function transformRules(oldRules) {
  var rules = {};
  for (var i = 0; i < window.RULES.length; i++) {
    var rule = window.RULES[i];

    if (!rule.id) {
      throw new Error('Rule id is not defined at index = ' + i);
    }

    if (rules[rule.id]) {
      throw new Error('Rule with id ' + rule.id + ' is already defined');
    }

    rules[rule.id] = {
      title: rule.title,
      body: rule.body,
      passed: rule.passed,
      failed: rule.failed,
    };
  }

  if (!rules[START_RULE]) {
    throw new Error('Start rule ' + START_RULE + ' was not found');
  }

  for (var id in rules) {
    if (!rules.hasOwnProperty(id)) {
      continue;
    }

    var rule = rules[id];

    if (rule.passed !== null && !rules[rule.passed]) {
      throw new Error('Wrong rule dependency detected (passed) for rule ' + rule.id);
    }

    if (rule.failed !== null && !rules[rule.failed]) {
      throw new Error('Wrong rule dependency detected (failed) for rule ' + rule.id);
    }
  }

  return rules;
}

function runFlow(rules, obj) {
  var visited = {};

  var current = START_RULE;
  while (current) {
    if (visited[current]) {
      throw new Error('Circular rule dependency detected. Rule #' + current + ' was already visited before');
    }

    visited[current] = true;

    var rule = rules[current];
    var result = rule.body(obj);
    var next = result ? rule.passed : rule.failed;

    var resultTxt = result ? 'passed' : 'failed';
    var endTxt = next === null ? 'End.' : '';
    var color = 'color: ' + (result ? '#3a3' : '#a33');

    console.log('%c #%d %s - %s. %s', color, current, rule.title, resultTxt, endTxt);
    // also, colored output can be achieved just with console.error / console.info
    // but console.log coloring is more pretty

    current = next;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var rules = transformRules(window.RULES);
  var obj = window.OBJ;

  runFlow(rules, obj);
});
