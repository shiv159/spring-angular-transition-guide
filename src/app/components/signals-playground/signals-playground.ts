import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-signals-playground',
  imports: [],
  template: `
    <section class="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900/50 dark:bg-cyan-950/30">
      <h3 class="text-xl font-bold text-cyan-900 dark:text-cyan-100">Signals Playground</h3>
      <p class="mt-2 text-sm text-cyan-800 dark:text-cyan-300">
        Writable signal: <code>counter</code>. Computed signal: <code>doubledCounter</code> and
        <code>counterStatus</code>.
      </p>

      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <article class="rounded-xl border border-cyan-200 bg-white p-3 dark:border-cyan-800 dark:bg-slate-900">
          <p class="text-xs uppercase tracking-wide text-cyan-700 dark:text-cyan-400">Counter</p>
          <p class="mt-1 text-2xl font-bold text-cyan-900 dark:text-cyan-50">{{ counter() }}</p>
        </article>
        <article class="rounded-xl border border-cyan-200 bg-white p-3 dark:border-cyan-800 dark:bg-slate-900">
          <p class="text-xs uppercase tracking-wide text-cyan-700 dark:text-cyan-400">Computed Double</p>
          <p class="mt-1 text-2xl font-bold text-cyan-900 dark:text-cyan-50">{{ doubledCounter() }}</p>
        </article>
        <article class="rounded-xl border border-cyan-200 bg-white p-3 dark:border-cyan-800 dark:bg-slate-900">
          <p class="text-xs uppercase tracking-wide text-cyan-700 dark:text-cyan-400">Computed Status</p>
          <p class="mt-1 text-xl font-semibold text-cyan-900 dark:text-cyan-50">{{ counterStatus() }}</p>
        </article>
      </div>

      <div class="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          class="rounded-lg border border-cyan-300 bg-white px-4 py-2 text-sm font-semibold text-cyan-900 transition hover:bg-cyan-100 dark:border-cyan-700 dark:bg-slate-900 dark:text-cyan-100 dark:hover:bg-cyan-900/50"
          (click)="decrementCounter()"
        >
          Decrement
        </button>
        <button
          type="button"
          class="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600"
          (click)="incrementCounter()"
        >
          Increment
        </button>
        <button
          type="button"
          class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          (click)="resetCounter()"
        >
          Reset
        </button>
      </div>
    </section>
  `
})
export class SignalsPlayground {
  readonly counter = signal(0);
  readonly doubledCounter = computed(() => this.counter() * 2);
  readonly counterStatus = computed(() => {
    const value = this.counter();
    if (value === 0) {
      return 'Baseline';
    }
    return value > 0 ? 'Positive Trend' : 'Negative Trend';
  });

  incrementCounter(): void {
    this.counter.update((value) => value + 1);
  }

  decrementCounter(): void {
    this.counter.update((value) => value - 1);
  }

  resetCounter(): void {
    this.counter.set(0);
  }
}
