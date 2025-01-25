import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FooterComponent } from './footer/footer.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        TodoListComponent,
        FooterComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const headerElement = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerElement).toBeTruthy();
  });

  it('should render the todo list component', () => {
    const todoListElement = fixture.debugElement.query(By.directive(TodoListComponent));
    expect(todoListElement).toBeTruthy();
  });

  it('should render the footer component', () => {
    const footerElement = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerElement).toBeTruthy();
  });
});
