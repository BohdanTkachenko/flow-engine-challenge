var START_RULE = 1;

function transformRules(oldRules) {
  var rules = {};
  for (var i = 0; i < oldRules.length; i++) {
    var rule = oldRules[i];

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
      throw new Error('Wrong rule dependency detected (passed) for rule ' + id);
    }

    if (rule.failed !== null && !rules[rule.failed]) {
      throw new Error('Wrong rule dependency detected (failed) for rule ' + id);
    }
  }

  return rules;
}
