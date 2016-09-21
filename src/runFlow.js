function runFlow(rules, obj, log) {
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

    log('%c #%d %s - %s. %s', color, current, rule.title, resultTxt, endTxt);

    current = next;
  }
}
