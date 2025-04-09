import dayjs from 'dayjs';

import { Http } from './http';
import { Route } from '@/models/route.type';
import { User } from '@/models/user.type';

export class API {
  public readonly http: Http;

  constructor() {
    // instancia Http com o ip do front com a porta do back
    this.http = new Http(`http://${location.hostname}:3000`);
  }

  public login(cpf: string, password: string): Promise<string> {
    return this.http
      .request('/auth/login', {
        method: 'POST',
        data: { cpf, password },
      })
      .then((response) => response.data.access_token);
  }

  public getUser() {
    return this.http.request<User>('/user').then((response) => response.data);
  }

  public getRoutes(
    // data inicial padrão de 7 dias
    from: Date = dayjs().subtract(7, 'days').startOf('day').toDate(),
    to: Date = dayjs().toDate()
  ) {
    // GET http://backend/route?from=&to=
    return this.http
      .request<Route[]>('/route', { params: { from, to } })
      .then((response) => response.data);
  }
}
