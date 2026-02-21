import { Component, input, effect, ElementRef, viewChild } from '@angular/core';

// We explicitly import Prism and the TypeScript language definition
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';

@Component({
  selector: 'app-code-block',
  imports: [],
  template: `
    <pre class="overflow-x-auto text-sm leading-6"><code #codeElement class="language-typescript"></code></pre>
  `
})
export class CodeBlock {
  code = input.required<string>();

  private codeElement = viewChild.required<ElementRef<HTMLElement>>('codeElement');

  constructor() {
    effect(() => {
      // The effect depends on `code()`. 
      // When the code changes, wait for the view to update, then highlight.
      const currentCode = this.code();
      if (currentCode) {
        // Use setTimeout to ensure the view child is ready
        setTimeout(() => {
          const el = this.codeElement().nativeElement;
          // Clear any previous Prism-generated HTML and set raw text
          el.textContent = currentCode;
          Prism.highlightElement(el);
        }, 0);
      }
    });
  }
}
