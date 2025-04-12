import dayjs from 'dayjs';

import { Http } from './http';
import { Route } from '@/models/route.type';
import { User } from '@/models/user.type';
import { Vehicle } from '@/models/vehicle.type';

export class API {
  public readonly http: Http;

  constructor() {
    // instancia Http com o ip do front com a porta do back
    this.http = new Http(`http://${location.hostname}:3000`);
  }

  public async login(cpf: string, password: string): Promise<string> {
    return this.http
      .request('/auth/login', {
        method: 'POST',
        data: { cpf, password },
      })
      .then(({ data }) => data.access_token);
  }

  public async getUsers() {
    return this.http.request<User[]>('/user').then(({ data }) => data);
  }

  public async getUser() {
    return this.http.request<User>('/user').then(({ data }) => data);
  }

  public async updateUser(user: User) {
    return await this.http
      .request<User>('/user', {
        method: user.id ? 'PATCH' : 'POST',
        data: user,
      })
      .then(({ data }) => data);
  }

  public async deleteUser(user: User) {
    return await this.http
      .request<User>(`/user/${user.id}`, {
        method: 'DELETE',
      })
      .then(({ data }) => data);
  }

  public async getVehicles() {
    return this.http.request<Vehicle[]>('/vehicle').then(({ data }) => data);
  }

  public async updateVehicle(vehicle: Vehicle) {
    return await this.http
      .request<Vehicle>('/vehicle', {
        method: vehicle.id ? 'PATCH' : 'POST',
        data: vehicle,
      })
      .then(({ data }) => data);
  }

  public async deleteVehicle(vehicle: Vehicle) {
    return await this.http
      .request<Vehicle>(`/user/${vehicle.id}`, {
        method: 'DELETE',
      })
      .then(({ data }) => data);
  }

  public async getRoutes(
    // data inicial padrão de 7 dias
    from: Date = dayjs().subtract(7, 'days').startOf('day').toDate(),
    to: Date = dayjs().toDate()
  ) {
    // GET http://backend/route?from=&to=
    return this.http
      .request<Route[]>('/route', { params: { from, to } })
      .then(({ data }) => data);
  }
}
