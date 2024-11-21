import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Box } from '../interfaces/box';
import { Storage } from '../../../shared/enums/storage.enum';

@Injectable({
  providedIn: 'root',
})
export class BoxStateService {

  // will contains boxes data
  private boxesSubject = new BehaviorSubject([
    { id: 1, selected: false, value: '' },
    { id: 2, selected: false, value: '' },
    { id: 3, selected: false, value: '' },
    { id: 4, selected: false, value: '' },
    { id: 5, selected: false, value: '' },
    { id: 6, selected: false, value: '' },
    { id: 7, selected: false, value: '' },
    { id: 8, selected: false, value: '' },
    { id: 9, selected: false, value: '' },
    { id: 10, selected: false, value: '' },
  ]);
  // will react to changes and update total value and selected box
  boxCountObservable$ = this.boxesSubject.asObservable().pipe(
    tap((res) => {
      const selectedBox = res.find((box) => box.selected);
      this.selectedBoxSubject.next(selectedBox || undefined);
      const totalSelectedValue = res.reduce((acc, val) => {
        return acc + +val.value;
      }, 0);
      this.totalSelectedValueSubject.next(totalSelectedValue);
      sessionStorage.setItem(
        Storage.BoxStorage,
        JSON.stringify({
          boxes: res,
          selectedBox: this.selectedBoxSubject.getValue(),
          totalSelectedValue: this.totalSelectedValueSubject.getValue(),
        })
      );
    })
  );

  private selectedBoxSubject = new BehaviorSubject<Box | undefined>(undefined);
  selectedBoxObservable = this.selectedBoxSubject.asObservable();
  // will contains values for secondary boxes that will appear by choosing a box
  private boxNumericValueSubject = new BehaviorSubject([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]);
  boxNumericValueObservable$ = this.boxNumericValueSubject.asObservable();

  private totalSelectedValueSubject = new BehaviorSubject(0);
  totalSelectedValueObservable = this.totalSelectedValueSubject.asObservable();

  updateBoxesList(boxData: Box) {
    const updatedBoxes = this.boxesSubject.getValue().map((box) => ({
      id: box.id,
      selected: boxData.id === box.id ? true : false,
      value: boxData.id === box.id ? boxData.value : box.value,
    }));
    this.boxesSubject.next(updatedBoxes);
  }

  updateBoxNumericValue(value: number) {
    const selectedBox = this.selectedBoxSubject.getValue() as Box;
    this.selectedBoxSubject.next({ ...selectedBox, value: `${value}` });
    this.updateBoxesList({ ...selectedBox, value: `${value}` });
    this.selectedBoxSubject.next({
      ...selectedBox,
      id:
        selectedBox.id === this.boxesSubject.getValue().length
          ? selectedBox.id
          : selectedBox.id + 1,
      value: '',
      selected: true,
    });
  }

  populateBoxes(boxes:Box[]){
    this.boxesSubject.next(boxes)
  }

  clearBoxStates(){
    const boxes = this.boxesSubject.getValue().map(box => ({id:box.id, value:'', selected:false}));
    this.boxesSubject.next(boxes);
    this.selectedBoxSubject.next(undefined)
  }

  populateSelectedBox(selectedBox:Box){
    this.selectedBoxSubject.next(selectedBox)
  }
}
