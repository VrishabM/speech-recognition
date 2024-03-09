import { ChangeDetectorRef, Component, NgZone  } from "@angular/core";


declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  
  recognition: any;
  speechResult: string = "";

  constructor(
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      this.recognition = new (window["SpeechRecognition"] || window["webkitSpeechRecognition"])();
      this.recognition.continuous = true; 
      this.recognition.lang = "en-US"; 

      this.recognition.onresult = (event: any) => {
        const resultIndex = event.results.length - 1;
        this.speechResult += event.results[resultIndex][0].transcript;
      };

      this.recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };
    } else {
      console.error("SpeechRecognition API not supported in this browser.");
    }
  }

  startRecording(): void {
    console.log("Starting Recording!!!")
    this.recognition.start();
  }

  stopRecording(): void {
    console.log("Stopping Recording!!!")
    this.recognition.stop();
  }

  clearResult(): void {
    this.speechResult = "";
    this.cdr.detectChanges();
  }
}
