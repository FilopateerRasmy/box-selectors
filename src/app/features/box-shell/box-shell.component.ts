import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { BoxStateService } from './service/box-state.service';
import { AsyncPipe } from '@angular/common';
import {  fromEvent, map } from 'rxjs';
import { BoxNumericValueComponent } from './components/box-numeric-value/box-numeric-value.component';
import { SelectorBoxComponent } from './components/selector-box/selector-box.component';
import { Storage } from '../../shared/enums/storage.enum';
import { Box } from './interfaces/box';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-box-shell',
  standalone: true,
  imports: [SelectorBoxComponent, AsyncPipe, BoxNumericValueComponent, ButtonModule],
  templateUrl: './box-shell.component.html',
  styleUrl: './box-shell.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BoxShellComponent implements OnInit, AfterViewInit {
  boxStateService = inject(BoxStateService);
  boxCount$ = this.boxStateService.boxCountObservable$;
  isSelectedBox = this.boxStateService.selectedBoxObservable.pipe(map(res => res?.selected));
  boxNumericValue = this.boxStateService.boxNumericValueObservable$
  totalValue$ = this.boxStateService.totalSelectedValueObservable
  @ViewChild('clearBtn') clearBtn!:ElementRef;

  ngOnInit(): void {
      this.populateBoxStateOnReload()
  }

  ngAfterViewInit(): void {
      this.handleClearBoxStatesEvent()
  }

  populateBoxStateOnReload(){
   const boxStateData =  <{boxes:Box[], selectedBox:Box, totalSelectedValue:number } | null>JSON.parse((sessionStorage.getItem(Storage.BoxStorage) as string))
   if (boxStateData){
    this.boxStateService.populateBoxes(boxStateData.boxes);
    this.boxStateService.populateSelectedBox(boxStateData.selectedBox)
   }
  }

  handleClearBoxStatesEvent(){
    fromEvent(this.clearBtn.nativeElement, 'click').subscribe(
      () => {
        this.boxStateService.clearBoxStates()
      }
    )
  }
}
