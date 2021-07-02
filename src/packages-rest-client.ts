
import {PackagesClient} from './packages-client'
import {Observable, of} from 'rxjs'

class PackagesRestClient implements PackagesClient {

  deleteVersion(id: number): Observable<boolean> {
    return of(true);
  }

}