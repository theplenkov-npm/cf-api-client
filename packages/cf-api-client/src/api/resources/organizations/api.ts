import { BaseClient } from '../base';
import { PaginatedResponse, timestamp } from '../common';
import { User } from '../users/types';
import { Organization } from './types';

export class OrganizationAPI extends BaseClient {
  create = (data: {
    name: string;
    suspended?: boolean;
    metadata?: {
      labels?: { [key: string]: string };
      annotations?: { [key: string]: string };
    };
  }) => this.client.post<Organization>('/v3/organizations', data);

  get = (guid: string) =>
    this.client.get<Organization>(`/v3/organizations/${guid}`);

  list = (params?: {
    names?: string[];
    guids?: string[];
    page?: number;
    per_page?: number;
    order_by?: string;
    label_selector?: string;
    created_ats?: timestamp[];
    updated_ats?: timestamp[];
  }) =>
    this.client.get<PaginatedResponse<Organization>>('/v3/organizations', {
      params,
    });

  update = (
    guid: string,
    data: {
      name?: string;
      suspended?: boolean;
      metadata?: {
        labels?: { [key: string]: string };
        annotations?: { [key: string]: string };
      };
    }
  ) => this.client.patch<Organization>(`/v3/organizations/${guid}`, data);

  delete = (guid: string) => this.client.delete(`/v3/organizations/${guid}`);
  getUsers = (
    guid: string,
    params?: {
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
    }
  ) =>
    this.client.get<PaginatedResponse<User>>(
      `/v3/organizations/${guid}/users`,
      {
        params,
      }
    );
}
