const fs = require("fs");
const gj = JSON.parse(fs.readFileSync("./ignore/hidranti/Porto_Sole_Hidranti.geojson"));

const kampId = 5;
let mapaId = 988033 + 1;
const grupa = 3;
let i = 1;

let sql = "INSERT INTO tockeInteresa (kampId, mapaId, grupa, naziv, ikonica, wwwText, latitude, longitude) VALUES\n";
gj.features.forEach((f) =>
  sql += `(${kampId}, ${mapaId++}, ${grupa}, 'Hydrant${i++}', 'Amarin_30_Hydrant_Water_Plug', 'Hydrant Water Plug', ${f.geometry.coordinates[0]}, ${f.geometry.coordinates[1]}),\n`
);

sql = sql.slice(0, -2) + ";";

fs.writeFileSync("./ignore/output.txt", sql);
