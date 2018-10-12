import { ViewTemplateModule } from './view-template.module';

describe('ViewTemplateModule', () => {
  let viewTemplateModule: ViewTemplateModule;

  beforeEach(() => {
    viewTemplateModule = new ViewTemplateModule();
  });

  it('should create an instance', () => {
    expect(viewTemplateModule).toBeTruthy();
  });
});
