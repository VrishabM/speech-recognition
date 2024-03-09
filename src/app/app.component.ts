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
  speechResult: string = '';

  constructor(
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    // Initialize speech recognition
    this.recognition = new (window["webkitSpeechRecognition"] || window["SpeechRecognition"])();
    this.recognition.continuous = true; // Enable continuous recognition
    this.recognition.lang = 'en-US'; // Set recognition language

    // Event listeners
    this.recognition.onresult = (event: any) => {
      // Use type assertion to specify the type of event.results
      const transcript = (event.results[event.results.length - 1])[0].transcript;
      this.speechResult += transcript;
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);

      // Handle audio-capture error
      if (event.error === 'audio-capture') {
        // alert('Please ensure that your microphone is connected and accessible.');
      }
    };
  }

  startRecording() {
    this.recognition.start();
  }

  stopRecording() {
    this.recognition.stop();
  }
}
