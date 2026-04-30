export class User {
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token?: string;
  /** List of role codes assigned to the user, e.g. ['ADMIN', 'USER'] */
  roles?: string[];
}
