import { ThoughtworksPage } from './app.po';

describe('thoughtworks App', () => {
  let page: ThoughtworksPage;

  beforeEach(() => {
    page = new ThoughtworksPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
