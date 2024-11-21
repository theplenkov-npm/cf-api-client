import { BaseClient } from '../base';
import { PaginatedResponse, timestamp } from '../common';
import { User } from './types';

export class UserAPI extends BaseClient {
  create = (data: {
    guid: string;
    metadata?: {
      labels?: { [key: string]: string };
      annotations?: { [key: string]: string };
    };
  }) => this.client.post<User>('/v3/users', data);
  get = (guid: string) => this.client.get<User>(`/v3/users/${guid}`);

  list = (params?: {
    guids?: string[];
    usernames?: string[];
    partial_usernames?: string[];
    origins?: string[];
    page?: number;
    per_page?: number;
    order_by?: string;
    label_selector?: string;
    created_ats?: timestamp[];
    updated_ats?: timestamp[];
  }) =>
    this.client.get<PaginatedResponse<User>>('/v3/users', {
      params,
    });
  update = (
    guid: string,
    data: {
      metadata: {
        labels?: { [key: string]: string };
        annotations?: { [key: string]: string };
      };
    }
  ) => this.client.patch<User>(`/v3/users/${guid}`, data);
  delete = (guid: string) => this.client.delete(`/v3/users/${guid}`);
}
