import { MessageSnackbarModule } from './message-snackbar.module';

describe('MessageSnackbarModule', () => {
  let messageSnackbarModule: MessageSnackbarModule;

  beforeEach(() => {
    messageSnackbarModule = new MessageSnackbarModule();
  });

  it('should create an instance', () => {
    expect(messageSnackbarModule).toBeTruthy();
  });
});
