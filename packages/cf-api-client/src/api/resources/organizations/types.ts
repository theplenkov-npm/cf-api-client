import { metadata, timestamp, to_one_relationship } from '../common';
import { Resource } from '../resource';

interface OrganizationFields {
  name: string;
  suspended: boolean;
  status: 'active' | 'suspended';
  metadata: metadata;
  relationships: OrganizationRelationships;
}

export type Organization = Resource<OrganizationFields>;

export interface OrganizationRelationships {
  quota?: to_one_relationship;
}
