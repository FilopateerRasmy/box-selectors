import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { fromEvent, map } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { Box } from '../../interfaces/box';
import { BoxStateService } from '../../service/box-state.service';

@Component({
  selector: 'app-selector-box',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './selector-box.component.html',
  styleUrl: './selector-box.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SelectorBoxComponent implements AfterViewInit{
  private boxStateService = inject(BoxStateService)
  @ViewChild('box') boxElement!:ElementRef;

  @Input({required:true}) boxData!:Box;

  isSelected = this.boxStateService.selectedBoxObservable.pipe(map( res => res?.id === this.boxData.id && res?.selected))

  ngAfterViewInit(): void {
      fromEvent(this.boxElement.nativeElement, 'click').subscribe(
       event => {
        this.boxStateService.updateBoxesList({...this.boxData, selected:true});
       }
      )
  }
}
