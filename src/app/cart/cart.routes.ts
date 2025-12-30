import { CartDetailPageComponent } from "./pages/cart-detail-page/cart-detail-page.component";


const cartRoutes = [
  {
    path: '',
    children: [
      {
        path: 'detail',
        component: CartDetailPageComponent
      },
    ],
  },
];
