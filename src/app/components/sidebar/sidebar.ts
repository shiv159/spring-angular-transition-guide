import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GuideTopicsService } from '../../guide-topics.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="border-b border-slate-200/70 p-5 dark:border-slate-700/50">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">Spring Boot to Angular</p>
      <h1 class="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Interactive Transition Guide</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Pick a topic and map your Spring mental model to Angular concepts.
      </p>
      
      <div class="mt-4">
        <input 
          type="search" 
          placeholder="Search topics..." 
          class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:placeholder-slate-400"
          (input)="updateSearch($event)"
        />
      </div>
    </header>

    <nav class="max-h-[calc(100vh-16rem)] space-y-2 overflow-y-auto p-3">
      @for (topic of filteredTopics(); track topic.id) {
        <a
          [routerLink]="['/topic', topic.id]"
          routerLinkActive="!border-slate-200 !bg-white border-cyan-500 bg-cyan-50 shadow-sm dark:!border-slate-800 dark:!bg-slate-900 dark:border-cyan-500/50 dark:bg-cyan-900/30"
          [routerLinkActiveOptions]="{exact: true}"
          class="block w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-300 hover:border-cyan-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-700"
        >
          <h2 class="font-semibold text-slate-900 dark:text-slate-100">{{ topic.title }}</h2>
          <span
            class="mt-2 inline-flex rounded-full border border-cyan-200 bg-cyan-100 px-2.5 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900/50 dark:bg-cyan-900/30 dark:text-cyan-300"
          >
            {{ topic.springEquivalent }}
          </span>
        </a>
      } @empty {
        <p class="p-4 text-center text-sm text-slate-500 dark:text-slate-400">No topics found matching your search.</p>
      }
    </nav>
  `
})
export class Sidebar {
  private readonly guideTopics = inject(GuideTopicsService);

  readonly searchQuery = signal('');

  readonly filteredTopics = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const topics = this.guideTopics.topics();

    if (!query) return topics;

    return topics.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.springEquivalent.toLowerCase().includes(query)
    );
  });

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}
