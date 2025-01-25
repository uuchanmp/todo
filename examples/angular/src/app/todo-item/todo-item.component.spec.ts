import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../todos.service';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  const mockTodo: Todo = {
    title: 'Test Todo',
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = mockTodo;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the todo completion status', () => {
    component.toggleTodo();
    expect(component.todo.completed).toBeTrue();

    component.toggleTodo();
    expect(component.todo.completed).toBeFalse();
  });

  it('should emit the remove event when removeTodo is called', () => {
    spyOn(component.remove, 'emit');
    component.removeTodo();
    expect(component.remove.emit).toHaveBeenCalledWith(mockTodo);
  });

  it('should start editing mode when startEdit is called', () => {
    component.startEdit();
    expect(component.isEditing).toBeTrue();
  });

  it('should handle focus and set the title to the todo title', () => {
    component.handleFocus(new Event('focus'));
    expect(component.title).toBe(mockTodo.title);
  });

  it('should exit editing mode on blur', () => {
    component.isEditing = true;
    component.handleBlur(new Event('blur'));
    expect(component.isEditing).toBeFalse();
  });

  it('should update the todo title and exit editing mode', () => {
    component.title = 'Updated Title';
    component.updateTodo();
    expect(component.todo.title).toBe('Updated Title');
    expect(component.isEditing).toBeFalse();
  });

  it('should remove the todo if the updated title is empty', () => {
    spyOn(component.remove, 'emit');
    component.title = '';
    component.updateTodo();
    expect(component.remove.emit).toHaveBeenCalledWith(mockTodo);
  });

  it('should not throw an error if inputRef is undefined', () => {
    component.inputRef = undefined;
    component.isEditing = true;

    expect(() => component.ngAfterViewChecked()).not.toThrow();
  });
});
