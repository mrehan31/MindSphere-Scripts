import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of, Observable, concat } from 'rxjs';

import { AssetData } from '../model/asset-data';
import { AssetIdService } from 'src/app/services/asset-id.service';
import { map, catchError, switchMap } from 'rxjs/operators';

interface GetResult {
  assetId: string;
  tenantId: string;
  name: string;
  etag: string;
  description: string;
  variables: AssetVariable[];
}

interface AssetVariable {
  name: string;
  value: string;
}

interface UpdateBody {
  name: string;
  description: string;
  extenalId: string;
  variables: AssetVariable[];
}

@Injectable({
  providedIn: 'root'
})
export class OverviewMindsphereService {

  readonly assetId: string = this.assetIdService.assetId;

  // This observable is used to bind to in
  // the container component.
  asset$ = concat(
    // Set a default
    of<AssetData>({
      name: '{{ASSET_NAME}}',
      description: '{{ASSET_DESCRIPTION}}',
      variables: []
    }),
    // Load actual asset data from API
    this.loadAssetData());

  constructor(
    readonly http: HttpClient,
    readonly assetIdService: AssetIdService
  ) {
  }

  loadAssetData(): Observable<AssetData> {
    // return of<AssetData>({
      //   name: '{{ASSET_NAME}}',
      //   description: '{{ASSET_DESCRIPTION}}',
      //   variables: []
      // });

    return this.http.get<GetResult>(`/api/assetmanagement/v3/assets/${this.assetId}`)
      .pipe(
        map(res => ({
          name: res.name,
          description: res.description,
          variables: res.variables
        } as AssetData)),
        catchError(err => of<AssetData>({
          name: 'ERROR',
          description: err.message,
          variables: []
        })));
  }

  writeAssetData(assetData: AssetData): Observable<object> {
    return this.http
      .get(`/api/assetmanagement/v3/assets/${this.assetId}`)
      .pipe(
        switchMap((res: any) => {

          const body: UpdateBody = {
            name: assetData.name,
            description: assetData.description,
            extenalId: '',
            variables: assetData.variables.map(v => ({ name: v.name, value: v.value }))
          };

          const httpOptions = {
            headers: new HttpHeaders({
              'If-Match': `${res.etag}`
            })
          };

          return this.http.put(`/api/assetmanagement/v3/assets/${this.assetId}`, body, httpOptions);
        })
      );
  }
}
