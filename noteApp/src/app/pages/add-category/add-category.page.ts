import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, public loadingController: LoadingController, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      'name' : [null, Validators.required],
    });
  }

  async addCategory(){
    const loading = await this.loadingController.create();
    await loading.present();
    await this.categoryService.addCategory(this.categoryForm.value)
    .subscribe(res => {
        this.router.navigate(['/categories']);
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
    });
  }
  
  ngOnInit() {
  }
}