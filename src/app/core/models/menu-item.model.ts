export class CustomMenuItem {

  label: string;
  icon?: string;
  routerLink: string;
  childs: CustomMenuItem[];
  isChildVisible: boolean;

  constructor() {
      this.label = '';
      this.icon = '';
      this.routerLink = '';
      this.childs = [];
      this.isChildVisible = false;
  }
}
