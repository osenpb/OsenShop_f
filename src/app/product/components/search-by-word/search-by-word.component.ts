import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-search-by-word',
  imports: [],
  template: `
    <input
    type="text"
    placeholder="BUSCAR PRODUCTO..."
    class="w-full bg-zinc-[#f2f2f2] border border-zinc-900 rounded-full py-3 pl-12 pr-4 text-[10px] tracking-[0.2em] text-black placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-800 transition-all duration-500 font-mono uppercase"
  >


  `,
  //templateUrl: './search-by-word.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchByWordComponent {

}
