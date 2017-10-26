// 聲明式 (Declarative)
function foo6 (f, ...args) {
  return f(...args);
}


// 晦澀難解 (Obscure)
function foo5 (f) {
  switch (arguments.length) {
    case 1: return f();
    case 2: return f(arguments[1]);
    case 3: return f(arguments[1], arguments[2]);
    default: {
      var args = [];
      for (var i = 1; i < arguments.length; ++i) {
        args[i - 1] = arguments[i];
      }
      return f.apply(undefined, args);
    }
  }
}

