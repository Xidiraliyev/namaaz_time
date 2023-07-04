const fs = require("fs");
let path = "salom.html";
let data = `fhfgh`;

const puppeteer = require("puppeteer");
async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://namozvaqti.uz/shahar/fargona");

    // await page.screenshot({ path: "example.png", fullPage: true });
    const time = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".ad__item"), (e) => ({
            time: e.querySelector(".time").innerText,
        }))
    );

    console.log(time[3]["time"]);
    data = `<!DOCTYPE html>
    <html>
        <head>
            <title>Namaz Time</title>
            <link rel="stylesheet" href="css/style.css" />
        </head>
        <body>
            <div class="container">
                <video autoplay muted loop id="myVideo">
                    <source src="images/walking.mp4" type="video/mp4" />
                </video>
                <div class="content container">
                    <main class="main">
                        <h1 class="main__title">Navoiy viloyati namoz vaqtlari</h1>
                        <div class="time-wrapper">
                            <div class="time">
                                <h2 class="time__title">bomdod : <br /> ${time[0]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">peshin :<br />${time[1]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">asr :<br />${time[2]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">shom :<br />${time[3]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">xufton :<br />${time[4]["time"]}</h2>
                            </div>
                        </div>
                        <p class="main__description">
                            kun:<br />
                            soat:
                        </p>
                    </main>
                    <footer class="footer__container container">
                        <h3 class="footer__title">
                            sayt: Dadajonim Murodov G'olib Muhammadovich uchun
                        </h3>
                    </footer>
                </div>
            </div>
            <!-- <script src="js/index.js"></script> -->
        </body>
    </html>
    `;
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("data written");
        }
    });
    await browser.close();
}

run();
