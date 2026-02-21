export interface TransitionTopic {
  id: string;
  title: string;
  springEquivalent: string;
  description: string;
  snippet: string;
}

export const TRANSITION_TOPICS: TransitionTopic[] = [
  {
    id: 'components-templates',
    title: 'Components & Templates',
    springEquivalent: '@Controller / Thymeleaf',
    description:
      'Treat a component as a browser-side controller plus view. The class owns state and behavior, and the template is the UI projection of that state without server page refreshes.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-orders-page',
  template: \`
    <h2>Recent Orders</h2>
    @for (order of orders(); track order.id) {
      <p>{{ order.number }} - {{ order.status }}</p>
    }
  \`
})
export class OrdersPageComponent {
  private readonly ordersApi = inject(OrdersApiService);
  readonly orders = signal<OrderSummary[]>([]);

  ngOnInit(): void {
    this.ordersApi.findRecent().subscribe((data) => this.orders.set(data));
  }
}`
  },
  {
    id: 'services-di',
    title: 'Services & Dependency Injection',
    springEquivalent: '@Service & @Autowired',
    description:
      'Angular services are your business/use-case layer in the frontend. Use DI scopes and `providedIn` the same way you choose singleton beans in Spring.',
    snippet: String.raw`@Injectable({ providedIn: 'root' })
export class BillingService {
  private readonly http = inject(HttpClient);

  createInvoice(command: CreateInvoiceCommand): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>('/api/invoices', command);
  }
}

@Component({ standalone: true, selector: 'app-checkout', template: '' })
export class CheckoutComponent {
  private readonly billing = inject(BillingService);

  submit(command: CreateInvoiceCommand): void {
    this.billing.createInvoice(command).subscribe();
  }
}`
  },
  {
    id: 'rxjs-observables',
    title: 'RxJS and Observables',
    springEquivalent: 'Project Reactor Flux/Mono',
    description:
      'If Reactor is your server stream model, RxJS is the client equivalent. You compose async flows with operators and share results across components.',
    snippet: String.raw`@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly http = inject(HttpClient);

  readonly notifications$ = timer(0, 10000).pipe(
    switchMap(() => this.http.get<Notification[]>('/api/notifications')),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}`
  },
  {
    id: 'routing-lazy-loading',
    title: 'Routing & Lazy Loading',
    springEquivalent: '@RequestMapping',
    description:
      'The Angular router maps browser paths to components, like Spring maps paths to handlers. Lazy loading is similar to loading only the feature modules you need at request time.',
    snippet: String.raw`export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin/admin.page').then((m) => m.AdminPageComponent)
  }
];`
  },
  {
    id: 'forms-validation',
    title: 'Forms & Validation',
    springEquivalent: 'Bean Validation @Valid',
    description:
      'Reactive Forms give you an explicit form model like validating a DTO in Spring. Validators define rules, and invalid state is tracked before submit.',
    snippet: String.raw`@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ''
})
export class ProfileFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    age: [18, [Validators.min(18)]]
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // map form value to command object and send to API
  }
}`
  },
  {
    id: 'change-detection-zones',
    title: 'Change Detection & Zones',
    springEquivalent: 'N/A (UI Rendering Loop)',
    description:
      'Spring does not need a render loop, but Angular does. Change detection decides when to repaint UI, and Zones help Angular know that async work happened.',
    snippet: String.raw`@Component({
  standalone: true,
  selector: 'app-live-clock',
  template: \`{{ now() | date : 'mediumTime' }}\`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveClockComponent {
  private readonly zone = inject(NgZone);
  readonly now = signal(new Date());

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      setInterval(() => this.zone.run(() => this.now.set(new Date())), 1000);
    });
  }
}`
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    springEquivalent: 'Caching',
    description:
      'Think in terms of minimizing expensive recomputation and duplicate calls. Cache server responses, render only what changed, and track stable list identities.',
    snippet: String.raw`@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  private readonly http = inject(HttpClient);

  readonly products$ = this.http.get<Product[]>('/api/products').pipe(
    shareReplay({ bufferSize: 1, refCount: false })
  );
}

@Component({ standalone: true, selector: 'app-catalog', template: '' })
export class CatalogComponent {
  private readonly catalog = inject(ProductCatalogService);
  readonly products = toSignal(this.catalog.products$, {
    initialValue: [] as Product[]
  });

  trackById = (_: number, product: Product) => product.id;
}`
  },
  {
    id: 'testing',
    title: 'Testing',
    springEquivalent: 'JUnit/Mockito',
    description:
      'Angular tests mirror Spring tests: configure a test context, inject collaborators, and assert behavior. Use TestBed as your test container.',
    snippet: String.raw`describe('BillingService', () => {
  it('posts invoices to the API', () => {
    TestBed.configureTestingModule({
      providers: [BillingService, provideHttpClient(), provideHttpClientTesting()]
    });

    const service = TestBed.inject(BillingService);
    const http = TestBed.inject(HttpTestingController);

    service.createInvoice({ customerId: 'c-1', amount: 42 }).subscribe();

    const req = http.expectOne('/api/invoices');
    expect(req.request.method).toBe('POST');
  });
});`
  },
  {
    id: 'state-management-ngrx',
    title: 'State Management / NgRx',
    springEquivalent: 'Distributed Cache',
    description:
      'NgRx centralizes frontend state and replayable events. Like a distributed cache plus event log, every component can read consistent state and react to updates.',
    snippet: String.raw`@Injectable({ providedIn: 'root' })
export class CartFacade {
  private readonly store = inject(Store);

  readonly items$ = this.store.select(selectCartItems);
  readonly total$ = this.store.select(selectCartTotal);

  addItem(item: CartItem): void {
    this.store.dispatch(CartActions.addItem({ item }));
  }
}`
  },
  {
    id: 'security',
    title: 'Security',
    springEquivalent: 'Security Filter Chains',
    description:
      'Interceptors are closest to a frontend filter chain. They append auth headers, normalize errors, and enforce cross-cutting security behavior per request.',
    snippet: String.raw`export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStore = inject(TokenStoreService);
  const token = tokenStore.token();

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: \`Bearer \${token}\` }
    })
  );
};`
  },
  {
    id: 'cli-builds',
    title: 'Angular CLI & Builds',
    springEquivalent: 'Maven/Gradle',
    description:
      'The CLI is your frontend build pipeline: scaffolding, linting, testing, bundling, and environment-specific outputs. Build configurations play the role of Spring profiles.',
    snippet: String.raw`export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl }
  ]
});

@Injectable({ providedIn: 'root' })
export class BuildAwareApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  health() {
    return this.http.get(\`\${this.baseUrl}/actuator/health\`);
  }
}`
  },
  {
    id: 'signals',
    title: 'Signals',
    springEquivalent: 'N/A (Fine-Grained Reactivity)',
    description:
      'Signals are Angular’s modern local reactivity primitive. Writable signals store state, computed signals derive values, and Angular updates only dependent UI parts.',
    snippet: String.raw`@Component({ standalone: true, selector: 'app-counter', template: '' })
export class CounterComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}`
  }
];
