
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { HomeLayoutComponent } from "./layout/home-layout/home-layout.component";
import { HomePageComponent } from "./pages/home-page.component/home-page.component";


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
        component: ProductDetailComponent
      },
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
