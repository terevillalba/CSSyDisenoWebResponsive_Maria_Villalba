import { TiendaTerePage } from './app.po';

describe('tienda-tere App', function() {
  let page: TiendaTerePage;

  beforeEach(() => {
    page = new TiendaTerePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
