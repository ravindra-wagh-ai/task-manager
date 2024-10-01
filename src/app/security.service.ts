import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private api: ApiService, private store: StoreService) {}
  async check(email: any, password: any): Promise<Observable<any>> {
    let body = {
      query:
        'query signin ($input:InputSignIn!) { signin (input:$input){ token } }',
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
    };
    let token = this.store.getData('xt');
    return await this.api.post(token, body);
  }
  token() {
    return this.store.getData('xt');
  }
  async isAuthenticated(): Promise<Observable<any>> {
    let token = this.token();
    let body = {
      query: 'query signin ($token: String!) { verify (token: $token) }',
      variables: {
        token: token,
      },
    };
    let result = await this.api.post(token, body);
    return result?.data?.verify;
  }
}
