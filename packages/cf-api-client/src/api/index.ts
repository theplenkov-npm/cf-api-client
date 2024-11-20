import axios, { AxiosInstance } from 'axios';
import QueryString from 'qs';
import { ServiceInstanceAPI } from './resources/service_instances/api';
import { ServiceCredentialBindingAPI } from './resources/service_credential_bindings/api';

interface CloudFoundryClientOptions {
  apiEndpoint: string;
  accessToken: string;
}

export class CloudFoundryClient {
  private client: AxiosInstance;
  serviceCredentialBinding: ServiceCredentialBindingAPI;
  serviceInstances: ServiceInstanceAPI;

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
  }
}
