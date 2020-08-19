import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-secure-img",
  templateUrl: "./secure-img.component.html",
  styleUrls: ["./secure-img.component.styl"],
})
export class SecureImgComponent implements OnInit {
  @Input() slide: string;
  private urldom: string = environment.endpoints.archivos;
  private imgb64: string = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url: string = this.urldom + this.slide;
    const headers = new HttpHeaders();
    this.http
      .get(url, {
        headers,
        responseType: "text",
      })
      .subscribe(
        (src) => {
          console.log(src);
          this.imgb64 = src;
        },
        () => {
          console.log("assets/images/fallback.jpg");
          this.imgb64 = "assets/images/fallback.jpg";
        }
      );
  }
}
