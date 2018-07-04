import { TestBed, inject } from '@angular/core/testing';

import { GameRoomService } from './game-room.service';

describe('GameRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameRoomService]
    });
  });

  it('should ...', inject([GameRoomService], (service: GameRoomService) => {
    expect(service).toBeTruthy();
  }));
});
