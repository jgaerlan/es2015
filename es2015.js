// Examples from https://github.com/lukehoban/es6features/blob/master/README.md

'use strict';

const math = require('./math');
const assert = require('assert');

describe('Arrows', () => {
  it('should increment each element of the array', () => {
    const increment = [1, 2, 3].map(v => v + 1);
    assert.deepEqual(increment, [2, 3, 4]);
  });
  it('should use an arrow function with a statement body', () => {
    const increment = [1, 2, 3, 4, 5].filter((v) => {
      const i = v + 0;
      return i % 2 === 0;
    });
    assert.deepEqual(increment, [2, 4]);
  });
  it('should show example of lexical this', () => {
    const Person = {
      name: 'Justin',
      friends: [{
        name: 'John',
      }, {
        name: 'Joe',
      }],
      printFriends() {
        const results = [];
        this.friends.forEach(friend =>
          results.push(`${this.name} knows ${friend.name}`)
        );
        return results;
      },
    };
    assert(Person.printFriends(), ['Justin knows John', 'Justin knows Joe']);
  });
});

describe('Classes', () => {
  it('should create a simple class', () => {
    class Todo {
      constructor(title) {
        this.title = title;
        this.completed = false;
      }
      toggle() {
        this.completed = !this.completed;
      }
    }
    const todo = new Todo('buy milk');
    assert.equal(todo.title, 'buy milk');
  });
  it('should show example with classical inheritance and getter', () => {
    class Todo {
      constructor(title) {
        this.title = title;
        this.completed = false;
      }
      toggle() {
        this.completed = !this.completed;
      }
    }
    class DueTodo extends Todo {
      constructor(due) {
        super();
        this.due = due;
      }
      get dueDate() {
        return this.due;
      }
    }
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const dueTodo = new DueTodo(date);
    assert.equal(dueTodo.dueDate, date);
  });
});

describe('Enhanced Object Literals', () => {
  it('should set prototype at construction', () => {
    const Animal = {
      speak() {
        return 'speak';
      },
    };
    const Dog = {
      __proto__: Animal,
    };
    assert.equal(Dog.__proto__, Animal);
  });
  it('should set shorthand handler', () => {
    const speak = () => 'speak';
    const Animal = {
      speak,
    };
    assert.equal(Animal.speak(), 'speak');
  });
  it('should compute dynamic property names', () => {
    const Data = {
      [`prop_${(() => 3)()}`]: 6,
    };
    assert.equal(Data.prop_3, 6);
  });
});

describe('Template Strings', () => {
  it('should craete a basic literal string', () => {
    const str = `In JS '\n' is a line-feed.`;
    assert.equal(str, 'In JS \'\n\' is a line-feed.');
  });
  it('should create a multi-line string', () => {
    const multi = `In JS this is
                  not legal`;
    assert.equal(multi, 'In JS this is\n                  not legal');
  });
  it('should use string interpolation', () => {
    const name = 'Justin';
    const hello = `Hello ${name}`;
    assert.equal(hello, 'Hello Justin');
  });
});

describe('Destructuring', () => {
  it('should list match', () => {
    const [a, b] = [1, 2];
    assert.equal(a, 1);
    assert.equal(b, 2);
  });
  it('should object match', () => {
    const o = { p: 42, q: true };
    const { p, q } = o;
    assert.equal(p, 42);
    assert.equal(q, true);
  });
  it('can be used in parameter position', () => {
    function h({ name: x }) {
      return x;
    }
    assert.equal(h({ name: 5 }), 5);
  });
  it('will fail soft', () => {
    let [a] = [];
    assert.equal(a, undefined);
    [a = 1] = [];
    assert.equal(a, 1);
  });
});

describe('Default + Rest + Spread', () => {
  it('should default parameter value', () => {
    function h(x, y = 2) {
      return x + y;
    }
    assert.equal(h(1), 3);
  });
  it('should replace needs for multiple args', () => {
    function f(x, ...y) {
      return x + y.length;
    }
    assert(f(1, 2, 3, 4, 5, 6), 6);
  });
  it('should pass each element of array as arg', () => {
    function f(x, y, z) {
      return x + y + z;
    }
    assert.equal(f(...[1, 2, 3]), 6);
  });
});

describe('Iterators + For..Of', () => {
  it('should iterate over collections', () => {
    const data = [3, 4, 7];
    data.foo = 'hello';
    const x = [];
    for (const i of data) {
      x.push(i);
    }
    assert.deepEqual(x, [3, 4, 7]);
  });
});

