import { ChatMenuModule } from './chat-menu.module';

describe('ChatMenuModule', () => {
  let chatMenuModule: ChatMenuModule;

  beforeEach(() => {
    chatMenuModule = new ChatMenuModule();
  });

  it('should create an instance', () => {
    expect(chatMenuModule).toBeTruthy();
  });
});
