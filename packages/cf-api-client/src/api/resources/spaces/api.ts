import { BaseClient } from '../base';
import { PaginatedResponse, timestamp } from '../common';
import { Space } from './types';

export class SpaceAPI extends BaseClient {
  create = (data: {
    name: string;
    relationships: {
      organization: {
        data: {
          guid: string;
        };
      };
    };
    metadata?: {
      labels?: { [key: string]: string };
      annotations?: { [key: string]: string };
    };
  }) => this.client.post<Space>('/v3/spaces', data);

  get = (
    guid: string,
    params?: {
      include?: 'organization'[];
    }
  ) => this.client.get<Space>(`/v3/spaces/${guid}`, { params });
  list = (params?: {
    names?: string[];
    guids?: string[];
    organization_guids?: string[];
    page?: number;
    per_page?: number;
    order_by?: string;
    label_selector?: string;
    include?: 'organization'[];
    created_ats?: timestamp[];
    updated_ats?: timestamp[];
  }) =>
    this.client.get<PaginatedResponse<Space>>('/v3/spaces', {
      params,
    });
  update = (
    guid: string,
    data: {
      name?: string;
      metadata?: {
        labels?: { [key: string]: string };
        annotations?: { [key: string]: string };
      };
    }
  ) => this.client.patch<Space>(`/v3/spaces/${guid}`, data);

  delete = (guid: string) => this.client.delete(`/v3/spaces/${guid}`);

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
    this.client.get<PaginatedResponse<User>>(`/v3/spaces/${guid}/users`, {
      params,
    });
}
