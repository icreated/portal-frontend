export class RouteState {

  id: number;
  path = '';
  title = '';
  data: any;
  isParent = false;

  constructor() {
      this.id = Math.floor(Math.random() * 90000) + 10000;
  }

}
