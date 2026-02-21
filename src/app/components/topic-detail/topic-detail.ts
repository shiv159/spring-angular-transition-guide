import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GuideTopicsService } from '../../guide-topics.service';
import { SignalsPlayground } from '../signals-playground/signals-playground';
import { CodeBlock } from '../code-block/code-block';

@Component({
  selector: 'app-topic-detail',
  imports: [SignalsPlayground, CodeBlock],
  template: `
    @if (topic(); as t) {
      <section class="space-y-6">
        <div class="space-y-3">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <h2 class="text-3xl font-bold text-slate-900 dark:text-slate-100">{{ t.title }}</h2>
            <span
              class="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/30 dark:text-amber-300"
            >
              Spring Equivalent: {{ t.springEquivalent }}
            </span>
          </div>
          <p class="max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300" [innerHTML]="t.description"></p>
        </div>

        <section class="rounded-2xl border border-slate-200 bg-slate-900/95 p-4 dark:border-slate-800 dark:bg-black/95">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            TypeScript Example
          </p>
          <app-code-block [code]="t.snippet" />
        </section>

        @if (t.questions && t.questions.length > 0) {
          <section class="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/20">
            <h3 class="mb-4 flex items-center gap-2 text-lg font-bold text-indigo-900 dark:text-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5 text-indigo-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              Tricky Interview Questions
            </h3>
            <div class="space-y-6">
              @for (q of t.questions; track q.question) {
                <div class="relative pl-4 before:absolute before:left-0 before:top-1.5 before:bottom-1 before:w-1 before:rounded-full before:bg-indigo-300 dark:before:bg-indigo-700">
                  <p class="mb-1 font-semibold text-slate-800 dark:text-slate-200">{{ q.question }}</p>
                  <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400" [innerHTML]="q.answer"></p>
                </div>
              }
            </div>
          </section>
        }

        @if (t.id === 'signals') {
          <app-signals-playground />
        }
      </section>
    } @else {
      <p class="text-slate-600 dark:text-slate-400">Topic not found.</p>
    }
  `
})
export class TopicDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly guideTopics = inject(GuideTopicsService);

  private readonly routeParams = toSignal(this.route.paramMap);

  readonly topic = computed(() => {
    const id = this.routeParams()?.get('id');
    return id ? this.guideTopics.topics().find(t => t.id === id) : null;
  });
}
