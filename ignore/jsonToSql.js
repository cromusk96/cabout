const fs = require("fs");
const input = JSON.parse(fs.readFileSync("./ignore/input.json"));

const kampId = 1;

let sql = "";
input.units.forEach((sj) =>
  sql += `UPDATE brojSJ SET pmsUnitId = ${sj.unit_id} 
  WHERE vrstaMish='${sj.unit_type_code}' AND brojMish='${sj.unit_code}' 
  AND kampId=${kampId} AND deleted IS NOT TRUE;\n`
);

fs.writeFileSync("./ignore/output.sql", sql);
