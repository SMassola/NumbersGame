import { NumbersGamePage } from './app.po';

describe('numbers-game App', () => {
  let page: NumbersGamePage;

  beforeEach(() => {
    page = new NumbersGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
