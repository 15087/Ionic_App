import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {


  navigationSubscription;
  categories: any;
  category: any;


  constructor(private categoryService: CategoryService, public loadingController: LoadingController, private router: Router, public route: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }


  async getCategories() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.categoryService.getCategories()
      .subscribe(res => {
        console.log(res);
        this.categories = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
    });
  }

  async getCategory() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.categoryService.getCategory(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.category = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async deleteCategory(id) {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.categoryService.deleteCategory(id)
      .subscribe(res => {
        console.log(res);
        this.category = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
    });
    this.getCategories();
  }





}