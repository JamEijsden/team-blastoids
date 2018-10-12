import { SpaceBackgroundModule } from './space-background.module';

describe('SpaceBackgroundModule', () => {
  let spaceBackgroundModule: SpaceBackgroundModule;

  beforeEach(() => {
    spaceBackgroundModule = new SpaceBackgroundModule();
  });

  it('should create an instance', () => {
    expect(spaceBackgroundModule).toBeTruthy();
  });
});
