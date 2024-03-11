import {Injectable} from "@angular/core";
import {ProductService} from "../services/product.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {
  GetAllProductsAction, GetAllProductsActionError,
  GetAllProductsActionSuccess,
  ProductsActions,
  ProductsActionsTypes
} from "./products.actions";
import {catchError, map, mergeMap} from "rxjs/operators";

@Injectable()
export  class  ProductsEffects{
  constructor(private  productService: ProductService, private effectActions: Actions) {

  }

  getAllProductsEffect: Observable<Action> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action) => {
        return this.productService.getProducts()
          .pipe(
            map((products) => new GetAllProductsActionSuccess(products)),
            catchError((err) => of(new GetAllProductsActionError(err)))
          )
      })
    )
  );



}
