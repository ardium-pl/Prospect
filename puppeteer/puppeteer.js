import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import dotenv from "dotenv";

dotenv.config();

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.3 Safari/605.1.15",
  "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.181 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 9; LM-Q720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; AS; rv:11.0) like Gecko",
];

const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function runPuppeteer() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Path to Chrome
    args: [
      `--user-agent=${getRandomUserAgent()}`, // Set a random user agent for this browser instance
      "--start-maximized", // Open the browser maximized
      "--disable-infobars",
      "--disable-sync",
      "--disable-notifications",
    ],
    defaultViewport: null,
    // userDataDir: "./tmp",
  });

  const page = await browser.newPage(); // Create a new page
  return page;
}

export async function loginToPodatkiPodatki(){
    const login = process.env.PP_LOGIN;
    const password = process.env.PP_PASSWORD;
    const loginPanelInput = '#input-19';
    const passwordPanelInput = '#input-23';
    const loginButton = '#app > div > main > div > div > div > div > div > div > div > div > form > div > div.v-card__actions.justify-center.py-6 > button';
    const page = await runPuppeteer();

    try {
        await page.goto("https://panel.podatkipodatki.pl/");
    
        //Uzupełnianie loginu w panelu logowania
        await page.waitForSelector(loginPanelInput);
        await page.click(loginPanelInput);
        await page.type(loginPanelInput, login);
    
        await sleep(1000);
        //uzupełnianie hasła w panelu logowania
        await page.waitForSelector(passwordPanelInput);
        await page.click(passwordPanelInput);
        await page.type(passwordPanelInput, password);
    
        await sleep(2000);
    
        //Kliknięcie przycisku zaloguj
        await page.click(loginButton);
    
    
        await sleep(3000);
        
    
      } catch (error) {
        console.log("An error occurred:", error);
      }


}









