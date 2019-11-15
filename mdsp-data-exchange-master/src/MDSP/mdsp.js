const router = require("express").Router();
const puppeteer = require("puppeteer");

//Get MindSphere Cookies
router.get("/getMindSphereCookies", async (req, res) => {
  try {
    const tenant = req.query.tenant;
    const host = req.query.host;
    const user = req.query.user;
    const pwd = req.query.password;
    const login_url = "https://" + tenant + "." + host;
    const nano_url =
      "https://" + tenant + "-" + "uipluginassetmanagermcnano" + "." + host;
    const assetmgr_url =
      "https://" + tenant + "-" + "assetmanager" + "." + host;

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(login_url);

    await page.waitForSelector("#login-button", { visible: true, timeout: 0 });
    await page.type("#emailaddress", user);
    await page.type("#passLogin", pwd);
    await page.click("#login-button");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    let cookies = [];

    await page.goto(nano_url, { waitUntil: "networkidle0" });
    cookies = cookies.concat(await page.cookies());

    await page.goto(assetmgr_url, { waitUntil: "domcontentloaded" });
    cookies = cookies.concat(await page.cookies());

    await browser.close();

    //Write to file
    cookies = cookies.filter(cookie => cookie.name != "REGION-SESSION");
    res.send(cookies);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
