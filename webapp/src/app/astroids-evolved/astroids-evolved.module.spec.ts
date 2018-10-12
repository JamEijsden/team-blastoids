import { AstroidsEvolvedModule } from './astroids-evolved.module';

describe('AstroidsEvolvedModule', () => {
  let astroidsEvolvedModule: AstroidsEvolvedModule;

  beforeEach(() => {
    astroidsEvolvedModule = new AstroidsEvolvedModule();
  });

  it('should create an instance', () => {
    expect(astroidsEvolvedModule).toBeTruthy();
  });
});
