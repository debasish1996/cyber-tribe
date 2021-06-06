import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DirtyService {
  isPendingDirty: boolean = false;
  constructor() {}
}
