'use strict';

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
