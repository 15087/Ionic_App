import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, ReactiveFormsModule, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {

  category = {name : "Name"};
  categoryForm: FormGroup;

  constructor(public api: CategoryService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
    this.getCategory(this.route.snapshot.paramMap.get("id"));
    this.categoryForm = this.formBuilder.group({
      name : [null, Validators.required],
    });
  }


  async getCategory(id) {
    const loading = await this.loadingController.create({message: "Loading"});
    await loading.present();
    await this.api.getCategory(id).subscribe(
      (data) => {
        this.category = {
          name: data.name,
        };
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async editCategory() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.editCategory(this.route.snapshot.paramMap.get('id'), this.categoryForm.value)
    .subscribe(data => {
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