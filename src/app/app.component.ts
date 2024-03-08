import { Component, NgZone  } from "@angular/core";

declare var annyang: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  capturedText: string = '';
  private isRecording: boolean = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Initialize annyang
    if (annyang) {
      annyang.debug();
      annyang.addCallback('result', (phrases: string[]) => {
        this.ngZone.run(() => {
          this.capturedText = phrases[0];
        });
      });
    }
  }

  startRecording() {
    if (annyang && !this.isRecording) {
      this.isRecording = true;
      annyang.start();
    }
  }

  stopRecording() {
    if (annyang && this.isRecording) {
      this.isRecording = false;
      annyang.abort();
    }
  }
}
