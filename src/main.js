document.addEventListener('DOMContentLoaded', function () {
  var rules = transformRules(window.RULES);
  var obj = window.OBJ;

  runFlow(rules, obj, console.log);
});
