import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  @ViewChild('dynamicText', {static: true}) dynamicText!: ElementRef<HTMLTitleElement>;


  ngOnInit(): void {
    this.animateText()
  }

  async animateText(){
    // const el = this.subtitle.nativeElement;

    // let textSplit = el.textContent?.split('');


    // let letterCount = el.textContent?.length;
    // el.textContent = "";

    // textSplit?.map((letter, indexOfLetter) => {
    //   setTimeout(() => {
    //     el.textContent += letter;
    //   }, 100*indexOfLetter)
    // })


    // setTimeout(() => {
    //   el.textContent = "Find your perfect photographer, today.";
    //   textSplit = el.textContent?.split('');
    //   el.textContent = "";

    //   textSplit?.map((item, line) => {
    //     setTimeout(() => {
    //       el.textContent += item;
    //     }, 100*line)
    //   });
    // }, 100*letterCount! + 2000)

    const el = this.dynamicText.nativeElement;
    let indexOfText = 0.
    while (true) {
        // Split text into an array of characters
        let texts = ["Find your perfect photographer, today.", "Showcase your talent, find your clients."];
        let text = texts[indexOfText];

        let textSplit = text!.split('');

        // Loop through each letter
        for (let i = 0; i < textSplit.length; i++) {
          el.textContent = "";
            setTimeout(() => {
                el.textContent += textSplit[i];
            }, 100 * i);
        }

        // Wait for the animation to complete
        await new Promise(resolve => setTimeout(resolve, 100 * textSplit.length + 3000))
          .catch(
            error => console.log('oi this is an error: ' + error)
          );

        indexOfText++;

        if (indexOfText >= texts.length){
          indexOfText = 0;
        }
    }
  }

  toggleAnswer(ref: HTMLDivElement){
    ref.classList.toggle('isActive');
  }
}
