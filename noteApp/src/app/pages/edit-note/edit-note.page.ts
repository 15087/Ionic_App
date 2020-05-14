import { LoadingController } from "@ionic/angular";
import { NoteService } from "../../services/note.service";
import { CategoryService } from "../../services/category.service";
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
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {

  note = {
    title: "Title",
    content: "Content",
    date: "Date",
    category: "Category",
  };
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
    this.getNote(this.route.snapshot.paramMap.get("id"));
    this.noteForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  ionViewWillEnter() {
    this.getNote(this.route.snapshot.paramMap.get("id"));
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
  async getNote(id) {
    const loading = await this.loadingController.create({
      message: "Loading",
    });
    await loading.present();
    await this.api.getNote(id).subscribe(
      (data) => {
        this.note = {
          title: data.title,
          content: data.content,
          date: data.date,
          category: data.category,
        };
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  async editNote() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.category = this.noteForm.value.category.split("|");
    this.noteForm.value.category = {
      id: Number(this.category[0]),
      name: this.category[1],
    };
    await this.api
      .editNote(this.route.snapshot.paramMap.get("id"), this.noteForm.value)
      .subscribe(
        (data) => {
          loading.dismiss();
        },
        (err) => {
          console.log(err);
          loading.dismiss();
        }
      );
    this.redirect();
  }

  redirect() {
    this.router.navigate(["/notes"]);
  }
  ngOnInit() {
    this.getNote(this.route.snapshot.paramMap.get("id"));
  }
}