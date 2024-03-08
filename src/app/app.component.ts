import { ChangeDetectorRef, Component, NgZone  } from "@angular/core";

declare var annyang: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  capturedText: string = '';
  private isRecording: boolean = false;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    if (annyang) {
      annyang.debug();
      annyang.addCommands({
        'result': (phrases: string[]) => {
          this.ngZone.run(() => {
            console.log("Hello");
            this.capturedText = phrases[0];
            this.cdr.detectChanges();
          });
        }
      });
  
      setTimeout(() => {
        annyang.start();
      }, 1000); // Start after a 1-second delay (adjust as needed)
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
