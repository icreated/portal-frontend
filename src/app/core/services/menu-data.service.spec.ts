import { TestBed } from '@angular/core/testing';

import { MenuDataService } from "./menu-data.service";

describe("MenuDataService", () => {
  let service: MenuDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be not empty', () => {
    expect(service.getMenuList().length).toBeGreaterThan(0)
  });

  it('should have at least home item', () => {
    const homeItem = service.getMenuList()[0];
    expect(homeItem.label).toEqual('home');
  });

});
