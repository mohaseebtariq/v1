import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

<<<<<<< HEAD
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('portfolio app is running!');
=======
  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Personal-Portfolio app is running!');
>>>>>>> 90451c1e4c839a323003adfde1de10aa66b0b525
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
