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

  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, public loadingController: LoadingController, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      'name' : [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  async getCategory(id) {
    const loading = await this.loadingController.create();
    await this.categoryService.getCategory(id).subscribe(res => {
      this.categoryForm.controls['name'].setValue(res.name);
    });
  }

  async editCategory() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.categoryService.editCategory(this.route.snapshot.paramMap.get('id'), this.categoryForm.value)
    .subscribe(res => {
      let id = res['id'];
        this.router.navigate(['/categories', JSON.stringify(id)]);
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
    });
  }

}