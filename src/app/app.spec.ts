import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { TRANSITION_TOPICS } from './transition-topics';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have correct total topics length', () => {
    // 11 original + 7 from first batch + 4 from SudheerJ batch = 22 total topics
    expect(TRANSITION_TOPICS.length).toBe(22);
  });
});
