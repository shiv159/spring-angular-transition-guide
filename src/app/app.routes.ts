import { Routes } from '@angular/router';
import { TopicDetail } from './components/topic-detail/topic-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'topic/components-templates', pathMatch: 'full' },
    { path: 'topic/:id', component: TopicDetail },
    { path: '**', redirectTo: 'topic/components-templates' }
];
