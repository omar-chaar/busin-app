import { TestBed } from '@angular/core/testing';

import { ChatGroupService } from './chat-group.service';

describe('ChatGroupService', () => {
  let service: ChatGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
