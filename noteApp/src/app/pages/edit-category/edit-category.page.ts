import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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