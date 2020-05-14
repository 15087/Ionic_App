import { NoteService } from 'src/app/services/note.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormArray,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  noteForm: FormGroup;
  categories: any;
  category: any;

  constructor(
    public api: NoteService,
    public apiCat: CategoryService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getCategories();
    this.noteForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  async getCategories() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.apiCat.getCategories()
      .subscribe(res => {
        console.log(res);
        this.categories = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
    });
  }

  async addNote(){
    this.category = this.noteForm.value.category.split('|');
    this.noteForm.value.category = {'id': Number(this.category[0]), 'name': this.category[1]};
    const loading = await this.loadingController.create();
    await loading.present();
    await this.api.addNote(this.noteForm.value)
    .subscribe(res => {
        this.router.navigate(['/notes']);
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
    });
  }

  ngOnInit() {
    this.getCategories();
  }
}