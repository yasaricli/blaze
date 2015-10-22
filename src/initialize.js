(function(root) {

  // Base Libraries
  root.$ = Package.jquery.$;
  root._ = Package.underscore._;

  // Core Libraries
  root.Blaze = Package.blaze.Blaze;
  root.HTML = Package.htmljs.HTML;
  root.Template = Template = Package.templating.Template;
  root.Spacebars = Package.spacebars.Spacebars;
  root.SpacebarsCompiler = Package['spacebars-compiler'].SpacebarsCompiler;

  // Observables
  root.ReactiveVar = Package["reactive-var"].ReactiveVar;
  root.ReactiveDict = Package["reactive-dict"].ReactiveDict;
  root.ReactiveArray = Package["reactive-array"].ReactiveArray;

  Blaze.compileTemplates = function() {
    $("script[type='text/spacebars']").each(function(index, script) {
      var name = script.getAttribute('name');
      var renderFuncCode = SpacebarsCompiler.compile(script.innerHTML, {
        isTemplate: true
      });

      eval("Template.__define__(" + JSON.stringify(name) + ", " + renderFuncCode + ");");
    });
  }
})(this);
