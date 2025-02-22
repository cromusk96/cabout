const fs = require("fs");

const input = JSON.parse(fs.readFileSync("./ignore/input.json").toString());

let sql=""

input.forEach((o)=>sql+=`UPDATE brojSJ SET vrstaSJ = 73 WHERE brojMish = '${o.code}';\n`)



fs.writeFileSync(
  "./ignore/output.sql",sql
);
