/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OperacionesService } from './operaciones.service';

describe('OperacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperacionesService]
    });
  });

  it('should ...', inject([OperacionesService], (service: OperacionesService) => {
    expect(service).toBeTruthy();
  }));
});
