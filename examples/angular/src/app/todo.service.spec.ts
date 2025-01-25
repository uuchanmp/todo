import { TestBed } from '@angular/core/testing';
import { TodosService, Todo } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new todo item', () => {
    service.addItem('Test Todo');
    expect(service.todos.length).toBe(1);
    expect(service.todos[0].title).toBe('Test Todo');
    expect(service.todos[0].completed).toBeFalse();
  });

  it('should remove a todo item', () => {
    const todo: Todo = { title: 'Test Todo', completed: false };
    service.todos.push(todo);

    service.removeItem(todo);
    expect(service.todos.length).toBe(0);
  });

  it('should clear completed todos', () => {
    service.todos = [
      { title: 'Todo 1', completed: true },
      { title: 'Todo 2', completed: false },
      { title: 'Todo 3', completed: true },
    ];

    service.clearCompleted();
    expect(service.todos.length).toBe(1);
    expect(service.todos[0].title).toBe('Todo 2');
  });

  it('should toggle all todos to completed or not completed', () => {
    service.todos = [
      { title: 'Todo 1', completed: false },
      { title: 'Todo 2', completed: false },
    ];

    service.toggleAll(true);
    expect(service.todos.every((todo) => todo.completed)).toBeTrue();

    service.toggleAll(false);
    expect(service.todos.every((todo) => !todo.completed)).toBeTrue();
  });

  it('should get all todos by default', () => {
    service.todos = [
      { title: 'Todo 1', completed: false },
      { title: 'Todo 2', completed: true },
    ];

    const todos = service.getItems();
    expect(todos.length).toBe(2);
  });

  it('should get only active todos', () => {
    service.todos = [
      { title: 'Todo 1', completed: false },
      { title: 'Todo 2', completed: true },
    ];

    const activeTodos = service.getItems('active');
    expect(activeTodos.length).toBe(1);
    expect(activeTodos[0].title).toBe('Todo 1');
  });

  it('should get only completed todos', () => {
    service.todos = [
      { title: 'Todo 1', completed: false },
      { title: 'Todo 2', completed: true },
    ];

    const completedTodos = service.getItems('completed');
    expect(completedTodos.length).toBe(1);
    expect(completedTodos[0].title).toBe('Todo 2');
  });
});
