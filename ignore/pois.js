const fs = require("fs");

const gj = JSON.parse(fs.readFileSync("./ignore/ValkanelaPoi.geojson"));

let sql="INSERT INTO tockeInteresa(kampId, mapaId, naziv, ikonica, wwwText, latitude, longitude) VALUES \n";
let i=0;
gj.features.forEach(f=>sql+=`(4, ${i}, 'poi${i++}', 'ico-running-cop', '${f.properties.Name}', ${f.geometry.coordinates[0]}, ${f.geometry.coordinates[1]}),\n`);

sql=sql.slice(0,-2)+";"

fs.writeFileSync("./ignore/output.txt", sql);
