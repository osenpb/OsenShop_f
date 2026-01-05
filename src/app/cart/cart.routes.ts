import { CartDetailPageComponent } from "./pages/cart-detail-page/cart-detail-page.component";


const cartRoutes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CartDetailPageComponent
      },
    ],
  },
];

export default cartRoutes;
