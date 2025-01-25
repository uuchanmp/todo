import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TodosService, Todo } from '../todos.service';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

class MockTodosService {
  getItems = jasmine.createSpy('getItems').and.returnValue([
    { title: 'Todo 1', completed: false },
    { title: 'Todo 2', completed: true },
  ]);
  clearCompleted = jasmine.createSpy('clearCompleted');
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let mockTodosService: MockTodosService;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockTodosService = new MockTodosService();
    mockLocation = jasmine.createSpyObj('Location', ['path']);
    mockLocation.path.and.returnValue('/all');

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FooterComponent],
      providers: [
        { provide: TodosService, useValue: mockTodosService },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get all todos', () => {
    expect(component.todos.length).toBe(2);
    expect(mockTodosService.getItems).toHaveBeenCalledWith();
  });

  it('should get active todos', () => {
    mockTodosService.getItems.and.returnValue([
      { title: 'Todo 1', completed: false },
    ]);

    expect(component.activeTodos.length).toBe(1);
    expect(component.activeTodos[0].title).toBe('Todo 1');
    expect(mockTodosService.getItems).toHaveBeenCalledWith('active');
  });

  it('should get completed todos', () => {
    mockTodosService.getItems.and.returnValue([
      { title: 'Todo 2', completed: true },
    ]);

    expect(component.completedTodos.length).toBe(1);
    expect(component.completedTodos[0].title).toBe('Todo 2');
    expect(mockTodosService.getItems).toHaveBeenCalledWith('completed');
  });

  it('should return the correct filter from the location path', () => {
    mockLocation.path.and.returnValue('/completed');
    expect(component.filter).toBe('completed');

    mockLocation.path.and.returnValue('/active');
    expect(component.filter).toBe('active');

    mockLocation.path.and.returnValue('/');
    expect(component.filter).toBe('all');
  });

  it('should call clearCompleted on the TodosService', () => {
    component.clearCompleted();
    expect(mockTodosService.clearCompleted).toHaveBeenCalled();
  });
});
