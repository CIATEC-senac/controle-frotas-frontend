import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { Enterprise } from '@/models/enterprise.type';
import { DetailedRoute, Route } from '@/models/route.type';
import { User } from '@/models/user.type';
import { Vehicle } from '@/models/vehicle.type';

import { History } from '@/models/history.type';
import { Maintenance } from '@/models/maintenance.type';
import { Http } from './http';

export class API {
  public readonly http: Http;

  constructor() {
    // instancia Http com o ip do front com a porta do back
    this.http = new Http(`http://192.168.15.12:3000`);
  }

  static handleError(e: Error, defaultMessage?: string) {
    if (e instanceof AxiosError) {
      const apiMessage = e.response?.data?.message;

      if (apiMessage != undefined) {
        return Array.isArray(apiMessage) ? apiMessage.at(0) : apiMessage;
      }

      return e.message;
    }

    return defaultMessage;
  }

  public async login(cpf: string, password: string): Promise<string> {
    return this.http
      .request('/auth/login', {
        method: 'POST',
        data: { cpf, password },
      })
      .then(({ data }) => data.token);
  }

  public async getUsers() {
    return this.http.request<User[]>('/user').then(({ data }) => data);
  }

  public async getTokenUser() {
    return this.http.request<User>('/token').then(({ data }) => data);
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
      .request<Vehicle>(`/user/${vehicle.id}`, { method: 'DELETE' })
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

  public async getOnGoingRoutesHistory() {
    return this.http
      .request<History[]>('/history/status/ongoing')
      .then(({ data }) => data);
  }

  public async getRoute(id: number) {
    return this.http
      .request<DetailedRoute>(`/route/${id}`)
      .then(({ data }) => data);
  }

  public async getRouteHistory(id: number) {
    return this.http
      .request<History[]>(`/route/${id}/history`)
      .then(({ data }) => data);
  }

  public async getHistory(id: number) {
    return this.http
      .request<History>(`/history/${id}`)
      .then(({ data }) => data);
  }

  public async updateRoute(route: Route) {
    return await this.http
      .request<Route>('/route', {
        method: route.id ? 'PATCH' : 'POST',
        data: route,
      })
      .then(({ data }) => data);
  }

  public async deleteRoute(route: Route) {
    return await this.http
      .request<Route>(`/route/${route.id}`, { method: 'DELETE' })
      .then(({ data }) => data);
  }

  public async getMaintenances(from?: Date, to?: Date) {
    return this.http
      .request<Maintenance[]>('/maintenance', { params: { from, to } })
      .then(({ data }) => data);
  }

  public async updateMaintenance(maintenance: Maintenance) {
    return await this.http
      .request<Maintenance>('/maintenance', {
        method: maintenance.id ? 'PATCH' : 'POST',
        data: maintenance,
      })
      .then(({ data }) => data);
  }

  public async deleteMaintenance(maintenance: Maintenance) {
    return await this.http
      .request<Route>(`/maintenance/${maintenance.id}`, { method: 'DELETE' })
      .then(({ data }) => data);
  }

  public async getEnterprises() {
    return this.http
      .request<Enterprise[]>('/enterprise')
      .then(({ data }) => data);
  }
}
