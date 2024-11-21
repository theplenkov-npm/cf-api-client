import axios, { AxiosInstance } from 'axios';
import QueryString from 'qs';
import { ServiceInstanceAPI } from './resources/service_instances/api';
import { ServiceCredentialBindingAPI } from './resources/service_credential_bindings/api';
import { OrganizationAPI } from './resources/organizations/api';
import { SpaceAPI } from './resources/spaces/api';
import { UserAPI } from './resources/users/api';

interface CloudFoundryClientOptions {
  apiEndpoint: string;
  accessToken: string;
}

export class CloudFoundryClient {
  private client: AxiosInstance;
  serviceCredentialBinding: ServiceCredentialBindingAPI;
  serviceInstances: ServiceInstanceAPI;
  organizations: OrganizationAPI;
  spaces: SpaceAPI;
  users: UserAPI;

  constructor(options: CloudFoundryClientOptions) {
    this.client = axios.create({
      baseURL: options.apiEndpoint,
      headers: {
        Authorization: options.accessToken,
      },
      paramsSerializer: function (params) {
        return QueryString.stringify(params, { arrayFormat: 'comma' });
      },
    });
    this.serviceCredentialBinding = new ServiceCredentialBindingAPI(
      this.client
    );
    this.serviceInstances = new ServiceInstanceAPI(this.client);
    this.organizations = new OrganizationAPI(this.client);
    this.spaces = new SpaceAPI(this.client);
    this.users = new UserAPI(this.client);
  }
}
