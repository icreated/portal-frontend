import { Injectable } from '@angular/core';
import { RouteState } from 'src/app/core/models/route-state.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
/**
 * Route state service
 * Save all route data, helps to navigate routes
 */
export class RouteStateService {

    constructor(private router: Router) {
    }

    /**
     * get current route data
     */
    getCurrent(): RouteState {
        const routeStates = RouteStateService.getFromStorage();
        return routeStates[routeStates.length - 1];
    }

    /**
     * get all route data
     */
    getAll(): RouteState[] {
        return RouteStateService.getFromStorage();
    }

    /**
     * add route data
     * @param title route name
     * @param path route path
     * @param data route data
     * @param isParent is parent route
     */
    add(title: string, path: string, data: any, isParent: boolean) {
      if (isParent) {
          this.removeAll();
      }

      let routeStates = RouteStateService.getFromStorage();

      let routeState = new RouteState();
      routeState.title = title;
      routeState.path = path;
      routeState.data = data;

      routeStates.push(routeState);
      RouteStateService.saveToStorage(routeStates);
      this.navigate(routeState.path);
    }

    /**
     * load previous route
     */
    loadPrevious() {
      const routeStates = RouteStateService.getFromStorage();
      routeStates.pop();
      RouteStateService.saveToStorage(routeStates);
      const currentViewState = this.getCurrent();
      this.navigate(currentViewState.path);
    }

    /**
     *
     * @param id load route route id
     */
    loadById(id: number) {
      let result: RouteState[] = [];
      let isFound = false;
      let routeStates = RouteStateService.getFromStorage();
      routeStates.forEach(route => {
          if (isFound) {
              return;
          }
          result.push(route);
          if (route.id === id) {
              isFound = true;
          }
      });
      routeStates = result;
      RouteStateService.saveToStorage(routeStates);
      const currentViewState = this.getCurrent();
      this.navigate(currentViewState.path);
    }

    /**
     * remove all route data
     */
    removeAll() {
      RouteStateService.removeFromStorage();
    }

    private static saveToStorage(routeStates: any) {
        localStorage.setItem("routeState", JSON.stringify(routeStates));
    }

    private static getFromStorage(): RouteState[] {
      const value = localStorage.getItem("routeState");
      return value ? JSON.parse(value) as RouteState[]: [];
    }

    private static removeFromStorage() {
        localStorage.removeItem("routeState");
    }

    private navigate(path: string) {
        this.router.navigate([path]);
    }

}
