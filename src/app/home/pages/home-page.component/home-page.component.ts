import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CategoryListComponent } from "../../components/category-list/category-list.component";
import { NewsletterFormComponent } from "../../components/newsletter-form/newsletter-form.component";
import { ImageHeaderComponent } from "../../layout/image-header/image-header.component";
import { ProductListComponent } from '../../../product/components/product-list/product-list.component';


@Component({
  selector: 'app-home-page',
  imports: [ProductListComponent, CategoryListComponent, NewsletterFormComponent, ImageHeaderComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
