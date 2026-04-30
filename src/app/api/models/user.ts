/* tslint:disable */
/* eslint-disable */

/**
 * User object
 */
export interface User {
  id: number;
  name: string;
  token?: string;
  username: string;
  /** List of role codes assigned to the user, e.g. ['ADMIN', 'USER'] */
  roles?: string[];
}
