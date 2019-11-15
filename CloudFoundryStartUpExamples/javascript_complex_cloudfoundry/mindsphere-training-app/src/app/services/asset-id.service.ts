import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetIdService {
  // Set this variable to your asset id you have created before.
  readonly assetId = '54bc4154fb494509a15ac32bfe03ce0f';

  constructor() { }
}
