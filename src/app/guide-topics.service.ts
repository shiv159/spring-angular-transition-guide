import { Injectable, computed, signal } from '@angular/core';
import { TRANSITION_TOPICS, TransitionTopic } from './transition-topics';

@Injectable({ providedIn: 'root' })
export class GuideTopicsService {
  private readonly allTopics = signal<TransitionTopic[]>(TRANSITION_TOPICS);
  private readonly activeTopicId = signal(this.allTopics()[0]?.id ?? '');

  readonly topics = computed(() => this.allTopics());
  readonly selectedTopic = computed(
    () =>
      this.topics().find((topic) => topic.id === this.activeTopicId()) ??
      this.topics()[0] ??
      null
  );

  selectTopic(topicId: string): void {
    this.activeTopicId.set(topicId);
  }

  isActive(topicId: string): boolean {
    return this.activeTopicId() === topicId;
  }
}
