import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../todos.service';
import { By } from '@angular/platform-browser';

class MockTodosService {
  addItem = jasmine.createSpy('addItem');
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockTodosService: MockTodosService;

  beforeEach(async () => {
    mockTodosService = new MockTodosService();

    await TestBed.configureTestingModule({
      imports: [FormsModule, HeaderComponent],
      providers: [{ provide: TodosService, useValue: mockTodosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty initial title', () => {
    expect(component.title).toBe('');
  });

  it('should call addItem on TodosService with the correct title', () => {
    component.title = 'New Todo';
    component.addTodo();

    expect(mockTodosService.addItem).toHaveBeenCalledWith('New Todo');
  });

  it('should clear the title after adding a todo', () => {
    component.title = 'New Todo';
    component.addTodo();

    expect(component.title).toBe('');
  });

  it('should not call addItem on TodosService if title is empty', () => {
    component.title = '';
    component.addTodo();

    expect(mockTodosService.addItem).not.toHaveBeenCalled();
  });

  it('should bind the input field to the title property', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'Test Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.title).toBe('Test Todo');
  });
});