describe('Generators', () => {
  it('should simplify iterator-authoring', () => {
    const iter = {};
    iter[Symbol.iterator] = function* h() {
      yield 1;
      yield 2;
      yield 3;
    };
    assert.deepEqual([...iter], [1, 2, 3]);
  });
});

describe('Unicode', () => {
  it('should show example of Unicode', () => {
    assert.equal('𠮷'.match(/./u)[0].length, 2);
  });
});

describe('Node Modules', () => {
  it('import math.js', () => {
    assert.equal(math.sum(2, 2), 4);
  });
});

describe('Map + Set + WeakMap + WeakSet', () => {
  it('should show example of Set', () => {
    const s = new Set();
    s.add(1);
    s.add(2);
    s.add(1);
    assert.equal(s.size, 2);
  });
  it('should show example of Map', () => {
    const m = new Map();
    m.set('hello', 42);
    assert.equal(m.get('hello'), 42);
  });
  it('should show example of WeakMap', () => {
    const wm = new WeakMap();
    const s = new Set();
    wm.set(s, { extra: 42 });
    assert.equal(wm.size, undefined);
  });
  it('should show example of WeakSet', () => {
    const ws = new WeakSet();
    ws.add({ data: 1 });
    assert.deepEqual(ws, {});
  });
});

describe('Proxies', () => {
  it('should proxy a normal object', () => {
    const target = {};
    const handler = {
      get(receiver, name) {
        return `Hello, ${name}`;
      },
    };
    const p = new Proxy(target, handler);
    assert.equal(p.world, 'Hello, world');
  });
  it('should proxy a function object', () => {
    const target = () => 'I am the target';
    const handler = {
      apply() {
        return 'I am the proxy';
      },
    };
    const p = new Proxy(target, handler);
    assert.equal(p(), 'I am the proxy');
  });
});

describe('Symbols', () => {
  it('should use symbol as object key', () => {
    const obj = {};
    const sym = Symbol('foo');
    obj.foo = 'hello';
    obj[sym] = 'bar';
    assert.equal(obj[sym], 'bar');
    assert.deepEqual(Object.keys(obj), ['foo']);
    assert.deepEqual(Object.getOwnPropertyNames(obj), ['foo']);
    assert.equal(Object.getOwnPropertySymbols(obj)[0], sym);
  });
});

describe('Subclassable Built-in', () => {
  it('should show example to subclass Array', () => {
    class MyArray extends Array {
    }
    const arr = new MyArray();
    arr[1] = 12;
    assert.equal(arr.length, 2);
  });
});

describe('Math + Number + String + Array + Object APIs', () => {
  it('should show sample of Number APIs', () => {
    assert.equal(Number.isInteger(Infinity), false);
    assert.equal(Number.isNaN('NaN'), false);
  });
  it('should show example of Math APIs', () => {
    assert.equal(Math.acosh(3), 1.762747174039086);
    assert.equal(Math.hypot(3, 4), 5);
  });
  it('should show example of String APIs', () => {
    assert.equal('abcde'.includes('cd'), true);
    assert.equal('abc'.repeat(2), 'abcabc');
  });
  it('should show example of Array APIs', () => {
    assert.deepEqual([0, 0, 0, 0].fill(7, 1), [0, 7, 7, 7]);
    assert.equal([1, 2, 5].find(x => x === 5), 5);
    assert.equal([1, 2, 5].findIndex(x => x === 5), 2);
    assert.deepEqual([1, 2, 3, 4, 5].copyWithin(3, 0), [1, 2, 3, 1, 2]);
  });
});

describe('Binary and Octal Literals', () => {
  it('should show examples of Binary and Octal', () => {
    assert.equal(0b111110111, 503);
    assert.equal(0o767, 503);
  });
});

describe('Promises', () => {
  it('should show example of Promises', () => {
    const mytimeout = (duration = 0) => new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
    const p = mytimeout(100).then(() => true);
    p.then(r => assert.equal(r, true));
  });
  it('should show example with error', () => {
    const mytimeout = (duration = 0) => new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
    const p = mytimeout(100).then(() => mytimeout(200)).then(() => new Error('hmm')
    ).catch(() => 'error');
    p.then(r => assert.equal(r, 'error'));
  });
});

describe('Tail Calls', () => {
  it('should use tail calls allowing loops without growning stack', () => {
    function helper(base, power, num) {
      if (power === 1) return num;
      return helper(base, power - 1, base * num);
    }
    function pow(base, power) {
      if (power <= 0) return 1;
      return helper(base, power, base); // tail call === true
    }
    assert.equal(pow(4, 84599), Infinity);
  });
});
