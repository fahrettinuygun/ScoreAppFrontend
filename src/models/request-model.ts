import { HttpHeaders, HttpParams } from '@angular/common/http';

export class RequestModel {
    header: HttpHeaders;
    observe: 'body' | 'events' | 'response';
    params :HttpParams; //{[param: string]: string | string[]},
    reportProgress: boolean;
    responseType: 'arraybuffer'|'blob'|'json'|'text';
    withCredentials: boolean;
}