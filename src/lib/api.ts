import { AxiosError } from 'axios';
import dayjs from 'dayjs';

import { Enterprise } from '@/models/enterprise.type';
import { History, HistoryApprovalStatus } from '@/models/history.type';
import {
  getType,
  Maintenance,
  MaintenanceType,
} from '@/models/maintenance.type';
import { DetailedRoute, Route } from '@/models/route.type';
import { User } from '@/models/user.type';
import { Vehicle } from '@/models/vehicle.type';
import { DistanceStat } from '@/types/distance-stat';
import { GenericStat } from '@/types/generic-stat';
import { OnGoingRoutesStat } from '@/types/ongoing-routes-stat';
import { PerformanceStat } from '@/types/performance-stat';

import { RecentHistoryStat } from '@/types/recent-history-stat';
import { Http } from './http';

export class API {
  public readonly http: Http;

  constructor() {
    // instancia Http com o ip do front com a porta do back
    this.http = new Http(`http://${location.hostname}:3000`);
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
    const token = sessionStorage.getItem('token');

    if (!token) {
      return Promise.reject(new Error('No token'));
    }

    return this.http
      .request<User>('/token')
      .then(({ data }) => data)
      .catch((e: Error) => {
        if (e instanceof AxiosError && e.response?.status === 401) {
          sessionStorage.removeItem('token');
        }

        throw e;
      });
  }

  public async getUser(id: number) {
    return this.http.request<User>(`/user/${id}`).then(({ data }) => data);
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

  public async getVehicle(id: number) {
    return this.http
      .request<Vehicle>(`/vehicle/${id}`)
      .then(({ data }) => data);
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

  public async getHistories() {
    return this.http.request<History[]>('/history').then(({ data }) => data);
  }

  public async getHistory(id: number) {
    return this.http
      .request<History>(`/history/${id}`)
      .then(({ data }) => data);
  }

  public async updateHistoryStatus(
    id: number,
    status: HistoryApprovalStatus,
    observation?: string
  ) {
    return this.http
      .request<History>(`/history/${id}/status`, {
        method: 'POST',
        data: { status, observation },
      })
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

  // Statistics

  public async getActiveVehiclesStats() {
    return this.http
      .request<GenericStat>('/stats/active-vehicles')
      .then(({ data }) => data);
  }

  public async getOnGoingRoutesStats() {
    return this.http
      .request<OnGoingRoutesStat>('/stats/ongoing-routes')
      .then(({ data }) => data);
  }

  public async getActiveDriversStats() {
    return this.http
      .request<GenericStat>('/stats/active-drivers')
      .then(({ data }) => data);
  }

  public async getElapsedDistanceStats() {
    return this.http
      .request<DistanceStat>('/stats/elapsed-distance')
      .then(({ data }) => data);
  }

  public async getRecentHistoriesStats() {
    return this.http
      .request<RecentHistoryStat[]>('/stats/recent-histories')
      .then(({ data }) => data);
  }

  public async getDriversPerformance(
    from: Date,
    to: Date,
    aggregation: string
  ) {
    return this.http
      .request<PerformanceStat[]>('/stats/drivers-performance', {
        params: { from, to, aggregation },
      })
      .then(({ data }) => data);
  }

  public getMaintenancesPerVehicle = async (
    from: Date,
    to: Date,
    aggregation: string
  ) => {
    return this.http
      .request<PerformanceStat[]>('/stats/maintenances-vehicles', {
        params: { from, to, aggregation },
      })
      .then(({ data }) => data);
  };

  public getMaintenancesPerType = async (
    from: Date,
    to: Date,
    aggregation: string
  ) => {
    return this.http
      .request<PerformanceStat[]>('/stats/maintenances-types', {
        params: { from, to, aggregation },
      })
      .then(({ data }) => data)
      .then((stats) =>
        stats.map((stat) => {
          const values: Record<string, number> = {};

          for (const type in stat.values) {
            values[getType(Number(type) as MaintenanceType)] =
              stat.values[type];
          }

          stat.values = values;

          return stat;
        })
      );
  };
}
