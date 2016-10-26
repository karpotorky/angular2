import { Angular2TodoFirebasePage } from './app.po';

describe('angular2-todo-firebase App', function() {
  let page: Angular2TodoFirebasePage;

  beforeEach(() => {
    page = new Angular2TodoFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
