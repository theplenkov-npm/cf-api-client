import { metadata } from '../common';
import { Resource } from '../resource';

interface UserFields {
  username: string;
  presentation_name?: string;
  origin: string;
  metadata: metadata;
}

export type User = Resource<UserFields>;
