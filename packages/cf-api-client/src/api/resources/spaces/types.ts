import { metadata, to_one_relationship } from '../common';
import { Resource } from '../resource';

interface SpaceFields {
  name: string;
  running_security_groups: string[];
  staging_security_groups: string[];
  metadata: metadata;
  relationships: SpaceRelationships;
}

export type Space = Resource<SpaceFields>;

export interface SpaceRelationships {
  organization: to_one_relationship;
  quota?: to_one_relationship;
}
