import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

export async function POST() {
  await chromium.font(
    "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
  );

  const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

  const browser = await puppeteer.launch({
    args: isLocal ? puppeteer.defaultArgs() : [...chromium.args, '--hide-scrollbars', '--incognito', '--no-sandbox'],
    defaultViewport: chromium.defaultViewport,
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.goto("https://sbm.ge/team.php?id=318");
  const pageTitle = await page.title();
  
  // Select only the first tbody
  const leaderboardData = await page.$$eval("tbody", (tBodies) => {
    const firstTbody = tBodies[2]; // Get the first tbody directly
    const rows = firstTbody.querySelectorAll("tr");
    return Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      const date = cells[2] ? cells[2].innerText.trim() : null;
      const time = cells[3] ? cells[3].innerText.trim() : null;
      const team1 = cells[4] ? cells[4].innerText.trim() : null;
      const team2 = cells[6] ? cells[6].innerText.trim() : null;
      const match = team1 && team2 ? `${team1} vs ${team2}` : null;
      const outcome = cells[7] ? cells[7].innerText.trim() : null;
      return date && time && team1 && team2 && outcome ? {
        date : date,
        time: time,
        team1 : team1,
        team2 : team2,
        match: match,
        outcome: outcome,
      } : null;
    }).filter(item => item != null && item.time!='--:--');
  });
  

  await browser.close();

  return Response.json({
    Games : leaderboardData,
  });
}
