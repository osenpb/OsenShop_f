import { MyOrdersComponent } from "./pages/my-orders-page/my-orders-page.component";

const orderRoutes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyOrdersComponent
      },
      // {
      //   path: 'detail/:id',
      //   component: OrderDetailPageComponent

      // },
    ],
  },
];

export default orderRoutes;
