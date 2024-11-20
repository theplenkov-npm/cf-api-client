// guid	uuid	The unique identifier for the resource
// created_at	timestamp	The ISO8601 compatible date and time when resource was created
// updated_at	timestamp	The ISO8601 compatible date and time when resource was last updated

import { links, timestamp, uuid } from './common';

// links	links object	URLs to related resources and actions for the current resource
interface ResourceRequiredFields {
  guid: uuid;
  created_at: timestamp;
  updated_at: timestamp;
  links: links;
}

export type Resource<T> = T & ResourceRequiredFields;
