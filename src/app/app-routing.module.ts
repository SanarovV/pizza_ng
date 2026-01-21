import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./views/layout.component";

const routes: Routes = [
  // Lazy (ленивая загрузка, для того что бы модули открывались при открытии страницы, а не загружались все модули сразу
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)},
      {path: 'order', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)},
      {path: 'products', loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)},
    ]
  },

  {path: 'pizzas', redirectTo: 'products'}, // это если допустим у нас был старый адрес то нас переведет на нужный
  {path: '**', redirectTo: ''}, // если у нас нечего не сработало то выводит на главную страницу
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
