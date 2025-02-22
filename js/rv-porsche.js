//primjer definiranja radnog vremena
// var radnovrijeme = [
//   ["ned", 9.30, 12.00, 15.30, 2.00],
//   ["pon", 8.00, 12.00, 15.30, 19.00],
//   ["uto", 19.15, 20.52, 22.46, 22.47],
//   ["sri", 8.30, 12.00, 15.30, 19.00],
//   ["cet", 8.30, 12.00, 15.30, 19.00],
//   ["pet", 18.00, 19.30],
//   ["sub"]
// ];

function _RadnoVrijeme(radnovrijeme, language) {

    if (radnovrijeme == undefined) {
      return ''
    }
  
    var _rezultat = {
      "status": "",
      "vrijemedo": "",
      "otvaramo": "",
      "zatvaramo": "",
      "slijedecidan": ""
    };
  
    var _status = "",
      _vrijemedo = "",
      _otvaramo = "",
      _zatvaramo = "";
    _slijedecidan = "";
  
    var danas = new Date();
    var sutra = new Date();
  
    var translations = {
      "minutu": [{
        "en": " minute",
        "de": " minute",
        "nl": " minuut",
        "it": " minuto",
        "si": " minuti",
        "hr": " minutu"
      }],
      "minute": [{
        "en": " minutes",
        "de": " Minuten",
        "nl": " minuten",
        "it": " minuti",
        "si": " minut",
        "hr": " minute"
      }],
      "minuta": [{
        "en": " minutes",
        "de": " Minuten",
        "nl": " minuten",
        "it": " minuti",
        "si": " minut",
        "hr": " minuta"
      }],
      "nula": [{
        "en": "less than 1 minute",
        "de": "weniger als 1 Minute",
        "nl": "minder dan 1 minuut",
        "it": "meno di 1 minuto",
        "si": "manj kot 1 minuto",
        "hr": "manje od 1 minute"
      }],
      "sat": [{
        "en": " hour",
        "de": " Stunde",
        "nl": " uur",
        "it": " ora",
        "si": " uro",
        "hr": " sat"
      }],
      "sata": [{
        "en": " hours",
        "de": " Stunden",
        "nl": " uur",
        "it": " ore",
        "si": " uri",
        "hr": " sata"
      }],
      "sati": [{
        "en": " hours",
        "de": " Stunden",
        "nl": " uur",
        "it": " ore",
        "si": " ur",
        "hr": " sati"
      }],
      "i": [{
        "en": " & ",
        "de": " und ",
        "nl": " en ",
        "it": " e ",
        "si": " in ",
        "hr": " i "
      }],
      "sutra": [{
        "en": " tomorrow  ",
        "de": " morgen  ",
        "nl": " morgen  ",
        "it": " domani  ",
        "si": " jutri  ",
        "hr": " sutra "
      }],
      "pon": [{
        "en": " Monday  ",
        "de": " Montag  ",
        "nl": " Maandag  ",
        "it": " Lunedi  ",
        "it": " Ponedeljek  ",
        "hr": " Ponedjeljak "
      }],
      "uto": [{
        "en": " Tuesday  ",
        "de": " Dienstag  ",
        "nl": " Dinsdag  ",
        "it": " MartedÃ¬  ",
        "si": " Torek  ",
        "hr": " Utorak "
      }],
      "sri": [{
        "en": " Wednesday  ",
        "de": " Mittwoch  ",
        "nl": " Woensdag  ",
        "it": " MercoledÃ¬  ",
        "si": " Sreda  ",
        "hr": " Srijeda "
      }],
      "cet": [{
        "en": " Thursday  ",
        "de": " Donnerstag  ",
        "nl": " Donderdag  ",
        "it": " GiovedÃ¬  ",
        "si": " ÄŒetrtek  ",
        "hr": " ÄŒetvrtak "
      }],
      "pet": [{
        "en": " Friday  ",
        "de": " Freitag  ",
        "nl": " Vrijdag  ",
        "it": " VenerdÃ¬  ",
        "si": " Petek  ",
        "hr": " Petak "
      }],
      "sub": [{
        "en": " Saturday  ",
        "de": " Samstag  ",
        "nl": " Zaterdag  ",
        "it": " Sabato  ",
        "si": " Sobota  ",
        "hr": " Subota "
      }],
      "ned": [{
        "en": " Sunday  ",
        "de": " Sonntag  ",
        "nl": " Zondag  ",
        "it": " Domenica  ",
        "si": " Nedelja  ",
        "hr": " Nedjelja "
      }]
    }
  
    function minutaMinute(m, lng) {
      if (m == 1) {
        return translations["minutu"][0][lng]
      }
      if (m > 1 && m < 5) {
        return translations["minute"][0][lng]
      }
      if (m >= 5 && m <= 20) {
        return translations["minuta"][0][lng]
      }
      if (m > 20) {
        if ((m % 10) == 1) {
          return translations["minutu"][0][lng]
        }
        if ((m % 10) > 1 && (m % 10) < 5) {
          return translations["minute"][0][lng]
        }
        if ((m % 10) >= 5) {
          return translations["minuta"][0][lng]
        }
        if ((m % 10) == 0) {
          return translations["minuta"][0][lng]
        }
      }
    }
  
    function satSati(m, lng) {
      if (m == 1) {
        return translations["sat"][0][lng]
      }
      if (m > 1 && m < 5) {
        return translations["sata"][0][lng]
      }
      if (m >= 5 && m <= 20) {
        return translations["sati"][0][lng]
      }
      if (m > 20) {
        if ((m % 10) == 1) {
          return translations["sat"][0][lng]
        }
        if ((m % 10) > 1 && (m % 10) < 5) {
          return translations["sata"][0][lng]
        }
        if ((m % 10) >= 5) {
          return translations["sati"][0][lng]
        }
        if ((m % 10) == 0) {
          return translations["sata"][0][lng]
        }
      }
    }
  
    function timeDifference(d, dd, vrsta) {
      var minute = 60 * 1000,
        hour = minute * 60,
        day = hour * 24,
        month = day * 30,
        ms = Math.abs(d - dd);
  
      var months = parseInt(ms / month, 10);
      ms -= months * month;
  
      var days = parseInt(ms / day, 10);
      ms -= days * day;
  
      var hours = parseInt(ms / hour, 10);
      ms -= hours * hour;
      var minutes = parseInt(ms / minute, 10);
  
      if (minutes == -59) {
        minutes = 0
      }
  
      if (vrsta === 'zatvaranje') {
        return (hours >= 1) ? "" : (minutes == 0 ? translations["nula"][0][language] : minutes + minutaMinute(minutes, language))
      } else {
  
        return (minutes == 0 ? translations["nula"][0][language] : ((hours > 0) ? hours + satSati(hours, language) + translations["i"][0][language] : "") + minutes + minutaMinute(minutes, language))
      }
    };
  
  
    var kojidan = danas.getDay();
  
  // console.log(kojidan);
  
    //ostavljam kao opciju sa prototype ako bude trebalo
    /* Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    var slijedecidan = parseInt(danas.addDays(1).getDay()); */
  
    var slijedecidan = new Date();
    slijedecidan.setDate(danas.getDate() + 1);
    slijedecidan = parseInt(slijedecidan.getDay());
  
    var vrijemesada = danas.getHours() + "." + (danas.getMinutes() > 9 ? danas.getMinutes() : '0' + danas.getMinutes());
    var day = radnovrijeme[kojidan];
    // var day = ["pet"];
    // console.log(day);
  
    var opened = false;
    var dvokratno = false;
    var neradno = false;
  
    if (day[1] == undefined) {
      neradno = true
    }
  
    //racunamo prvi sliejdeci radni dan
    function slijedeciRadniDan() {
  
      function sutra(d, s) {
        if ((s - d == 1) || (s == 0 && d == 6)) {
          return true
        } else {
          return false
        }
      }
  
      var rjesio = false;
      for (i = slijedecidan; i < 7; i++) {
        if (radnovrijeme[i][1] != undefined) {
          //rjesavam da sati imaju vodecu nulu
          var tm = (radnovrijeme[i][1]).toFixed(2).split(".")
  
          if (sutra(kojidan, i)) {
            _slijedecidan = 'sutra'
          } else {
            _slijedecidan = radnovrijeme[i][0];
          }
  
          //rjesavamo radno vrijeme za slijedeci radni dan
          var tt = (
            (radnovrijeme[i][1].toFixed(2)).padStart(5, "0") + '-' +
            (radnovrijeme[i][2].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
          if (radnovrijeme[i][3] != undefined) {
            tt = (
              (radnovrijeme[i][1].toFixed(2)).padStart(5, "0") + '-' +
              (radnovrijeme[i][2].toFixed(2)).padStart(5, "0") + translations["i"][0][language] +
              (radnovrijeme[i][3].toFixed(2)).padStart(5, "0") + '-' +
              (radnovrijeme[i][4].toFixed(2)).padStart(5, "0")
            ).replaceAll(".", ":")
          }
          _vrijemedo = tt;
  
          var pomocni = tm[0];
  
          tm = (tm[0]).padStart(2, "0") + ':' + (tm[1]).padStart(2, "0")
  
          rjesio = true;
          return (pomocni == 0 ? (sutra(kojidan, i) ? translations['sutra'][0][language] : translations[radnovrijeme[i][0]][0][language]) + ' - ' + '24:00' :
            (sutra(kojidan, i) ? translations['sutra'][0][language] : translations[radnovrijeme[i][0]][0][language]) + ' - ' + tm);
        }
      }
  
      //ako nije gore pronasao vrtimo dalje od nule
      if (!rjesio) {
        for (i = 0; i < 7; i++) {
          if (radnovrijeme[i][1] != undefined) {
            //rjesavam da sati imaju vodecu nulu
            var tm = (radnovrijeme[i][1]).toFixed(2).split(".")
  
            if (sutra(kojidan, i)) {
              _slijedecidan = 'sutra'
            } else {
              _slijedecidan = radnovrijeme[i][0];
            }
  
            //rjesavamo radno vrijeme za slijedeci radni dan
            var tt = (
              (radnovrijeme[i][1].toFixed(2)).padStart(5, "0") + '-' +
              (radnovrijeme[i][2].toFixed(2)).padStart(5, "0")
            ).replaceAll(".", ":")
            if (radnovrijeme[i][3] != undefined) {
              tt = (
                (radnovrijeme[i][1].toFixed(2)).padStart(5, "0") + '-' +
                (radnovrijeme[i][2].toFixed(2)).padStart(5, "0") + translations["i"][0][language] +
                (radnovrijeme[i][3].toFixed(2)).padStart(5, "0") + '-' +
                (radnovrijeme[i][4].toFixed(2)).padStart(5, "0")
              ).replaceAll(".", ":")
            }
            _vrijemedo = tt;
  
            var pomocni = tm[0];
  
            tm = (tm[0]).padStart(2, "0") + ':' + (tm[1]).padStart(2, "0")
            return (pomocni == 0 ? (sutra(kojidan, i) ? translations['sutra'][0][language] : translations[radnovrijeme[i][0]][0][language]) + ' - ' + '24:00' :
              (sutra(kojidan, i) ? translations['sutra'][0][language] : translations[radnovrijeme[i][0]][0][language]) + ' - ' + tm);
          }
        }
      }
    }
  
    if (day[3] != undefined) {
      dvokratno = true
    }
  
    //pozivam jednom slijedeciradnidan da popunimo u svakom slucaju _slijedecidan
    //ako danas jos nije otvoreno, _slijdecidan je danas
    if (!neradno) {
      if (day[1] >= vrijemesada) {
        _slijedecidan = 'danas';
        if (dvokratno) {
          _vrijemedo = (
            (radnovrijeme[kojidan][1].toFixed(2)).padStart(5, "0") + '-' +
            (radnovrijeme[kojidan][2].toFixed(2)).padStart(5, "0") + translations["i"][0][language] +
            (radnovrijeme[kojidan][3].toFixed(2)).padStart(5, "0") + '-' +
            (radnovrijeme[kojidan][4].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
        } else {
          _vrijemedo = (
            (radnovrijeme[kojidan][1].toFixed(2)).padStart(5, "0") + '-' +
            (radnovrijeme[kojidan][2].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
        }
      }
      //ako se nalazimo u pauzi izmedju dvije smjene
      if (dvokratno) {
        if (vrijemesada > day[2] && vrijemesada < day[3]) {
          _slijedecidan = 'danas';
          _vrijemedo = (
            (radnovrijeme[kojidan][3].toFixed(2)).padStart(5, "0") + '-' +
            (radnovrijeme[kojidan][4].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
        }
      }
    }
  
    var day_string;
    var vrijeme_zatvaranja, vrijeme_otvaranja;
  
    //Zatvaramo za...
    function zatvaramoZaMinuta() {
      if (dvokratno) {
        day_string = day[4].toFixed(2);
  
        //ali ako smo jos u prvoj smjeni uzimamo prvi datum
        if (vrijemesada < day[2]) {
          day_string = day[2].toFixed(2)
        }
      } else {
        day_string = day[2].toFixed(2);
      }
      vrijeme_zatvaranja = day_string.split('.')
  
      var zatvaranje = new Date(
        (danas.getMonth() + 1) + '/' +
        danas.getDate() + '/' +
        danas.getFullYear() + ' ' +
        vrijeme_zatvaranja[0].toString() + ':' +
        vrijeme_zatvaranja[1].toString()
      );
      var zatvaramZa = timeDifference(danas, zatvaranje, 'zatvaranje');
      //srediti NaN
      _zatvaramo = zatvaramZa;
  
    }
    //kraj Zatvaramo za
  
    //Otvaramo za...
    function otvaramoZaMinuta() {
      var neRacunaj = false;
      if (dvokratno) {
        //ako je drugi dan tek
        if (vrijemesada >= day[4]) {
          _otvaramo = slijedeciRadniDan()
          neRacunaj = true;
        } else {
  
          day_string = day[3].toFixed(2);
  
          //ali ako smo jos u prvoj smjeni uzimamo prvi datum
          if (vrijemesada < day[3] && vrijemesada < day[1]) {
            day_string = day[1].toFixed(2)
          }
        }
  
      } else {
  
        if (vrijemesada >= day[2]) {
          _otvaramo = slijedeciRadniDan()
          neRacunaj = true;
        } else {
  
          day_string = day[1].toFixed(2);
        }
      }
  
      if (!neRacunaj) {
        vrijeme_otvaranja = day_string.split('.')
  
        var otvaranje = new Date(
          (danas.getMonth() + 1) + '/' +
          danas.getDate() + '/' +
          danas.getFullYear() + ' ' +
          vrijeme_otvaranja[0].toString() + ':' +
          vrijeme_otvaranja[1].toString()
        );
        var otvaramZa = timeDifference(danas, otvaranje, 'otvaranje');
        _otvaramo = otvaramZa;
      }
  
    }
    //kraj Otvaramo za
  
    if (!neradno) {
  
      //ako je radno vrijeme 0-24
      if (day[1] == 0 && day[2] == 24) {
        _status = 'allday';
      }
  
      if (vrijemesada < day[1]) {
        _status = 'closed';
        otvaramoZaMinuta();
      }
      if (vrijemesada >= day[4] && dvokratno) {
        _status = 'closed';
        otvaramoZaMinuta();
      }
  
      if (dvokratno) {
        if (vrijemesada >= day[2] && vrijemesada < day[3]) {
          _status = 'closed';
          otvaramoZaMinuta();
        }
      }
  
      if (vrijemesada >= day[2] && !dvokratno) {
        _status = 'closed';
        otvaramoZaMinuta();
      }
  
      if (vrijemesada >= day[1] && vrijemesada < day[2]) {
        if (dvokratno && vrijemesada < day[3]) {
          var temp = (
            (day[1].toFixed(2)).padStart(5, "0") + '-' +
            (day[2].toFixed(2)).padStart(5, "0") + translations["i"][0][language] +
            (day[3].toFixed(2)).padStart(5, "0") + '-' +
            (day[4].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
          _status = 'open';
          _vrijemedo = temp;
        } else {
          _status = 'open';
          var temp = (
            (day[1].toFixed(2)).padStart(5, "0") + '-' +
            (day[2].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
          _vrijemedo = temp;
        }
        zatvaramoZaMinuta();
      }
      if (dvokratno) {
        if (vrijemesada >= day[3] && vrijemesada < day[4]) {
          var temp = (
            (day[3].toFixed(2)).padStart(5, "0") + '-' +
            (day[4].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
          _status = 'open';
          _vrijemedo = temp;
          zatvaramoZaMinuta();
        }
        if (vrijemesada >= day[2] && vrijemesada < day[4] && vrijemesada >= day[3]) {
          var temp = (
            (day[3].toFixed(2)).padStart(5, "0") + '-' +
            (day[4].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
          _status = 'open';
          _vrijemedo = temp;
          zatvaramoZaMinuta();
        }
        //test
        if (vrijemesada >= day[2] && vrijemesada < day[3]) {
  
          var temp = (
            (day[3].toFixed(2)).padStart(5, "0") + '-' +
            (day[4].toFixed(2)).padStart(5, "0")
          ).replaceAll(".", ":")
          _status = 'closed';
          _slijedecidan = 'danas';
          _vrijemedo = temp;
          otvaramoZaMinuta();
        }
      }
  
    } else {
      _status = 'todayclosed'
      _otvaramo = slijedeciRadniDan();
    }
  
    _rezultat.status = _status;
    _rezultat.vrijemedo = _vrijemedo;
    _rezultat.otvaramo = _otvaramo;
    _rezultat.zatvaramo = _zatvaramo;
    _rezultat.slijedecidan = _slijedecidan;
  
    return _rezultat;
  
  }