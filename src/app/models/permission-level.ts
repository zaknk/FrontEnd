export class PermissionLevel {

  permissionId: number;
  name: string;

  constructor(permissionId: number,
    name: string) {
      this.permissionId = permissionId;
      this.name = name;
    }
}
