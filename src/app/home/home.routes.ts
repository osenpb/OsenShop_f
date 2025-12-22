

import { CartDetailPageComponent } from "./cart/pages/cart-detail-page/cart-detail-page.component";
import { ProductDetailComponent } from "./product/components/product-detail/product-detail.component";
import { HomeLayoutComponent } from "./layout/home-layout/home-layout.component";
import { HomePageComponent } from "./pages/home-page.component/home-page.component";
import { ProductDetailPageComponent } from "./product/product-detail-page.component/product-detail-page.component";
import { CheckoutFormPageComponent } from "./order/pages/checkout-form-page/checkout-form-page.component";


const homeRoutes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'index',
        component: HomePageComponent
      },
      {
        path: 'product/detail/:id',
        component: ProductDetailPageComponent
      },
      {
        path: 'cart',
        component: CartDetailPageComponent
      },
      {
        path: 'checkout',
        component: CheckoutFormPageComponent
      }
      // {
      //   path: 'about',
      // },
      // {
      //   path: 'brands',
      // },

    ],
  },

];

export default homeRoutes;
