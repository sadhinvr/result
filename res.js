const fs = require("fs");
const subjects = {
    21011: "Engineering Drawing",

    25711: "Bangla-I",

    25712: "English-I",

    25911: "Mathematics -I",

    25912: "Physics -I",

    28511: "Computer Office Application",

    26711: "Basic Electricity",

    25721: "Bangla -II",

    25722: "English-II",

    25812: "Physical Education & Life skills Development",

    25913: "Chemistry",

    25921: "Mathematics-II",

    28521: "Python Programming",

    28522: "Computer Graphics Design-I",

    26811: "Basic Electronics",
    25811: "Social Science",

    25922: "Physics -II",

    25931: "Mathematics-III",

    28531: "Application Development Using Python",

    28532: "Computer Graphics Design-II",

    28533: "IT Support Services",

    26831: "Digital Electronics-I",
    25831: "Business Communication",

    28541: "Java Programming",

    28542: "Data Structure & Algorithm",

    28543: "Computer Peripherals & Interfacing",

    28544: "Web Design & Development-I",

    26841: "Digital Electronics-II",

    29041: "Environmental Studies",

    25841: "Accounting",

    28551: "Application Development Using Java",

    28552: "Web Design & Development-II",

    28553: "Computer Architecture & Microprocessor",

    28554: "Data Communication",

    28555: "Operating System",

    28556: "Project Work-I",

    25851: "Principles of Marketing",

    25852: "Industrial Management",

    28561: "Database Management System",

    28562: "Computer Networking",

    28563: "Sensor & IoT System",

    28564: "Microcontroller Based System Design & Development",

    28565: "Surveillance Security System",

    28566: "Web Development Project",

    25853: "Innovation & Entrepreneurship",

    28571: "Digital Marketing Technique",

    28572: "Network Administration & Services",

    28573: "Cyber Security & Ethics",

    28574: "Apps Development Project",

    28575: "Multimedia & Animation",

    28576: "Project Work-II",
};

try {
    const data = fs.readFileSync("text.txt", "utf8");
    const data2 = data.replace(/\( ?T ?\)/gi, "");

    let extraRoll = [515208, 515223, 515302, 617653, 617668, 640314, 676815];
    let extraResults = extraRoll.map((cur) => {
        const re = new RegExp(`${cur}[^\\}|\\)]*(\\)|\\})`, "g");
        return data2.match(re)[0];
    });

    const m = [
        ...data2.match(/6163[\d][\d][^\}|\)]*(\)|\})/g),
        ...extraResults,
    ];
    console.log(m);
    const arr = [];

    for (let x in m) {
        let c = m[x].replace(/[\r\n ]+/g, " ");
        // console.log(c);
        let roll = c.match(/[0-9]{6}/)[0] * 1;
        if (roll < 616355 || extraRoll.includes(roll)) {
            let fail = c.match(/\{.*\}/);

            fail ? (fail = fail[0]) : null;
            let point = c.match(/\(.*\)/);
            point ? (point = point[0]) : null;

            let temp = c
                .split(roll)
                .join("")
                .replace(/[\{\(\}\)]/g, "")
                .split(",")
                .map((cur) => cur.trim());

            let result = { passed: true };

            if (temp[0].length > 4) {
                result.passed = false;
                result.sub = temp.map((cur) => subjects[cur]);
            } else {
                result.point = temp[0];
            }

            arr.push({
                roll,
                result,
            });
        }
    }

    arr.sort((a, b) => a.roll - b.roll);
    console.log(arr);

    fs.writeFileSync('./result.json',JSON.stringify(arr))
} catch (err) {
    console.error(err);
}
