import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { BoxStateService } from '../../service/box-state.service';

@Component({
  selector: 'app-box-numeric-value',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './box-numeric-value.component.html',
  styleUrl: './box-numeric-value.component.scss',
})
export class BoxNumericValueComponent {
  boxStateService = inject(BoxStateService);
  @ViewChild('numericBox') numericBox!: ElementRef;
  @Input({ required: true }) value!: number;
  ngAfterViewInit(): void {
    fromEvent(this.numericBox.nativeElement, 'click', (event) => {
      this.boxStateService.updateBoxNumericValue(
        (event as any).srcElement.innerText
      );
    }).subscribe();
  }
}
