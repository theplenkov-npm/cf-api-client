import { BaseClient } from '../base';
import { AllowedFields, PaginatedResponse, timestamp } from '../common';
import { Organization } from './types';

export class OrganizationAPI extends BaseClient {
  create = (data: {
    name: string;
    suspended?: boolean;
    metadata?: {
      labels?: { [key: string]: string };
      annotations?: { [key: string]: string };
    };
    relationships?: {
      quota?: {
        data: {
          guid: string;
        };
      };
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
    fields?: AllowedFields<allowed_fields>;
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
}

type allowed_fields = {
  quota: ['guid', 'name', 'apps', 'services', 'routes', 'domains'];
};
