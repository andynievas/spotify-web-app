// console.log("HOLA");

const express = require("express");
const dotenv = require("dotenv");
const request = require("request");
const puppeteer = require("puppeteer");
const cors = require("cors");

// import puppeteer from 'puppeteer';

const port = 5000;

dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let access_token = process.env.SPOTIFY_ACCESS_TOKEN;

let browser = null;
let page = null;

async function initBrowser() {
  try {
    const options = { width: 1024, height: 768 };
    browser = await puppeteer.launch({
      // browser: "firefox",
      headless: false,
      defaultViewport: null,
      args: [`--window-size=${options.width},${options.height}`], // new option
    });
    const pages = await browser.pages();
    console.log("pages");
    console.log(pages);

    page = await browser.newPage();

    const pagesAfter = await browser.pages();
    console.log("pagesAfter");
    console.log(pagesAfter);
    // const blank_page = pagesAfter[0];
    // blank_page.close();

    await page.goto("http://localhost:3000/music");
  } catch (error) {
    console.log("error");
    console.log(error);
  }
}
async function closeBrowser() {
  if (browser) browser.close();
}

const musicMethods = {
  playPause: async () => {
    const togglePlayBtn = await page.waitForSelector("#play-pause-btn");
    await togglePlayBtn.click();
  },
  nextSong: async () => {
    const togglePlayBtn = await page.waitForSelector("#play-pause-btn");
    await togglePlayBtn.click();
  },
  prevSong: async () => {
    const togglePlayBtn = await page.waitForSelector("#play-pause-btn");
    await togglePlayBtn.click();
  },
};

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();

// Enable cors
app.use(cors());

app.get("/auth/login", (req, res) => {
  const access_token_is_valid = false;

  if (access_token && access_token_is_valid) {
    console.log("Debería continuar al frontend con el token valido");
    res.redirect("http://localhost:3000/?token=" + access_token);
  } else {
    const scope = "streaming user-read-email user-read-private";

    const state = generateRandomString(16);

    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: `http://localhost:${port}/auth/callback`,
      state: state,
    });

    res.redirect(
      "https://accounts.spotify.com/authorize/?" +
        auth_query_parameters.toString()
    );
  }
});

app.get("/auth/callback", (req, res) => {
  console.log('app.get("/auth/callback")');
  console.log("req.query");
  console.log(req.query);
  /*
    query: {
      code: 'AQAV-qNIGRm9T8HxbNwjTnO4l0F8GLMk_XMK6dtg_l2J2C-CM68y97DYI5Cj5wt5qZoGB7D2KE7LyHaCfwr8sqWpP6YmdjAfK6X3fh0ETefYlJ9b7dPzGA90O46Gsl91-YpW5Cdw0H8yxN-BByepdx4toyitXJn2PFtOGtLQoQO8F5vJLJN4KRPbrNmmWLdY-TblWgCUs6lugmc8qApW2hEGIsC_k8mpP5IoR2XJd4avPFYtQo4',
      state: 'OaLSHFFDfF5JjkLw'
    }
  */

  const code = req.query.code;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: `http://localhost:${port}/auth/callback`,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    console.log("error");
    console.log(error);
    console.log("response.statusCode");
    console.log(response.statusCode);
    console.log("body");
    console.log(body);
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      console.log("access_token");
      console.log(access_token);
      res.set({ Authorization: access_token });
      res.header("Authorization", access_token);
      // res.redirect(`http://localhost:5000/?token=${access_token}`);
      console.log("res.getHeaders()");
      console.log(res.getHeaders());
      res.redirect("http://localhost:5000");
      // getSpotifyScript(access_token);
    }
  });
});

app.get("/token", (req, res) => {
  res.json({ access_token });
});

app.get("/music/toggle-play", async (req, res) => {
  // use existing browser and page
  try {
    await musicMethods.playPause();
    res.end("Success");
  } catch (error) {
    console.log("error");
    console.log(error);
    res.end("Error");
  }
});
app.get("/music/next-song", async (req, res) => {
  try {
    await musicMethods.nextSong();
    res.end("Success");
  } catch (error) {
    console.log("error");
    console.log(error);
    res.end("Error");
  }
});
app.get("/music/prev-song", async (req, res) => {
  try {
    await musicMethods.prevSong();
    res.end("Success");
  } catch (error) {
    console.log("error");
    console.log(error);
    res.end("Error");
  }
});

app.get("/", (req, res) => {
  console.log("/");
  // console.log("req");
  // console.log(req);
  console.log("req.headers");
  console.log(req.headers);
  console.log("req.rawHeaders");
  console.log(req.rawHeaders);

  res.end("Success");

  // const brows = async () => {
  //   if (browser && page) {
  //     // use existing browser and page
  //     const rightSection = await page.waitForSelector("#play-pause-btn");
  //     const playBtnText = await rightSection?.evaluate((el) => el.textContent);
  //     console.log("playBtnText");
  //     console.log(playBtnText);

  //     await rightSection.click();

  //     res.end("Success");
  //   } else {
  //     browser = await puppeteer.launch({
  //       headless: false,
  //     });
  //     // {
  //     //   headless: "true", // (default) enables Headless
  //     //   // `headless: 'old'` enables old Headless
  //     //   // `headless: false` enables "headful" mode
  //     // });

  //     console.log("browser");
  //     console.log(browser);
  //     page = await browser.newPage();
  //     // await page.goto("https://developer.chrome.com/");
  //     console.log("browser.goto()");
  //     const { token } = req.query;
  //     const pagina = await page.goto(`http://localhost:3000/?token=${token}`);
  //     await page.setViewport({ width: 1280, height: 720 });

  //     console.log("pagina");
  //     console.log(pagina);

  //     const rightSection = await page.waitForSelector("#play-pause-btn");
  //     console.log("rightSection");
  //     console.log(rightSection);
  //     const playBtnText = await rightSection?.evaluate((el) => el.textContent);
  //     console.log("playBtnText");
  //     console.log(playBtnText);

  //     await rightSection.click();

  //     try {
  //       await page.screenshot({ path: "screenshot.png" });
  //     } catch (error) {
  //       console.log("error");
  //       console.log(error);
  //     }

  //     try {
  //       // console.log("close browser");
  //       // browser.close();
  //       res.end("root: Autenticacion completada");
  //     } catch (error) {
  //       console.log("error");
  //       console.log("error");
  //       console.log("error");
  //       console.log(error);
  //     }
  //   }
  // };
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  initBrowser();
});
