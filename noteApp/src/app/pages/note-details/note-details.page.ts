import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NoteService } from "../../services/note.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-notes",
  templateUrl: "./note-details.page.html",
  styleUrls: ["./note-details.page.scss"],
})
export class NoteDetailsPage implements OnInit {
  note = {
    title: "Title",
    content: "Content",
    date: "Date",
    category: "Category",
  };

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

  constructor(
    public api: NoteService,
    public loadingController: LoadingController,
    private route: ActivatedRoute
  ) {
    this.getNote(this.route.snapshot.paramMap.get("id"));
  }

  ionViewWillEnter() {
    this.getNote(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit() {
    this.getNote(this.route.snapshot.paramMap.get("id"));
  }
}