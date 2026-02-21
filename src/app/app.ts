import { Component, computed, inject, signal } from '@angular/core';
import { GuideTopicsService } from './guide-topics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly guideTopics = inject(GuideTopicsService);

  readonly topics = this.guideTopics.topics;
  readonly selectedTopic = this.guideTopics.selectedTopic;

  readonly counter = signal(0);
  readonly doubledCounter = computed(() => this.counter() * 2);
  readonly counterStatus = computed(() => {
    const value = this.counter();
    if (value === 0) {
      return 'Baseline';
    }
    return value > 0 ? 'Positive Trend' : 'Negative Trend';
  });

  selectTopic(topicId: string): void {
    this.guideTopics.selectTopic(topicId);
  }

  isActive(topicId: string): boolean {
    return this.guideTopics.isActive(topicId);
  }

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
