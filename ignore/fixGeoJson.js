const file = "./assets/gj/polidor_1.json";
const fs = require("fs");
const gj = JSON.parse(fs.readFileSync(file));

gj.features.forEach((f) => {
  f.properties.id = String(f.properties.id);
  if (f.properties.number) f.properties.number = String(f.properties.number);
  Object.keys(f.properties).forEach((key) => {
    if (!f.properties[key] || f.properties[key] == "null")
      delete f.properties[key];
  });
});

fs.writeFileSync(file, JSON.stringify(gj));
