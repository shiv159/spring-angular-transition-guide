export interface TransitionTopic {
  id: string;
  title: string;
  springEquivalent: string;
  description: string;
  snippet: string;
  questions?: { question: string; answer: string }[];
}

export const TRANSITION_TOPICS: TransitionTopic[] = [
  {
    id: 'components-templates',
    title: 'Components & Templates',
    springEquivalent: '@Controller / Thymeleaf',
    description:
      'Think of an Angular Component like a mini-controller paired directly with a Thymeleaf view. The TypeScript class holds the data (state) and logic for that specific part of the screen, and the HTML template renders it. Instead of reloading the page to show new data, Angular updates the HTML automatically when the class data changes.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-user-card',
  template: \`
    <div class="card">
      <h2>{{ name() }}</h2>
      <button (click)="notifyServer()">Refresh</button>
      <ng-content></ng-content>
    </div>
  \`
})
export class UserCardComponent implements OnInit, OnDestroy {
  // Input from parent
  name = input.required<string>();
  
  // Output event to parent
  @Output() refreshRequested = new EventEmitter<void>();

  ngOnInit(): void {
    console.log('Component initialized.');
  }

  ngOnDestroy(): void {
    console.log('Component destroyed. Clean up subscriptions here.');
  }

  notifyServer(): void {
    this.refreshRequested.emit();
  }
}`,
    questions: [
      {
        question: 'What is the difference between Constructor injection and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ngOnInit</code>?',
        answer: 'The constructor runs when the JavaScript class is instantiated, <em>before</em> Angular has initialized inputs (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Input</code>). <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ngOnInit</code> runs after Angular has fully bound inputs. Use the constructor for Dependency Injection only, and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ngOnInit</code> for fetching initial data based on those inputs.'
      },
      {
        question: 'What is Content Projection (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">&lt;ng-content&gt;</code>) and why use it?',
        answer: 'It allows a component to wrap arbitrary HTML passed from its parent, similar to creating a wrapper layout. This is crucial for creating reusable UI components like Cards or Modals where the parent decides the internal content, but the child controls the frame.'
      },
      {
        question: 'How do you prevent memory leaks when a component is removed from the screen?',
        answer: 'Implement the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ngOnDestroy</code> lifecycle hook to manually unsubscribe from active RxJS Observables, clear JavaScript intervals/timeouts, or detach heavy event listeners.'
      }
    ]
  },
  {
    id: 'services-di',
    title: 'Dependency Injection & Services',
    springEquivalent: '@Service & @Autowired',
    description:
      'Just like Spring uses <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Service</code> beans to handle business logic and database calls, Angular uses Services. A service is a plain TypeScript class that holds logic meant to be shared across multiple components, such as making HTTP calls or managing user session state. Angular creates and injects these services automatically where needed.',
    snippet: String.raw`// Application-wide singleton service
@Injectable({ providedIn: 'root' })
export class GlobalConfigService {
  readonly apiUrl = 'https://api.example.com';
}

// Service scoped to a specific component tree hierarchy
@Injectable()
export class EphemeralTaskService {
  constructor() {
    console.log('New instance created for this component tree');
  }
}

@Component({
  standalone: true,
  selector: 'app-task-dashboard',
  // Hierarchical Injection: This component and its children get their own instance
  providers: [EphemeralTaskService],
  template: ''
})
export class TaskDashboardComponent {
  private config = inject(GlobalConfigService); // Singleton
  private taskSvc = inject(EphemeralTaskService); // Local instance
}`,
    questions: [
      {
        question: 'What does <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">providedIn: "root"</code> actually do?',
        answer: 'It registers the service with the top-level application injector. This ensures only <strong>one single instance</strong> (a singleton) of the service is created and shared across the entire application. It also enables tree-shaking, meaning if the service is never injected anywhere, it gets removed from the final production build.'
      },
      {
        question: 'What happens if you provide a service in a Component\'s <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">providers</code> array?',
        answer: 'Angular creates a <strong>brand new instance</strong> of that service mapped specifically to that component and its children. This creates a "Hierarchical Injector" pattern. When the component is destroyed, that specific service instance is also destroyed. This is vastly different from Spring\'s default global singletons.'
      },
      {
        question: 'How does the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">inject()</code> API compare to constructor injection?',
        answer: 'Introduced in Angular 14, <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">inject()</code> allows requesting dependencies directly in property declarations or functions. It simplifies inheritance (subclasses avoiding super calls) and works natively in functional contexts like Guards.'
      },
      {
        question: 'What are Resolution Modifiers (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Optional</code>, <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Self</code>, <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@SkipSelf</code>) used for?',
        answer: 'They alter the injector hierarchy search. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Optional</code> assigns null instead of crashing if not found. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Self</code> restricts the search identically strictly to the current injector only. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@SkipSelf</code> bypasses the current element searching directly upward.'
      },
      {
        question: 'What is an <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">InjectionToken</code>?',
        answer: 'Used to provide and inject non-class dependencies like primitive strings, APIs, or interfaces safely avoiding minification name-collisions dynamically.'
      }
    ]
  },
  {
    id: 'rxjs-observables',
    title: 'RxJS and Observables',
    springEquivalent: 'Project Reactor Flux/Mono',
    description:
      'Because web apps do a lot of waiting (waiting for APIs, waiting for user clicks), Angular uses RxJS Observables to handle these asynchronous events over time. Think of an Observable as a hose pipeline. Data flows through it, and you can attach "operators" to filter or transform the water before you finally "subscribe" to consume it.',
    snippet: String.raw`@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  
  // BehaviorSubject holds a default value and emits to all new subscribers
  private cache$ = new BehaviorSubject<string | null>(null);

  fetchData(id: string): Observable<string> {
    return this.http.get<string>(\`/api/data/\${id}\`).pipe(
      map(res => res.toUpperCase()),
      catchError(err => of('Fallback Data'))
    );
  }
}

@Component({ standalone: true, selector: 'app-stream', template: '' })
export class StreamComponent implements OnInit {
  private dataSvc = inject(DataService);
  private destroyRef = inject(DestroyRef); // Modern cleanup technique

  ngOnInit(): void {
    this.dataSvc.fetchData('123')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => console.log(result));
  }
}`,
    questions: [
      {
        question: 'What is the exact difference between an Observable and a Subject?',
        answer: 'An Observable is <em>unicast</em>: every time a component subscribes, a brand new execution of the data pipeline runs (e.g. triggering an HTTP call again). A Subject is <em>multicast</em>: it acts like an event emitter spreading the exact same value to all active subscribers simultaneously.'
      },
      {
        question: 'What is a <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">BehaviorSubject</code> and when would you use it?',
        answer: 'A <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">BehaviorSubject</code> is a type of Subject that requires an initial starting value and always stores the <em>latest</em> emitted value. It is typically used for state management. When a new component subscribes, it immediately receives this latest cached value rather than waiting for the next emission.'
      },
      {
        question: 'What is the risk of not managing RxJS Subscriptions, and how is it solved?',
        answer: 'Failing to unsubscribe leaves the pipeline open even after the component is destroyed, leading to severe memory leaks and duplicate execution logic. It is solved by using the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">async</code> pipe in HTML (which auto-unsubscribes), or using <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">takeUntilDestroyed()</code> in TypeScript.'
      },
      {
        question: 'How do <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">combineLatest</code>, <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">forkJoin</code>, and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">withLatestFrom</code> differ?',
        answer: '<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">combineLatest</code> re-emits whenever ANY source emits. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">forkJoin</code> waits strictly until ALL sources complete, emitting their final values once (like Promise.all). <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">withLatestFrom</code> couples seamlessly without triggering on secondary variable changes.'
      },
      {
        question: 'Why utilize the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">shareReplay</code> operator?',
        answer: 'By default, multiple subscribers trigger multiple independent executions (e.g. duplicating HTTP requests dynamically). <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">shareReplay(1)</code> prevents this multicasting the identical cached execution results seamlessly.'
      }
    ]
  },
  {
    id: 'routing-lazy-loading',
    title: 'Routing & Lazy Loading',
    springEquivalent: '@RequestMapping',
    description:
      'Angular uses a Router to map URL paths to specific components without actually reloading the webpage. To speed up the initial load time of the application, features are "lazy-loaded"—meaning the JavaScript required for a specific page is only fetched over the network if the user actually navigates to that page.',
    snippet: String.raw`// Route Guard checking authentication before navigation
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.parseUrl('/login');
};

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    // Lazy loaded feature - only loads JS chunk when route is visited
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  }
];`,
    questions: [
      {
        question: 'What is a Route Guard, and what types are there?',
        answer: 'Guards are functions that execute before a routing event occurs to decide if navigation is allowed. Common types are <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">canActivate</code> (can the user enter?), <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">canDeactivate</code> (can the user leave, e.g., unsaved changes?), and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">canMatch</code> (can this route be loaded?).'
      },
      {
        question: 'What is a Route Resolver?',
        answer: 'A Resolver is used to pre-fetch critical data before the route finishes navigating. The page transition will "wait" until the Resolver completes data fetching from the API. This prevents flashing empty components while loading, ensuring data is available immediately.'
      },
      {
        question: 'How do you implement a custom preloading strategy?',
        answer: 'Instead of loading all lazy modules in the background, implementing the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">PreloadingStrategy</code> interface inspects route metadata visually or network capacities selectively dynamically deciding preloading capacities.'
      }
    ]
  },
  {
    id: 'forms-validation',
    title: 'Forms',
    springEquivalent: 'Bean Validation @Valid',
    description:
      'Angular offers two main ways to handle form inputs and validations: "Template-driven" (heavy logic in HTML, good for simple forms) and "Reactive" (heavy logic in TypeScript, excellent for complex, highly dynamic forms). These act similar to defining validation rules directly on a Spring DTO.',
    snippet: String.raw`// Custom Validator Function
export function restrictedWordsValidator(words: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const hasRestricted = words.some(w => control.value.includes(w));
    return hasRestricted ? { restrictedWord: true } : null;
  };
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`<input [formControl]="emailControl">\`
})
export class ReactiveFormDemo {
  private fb = inject(NonNullableFormBuilder);

  // Programmatic, reactive form model
  readonly form = this.fb.group({
    username: ['', [Validators.required, restrictedWordsValidator(['admin'])]],
    emailControl: ['', [Validators.required, Validators.email]]
  });

  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}`,
    questions: [
      {
        question: 'Why choose Reactive Forms over Template-Driven forms?',
        answer: 'Reactive Forms are more scalable, easier to unit test (test logic in TS without needing the browser DOM), and provide superior predictability because the underlying data model is immutable. They are vastly preferred for enterprise-scale applications.'
      },
      {
        question: 'How do you perform async validation (e.g., checking if a username is taken via API)?',
        answer: 'You create an <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">AsyncValidatorFn</code> which returns an Observable. Angular runs synchronous validators first. If they pass, it triggers the Async validator. The UI control state will show <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">PENDING</code> until the HTTP observable completes and emits the validation mapping.'
      },
      {
        question: 'What are the state CSS classes provided internally by Angular forms?',
        answer: 'Angular automatically attaches specific CSS classes to HTML inputs reflecting their live state. Classes include <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-touched</code> versus <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-untouched</code> (has the user blurred the input?), <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-dirty</code> versus <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-pristine</code> (has the value been modified?), and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-valid</code> versus <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-invalid</code> (did validation pass?).'
      },
      {
        question: 'How do you properly reset a Reactive Form completely?',
        answer: 'Calling <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">this.form.reset()</code> is required. It not only clears the displayed HTML values back to null/defaults safely, but crucially it resets all internal states natively back to <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-pristine</code> and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-untouched</code> clearing any red validation warnings.'
      }
    ]
  },
  {
    id: 'change-detection-zones',
    title: 'Change Detection & Zones',
    springEquivalent: 'N/A (UI Rendering Loop)',
    description:
      'Angular needs to know when JavaScript data changes so it can update the HTML. By default, the `Zone.js` library monkey-patches browser events (clicks, timers, network requests). Whenever one of these events finishes, Angular automatically checks the entire component tree to see if anything needs to be re-rendered on screen.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-fast-list',
  template: \`{{ data.value }} - Last rendered: {{ debugRender() }}\`,
  // OnPush implies Angular won't check this component unless 
  // the 'data' object reference changes entirely, or an event fires here.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FastListComponent {
  @Input() data!: { value: string };
  private cdr = inject(ChangeDetectorRef);

  debugRender() {
    return new Date().getTime();
  }

  forceUpdateObjField(): void {
    // Mutating a property inside an object won't trigger OnPush automatically.
    this.data.value = 'Mutated'; 
    
    // We must manually tell Angular to check this view right now.
    this.cdr.markForCheck(); 
  }
}`,
    questions: [
      {
        question: 'What is <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ChangeDetectionStrategy.OnPush</code>?',
        answer: 'It is a massive performance optimization. It tells Angular to skip checking this component completely during a standard cycle <em>unless</em> its specific <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Input</code> object references change, an event originates directly from within it, or an async pipe explicitly marks it.'
      },
      {
        question: 'Why did my screen not update after an API call when using <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">OnPush</code>?',
        answer: 'You likely mutated a property within an existing object reference (e.g. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">user.name = "Bob"</code>). Because the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">user</code> memory address didn\'t change, OnPush safely assumed nothing happened. The fix is to pass a brand new object (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">user = {{...user, name: "Bob"}}</code>) or trigger <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ChangeDetectorRef.markForCheck()</code> manually.'
      },
      {
        question: 'How do you fix an "Expression has changed after it was checked" error?',
        answer: 'This error happens in dev-mode when Angular finds a bound value mutated <em>during</em> the actively running rendering process systematically (like inside <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ngAfterViewInit</code>). Fix by moving logic functionally strictly earlier (e.g. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ngOnInit</code>) or deferring execution utilizing setTimeout natively.'
      },
      {
        question: 'What is Zone-less change detection and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">runOutsideAngular()</code>?',
        answer: 'Zone.js structurally monkey-patches browser events triggering global sweeps universally. For extensive physical firing events (scrolling), utilize <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">NgZone.runOutsideAngular()</code> listening silently without checking cycles fundamentally. Modern Angular natively migrates fully "Zone-less" functionally executing locally upon Signals.'
      }
    ]
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    springEquivalent: 'Caching / Scaling',
    description:
      'Browser optimization focuses heavily on minimizing DOM manipulations (which are slow) and reducing the size of initial JavaScript downloads via Lazy Loading features.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-perf-list',
  template: \`
    <!-- Modern syntax: 'track item.id' forces Angular to identify specific 
         DOM nodes by ID, reusing them rather than tearing down the entire 
         DOM list when the array reference changes. -->
    @for (item of items(); track item.id) {
      <div class="row">{{ item.name }}</div>
    }
  \`
})
export class PerfList {
  items = signal([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);

  refreshListFromServer(): void {
    // A network response creates a completely new array reference.
    // Without 'track', the entire DOM list would flash and rebuild.
    this.items.set([{ id: 1, name: 'A-updated' }, { id: 2, name: 'B' }]);
  }
}`,
    questions: [
      {
        question: 'How do you prevent a heavy function from being called too many times in a template (e.g., <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">{{ calculateTotal() }}</code>)?',
        answer: 'Never bind a heavy computation directly to a template interpolation. Angular checking cycles run constantly, and the function would execute hundreds of times per second. Instead, compute the value once using a <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">Signal computed()</code> or a pure Custom Pipe, modifying the template simply to display the cached value.'
      },
      {
        question: 'Why is <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">trackBy</code> (or using <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">track</code> inside an <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@for</code> block) critical for rendering array lists?',
        answer: 'When a list array is refreshed from the server, Angular receives new object references in memory. Without tracking by an ID, Angular assumes every item is entirely new, aggressively destroying the entire list of HTML nodes and recreating them from scratch (highly expensive). Tracking by ID allows Angular to only touch the exact DOM nodes that actually changed data.'
      }
    ]
  },
  {
    id: 'testing',
    title: 'Testing',
    springEquivalent: 'JUnit/Mockito/MockMvc',
    description:
      'Angular uses Jest or Jasmine/Karma. Testing falls loosely into two buckets: Unit tests (testing just pure TypeScript logic like data transforms by mocking everything else) and Integration tests (using Angular\'s <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">TestBed</code> API to mount HTML and assert exactly how clicks affect the DOM).',
    snippet: String.raw`// Component Integration Test using TestBed
describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let mockAuth: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuth = jasmine.createSpyObj('AuthService', ['getUser']);
    mockAuth.getUser.and.returnValue({ name: 'Alice' });

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: AuthService, useValue: mockAuth }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges(); // Triggers change detection to render HTML
  });

  it('displays the user name in an h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Alice');
  });
});`,
    questions: [
      {
        question: 'What is the purpose of <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">TestBed</code>?',
        answer: 'It dynamically creates an isolated Angular module specifically for running tests. It handles dependency injection, allowing you to easily swap out real services for mocked Spies, and gives you the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ComponentFixture</code> so you can query HTML elements directly or forcibly trigger change detection.'
      },
      {
        question: 'How do you test HTTP calls in Services?',
        answer: 'You leverage <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">HttpTestingController</code> inside your tests. It mocks the backend preventing real network requests, allowing you to assert that the correct URLs were generated and forcibly return fake mock JSON data (e.g. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">req.flush(mockData)</code>).'
      },
      {
        question: 'What is the utility of <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">fakeAsync</code> and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">tick()</code>?',
        answer: '<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">fakeAsync</code> allows you to test asynchronous code in a synchronous, linear way without real waiting. It pauses execution until you call <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">tick(ms)</code>, which synthetically fast-forwards timelines (like setTimeout) instantly so you can assert immediate results.'
      },
      {
        question: 'How do you test complex component hierarchies effectively?',
        answer: 'Utilize "Shallow Testing". Focus on the Parent component behavior in isolation while mocking its children visually using custom Stubs or the `NO_ERRORS_SCHEMA` flag. Directly test <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Input()</code> flow and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Output()</code> event emissions.'
      }
    ]
  },
  {
    id: 'state-management-ngrx',
    title: 'State Management',
    springEquivalent: 'Centralized CQRS / Event Sourcing',
    description:
      'In a massive enterprise app, passing data between disconnected features becomes painful. State Management tools like NgRx follow the "Redux" pattern: creating one giant, globally accessible, read-only cache bucket. To make changes, components dispatch "Actions", pure functions named "Reducers" calculate new data, and components "Select" the required pieces to watch.',
    snippet: String.raw`// 1. Selector to read specific cached state efficiently
export const selectCartTotal = createSelector(
  selectCartFeature,
  (state) => state.items.reduce((acc, item) => acc + item.price, 0)
);

// 2. Action to declare intent
export const checkoutStarted = createAction('[Cart] Checkout Started');

// 3. Effect to handle side-effects asynchronously
@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private api = inject(CheckoutApi);

  processCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkoutStarted),
      switchMap(() => this.api.submitOrder().pipe(
        map(res => checkoutSuccess({ orderId: res.id })),
        catchError(err => of(checkoutFailed({ err })))
      ))
    )
  );
}`,
    questions: [
      {
        question: 'What is the core difference between Reducers and Effects in NgRx?',
        answer: 'Reducers are strictly <em>synchronous, pure, mathematical functions</em> that calculate new cache states entirely based on preceding data. They are forbidden from talking to an API route. Effects, conversely, capture Actions to perform <em>asynchronous side effects</em> (like HTTP requests) returning a different ending Action on completion.'
      },
      {
        question: 'What makes Selectors powerful?',
        answer: 'Selectors act as deep "memoized" lenses. When multiple slices of the state tree update, Selectors intercept the changes. If the mathematical derivation has not changed, the selector halts execution entirely, returning a cached instance to subscribing components without re-triggering Angular Change Detection.'
      },
      {
        question: 'How would you architect state without installing NgRx?',
        answer: 'For small or medium applications without massive cascading events, a Service-based state is preferred. You initialize a <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">BehaviorSubject</code> (or more modern, a <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">signal()</code>) privately within an <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@Injectable()</code> service, and publicly expose read-only observables/derivatives alongside explicit update methods to mutate it.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security',
    springEquivalent: 'Spring Security Filters',
    description:
      'Angular has extremely strict built-in rules. If text arrives from an API containing mischievous HTML like a Javascript <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">&lt;script&gt;</code> tag, Angular’s strict contextual interpolation drops the harmful logic automatically to prevent users from executing cross-site scripting attacks.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-html-render',
  template: \`
    <!-- Angular strictly sanitizes this by default, removing any <script> tags -->
    <div [innerHTML]="userProvidedHtml"></div>

    <!-- If we absolutely trust the source, we bind to the bypassed SafeHtml -->
    <div [innerHTML]="trustedIframe"></div>
  \`
})
export class HtmlRenderComponent {
  private sanitizer = inject(DomSanitizer);

  userProvidedHtml = '<b>Hello</b> <script>alert("hack")</script>';

  // Explicitly tell Angular this raw string is safe HTML/Resource
  trustedIframe: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
    '<iframe src="https://trusted.example.com"></iframe>'
  );
}`,
    questions: [
      {
        question: 'When and why do you use <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">DomSanitizer.bypassSecurityTrustHtml()</code>?',
        answer: 'Sometimes you receive raw HTML payload internally from the backend (like a complex dynamic table layout), but Angular\'s aggressive XSS sanitization will strip custom styles. You explicitly flag it via the sanitizer to skip the context safety check indicating: "I entirely trust the origin of this string, allow it full access."'
      },
      {
        question: 'What is an HttpInterceptor used for?',
        answer: 'An interceptor catches outgoing requests and backend responses transparently. They are universally used to read the user\'s local auth token and inject it silently as a bearer header before it leaves the browser, or inversely to intercept 401 Unauthorized API responses in bulk and force redirection to the login module.'
      },
      {
        question: 'How do you implement Route Guards for secure access?',
        answer: 'You create functions implementing <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">CanActivate</code> or <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">CanMatch</code>. These inject your authentication service and return a boolean or <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">UrlTree</code>. If the user isn\'t verified, the router cancels navigation seamlessly to protect the lazily loaded module payload.'
      }
    ]
  },
  {
    id: 'cli-builds',
    title: 'Angular CLI, Builds, AOT',
    springEquivalent: 'Maven/Gradle Pipelines',
    description:
      'The Angular Command Line Interface (CLI) handles the heavy lifting of modern web development. When you execute <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng build</code>, Angular performs an ahead-of-time (AOT) compilation. It statically analyzes all your HTML, converting directives directly to dense, minified JavaScript instructions while throwing away parts of the framework code you aren\'t using (Tree Shaking).',
    snippet: String.raw`/* In angular.json configuration: */
"configurations": {
  "production": {
    "budgets": [ // Bundle size warnings/errors
      { "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" }
    ],
    // AOT compilation parses templates at build-time rather than browser-time.
    // It catches template errors early and delivers smaller, faster JS bundles.
    "aot": true,
    "optimization": true,       // Minify CSS/JS
    "extractLicenses": true,    // Remove comments
    "sourceMap": false,         // Hide source
    "outputHashing": "all"      // Cache busting filenames
  }
}`,
    questions: [
      {
        question: 'What is the primary difference between AOT (Ahead of Time) and JIT (Just in Time) compilation?',
        answer: 'JIT ships the Angular framework compiler straight to a user\'s browser, parsing your HTML templates into executable JS down on the client side at runtime (which is very slow). AOT parses all HTML into dense Javascript commands strictly during the backend CI/CD pipeline, drastically reducing final bundle size and speeding application initialization.'
      },
      {
        question: 'What is differential loading?',
        answer: 'During build, differential loading produces duplicate Javascript bundles—one using optimized modern ESNext features for Chromium/Safari, and another bulkier legacy polyfilled bundle for older legacy systems. The browser gracefully detects and downloads only the target required.'
      },
      {
        question: 'How do you optimize build sizes and enforce limits?',
        answer: 'In <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">angular.json</code> you configure CI/CD compile budgets bounding bundle caps rigidly. You utilize <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">source-map-explorer</code> analyzing specific module weight directly isolating massively bloated tree-shaking leaks immediately removing legacy libraries.'
      }
    ]
  },
  {
    id: 'signals',
    title: 'Signals',
    springEquivalent: 'N/A (Fine-Grained Reactivity)',
    description:
      'Signals are the foundational future pattern for managing UI reactivity in Angular natively. Unlike RxJS, you just wrap primitives like strings or Arrays in a <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">signal()</code> call. When the value mutates, Angular pinpoints the precise HTML spans relying on that exact target and exclusively repaints them locally, entirely bypassing standard change detection sweeps.',
    snippet: String.raw`@Component({ standalone: true, selector: 'app-counter', template: '' })
export class CounterComponent {
  // Writable signal container
  readonly count = signal(0);
  
  // Computed derivations cache results until 'count' changes
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    // Update functional API guarantees latest value
    this.count.update((value) => value + 1);
  }

  reset(): void {
    // Direct setter
    this.count.set(0);
  }
}`,
    questions: [
      {
        question: 'Why are Signals considered superior to deeply complex RxJS variables for UI representation?',
        answer: 'Signals represent highly synchronous state natively, require no explicit user-level subscriptions that necessitate later complicated memory cleanup execution (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">takeUntilDestroy</code>), and inherently lack the complex stream composition patterns. Furthermore, Signals introduce "glitch-free" execution, resolving variables synchronously without creating stuttering waterfall repaints.'
      },
      {
        question: 'What is a computed signal?',
        answer: 'A computed signal is a formula defining a derivation based on other reactive variables. It executes lazily <em>only</em> if the UI actively asks for it, and actively caches its value in memory returning the exact matching calculation without execution until one of the upstream dependencies registers modification.'
      },
      {
        question: 'What is a Signal <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">effect()</code>?',
        answer: 'An <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">effect()</code> tracks signal dependencies implicitly and runs side effects automatically when they change, rather than rendering to the view. Very similar to a React <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">useEffect</code>, used for logging or syncing localStorage outside the UI.'
      },
      {
        question: 'How do you approach migrating an RxJS app to Signals?',
        answer: 'Gradually transition component-local state first. Replace <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">BehaviorSubject</code> variables with writable signals. Replace <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">.subscribe()</code> mutations with responsive <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">computed()</code> signals. Keep deeply entrenched async network flows (like autocomplete debouncing) inside RxJS logic using tools like <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">toSignal()</code> to bridge the output.'
      }
    ]
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    springEquivalent: 'Spring Framework Internals',
    description:
      'Deep architectural knowledge of Angular framework design decisions shows advanced mastery. Modern Angular utilizes a rendering engine called Ivy, which compiles templates completely differently than the older iterations. Features like the Control Flow Syntax (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@if / @for</code>) provide syntax improvements that compile faster to DOM instructions natively.',
    snippet: String.raw`/* 
 * Understanding the Compiler (Ivy vs ViewEngine):
 * Older ViewEngine required massive metadata files and factories.
 * The Ivy engine compiles components independently into simpler, 
 * tree-shakable instruction sets attached directly to the class.
 */

@Component({
  selector: 'app-hello',
  template: \`<div>Hello {{ name }}</div>\`
})
export class Hello { name = 'Ivy'; }

/* 
 * The Angular Compiler essentially translates the above template 
 * into JS instructions that look like this under the hood:
 */
// ɵɵelementStart(0, "div");
// ɵɵtext(1);
// ɵɵelementEnd();

// ɵɵadvance(1);
// ɵɵtextInterpolate1("Hello ", ctx.name, "");`,
    questions: [
      {
        question: 'What made Ivy such a significant architectural leap backward compatibility aside?',
        answer: 'Ivy acts on standard "locality". Previous compilers required a complete holistic understanding of global modules to translate a singular component. Ivy compiles components individually strictly against their localized class instruction set without consulting the module architecture. This singlehandedly eliminated sprawling factory generation unlocking massive Tree-shaking.'
      },
      {
        question: 'Why did the Angular team introduce the block control flow system (via <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@if</code>) rendering <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">*ngIf</code> directives legacy?',
        answer: 'The structural directive (asterisk) required creating hidden localized template blocks (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">&lt;ng-template&gt;</code> wrappers) internally which generated massive overhead checking logic loops at runtime. The block framework control native logic syntax (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@if</code>) transpiles directly to structural typecasting instructions skipping the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-template</code> rendering tree natively granting type checking optimizations directly.'
      }
    ]
  },
  {
    id: 'pipes-custom',
    title: 'Pipes (Pure vs Impure)',
    springEquivalent: 'View Helpers / DTO Formatters',
    description: 'Pipes transform data directly in templates. They take an inputted value and return a formatted string or altered object, functioning much like formatting annotations or Thymeleaf utility expressions. They prevent heavy logic inside template execution checks.',
    snippet: String.raw`@Pipe({
  name: 'taxCalculator',
  standalone: true,
  // Pure pipes (default) only recompute if the exact primitive or object reference changes
  pure: true 
})
export class TaxCalculatorPipe implements PipeTransform {
  transform(cost: number, rate: number = 0.2): number {
    return cost + cost * rate;
  }
}

// Template usage
// <span>Total: {{ baseCost | taxCalculator:0.25 | currency }}</span>`,
    questions: [
      {
        question: 'What is the primary difference between Pure and Impure pipes?',
        answer: 'Pure pipes (default) execute <em>strictly</em> when their input argument references mathematically change, caching execution resulting in huge performance gains. Impure pipes (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">pure: false</code>) execute blindly on <em>every single change detection cycle</em> indiscriminately, causing dangerous severe performance penalties if not very careful.'
      },
      {
        question: 'What is the utility of the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">async</code> pipe?',
        answer: 'The <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">async</code> pipe automatically subscribes to an <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">Observable</code> (or <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">Promise</code>) directly in the HTML template, unwraps the emitted value, tracks change detection safely, and critically: automatically handles memory unsubscription immediately upon component destruction.'
      }
    ]
  },
  {
    id: 'directives-custom',
    title: 'Directives & Renderer2',
    springEquivalent: 'N/A (DOM Manipulators)',
    description: 'A Directive is essentially a component without a template. It attaches behavioral logic to existing DOM elements. Structural directives alter DOM node existence, while attribute directives simply modify runtime behavior or CSS properties.',
    snippet: String.raw`@Directive({
  standalone: true,
  selector: '[appHighlight]'
})
export class HighlightDirective {
  // Renderer2 safely wraps DOM API, shielding you from SSR crashes
  private renderer = inject(Renderer2); 
  private el = inject(ElementRef);

  @HostListener('mouseenter') onEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }

  @HostListener('mouseleave') onLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'transparent');
  }
}`,
    questions: [
      {
        question: 'What is the difference between Structural and Attribute directives?',
        answer: 'Structural directives (denoted by an asterisk like <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">*ngIf</code> or <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">*ngFor</code>) physically add or remove DOM nodes completely from memory dynamically. Attribute directives simply mutate the styling, classes, or event behaviors of existing elements continuously operating.'
      },
      {
        question: 'Why utilize <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">Renderer2</code> instead of accessing <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">document.getElementById()</code> natively?',
        answer: 'Native DOM APIs violate Angular paradigm abstraction. By abstracting edits through <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">Renderer2</code>, your component is guaranteed to survive Server-Side Rendering (where <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">window/document</code> are undefined) or Web-Worker isolation context safely.'
      }
    ]
  },
  {
    id: 'modules-standalone',
    title: 'Modules & Standalone API',
    springEquivalent: 'Spring Context Configurations',
    description: 'Historically, Angular used strong boundaries called NgModules to bundle grouped logic together before it could be rendered. Today, Standalone Components render autonomously, declaring precisely piecemeal what they depend on immediately reducing overarching scaffolding files drastically.',
    snippet: String.raw`// Legacy Architecture Pattern:
@NgModule({
  declarations: [LegacyCard],
  imports: [CommonModule, FormsModule],
  providers: [CardService]
})
export class CardModule {}

// Modern Standalone Pattern:
@Component({
  standalone: true,
  selector: 'app-modern-card',
  // Specific direct dependencies explicit without module obfuscation
  imports: [NgIf, DatePipe, ReactiveFormsModule],
  template: \`<div *ngIf="show()">Modern</div>\`
})
export class ModernCard {}`,
    questions: [
      {
        question: 'How do NgModules structurally differ from ES6 modules?',
        answer: 'ES6 Modules strictly manage Javascript file boundary exports and scoping natively. NgModules manage the Angular Compiler context specifically—creating an isolated namespace bounding components, instructing Dependency Injection hierarchies, and orchestrating massive asynchronous Lazy Loading payload routing blocks.'
      },
      {
        question: 'How does Standardizing on Standalone components simplify Angular applications?',
        answer: 'It drastically flattens the mental application dependency graph overhead. It entirely eliminates the convoluted web of <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">NgModule</code> arrays, tightens bundle payloads natively increasing Tree-Shaking efficacy, and accelerates scaffolding time by permitting functions and providers to declare autonomy sequentially.'
      }
    ]
  },
  {
    id: 'content-projection',
    title: 'Content Projection & ViewEncapsulation',
    springEquivalent: 'N/A (Shadow DOM Scoping)',
    description: 'Components commonly wrap complex content layouts dynamically—such as a specific modal dialogue framing dynamically submitted forms. Angular utilizes distinct placeholder pipelines preventing styling bleed across isolated boundaries ensuring modular autonomy.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-dialog',
  template: \`
    <div class="dialog-frame">
      <!-- Named slot specifically targeting header content -->
      <header><ng-content select="[dialog-title]"></ng-content></header>
      
      <!-- Default fallback slot for everything else injected -->
      <main><ng-content></ng-content></main>
    </div>
  \`,
  // Emulated limits CSS rules to exclusively this frame simulating ShadowDOM
  // None leaks the CSS rules globally entirely ignoring abstraction
  encapsulation: ViewEncapsulation.Emulated 
})
export class DialogComponent {}`,
    questions: [
      {
        question: 'What is the distinction separating <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-content</code> and <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-template</code>?',
        answer: '<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-content</code> projects HTML structures structurally parsed actively through Component inputs wrapping templates linearly immediately. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng-template</code> specifies an inert un-rendered HTML block that structural directives (like tables/lists) consume logic sequentially executing dynamically.'
      },
      {
        question: 'What are the consequences of overriding <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ViewEncapsulation</code>?',
        answer: 'Defaults (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">Emulated</code>) assign unique abstract identifier strings to HTML tags isolating component CSS flawlessly. Utilizing <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ShadowDom</code> enforces true Native Browser shadow partitions (losing external global styles), whereas <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">None</code> leaks custom logic brutally indiscriminately causing massive application styling conflicts.'
      }
    ]
  },
  {
    id: 'ssr-universal',
    title: 'SSR, Hydration & SEO',
    springEquivalent: 'Thymeleaf View Rendering',
    description: 'Server-Side Rendering (SSR) compiles standard Angular execution flows actively upon Node Servers beforehand, rapidly serving a fully painted static HTML block for Web Crawlers matching Spring Native execution times before smoothly handing over execution natively back over to Client SPAs.',
    snippet: String.raw`// Bootstrapping App handling SSR hydration
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Ensures destructive DOM re-rendering flashes are avoided
    // actively carrying over Node's execution layout.
    provideClientHydration() 
  ]
};

@Component({
  template: \`
    <!-- Defer blocks actively enable partial rehydration waiting 
         to execute logic until physically scrolling on screen -->
    @defer (on viewport) {
      <heavy-analytics-chart />
    } @placeholder {
      <div>Loading...</div>
    }
  \`
})
export class AnalyticsRoute {}`,
    questions: [
      {
        question: 'How do you prevent Server Context errors executing Browser strictly variables?',
        answer: 'During Node SSR compilation variables specifically matching <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">window</code>, <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">document</code>, or <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">localStorage</code> fatally crash. Best practice abstracts them via <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">isPlatformBrowser(platformId)</code> logic gates ensuring native calls strictly wait for Client-side hydration.'
      },
      {
        question: 'What is the Hydration pipeline process?',
        answer: 'Hydration attaches Angular interactive execution logic dynamically onto explicitly Server-Generated static DOM structures seamlessly identically without visually physically deleting the previous rendered frame preventing stuttering layout-shift latency flashes enhancing UX substantially alongside specific partial-deferred execution islands.'
      }
    ]
  },
  {
    id: 'http-interceptors',
    title: 'HTTP Client & Interceptors',
    springEquivalent: 'RestTemplate & Filters',
    description: 'Angular\'s HttpClient utilizes RxJS observably natively. Architectures seamlessly pipe data flows asynchronously, modifying data dynamically scaling heavily through HttpInterceptors identical intercepting filters executed upon Java Request handling sequences.',
    snippet: String.raw`@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone structurally freezing request adding dynamic headers mapped natively
    const authReq = req.clone({
      setHeaders: { Authorization: \`Bearer \${this.auth.token}\` }
    });

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.auth.forceLogout();
        }
        return throwError(() => err);
      })
    );
  }
}`,
    questions: [
      {
        question: 'Why are Interceptors immensely critical inside Angular paradigms?',
        answer: 'Interceptors autonomously orchestrate cross-cutting concerns identically eliminating repetitive boilerplate. Utilizing interceptors centrally executes JWT bearer token attachment, globally handles \`HttpErrorResponse\` logging exceptions identically routing users conditionally, natively providing universal loading spinners.'
      }
    ]
  },
  {
    id: 'pwa-schematics-elements',
    title: 'PWA, Schematics & Elements',
    springEquivalent: 'Spring Initializr / Micro-Frontends',
    description: 'Angular explicitly maintains Enterprise Tooling infrastructure extending past standalone logic workflows. Standardizing codebases systematically, wrapping pipelines autonomously into PWAs natively and enabling inter-framework web components synchronously.',
    snippet: String.raw`/* Angular Elements (Micro-Frontend wrapping component natively) */
import { createCustomElement } from '@angular/elements';

const MyButtonElement = createCustomElement(AngularButtonComponent, { 
  injector: this.injector 
});
customElements.define('custom-angular-button', MyButtonElement);

// Exposing logic executing universally without framework requirements
// <custom-angular-button text="Click"></custom-angular-button>`,
    questions: [
      {
        question: 'What explicit functionalities do Angular Service Workers execute supporting PWAs?',
        answer: 'Service Workers intercept active network requests autonomously acting strictly as localized Client-Side proxy networks intelligently querying dynamic caching manifests yielding functional Offline capability routing seamlessly simultaneously enabling Native OS Notification Push pipelines synchronously.'
      },
      {
        question: 'What are Angular Schematics targeting structurally?',
        answer: 'Schematics specifically provide extensible structural templating manipulation pipelines generating application logic structures (<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng generate</code>) systematically enforcing stringent structural architecture constraints universally upgrading deprecation layers autonomously executing logic code modifications.'
      },
      {
        question: 'What are Angular Elements executing precisely?',
        answer: 'Angular Elements structurally compile standard internal directive components explicitly into Native Browser Web Components enabling frameworks identical as React, Vue or basic Vanilla DOM implementations execution access bypassing full independent framework loading sequences entirely.'
      }
    ]
  },
  {
    id: 'dynamic-components',
    title: 'Dynamic Components',
    springEquivalent: 'Reflection / Dynamic Proxies',
    description: 'Occasionally, building the UI dynamically at runtime is required rather than hardcoding static selectors like `<app-banner>` in a template. Angular can orchestrate instantiating actual physical components blindly executing Javascript logic inserting elements directly against target DOM anchors dynamically.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-dynamic-host',
  template: \`
    <button (click)="loadAd()">Load Advertisement</button>
    <!-- The #anchor is a template reference variable tracking location -->
    <ng-container #anchor></ng-container>
  \`
})
export class DynamicHostComponent {
  // Queries the template finding the marker
  @ViewChild('anchor', { read: ViewContainerRef }) 
  container!: ViewContainerRef;

  loadAd() {
    this.container.clear();
    // Programmatically generates and inserts the component dynamically
    const componentRef = this.container.createComponent(AdBannerComponent);
    
    // Pass strictly required Inputs dynamically programmatically
    componentRef.instance.adData = { text: 'Buy Now!' };
  }
}`,
    questions: [
      {
        question: 'What exactly is a ViewContainerRef?',
        answer: 'It represents a dynamically bound container fundamentally anchored natively to an existing host DOM element structure where one or more visually autonomous Views can be dynamically attached, detached, or structurally reordered during physical runtime.'
      },
      {
        question: 'Why avoid Angular Compiler logic explicitly inside dynamic contexts?',
        answer: 'If your templates attempt string interpolation dynamically (i.e. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">compile(\`<div>{{count}}</div>\`)</code>) at runtime, this mandates shipping Angular\'s heavy framework JIT Compiler compiler payload strictly to the client\'s browser. Factory compilation (AOT) rigorously prefers <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">createComponent()</code> which runs 10x faster executing pre-compiled Javascript definitions directly.'
      }
    ]
  },
  {
    id: 'angular-animations',
    title: 'Angular Animations',
    springEquivalent: 'JavaFX / UI Transitions',
    description: 'Angular explicitly maintains an advanced animation DSL (Domain Specific Language) that hooks natively into component state machines natively integrating with change detection seamlessly triggering performant GPU-accelerated CSS sequences gracefully upon element addition, removal, or distinct logical state transition events natively.',
    snippet: String.raw`import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-toggle',
  // Attach animation definitions physically on the Component Context
  animations: [
    trigger('openClose', [
      state('open', style({ height: '200px', opacity: 1, backgroundColor: 'yellow' })),
      state('closed', style({ height: '0px', opacity: 0, backgroundColor: 'green' })),
      // Duration & Timing functions defining the explicit tween interpolation
      transition('open => closed', [ animate('1s ease-in') ]),
      transition('closed => open', [ animate('0.5s ease-out') ])
    ])
  ],
  template: \`
    <!-- Bind the specific trigger name directly mapping component variables -->
    <div [@openClose]="isOpen ? 'open' : 'closed'" class="box">
      Animated Box
    </div>
  \`
})
export class ToggleComponent { isOpen = false; }`,
    questions: [
      {
        question: 'Define the architectural purpose governing trigger, state, and transition.',
        answer: '<code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">trigger()</code> globally defines the declarative animation name specifically matching the HTML template attribute mapping. <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">state()</code> firmly declares concrete CSS endpoints (i.e. opacity 0 statically). Finally <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">transition()</code> physically defines the active animated mathematical tween bridging the gap transitioning identically specifically between those static anchors simultaneously.'
      }
    ]
  },
  {
    id: 'i18n-localization',
    title: 'Internationalization (i18n)',
    springEquivalent: 'ResourceBundle / MessageSource',
    description: 'Enterprise applications mandate serving multiple localized languages effortlessly. Angular implements i18n completely at the build phase rather than runtime rendering drastically enhancing initial load speeds.',
    snippet: String.raw`@Component({
  standalone: true,
  template: \`
    <!-- The i18n attribute flags this element explicitly for extraction pipeline -->
    <h1 i18n="User Welcome Header|An introduction header for the site@@welcomeHeader">
      Hello World!
    </h1>
    
    <!-- Interpolation handling complicated implicit pluralization branching natively -->
    <span i18n>
      Updated {minutes, plural, 
        =0 {just now} 
        =1 {one minute ago} 
        other {{{minutes}} minutes ago}
      }
    </span>
  \`
})
export class GreetingComponent {}`,
    questions: [
      {
        question: 'What are the explicit four phases mapping Angular template translation specifically?',
        answer: '1) <strong>Marking</strong> text locally inside templates explicitly with <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">i18n</code> attributes natively. 2) <strong>Extracting</strong> them systematically creating an XLIFF xml translation baseline physically via <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng extract-i18n</code>. 3) <strong>Translating</strong> the xml structure manually natively substituting specific dialects locally. 4) <strong>Merging</strong> directly executing <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">ng build --localize</code> statically generating fully independent separate distribution application builds individually per language locale strictly.'
      },
      {
        question: 'What explicit purpose does assigning a custom ID solve?',
        answer: 'By appending <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">@@myId</code> directly physically at the end of the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">i18n</code> string natively, you lock the specific identifier permanently. By default Angular generates volatile Hashes based on text content—meaning if a developer fixes a typo replacing "Hello" to "Hello!", the Hash entirely breaks effectively deleting the mapped French/Spanish translations systemically.'
      }
    ]
  },
  {
    id: 'web-workers',
    title: 'Web Workers',
    springEquivalent: '@Async / ThreadPoolTaskExecutor',
    description: 'Javascript runs exclusively on one single main thread synchronously. Complicated looping mathematics aggressively locks the UI permanently preventing screen repaints stuttering animations completely. Web Workers rigorously offload structural math executing heavily strictly upon isolated silent background browser threads seamlessly.',
    snippet: String.raw`// Generating a worker locally: ng generate web-worker data-processor

// data-processor.worker.ts (Isolated background Thread context)
addEventListener('message', ({ data }) => {
  // Heavy computation executes cleanly
  const result = fibonacci(data); 
  // Dispatch native message identically back targeting main thread
  postMessage(result);
});

// app.component.ts (Main UI rendering Thread context)
const worker = new Worker(new URL('./data-processor.worker', import.meta.url));

// Asynchronously dispatching workload to background
worker.postMessage(42);

// Listening physically asynchronously upon computation finalization natively
worker.onmessage = ({ data }) => {
  console.log('Result fully computed silently:', data);
};`,
    questions: [
      {
        question: 'What are fundamental limitations heavily restricting Web Workers usage?',
        answer: 'Web Workers function entirely structurally isolated contextually isolated essentially natively divorced fully separating from the <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">window</code> object. Consequently, you are forbidden modifying the DOM physically, restricted heavily from observing <code class="rounded bg-slate-200 px-1 py-0.5 text-sm dark:bg-slate-700">localStorage</code> identically or triggering Angular Navigation rendering cycles fundamentally since they strictly execute inside abstract abstract memory confines detached.'
      }
    ]
  }
];
