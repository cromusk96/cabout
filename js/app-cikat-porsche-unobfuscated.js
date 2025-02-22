/* cSpell:disable */
var isNavigation = false;
var isVratiPrikaz = false;
var destinationLocation;
var gpsActive = false;
var gpsParcela;
var userCoordinates;
var viewera;
var isSetOrigin = false;
var listWaypoints = [];
var turfPoints;
var lng = 'en';
var mapCenter
var accomodation
var tockeLegs, duzinaLegs;
var popupDiv
$("html").attr("lang", lng)
var trackActive = true
var showAll
var isAppleDetected = ['iPhone', 'iPad', 'iPod', 'iPad Simulator', 'iPhone Simulator', 'iPod Simulator', ].includes(navigator.platform);
var isMuted = ""
var isAppleMuted = "muted"
var weather;
var lezaljke
var userLocation;
let _NATPISI_;
let linijePoKampu;
let brojGPS_QRCode;
let imgArray;
let showRvExtended = false
let modifiedRadnoVrijeme, wh

/*phobs*/
let slobodniSmjestaji = new Set();
let zauzetiSmjestaji = new Set();
let GLOBAL_zauzetiSmjestaji = new Set();
let naUpitSmjestaji = new Set();
let slobodniSmjetaji_Sve = [];
let zauzetiSmjestaji_Sve = [];
let GLOBAL_zauzetiSmjestaji_Sve = [];
let naUpitSmjestaji_Sve = [];
let temporaryHelperBook, temporaryHelperBook_2;
var brandColors;
let arraySlikaSlider = [];
let arraySlikaSlider_PO_TIPU = [];
let helper_vrstaSJ_zaSlike;
let _POSTAVKE_KAMPA_;
let _PARAMETRI_KAMPA;
let _pois_, _poisOther_;
let _PERIODI_REZERVACIJE_;
let cmsObjekti;
let _CMS_data_Objekti;
let poiLabels;
let _CMS_POILabels;
let flag_SAMO_NA_UPIT;
let _TABLICA_VRSTE_;
let pmsPropertyId_New;
let podacioParceli;

let panomPhotoUrl, panomPhotoUrlObjekt;
let _datumOdHelper, _datumDoHelper;

let picker;

let takeMeToAccomodation;

let _picker_temp_day = '0';

let PITCH_OR_MOBILE;

let PMS_RESERVATION_ID;
let mishHelper_Res;
let mishHelper_CancelRes;

let langFromURL;

let bookData = '';
let selectedChildren;
let selectedAdult;

let kampID; //ovo treba u parametre
let grupacijaName;

let _PRICES_PER_STAY_;

var slobodne;

let mishDatumOd, mishDatumDo, phobsDatumOd, phobsBrojDana, wemDatumOd, wemDatumDo, CADatumOd, CADatumDo;

//ovo mora biti isto za sve kampove
let _cmsParamsURL_ = 'https://campsabout.com/mapAPI/params.php?id=';

let paramZaBooking = {
	brojSJ: '',
	brojMISH: '',
	pmsUnitId: '',
	pmsTip: '',
	propertyId: '',
	datumOd: '',
	brojDana: '',
	jezik: '',
	brojOsoba: '',
	djecaGodine: {}
};

userLocation = true;

function getRandomIntLightbox(max) {
	return Math.floor(Math.random() * max);
}

function showLoader() {
	document.getElementById("spinner").classList.add("show");
}

function _RadnoVrijeme_NOPE(radnovrijeme, language) {

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
			return translate("minutu")
		}
		if (m > 1 && m < 5) {
			return translate("minute")
		}
		if (m >= 5 && m <= 20) {
			return translate("minuta")
		}
		if (m > 20) {
			if ((m % 10) == 1) {
				return translate("minutu")
			}
			if ((m % 10) > 1 && (m % 10) < 5) {
				return translate("minute")
			}
			if ((m % 10) >= 5) {
				return translate("minuta")
			}
			if ((m % 10) == 0) {
				return translate("minuta")
			}
		}
	}

	function satSati(m, lng) {
		if (m == 1) {
			return translate("sat")
		}
		if (m > 1 && m < 5) {
			return translate("sata")
		}
		if (m >= 5 && m <= 20) {
			return translate("sati")
		}
		if (m > 20) {
			if ((m % 10) == 1) {
				return translate("sat")
			}
			if ((m % 10) > 1 && (m % 10) < 5) {
				return translate("sata")
			}
			if ((m % 10) >= 5) {
				return translate("sati")
			}
			if ((m % 10) == 0) {
				return translate("sata")
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
			return (hours >= 1) ? "" : (minutes == 0 ? translate("nula") : minutes + minutaMinute(minutes, language))
		} else {

			return (minutes == 0 ? translate("nula") : ((hours > 0) ? hours + satSati(hours, language) + translate("i") : "") + minutes + minutaMinute(minutes, language))
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
						(radnovrijeme[i][2].toFixed(2)).padStart(5, "0") + translate("i") +
						(radnovrijeme[i][3].toFixed(2)).padStart(5, "0") + '-' +
						(radnovrijeme[i][4].toFixed(2)).padStart(5, "0")
					).replaceAll(".", ":")
				}
				_vrijemedo = tt;

				var pomocni = tm[0];

				tm = (tm[0]).padStart(2, "0") + ':' + (tm[1]).padStart(2, "0")

				rjesio = true;
				console.log('aaaa1', radnovrijeme[i][0])
				console.log('trans', translations)
				console.log('aaaa2', translations['Saturday'][0]['en'])
				return (pomocni == 0 ? (sutra(kojidan, i) ? translate('sutra') : translate(radnovrijeme[i][0])) + ' - ' + '24:00' :
					(sutra(kojidan, i) ?
						translate('sutra') :
						translate(radnovrijeme[i][0])) + ' - ' + tm);
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
							(radnovrijeme[i][2].toFixed(2)).padStart(5, "0") + translate("i") +
							(radnovrijeme[i][3].toFixed(2)).padStart(5, "0") + '-' +
							(radnovrijeme[i][4].toFixed(2)).padStart(5, "0")
						).replaceAll(".", ":")
					}
					_vrijemedo = tt;

					var pomocni = tm[0];

					tm = (tm[0]).padStart(2, "0") + ':' + (tm[1]).padStart(2, "0")
					return (pomocni == 0 ? (sutra(kojidan, i) ? translate('sutra') : translate(radnovrijeme[i][0])) + ' - ' + '24:00' :
						(sutra(kojidan, i) ? translate('sutra') : translate(radnovrijeme[i][0])) + ' - ' + tm);
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
					(radnovrijeme[kojidan][2].toFixed(2)).padStart(5, "0") + translate("i") +
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
					(day[2].toFixed(2)).padStart(5, "0") + translate("i") +
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

function hideLoader() {
	document.getElementById("spinner").classList.remove("show");
}

lightbox.option({
	'alwaysShowNavOnTouchDevices': true,
	'fitImagesInViewport': true,
	"fixedNavigation": true
});

let dev_env;
let noGPS;

const queryStringKamp = window.location.search;
const urlParamsKamp = new URLSearchParams(queryStringKamp);
dev_env = (urlParamsKamp.get('development') !== null) ? true : false;
noGPS = (urlParamsKamp.get('nogps') !== null) ? true : false;
langFromURL = (urlParamsKamp.get('lang') !== null) ? urlParamsKamp.get('lang') : '';

let qren = (urlParamsKamp.get('qren') !== null) ? true : false;

if (noGPS) {
	$('.col-sm-12.modal-button').css('display', 'none');
}

takeMeToAccomodation = (urlParamsKamp.get('pitch') !== null) ? urlParamsKamp.get('pitch') : '';

if (langFromURL !== '') {
	lng = langFromURL;
	$("html").attr("lang", lng);
}

//$('#booknowtraka').text(translate('checkAvail'));

kampID = $('#kampName').text();
grupacijaName = $('#groupName').text();

if ((urlParamsKamp.get('group_dev') !== null)) {
	grupacijaName = urlParamsKamp.get('group_dev')
};
if ((urlParamsKamp.get('kamp_dev') !== null)) {
	kampID = urlParamsKamp.get('kamp_dev')
};

//dev
if (kampID === '<%= kamp %>') {
	kampID = '1'
};
if (grupacijaName === '<%= group %>') {
	grupacijaName = 'demo'
};

function getCookie(cookieName) {
	let cookie = {};
	document.cookie.split(';').forEach(function(el) {
		let [key, value] = el.split('=');
		cookie[key.trim()] = value;
	})
	return cookie[cookieName];
}

async function MISH_Reservation(propertyCode, unitId, dateFrom, dateTo, nGuests) {

	let mishBody = JSON.stringify({
		"data": {
			"propertyCode": propertyCode,
			"unitId": unitId,
			"dateFrom": dateFrom,
			"dateTo": dateTo,
			"numGuests": nGuests
		}
	});

	var response = await fetch(_PARAMETRI_KAMPA.mishReservationURL, {
		method: 'POST',
		headers: {
			Accept: 'application.json',
			'Content-Type': 'application/json'
		},
		body: mishBody
	});
	if (response.status === 200) {
		mishHelper_Res = await response.json();
		return mishHelper_Res
	}

}

async function MISH_CancelationRes(reservationId) {

	let mishBody = JSON.stringify({
		"data": {
			"reservationId": reservationId
		}
	});

	var response = await fetch(_PARAMETRI_KAMPA.mishCancelReservationURL, {
		method: 'POST',
		headers: {
			Accept: 'application.json',
			'Content-Type': 'application/json'
		},
		body: mishBody
	});
	if (response.status === 200) {
		mishHelper_CancelRes = await response.json();
		//console.log('cancelation', mishHelper_CancelRes)
		return mishHelper_CancelRes
	}

}

async function ProcesBookiranja(brojSJ, datumOd, brojDana, brojOsoba, djecaGodine, jezik, mishDatumOd, mishDatumDo, propertyid) {

	//provjerimo jos jednom da li je taj unit_code slobodan
	let unitCodeFreeOrNot = await fetchMishByUnitCode(mishDatumOd, mishDatumDo, brojSJ, propertyid);

	if (unitCodeFreeOrNot.units[0].status === 'A') {
		let _helperUkupnoOsoba = paramZaBooking.brojOsoba + Object.keys(bookData['children']).length;

		let temp_pId = cikatPrimjer.find(item => item.brojMISH === brojSJ).pmsPropertyId;

		pmsPropertyId_New = temp_pId != '' ? temp_pId : _POSTAVKE_KAMPA_.propertyId;

		let mishResOdgovor = await MISH_Reservation(pmsPropertyId_New, paramZaBooking.pmsUnitId, mishDatumOd, mishDatumDo, _helperUkupnoOsoba);

		if (mishResOdgovor.reservation_id != '' && mishResOdgovor.reservation_id != undefined) {
			PMS_RESERVATION_ID = mishResOdgovor.reservation_id;
			//console.log('test_res_id', PMS_RESERVATION_ID);
			//console.log('test_pmsUnitId', paramZaBooking.pmsUnitId);
			//cancel reservation
			//console.log('cancel reservation', getCookie('reservationId'))
			if (_PARAMETRI_KAMPA.cancelRezBeforeNewOne === '1') {
				MISH_CancelationRes(getCookie('reservationId'));
			}

			var nowCookie = new Date();
			var timeCookie = nowCookie.getTime();
			var expireTimeCookie = timeCookie + 1000 * _POSTAVKE_KAMPA_.cuvanjeRezMin * 60;
			nowCookie.setTime(expireTimeCookie);
			document.cookie = "reservationId=" + PMS_RESERVATION_ID + ';expires=' + nowCookie.toUTCString() + '; SameSite=None; Secure; path=/';
			//document.cookie = "unitCode=" + paramZaBooking.brojSJ;

			PhobsBook(paramZaBooking.brojSJ, paramZaBooking.datumOd, paramZaBooking.brojDana, paramZaBooking.brojOsoba, paramZaBooking.djecaGodine, paramZaBooking.jezik, mishDatumOd, mishDatumDo);
		} else {
			document.getElementsByClassName('selected-date available')[0].innerHTML = translate('Smjestaj ipak nije dostupan');
			document.getElementsByClassName('selected-date available')[0].style.color = 'red';
		}

	} else {
		document.getElementsByClassName('selected-date available')[0].innerHTML = translate('Smjestaj ipak nije dostupan');
		document.getElementsByClassName('selected-date available')[0].style.color = 'red';
	}

}

$(document).ready(function() {
	$(".danasSutraDatum").val(moment().format('DD.M.YY.') + ' - ' + moment().add(1, 'days').format('DD.M.YY.'))
});

$(".danasSutraDatum").on("click", function() {
	$("#booknowtraka").click()
	$(".litepicker").css("display", "none")
})

//funkcija za phobsd book link
function PhobsBook(brojSJ, datumOd, brojDana, brojOsoba, djecaGodine, jezik, mishDatumOd, mishDatumDo) {

	showLoader();

	let RATE_ID_;

	if (PITCH_OR_MOBILE === 'M') {
		RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2023') ? _POSTAVKE_KAMPA_.defaultRateId : _PARAMETRI_KAMPA.rateM2024
	};
	if (PITCH_OR_MOBILE === 'P') {
		RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2023') ? _POSTAVKE_KAMPA_.parceleRateId : _PARAMETRI_KAMPA.rateP2024
	};

	let dataToSend = {
		"data": {
			"brojSJ": brojSJ,
			"datumod": datumOd,
			"brojdana": brojDana,
			"brojosoba": brojOsoba,
			"djecaGodine": djecaGodine,
			//"rateID": (PITCH_OR_MOBILE === 'M') ? _POSTAVKE_KAMPA_.defaultRateId : _POSTAVKE_KAMPA_.parceleRateId,
			"rateID": RATE_ID_,
			"jezik": jezik,
			"kampId": _POSTAVKE_KAMPA_.kampId,
			"grupacija": grupacijaName
		}
	};

	if ((brojSJ === '') || (datumOd === '') || (brojDana === '') || (brojOsoba === '')) return false;
	if ((brojSJ == undefined) || (datumOd == undefined) || (brojDana == undefined) || (brojOsoba == undefined)) return false;

	async function PhobsCampsaboutApiCall(dataToSend) {
		var response = await fetch(_PARAMETRI_KAMPA.phobsBookURL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataToSend),
		});
		if (response.status === 200) {
			temporaryHelperBook = await response.json();
			//console.log(temporaryHelperBook);
			return temporaryHelperBook
		}
	}

	async function POZOVI_PhobsCampsaboutApiCall(dataToSend) {
		//da li zovemo link iz prices per stay ili zovemo jos jednom api

		if (_PARAMETRI_KAMPA.callPhobsFromPricesPerStay === '0') {
			temporaryHelperBook_2 = await PhobsCampsaboutApiCall(dataToSend);
			return temporaryHelperBook_2;
		} else {
			return _PRICES_PER_STAY_[paramZaBooking.pmsTip].url;
		}
		//hideLoader();

		//može se dogoditi da mish api vrati da je slobodna a phobs javi da nije, onda nam naš servis vraća grešku i treba ju prikazati gostu
		// if (temporaryHelperBook_2.hasOwnProperty('error_message')) {
		//   console.log('Greška: ', temporaryHelperBook_2.error_message);
		//   document.getElementsByClassName('selected-date available')[0].innerHTML = 'Nažalost, smještaj nije dostupan u traženom periodu (' + temporaryHelperBook_2.error_message + ')';
		//   document.getElementsByClassName('selected-date available')[0].style.color = 'red';
		//
		// } else {
		//   window.open(temporaryHelperBook_2, '_blank');
		// }

	}

	//PHOBS FORM POST FUNCTION
	function postPhobs(path, params, method = 'post') {

		// The rest of this code assumes you are not using a library.
		// It can be made less verbose if you use one.
		const form = document.createElement('form');
		form.method = method;
		form.action = path;
		form.target = '_blank'; //provjeriti da li radi na iphoneu

		for (const key in params) {
			if (params.hasOwnProperty(key)) {
				const hiddenField = document.createElement('input');
				hiddenField.type = 'hidden';
				hiddenField.name = key;
				hiddenField.value = params[key];

				form.appendChild(hiddenField);
			}
		}

		document.body.appendChild(form);
		form.submit();
	}

	//POZOVI_PhobsCampsaboutApiCall(dataToSend);
	//idemo sa promise nacinom radi iphonea
	POZOVI_PhobsCampsaboutApiCall(dataToSend).then(link => {
		hideLoader();
		if (link.hasOwnProperty('error_message')) {
			//console.log('Greška: ', link.error_message);
			document.getElementsByClassName('selected-date available')[0].innerHTML = translate('Smjestaj ipak nije dostupan') + ' (' + link.error_message + ')';
			document.getElementsByClassName('selected-date available')[0].style.color = 'red';

			//ako ipak Phobs kaze da nije dostupan, canleaj rezervaciju koju si napravio
			MISH_CancelationRes(getCookie('reservationId'));

		} else {
			//window.open(link, '_blank');
			//ako postoji reservationId dodajemo i obavijest da se canclea prijasnja rezervacija
			if (getCookie('unitCode') != undefined && getCookie('unitCode') != 'undefined' && getCookie('unitCode') != '' && _PARAMETRI_KAMPA.cancelRezMessage === '1') {
				var bookingTimeMessage = `<div class="annotation"><h3>${translate("Reservation cancelation").replace('$brojSJ', getCookie('unitCode')) + ' ' + translate("Booking time message").replace('$minutes', _POSTAVKE_KAMPA_.cuvanjeRezMin)}</h3><div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`;
				//cancel reservation
				//console.log('cancel reservation', getCookie('reservationId'))
				//MISH_CancelationRes(getCookie('reservationId'));
			} else {
				var bookingTimeMessage = `<div class="annotation"><h3>${translate("Booking time message").replace('$minutes', _POSTAVKE_KAMPA_.cuvanjeRezMin)}</h3><div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`
			}
			$("#ModalParcela").modal("hide");
			$("body").append(bookingTimeMessage)
			$("body").addClass("message")
			$(".confirm").on("click", function() {
				$("body").removeClass("message");
				$(".annotation").remove();
				//console.log('xxxx', PMS_RESERVATION_ID)
				//document.cookie = "reservationId=" + PMS_RESERVATION_ID;
				var nowCookie = new Date();
				var timeCookie = nowCookie.getTime();
				var expireTimeCookie = timeCookie + 1000 * _POSTAVKE_KAMPA_.cuvanjeRezMin * 60;
				nowCookie.setTime(expireTimeCookie);
				document.cookie = "unitCode=" + paramZaBooking.brojSJ + ';expires=' + nowCookie.toUTCString() + '; SameSite=None; Secure; path=/';

				//link koji smo dobili moramo nadograditi sa dvije post varijable i to poslati
				//ovo je za testni server, vraća samo book.php, poslije to treba ispraviti!!!
				//link = _PARAMETRI_KAMPA.phobsBookUrlPrefixTest + link;
				if (_PARAMETRI_KAMPA.phobsReplaceOldURL != undefined && _PARAMETRI_KAMPA.phobsReplaceOldURL != '' && _PARAMETRI_KAMPA.phobsReplaceOldURL != null) {
					link = link.replace(_PARAMETRI_KAMPA.phobsReplaceOldURL, _PARAMETRI_KAMPA.phobsReplaceNewURL);
				}

				postPhobs(link, {
					"lot_number": paramZaBooking.brojSJ,
					"external_booking_id": PMS_RESERVATION_ID
				});

				//location.href = link;
			})
		}
	});

}
//xx
let odradibojanjedostupnosti;

showLoader();

var geojsonData;
/*phobs_end*/

$(".la-anim-5").addClass("la-animate")

const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

var gj = {
	"name": "MyFeatureType",
	"type": "FeatureCollection",
	"features": []
};

$(".search-header svg").on("click", function() {
	$(".menu-item").removeClass("selected")
	$(".menu-item").removeClass("not-selected")
	$("#ModalTrazi").modal("hide");
})

$(document).click(function(event) {
	var $target = $(event.target);
	if (!$target.closest('#ModalTrazi').length &&
		$('#ModalTrazi').is(":visible")) {
		$("#ModalTrazi").modal("hide")
	}
});

popupDiv = `<button class="btn btn-outline-secondary" id="navigateToPoi"><span>${translate("Take me")}</span><img src="assets/img/gps-arrow.svg"></button>`

$(window).on("load", function(e) {

	setTimeout(function() {
		$("#preloader").animate({
			"opacity": 0
		}, 1000)
		setTimeout(function() {
			$("html").removeClass("preloader")
			$("#preloader").remove()
			//
			// $("body").append($("<div/>",{class:"litepicker-back"}))
		}, 1000)
	}, 2500)
})

if (window.outerWidth < 768) {
	$(".mobile-menu .btn:not(#home)").on("click", function() {
		var target = $(this)
		$(target).addClass("click")
		setTimeout(function() {
			$(target).removeClass("click")
		}, 500)
	})
}

//const accessToken = 'pk.eyJ1Ijoib2xpc2hyIiwiYSI6ImNrZjVwZWg5NzBveXozMW9mZ2V1bXl2MHYifQ.aetx6rI5xii820zCaRyYYA';
const accessToken = 'pk.eyJ1IjoidHJpbXJkIiwiYSI6ImNrdDJqcGlzbDBsM2Eyd3Vscm40djZ2cmoifQ.q6UwItGIss7wbXA-6oD5OA';

mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
	container: 'map',
	attribution: true,
	pitch: 0,
	zoom: 18,
	style: 'mapbox://styles/trimrd/clj5qp2dt002p01o576nx3wnn'
});

var kojiFilter = '';

/*function wait(event, n) {
    console.log('Wait for ' + event + ' ' + n + '...');
    map.once(event, () => log('...' + event + ' ' + n));
    }
    
    function report() {
        console.log(map.loaded() ? 'Loaded': 'NotLoaded', map.isStyleLoaded() ? 'StyleLoaded':'StyleNotLoaded', map.areTilesLoaded()?'TilesLoaded':'TilesNotLoaded',Math.random());
        if (!map.loaded()) {
            wait('load', n++);
        }
        if (!map.isStyleLoaded()) {
            wait('styledata', n++);
        }
        if (!map.areTilesLoaded()) {
            wait('data', n++);
            wait('sourcedata', n++);
        }
    }

    report();*/

/*map.on('load', () => {

    console.log('loadano valjda')

    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
        }
    });

});
*/
var randomBroj = Math.random(1) * 1000;
randomBroj = randomBroj.toString().replace(".", "")

//var url_data = 'assets/gj/cikacikacikacika.1ax3';
var url_data = 'assets/gj/' + grupacijaName + '_' + kampID + '.1ax3';
url_data = url_data.replace('1ax3', 'json?' + randomBroj);

var url_data_linije = 'assets/gj/' + grupacijaName + '_linije_' + kampID + '.json?' + randomBroj;

/*phobs*/

var cijeneBaza;
var syncdataTest;

async function fetchCijene() {
	var response = await fetch(_PARAMETRI_KAMPA.phobsPricesUrl + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		syncdataTest = await response.json();
		return syncdataTest
	}
}

async function vratiCijene() {
	cijeneBaza = await fetchCijene();
}
//vratiCijene()

//natpisi
let gjNatpisi;
async function fetchNatpisi() {
	var response = await fetch(_PARAMETRI_KAMPA.cmsNatpisiURL + kampID + '&group=' + grupacijaName);

	if (response.status === 200) {
		gjNatpisi = await response.json();
		return gjNatpisi
	}
}

//poilabels
let cmspoilabels;
async function fetchPOILabels() {
	var response = await fetch(_PARAMETRI_KAMPA.poiLabelsURL + '?group=' + grupacijaName);
	if (response.status === 200) {
		cmspoilabels = await response.json();
		return cmspoilabels
	}
}

//geojson pois
let gjpois;
async function fetchPOIS() {
	var response = await fetch(_PARAMETRI_KAMPA.poisURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		gjpois = await response.json();
		return gjpois
	}
}

//geojson other pois
let gjpoisOther;
async function fetchPOISOther() {
	var response = await fetch(_PARAMETRI_KAMPA.poisOtherURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		gjpoisOther = await response.json();
		return gjpoisOther
	}
}

async function vratiPOIS() {
	gjpois = await fetchPOIS();
}

async function vratiPOISOther() {
	gjpoisOther = await fetchPOISOther();
}

//zatvoreneRezervacije
let _ZATVORENE_REZERVACIJE_;
async function fetchZatvoreneRezervacije(dateFrom, dateTo) {
	var response = await fetch(_PARAMETRI_KAMPA.zatvoreneRezURL + kampID + '&group=' + grupacijaName + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
	if (response.status === 200) {
		_ZATVORENE_REZERVACIJE_ = await response.json();
		return _ZATVORENE_REZERVACIJE_
	}
}

async function fetch_GEOJSON() {
	var response = await fetch(url_data);
	if (response.status === 200) {
		geojsonData = await response.json();
		return geojsonData;
	}
}

async function fetch_LineLayer() {
	var response = await fetch(url_data_linije);
	if (response.status === 200) {
		linijePoKampu = await response.json();
		return linijePoKampu;
	}
}

var cikatPrimjer, syncdataTest;

async function fetch_CMSDATA() {
	var response = await fetch(_PARAMETRI_KAMPA.cmsDataURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		syncdataTest = await response.json();
		return syncdataTest;
	}
}

async function vrati_CMSDATA() {
	cikatPrimjer = await fetch_CMSDATA();
}

var parametriKampaHelper;

async function fetch_ParametriKampa() {
	var response = await fetch(_cmsParamsURL_ + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		parametriKampaHelper = await response.json();
		return parametriKampaHelper;
	}
}

//za geojson objekata
async function fetch_CMS_Objekti() {
	var response = await fetch(_PARAMETRI_KAMPA.cmsObjektiURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		cmsObjekti = await response.json();
		return cmsObjekti;
	}
}

var cikatMish;
let headers = new Headers();

let mishUnitCodeStatusHelper;

async function fetchMishByUnitCode(mishDatumOd, mishDatumDo, mishUnitCode, propertyid) {
	let mishBody = JSON.stringify({
		"data": {
			"dateFrom": mishDatumOd,
			"dateTo": mishDatumDo,
			"unit_code": mishUnitCode,
			"pmsid": propertyid
		}
	});

	var response = await fetch(_PARAMETRI_KAMPA.mishUnitStatusURL, {
		method: 'POST',
		headers: {
			Accept: 'application.json',
			'Content-Type': 'application/json'
		},
		body: mishBody
	});
	if (response.status === 200) {
		mishUnitCodeStatusHelper = await response.json();
		return mishUnitCodeStatusHelper
	}
}

//prices for period phobs
let pricesPerStay;
async function PhobsPricesPerStay(dataToSend) {
	var response = await fetch(_PARAMETRI_KAMPA.phobsTotalPricesUrl, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(dataToSend),
	});
	if (response.status === 200) {
		pricesPerStay = await response.json();
		//console.log(pricesPerStay);
		return pricesPerStay
	}
}

async function fetchCikatMish(mishDatumOd, mishDatumDo, pmsid) {
	let mishBody = JSON.stringify({
		"data": {
			"dateFrom": mishDatumOd,
			"dateTo": mishDatumDo,
			"pmsid": pmsid
		}
	});

	var response = await fetch(_PARAMETRI_KAMPA.mishUnitStatusURL, {
		method: 'POST',
		headers: {
			Accept: 'application.json',
			'Content-Type': 'application/json'
		},
		body: mishBody
	});
	if (response.status === 200) {
		syncdataTest = await response.json();
		return syncdataTest
	}
}
//xx
async function vratiCikatMish(mishDatumOd, mishDatumDo, pmsid) {
	cikatMish = await fetchCikatMish(mishDatumOd, mishDatumDo, _POSTAVKE_KAMPA_.propertyId);
	console.log('vjeko', cikatMish)
	//xx
	var testStatusi = {};
	var testpomoc = {};
	var arraySamoSlobodne = [];

	//kreiramo svoj object kako nam pase

	for (const key in cikatMish.units) {

		testpomoc.brojSJ = cikatMish.units[key]['unit_code'];
		testpomoc.status = cikatMish.units[key]['status'];
		testpomoc.nasstatus = 'teststatus';
		//ako je otvoren booking
		if (cikatMish.units[key]['status'] === 'A' && _POSTAVKE_KAMPA_.zatvoriBooking === '0') {

			arraySamoSlobodne.push(cikatMish.units[key]['unit_code']);

		}

		testStatusi[key] = testpomoc;

		//TU BI JOS TREBALO DODATI da pogledamo da li je kod nas flag na nekoj parceli koja upada u period API-a i onda ažuriramo status na našu vrijednost
		//ALIIIIIIIIIIII AKO RIJEŠI MISH ONO SA PRIVREMENOM REZERVACIJOM, ONDA NAM TO NE TREBA
	}
}

//prijevodi
let prijevoditbl;
async function fetchTranslations() {
	var response = await fetch(_PARAMETRI_KAMPA.translationsURL + '?group=' + grupacijaName);
	if (response.status === 200) {
		prijevoditbl = await response.json();
		return prijevoditbl
	}
}

async function vratiTranslations() {
	translations = await fetchTranslations();
}

let periodiRezervacije, periodiHelper;
async function fetchPeriodiRez() {
	var response = await fetch(_PARAMETRI_KAMPA.periodiRezURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		periodiRezervacije = await response.json();
		return periodiRezervacije
	}
}

async function vratiPeriodiRez() {
	periodiHelper = await fetchPeriodiRez();
}

//slikepotipovima
let slikepotipovima;
async function fetchSlikePoSJ() {
	var response = await fetch(_PARAMETRI_KAMPA.slikeVrstaURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		slikepotipovima = await response.json();
		return slikepotipovima
	}
}

async function vratiSlikePoSJ() {
	arraySlikaSlider_PO_TIPU = await fetchSlikePoSJ();
}

async function fetchTextTest() {

	var response = await fetch(_PARAMETRI_KAMPA.colorsURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		syncdata = await response.json();
		return syncdata
	}
}

//tablica vrste
let tempTablicaVrste;
async function fetchTablicaVrste() {
	var response = await fetch(_PARAMETRI_KAMPA.cmsVrsteBrojOsobaURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		tempTablicaVrste = await response.json();
		return tempTablicaVrste
	}
}

//xx ovo isto treba povezati sa CMS
async function vratiRezultatBoje() {
	brandColors = await fetchTextTest();
}

//settings
let settingsData;
async function fetchSettings() {
	var response = await fetch(_PARAMETRI_KAMPA.settingsURL + kampID + '&group=' + grupacijaName);
	if (response.status === 200) {
		settingsData = await response.json();
		return settingsData
	}
}

async function vratiSettings() {
	_POSTAVKE_KAMPA_ = await fetchSettings();
}

//xx
var rezultat1;
//xx
async function apiCall() {
	_PARAMETRI_KAMPA = await fetch_ParametriKampa();
	brandColors = await fetchTextTest();
	_TABLICA_VRSTE_ = await fetchTablicaVrste();
	cijeneBaza = await fetchCijene();
	translations = await fetchTranslations();
	_CMS_POILabels = await fetchPOILabels();
	arraySlikaSlider_PO_TIPU = await fetchSlikePoSJ();
	_POSTAVKE_KAMPA_ = await fetchSettings();
	console.log(_POSTAVKE_KAMPA_)
	if (_POSTAVKE_KAMPA_.bookingModul === "1") {
		$("#nazivkampa").remove()
	}
	if (_POSTAVKE_KAMPA_.bookingModul === "0") {
		$(".bookWrapper").css("display", "none")
	}
	_pois_ = await fetchPOIS();
	_poisOther_ = await fetchPOISOther();
	_PERIODI_REZERVACIJE_ = await fetchPeriodiRez();
	rezultat1 = await fetch_GEOJSON();
	linijePoKampu = await fetch_LineLayer();
	_CMS_data_Objekti = await fetch_CMS_Objekti();
	_NATPISI_ = await fetchNatpisi();
	const fulfilledVal1 = await vrati_CMSDATA();
	//const fulfilledVal2 = await vratiCikatMish(); //ako je potrebno tu mogu dati parametar fulfilledVal1
	//DODAJ TU JOŠ TRENUTNO POVLAČENJE CIJENA ZA KALENDAR (ormari/api/test_cijene.php) !!!pazi, kada su odabrane SVE mobilke ili SVE parcele onda treba izmijeniti logiku
	//tj dodaj u json cjneika i min cijene po danima za tip M i za tip P
	//return fulfilledVal2;
}

let test222, broj_temp;
let popisZaCMS = [];

async function apiCallRez() {
	test222 = await apiCall();
	if (_POSTAVKE_KAMPA_.maintenanceMode === "1") {
		window.location.href = `maintenance.html?from=${window.location.href}`
	}
	zauzetiSmjestaji = new Set();
	zauzetiSmjestaji_Sve = [];

	//NEMOJ BRISATI OVO JE POPIS ZA CMS
	/*if (feature.properties.hasOwnProperty("icon")) { 
	  if (feature.properties.id != '') {
	    popisZaCMS.push({
	      id: feature.properties.id,
	      brand: feature.properties.icon,
	      latitude: feature.geometry.coordinates[0],
	      longitude: feature.geometry.coordinates[1]
	  });
	  }
	}*/

	//test vrtim za start geojson pa ćemo onda mu dodavati podatke
	rezultat1.features.forEach(function(feature, index) {
		if (feature.properties.hasOwnProperty("class")) { //ovo je možda problem jer u pravilu brend nećemo imati. bolje bi bilo ako je class porcela, mobilka ili glamping....
			if (feature.properties.class === 'parcela' || feature.properties.class === 'mh' || feature.properties.class === 'glamping') {


				//if (feature.properties.class === 'parcela') {
				popisZaCMS.push({
					id: feature.properties.id,
					brand: feature.properties.brand,
					broj: feature.properties.number
				})
				//};        

				//punim ono sta ce mi trebati za zauzete u periodu
				zauzetiSmjestaji.add(feature.properties.id);
				GLOBAL_zauzetiSmjestaji.add(feature.properties.id);

				broj_temp = cikatPrimjer.find(item => item.mapaId === feature.properties.id);

				//console.log('broj:temp', broj_temp);
				if (broj_temp != undefined) {
					//i dodajem u geojson podatak brojMISH. Na isti način cemo dodavati i tip parcele itd...
					feature.properties.brojMISH = broj_temp['brojMISH'];
					feature.properties.vrstaMISH = broj_temp['oznakaMISH'];
					feature.properties.oznakaPHOBS = broj_temp['oznakaPHOBS'];
					feature.properties.dbUid = broj_temp['uid'];
					feature.properties.brojGPS = broj_temp['brojGps'];
					//feature.properties.PMSUnitId = broj_temp['pmsUnitId'];
					feature.properties.brand = broj_temp['tipNaziv'];
					feature.properties.number = broj_temp['broj']; //za sada ne ALI UKLJUČI
					//prijevodi
					if (feature.properties.class === 'parcela') {
						feature.properties.en = translations['gjparcela'][0]['en'];
						feature.properties.de = translations['gjparcela'][0]['de'];
						feature.properties.it = translations['gjparcela'][0]['it'];
						feature.properties.hr = translations['gjparcela'][0]['hr'];
						feature.properties.ru = translations['gjparcela'][0]['ru'];
						feature.properties.si = translations['gjparcela'][0]['si'];
						feature.properties.pl = translations['gjparcela'][0]['pl'];
						feature.properties.nl = translations['gjparcela'][0]['nl'];
					}
					if (feature.properties.class === 'mh') {
						feature.properties.en = translations['gjmobilka'][0]['en'];
						feature.properties.de = translations['gjmobilka'][0]['de'];
						feature.properties.it = translations['gjmobilka'][0]['it'];
						feature.properties.hr = translations['gjmobilka'][0]['hr'];
						feature.properties.ru = translations['gjmobilka'][0]['ru'];
						feature.properties.si = translations['gjmobilka'][0]['si'];
						feature.properties.pl = translations['gjmobilka'][0]['pl'];
						feature.properties.nl = translations['gjmobilka'][0]['nl'];
					}
					if (feature.properties.class === 'glamping') {
						feature.properties.en = translations['gjglamping'][0]['en'];
						feature.properties.de = translations['gjglamping'][0]['de'];
						feature.properties.it = translations['gjglamping'][0]['it'];
						feature.properties.hr = translations['gjglamping'][0]['hr'];
						feature.properties.ru = translations['gjglamping'][0]['ru'];
						feature.properties.si = translations['gjglamping'][0]['si'];
						feature.properties.pl = translations['gjglamping'][0]['pl'];
						feature.properties.nl = translations['gjglamping'][0]['nl'];
					}
					if (feature.properties.class === 'caravan') {
						feature.properties.en = translations['gjcaravan'][0]['en'];
						feature.properties.de = translations['gjcaravan'][0]['de'];
						feature.properties.it = translations['gjcaravan'][0]['it'];
						feature.properties.hr = translations['gjcaravan'][0]['hr'];
						feature.properties.ru = translations['gjcaravan'][0]['ru'];
						feature.properties.si = translations['gjcaravan'][0]['si'];
						feature.properties.pl = translations['gjcaravan'][0]['pl'];
						feature.properties.nl = translations['gjcaravan'][0]['nl'];
					}
					//feature.properties.label = broj_temp['naziv']; za sada ne ALI UKLJUČI
				}
				//}
			}

			//ako je objekt
			if (feature.properties.class.split(" ")[0] == "objekt") {

				broj_temp = _CMS_data_Objekti.find(item => item.mapaId === feature.properties.id);

				if (broj_temp != undefined) {
					//dodajem u geojson, za sada samo naziv tj label
					feature.properties.label = broj_temp['naziv'];
					//ZA SADA NEČEMO ALI TU ISTO TREBA PRIJEVODE RJEŠITI!!!! ---NE TREBA, rjesio sam to dolje sa funkcijom koja gleda translate po uid vrste objekta                                                                  
					feature.properties.recommended = broj_temp['recommended'];
				}
			}
		}
	});

	//dodajemo pois
	rezultat1 = {
		"type": "FeatureCollection",
		"features": rezultat1.features.concat(_pois_.features)
	};

	zauzetiSmjestaji_Sve = Array.from(zauzetiSmjestaji);

	//KADA JE SVE GOTOVO E ONDA UCITAVAM MAPU
	ucitajMapu();
}

apiCallRez();

//xx
async function apiCall_Dostupnost(mishDatumOd, mishDatumDo, bRefreshInterval) {

	if (bRefreshInterval === false) {
		showLoader();
	}

	//zatvoreni periodi rezervacija
	let _ZatvoreneRez = await fetchZatvoreneRezervacije(CADatumOd, CADatumDo);
	const mySetZatvoreneRez = new Set();

	for (var key in _ZatvoreneRez) {
		for (let i = 0; i < _ZatvoreneRez[key].oznaka.length; i++) {
			mySetZatvoreneRez.add(_ZatvoreneRez[key].oznaka[i])
		}
	}

	let RATE_ID_;

	if (PITCH_OR_MOBILE === 'M') {
		RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2023') ? _POSTAVKE_KAMPA_.defaultRateId : _PARAMETRI_KAMPA.rateM2024
	};
	if (PITCH_OR_MOBILE === 'P') {
		RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2023') ? _POSTAVKE_KAMPA_.parceleRateId : _PARAMETRI_KAMPA.rateP2024
	};

	let phobsPPS = {
		"data": {
			"datumod": phobsDatumOd,
			"brojdana": phobsBrojDana,
			"brojosoba": bookData['adults'],
			"pitchOrMobile": PITCH_OR_MOBILE,
			"jezik": lng,
			//"rateId": (PITCH_OR_MOBILE === 'M') ? _POSTAVKE_KAMPA_.defaultRateId : _POSTAVKE_KAMPA_.parceleRateId,
			"rateId": RATE_ID_,
			"djecaGodine": bookData['children'],
			"kampId": _POSTAVKE_KAMPA_.kampId,
			"grupacija": grupacijaName
		}
	};

	if (!bRefreshInterval) {
		_PRICES_PER_STAY_ = await PhobsPricesPerStay(phobsPPS);
	}

	//moram opet popuniti sa pocetnim vrijednostima
	zauzetiSmjestaji = new Set();
	zauzetiSmjestaji = new Set([...GLOBAL_zauzetiSmjestaji]);
	slobodniSmjestaji.clear();

	//stavljamo za slucaj da ne baca gresku jer barem jednu vrijednost mora imati
	naUpitSmjestaji.add('1000000');
	zauzetiSmjestaji.add('2000000');
	slobodniSmjestaji.add('3000000');

	const mish_dostupnost = await vratiCikatMish(mishDatumOd, mishDatumDo, _POSTAVKE_KAMPA_.propeartyId);

	cikatMish.units.forEach(function(feature) {

		let _IMA_PHOBS_CIJENU_;
		_IMA_PHOBS_CIJENU_ = true;
		//slobodniSmjestaji.push(feature.unit_code);
		let postojiTajCode = cikatPrimjer.find(item => item.brojMISH === feature.unit_code); //ovo se može optimizirati da ne filtriramo dva puta jedno te isto

		let boolZatvorena = Array.from(mySetZatvoreneRez).find(e => e === feature.unit_code);

		if (postojiTajCode != undefined) {

			//let _tempPomocUnit_ = cikatPrimjer.find(item => item.brojMISH === feature.unit_code); //evo rjesavam da ne vrtimo dva puta
			let mapaIdTemp = postojiTajCode['mapaId'];

			//ako provjeravamo da li postoji cijena u phobs-u
			if (_PARAMETRI_KAMPA.checkPhobsPrice === '1' && !qren) {
				_IMA_PHOBS_CIJENU_ = (_PRICES_PER_STAY_[feature.unit_type_code] != undefined);
			}

			if (feature.status === 'A' && _POSTAVKE_KAMPA_.zatvoriBooking === '0' && boolZatvorena == undefined && _IMA_PHOBS_CIJENU_) {
				if (mapaIdTemp != undefined) {
					//ako je isti tip, ako ne neka ostane zauzeto
					if (PITCH_OR_MOBILE === postojiTajCode['tip']) {
						//ako je flag dostupna
						if (postojiTajCode['dostupna'] === '1') {
							slobodniSmjestaji.add(mapaIdTemp);
							zauzetiSmjestaji.delete(mapaIdTemp); //i ovo radi super :)
						}
						if (postojiTajCode['samoNaUpit'] === '1') {
							naUpitSmjestaji.add(mapaIdTemp);
							zauzetiSmjestaji.delete(mapaIdTemp);
							slobodniSmjestaji.delete(mapaIdTemp);
						}
					}
				}
			} else {
				//rjesavamo ako je samoNaUpit da ne bude crvena nego orange
				if (postojiTajCode['samoNaUpit'] === '1') {

					naUpitSmjestaji.add(mapaIdTemp);
					zauzetiSmjestaji.delete(mapaIdTemp);
					slobodniSmjestaji.delete(mapaIdTemp);
				}
			}
		}

	});

	slobodniSmjetaji_Sve = Array.from(slobodniSmjestaji);
	zauzetiSmjestaji_Sve = Array.from(zauzetiSmjestaji);
	naUpitSmjestaji_Sve = Array.from(naUpitSmjestaji);

	//accomodation = slobodniSmjetaji_Sve;
	slobodne = zauzetiSmjestaji_Sve;

	odradibojanjedostupnosti();

	if (bRefreshInterval === false) {
		hideLoader();
	}

}

/*phobs_end*/

function ucitajMapu() {

	const __minute = 1000 * 60;
	const __hour = __minute * 60;
	const __day = __hour * 24;
	const __year = __day * 365;

	function azurirajStatuse() {
		if (_datumOdHelper != '' && _datumOdHelper != undefined) {
			apiCall_Dostupnost(_datumOdHelper, _datumDoHelper, true)
		}
	}

	setInterval(azurirajStatuse, _PARAMETRI_KAMPA.intervalUpdateStatus);

	let logoElement = document.getElementById('kamplogo');
	logoElement.src = '../../' + _POSTAVKE_KAMPA_.logo.replace('/cms/', 'kamp/views/');

	$('#booknowtraka').text(translate('checkAvail'));

	let nazivKampaElement = document.getElementById('nazivkampa');
	if (_POSTAVKE_KAMPA_.naziv === '.') {
		_POSTAVKE_KAMPA_.naziv = ''
	};
	if (nazivKampaElement) {
		nazivKampaElement.innerHTML = _POSTAVKE_KAMPA_.naziv;
	}

	document.title = _POSTAVKE_KAMPA_.naziv;

	odradibojanjedostupnosti = function() {

		if ($(".filter-item:not(.brand)").is(".active")) {
			$(".filter-item").removeClass("active")
		}
		var isBrandActive
		//availability = getRandom(accomodation, Math.ceil(accomodation.length / 2))
		if ($(".filter-item.brand").is(".active")) {
			isBrandActive = $(".filter-item.brand.active").text()
			kojiFilter = isBrandActive;
			coloringFilterDate(isBrandActive)
		} else {
			$("#layers").removeClass("active")
			$(".filter-item:not(#viewall):not(#filter)").css({
				"opacity": "1",
				"font-weight": "600"
			})

			showInterestPointsAll()
			resetingColors();
			coloringAvailable()
			/*map.fitBounds(bbox, {
			  padding: {
			    top: ($(window).height() * 0.2),
			    bottom: ($(window).height() * 0.2),
			    left: 10,
			    right: 10
			  }
			})*/

		}
		$("#date").addClass("active")

	}

	/*BOOK NOW*/

	let format = 'YYYY-MM-DD'; //<-- Change this to the date format your using for your project, otherwise this doesn't matter keep it the same.
	let today = moment(); //Gets today's date in a moment object

	/*phobs*/
	function formatDatumWEM(inputDate) {
		let date, month, year;

		date = inputDate.getDate();
		month = inputDate.getMonth() + 1;
		year = inputDate.getFullYear();

		return `${date}-${month}-${year}`;
	}

	function formatDatumCA(inputDate) {
		let date, month, year;

		date = inputDate.getDate();
		month = inputDate.getMonth() + 1;
		year = inputDate.getFullYear();

		return `${year}-${month}-${date}`;
	}

	function formatDatumMish(inputDate) {
		let date, month, year;

		date = inputDate.getDate();
		month = inputDate.getMonth() + 1;
		year = inputDate.getFullYear();

		date = date
			.toString()
			.padStart(2, '0');

		month = month
			.toString()
			.padStart(2, '0');

		return `${date}.${month}.${year}`;
	}

	function formatDatumPhobs(inputDate) {
		let date, month, year;

		date = inputDate.getDate();
		month = inputDate.getMonth() + 1;
		year = inputDate.getFullYear();

		date = date
			.toString()
			.padStart(2, '0');

		month = month
			.toString()
			.padStart(2, '0');

		return `${year}-${month}-${date}`;
	}

	function dateDifference(date1, date2) {

		return parseInt((date1 - date2) / (24 * 3600 * 1000));
	}

	function MinDatumPicker(date1, date2) {
		let datum1 = new Date(date1);
		let datum2 = new Date(date2);

		return (datum2 >= datum1)
	}

	let lastDayOfCurrentYear = new Date(new Date().getFullYear(), 11, 31);
	lastDayOfCurrentYear = formatDatumPhobs(lastDayOfCurrentYear);

	setTimeout(function() {
		loadBookButton()
	}, 2000)

	function loadBookButton() {
		let getTodayDate = new Date()

		let getTodayDay = getTodayDate.getDate()
		let getTodayMonth = getTodayDate.getMonth() + 1
		let getNextMonth = getTodayDate.getMonth() + 2
		let getTodayYear = getTodayDate.getFullYear()
		$("#bookfield").attr("value", `${getTodayDay}.${getTodayMonth}.${getTodayYear}. - ${getTodayDay}.${getTodayMonth == 12 ? 1 : getNextMonth}.${getTodayMonth == 12 ? getTodayYear+1 : getTodayYear}.`)
	}

	bookData = new Object();

	$(".book-form").on("click", function() {

		picker.hide();

		setTimeout(() => {

			//rjesiti do kraja maintenance
			/*if (true) {

        $(document).on("click", ".confirm", function() {
          $("body").removeClass("message")
          $(".annotation").remove()
        })
  
        //booking je zatvoren
        $("body").addClass("message")
            $("body").append(`<div class="annotation"><h3>${translate("Imporant message")}</h3><p>Booking platform is currently under maintenance!</p><div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`)
          return;
      }*/

			$(".book-select").remove()
			$("body").append(`<div class="book-select">
      <div class="book-first-step">
        <h2>${translate('Select accomodation type')}</h2>
        <div class="select-type">
          <div class="book-type" data-book-type="pitch"><i class="fas fa-rv"></i>${translate('Select pitch')}</div>
          <div class="book-type" data-book-type="mh"><i class="fas-pro fa-house-tree"></i>${translate('Select mh')}</div>
        </div>
      </div>
    </div>`)
			if ($(".filters").is(".open")) {
				$(".filters").toggleClass("open");
			}
			if ($(".languages").is(".open")) {
				$(".languages").toggleClass("open");
			}

			//ZA SADA HARDKODIRANO
			if (kampID === '11') {
				$('[data-book-type="mh"]').css('display', 'none');
				$('[data-book-type="pitch"]').trigger('click');
			}

		}, 150)
	})

	$(document).on("click", ".book-type", function(e) {
		// let tip = $(".selected-type").text().substring($(".selected-type").text().indexOf(":") + 1, $(".selected-type").text().indexOf("|"))
		// tip = tip.replaceAll(" ", "")

		if (e.target.tagName == "I") {
			bookData['accomodation'] = e.target.parentElement.dataset.bookType
		} else {
			bookData['accomodation'] = e.target.dataset.bookType
		}
		(bookData['accomodation'] === 'pitch') ? PITCH_OR_MOBILE = 'P': PITCH_OR_MOBILE = 'M';

		// $(".book-limitations").html('')
		// $("body").append("<div class='book-limitations'></div>")

		// let byTip = bookData['accomodation'] === "pitch" ? periodiRezervacije.filter(p => p.tip === "P") : periodiRezervacije.filter(p => p.tip === "M")
		// let thisPeriod = {}

		// for (let period of byTip) {
		//   let { datumOd, datumDo } = period

		//   datumOd = new Date(datumOd)
		//   datumDo = new Date(datumDo)

		//   let today = new Date()

		//   if(today > datumOd && today <  datumDo) {
		//     console.log("da")
		//     thisPeriod = period
		//     break
		//   }
		// }

		// if (Object.keys(thisPeriod).length === 0) {
		//   $(".book-limitations").remove()
		// }

		// $(".book-limitations").html(`<p>${translate('bookLimitation') + ' ' + moment(thisPeriod.datumOd).format('DD.MM.') + ' - ' + moment(thisPeriod.datumDo).format('DD.MM.')}</p>
		// <p class="check-in-l"></p>
		// <p class="check-out-l"></p>`)

		// let daysOut = []
		// let daysIn = []

		// const dayCheckOut = (day) => {
		//   switch (day) {
		//     case "ponO":
		//       daysOut.push(translate("pon"))
		//       break;
		//     case "utoO":
		//       daysOut.push(translate("uto"))
		//       break;
		//     case "sriO":
		//       daysOut.push(translate("sri"))
		//       break;
		//     case "cetO":
		//       daysOut.push(translate("cet"))
		//       break;
		//     case "petO":
		//       daysOut.push(translate("pet"))
		//       break;
		//     case "subO":
		//       daysOut.push(translate("sub"))
		//       break;
		//     case "nedO":
		//       daysOut.push(translate("ned"))
		//       break;
		//     default:
		//       break;
		//   }
		// }


		// const dayCheckIn = (day) => {
		//   switch (day) {
		//     case "ponD":
		//       daysIn.push(translate("pon"))
		//       break;
		//     case "utoD":
		//       daysIn.push(translate("uto"))
		//       break;
		//     case "sriD":
		//       daysIn.push(translate("sri"))
		//       break;
		//     case "cetD":
		//       daysIn.push(translate("cet"))
		//       break;
		//     case "petD":
		//       daysIn.push(translate("pet"))
		//       break;
		//     case "subD":
		//       daysIn.push(translate("sub"))
		//       break;
		//     case "nedD":
		//       daysIn.push(translate("ned"))
		//       break;
		//     default:
		//       break;
		//   }
		// }

		// for (const [key, value] of Object.entries(thisPeriod)) {
		//   if (value === "1") {
		//     dayCheckOut(key)
		//     dayCheckIn(key)
		//   }
		// } 

		// $(".check-in-l").html(`<span>CHECK IN:</span> ${daysIn.toString()}`)
		// $(".check-out-l").html(`<span>CHECK OUT:</span> ${daysOut.toString()}`)

		// console.log($(e.target).closest(".book-select"));
		$(".book-first-step").addClass("date-selected")
		$(".book-select").append(`<div class="book-second-step">
      <h2>${translate('Broj gostiju select')}</h2>
      <div class="select-guests">
      <div class="adults">
        <div class="guest-number"><i class="fas fa-people"></i>${translate('Odrasli')}</div>
        <div class="adults-number">${(bookData.hasOwnProperty('adults')) ? bookData['adults'] : '2'}</div>
      </div>
      <div class="children">
        <div class="guest-number"><i class="fas fa-children"></i>${translate('Djeca')}</div>
        <div class="children-number">${(bookData.hasOwnProperty('children')) ? Object.keys(bookData['children']).length : '0'}</div>
      </div>
      </div>
      <div id="confirm-book" class="confirm-book">${translate('Potvrdi')}</div>
    </div>`)
		// console.log();
		// console.log(e.target.dataset.bookType);
		if (bookData.hasOwnProperty('children')) {
			setTimeout(function() {
				$(".children-select").remove()
				$(".children-age").remove()

				if (selectedChildren != 0 && selectedChildren != undefined) {
					$(".children").after(`<div class="children-age">
            <h3>${translate('Enter children age')}</h3>
          </div>`)
					for (var i = 0; i < selectedChildren; i++) {
						$(".children-age").append(`<div class="child">
              <div class="child-text">${translate('Dijete')} ${i+1}</div>
              <div class="child-age">${bookData['children']['child' + (i + 1)]}</div>
            </div>`)
					}
				}
			}, 150)
		}
	})

	$(document).on("click", ".adults-number", function() {
		if ($(".adults-select").is(":visible")) {
			$(".adults-select").remove()
		} else {
			$(".adults-select").remove()
			$(".adults").after(`<div class="adults-select">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
    </div>`)
		}
	})

	$(document).on("click", ".adults-select span", function(e) {
		selectedAdult = e.target.innerHTML
		$(".adults-number").html(selectedAdult)
		setTimeout(function() {
			$(".adults-select").remove()
		}, 150)
	})

	$(document).on("click", ".children-number", function() {
		if ($(".children-select").is(":visible")) {
			$(".children-select").remove()
		} else {
			$(".children-select").remove()
			$(".children").after(`<div class="children-select">
      <span>0</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
    </div>`)
		}
	})

	$(document).on("click", ".children-select span", function(e) {
		selectedChildren = e.target.innerHTML;

		$(".children-number").html(selectedChildren)
		setTimeout(function() {
			$(".children-select").remove()
			$(".children-age").remove()
			if (selectedChildren != 0) {
				$(".children").after(`<div class="children-age">
        <h3>${translate('Enter children age')}</h3>
      </div>`)
				for (var i = 0; i < selectedChildren; i++) {
					$(".children-age").append(`<div class="child">
          <div class="child-text">${translate('Dijete')} ${i+1}</div>
          <div class="child-age">0</div>
        </div>`)
				}
			}
		}, 150)
	})

	$(document).on("click", ".child-age", function(e) {
		if ($(e.target.parentElement).next(".age").is(":visible")) {
			$(e.target.parentElement).next(".age").remove()
		} else {
			$(e.target.parentElement).next(".age").remove()
			$(e.target.parentElement).after(`<div class="age">
    <span>0</span>
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
    <span>10</span>
    <span>11</span>
    <span>12</span>
    <span>13</span>
    <span>14</span>
    <span>15</span>
    <span>16</span>
    <span>17</span>
    </div>`)
		}
	})

	$(document).on("click", ".age span", function(e) {
		let selectedAge = e.target.innerHTML
		$(e.target.parentElement).prev(".child").children(".child-age").html(selectedAge)
		setTimeout(function() {
			$(e.target.parentElement).remove()
		}, 150)
	})

	if (_PARAMETRI_KAMPA.prviDanZaRez == undefined) {
		_PARAMETRI_KAMPA.prviDanZaRez = 0;
	  }  

	picker = new Litepicker({
		element: document.getElementById('booknowtraka'),
		singleMode: false,
		autoApply: false,
		position: "bottom",
		numberOfMonths: 1,
		// resetButton: true,
		minDate: MinDatumPicker(today, _POSTAVKE_KAMPA_.otvorenOd) ? moment(_POSTAVKE_KAMPA_.otvorenOd).add(_PARAMETRI_KAMPA.prviDanZaRez, 'd') : moment(today).add(_PARAMETRI_KAMPA.prviDanZaRez, 'd'), //dodati ovdje da pazimo na datum otvaranja kampa, isto rjesiti dolje datzum zatvaranja kampa
		maxDate: MinDatumPicker(lastDayOfCurrentYear, _POSTAVKE_KAMPA_.otvorenDo) ? _POSTAVKE_KAMPA_.otvorenDo : (MinDatumPicker(_POSTAVKE_KAMPA_.otvorenDo, lastDayOfCurrentYear) ? _POSTAVKE_KAMPA_.otvorenDo : null),
		selectForward: true,
		minDays: (qren == true) ? 2 : ((PITCH_OR_MOBILE === 'P') ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1),
		maxDays: 90,
		zIndex: 1,
		disallowLockDaysInRange: true,
		plugins: ['mobilefriendly'],
		mobilefriendly: {
			breakpoint: 680,
		},
		tooltipText: {
			one: translate("Nights")[0],
			other: translate("Nights")[1]
		},
		tooltipNumber: (totalDays) => {
			phobsBrojDana = totalDays - 1; //možda bi bilo pametnije da ipak računamo broj dana između dva datuma jer ovo nismo 100% da će uvijek trigerirat
			return totalDays - 1;
		},

		resetButton: () => {
			$(".danasSutraDatum").val(moment().format('DD.M.YY.') + ' - ' + moment().add(1, 'days').format('DD.M.YY.'))
			var btn = document.createElement('button');
			btn.classList.add("reset-button")
			btn.innerHTML = translate("Clear");
			phobsDatumOd = '';
			_datumOdHelper = '';
			_datumDoHelper = '';
			btn.addEventListener('click', (evt) => {
				evt.preventDefault();
				if (!$("#layers").is(".active")) {
					resetingColors()
				}
				$(".selected-date").remove()
				$("#date").removeClass("active")

				$(".selected-parameters").remove()

				if ($(".filter-item.brand").is(".active")) {

					var isBrandActive = $(".filter-item.brand.active").text()
					coloringFilter(isBrandActive)
					hideInterestPoints()
				}
				if ($(".filter-item:not(.brand)").is(".active")) {
					var isBrandActive = $(".filter-item.active").data("class-object")
					var isIconActive = $(".filter-item.active").data("class")
					isBrandActive != undefined ? coloringClasses(isBrandActive) : coloringClasses("x")
					isIconActive != undefined ? showInterestPointFilterClass(isIconActive) : showInterestPointFilterClassObject(isBrandActive)

				}
				//vraćamo opcije rezervacija na nulu
				//ovo sam maknuo jer nam treba ostati kako smo definirali na klik kalendara, da li je parcela ili mobilka properties
				/*picker.setOptions({
				  lockDaysFilter: (day) => {
				    const d = day.getDay();
				    return [].includes(d);
				  },
				  minDate: today
				});*/

				picker.setOptions({
					minDays: (qren == true) ? 2 : ((PITCH_OR_MOBILE === 'P') ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1)
				})
				_picker_temp_day = '0'

				if (qren == false) {
					_PERIODI_REZERVACIJE_.forEach(element => {
						if (element.tip === PITCH_OR_MOBILE) {
							let dateFrom = new Date(element.datumOd);
							let dateTo = new Date(element.datumDo);
							let arrayDana = [];

							if (element.ponD === '0') arrayDana.push(1);
							if (element.utoD === '0') arrayDana.push(2);
							if (element.sriD === '0') arrayDana.push(3);
							if (element.cetD === '0') arrayDana.push(4);
							if (element.petD === '0') arrayDana.push(5);
							if (element.subD === '0') arrayDana.push(6);
							if (element.nedD === '0') arrayDana.push(0);

							//samo test pickera
							picker.setOptions({
								lockDaysFilter: (day) => {
									const d = day.getDay();
									if ((day.getTime() <= dateTo.getTime() && day.getTime() > dateFrom.getTime()) || (day.getTime() <= (dateTo.getTime() + __year) && day.getTime() > (dateFrom.getTime() + __year))) {
										return arrayDana.includes(d);
									}
								},
								minDate: today,
								startDate: today
							});

							picker.gotoDate(today);
						}

					});
				}

			});

			return btn;
		},
		setup: (picker) => {
			picker.on('mobilefriendly.before:show', (el) => {
					picker.setOptions({
						tooltipText: {
							one: translate("Nights")[0],
							other: translate("Nights")[1]
						},
						buttonText: {
							"apply": translate("Apply"),
							"cancel": translate("Cancel")
						}
					})
				}),
				picker.on('show', function(date1, date2) {
					picker.setOptions({
						tooltipText: {
							one: translate("Nights")[0],
							other: translate("Nights")[1]
						},
						buttonText: {
							"apply": translate("Apply"),
							"cancel": translate("Cancel")
						}
					})
				}),
				picker.on('hide', () => {
					$("#date").removeClass("open")
					$(".menu-item").removeClass("selected")
					$(".menu-item").removeClass("not-selected")
					$(".book-limitations").remove()
				}),
				picker.on('button:apply', (date1, date2) => {

					if (date1 != undefined) {
						mishDatumOd = formatDatumMish(date1);
						mishDatumDo = formatDatumMish(date2);
						wemDatumOd = formatDatumWEM(date1);
						wemDatumDo = formatDatumWEM(date2);
						phobsDatumOd = formatDatumPhobs(date1);
						CADatumOd = formatDatumCA(date1);
						CADatumDo = formatDatumCA(date2);

						_datumOdHelper = mishDatumOd;
						_datumDoHelper = mishDatumDo;

						apiCall_Dostupnost(mishDatumOd, mishDatumDo, false);
					}
				}),
				/*picker.on('selected', (date1, date2) => {
				  document.getElementById("bukiraj").disabled = false;

				  var optionsDateString = {
				    weekday: 'numeric',
				    year: 'numeric',
				    month: 'numeric',
				    day: 'numeric'
				  };

				  mishDatumOd = formatDatumMish(date1);
				  mishDatumDo = formatDatumMish(date2);
				  wemDatumOd = formatDatumWEM(date1);
				  wemDatumDo = formatDatumWEM(date2);
				  phobsDatumOd = formatDatumPhobs(date1);

				  _datumOdHelper = mishDatumOd;
				  _datumDoHelper = mishDatumDo;

				  apiCall_Dostupnost(mishDatumOd, mishDatumDo, false);
				}),*/
				picker.on('render:day', (day, date) => {

					//postavljamo kalendar
					let dateFrom, dateTo, arrayDana, minDanaRezPeriodi;
					_PERIODI_REZERVACIJE_.forEach(element => {

						if (qren == false) {
							if (_picker_temp_day === '0') {
								if (element.tip === PITCH_OR_MOBILE) {

									dateFrom = new Date(element.datumOd);
									dateTo = new Date(element.datumDo);
									arrayDana = [];

									minDanaRezPeriodi = parseInt(element.minDana);

									if (element.ponO === '0') arrayDana.push(1);
									if (element.utoO === '0') arrayDana.push(2);
									if (element.sriO === '0') arrayDana.push(3);
									if (element.cetO === '0') arrayDana.push(4);
									if (element.petO === '0') arrayDana.push(5);
									if (element.subO === '0') arrayDana.push(6);
									if (element.nedO === '0') arrayDana.push(0);

									if ((date.getTime() <= dateTo.getTime() && date.getTime() > dateFrom.getTime()) || (date.getTime() <= (dateTo.getTime() + __year) && date.getTime() > (dateFrom.getTime() + __year))) {
										if (picker.options.minDays != minDanaRezPeriodi + 1) {
											picker.setOptions({
												minDays: minDanaRezPeriodi + 1
											});
										}
										_picker_temp_day = '1';
										picker.gotoDate(date);
									}
								}
							}
						}

					});

					//console.log('dan je', day);
					//console.log('date je', date);
					var test555 = date.format('DD.MM.YYYY.');
					//alert('test')
					//console.log('koji filter', kojiFilter);

					//if (test555 >= moment().format('DD.MM.YYYY.')) { //IZGLEDA DA OVO NE RADI DOBRO
					if ((kojiFilter != '') && (kojiFilter != undefined)) {
						// var cena = cijene['Premium'].find(item => item.date == test555)
						//console.log(cijeneBaza[kojiFilter]);
						if (cijeneBaza[kojiFilter] != undefined) {
							var cena = cijeneBaza[kojiFilter].find(item => item.date == test555)

							//console.log('ovo je formatirano', cena, date);
							var div = `<div class="cijenadan">${cena != undefined ? cena.price : '-€'}</div>`
							day.insertAdjacentHTML('beforeend', div)
						}
					}

					//}
				}),

				picker.on('preselect', (date1, date2) => {
					if (date1 == undefined) {
						_picker_temp_day = '0';
					}

					if (date2 != undefined) {
						$(".danasSutraDatum").val(moment(date1.dateInstance).format('DD.M.YY.') + ' - ' + moment(date2.dateInstance).format('DD.M.YY.'))
						$(".book-limitations").html('')
						$("body").append("<div class='book-limitations'></div>")
						$(".book-limitations").html(`<p>${translate('bookLimitation') + ' ' + moment(date1.dateInstance).format('DD.MM.') + ' - ' + moment(date2.dateInstance).format('DD.MM.')}</p>
            <p class="check-in-l"></p>
            <p class="check-out-l"></p>`)
						let tip = $(".selected-type").text().substring($(".selected-type").text().indexOf(":") + 1, $(".selected-type").text().indexOf("|"))
						tip = tip.replaceAll(" ", "")

						let byTip = tip === "pitch" ? periodiRezervacije.filter(p => p.tip === "P") : periodiRezervacije.filter(p => p.tip === "M")
						let thisPeriod = {}

						for (let period of byTip) {
							let {
								datumOd,
								datumDo
							} = period

							datumOd = new Date(datumOd)
							datumDo = new Date(datumDo)

							datumOd1 = new Date(date1.dateInstance)
							datumDo1 = new Date(date2.dateInstance)

							if (datumOd1 >= datumOd && datumDo1 <= datumDo) {
								console.log("da")
								thisPeriod = period
								break
							}
						}

						if (Object.keys(thisPeriod).length === 0) {
							$(".book-limitations").remove()
						}

						let daysOut = []
						let daysIn = []

						const dayCheckOut = (day) => {
							switch (day) {
								case "ponO":
									daysOut.push(translate("pon"))
									break;
								case "utoO":
									daysOut.push(translate("uto"))
									break;
								case "sriO":
									daysOut.push(translate("sri"))
									break;
								case "cetO":
									daysOut.push(translate("cet"))
									break;
								case "petO":
									daysOut.push(translate("pet"))
									break;
								case "subO":
									daysOut.push(translate("sub"))
									break;
								case "nedO":
									daysOut.push(translate("ned"))
									break;
								default:
									break;
							}
						}


						const dayCheckIn = (day) => {
							switch (day) {
								case "ponD":
									daysIn.push(translate("pon"))
									break;
								case "utoD":
									daysIn.push(translate("uto"))
									break;
								case "sriD":
									daysIn.push(translate("sri"))
									break;
								case "cetD":
									daysIn.push(translate("cet"))
									break;
								case "petD":
									daysIn.push(translate("pet"))
									break;
								case "subD":
									daysIn.push(translate("sub"))
									break;
								case "nedD":
									daysIn.push(translate("ned"))
									break;
								default:
									break;
							}
						}

						for (const [key, value] of Object.entries(thisPeriod)) {
							if (value === "1") {
								dayCheckOut(key)
								dayCheckIn(key)
							}
						}

						$(".check-in-l").html(`<span>CHECK IN:</span> ${daysIn.toString()}`)
						$(".check-out-l").html(`<span>CHECK OUT:</span> ${daysOut.toString()}`)
					}

					if ((date1 != undefined) && (date2 == undefined) && (qren == false)) {
						if (_picker_temp_day === '0') {
							picker.setOptions({
								minDays: (PITCH_OR_MOBILE === 'P') ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1
							})
						}

						let dateFrom, dateTo, arrayDana;

						_PERIODI_REZERVACIJE_.forEach(element => {

							if (element.tip === PITCH_OR_MOBILE) {

								dateFrom = new Date(element.datumOd);
								dateTo = new Date(element.datumDo);
								arrayDana = [];

								if (element.ponO === '0') arrayDana.push(1);
								if (element.utoO === '0') arrayDana.push(2);
								if (element.sriO === '0') arrayDana.push(3);
								if (element.cetO === '0') arrayDana.push(4);
								if (element.petO === '0') arrayDana.push(5);
								if (element.subO === '0') arrayDana.push(6);
								if (element.nedO === '0') arrayDana.push(0);

								//ovo za sada micem jer izgleda da na klik prvog dana mi resetira na danasnji dan kalendar RJEŠENO!!!!!! treba picker.gotodate :)
								picker.setOptions({
									lockDaysFilter: (day) => {
										const d = day.getDay();
										if ((day.getTime() <= dateTo.getTime() && day.getTime() > dateFrom.getTime()) || (day.getTime() <= (dateTo.getTime() + __year) && day.getTime() > (dateFrom.getTime() + __year))) {
											return arrayDana.includes(d);
										}
									},
									minDate: date1,
									startDate: date1
								});

								picker.gotoDate(date1);
							}
						});

						if (date1.getTime() > dateTo.getTime()) {
							picker.setOptions({
								minDays: (PITCH_OR_MOBILE === 'P') ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1
							})
							picker.gotoDate(date1);
						}

					}
				})
		},
	});



	$(document).on("click", ".confirm-book", function() {
		//  let tip = $(".selected-type").text().substring($(".selected-type").text().indexOf(":") + 1, $(".selected-type").text().indexOf("|"))
		// tip = tip.replaceAll(" ", "")
		// console.log(PITCH_OR_MOBILE)
		$(".book-limitations").html('')
		$('.litepicker').removeClass('lpickertop')
		$("body").append("<div class='book-limitations'></div>")

		let byTip = PITCH_OR_MOBILE === "P" ? periodiRezervacije.filter(p => p.tip === "P") : periodiRezervacije.filter(p => p.tip === "M")
		let thisPeriod = {}

		if (byTip.length != 0) {

			for (let period of byTip) {
				let {
					datumOd,
					datumDo
				} = period

				datumOd = new Date(datumOd)
				datumDo = new Date(datumDo)

				let today = new Date()

				if (today > datumOd && today < datumDo) {
					console.log("da")
					thisPeriod = period
					break
				}
			}

			if (Object.keys(thisPeriod).length === 0) {
				thisPeriod = periodiRezervacije.find(p => p.tip === PITCH_OR_MOBILE)
			}

			$(".book-limitations").html(`<p>${translate('bookLimitation') + ' ' + moment(thisPeriod.datumOd).format('DD.MM.') + ' - ' + moment(thisPeriod.datumDo).format('DD.MM.')}</p>
    <p class="check-in-l"></p>
    <p class="check-out-l"></p>`)

			let daysOut = []
			let daysIn = []

			const dayCheckOut = (day) => {
				switch (day) {
					case "ponO":
						daysOut.push(translate("pon"))
						break;
					case "utoO":
						daysOut.push(translate("uto"))
						break;
					case "sriO":
						daysOut.push(translate("sri"))
						break;
					case "cetO":
						daysOut.push(translate("cet"))
						break;
					case "petO":
						daysOut.push(translate("pet"))
						break;
					case "subO":
						daysOut.push(translate("sub"))
						break;
					case "nedO":
						daysOut.push(translate("ned"))
						break;
					default:
						break;
				}
			}


			const dayCheckIn = (day) => {
				switch (day) {
					case "ponD":
						daysIn.push(translate("pon"))
						break;
					case "utoD":
						daysIn.push(translate("uto"))
						break;
					case "sriD":
						daysIn.push(translate("sri"))
						break;
					case "cetD":
						daysIn.push(translate("cet"))
						break;
					case "petD":
						daysIn.push(translate("pet"))
						break;
					case "subD":
						daysIn.push(translate("sub"))
						break;
					case "nedD":
						daysIn.push(translate("ned"))
						break;
					default:
						break;
				}
			}

			for (const [key, value] of Object.entries(thisPeriod)) {
				if (value === "1") {
					dayCheckOut(key)
					dayCheckIn(key)
				}
			}

			$(".check-in-l").html(`<span>CHECK IN:</span> ${daysIn.toString()}`)
			$(".check-out-l").html(`<span>CHECK OUT:</span> ${daysOut.toString()}`)

		} else {
			console.log('tu sam')
			$(".book-limitations").remove();
			$('.litepicker').addClass('lpickertop')
		}

		if (parseInt($(".children-number").html()) != 0) {
			bookData['adults'] = parseInt($(".adults-number").html())
			bookData['children'] = {}
			$(".child-age").each((item, i) => {
				bookData['children']['child' + parseInt(item + 1)] = parseInt($(i).html())
			})
		} else {
			bookData['adults'] = parseInt($(".adults-number").html())
			bookData['children'] = 0
		}

		//postavke kalendara
		if (qren == false) {
			_PERIODI_REZERVACIJE_.forEach(element => {
				if (element.tip === PITCH_OR_MOBILE) {
					let dateFrom = new Date(element.datumOd);
					let dateTo = new Date(element.datumDo);
					let arrayDana = [];

					if (element.ponD === '0') arrayDana.push(1);
					if (element.utoD === '0') arrayDana.push(2);
					if (element.sriD === '0') arrayDana.push(3);
					if (element.cetD === '0') arrayDana.push(4);
					if (element.petD === '0') arrayDana.push(5);
					if (element.subD === '0') arrayDana.push(6);
					if (element.nedD === '0') arrayDana.push(0);

					//samo test pickera
					picker.setOptions({
						lockDaysFilter: (day) => {
							const d = day.getDay();
							if ((day.getTime() <= dateTo.getTime() && day.getTime() > dateFrom.getTime()) || (day.getTime() <= (dateTo.getTime() + __year) && day.getTime() > (dateFrom.getTime() + __year))) {
								return arrayDana.includes(d);
							}
						}
					});
				}

			});
		}
		//kraj postavke kalendara

		$(".selected-parameters").remove()
		$("body").append(`<div class="selected-parameters">
    <div class="selected-type">${translate('Selected accomodation')} ${bookData['accomodation']} | ${translate('Odrasli')} ${bookData['adults']}, ${translate('Djeca')} ${bookData['children'] != 0 ? Object.keys(bookData['children']).length : 0}</div>
  </div>`)

		//$("#date").trigger("click")
		//picker.setOptions({element: document.getElementById('confirm-book')})
		$(".book-select").remove()
		picker.show();

	})

	$(document).on("click", ".book-select", function() {
		setTimeout(function() {
			let heightVar = 120
			if ($(window).width() < 768) {
				heightVar = 140
			}
			if ($(window).height() - heightVar <= Math.floor($(".book-second-step").outerHeight())) {
				// $(".book-select").css({"overflow-y":"scroll","max-height":"calc(100% - 120px)"})
				$(".book-select").addClass("over")
			} else {
				$(".book-select").removeClass("over")
			}
		}, 150)
	})

	$(document).on("click", ".button-apply", function() {
		if ($(".preview-date-range").html() != '') {
			let dates = $(".preview-date-range").html().split(" - ")
			let startYear = dates[0].split("-")[0]
			let startMonth = dates[0].split("-")[1]
			let startDay = dates[0].split("-")[2]
			let endYear = dates[1].split("-")[0]
			let endMonth = dates[1].split("-")[1]
			let endDay = dates[1].split("-")[2]
			$("#bookfield").val(`${startDay}.${startMonth}.${startYear} - ${endDay}.${endMonth}.${endYear}.`)
		}
	})

	$(document).on("click", function(event) {
		var $target = $(event.target)
		if (!$target.closest('.book-form').length) {
			if (!$target.closest('.book-select').length && $('.book-select').is(":visible")) {
				$(".book-select").remove()
			}
		}
	});

	/*KRAJ BOOK NOW*/


	function KontaktFormaUrl(jezik) {
		if (jezik === 'en') {
			return _PARAMETRI_KAMPA.contactFormEn
		}
		if (jezik === 'hr') {
			return _PARAMETRI_KAMPA.contactFormHr
		}
		if (jezik === 'it') {
			return _PARAMETRI_KAMPA.contactFormIt
		}
		if (jezik === 'de') {
			return _PARAMETRI_KAMPA.contactFormDe
		}
		if (jezik === 'si') {
			return _PARAMETRI_KAMPA.contactFormSi
		}
		if (jezik === 'pl') {
			return _PARAMETRI_KAMPA.contactFormPl
		}
		if (jezik === 'nl') {
			return _PARAMETRI_KAMPA.contactFormNl
		}
	}

	//za modal upit formu!!!!! IZBACIO SAM OVO VAN JER MI JE RADILO SVAKI PUT JOS JEDAN KLIK!!!!
	$(document).on('click', '#bukiraj', function() {
		document.getElementById("bukiraj").disabled = true;
		//ako je pošalji upit
		if (flag_SAMO_NA_UPIT) { //za sada je ovako ok, ali neka Stefi vidi da li je taj modal kako treba biti
			let mainUpitUrl;
			mainUpitUrl = KontaktFormaUrl(lng);
			let iframeSrcUpit = mainUpitUrl + '?space_code=' + paramZaBooking.brojSJ + '&date_from=' + wemDatumOd + '&date_to=' + wemDatumDo + '#specimen';
			var dataVideo = {
				'src': iframeSrcUpit,
				'height': '640px',
				'width': '640px'
			};
			$('#modalUpitForma').find("iframe").attr(dataVideo);
			//$("#ModalParcela").modal("hide");
			$("#modalUpitForma").modal("show");

			document.getElementById("bukiraj").disabled = false;
		} else {
			let temp_pId = cikatPrimjer.find(item => item.brojMISH === paramZaBooking.brojSJ).pmsPropertyId;

			pmsPropertyId_New = temp_pId != '' ? temp_pId : _POSTAVKE_KAMPA_.propertyId;

			ProcesBookiranja(paramZaBooking.brojSJ, paramZaBooking.datumOd, paramZaBooking.brojDana, paramZaBooking.brojOsoba, paramZaBooking.djecaGodine, paramZaBooking.jezik, mishDatumOd, mishDatumDo, pmsPropertyId_New);
			document.getElementById("bukiraj").disabled = false;
		}
	});

	//prijevodi za modale objekata
	function naslovModalaObjekt(id, jezik) {

		switch (id) {
			case '1':
				return translate('recepcija');
				break;
			case '2':
				return translate('bazen');
				break;
			case '3':
				return translate('pekara');
				break;
			case '4':
				return translate('trgovina');
				break;
			case '5':
				return translate('stand');
				break;
			case '6':
				return translate('sport');
				break;
			case '7':
				return translate('masaza');
				break;
			case '8':
				return translate('kafic');
				break;
			case '9':
				return translate('restoran');
				break;
			case '10':
				return translate('pizzeria');
				break;
			case '11':
				return translate('fastfood');
				break;
			case '12':
				return translate('wc');
				break;
			case '13':
				return translate('aquapark');
				break;
			case '14':
				return translate('hotel');
				break;
			default:
				return ''
		}
	}

	/*phobs*/

	var brandName, brandValue;

	//accomodation = slobodniSmjetaji_Sve;
	slobodne = zauzetiSmjestaji_Sve;

	function odradi() {
		//console.log('staje', brandColors);
		brandName = Object.keys(brandColors)
		brandValue = Object.values(brandColors)
	}

	/*phobs OVO JE PARAM.JS FAJLA*/
	var polylineCustom = {};

	function flippedCustom(coords) {
		var flipped = [];
		for (var i = 0; i < coords.length; i++) {
			var coord = coords[i].slice();
			flipped.push([coord[1], coord[0]]);
		}
		return flipped;
	}

	polylineCustom.decodeCustom = function(str, precision) {
		var index = 0,
			lat = 0,
			lng = 0,
			coordinates = [],
			shift = 0,
			result = 0,
			byte = null,
			latitude_change,
			longitude_change,
			factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

		while (index < str.length) {

			byte = null;
			shift = 0;
			result = 0;

			do {
				byte = str.charCodeAt(index++) - 63;
				result |= (byte & 0x1f) << shift;
				shift += 5;
			} while (byte >= 0x20);

			latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

			shift = result = 0;

			do {
				byte = str.charCodeAt(index++) - 63;
				result |= (byte & 0x1f) << shift;
				shift += 5;
			} while (byte >= 0x20);

			longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

			lat += latitude_change;
			lng += longitude_change;

			coordinates.push([lat / factor, lng / factor]);
		}

		return coordinates;
	};

	polylineCustom.toGeoJSONCustom = function(str, precision) {
		var coords = polylineCustom.decodeCustom(str, precision);
		return {
			type: 'LineString',
			coordinates: flippedCustom(coords)
		};
	};

	formatGPSDistance = {
		metric: function metric(m) {
			if (m >= 100000) return (m / 1000).toFixed(0) + 'km';
			if (m >= 10000) return (m / 1000).toFixed(1) + 'km';
			if (m >= 1000) return (m / 1000).toFixed(2) + 'km';
			if (m >= 100) return (m) + 'm';
			return m.toFixed(0) + 'm';
		}
	}

	const defaultMaxZoom = 19;
	var bbox;
	const panomFolder = './img/';

	var featureButtons = {
		"Market": [{
			"icon": "shopping-cart"
		}],
		"Restaurant": [{
			"icon": "utensils"
		}],
		"Bakery": [{
			"icon": "croissant"
		}]
	}

	var filterObjects = {
		"objekt recepcija": [{
			"icon": "ico-info"
		}],
		"objekt wc": [{
			"icon": "ico-wc"
		}],
		"objekt restoran": [{
			"icon": "ico-restaurant"
		}],
		"objekt bar": [{
			"icon": "ico-caffe-bar"
		}],
		"objekt suncobran": [{
			"icon": "ico-beach-umbrella"
		}],
		"objekt lezaljke": [{
			"icon": "ico-lounger"
		}]
	}

	// var filterList = {
	//   "classes": [{
	//     "bazen" : [{
	//       "en": "Pool",
	//       "hr": "Bazen",
	//       "filter": "yes"
	//     }],
	//     "parking" : [{
	//       "en": "Parking",
	//       "hr": "Parking",
	//       "filter": "yes"
	//     }]
	//   }],
	//   "icons": [
	//     {
	//       "ico-no-dog": [{
	//       "en": "Dog's not allowed",
	//       "hr": "Nije dozvoljeno za pse",
	//       "filter": "yes"
	//     }]
	//   },
	//     {
	//       "ico-trash": [{
	//       "en": "Trash",
	//       "hr": "Smeće",
	//       "filter": "yes"
	//     }]
	//   }
	//   ]
	// }

	poiLabels = _CMS_POILabels;

	var recommandations = {
		"Studenac": [{
			"en": "Fresh fish every day",
			"hr": "Svakodneva ponuda svježe ribe",
			"it": "Ogni giorno pesce fresca",
			"de": "Täglich frischer Fisch"
		}],
		"Toni": [{
			"en": "Hot burek always",
			"hr": "Vrući burek sa sirom za početak dana",
			"it": "Inserisci",
			"de": "Heißer Burek immer"
		}],
		"Đusto": [{
			"en": "Fine dining at best",
			"hr": "Najbolji fine dining u okolici",
			"it": "Fine dining",
			"de": "Feines Essen bestenfalls"
		}],
		"Pero": [{
			"en": "Fine dining at best",
			"hr": "Najbolji fine dining u okolici",
			"it": "Fine dining",
			"de": "Feines Essen bestenfalls"
		}]
	}

	var classColors = {
		"rub": [{
			// "color": "#eaeded",
			"color": "#d9ccb5",
			"border": "#d9ccb5"
		}],
		"obala": [{
			// "color": "#eaeded",
			// "color": "#F8F4F0",
			"color": "#f2f2e6",
			"border": "#9e9e8c"
		}],
		"obala_append": [{
			"color": "#dedec5",
			"border": "#b9bbbb"
		}],
		"zemlja": [{
			"color": "#dedec5",
			"border": "#b2b39f"
		}],
		"trava": [{
			"color": "#b4d894",
			"border": "#94b37b"
		}],
		"zona": [{
			"color": _PARAMETRI_KAMPA.zonaLayerColor,
			"border": "#94b37b"
		}],
		"zona_b": [{
			"color": _PARAMETRI_KAMPA.zona_bLayerColor,
			"border": "#94b37b"
		}],
		"cesta": [{
			// "color": "#f3f7f8",
			// "border": "#94b37b"
			"color": "#e2e6e8",
			"border": "#adaeae"
		}],
		"vegetacija": [{
			"color": "#98b87c",
			"border": "#8ba870"
		}],
		"vege_shadow": [{
			"color": "#6d8b52",
			"border": "#8ba870"
		}],
		"top4": [{
			"color": "#43632E",
			"border": "#43632E"
		}],
		"top3": [{
			// "color": "#72bf44",
			"color": "#8fbe72",
			"border": "#709f50"
		}],
		"top2": [{
			"color": "#66954C",
			"border": "#66954C"
		}],
		"top1": [{
			// "color": "#68a042",
			"color": "#709f50",
			"border": "#709f50"
		}],
		"parking_podloga": [{
			"color": "#e2e6e8",
			"border": "#adaeae"
		}],
		"rampa_podloga": [{
			"color": "#f2f2f2",
			"border": "#adaeae"
		}],
		"rampa": [{
			"color": "#ffffff",
			"border": "#adaeae"
		}],
		"rampa crveno": [{
			"color": "#d20808",
			"border": "#b20606"
		}],
		"parking_linija": [{
			"color": "#ffffff",
			"border": "#ffffff"
		}],
		"teren_linija": [{
			"color": "#ffffff",
			"border": "#ffffff"
		}],
		"bazen_podloga": [{
			"color": "#ebebeb",
			"border": "#9bc07b"
		}],
		"bazen": [{
			"color": "#8dedff",
			"border": "#6ab2bf"
		}],
		"objekti_podloga": [{
			"color": "#f2f2f2",
			// "color": "#e2e6e8",
			"border": "#adaeae"
		}],
		"objekt restoran": [{
			"color": "transparent",
			"border": "transparent"
		}],
		"objekt recepcija": [{
			"color": "transparent",
			"border": "transparent"
		}],
		"objekt teren": [{
			"color": "#68b29e",
			"border": "#68b29e"
		}],
		"teren_podloga": [{
			"color": "#65cbbf",
			"border": "#68b29e"
		}],
		"objekt parking": [{
			"color": "#f1f2f5",
			"border": "#b2b3b3"
		}],
		"objekt bar": [{
			"color": "transparent",
			"border": "transparent"
		}],
		"mobilka": [{
			"color": "#6babdd",
			"border": "#5d94bf"
		}],
		"objekt wc": [{
			// "color": "#f28586",
			"color": "transparent",
			"border": "transparent"
			// "border": "#c26b6c"
		}],
		"objekt wc roof1": [{
			"color": "#f28586",
			"border": "#c26b6c"
		}],
		"objekt wc roof2": [{
			"color": "#cf7273",
			"border": "#c26b6c"
		}],
		"objekt recepcija roof1": [{
			"color": "#f28586",
			"border": "#c26b6c"
		}],
		"objekt recepcija roof2": [{
			"color": "#cf7273",
			"border": "#c26b6c"
		}],
		"objekt restoran roof1": [{
			"color": "#f28586",
			"border": "#c26b6c"
		}],
		"objekt restoran roof2": [{
			"color": "#cf7273",
			"border": "#c26b6c"
		}],
		"objekt bar roof1": [{
			"color": "#f28586",
			"border": "#c26b6c"
		}],
		"objekt bar roof2": [{
			"color": "#cf7273",
			"border": "#c26b6c"
		}],
		"objekt lezaljke": [{
			"color": "#d5dcde",
			"border": "#a0a5a7"
		}],
		"objekt suncobran": [{
			"color": "#98e4f2",
			"border": "#7fbfcc"
		}],
		"objekt suncobran color": [{
			"color": "#85c7d5",
			"border": "#7fbfcc"
		}],
		"objekt suncobran_boja": [{
			"color": "#ffffff",
			"border": "#7fbfcc"
		}]
		// "roof3" : [{
		//   "color": "#ad5f60",
		//   "border": "#c26b6c"
		// }],
		// "roof4" : [{
		//   "color": "#8a4c4d",
		//   "border": "#c26b6c"
		// }],
		// "krov_linija" : [{
		//   "color": "#c26b6c",
		//   "border": "#c26b6c"
		// }]
	}

	var type = {
		"2B": [{
			"en": "2 Bedroom",
			"hr": "2 spavaće sobe",
			"it": "2 camere da letto",
			"de": "2 Schlafzimmer"
		}]
	}

	var amenities = {
		"wifi": [{
			"icon": "wifi"
		}],
		"parking": [{
			"icon": "parking"
		}],
		"spa": [{
			"icon": "spa"
		}],
		"laundry": [{
			"icon": "washer"
		}],
		"microwave": [{
			"icon": "microwave"
		}],
		"odvodnja": [{
			"icon": "water-lower"
		}],
		"struja6a": [{
			"icon": "bolt"
		}],
		"struja10a": [{
			"icon": "bolt"
		}],
		"struja16a": [{
			"icon": "bolt"
		}],
		"water": [{
			"icon": "water"
		}],
		"sattv": [{
			"icon": "tv"
		}],
		"kabeltv": [{
			"icon": "tv"
		}],
		"perilicaposuda": [{
			"icon": "washing-machine"
		}],
		"perilicarublja": [{
			"icon": "washer"
		}],
		"klima": [{
			"icon": "air-conditioner"
		}],
		"toster": [{
			"icon": "bread-slice"
		}],
		"pegla": [{
			"icon": "tshirt"
		}],
		"shower": [{
			"icon": "shower"
		}],
		"sink": [{
			"icon": "sink"
		}],
		"childrenToilet": [{
			"icon": "child"
		}],
		"chemicalToilet": [{
			"icon": "atom"
		}],
		"disabledToilet": [{
			"icon": "wheelchair"
		}],
		"privateToilet": [{
			"icon": "user-secret"
		}],
		"clothingWash": [{
			"icon": "washer"
		}],
		"dishWash": [{
			"icon": "hand-wash"
		}],
		"laundry": [{
			"icon": "washing-machine"
		}],
		"dryer": [{
			"icon": "dryer"
		}],
		"dogShower": [{
			"icon": "dog"
		}],
		"refrigerator": [{
			"icon": "refrigerator"
		}],
		"ambulanta": [{
			"icon": "ambulance"
		}],
		"restaurant": [{
			"icon": "soup"
		}],
		"wellness": [{
			"icon": "spa"
		}],
		"hairdresser": [{
			"icon": "user-hair"
		}],
		"fitness": [{
			"icon": "running"
		}],
		"kiosk": [{
			"icon": "store"
		}],
		"bar": [{
			"icon": "beer"
		}],
		"dog": [{
			"icon": "dog"
		}],
		"ban": [{
			"icon": "ban"
		}]
	}

	var availabilityColors = {
		"free": "#00d64a",
		"occupied": "#ff4659",
		"naupit": "#FFD580"
	}

	function hexToHSL(hex, param) {
		if (hex != "transparent") {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			r = parseInt(result[1], 16);
			g = parseInt(result[2], 16);
			b = parseInt(result[3], 16);
			r /= 255, g /= 255, b /= 255;
			var max = Math.max(r, g, b),
				min = Math.min(r, g, b);
			var h, s, l = (max + min) / 2;
			if (max == min) {
				h = s = 0; // achromatic
			} else {
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}
			var HSL = new Object();
			h = (h * 360)
			s = (s * 100)
			l = (l * 100)
			if (param == "border") {
				l = l - 4
			}
			if (param == "gps") {
				l = 90
			}
			if (param == "gps_border") {
				l = 85
			}

			HSL['h'] = Math.ceil(h)
			HSL['s'] = Math.ceil(s);
			HSL['l'] = Math.ceil(l)
			// return Object.values(HSL)[0];
			return `hsl(${HSL['h']}deg, ${HSL['s']}%, ${HSL['l']}%)`
		} else {
			return "transparent"
		}
	}

	function lightenDarkenColor(colorCode, amount) {
		let usePound = false;

		if (colorCode[0] == "#") {
			colorCode = colorCode.slice(1);
			usePound = true;
		}
		const num = parseInt(colorCode, 16);
		let r = (num >> 16) + amount;

		if (r > 255) {
			r = 255;
		} else if (r < 0) {
			r = 0;
		}

		let b = ((num >> 8) & 0x00FF) + amount;

		if (b > 255) {
			b = 255;
		} else if (b < 0) {
			b = 0;
		}

		let g = (num & 0x0000FF) + amount;

		if (g > 255) {
			g = 255;
		} else if (g < 0) {
			g = 0;
		}
		let color = (g | (b << 8) | (r << 16)).toString(16);
		while (color.length < 6) {
			color = 0 + color;
		}
		return (usePound ? '#' : '') + color;
	}

	/* -100 do 100 */
	var ligthPercentage = -40
	var ligthPercentageOccupied = -20
	var ligthPercentageFree = -100

	var layerColors = {
		fill: function() {
			var layer = [];
			for (i = 0; i < arguments.length; i++) {
				if (!arguments[i].includes("parcela") && !arguments[i].includes("glamping") && !arguments[i].includes("mh")) {
					layer.push(arguments[i], getClassColors(arguments[i], "color"))
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}

				if (arguments[i].includes("parcela") || arguments[i].includes("glamping") || arguments[i].includes("mh")) {
					for (i = 0; i < brandName.length; i++) {
						layer.push(brandName[i], brandValue[i][0].color)
					}
					layer.push("transparent")
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}
				//
			}
			return layer
		},
		border: function() {
			var layer = [];
			for (i = 0; i < arguments.length; i++) {
				if (!arguments[i].includes("parcela") && !arguments[i].includes("glamping") && !arguments[i].includes("mh")) {
					layer.push(arguments[i], getClassColors(arguments[i], "border"))
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}

				if (arguments[i].includes("parcela") || arguments[i].includes("glamping") || arguments[i].includes("mh")) {
					for (i = 0; i < brandName.length; i++) {
						layer.push(brandName[i], lightenDarkenColor(brandValue[i][0].color, ligthPercentage))
					}
					layer.push("transparent")
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}

			}
			// console.log("border", layer);
			return layer
		},
		fill_gps: function() {
			var layer = [];
			for (i = 0; i < arguments.length; i++) {
				if (!arguments[i].includes("parcela") && !arguments[i].includes("glamping") && !arguments[i].includes("mh")) {
					layer.push(arguments[i], hexToHSL(getClassColors(arguments[i], "color"), "gps"))
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}

				if (arguments[i].includes("parcela") || arguments[i].includes("glamping") || arguments[i].includes("mh")) {
					for (i = 0; i < brandName.length; i++) {
						layer.push(brandName[i], hexToHSL(brandValue[i][0].color, "gps"))
					}
					layer.push("transparent")
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}
				//
			}
			// console.log("gps bojanje", layer);
			// layer.push('transparent')
			return layer
		},
		border_gps: function() {
			var layer = [];
			for (i = 0; i < arguments.length; i++) {
				if (!arguments[i].includes("parcela") && !arguments[i].includes("glamping") && !arguments[i].includes("mh")) {
					layer.push(arguments[i], hexToHSL(getClassColors(arguments[i], "border"), "gps_border"))
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}

				if (arguments[i].includes("parcela") || arguments[i].includes("glamping") || arguments[i].includes("mh")) {
					for (i = 0; i < brandName.length; i++) {
						layer.push(brandName[i], hexToHSL(lightenDarkenColor(brandValue[i][0].color, ligthPercentage), "gps_border"))
					}
					layer.push("transparent")
					// layer.push(arguments[i], Function("return " + arguments[i])())
				}

			}
			return layer
		}
	}

	brandName = Object.keys(brandColors);
	brandValue = Object.values(brandColors);

	var layer1 = ["rub", "obala", "zemlja", "zona", "zona_b", "trava"]
	var layer2 = ["cesta"]
	// var layer3 =  ["vegetacija","vege_shadow","top1","top2","top3","top4","parking_podloga","rampa_podloga","rampa","rampa crveno","parking_linije","objekt parking","bazen_podloga","bazen","objekti_podloga","objekt restoran","objekt bar","teren_podloga","objekt teren","objekt wc","objekt recepcija","objekt lezaljke","objekt suncobran white","objekt suncobran color","krov_linija","objekt wc roof1","objekt wc roof2","objekt recepcija roof1","objekt recepcija roof2","objekt bar roof1","objekt bar roof2"]
	var layer3 = Object.keys(classColors).filter(item => !layer1.includes(item) && !layer2.includes(item))
	var layerBrands = ["parcela", "glamping", "mh"]

	function resetingColors() {

		if (map.getLayer("poi-numbers") != undefined) {
			resetNumberOpacity()
		}
		map.setPaintProperty('layer1_fill', 'fill-color',
			['match',
				['get', 'class'],
				...layerColors["fill"](...layer1),
				'transparent'
			]
		);
		map.setPaintProperty('layer1_border', 'line-color',
			['match',
				['get', 'class'],
				...layerColors["border"](...layer1),
				'transparent'
			]
		);
		map.setPaintProperty('layer2_fill', 'fill-color',
			['match',
				['get', 'class'],
				...layerColors["fill"](...layer2),
				'transparent'
			]
		);
		map.setPaintProperty('layer2_border', 'line-color',
			['match',
				['get', 'class'],
				...layerColors["border"](...layer2),
				'transparent'
			]
		);
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'class'],
				...layerColors["fill"](...layer3),
				[
					'match',
					['get', 'brand'],
					...layerColors["fill"](...layerBrands)
				]
			]
		);
		map.setPaintProperty('layer3_border', 'line-color',
			[
				'match',
				['get', 'class'],
				...layerColors["border"](...layer3),
				[
					'match',
					['get', 'brand'],
					...layerColors["border"](...layerBrands)
				]
			]
		);
	}

	function coloringUpperLayers() {

		map.setPaintProperty('layer1_fill', 'fill-color',
			['match',
				['get', 'class'],
				...layerColors["fill_gps"](...layer1),
				'transparent'
			]
		);
		map.setPaintProperty('layer1_border', 'line-color',
			['match',
				['get', 'class'],
				...layerColors["border_gps"](...layer1),
				'transparent'
			]
		);
		map.setPaintProperty('layer2_fill', 'fill-color',
			['match',
				['get', 'class'],
				...layerColors["fill_gps"](...layer2),
				'transparent'
			]
		);
		map.setPaintProperty('layer2_border', 'line-color',
			['match',
				['get', 'class'],
				...layerColors["border_gps"](...layer2),
				'transparent'
			]
		);
	}

	function coloringGPS(id) {
		// console.log("gps id",id);
		GPSNumberOpacity(id.toString())
		coloringUpperLayers()
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['concat',
					['get', 'id'],
					['get', 'foreign-key']
				],
				id.toString(),
				[
					'match',
					['get', 'brand'],
					...layerColors["fill"](...layerBrands),
					'transparent',
					['match',
						['get', 'class'],
						...layerColors["fill"](...layer3),
						'transparent',
					]
				],
				['match',
					['get', 'class'],
					...layerColors["fill_gps"](...layer3),
					[
						'match',
						['get', 'brand'],
						...layerColors["fill_gps"](...layerBrands)
					]
				]
			]
		);
		map.setPaintProperty('layer3_border', 'line-color',
			[
				'match',
				['concat',
					['get', 'id'],
					['get', 'foreign-key']
				],
				id.toString(),
				[
					'match',
					['get', 'brand'],
					...layerColors["border"](...layerBrands),
					'transparent',
					['match',
						['get', 'class'],
						...layerColors["border"](...layer3),
						'transparent',
					]
				],
				['match',
					['get', 'class'],
					...layerColors["border_gps"](...layer3),
					[
						'match',
						['get', 'brand'],
						...layerColors["border_gps"](...layerBrands)
					]
				]
			]
		);
	}

	function coloringGPSDate(id) {
		GPSNumberOpacity(id.toString())
		coloringUpperLayers()

		map.setPaintProperty('layer3_fill', 'fill-color',
			['match', ['concat',
					['get', 'id'],
					['get', 'foreign-key']
				],
				id.toString(),
				['match', ['get', 'id'],
					slobodne, availabilityColors['occupied'],
					['match', ['get', 'id'],
						accomodation, availabilityColors['free'],
						['match', ['get', 'class'],
							...layerColors["fill"](...layer3),
							"transparent"
						]
					]
				],

				['match', ['get', 'class'],
					...layerColors["fill_gps"](...layer3),
					['match', ['get', 'id'],
						slobodne, hexToHSL(availabilityColors['occupied'], ["gps"]),
						['match', ['get', 'id'],
							accomodation, hexToHSL(availabilityColors['free'], ["gps"]),
							'transparent'

						]
					]
				]
			]
		);

		map.setPaintProperty('layer3_border', 'line-color',
			['match', ['concat',
					['get', 'id'],
					['get', 'foreign-key']
				],
				id.toString(),
				['match', ['get', 'id'],
					slobodne, lightenDarkenColor(availabilityColors['occupied'], ligthPercentage),
					['match', ['get', 'id'],
						accomodation, lightenDarkenColor(availabilityColors['free'], ligthPercentage),
						['match', ['get', 'class'],
							...layerColors["border"](...layer3),
							"transparent"
						]
					]
				],

				['match', ['get', 'class'],
					...layerColors["border_gps"](...layer3),
					['match', ['get', 'id'],
						slobodne, hexToHSL(lightenDarkenColor(availabilityColors['occupied'], ligthPercentageOccupied), ["gps_border"]),
						['match', ['get', 'id'],
							accomodation, hexToHSL(lightenDarkenColor(availabilityColors['free'], ligthPercentageFree), ["gps_border"]),
							'transparent'

						]
					]
				]
			]
		);
	}

	var djole = {
		getBrandName: function(param) {
			jole = []
			pero = rezultat1.features.filter((item, i) => item.properties.brand == param && item.properties.number).map((obj) => obj.properties.number)
			pero.forEach((item, i) => {
				jole.push(item, 0.8)
			});
			return jole
		}
	}

	function brandNumberOpacity(param) {
		map.setPaintProperty("poi-numbers", "text-opacity",
			['match',
				['get', 'brand'],
				param,
				0.8,
				0.2
			]
		)
	}

	function GPSNumberOpacity(param) {
		// console.log("asdfsdf paramparam",param);
		map.setPaintProperty("poi-numbers", "text-opacity",
			['match',
				['get', 'id'],
				param,
				0.8,
				0.2
			]
		)

		/* foreign*/
		map.setPaintProperty("poi", "icon-opacity",
			['match',
				['get', 'foreign-id'],
				param.toString(),
				1,
				['match', ['get', 'id'],
					param.toString(),
					1,
					0.3
				]
			]
		)
	}

	function resetNumberOpacity() {
		map.setPaintProperty("poi-numbers", "text-opacity", 0.8)
	}

	function NumberOpacity() {
		map.setPaintProperty("poi-numbers", "text-opacity", 0.2)
	}

	function classNumberOpacity(param) {
		// console.log("okaok",param);
		map.setPaintProperty("poi-numbers", "text-opacity", [
			'match', ['get', 'class'],
			param,
			0.8,
			0.2
		])
		map.setPaintProperty("poi", "icon-opacity", [
			'match', ['get', 'icon'],
			param,
			0.8,
			0.2
		])
	}

	function coloringFilter(id) {
		brandNumberOpacity(id.toString())
		coloringUpperLayers()
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'brand'],
				id.toString(),
				[
					'match',
					['get', 'brand'],
					...layerColors["fill"](...layerBrands)
				],
				['match',
					['get', 'class'],
					...layerColors["fill_gps"](...layer3),
					[
						'match',
						['get', 'brand'],
						...layerColors["fill_gps"](...layerBrands)
					]
				]
			]
		);
		map.setPaintProperty('layer3_border', 'line-color',
			[
				'match',
				['get', 'brand'],
				id.toString(),
				[
					'match',
					['get', 'brand'],
					...layerColors["border"](...layerBrands)
				],
				['match',
					['get', 'class'],
					...layerColors["border_gps"](...layer3),
					[
						'match',
						['get', 'brand'],
						...layerColors["border_gps"](...layerBrands)
					]
				]
			]
		);
	}

	function coloringFilterDate(id) {
		brandNumberOpacity(id.toString())
		coloringUpperLayers()
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'class'],
				...layerColors["fill_gps"](...layer3),
				[
					'match',
					['get', 'brand'],
					id.toString(),
					[
						'match',
						['get', 'id'],
						slobodne, availabilityColors['occupied'],
						[
							'match',
							['get', 'id'],
							accomodation, availabilityColors['free'],
							'transparent'
						]
					],
					[
						'match',
						['get', 'id'],
						slobodne, hexToHSL(availabilityColors['occupied'], ["gps"]),
						[
							'match',
							['get', 'id'],
							accomodation, hexToHSL(availabilityColors['free'], ["gps"]),
							'transparent'
						]
					]
				]
			]
		);
		map.setPaintProperty('layer3_border', 'line-color',
			[
				'match',
				['get', 'class'],
				...layerColors["border_gps"](...layer3),
				[
					'match',
					['get', 'brand'],
					id.toString(),
					[
						'match',
						['get', 'id'],
						slobodne, lightenDarkenColor(availabilityColors['occupied'], ligthPercentage),
						[
							'match',
							['get', 'id'],
							accomodation, lightenDarkenColor(availabilityColors['free'], ligthPercentage),
							'transparent'
						]
					],
					[
						'match',
						['get', 'id'],
						slobodne, hexToHSL(lightenDarkenColor(availabilityColors['occupied'], ligthPercentageOccupied), ["gps_border"]),
						[
							'match',
							['get', 'id'],
							accomodation, hexToHSL(lightenDarkenColor(availabilityColors['free'], ligthPercentageFree), ["gps_border"]),
							'transparent'
						]
					]
				]
			]
		);
	}

	function coloringClassesDate(id) {
		classNumberOpacity(id)
		coloringUpperLayers()

		var objekt = [id.toString(), id.toString() + ' roof1', id.toString() + ' roof2']

		if (id == "objekt lezaljke") {
			// objekt = "objekt lezaljke"

			map.setPaintProperty('layer3_fill', 'fill-color',
				[
					'match',
					['get', 'class'],
					// ...layerColors["fill_gps"](...layer3),
					...layerColors["fill_gps"](...layer3.filter(item => item != "objekt lezaljke")),
					[
						'match',
						['get', 'class'],
						id,
						[
							'match',
							['get', 'id'],
							slobodne, availabilityColors['occupied'],
							[
								'match',
								['get', 'id'],
								accomodation, availabilityColors['free'],
								'transparent'
							]
						],
						[
							'match',
							['get', 'id'],
							slobodne, hexToHSL(availabilityColors['occupied'], ["gps"]),
							[
								'match',
								['get', 'id'],
								accomodation, hexToHSL(availabilityColors['free'], ["gps"]),
								'transparent'
							]
						]
					]
				]
			)
			map.setPaintProperty('layer3_border', 'line-color',
				[
					'match',
					['get', 'class'],
					...layerColors["border_gps"](...layer3.filter(item => item != "objekt lezaljke")),
					[
						'match',
						['get', 'class'],
						id,
						[
							'match',
							['get', 'id'],
							slobodne, lightenDarkenColor(availabilityColors['occupied'], ligthPercentage),
							[
								'match',
								['get', 'id'],
								accomodation, lightenDarkenColor(availabilityColors['free'], ligthPercentage),
								'transparent'
							]
						],
						[
							'match',
							['get', 'id'],
							slobodne, hexToHSL(lightenDarkenColor(availabilityColors['occupied'], ligthPercentageOccupied), ["gps_border"]),
							[
								'match',
								['get', 'id'],
								accomodation, hexToHSL(lightenDarkenColor(availabilityColors['free'], ligthPercentageFree), ["gps_border"]),
								'transparent'
							]
						]
					]
				]
			);
		}
		if (id == "objekt suncobran") {
			// objekt = "objekt lezaljke"

			map.setPaintProperty('layer3_fill', 'fill-color',
				[
					'match',
					['get', 'class'],
					// ...layerColors["fill_gps"](...layer3),
					...layerColors["fill_gps"](...layer3.filter(item => item != "objekt suncobran")),
					[
						'match',
						['get', 'class'],
						id,
						[
							'match',
							['get', 'id'],
							slobodne, availabilityColors['occupied'],
							[
								'match',
								['get', 'id'],
								accomodation, availabilityColors['free'],
								'transparent'
							]
						],
						[
							'match',
							['get', 'id'],
							slobodne, hexToHSL(availabilityColors['occupied'], ["gps"]),
							[
								'match',
								['get', 'id'],
								accomodation, hexToHSL(availabilityColors['free'], ["gps"]),
								'transparent'
							]
						]
					]
				]
			)
			map.setPaintProperty('layer3_border', 'line-color',
				[
					'match',
					['get', 'class'],
					...layerColors["border_gps"](...layer3.filter(item => item != "objekt suncobran")),
					[
						'match',
						['get', 'class'],
						id,
						[
							'match',
							['get', 'id'],
							slobodne, lightenDarkenColor(availabilityColors['occupied'], ligthPercentage),
							[
								'match',
								['get', 'id'],
								accomodation, lightenDarkenColor(availabilityColors['free'], ligthPercentage),
								'transparent'
							]
						],
						[
							'match',
							['get', 'id'],
							slobodne, hexToHSL(lightenDarkenColor(availabilityColors['occupied'], ligthPercentageOccupied), ["gps_border"]),
							[
								'match',
								['get', 'id'],
								accomodation, hexToHSL(lightenDarkenColor(availabilityColors['free'], ligthPercentageFree), ["gps_border"]),
								'transparent'
							]
						]
					]
				]
			);
		}
		if (id != "objekt lezaljke" && id != "objekt suncobran") {
			map.setPaintProperty('layer3_fill', 'fill-color',
				[
					'match',
					['get', 'class'],
					objekt,
					[
						'match',
						['get', 'class'],
						...layerColors["fill"](...layer3),
						'transparent'
					],
					['match',
						['get', 'class'],
						...layerColors["fill_gps"](...layer3),
						[
							'match',
							['get', 'id'],
							slobodne, hexToHSL(availabilityColors['occupied'], ["gps"]),
							[
								'match',
								['get', 'id'],
								accomodation, hexToHSL(availabilityColors['free'], ["gps"]),
								'transparent'
							]
						]
					]
				]
			);
			map.setPaintProperty('layer3_border', 'line-color',
				[
					'match',
					['get', 'class'],
					objekt,
					[
						'match',
						['get', 'class'],
						...layerColors["border"](...layer3),
						'transparent'
					],
					['match',
						['get', 'class'],
						...layerColors["border_gps"](...layer3),
						[
							'match',
							['get', 'id'],
							slobodne, hexToHSL(lightenDarkenColor(availabilityColors['occupied'], ligthPercentageOccupied), ["gps_border"]),
							[
								'match',
								['get', 'id'],
								accomodation, hexToHSL(lightenDarkenColor(availabilityColors['free'], ligthPercentageFree), ["gps_border"]),
								'transparent'
							]
						]
					]
				]
			)
		}
	}

	function coloringLezljke() {
		// classNumberOpacity(id)
		// coloringUpperLayers()
		// var objekt = [id.toString(),id.toString()+' roof1',id.toString()+' roof2']
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'id'],
				lezaljke, availabilityColors['occupied'],
				[
					'match',
					['get', 'id'],
					lezaljke, availabilityColors['free'],
					'transparent'
				]
			]
		);
		// map.setPaintProperty('layer3_border', 'line-color',
		// [
		//   'match',
		//   ['get', 'class'],
		//   objekt,
		//   [
		//     'match',
		//     ['get', 'class'],
		//     ...layerColors["border"](...layer3),
		//     'transparent'
		//   ],
		//   ['match',
		//   ['get', 'class'],
		//     ...layerColors["border_gps"](...layer3),
		//     [
		//       'match',
		//         ['get', 'id'],
		//         availability, hexToHSL(lightenDarkenColor(availabilityColors['occupied'],ligthPercentageOccupied),["gps_border"]),
		//         [
		//           'match',
		//           ['get', 'id'],
		//           accomodation, hexToHSL(lightenDarkenColor(availabilityColors['free'],ligthPercentageFree),["gps_border"]),
		//           'transparent'
		//         ]
		//     ]
		//   ]
		// ]
		// );
	}

	function resetColoringFilterDate() {
		resetNumberOpacity()
		resetingColors();
		showInterestPointsAll()
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'class'],
				...layerColors["fill"](...layer3),
				[
					'match',
					['get', 'id'],
					slobodne, availabilityColors['occupied'],
					[
						'match',
						['get', 'id'],
						accomodation, availabilityColors['free'],
						'transparent'
					]
				]
			]
		);
		map.setPaintProperty('layer3_border', 'line-color', [
			'match',
			['get', 'class'],
			...layerColors["border"](...layer3),
			[
				'match',
				['get', 'id'],
				slobodne, lightenDarkenColor(availabilityColors['occupied'], ligthPercentage),
				[
					'match',
					['get', 'id'],
					accomodation, lightenDarkenColor(availabilityColors['free'], ligthPercentage),
					'transparent'
				]
			]
		]);
	}

	function poiResetColoringFilterDate() {
		// console.log("ja sam tu");
		NumberOpacity()
		// classNumberOpacity()
		coloringUpperLayers();
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'class'],
				...layerColors["fill_gps"](...layer3),
				[
					'match',
					['get', 'id'],
					slobodne, hexToHSL(availabilityColors['occupied'], ["gps"]),
					[
						'match',
						['get', 'id'],
						accomodation, hexToHSL(availabilityColors['free'], ["gps"]),
						'transparent'
					]
				]
			]
		);

		map.setPaintProperty('layer3_border', 'line-color', [
			'match',
			['get', 'class'],
			...layerColors["border_gps"](...layer3),
			[
				'match',
				['get', 'id'],
				slobodne, hexToHSL(lightenDarkenColor(availabilityColors['occupied'], ligthPercentageOccupied), ["gps_border"]),
				[
					'match',
					['get', 'id'],
					accomodation, hexToHSL(lightenDarkenColor(availabilityColors['free'], ligthPercentageFree), ["gps_border"]),
					'transparent'
				]
			]
		]);
	}

	function poiResetColoringFilter() {
		NumberOpacity()
		coloringUpperLayers();
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'class'],
				...layerColors["fill_gps"](...layer3),
				[
					'match',
					['get', 'brand'],
					...layerColors["fill_gps"](...layerBrands)
				]
			]
		);
		map.setPaintProperty('layer3_border', 'line-color',
			[
				'match',
				['get', 'class'],
				...layerColors["border_gps"](...layer3),
				[
					'match',
					['get', 'brand'],
					...layerColors["border_gps"](...layerBrands)
				]
			]
		);
	}

	function coloringClasses(id) {
		//console.log("tu sam ja sada", id);
		classNumberOpacity(id)
		coloringUpperLayers()
		var objekt = [id.toString(), id.toString() + ' roof1', id.toString() + ' roof2']
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'class'],
				objekt,
				[
					'match',
					['get', 'class'],
					...layerColors["fill"](...layer3),
					'transparent'

				],
				['match',
					['get', 'class'],
					...layerColors["fill_gps"](...layer3),
					[
						'match',
						['get', 'brand'],
						...layerColors["fill_gps"](...layerBrands)
					]
				]
			]
		);
		map.setPaintProperty('layer3_border', 'line-color',
			[
				'match',
				['get', 'class'],
				objekt,
				[
					'match',
					['get', 'class'],
					...layerColors["border"](...layer3),
					'transparent'
				],
				['match',
					['get', 'class'],
					...layerColors["border_gps"](...layer3),
					[
						'match',
						['get', 'brand'],
						...layerColors["border_gps"](...layerBrands)
					]
				]
			]
		);
	}

	function coloringAvailable() {
		map.setPaintProperty('layer3_fill', 'fill-color',
			[
				'match',
				['get', 'class'],
				...layerColors["fill"](...layer3.filter(item => item != "objekt lezaljke" && item != "objekt suncobran")),
				// ...layerColors["fill"](...layer3),
				[
					'match',
					['get', 'id'],
					slobodne, availabilityColors['occupied'],
					[
						'match',
						['get', 'id'],
						naUpitSmjestaji_Sve, availabilityColors['naupit'],
						[
							'match', ['get', 'id'],
							accomodation, availabilityColors['free'],
							'transparent'
						]
					]
				]
			]

		);
		map.setPaintProperty('layer3_border', 'line-color',
			[
				'match',
				['get', 'class'],
				// ...layerColors["border"](...layer3),
				...layerColors["border"](...layer3.filter(item => item != "objekt lezaljke" && item != "objekt suncobran")),
				[
					'match',
					['get', 'id'],
					slobodne, lightenDarkenColor(availabilityColors['occupied'], ligthPercentage),
					[
						'match',
						['get', 'id'],
						naUpitSmjestaji_Sve, lightenDarkenColor(availabilityColors['naupit'], ligthPercentage),
						[
							'match', ['get', 'id'],
							accomodation, lightenDarkenColor(availabilityColors['free'], ligthPercentage),
							'transparent'
						]
					]
				]
			]
		);
	}

	function hideInterestPoints() {
		map.setPaintProperty("poi", "icon-opacity", 0.3)
	}

	function showInterestPointsAll() {
		map.setPaintProperty("poi", "icon-opacity", 1)
	}

	function showInterestPoints(id) {
		map.setPaintProperty("poi", "icon-opacity", [
			'match',
			['get', 'icon'],
			id.toString(),
			1,
			0.3
		])
	}

	function showInterestPointID(id) {
		map.setPaintProperty("poi", "icon-opacity", [
			'match',
			['get', 'id'],
			id.toString(),
			1,
			0.3
		])
	}

	function showInterestPointFilterClass(klasa) {
		// console.log("klasaa point",klasa);
		map.setPaintProperty("poi", "icon-opacity", [
			'match',
			['get', 'icon'],
			klasa.toString(),
			1,
			0.3
		])
	}

	function showInterestPointFilterClassObject(klasa) {
		// console.log("klasaa object",klasa);
		map.setPaintProperty("poi", "icon-opacity", [
			'match',
			['get', 'icon'],
			(filterObjects[klasa][0].icon).toString(),
			1,
			0.3
		])
	}

	/*phobs_end KRAJ PARAM.JS FAJLE!!!*/

	/*phobs_end*/

	function getFeatureName(name) {
		if (typeof featureButtons[name] == "undefined") {
			return ""
		} else {
			return `<i class="fas fa-${featureButtons[name][0]["icon"]}"></i>`
		}
	}

	function getAccName(name) {
		if (typeof name == "undefined") {
			return ""
		}
		if (name == "glamping") {
			return `<i class="fas-pro fa-campground"></i>`
		}
		if (name == "caravan") {
			return `<i class="fas-pro fa-caravan"></i>`
		}
		if (name == "parcela") {
			return `<i class="fas fa-rv"></i>`
		}
		if (name == "mh") {
			return `<i class="fas-pro fa-house-tree"></i>`
		} else {
			return ""
		}
	}

	function getFeatureType(name) {
		if (typeof type[name] == "undefined") {
			return ""
		} else {
			return `<span class="text-acc-type">${type[name][0][lng]}</span>`
		}
	}

	function getAccType(name) {
		if (typeof type[name] == "undefined") {
			return ""
		} else {
			return `<div class="acc-type">${type[name][0][lng]}</div>`
		}
	}

	function getBrand(name) {
		if (typeof brandColors[name] == "undefined") {
			return ""
		} else {
			return `<span class="text-brand" style="background:${brandColors[name][0]["color"]}">${name}</span>`
		}
	}

	function getBrandBadge(name, vrsta) {
		if (typeof brandColors[name] == "undefined") {
			return ""
		} else {
			return `<div class="brand-badge" style="background:${brandColors[name][0]["color"]};border:2px solid ${hexToHSL(brandColors[name][0]["color"], "border")}">${vrsta} ${name}</div>`
		}
	}

	function getAvailability(name) {
		if (slobodne != undefined) {
			if ($(".is-start-date") && $(".is-start-date").html() != undefined) {
				if (slobodne.includes(name)) {
					// $(".selected-date").addClass("unavailable")
					return `<span class="availability unavailable">${translate("Accomodation availability")} ${translate("Unavailable")}</span>`
				}
				if (!slobodne.includes(name) && accomodation.includes(name)) {
					return `<span class="availability available">${translate("Accomodation availability")} ${translate("Available")}</span>`
				} else {
					return ""
				}
			} else {
				return ""
			}
		} else {
			return ""
		}
	}

	function getAvailabilityLounger(name) {
		if (slobodne != undefined) {
			if ($(".is-start-date") && $(".is-start-date").html() != undefined) {
				if (slobodne.includes(name)) {
					// $(".selected-date").addClass("unavailable")
					return `<span class="availability unavailable">${translate("Lounger availability")} ${translate("Unavailable")}</span><spanclass="book-lounger not-available">Book now</span>`
				}
				if (!slobodne.includes(name) && accomodation.includes(name)) {
					return `<span class="availability available">${translate("Lounger availability")} ${translate("Available")}</span><span class="book-lounger">Book now</span>`
				} else {
					return ""
				}
			} else {
				return ""
			}
		} else {
			return ""
		}
	}

	function getAvailabilityUmbrella(name) {
		if (slobodne != undefined) {
			if ($(".is-start-date") && $(".is-start-date").html() != undefined) {
				if (slobodne.includes(name)) {
					// $(".selected-date").addClass("unavailable")
					return `<span class="availability unavailable">${translate("Umbrella availability")} ${translate("Unavailable")}</span><span class="book-lounger not-available">Book now</span>`
				}
				if (!slobodne.includes(name) && accomodation.includes(name)) {
					return `<span class="availability available">${translate("Umbrella availability")} ${translate("Available")}</span><span class="book-lounger">Book now</span>`
				} else {
					return ""
				}
			} else {
				return ""
			}
		} else {
			return ""
		}
	}

	var openTime
	var closingTime
	var workingHoursInterval

	function getWorkingHours(name, recommended) {
		console.log('vrijeme', name)
		if (typeof name !== "undefined") {
			var tmp = name
			var rez = _RadnoVrijeme(tmp, lng)

			var slijedecidan;
			rez.status === 'open' ? slijedecidan = translate('danas') : slijedecidan = translations[rez.slijedecidan][0][lng]
			var bla
			if (tmp !== undefined) {
				if (rez.zatvaramo === '' && rez.otvaramo === '') {
					bla = ''
				} else {
					bla = rez.status === 'open' ?
						(rez.zatvaramo === '' ? '' : translate('Closing') + ' ' + rez.zatvaramo) :
						translate('Opening') + ' ' + rez.otvaramo;
				}

				if (recommended == "recommended") {
					return `<div id="openTag" class="${rez.status}">${translations[(rez.status).substr(0, 1).toUpperCase() + (rez.status).substr(1)][0][lng]}</div>
                <div id="closeTag" class=${rez.status === 'open' ? "closing" : ""}>${bla}</div>`
				} else {
					return `<div id="openTag" class="${rez.status}">${translations[(rez.status).substr(0, 1).toUpperCase() + (rez.status).substr(1)][0][lng]}</div>
        <div id="closeTag" class=${rez.status === 'open' ? "closing" : ""}>${bla}</div>
        <div id="workHors">${translate('Working hours') + ' ' + slijedecidan + ': <b> ' + rez.vrijemedo}</b><svg id="openRadnoVrijeme" xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-triangle-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"/>
      </svg></div>
        `
				}
			} else {
				return ""
			}

		} else {
			return ""
		}
	}

	function getClassColors(name, color) {
		if (typeof classColors[name] == "undefined") {
			return "transparent"
		} else {
			return classColors[name][0][color]
		}
	}

	function getBrandColors(name, color) {
		if (typeof brandColors[name] == "undefined") {
			return "transparent"
		} else {
			return brandColors[name][0][color]
		}
	}

	function getAmenities(name) {

		if (name !== undefined) {
			// var nameObj = name.replace(/\\/g, '')
			// nameObj = nameObj.replace(`"{`, '');
			// nameObj = nameObj.replace('"}', '')
			nameObj = name;

			for (i = 0; i < nameObj.length; i++) {
				if (amenities[nameObj[i]] !== undefined) {
					var amenitiesappend = `<div class="modal-info-inner"><i class="fas fa-${amenities[nameObj[i]][0]["icon"]}"></i><div><p>${translations[nameObj[i]][0][lng]}</p></div></div>`
					$(".amenities").append(amenitiesappend)
				}
			}
		} else {
			var amenitiesappend = `<div class="modal-info-inner"><i class="fas fa-wifi"></i><div><p>WiFi</p></div></div>
<div class="modal-info-inner"><i class="fas fa-parking"></i><div><p>Parking</p></div></div>`
			$(".amenities").append(amenitiesappend)
		}
	}

	function getAmenitiesObjekt(name) {

		if (name !== undefined) {
			// var nameObj = name.replace(/\\/g, '')
			// nameObj = nameObj.replace(`"{`, '');
			// nameObj = nameObj.replace('"}', '')
			nameObj = name;

			for (i = 0; i < nameObj.length; i++) {
				if (amenities[nameObj[i]] !== undefined) {
					var amenitiesappend = `<div class="modal-info-inner"><i class="fas fa-${amenities[nameObj[i]][0]["icon"]}"></i><div><p>${translations[nameObj[i]][0][lng]}</p></div></div>`
					$(".objektamenities").append(amenitiesappend)
				}
			}
		} else {
			var amenitiesappend = `<div class="modal-info-inner"><i class="fas fa-wifi"></i><div><p>WiFi</p></div></div>
<div class="modal-info-inner"><i class="fas fa-parking"></i><div><p>Parking</p></div></div>`
			$(".objektamenities").append(amenitiesappend)
		}
	}

	function getAmenities_OLD(name) {

		if (name !== undefined) {
			var nameObj = name.replace(/\\/g, '')
			nameObj = nameObj.replace(`"{`, '');
			nameObj = nameObj.replace('"}', '')
			nameObj = JSON.parse(nameObj)

			for (i = 0; i < nameObj.length; i++) {
				if (amenities[nameObj[i]] !== undefined) {
					var amenitiesappend = `<div class="modal-info-inner"><i class="fas fa-${amenities[nameObj[i]][0]["icon"]}"></i><div><p>${amenities[nameObj[i]][0][lng]}</p></div></div>`
					$(".amenities").append(amenitiesappend)
				}
			}
		} else {
			var amenitiesappend = `<div class="modal-info-inner"><i class="fas fa-wifi"></i><div><p>WiFi</p></div></div>
<div class="modal-info-inner"><i class="fas fa-parking"></i><div><p>Parking</p></div></div>`
			$(".amenities").append(amenitiesappend)
		}
	}

	function checkOutThisLoad() {
		if (map.loaded() == true && map.areTilesLoaded() == true) {
			//console.log("load is complete");
		} else {
			//console.log("load is incomplete");
			setTimeout(function() {
				checkOutThisLoad();
			}, 1000);
		}
	}

	map.on('style.load', () => {
		const waiting = () => {
			if (!myMap.isStyleLoaded()) {
				setTimeout(waiting, 200);
				//console.log('ne još')
			} else {
				//loadMyLayers();
				//console.log('sada može')
			}
		};
		waiting();
	});


	map.once('idle', () => {
		//map.on('load', () => {
		// Add a GeoJSON source containing place coordinates and information.
		map.addSource('statesData', {
			'type': 'geojson',
			'data': rezultat1
		});

		map.addSource('pois-other-data', {
			'type': 'geojson',
			'data': _poisOther_
		});

		const langProperties = {};

		for (const key in _POSTAVKE_KAMPA_) {
			if (key.includes("lang")) {
				langProperties[key] = _POSTAVKE_KAMPA_[key];
			}
		}

		$("body").append(`
    <div class="languages">
      <h3 class="languages-header">${translate("Select language")}</h3>
      <span class="lang-list">
      </span>
    </div>`)

		// <div data-lang="en"></div>
		// <div data-lang="hr"></div>
		// <div data-lang="it"></div>
		// <div data-lang="de"></div>
		// <div data-lang="nl"></div>
		// <div data-lang="si"></div>
		// <div data-lang="pl"></div>

		for (const p in langProperties) {
			if (langProperties[p] === "1") {
				let dLang = p.replace('lang', '').toLowerCase()

				$(".lang-list").append(`<div data-lang=${dLang}></div>`)
			}
		}

		$(".languages div").each(function() {
			if ($(this).data("lang") == lng) {
				$(this).addClass("active")
			}
		})

		$(".languages div").on("click", function(e) {

			$(".menu-item").removeClass("selected")
			$(".menu-item").removeClass("not-selected")

			var lngCheck = lng
			lng = $(e.target).data("lang")
			map.getSource("centroids").setData(createCentroids())
			$("html").attr("lang", lng)
			$(".languages-header").text(`${translate("Select language")}`)
			$(".languages div").removeAttr("class")
			$(this).addClass("active")
			$(".languages").toggleClass("open");
			$("#navigateTo span").text(`${translate("Take me")}`)
			$("#filter").text(`${translate("Filter")}`)

			$("[data-id=accomodation]").text(`${translate("Accomodation")}`)
			$("[data-id=facilities]").text(`${translate("Facilities")}`)
			$("[data-caption=Pitch]").text(`${translate("Pitch")}`)
			$("[data-caption=MH]").text(`${translate("MH")}`)
			$("[data-caption=Glamping]").text(`${translate("Glamping")}`)
			$("[data-caption=Caravan]").text(`${translate("Caravan")}`)
			var jeAktivanObjekt
			var jeAktivanPOI
			$(".filter-item:not(.brand).active").data("class-object") != undefined ? jeAktivanObjekt = $(".filter-item:not(.brand).active").data("class-object") : ""
			$(".filter-item:not(.brand).active").data("class") != undefined ? jeAktivanPOI = $(".filter-item:not(.brand).active").data("class") : ""
			$(".facilities").html("")
			var josko = new Set(rezultat1.features.filter((item) => item.properties.class.split(" ")[0] == "objekt" && item.properties.filter != "yes" && !item.properties.class.includes("roof") && !item.properties.class.includes("suncobran_boja")).map((obj) => obj.properties.class))

			var joskoDva = Array.from(josko)
			joskoDva = joskoDva.sort(function(a, b) {
				return (poiLabels[filterObjects[a][0].icon][0][lng] < poiLabels[filterObjects[b][0].icon][0][lng]) ? -1 : (poiLabels[filterObjects[a][0].icon][0][lng] > poiLabels[filterObjects[b][0].icon][0][lng]) ? 1 : 0;
			})

			var pegula = new Set(rezultat1.features.filter((item) => item.properties.hasOwnProperty("grupa")))

			console.log(pegula)

			if (joskoDva.length > 0) {
				var filterParcele = document.createElement("div");
				filterParcele.classList.add("facilities-caption")
				filterParcele.setAttribute("data-caption", "Main")
				filterParcele.innerHTML = translate("Main")
				$(".facilities").append(filterParcele)
				console.log(joskoDva)
				joskoDva.forEach((item, index) => {
					var filters = document.createElement("div");
					filters.classList.add("filter-item");
					filters.setAttribute("data-class-object", item)
					if (jeAktivanObjekt != undefined) {
						if (item == jeAktivanObjekt) {
							filters.classList.add("active")
							filters.style.opacity = 1
							filters.style.fontWeight = 700
						}
						if (item != jeAktivanObjekt) {
							filters.style.opacity = 0.5
							// filters.style.fontWeight = 600
						}
					}
					if (jeAktivanObjekt == undefined && jeAktivanPOI != undefined || $(".filter-item.brand").is(".active")) {
						filters.style.opacity = 0.5
					}

					var filterText = document.createTextNode(poiLabels[filterObjects[item][0].icon][0][lng])
					var filterSpan = document.createElement("span")
					var filterSpanText = document.createElement("span")
					var spanIcon = document.createElement("img")
					spanIcon.src = 'assets/img/icons/' + filterObjects[item][0].icon + '.svg?'
					filterSpan.classList.add("filter-square");
					filterSpanText.classList.add("filter-text")
					// filterSpan.style.background = brandColors[Object.keys(filterObjects).find((aa)=> aa == item)][0].color
					filters.appendChild(filterSpan)
					filterSpan.appendChild(spanIcon)
					filterSpan.appendChild(filterText)
					filterSpanText.appendChild(filterText)
					filters.appendChild(filterSpanText)
					$(".facilities").append(filters)
				})
			}

			var joskoIkonice = new Set(rezultat1.features.filter((item) => item.properties.class == "interest-point" && item.properties.filter != "no").map((obj) => obj.properties.icon))

			var joskoDvaIkonice = Array.from(joskoIkonice)
			joskoDvaIkonice = joskoDvaIkonice.sort(function(a, b) {
				return (poiLabels[a][0][lng] < poiLabels[b][0][lng]) ? -1 : (poiLabels[a][0][lng] > poiLabels[b][0][lng]) ? 1 : 0;
			})

			if (joskoDvaIkonice.length > 0) {
				var filterParcele = document.createElement("div");
				filterParcele.classList.add("facilities-caption")
				filterParcele.setAttribute("data-caption", "POI")
				filterParcele.innerHTML = translate("POI")
				$(".facilities").append(filterParcele)
				console.log(joskoDvaIkonice)
				joskoDvaIkonice.forEach((item, index) => {
					var filters = document.createElement("div");
					filters.classList.add("filter-item");
					filters.setAttribute("data-class", item)
					if (jeAktivanPOI != undefined) {
						if (item == jeAktivanPOI) {
							filters.classList.add("active")
							filters.style.opacity = 1
							filters.style.fontWeight = 700
						}
						if (item != jeAktivanPOI) {
							filters.style.opacity = 0.5
						}
					}
					if (jeAktivanPOI == undefined && jeAktivanObjekt != undefined || $(".filter-item.brand").is(".active")) {
						filters.style.opacity = 0.5
					}
					var filterText = document.createTextNode(poiLabels[item] != undefined ? poiLabels[item][0][lng] : "")
					var filterSpan = document.createElement("span")
					var filterSpanText = document.createElement("span")
					var spanIcon = document.createElement("img")
					spanIcon.src = 'assets/img/icons/' + item + '.svg'
					filterSpan.classList.add("filter-square");
					filterSpanText.classList.add("filter-text")
					// filterSpan.style.background = brandColors[Object.keys(filterObjects).find((aa)=> aa == item)][0].color
					filters.appendChild(filterSpan)
					filterSpan.appendChild(spanIcon)
					filterSpan.appendChild(filterText)
					filterSpanText.appendChild(filterText)
					filters.appendChild(filterSpanText)
					$(".facilities").append(filters)
				})
			}

			$("#informations").text(`${translate("Informations")}`)
			$("#dimensions").text(`${translate("Dimensions")}`)
			$("#area").text(`${translate("Area")}`)
			$("#distance").text(`${translate("Distance from the sea")}`)
			$(".amenities").html(`<p id="amenities">${translate("Amenities")}</p>`)
			// $("#amenities").text(``)
			$("#searchHeader").text(`${translate("Search")}`)
			$("#search").attr("placeholder", `${translate("Search placeholder")}...`)
			$("#viewall").text(`${translate("Reset")}`)

			if ($(e.target).data("lang") != lngCheck) {
				$('#booknowtraka').text(translate('checkAvail'));
				// var lngImg = $("<img/>",{src:`assets/img/flags/${lng}.svg`})
				$("body").append(`
      <div class="annotation language">
        <h3>${translate("Language changed")}</h3>
        <div class="message">
          <span class="filter-square"><img src="assets/img/flags/${lng}.svg"></span>
          <p>${translate("Language changed to")}</p>
        </div>
      </div>`)

				$(".annotation.language").delay(1500).animate({
					opacity: 0
				}, {
					duration: 1000,
					complete: function() {
						$(".annotation.language").remove()
					}
				})
			}

			picker.setOptions({
				lang: lng
			})
		})

		$("#layers").click(function() {

			$(".filters").toggleClass("open");

			if (!$(".filter-item").is(".active")) {
				$(`[data-id=accomodation]`).trigger("click")
				document.querySelector(".accomodation").scrollTo(0, 0)
			}
			if ($(".filter-item.brand").is(".active")) {
				$(`[data-id=accomodation]`).trigger("click")
				document.querySelector(".accomodation").scrollTo(0, 0)
				document.querySelector(".accomodation").scrollTo({
					top: $(".filter-item.brand.active").position().top - 10,
					behavior: 'smooth'
				})
			}
			if ($(".filter-item:not(.brand)").is(".active")) {
				$(`[data-id=facilities]`).trigger("click")
				document.querySelector(".facilities").scrollTo(0, 0)
				document.querySelector(".facilities").scrollTo({
					top: $(".filter-item.active").position().top - 10,
					behavior: 'smooth'
				})
			}

			if ($("#ModalTrazi").is(":visible")) {
				$("#ModalTrazi").modal("hide")
			}

			if ($(".languages").is(".open")) {
				$(".languages").toggleClass("open");
			}

			$(".mapboxgl-popup").remove()
		});

		$("#date").on("click", function() {

			//OVO CU PREBACITI GORE U confirm-book click, ali ostavljam tu ako bude trebalo!

			//RJESENO ZA DATUME u kalendaru, samo treba prebaciti na botun i paziti da li je M ili P
			//JAKO BITNO!!!! mozda ce trebati tu resetirati min date i max date jer
			//dolje u preselect ga postavljamo kada se klikne na prvi datum!!!!!
			//IZVADI SETOPTIONS VAN IZ LOOOOPAAAA!!!!!
			if (qren == false) {
				_PERIODI_REZERVACIJE_.forEach(element => {
					if (element.tip === PITCH_OR_MOBILE) {
						let dateFrom = new Date(element.datumOd);
						let dateTo = new Date(element.datumDo);
						let arrayDana = [];

						if (element.ponD === '0') arrayDana.push(1);
						if (element.utoD === '0') arrayDana.push(2);
						if (element.sriD === '0') arrayDana.push(3);
						if (element.cetD === '0') arrayDana.push(4);
						if (element.petD === '0') arrayDana.push(5);
						if (element.subD === '0') arrayDana.push(6);
						if (element.nedD === '0') arrayDana.push(0);

						//samo test pickera
						picker.setOptions({
							lockDaysFilter: (day) => {
								const d = day.getDay();
								if ((day.getTime() <= dateTo.getTime() && day.getTime() > dateFrom.getTime()) || (day.getTime() <= (dateTo.getTime() + __year) && day.getTime() > (dateFrom.getTime() + __year))) {
									return arrayDana.includes(d);
								}
							}
						});
					}

				});
			}

			if ($("#ModalTrazi").is(":visible")) {
				$("#ModalTrazi").modal("hide")
			}

			$(this).toggleClass("open");

			if ($(".filters").is(".open")) {
				$(".filters").toggleClass("open");
			}
			if ($(".languages").is(".open")) {
				$(".languages").toggleClass("open");
			}
			if (!$(this).is(".open")) {
				$(".litepicker").hide()
			}

			$(".mapboxgl-popup").remove()

			$(".book-form").trigger("click");
		})

		$("#lang").click(function() {
			// alert($(window).width())
			if ($("#ModalTrazi").is(":visible")) {
				$("#ModalTrazi").modal("hide")
			}
			$(".languages").toggleClass("open");
			if ($(".filters").is(".open")) {
				$(".filters").toggleClass("open");
			}

			$(".mapboxgl-popup").remove()
		});

		$("#navigateTo span").text(`${translate("Take me")}`)
		$("#filter").text(`${translate("Filter")}`)
		$("#informations").text(`${translate("Informations")}`)
		$("#dimensions").text(`${translate("Dimensions")}`)
		$("#area").text(`${translate("Area")}`)
		$("#distance").text(`${translate("Distance from the sea")}`)
		$(".amenities").html(`<p id="amenities">${translate("Amenities")}</p>`)
		$("#searchHeader").text(`${translate("Search")}`)
		$("#search").attr("placeholder", `${translate("Search placeholder")}...`)

		$(".delete").on("click", function() {
			$(".found").remove()
			$(".recommended").remove()
			$(".recommandations-container").remove()
			$("#match-list").before(`<div class='recommended'>${translate("Recommended")}</div>`)
			$("#match-list").after(recommendedButtons)
			// $(".recommandations-container").append(recommendedButtons)
			$('#match-list').html('');
			$(".feature-buttons .feature-button").removeClass("active")
			$("#search").val("")
			$(".form-group").removeClass("write")
			$("input#search").focus()
		})

		$("#home").on("click", function() {
			$(".menu-item").removeClass("selected")
			$(".menu-item").removeClass("not-selected")
			map.fitBounds(bbox, {
				padding: {
					top: ($(window).height() * 0.2),
					bottom: ($(window).height() * 0.2),
					left: 10,
					right: 10
				}
			})
			if ($("#ModalTrazi").is(":visible")) {
				$("#ModalTrazi").modal("hide")
			}
			if ($(".filters").is(".open")) {
				$(".filters").toggleClass("open");
			}
			if ($(".languages").is(".open")) {
				$(".languages").toggleClass("open");
			}
			if (gpsActive == true) {
				$(".time-distance").hide()
				$(".mapboxgl-ctrl-top-right .mapboxgl-ctrl").show();
				$(".mapboxgl-ctrl-geolocate").html(`${translate("Return view")}<img src='assets/img/gps-arrow.svg'>`);
				isVratiPrikaz = true
			}
			if ($(".annotation.weather").is(":visible")) {
				$(".annotation.weather").remove()
				$(".weather-bg").remove()
			}
			$(".mapboxgl-popup").remove()
		})

		$("#map").click(function() {
			// $("html").css("overflow-y","scroll")
			$(".menu-item").removeClass("selected")
			$(".menu-item").removeClass("not-selected")
			if ($(".filters").is(".open")) {
				$(".filters").toggleClass("open");
			}
			if ($(".languages").is(".open")) {
				$(".languages").toggleClass("open");
			}
		})

		map.addLayer({
			'id': 'layer1_fill',
			'type': 'fill',
			'source': 'statesData', // reference the data source
			'layout': {},
			'paint': {}
		});

		map.addLayer({
			'id': 'layer1_border',
			'type': 'line',
			'source': 'statesData', // reference the data source
			'layout': {},
			'paint': {
				'line-width': ['interpolate', ['linear'],
					['zoom'], 14, 0.5, 19, 1
				]
			}
		});

		map.addLayer({
			'id': 'layer2_fill',
			'type': 'fill',
			'source': 'statesData', // reference the data source
			'layout': {},
			'paint': {}
		});

		map.addLayer({
			'id': 'layer2_border',
			'type': 'line',
			'source': 'statesData', // reference the data source
			'layout': {},
			'paint': {
				'line-width': ['interpolate', ['linear'],
					['zoom'], 14, 0.5, 19, 1
				]
			}
		});

		map.addLayer({
			'id': 'layer3_fill',
			'type': 'fill',
			'source': 'statesData', // reference the data source
			'layout': {},
			'paint': {}
		});

		map.addLayer({
			'id': 'layer3_border',
			'type': 'line',
			'source': 'statesData', // reference the data source
			'layout': {},
			'paint': {
				'line-width': ['interpolate', ['linear'],
					['zoom'], 14, 0.5, 19, 1
				]
			}
		});

		//linije layer
		map.addSource('linesSource', {
			type: 'geojson',
			data: linijePoKampu
		});

		// add a line layer without line-dasharray defined to fill the gaps in the dashed line
		map.addLayer({
			type: 'line',
			source: 'linesSource',
			id: 'line-background',
			paint: {
				'line-color': ['get', 'color'],
				'line-width': ['get', 'width'],
				'line-opacity': 0.6
			}
		});

		// add a line layer with line-dasharray set to the first value in dashArraySequence
		/*map.addLayer({
		    type: 'line',
		    source: 'linesSource',
		    id: 'line-dashed',
		    paint: {
		        'line-color': 'white',
		        'line-width': 2,
		        'line-dasharray': [0, 4, 3]
		    }
		});*/

		//natpisi layer
		mapLabels = _NATPISI_;

		map.addSource('labelLayer', {
			'type': 'geojson',
			'data': _NATPISI_
		});

		map.addLayer({
			'id': 'poi-labelsmap',
			'type': 'symbol',
			'source': 'labelLayer',
			'layout': {
				'text-field': ['get', 'description'],
				'text-variable-anchor': ['center'],
				'text-radial-offset': 0,
				'text-allow-overlap': true,
				'text-justify': 'auto',
				'text-font': ["DIN Pro Bold", "Arial Unicode MS Regular"],
				'text-size': ['interpolate', ['linear'],
					['zoom'], 15.50, ['get', 'fontmin'], 19, ['get', 'fontmax']
				],
				'text-justify': 'auto',
				'text-rotate': ['get', 'rotation'],
			},
			paint: {
				"text-color": ['get', 'color'],
				"text-halo-color": ['get', 'halo'],
				"text-halo-width": ['get', 'halow']
			}
		});

		map.addLayer({
			'id': 'poi',
			'type': 'symbol',
			'source': 'statesData',
			'layout': {
				'icon-image': ['get', 'icon'],
				'icon-size': ['interpolate', ['linear'],
					['zoom'], 14, 0, 15.5, ['match', ['get', 'icon'],
						['ico-info-01'], 0.4, 0
					], 19, 1
				],
				'icon-anchor': 'center',
				// 'icon-pitch-alignment': 'map',
				'icon-allow-overlap': true
			},
			"paint": {
				'icon-opacity': 1,
			}
		});

		map.addLayer({
			'id': 'poi-other',
			'type': 'symbol',
			'source': 'pois-other-data',
			'layout': {
				'icon-image': ['get', 'icon'],
				'icon-size': ['interpolate', ['linear'],
					['zoom'], 16, 0, 19, 1
				],
				'icon-anchor': 'center',
				// 'icon-pitch-alignment': 'map',
				'icon-allow-overlap': true
			},
			"paint": {
				'icon-opacity': 1,
			}
		});

		resetingColors()

		function createCentroids() {
			centroids = {
				"type": "FeatureCollection",
				"features": []
			}
			centroidNames = rezultat1.features.filter((item, i) => item.properties["centroid-name"] == "yes")
			centroidIcon = rezultat1.features.filter((item, i) => item.properties["centroid-name"] != "yes" && item.properties["centroid-name"])
			poiNumbers = rezultat1.features.filter((item, i) => item.properties.number && !item.properties.centroid && item.properties.class.split(" ")[1] != "lezaljke" && item.properties.class.split(" ")[1] != "suncobran")
			lezaljkeNumbers = rezultat1.features.filter((item, i) => item.properties.numbera)
			suncobraniNumbers = rezultat1.features.filter((item, i) => item.properties.numberb)
			poiCentroids = rezultat1.features.filter((item, i) => item.properties.number && item.properties.centroid)
			centroidNames.forEach(item => centroids.features.push(turf.centerOfMass(item.geometry, {
				properties: {
					["centroid-name"]: item.properties.label != undefined ?
						item.properties[lng] + "\n" + item.properties.label : item.properties[lng],

					id: item.properties.id,
					class: item.properties.class
				}
			})))
			centroidIcon.forEach(item => centroids.features.push(turf.centerOfMass(item.geometry, {
				properties: {
					icon: item.properties["centroid-name"],
					brand: item.properties.brand,
					id: item.properties.id
				}
			})))

			poiNumbers.forEach(item => centroids.features.push(turf.centerOfMass(item.geometry, {
				properties: {
					number: item.properties.number,
					brand: item.properties.brand,
					id: item.properties.id
				}
			})))
			lezaljkeNumbers.forEach(item => centroids.features.push(turf.centerOfMass(item.geometry, {
				properties: {
					numbera: item.properties.numbera,
					id: item.properties.id
				}
			})))
			suncobraniNumbers.forEach(item => centroids.features.push(turf.centerOfMass(item.geometry, {
				properties: {
					numberb: item.properties.numberb,
					id: item.properties.id
				}
			})))
			poiCentroids.forEach(item => centroids.features.push(turf.point(item.properties.centroid, {
				number: item.properties.number,
				brand: item.properties.brand,
				id: item.properties.id
			})))
			return centroids
		}

		$("#map").css("pointer-events", "none")
		var enveloped
		var buffered
		var pageLoaded = setInterval(function() {
			var isLoaded = map.loaded();

			//console.log('da li je mapa loadana')
			if (isLoaded == true) {
				isLoaded = true;

				var noSleep = new NoSleep();
				noSleep.enable();

				if ($(".mapboxgl-ctrl-geolocate").is("[disabled]") && !noGPS) {
					$("body").addClass("message")
					$("body").append(`<div class="annotation"><h3>${translate("Imporant message")}</h3><p>${translate("Navigation not available")}</p><div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`)

					$(".confirm").on("click", function() {
						$("body").removeClass("message")
						$(".annotation").remove()
					})
				}

				$(".profile-switch").on("click", function() {

					$(".banner").remove()
					$(".time-distance").remove()
					$("#voice").remove()
					$(".annotation.route").remove()
					$("body").append($(routingMessage))

					if (map.getSource("route2") != undefined &&
						map.getSource("route") != undefined &&
						map.getLayer("route") != undefined &&
						map.getLayer("route-casing") != undefined &&
						map.getLayer("route2") != undefined &&
						map.getLayer("route2-casing") != undefined) {

						map.removeLayer("route2-casing")
						map.removeLayer("route2")
						map.removeSource("route2")
						map.removeLayer("route-casing")
						map.removeLayer("route")
						map.removeSource("route")
					}
				})

				$("#car").on("click", function() {
					directions.actions.setProfile("mapbox/driving")
					$("#car").addClass("active")
					$("#walk").removeClass("active")
				})

				$("#walk").on("click", function() {
					directions.actions.setProfile("mapbox/walking")
					$("#walk").addClass("active")
					$("#car").removeClass("active")
				})

				enveloped = turf.envelope(rezultat1.features[0]);
				buffered = turf.buffer(enveloped, 50, {
					units: 'meters'
				});

				map.addSource('centroids', {
					'type': 'geojson',
					'data': createCentroids()
				});

				map.addLayer({
					'id': 'poi-numbers',
					'type': 'symbol',
					'source': 'centroids',
					'layout': {
						'text-field': ["concat",
							["get", "number"],
							["get", "centroid-name"],
							["get", "label"],
							["get", "price"]
						],
						'text-allow-overlap': true,
						'text-justify': 'auto',
						'text-font': ["DIN Pro Bold", "Arial Unicode MS Regular"],
						'text-size': ['interpolate', ['linear'],
							['zoom'], 15.50, 0.5, 19, 17
						],
						'icon-image': ['get', 'icon'],
						'icon-size': ['interpolate', ['linear'],
							['zoom'], 16, 0, 19, 1
						],
						'icon-anchor': 'center',
						'icon-pitch-alignment': 'map',
						'icon-allow-overlap': true
					},
					"paint": {
						'text-opacity': 0.8,
						'icon-opacity': 1,
					}
				});

				map.addLayer({
					'id': 'poi-lezaljke',
					'type': 'symbol',
					'source': 'centroids',
					'layout': {
						'text-field': ["get", "numbera"],
						'text-allow-overlap': true,
						'text-justify': 'auto',
						'text-font': ["DIN Pro Bold", "Arial Unicode MS Regular"],
						'text-size': ['interpolate', ['linear'],
							['zoom'], 18, 0, 19, 8, 20, 12
						],
					},
					"paint": {
						'text-opacity': 0.8,
						'icon-opacity': 1,
					}
				});

				map.addLayer({
					'id': 'poi-suncobrani',
					'type': 'symbol',
					'source': 'centroids',
					'layout': {
						'text-field': ["get", "numberb"],
						'text-allow-overlap': true,
						'text-justify': 'auto',

						'text-font': ["DIN Pro Bold", "Arial Unicode MS Regular"],
						'text-size': ['interpolate', ['linear'],
							['zoom'], 17, 0, 18, 3, 19, 14, 20, 16
						],
					},
					"paint": {
						'text-opacity': 0.8,
						'icon-opacity': 1,
						'text-halo-color': '#fff',
						'text-halo-width': 2,
					}
				});

				map.removeLayer("directions-origin-label")
				map.removeLayer("directions-destination-label")
				map.setPaintProperty('directions-origin-point', 'circle-radius', ['interpolate', ['linear'],
					['zoom'], 14, 8, 19, 16
				])
				map.setPaintProperty('directions-destination-point', 'circle-radius', ['interpolate', ['linear'],
					['zoom'], 14, 8, 19, 16
				])
				map.setPaintProperty('directions-origin-point', 'circle-pitch-alignment', 'map')
				map.setPaintProperty('directions-origin-point', 'circle-stroke-width', 3)
				map.setPaintProperty('directions-origin-point', 'circle-stroke-color', '#dddddd')
				map.setPaintProperty('directions-origin-point', 'circle-color', '#ffffff')
				map.setPaintProperty('directions-destination-point', 'circle-pitch-alignment', 'map')
				map.setPaintProperty('directions-destination-point', 'circle-color', '#1da1f2')
				map.setPaintProperty('directions-destination-point', 'circle-stroke-width', 3)
				map.setPaintProperty('directions-destination-point', 'circle-stroke-color', 'white')
				map.setLayoutProperty('directions-route-line', 'line-join', 'round')
				map.setPaintProperty('directions-route-line', 'line-width', 8)
				map.setPaintProperty('land', 'background-color', '#EBDEC3');
				map.setPaintProperty('landuse', 'fill-color', '#EBDEC3');
				map.setPaintProperty('water', 'fill-color', '#6ECCDE');

				const layers = map.getStyle().layers;
				const labelLayerId = layers.find(
					(layer) => layer.type === 'symbol' && layer.layout['text-field']
				).id;
				const test = layers.find(
					(layer) => layer.id === 'directions-waypoint-point').id;

				function rotateCamera(timestamp) {
					console.log('rotiram')
					map.rotateTo((timestamp / 100) % 360, {
						duration: 0
					});
					requestAnimationFrame(rotateCamera);
				}

				console.log('tusanm2')

				createCentroids()

				$(".litepicker-backdrop").remove()

				/* acc fake data */
				accomodation = rezultat1.features.filter((item, i) => item.properties.class == "mh" || item.properties.class == "parcela" || item.properties.class == "glamping" || item.properties.class == "caravan").map((obj) => obj.properties.id);
				// lezaljkeStatus = syncdata.features.filter((item, i) => item.properties.class.split(" ")[1] == "lezaljke").map((obj) => obj.properties.id);
				// suncobranStatus = syncdata.features.filter((item, i) => item.properties.class.split(" ")[1] == "suncobran").map((obj) => obj.properties.id);
				// accomodation = accomodation.concat(lezaljkeStatus)
				// accomodation = accomodation.concat(suncobranStatus)
				/* create filters */
				var createFilters = document.createElement("div");
				var createToggle = document.createElement("div");
				var createFilterHeader = document.createElement("div");
				var createFilterContainer = document.createElement("div")
				var createAccomodation = document.createElement("div");
				var createFacilities = document.createElement("div");
				createFilters.classList.add("filters")
				createToggle.classList.add("filters-toggle")
				createFilterHeader.classList.add("filter-header")
				createFilterContainer.classList.add("filter-container")
				createAccomodation.classList.add("accomodation")
				createFacilities.classList.add("facilities")

				$(createFilters).append(createFilterHeader)
				$(createFilterHeader).append(`<div id="filter">${translate("Filter")}</div>`)

				$(createFilterContainer).append(createAccomodation)
				$(createFilterContainer).append(createFacilities)

				for (i = 0; i < 4; i++) {
					if (i == 0) {
						var jole = new Set(rezultat1.features.filter((item) => item.properties.class == "parcela").map((obj) => obj.properties.brand))
						var joleDva = Array.from(jole)
						// console.log(jole);
						/* alphabet order */
						joleDva = joleDva.sort(function(a, b) {
							return (a < b) ? -1 : (a > b) ? 1 : 0;
						})
						//ako ima nopfilter
						joleDva = joleDva.filter(function(item, index) {
							return (arraySlikaSlider_PO_TIPU.find(el => el.naziv == item).nofilter == 0)
						});
						// console.log(joleDva);
						if (joleDva.length > 0) {
							var filterParcele = document.createElement("div");
							filterParcele.classList.add("accomodation-caption")
							filterParcele.setAttribute("data-caption", "Pitch")
							filterParcele.innerHTML = translate("Pitch")
							createAccomodation.appendChild(filterParcele)
							joleDva.forEach((item, index) => {
								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.classList.add("brand");
								var filterText = document.createTextNode(Object.keys(brandColors).find((aa) => aa == item))
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								// console.log(item);
								filterSpan.style.background = brandColors[Object.keys(brandColors).find((aa) => aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createAccomodation.appendChild(filters)
							})
						}
					}
					if (i == 1) {
						var jole = new Set(rezultat1.features.filter((item) => item.properties.class == "mh").map((obj) => obj.properties.brand))
						var joleDva = Array.from(jole)
						//ako ima nopfilter
						joleDva = joleDva.filter(function(item, index) {
							return (arraySlikaSlider_PO_TIPU.find(el => el.naziv == item).nofilter == 0)
						});
						if (joleDva.length > 0) {
							var filterParcele = document.createElement("div");
							filterParcele.classList.add("accomodation-caption")
							filterParcele.setAttribute("data-caption", "MH")
							filterParcele.innerHTML = translate("MH")
							createAccomodation.appendChild(filterParcele)
							joleDva.forEach((item, index) => {
								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.classList.add("brand");
								var filterText = document.createTextNode(Object.keys(brandColors).find((aa) => aa == item))
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								filterSpan.style.background = brandColors[Object.keys(brandColors).find((aa) => aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createAccomodation.appendChild(filters)
							})
						}
					}
					if (i == 2) {
						var jole = new Set(rezultat1.features.filter((item) => item.properties.class == "glamping").map((obj) => obj.properties.brand))
						var joleDva = Array.from(jole)
						//ako ima nopfilter
						joleDva = joleDva.filter(function(item, index) {
							return (arraySlikaSlider_PO_TIPU.find(el => el.naziv == item).nofilter == 0)
						});
						if (joleDva.length > 0) {
							var filterParcele = document.createElement("div");
							filterParcele.classList.add("accomodation-caption")
							filterParcele.setAttribute("data-caption", "Glamping")
							filterParcele.innerHTML = translate("Glamping")
							createAccomodation.appendChild(filterParcele)
							joleDva.forEach((item, index) => {
								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.classList.add("brand");
								var filterText = document.createTextNode(Object.keys(brandColors).find((aa) => aa == item))
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								filterSpan.style.background = brandColors[Object.keys(brandColors).find((aa) => aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createAccomodation.appendChild(filters)
							})
						}
					}
					if (i == 3) {
						var jole = new Set(rezultat1.features.filter((item) => item.properties.class == "caravan").map((obj) => obj.properties.brand))
						var joleDva = Array.from(jole)
						//ako ima nopfilter
						joleDva = joleDva.filter(function(item, index) {
							return (arraySlikaSlider_PO_TIPU.find(el => el.naziv == item).nofilter == 0)
						});
						if (joleDva.length > 0) {
							var filterParcele = document.createElement("div");
							filterParcele.classList.add("accomodation-caption")
							filterParcele.setAttribute("data-caption", "Caravan")
							filterParcele.innerHTML = translate("Caravan")
							createAccomodation.appendChild(filterParcele)
							joleDva.forEach((item, index) => {
								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.classList.add("brand");
								var filterText = document.createTextNode(Object.keys(brandColors).find((aa) => aa == item))
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								filterSpan.style.background = brandColors[Object.keys(brandColors).find((aa) => aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createAccomodation.appendChild(filters)
							})
						}
					}
				}

				var filterItems
				var josko = new Set(rezultat1.features.filter((item) => item.properties.class.split(" ")[0] == "objekt" && item.properties.filter != "yes" && item.properties.nofilter != "yes" && !item.properties.class.includes("roof") && !item.properties.class.includes("suncobran_boja")).map((obj) => obj.properties.class))
				var joskoDva = Array.from(josko)
				console.log(joskoDva)

				var pegula = new Set(rezultat1.features.filter((item) => item.properties.hasOwnProperty("grupa")))
				pegula = Array.from(pegula)

				var jolimirABC = []
				joskoDva = joskoDva.sort(function(a, b) {
					return (poiLabels[filterObjects[a][0].icon][0][lng] < poiLabels[filterObjects[b][0].icon][0][lng]) ? -1 : (poiLabels[filterObjects[a][0].icon][0][lng] > poiLabels[filterObjects[b][0].icon][0][lng]) ? 1 : 0;
				})

				console.log(pegula)

				if (joskoDva.length > 0) {
					console.log(joskoDva)
					joskoDva.forEach((item, index) => {
						if (item === "objekt recepcija") {
							const found = pegula.find(pr => pr.properties.icon === "ico-info-01")

							if (found.properties.grupa === null) {
								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.setAttribute("data-class-object", item)
								var filterText = document.createTextNode(poiLabels[filterObjects[item][0].icon][0][lng])
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								var spanIcon = document.createElement("img")
								spanIcon.src = 'assets/img/icons/' + filterObjects[item][0].icon + '.svg?'
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								// filterSpan.style.background = brandColors[Object.keys(filterObjects).find((aa)=> aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(spanIcon)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createFacilities.appendChild(filters)
							} else {
								var novaGrupa = document.createElement("div");
								novaGrupa.classList.add("facilities-caption")
								novaGrupa.setAttribute("data-caption", found.properties.grupa)
								let tName = found.properties.grupa.replace("ž", "z").toLowerCase()
								console.log(tName, translations[tName])
								novaGrupa.innerHTML = translations[tName][0][lng]
								createFacilities.appendChild(novaGrupa)

								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.setAttribute("data-class-object", item)
								var filterText = document.createTextNode(poiLabels[filterObjects[item][0].icon][0][lng])
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								var spanIcon = document.createElement("img")
								spanIcon.src = 'assets/img/icons/' + filterObjects[item][0].icon + '.svg?'
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								// filterSpan.style.background = brandColors[Object.keys(filterObjects).find((aa)=> aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(spanIcon)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createFacilities.appendChild(filters)
							}
						}

						if (item === "objekt wc") {
							const found = pegula.find(pr => pr.properties.icon === "ico-wc")
							console.log(found.properties.grupa)

							if (found.properties.grupa === null) {
								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.setAttribute("data-class-object", item)
								var filterText = document.createTextNode(poiLabels[filterObjects[item][0].icon][0][lng])
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								var spanIcon = document.createElement("img")
								spanIcon.src = 'assets/img/icons/' + filterObjects[item][0].icon + '.svg?'
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								// filterSpan.style.background = brandColors[Object.keys(filterObjects).find((aa)=> aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(spanIcon)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createFacilities.prepend(filters)
							} else {
								var novaGrupa = document.createElement("div");
								novaGrupa.classList.add("facilities-caption")
								novaGrupa.setAttribute("data-caption", found.properties.grupa)
								let tName = found.properties.grupa.replace("ž", "z").toLowerCase()
								console.log(tName, translations[tName])
								novaGrupa.innerHTML = translations[tName][0][lng]
								createFacilities.appendChild(novaGrupa)

								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.setAttribute("data-class-object", item)
								var filterText = document.createTextNode(poiLabels[filterObjects[item][0].icon][0][lng])
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								var spanIcon = document.createElement("img")
								spanIcon.src = 'assets/img/icons/' + filterObjects[item][0].icon + '.svg?'
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								// filterSpan.style.background = brandColors[Object.keys(filterObjects).find((aa)=> aa == item)][0].color
								filters.appendChild(filterSpan)
								filterSpan.appendChild(spanIcon)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)
								createFacilities.appendChild(filters)
							}
						}

						// var filters = document.createElement("div");
						// filters.classList.add("filter-item");
						// filters.setAttribute("data-class-object", item)
						// var filterText = document.createTextNode(poiLabels[filterObjects[item][0].icon][0][lng])
						// var filterSpan = document.createElement("span")
						// var filterSpanText = document.createElement("span")
						// var spanIcon = document.createElement("img")
						// spanIcon.src = 'assets/img/icons/' + filterObjects[item][0].icon + '.svg?'
						// filterSpan.classList.add("filter-square");
						// filterSpanText.classList.add("filter-text")
						// // filterSpan.style.background = brandColors[Object.keys(filterObjects).find((aa)=> aa == item)][0].color
						// filters.appendChild(filterSpan)
						// filterSpan.appendChild(spanIcon)
						// filterSpan.appendChild(filterText)
						// filterSpanText.appendChild(filterText)
						// filters.appendChild(filterSpanText)
						// createFacilities.prepend(filters)
					})
					var filterParcele = document.createElement("div");
					filterParcele.classList.add("facilities-caption")
					filterParcele.setAttribute("data-caption", "Main")
					filterParcele.innerHTML = translate("Main")
					createFacilities.prepend(filterParcele)
				}

				var joskoIkonice = new Set(rezultat1.features.filter((item) => item.properties.class == "interest-point" && item.properties.filter != "no" && item.properties.nofilter != "yes").map((obj) => obj.properties.icon))
				var joskoDvaIkonice = Array.from(joskoIkonice)
				joskoDvaIkonice = joskoDvaIkonice.sort(function(a, b) {
					return (poiLabels[a][0][lng] < poiLabels[b][0][lng]) ? -1 : (poiLabels[a][0][lng] > poiLabels[b][0][lng]) ? 1 : 0;
				})

				if (_POSTAVKE_KAMPA_.sortFilterByRb === '1') {

					var joskoIkoniceRB = new Set(rezultat1.features.filter((item) => item.properties.class == "interest-point" && item.properties.filter != "no" && item.properties.icon != undefined && item.properties.nofilter != "yes").map((obj) => ({
						name: obj.properties.icon,
						id: obj.properties.rb
					})))

					function getUniqueListBy(arr, key) {
						return [...new Map(arr.map(item => [item[key], item])).values()]
					}
					joskoDvaIkonice = Array.from(joskoIkoniceRB)
					joskoDvaIkonice = getUniqueListBy(joskoDvaIkonice, 'name')

					joskoDvaIkonice.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : ((parseInt(b.id) > parseInt(a.id)) ? -1 : 0));

				}

				if (joskoDvaIkonice.length > 0) {

					let _item_;
					// console.log(joskoDvaIkonice)
					let passed = []
					joskoDvaIkonice.forEach((item, index) => {
						if (_POSTAVKE_KAMPA_.sortFilterByRb === '1') {
							_item_ = item.name
						} else {
							_item_ = item
						}
						// console.log(_item_)

						const found = pegula.sort((a, b) => a.properties.icon.localeCompare(b.properties.icon)).find(pr => pr.properties.icon === _item_)

						if (found.properties.grupa !== null) {
							console.log(found.properties.grupa)

							// let foundTitle = $(`div[data-caption='${found.properties.grupa}']`)

							console.log(passed)
							let foundEL = createFacilities.querySelector(`[data-caption='${found.properties.grupa}']`)

							if (!foundEL) {
								var novaG = document.createElement("div");
								novaG.classList.add("facilities-caption")
								novaG.setAttribute("data-caption", found.properties.grupa)
								let tName = found.properties.grupa.replace("ž", "z").toLowerCase()
								console.log(tName, translations[tName])
								novaG.innerHTML = translations[tName][0][lng]
								createFacilities.appendChild(novaG)
							}

							if (passed.includes(found.properties.grupa)) {


								// var filters = document.createElement("div");
								// filters.classList.add("filter-item");
								// filters.setAttribute("data-class", _item_)
								// var filterText = document.createTextNode(poiLabels[_item_] != undefined ? poiLabels[_item_][0][lng] : "")
								// var filterSpan = document.createElement("span")
								// var filterSpanText = document.createElement("span")
								// var spanIcon = document.createElement("img")
								// spanIcon.src = 'assets/img/icons/' + _item_ + '.svg'
								// filterSpan.classList.add("filter-square");
								// filterSpanText.classList.add("filter-text")
								// filters.appendChild(filterSpan)
								// filterSpan.appendChild(spanIcon)
								// filterSpan.appendChild(filterText)
								// filterSpanText.appendChild(filterText)
								// filters.appendChild(filterSpanText)
								// createFacilities.append(filters)
							} else {
								// var filters = document.createElement("div");
								// filters.classList.add("filter-item");
								// filters.setAttribute("data-class", _item_)
								// var filterText = document.createTextNode(poiLabels[_item_] != undefined ? poiLabels[_item_][0][lng] : "")
								// var filterSpan = document.createElement("span")
								// var filterSpanText = document.createElement("span")
								// var spanIcon = document.createElement("img")
								// spanIcon.src = 'assets/img/icons/' + _item_ + '.svg'
								// filterSpan.classList.add("filter-square");
								// filterSpanText.classList.add("filter-text")
								// filters.appendChild(filterSpan)
								// filterSpan.appendChild(spanIcon)
								// filterSpan.appendChild(filterText)
								// filterSpanText.appendChild(filterText)
								// filters.appendChild(filterSpanText)
								// console.log(createFacilities)
								// foundTitle.after(filters)
							}
							passed.push(found.properties.grupa)
						}
					})
					var filterParcele = document.createElement("div");
					filterParcele.classList.add("facilities-caption")
					filterParcele.setAttribute("data-caption", "POI")
					filterParcele.innerHTML = translate("POI")
					createFacilities.appendChild(filterParcele)

					joskoDvaIkonice.forEach((item, index) => {
						if (_POSTAVKE_KAMPA_.sortFilterByRb === '1') {
							_item_ = item.name
						} else {
							_item_ = item
						}
						// console.log(_item_)

						const found = pegula.find(pr => pr.properties.icon === _item_)

						if (found.properties.grupa === null) {
							var filters = document.createElement("div");
							filters.classList.add("filter-item");
							filters.setAttribute("data-class", _item_)
							var filterText = document.createTextNode(poiLabels[_item_] != undefined ? poiLabels[_item_][0][lng] : "")
							var filterSpan = document.createElement("span")
							var filterSpanText = document.createElement("span")
							var spanIcon = document.createElement("img")
							spanIcon.src = 'assets/img/icons/' + _item_ + '.svg'
							filterSpan.classList.add("filter-square");
							filterSpanText.classList.add("filter-text")
							filters.appendChild(filterSpan)
							filterSpan.appendChild(spanIcon)
							filterSpan.appendChild(filterText)
							filterSpanText.appendChild(filterText)
							filters.appendChild(filterSpanText)
							createFacilities.append(filters)
						}
					})

					joskoDvaIkonice.forEach((item, index) => {
						if (_POSTAVKE_KAMPA_.sortFilterByRb === '1') {
							_item_ = item.name
						} else {
							_item_ = item
						}
						// console.log(_item_)

						const found = pegula.sort((a, b) => a.properties.icon.localeCompare(b.properties.icon)).find(pr => pr.properties.icon === _item_)

						if (found.properties.grupa !== null) {
							let foundEL = createFacilities.querySelector(`[data-caption='${found.properties.grupa}']`)

							console.log(foundEL)

							if (foundEL) {
								var filters = document.createElement("div");
								filters.classList.add("filter-item");
								filters.setAttribute("data-class", _item_)
								var filterText = document.createTextNode(poiLabels[_item_] != undefined ? poiLabels[_item_][0][lng] : "")
								var filterSpan = document.createElement("span")
								var filterSpanText = document.createElement("span")
								var spanIcon = document.createElement("img")
								spanIcon.src = 'assets/img/icons/' + _item_ + '.svg'
								filterSpan.classList.add("filter-square");
								filterSpanText.classList.add("filter-text")
								filters.appendChild(filterSpan)
								filterSpan.appendChild(spanIcon)
								filterSpan.appendChild(filterText)
								filterSpanText.appendChild(filterText)
								filters.appendChild(filterSpanText)

								foundEL.after(filters)
							}
						}
					})
				}

				$(createFilters).append(`
        <div class="swiper swepper">
          <div class="swiper-pagination"></div>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              ${createAccomodation.outerHTML}
            </div>
            <div class="swiper-slide">
              ${createFacilities.outerHTML}
            </div>
          </div>
        </div>`)
				var menu = ['accomodation', 'facilities']
				setTimeout(function() {
					var swepper = new Swiper(".swepper", {
						slidesPerView: 1,
						spaceBetween: 0,
						loop: false,
						allowSlidePrev: true,
						calculateHeight: true,
						allowSlideNext: true,
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
							renderBullet: function(index, className) {
								var translate = menu[index].slice(0, 1).toUpperCase() + menu[index].slice(1, menu[index].length)
								return `<h4 data-id="${menu[index]}" class="${className}">${translations[translate][0][lng]}</h4>`;
							},
						}
					});
				}, 500)

				var filters = document.createElement("div");
				var filterText = document.createTextNode(`${translate("Reset")}`)
				var createReset = document.createElement("div");
				filters.classList.add("filter-item");
				createReset.classList.add("reset")
				filters.appendChild(filterText)
				createReset.appendChild(filters)
				createFilters.appendChild(createReset)
				$(filters).attr("id", "viewall")

				$("body").append(createFilters)

				$(document).on("click", ".filter-item", function(e) {

					if ($(window).width() < 768) {
						$(".menu-item").removeClass("selected")
						$(".menu-item").removeClass("not-selected")
					}

					if ($(window).width() < 768) {
						$(".filters").removeClass("open")
					}

					//reset button bbox
					map.fitBounds(bbox, {
						padding: {
							top: ($(window).height() * 0.2),
							bottom: ($(window).height() * 0.2),
							left: 10,
							right: 10
						}
					})

					showAll = $(this).text();
					kojiFilter = showAll;
					//console.log('koji filter', kojiFilter);
					var thisTag = $(this).data("tag")
					var thisClass = $(this).data("class")
					var thisClassObject = $(this).data("class-object")

					$(".filter-item:not(#viewall):not(#filter)").css({
						"opacity": "0.5",
						"font-weight": "600"
					})
					$(this).css({
						"opacity": "1",
						"font-weight": "700"
					})

					showInterestPointsAll()

					var kojafunkcija

					$("#layers").removeClass("active")
					$(".filter-item").removeClass("active")
					if (!$(this).is("#viewall")) {

						$("#layers").addClass("active")
						$(this).addClass("active")
						var bounds = new mapboxgl.LngLatBounds();
						var pero
						rezultat1.features.forEach(function(feature) {
							if (feature.properties.hasOwnProperty("brand")) {
								if (feature.properties.brand == showAll) {
									hideInterestPoints()
									if ($("#date").is(".active")) {
										coloringFilterDate(showAll)
									}
									if ($("#date").is(":not(.active)")) {
										coloringFilter(showAll)
									}
									bounds.extend(turf.envelope(feature).bbox);
								}
							}
							if (feature.properties.hasOwnProperty("class")) {
								if (feature.properties.class == thisClassObject) {
									hideInterestPoints()

									if ($("#date").is(".active")) {
										coloringClassesDate(thisClassObject)
										showInterestPointFilterClassObject(thisClassObject)
									}
									if ($("#date").is(":not(.active)")) {

										coloringClasses(thisClassObject)
										showInterestPointFilterClassObject(thisClassObject)
									}
									bounds.extend(turf.envelope(feature).bbox);
								}
							}
							if (feature.properties.hasOwnProperty("icon")) {
								if (feature.properties.icon.includes(thisClass)) {

									if ($("#date").is(".active")) {
										poiResetColoringFilterDate()
									}
									if ($("#date").is(":not(.active)")) {
										poiResetColoringFilter()
									}
									showInterestPoints(thisClass)
									bounds.extend(turf.envelope(feature).bbox);
								}
							}
						});

						map.fitBounds(bounds, {
							padding: {
								top: ($(window).height() * 0.2),
								bottom: ($(window).height() * 0.2),
								left: 20,
								right: 20
							}
						})
					}

					if ($(this).is("#viewall")) {
						document.querySelector(".accomodation").scrollTo({
							top: 0,
							behavior: 'smooth'
						})
						document.querySelector(".facilities").scrollTo({
							top: 0,
							behavior: 'smooth'
						})
						$(".filter-item").removeAttr("style")
						if ($("#date").is(".active")) {
							resetColoringFilterDate()
						}
						if ($("#date").is(":not(.active)")) {
							resetingColors();
						}
					}

					map.once("idle", function() {
						map.resize()
					})

				})

				clearInterval(pageLoaded)

				$(".ui-loader").remove()
				$("#ModalTrazi").removeClass("in")
				$(".pannellum-canvas").after(`<div class="bg-shadow"></div>`)
				mapCenter = [turf.centerOfMass(rezultat1.features[0]).geometry.coordinates][0]
				map.setCenter(mapCenter);
				bbox = turf.envelope(rezultat1.features[1]).bbox
				map.fitBounds(bbox, {
					padding: {
						top: ($(window).height() * 0.2),
						bottom: ($(window).height() * 0.2),
						left: 10,
						right: 10
					}
				});

				async function fetchWeather() {
					var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4b65ddba6c674681a8e72400221907&days=3&q=${mapCenter[1]},${mapCenter[0]}&aqi=no`);
					if (response.status === 200) {
						var vrijeme = await response.json();
						return vrijeme
					}
				}

				async function vratiWeather() {
					weather = await fetchWeather();

				}

				function srediWeather() {
					$(".temp").html(`${Math.floor(weather.current.temp_c)}°C`)
					$(".weather").prepend(`<img src="assets/img/weather/${weather.current.condition.icon.split("/")[5]}/${weather.current.condition.icon.split("/")[6].replace(".png", ".svg")}">`)

				}

				vratiWeather().then(
					() => srediWeather()
				);

				var startZoom
				var from
				var to
				var options
				var distance

				map.on("moveend", function() {
					$("#map").css("pointer-events", "auto")
					startZoom = map.getZoom()
					from = turf.point(mapCenter);
					options = {
						units: 'meters'
					}
				})

				setTimeout(function() {

				}, 500)

				var i = 0
				var currentZoom
				var isInteractive = false
				var int

				var move = map.on("moveend", (e) => {

					isInteractive = true
					i += 1

					async function once() {
						map.once("moveend", () => {

							to = turf.point([map.getCenter()["lng"], map.getCenter()["lat"]]);
							distance = turf.distance(turf.point(mapCenter), to, options);
							currentZoom = map.getZoom()
						})
					}

					once().then(function() {
						if (geolocate._watchState === 'OFF') {
							if (currentZoom.toFixed(2) < 17.5) {
								$(".mapboxgl-popup-close-button").trigger("click")
							}

							if (!turf.booleanPointInPolygon(to, buffered) || (currentZoom.toFixed(2) < startZoom.toFixed(2))) {
								$(".mobile-header").hide()
								$(".selected-parameters").hide()
								$(".mobile-menu").hide()
								$(".mobile-menu-shade").hide()
								$(".mobile-menu-shade-top").hide()
								$("#map").css("pointer-events", "none")
								$("#home").hide()
								$("#openTrazi").hide()
								$("#layers").hide()
								$("#date").hide()
								$("#lang").hide()
								$(".mapboxgl-ctrl-top-right").hide()

								map.once("idle", function() {
									$("#home").trigger("click")
								})

								map.once("moveend", function() {
									$(".mobile-header").removeAttr("style")
									$(".mobile-menu").show()
									$(".mobile-menu-shade").show()
									$(".mobile-menu-shade-top").removeAttr("style")
									$("#map").css("pointer-events", "auto")
									$("#home").show()
									$("#openTrazi").show()
									$("#layers").show()
									$("#date").show()
									$("#lang").show()
									$(".mapboxgl-ctrl-top-right").show()
								})
							}

						}
					})
				})

			}
		}, 200)
		var sss

		function generateRandom(min = 0, max = 100) {

			let difference = max - min;

			let rand = Math.random();

			rand = Math.floor(rand * difference);

			rand = rand + min;

			return rand;
		}

		function getRandom(arr, n) {
			var result = new Array(n),
				len = arr.length,
				taken = new Array(len);
			if (n > len)
				throw new RangeError("getRandom: more elements taken than available");
			while (n--) {
				var x = Math.floor(Math.random() * len);
				result[n] = arr[x in taken ? taken[x] : x];
				taken[x] = --len in taken ? taken[len] : len;
			}
			return result;
		}

		/*phobs_end*/
		/*start new litepicker*/

		/*end new litepicker*/

		$(document).on("click", ".weather-bg", _ => {
			$(".annotation.weather .close").trigger("click")
		});

		// });

	});

	var test

	function vrtiVrijeme() {
		test = ""
		weather.forecast.forecastday.forEach((item, i) => {
			if (i == 0) {
				test += `<div class="w-heading">${translate("Weather")}</div><div class="weather-day">
        <div class="weather-left">
          <p class="day-temp">${Math.floor(weather.current.temp_c)}°</p>
          <p class="day">${translations[moment(weather.location.localtime).format('dddd')][0][lng]}</p>
          <p class="w-date">${moment(weather.location.localtime).format('D')} ${translations[moment(weather.location.localtime).format('MMMM')][0][lng]}</p>
        </div>
        <div class="weather-right">
          <img src="assets/img/weather/${weather.current.condition.icon.split("/")[5]}/${weather.current.condition.icon.split("/")[6].replace(".png", ".svg")}">
          <p class="w-place">
          <b>${weather.location.name}</b>, <span>${weather.location.region}</span></p>
          </div>
        </div>
        <div class="weather-day-bottom">
          <div class="day-detail wind">
            <i class="fas fa-wind"></i>
            <span><b>${Math.floor(weather.current.wind_kph)} </b>kmh</span>
          </div>
          <div class="day-detail humidity">
            <i class="fas fa-droplet"></i>
            <span><b>${weather.current.humidity} </b>%</span>
          </div>
          <div class="day-detail rain">
            <i class="fas fa-umbrella"></i>
            <span><b>${weather.forecast.forecastday[0].day.daily_chance_of_rain} </b>%</span>
            </div>
          </div>`
			}
		})
	}

	$(".weather").on("click", _ => {
		vrtiVrijeme()
		$("body").append(`<div class="annotation weather">
  <button class="close" type="button" data-dismiss="modal" aria-hidden="true" style="opacity: 1;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" fill="#0bae81" stroke="#0bae81" stroke-width="8"></path></svg>

  </div>`)

		$(".annotation.weather").append($("<div/>", {
			html: test,
			class: "weather-day-container"
		}))
		$("body").append(`<div class="weather-bg"></div>`)
	})

	$(document).on("click", ".weather .close", _ => {
		$(".annotation.weather").remove()
		$(".weather-bg").remove()
	})

	var routingSpinner = $("<img/>", {
		src: "assets/img/logo.svg"
	})
	var routingMessage = `<div class="annotation route"><p>${translate("Route message")}</p>${routingSpinner[0].outerHTML}</div>`

	function navigateTo() {
		$("#map").css("pointer-events", "none")

		$(".annotation.route").remove()
		$("body").append($(routingMessage))

		if (trackActive) {
			map.removeControl(geolocate);
			map.addControl(geolocate)
		}
		prviprikaz = true
		isVratiPrikaz = true;
		trackActive = false
		gpsActive = true;
		isSetOrigin = false;
		geolocate.trigger();

		$("#ModalParcela").modal("hide");
		$("#ModalObjekt").modal("hide");
		$(".selected-parameters").hide();

		$("#openTrazi").hide();
		$("#layers").hide();
		$("#date").hide();
		$("#lang").hide();
		$("body").addClass("gps-active")
		$("body").append(`${isAppleDetected ? '<button class="btn" id="audio"><i class="fas fa-volume-slash"></i></button>' : '<button class="btn active" id="audio"><i class="fas fa-volume"></i></button>'}`)
		$("#home, #nav-3d, #return, #car, #walk, #audio").css({
			"opacity": "0.5",
			"pointer-events": "none"
		})
	}

	var prviprikaz
	$(document).on('click', '#navigateTo', function() {
		navigateTo()
	});

	//qr code test
	if (qren == false) {
		$('.bqr').css('display', 'none');
	}
	$(document).on('click', '#qrcode', function() {
		generateQR(brojGPS_QRCode)
		//console.log(brojGPS_QRCode)
		//SEND_SMS_NAV(SMS_NUMBER, 'Link to Your pitch is ' + 'https://campsabout.com/kampc_dev/kampc/index.html?pitch=' + gpsParcela)
	});

	function generateQR(pitch) {
		window.open('https://campsabout.com/guestmail.html?kampid=' + kampID + '&pitch=' + pitch, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
	}
	//kraj qrcode test

	$(document).on('click', '#navigateToPoi', function() {
		$(".mapboxgl-popup-close-button").trigger("click")
		destinationLocation = destinationLocationPoi
		showInterestPointID(gpsParcela)
		navigateTo()
	});
	$(document).on('click', '#navigateToLezaljke', function() {
		$(".mapboxgl-popup-close-button").trigger("click")
		navigateTo()
	});

	$(document).on('click', '.mapboxgl-ctrl-geolocate', function() {
		if (geolocate._watchState == "OFF") {
			$("#home").trigger("click")
		}
		setTimeout(() => {
			if (geolocate._watchState == "WAITING_ACTIVE") {
				$("body").addClass("message")
				$("body").append(`<div class="annotation"><h3>${translate("Imporant message")}</h3><p>${translate("Navigation not available")}</p><div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`)

				$(".confirm").on("click", function() {
					$("body").removeClass("message")
					$(".annotation").remove()
				})
			}
		}, 5000)
	});

	$(document).keyup(function(e) {
		if (e.key === "Escape") {
			// escape key maps to keycode `27`
			if ($(".mapboxgl-popup").is(":visible")) {
				$(".mapboxgl-popup-close-button").trigger("click")
			}
			if ($("#ModalTrazi").is(":visible")) {
				$(".search-header svg").trigger("click")
			}
			if ($(".annotation.weather").is(":visible")) {
				$(".annotation.weather .close").trigger("click")
			}

		}
	});

	var availability
	var destinationLocationPoi
	var ikonClick

	map.on('click', 'poi', (e) => {
		popupDiv = `<button class="btn btn-outline-secondary" id="navigateToPoi"><span>${translate("Take me")}</span><img src="assets/img/gps-arrow.svg"></button>`;

		var getTranslation = poiLabels[e.features[0].properties.icon]

		console.log(e.features[0].properties)

		if (e.features[0].properties.hasOwnProperty('class') && e.features[0].properties.hasOwnProperty('icon') && getTranslation != undefined) {
			if (!e.features[0].properties.class.includes('noclick')) {
				ikonClick = true
				getTranslation = getTranslation[0][lng]
				gpsParcela = e.features[0].properties.id;

				destinationLocationPoi = e.features[0].geometry.coordinates;

				if (noGPS) {
					$("#navigateToPoi").css({
						"opacity": "0.5",
						"pointer-events": "none"
					})
				}

				if (e.features[0].properties.navigation === '0') {
					const popup = new mapboxgl.Popup({
							closeOnClick: true
						})
						.setLngLat(e.features[0].geometry.coordinates)
						.setOffset(20)
						.setHTML(`<h3>${getTranslation}${dev_env ? e.features[0].properties.id : ''}</h3>`)
						.addTo(map);
				} else {
					const popup = new mapboxgl.Popup({
							closeOnClick: true
						})
						.setLngLat(e.features[0].geometry.coordinates)
						.setOffset(20)
						.setHTML(`<h3>${getTranslation}${dev_env ? e.features[0].properties.id : ''}</h3>${e.features[0].properties.opis.length > 0 && e.features[0].properties.opis !== "" && e.features[0].properties.opis !== "null" && e.features[0].properties.opis !== null ? '<p>' + e.features[0].properties.opis + '</p>' : ''}${e.features[0].properties.slika !== 'null' && e.features[0].properties.slika !== null && e.features[0].properties.slika !== "" ? '<img class="interestPointImagePopup" src="' + '../../' + e.features[0].properties.slika.replace('/cms/', 'kamp/views/') + '" alt="Interest Point Image">' : ''}${e.features[0].properties.www !== 'null' && e.features[0].properties.www.length > 0 && e.features[0].properties.www !== null && e.features[0].properties.wwwTekst.length > 0 ? '<a href="' + e.features[0].properties.www + '">' + e.features[0].properties.wwwTekst + '</a>' : ''}${!userLocation ? "<span class='col-sm-12 navigation-denied'>" + translate("Navigation not available") + "</span>" : ""}${popupDiv}`)
						.addTo(map);
				}

				$(document).on("click", () => {
					if ($(".mapboxgl-popup").is(":visible")) {
						setTimeout(function() {
							ikonClick = false
						}, 500)

					}
				})
			}

		}

	});

	map.on('click', 'poi-other', (e) => {

		popupDiv = `<button class="btn btn-outline-secondary" id="navigateToPoi"><span>${translate("Take me")}</span><img src="assets/img/gps-arrow.svg"></button>`;

		var getTranslation = poiLabels[e.features[0].properties.icon]

		if (e.features[0].properties.hasOwnProperty('class') && e.features[0].properties.hasOwnProperty('icon') && getTranslation != undefined) {

			if (!e.features[0].properties.class.includes('noclick')) {
				ikonClick = true
				getTranslation = getTranslation[0][lng]
				gpsParcela = e.features[0].properties.id;

				destinationLocationPoi = e.features[0].geometry.coordinates;

				if (noGPS) {
					$("#navigateToPoi").css({
						"opacity": "0.5",
						"pointer-events": "none"
					})
				}

				if (e.features[0].properties.navigation === '0') {
					const popup = new mapboxgl.Popup({
							closeOnClick: true
						})
						.setLngLat(e.features[0].geometry.coordinates)
						.setOffset(20)
						.setHTML(`<h3>${getTranslation}${dev_env ? e.features[0].properties.id : ''}</h3>`)
						.addTo(map);
				} else {
					const popup = new mapboxgl.Popup({
							closeOnClick: true
						})
						.setLngLat(e.features[0].geometry.coordinates)
						.setOffset(20)
						.setHTML(`<h3>${getTranslation}${dev_env ? e.features[0].properties.id : ''}</h3>${!userLocation ? "<span class='col-sm-12 navigation-denied'>" + translate("Navigation not available") + "</span>" : ""}${popupDiv}`)
						.addTo(map);
				}

				$(document).on("click", () => {
					if ($(".mapboxgl-popup").is(":visible")) {
						setTimeout(function() {
							ikonClick = false
						}, 500)

					}
				})
			}

		}

	});

	var panomBrand

	map.on('click', 'layer1_fill', (e) => {

		/* MANUALNO POSTAVLJANJE CENTROIDA - automatski kopira geojson koordinate */
		var postaviCentroid = false
		if (postaviCentroid) {
			var centroid = []
			centroid.push(parseFloat((e.lngLat["lng"].toString()).slice(0, 10)), parseFloat((e.lngLat["lat"].toString()).slice(0, 10)))
			navigator.clipboard.writeText(`"centroid":[${centroid}]`)
		}

		if (e.features[0].properties.class.split(" ")[1] == "lezaljke") {
			gpsParcela = e.features[0].properties.id;
			ikonClick = true
			destinationLocation = turf.centerOfMass(turf.combine(turf.multiPolygon(e.features[0].geometry.coordinates))).geometry.coordinates;
			const popup = new mapboxgl.Popup({
					closeOnClick: true
				})
				.setLngLat(turf.centerOfMass(e.features[0]).geometry.coordinates)
				.setOffset(20)
				.setHTML(`<h3>${translate("Loungers")}</h3><span class="lounger-price">9,99€/day</span>
      ${$("#date").is(".active") ? getAvailabilityLounger(gpsParcela.toString()) : "<span class='check-lounger'>You can check availability of a lounger by selecting dates.</span>"}
      ${!userLocation ? "<span class='col-sm-12 navigation-denied'>" + translate("Navigation not available") + "</span>" : ""}<button class="btn btn-outline-secondary" id="navigateToLezaljke"><span>${translate("Take me")}</span><img src="assets/img/gps-arrow.svg"></button>`)
				.addTo(map);

			$(document).on("click", () => {
				if ($(".mapboxgl-popup").is(":visible")) {
					setTimeout(function() {
						ikonClick = false
					}, 500)

				}
			})
		}

		if (e.features[0].properties.class.split(" ")[1] == "suncobran" || e.features[0].properties.class.split(" ")[1] == "suncobran_boja") {
			var kojiklik = e.features[0].properties.class.split(" ")[1]
			if (kojiklik == "suncobran_boja") {
				gpsParcela = e.features[0].properties["foreign-id"]
				destinationLocation = turf.centerOfMass(turf.combine(turf.multiPolygon(e.features[0].geometry.coordinates))).geometry.coordinates;
			} else {
				gpsParcela = e.features[0].properties.id;
				destinationLocation = turf.centerOfMass(e.features[0]).geometry.coordinates;
			}

			ikonClick = true

			const popup = new mapboxgl.Popup({
					closeOnClick: true
				})
				.setLngLat(turf.centerOfMass(e.features[0]).geometry.coordinates)
				.setOffset(20)
				.setHTML(`<h3>${translate("Umbrella")}</h3><span class="lounger-price">9,99€/day</span>
      ${$("#date").is(".active") ? getAvailabilityUmbrella(gpsParcela.toString()) : "<span class='check-lounger'>You can check availability of an umbrella by selecting dates.</span>"}
      ${!userLocation ? "<span class='col-sm-12 navigation-denied'>" + translate("Navigation not available") + "</span>" : ""}<button class="btn btn-outline-secondary" id="navigateToLezaljke"><span>${translate("Take me")}</span><img src="assets/img/gps-arrow.svg"></button>`)
				.addTo(map);

			$(document).on("click", () => {
				if ($(".mapboxgl-popup").is(":visible")) {
					setTimeout(function() {
						ikonClick = false
					}, 500)

				}
			})
		}

		if (ikonClick != true) {

			//MODAL ZA PARCELE
			if ((e.features[0].properties.class.split(" ")[1] != "lezaljke") && (e.features[0].properties.class.split(" ")[0] != "objekt")) {
				//ako nema number onda ga nemoj niti otvarati
				//if (e.features[0].properties.number === '') return false;
				gpsParcela = e.features[0].properties.id;
				brojGPS_QRCode = e.features[0].properties.brojMISH;
				destinationLocation = turf.centerOfMass(e.features[0]).geometry.coordinates;

				//ako je development i daje gresku, samo logaj id
				if (dev_env) {
					console.log('ID gis', gpsParcela);
				}

				var obalaLine = rezultat1.features.find(e => e.properties.class == "obala-line")
				if (obalaLine != undefined) {
					obalaLine = obalaLine.geometry.coordinates
					var line = turf.lineString(obalaLine);

					var pt = turf.point(turf.centerOfMass(e.features[0]).geometry.coordinates);

					var seaDistance = turf.nearestPointOnLine(line, pt, {
						units: 'meters'
					});
					seaDistance = seaDistance.properties.dist

					$("#udaljenostmore").text(`${seaDistance.toFixed(0) + " m"}`);
				} else {
					$("#udaljenostmore").text(`${translate("Distance sea not available")}`);
				}

				$(".amenities").html(`<p id="amenities">${translate("Amenities")}</p>`)
				$("#povrsina").text(parseInt((turf.area(e.features[0]))) + " m²");
				if ($("#ModalParcela").is(".located")) {
					$("#navigateTo").css({
						"opacity": "0.5",
						"pointer-events": "none"
					})
				}
				if ($("#ModalObjekt").is(".located")) {
					$("#navigateTo").css({
						"opacity": "0.5",
						"pointer-events": "none"
					})
				}

				var temp1 = turf.envelope(e.features[0]);
				var duzina = turf.rhumbDistance(turf.point(temp1.geometry.coordinates[0][0]), turf.point(temp1.geometry.coordinates[0][1]), {
					units: 'meters'
				});
				var sirina = turf.rhumbDistance(turf.point(temp1.geometry.coordinates[0][1]), turf.point(temp1.geometry.coordinates[0][2]), {
					units: 'meters'
				});

				$("#dimenzija").text(duzina.toFixed(0) + '×' + sirina.toFixed(0) + ' m cca');

				function NaslovModal(klasa) {
					return e.features[0].properties.class;
				}

				var mapaId_dev = e.features[0].properties.id;
				var lang1 = e.features[0].properties[lng];
				var label1 = e.features[0].properties.label;
				var type1 = e.features[0].properties.type;
				var brand1 = e.features[0].properties.brand;
				var amenities1 = e.features[0].properties.amenities;
				var number1 = e.features[0].properties.number;
				var klasa11 = e.features[0].properties['class'];
				var draw1 = e.features[0].properties['Draw'];
				var kojiID = e.features[0].properties.id;
				var klasa = e.features[0].properties.class;
				panomBrand = e.features[0].properties.brand;

				if (klasa.includes("mh") || klasa.includes("parcela") || klasa.includes("glamping") || klasa.includes("caravan")) { //tu je prije bilo i ovo ako tareba || klasa.split(" ")[0] == "objekt"
					//ako nema number onda ga nemoj niti otvarati
					if (e.features[0].properties.number === '') return false;

					/*phobs*/
					let parametriParcele; //tu je prije bio definiran podacioParceli
					podacioParceli = '';
					async function ucitajParametreParcele() {
						showLoader();
						var response = await fetch(_PARAMETRI_KAMPA.paramParcelaURL + kojiID + '&id=' + kampID + '&group=' + grupacijaName); //pazi, tu ce isto trebati dodati kampId kada bude vise od jednog kampa
						if (response.status === 200) {
							parametriParcele = await response.json();
							return parametriParcele
						}
					}

					async function vratiParametreParcele() {
						podacioParceli = await ucitajParametreParcele();
						//parametri za booking
						paramZaBooking.brojSJ = podacioParceli.brojMISH;
						paramZaBooking.pmsUnitId = podacioParceli.pmsUnitId;
						paramZaBooking.datumOd = phobsDatumOd;
						paramZaBooking.brojDana = phobsBrojDana;
						paramZaBooking.pmsTip = podacioParceli.tipMISH,
							paramZaBooking.brojOsoba = bookData['adults'];
						paramZaBooking.djecaGodine = bookData['children'];
						paramZaBooking.jezik = lng;
						arraySlikaSlider = podacioParceli.images;
						helper_vrstaSJ_zaSlike = podacioParceli.vrstaSJ;

						//broj osoba i broj djece
						if (parametriParcele.brojOsoba === null || parametriParcele.brojOsoba == '0' || parametriParcele.brojOsoba == 'null' || parametriParcele.brojOsoba == undefined) {
							podacioParceli.brojOsoba = _TABLICA_VRSTE_[podacioParceli.tipMISH][0].brojOsoba;
						}
						if (parametriParcele.brojDjece === null || parametriParcele.brojDjece == '0' || parametriParcele.brojDjece == 'null' || parametriParcele.brojDjece == undefined) {
							podacioParceli.brojDjece = _TABLICA_VRSTE_[podacioParceli.tipMISH][0].brojDjece;
						}

						flag_SAMO_NA_UPIT = (podacioParceli.samoNaUpit === '1');

						hideLoader();

						console.log(podacioParceli)

						if (podacioParceli.duzina != 0 && podacioParceli.duzina != '' && podacioParceli.duzina != null) {
							$("#dimenzija").text(podacioParceli.duzina + '×' + podacioParceli.sirina + ' (' + podacioParceli.povrsina + 'm² cca)');
						} else {
							$("#dimenzija").text('-');
						}

						if (podacioParceli.duzina2 != 0 && podacioParceli.duzina2 != '' && podacioParceli.duzina2 != null) {
							$("#povrsina").text(podacioParceli.duzina2 + '×' + podacioParceli.sirina3 + ' (' + podacioParceli.velicina + 'm² cca)');
						} else {
							$("#povrsina").text('-');
						}

						$("#osuncanost").text(`${translate("Sunqty")}`);
						if (podacioParceli.osuncanost === 'PAUŠAL') {
							$("#osuncanost").text(`${translate("Flatrate")}`);
						}

						if (podacioParceli.osuncanost != 0 && podacioParceli.osuncanost != '' && podacioParceli.osuncanost != undefined) {
							$("#osuncanostdata").text(translations[podacioParceli.osuncanost][0][lng]);
						} else {
							$("#osuncanostdata").text('-');
						}

						$("#brojosoba").text(`${translate("dozvoljenoosoba")}`);

						if (podacioParceli.brojOsoba != 0 && podacioParceli.brojOsoba != '' && podacioParceli.brojOsoba != undefined) {
							$("#brojosobadata").text(podacioParceli.brojOsoba);
						}

						let napomenaModal;

						switch (lng) {
							case 'hr':
								napomenaModal = podacioParceli.napomena_hr;
								break;
							case 'en':
								napomenaModal = podacioParceli.napomena_en;
								break;
							case 'de':
								napomenaModal = podacioParceli.napomena_de;
								break;
							case 'it':
								napomenaModal = podacioParceli.napomena_it;
								break;
							case 'pl':
								napomenaModal = podacioParceli.napomena_pl;
								break;
							case 'si':
								napomenaModal = podacioParceli.napomena_si;
								break;
							case 'nl':
								napomenaModal = podacioParceli.napomena_nl;
								break;
							case 'ru':
								napomenaModal = podacioParceli.napomena_ru;
								break;
							default:
								napomenaModal = podacioParceli.napomena_hr;
						}

						napomenaModal = (napomenaModal != '' && napomenaModal != null) ? napomenaModal : '-';

						$(".napomena").css("display", "flex");
						$(".povrsina").css("display", "flex");
						$(".osuncanost").css("display", "flex");
						$(".brojosoba").css("display", "flex");
						$("#notesdivParcela").css("display", "flex");

						if (napomenaModal === '-') {
							$("#notesdivParcela").css("display", "none");
						}

						if (podacioParceli.noteHeader === '1') {
							$("#notesdivParcela").text(napomenaModal);
							$(".napomena").css("display", "none");
						} else {
							$("#podatak_napomenap").text(translate('note'));
							$("#podataka_napomena_datap").text(napomenaModal);
							$("#notesdivParcela").css("display", "none");
						}

						if (napomenaModal === '-') {
							$(".napomena").css("display", "none");
						}
						if (podacioParceli.duzina2 == 0 || podacioParceli.duzina2 === '') {
							$(".povrsina").css("display", "none");
						}
						if (podacioParceli.osuncanost == 0 || podacioParceli.osuncanost === '' || podacioParceli.osuncanost == undefined) {
							$(".osuncanost").css("display", "none");
						}
						if (podacioParceli.brojOsoba == 0 || podacioParceli.brojOsoba === '' || podacioParceli.brojOsoba == undefined) {
							$(".brojosoba").css("display", "none");
						}

						panomPhotoUrl = parametriParcele.panom;
						if (parametriParcele.panom === '') {
							panomPhotoUrl = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike).panom
						}

						amenities1 = [];
						//za sada čemo ovako fiksirano, nije hitno, pa budemo rješavali da to bude fleksibilnije
						if (podacioParceli.wifi === '1') {
							amenities1.push("wifi")
						};
						if (podacioParceli.mikrovalna === '1') {
							amenities1.push("microwave")
						};
						if (podacioParceli.odvodnja === '1') {
							amenities1.push("odvodnja")
						};
						if (podacioParceli.struja6a === '1') {
							amenities1.push("struja6a")
						};
						if (podacioParceli.struja10a === '1') {
							amenities1.push("struja10a")
						};
						if (podacioParceli.struja16a === '1') {
							amenities1.push("struja16a")
						};
						if (podacioParceli.parking === '1') {
							amenities1.push("parking")
						};
						if (podacioParceli.voda === '1') {
							amenities1.push("water")
						};
						if (podacioParceli.satelitskaTv === '1') {
							amenities1.push("sattv")
						};
						if (podacioParceli.kabelskaTv === '1') {
							amenities1.push("kabeltv")
						};
						if (podacioParceli.perilicaPosuda === '1') {
							amenities1.push("perilicaposuda")
						};
						if (podacioParceli.perilicaRublja === '1') {
							amenities1.push("perilicarublja")
						};
						if (podacioParceli.klimaUredaj === '1') {
							amenities1.push("klima")
						};
						if (podacioParceli.toster === '1') {
							amenities1.push("toster")
						};
						if (podacioParceli.pegla === '1') {
							amenities1.push("pegla")
						};
						if (podacioParceli.dogsAllowed === '1') {
							amenities1.push("dog")
						};
						if (podacioParceli.dogsNotAllowed === '1') {
							amenities1.push("ban")
						};

						$("body").addClass("modal-parcela")
						$('.brand-badge').remove();
						$('.selected-date').remove();
						$(".modal-price").css("opacity", "0.5");
						$(".modal-price").css("display", "flex");
						if (_POSTAVKE_KAMPA_.bookingModul === "0") {
							$(".modal-price").css("display", "none");
						}
						document.getElementById("bukiraj").disabled = true;

						let thisVrsta

						Object.entries(_TABLICA_VRSTE_).forEach(
							([key, value]) => {
								if (value[0].uid === podacioParceli.vrstaSJ) {
									thisVrsta = value[0]
								}
							}
						);

						let bOsoba = podacioParceli.brojOsoba !== null ? podacioParceli.brojOsoba : thisVrsta.brojOsoba !== null ? thisVrsta.brojOsoba : lang1 === "Pitch" ? _POSTAVKE_KAMPA_.brojOsoba : _POSTAVKE_KAMPA_.brojOsobaMh
						if (bOsoba === null || bOsoba === "null") {
							bOsoba = ""
						}
						let bDjece = podacioParceli.brojDjece !== null ? podacioParceli.brojDjece : thisVrsta.brojDjece !== null ? thisVrsta.brojDjece : lang1 === "Pitch" ? _POSTAVKE_KAMPA_.brojDjece : _POSTAVKE_KAMPA_.brojDjeceMh
						if (bDjece === null || bDjece === "null") {
							bDjece = ""
						}
						//$("#brojparcele").html(`<div class="info-left"><div class="acc-name">${lang1} ${podacioParceli.broj ? podacioParceli.broj : ""}${dev_env ? " (" + mapaId_dev + " "+ podacioParceli.brojMISH + ")" : ""}${label1 != undefined ? label1 : ""}</div>${getAccType(type1)}${getBrandBadge(brand1)}`);
						$(".maxGuest").remove()


						if (bDjece != '' && bDjece != undefined) {
							$('.acc-name').after(`<div class="maxGuest">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-standing" viewBox="0 0 16 16">
							<path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0Z"/>
							</svg>
							<span style="font-size: 25px;">${bOsoba}</span>
							<svg style="margin-left: 10px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-arms-up" viewBox="0 0 16 16">
							<path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
							<path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.492 1.492 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.72.72 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.72.72 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
							</svg>
							<span style="font-size: 25px;">${bDjece}</span>
							</div>`);
						} else {
							$('.acc-name').after(`<div class="maxGuest">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-standing" viewBox="0 0 16 16">
							<path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0Z"/>
							</svg>
							<span style="font-size: 25px;">${bOsoba}</span>
							</div>`);
						}
						console.log(podacioParceli)
						$('.acc-name').after(`${getAccType(type1)}${getBrandBadge(brand1, lang1)}`);
						$('.acc-name').text(`${podacioParceli.broj ? podacioParceli.broj : ""}${dev_env ? " (" + mapaId_dev + " "+ podacioParceli.brojMISH + ")" : ""}${label1 != undefined ? label1 : ""}`);
						let datumZaCijenu;
						if (paramZaBooking.datumOd != '' && paramZaBooking.datumOd != undefined) {
							datumZaCijenu = paramZaBooking.datumOd;
						} else {
							datumZaCijenu = new Date();
						}
						datumZaCijenu = moment(datumZaCijenu).format("DD.MM.YYYY.");
						var minCijena = cijeneBaza[brand1].find(item => item.date == datumZaCijenu)
						//if (minCijena != undefined && _PRICES_PER_STAY_ != undefined) {
						if (_PRICES_PER_STAY_ != undefined) {
							//$('.priceeur').text(minCijena.price)
							$('.priceeur').text(((_PRICES_PER_STAY_[podacioParceli.tipMISH] != undefined) ? _PRICES_PER_STAY_[podacioParceli.tipMISH].price : '-') + '€')
						} else {
							$('.priceeur').text('-€')
						};
						$('.oddana').text(`${translate('totalperstay')}`)
						//$('.nights').text('1 ' + `${translate('Nights')[0]}`)
						$('.nights').text(`${translate('perstay')}`)
						$('.date').text(`${moment(danas).format("DD.MM.YYYY.")} - ${moment(danas).add(1, 'd').format("DD.MM.YYYY.")}`);
						getAmenities(amenities1)
						$('#amenities').css('visibility', 'visible')
						if (amenities1.length === 0) {
							$('#amenities').css('visibility', 'hidden')
						}

						if (podacioParceli.noclick === '1') return false;

						console.log(podacioParceli)

						//test

						//botun za otvoriti panoramu
						$(".show-pitch.panom").remove()
						if (panomPhotoUrl != '' && panomPhotoUrl != null) {
							// if (_PARAMETRI_KAMPA.prikazi360Botun != 'false') {
							//   $("#containerParcela").append(`<div class="show-pitch panom">360&deg;</div>`);
							// }
							if (_POSTAVKE_KAMPA_.panomIframe === "1" && podacioParceli.panom !== "" && podacioParceli.panom !== null) {

							}
						}

						$(document).on('click', '.show-pitch.panom', function() {
							let iframeSrcPanorama = panomPhotoUrl;
							console.log('123')
							var dataVideo = {
								'src': iframeSrcPanorama,
								'height': '640px',
								'width': '1200px'
							};
							$('#modalUpitForma').find("iframe").attr(dataVideo);
							//$("#ModalParcela").modal("hide");
							$("#modalUpitForma").modal("show");

						})

						imgArray = [];

						let radnomLBGallery = getRandomIntLightbox(500);
						console.log('sss', arraySlikaSlider)

						if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
							arraySlikaSlider.forEach((element) => {
								imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
							});
						} else {
							//ako nema definiranu sliku za parcelu uzmi default od tipa parcele
							//ako uopce postoje default slike za parcelu

							let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
							//console.log('slika', pomocVrstaSlike)
							if (pomocVrstaSlike != undefined && pomocVrstaSlike.images.length) {
								pomocVrstaSlike.images.forEach((element) => {
									imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display: none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
								});
							} else {
								//postavi logo u slider
								imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
							}
						}

						console.log(imgArray)

						console.log(_POSTAVKE_KAMPA_.panomIframe)

						if (_POSTAVKE_KAMPA_.panomIframe === "1") {
							if (podacioParceli.panom !== null && podacioParceli.panom !== "null" && podacioParceli.panom !== "") {
								console.log(1)
								$('#containerParcela').html(`<div class="swiper mySwiper">
                <div class="swiper-wrapper">
        
                </div>
                  <div class="swiper-button-next"></div>
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-pagination"></div>
                </div>`)
								$("#containerParcela").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
								/*$("#containerParcela").append(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="handGesture" x="0px" y="0px" width="34px" height="41px" viewBox="0 0 100 120" enable-background="new 0 0 100 120" xml:space="preserve">
								<g>
								  <path fill="#FAFAFA" d="M75.005,66.367c-0.847-0.31-1.874-0.396-2.512-0.418c0.979-3.486-0.889-7.205-4.348-8.466   c-1.528-0.555-3.227-0.546-4.701-0.028c-0.003-1.001-0.224-1.999-0.659-2.933c-0.791-1.694-2.193-2.979-3.949-3.619   c-1.679-0.611-3.635-0.677-5.237-0.231l6.181-16.984c0.698-1.917,0.795-3.781,0.279-5.391c-0.591-1.843-1.919-3.187-3.842-3.886   c-0.775-0.283-1.562-0.426-2.338-0.426c-2.901,0-5.423,1.977-6.584,5.163L32.938,68.871l-3.345-7.65   c-1.337-2.868-4.233-4.721-7.378-4.721c-1.201,0-2.369,0.261-3.471,0.775c-1.986,0.926-3.496,2.568-4.249,4.624   c-0.755,2.061-0.661,4.291,0.232,6.201c0.029,0.072,2.942,7.324,7.391,16.865l0.722,1.559c4.204,9.082,7.836,16.748,19.299,20.92   c3.145,1.145,6.1,1.557,8.781,1.557c0,0,0.001,0,0.002,0c6.644,0,10.802-3.243,14.491-6.738   c5.07-4.799,13.282-27.182,13.629-28.135c0.546-1.496,0.373-3.186-0.474-4.715C77.779,67.983,76.48,66.903,75.005,66.367z    M76.225,73.194c-2.298,6.312-9.088,23.476-12.873,27.06c-3.386,3.206-6.885,6.085-12.43,6.084c-2.332,0-4.941-0.52-7.757-1.544   c-10.29-3.745-13.517-10.716-17.603-19.54l-0.725-1.561c-4.411-9.461-7.296-16.641-7.357-16.787   c-0.587-1.259-0.646-2.671-0.168-3.977c0.479-1.305,1.438-2.348,2.7-2.937c0.703-0.328,1.443-0.494,2.203-0.494   c2.014,0,3.8,1.146,4.645,2.957l4.837,11.063c0.246,0.562,0.785,0.927,1.423,0.898c0.614-0.021,1.153-0.412,1.362-0.99   l15.633-43.257c0.904-2.484,2.938-3.719,5.075-2.941c1.033,0.376,1.71,1.043,2.011,1.983c0.307,0.956,0.222,2.181-0.24,3.449   l-9.576,26.312c-0.284,0.779,0.118,1.639,0.896,1.923c0.773,0.281,1.639-0.118,1.922-0.896l1.368-3.759   c0.941-2.585,3.294-2.864,4.262-2.864c0.672,0,1.355,0.119,1.977,0.346c1.004,0.365,1.805,1.1,2.257,2.068   c0.451,0.968,0.499,2.054,0.134,3.059l-1.881,5.168c-0.283,0.779,0.118,1.639,0.896,1.923c0.774,0.282,1.638-0.118,1.922-0.896   l0.856-2.351c0.572-1.574,2.083-2.633,3.76-2.633c0.465,0,0.925,0.082,1.365,0.242c2.073,0.756,3.146,3.056,2.392,5.128   l-2.223,6.108c-0.283,0.777,0.118,1.639,0.896,1.922c0.774,0.282,1.638-0.117,1.922-0.896l1.306-3.586   c0.172-0.02,0.405-0.035,0.699-0.035c0.719,0,1.469,0.097,1.867,0.242c0.793,0.289,1.528,0.934,1.966,1.725   C76.195,71.363,76.564,72.262,76.225,73.194z"/>
								  <path fill="#FAFAFA" d="M86.68,18.083c-1.512-2.583-3.158-5.137-4.938-7.649c-0.382-0.539-0.806-0.775-1.499-0.702   c-0.694,0.074-0.946,0.58-1.083,1.17c-0.336,1.462-0.672,2.924-1.009,4.386c-18.239-4.197-37.304-3.577-55.299,1.86   c-1.073,0.323-1.828,1.621-1.515,2.571c0.313,0.949,1.646,1.566,2.672,1.258c17.326-5.234,35.683-5.832,53.245-1.791   c-0.262,1.137-0.523,2.274-0.785,3.411c-0.136,0.592-0.143,1.149,0.36,1.507s0.922,0.33,1.453,0.021   c2.477-1.437,5.062-2.781,7.751-4.021C86.82,19.741,87.122,18.841,86.68,18.083z"/>
								</g>
								</svg>`);*/

								var swiper = new Swiper(".mySwiper", {
									slidesPerView: 1,
									spaceBetween: 0,
									loop: false,
									allowSlidePrev: true,
									allowSlideNext: true,
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
										dynamicBullets: true,
									},
									navigation: {
										nextEl: ".swiper-button-next",
										prevEl: ".swiper-button-prev",
									},
								});
								swiper.appendSlide(imgArray);
								console.log('appendao1', imgArray)
								$("#containerParcela").append(`<div class="show-pitch panom">360&deg;</div>`);
								// $(".show-pitch.img").remove()
								$(".close").css("opacity", "1")
							} else {
								console.log(2)
								$('#containerParcela').html(`<div class="swiper mySwiper">
                <div class="swiper-wrapper">
        
                </div>
                  <div class="swiper-button-next"></div>
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-pagination"></div>
                </div>`)
								$("#containerParcela").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);

								var swiper = new Swiper(".mySwiper", {
									slidesPerView: 1,
									spaceBetween: 0,
									loop: false,
									allowSlidePrev: true,
									allowSlideNext: true,
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
										dynamicBullets: true,
									},
									navigation: {
										nextEl: ".swiper-button-next",
										prevEl: ".swiper-button-prev",
									},
								});
								swiper.appendSlide(imgArray);
								console.log('appendao2', imgArray)
								// $(".show-pitch.img").remove()
								$(".close").css("opacity", "1")
							}
						} else {
							if (podacioParceli.panom !== null && podacioParceli.panom !== "null" && podacioParceli.panom !== "") {
								// swiper.destroy()
								$("#containerParcela").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
								$(".show-pitch.img").css("z-index", "2")
								$(".close").css("opacity", "1")
							} else {
								$('#containerParcela').html(`<div class="swiper mySwiper">
                <div class="swiper-wrapper">
        
                </div>
                  <div class="swiper-button-next"></div>
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-pagination"></div>
                </div>`)
								$("#containerParcela").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
								$(".close").css("opacity", "1")

								var swiper = new Swiper(".mySwiper", {
									slidesPerView: 1,
									spaceBetween: 0,
									loop: false,
									allowSlidePrev: true,
									allowSlideNext: true,
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
										dynamicBullets: true,
									},
									navigation: {
										nextEl: ".swiper-button-next",
										prevEl: ".swiper-button-prev",
									},
								});
								swiper.appendSlide(imgArray);
								console.log('appendao3', imgArray)
								// viewera.destroy()
								$(".close").css("opacity", "1")
							}
						}

						$(document).on("click", ".show-pitch.img", function() {
							// $(".mySwiper").remove()
							if (!$(".swiper.invisible").length) {
								$("body").append("<div class='swiper invisible'></div>")
							}
							if (!$(".mySwiper").length) {
								$('.swiper.invisible').html(`
                <div class="swiper-wrapper">
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
              `)

								console.log(imgArray)

								var swiper = new Swiper(".invisible", {
									slidesPerView: 1,
									spaceBetween: 0,
									loop: false,
									allowSlidePrev: true,
									allowSlideNext: true,
									pagination: {
										el: ".swiper-pagination",
										clickable: true,
										dynamicBullets: true,
									},
									navigation: {
										nextEl: ".swiper-button-next",
										prevEl: ".swiper-button-prev",
									},
								});
								swiper.appendSlide(imgArray);
								console.log('appendao4', imgArray)
							}
							$("#lbimg").trigger('click');
						});
						//krajtest

						$('#ModalParcela').modal('show');
						$("#ModalParcela").attr("broj", number1)
						$("#ModalParcela").attr("klasa", klasa11)
						$("#ModalParcela").attr("draw", draw1)
						$("#ModalParcela").attr("naupit", podacioParceli.samoNaUpit)


						let bukirajButton = document.getElementById('bukiraj');
						bukirajButton.innerText = translate('Book now');

						if (podacioParceli.samoNaUpit === '1') {
							bukirajButton.innerText = translate('SendQuery');
						}

						if (klasa.split(" ")[0] != "objekt") {
							var danas = new Date(paramZaBooking.datumOd)
							var sutra = new Date(paramZaBooking.datumOd)
							sutra.setDate(sutra.getDate() + paramZaBooking.brojDana)
							//sutra.add(paramZaBooking.brojDana, 'days');

							//$("#brojparcele").append(`<div class="modal-price"><div class="price"><p>99€</p><small>1 ${translate("Nights")[0]}</small></div><div class="price-info"><div class="date">${moment(danas).format("DD.MM.YYYY.")} - ${moment(sutra).format("DD.MM.YYYY.")}</div><button id="bukiraj" class="book">${translate("Book now")}</button></div></div>`)
							if (slobodne != undefined) {
								if (phobsDatumOd != '') {
									//if ($(".is-start-date") && $(".is-start-date").html() != undefined) {
									if (flag_SAMO_NA_UPIT) {
										$("#brojparcele").append(`<div class='selected-date'>${translate("Send query info")}</div>`)
									} else {
										$("#brojparcele").append(`<div class='selected-date'>${translate("Accomodation availability")} <span class='start-date'></span> - <span class='end-date'></span> <span class='available-date'></span></div>`)
									}
									$('.date').text(`${moment(danas).format("DD.MM.YYYY.")} - ${moment(sutra).format("DD.MM.YYYY.")}`);
									$(".selected-date .start-date").html(moment($(".is-start-date").data("time")).format('DD.MM.YYYY.'))
									$(".selected-date .end-date").html(moment($(".is-end-date").data("time")).format('DD.MM.YYYY.'))
									if (slobodne.includes(gpsParcela)) {
										document.getElementById("bukiraj").disabled = true;
										$(".selected-date").addClass("unavailable")
										$(".selected-date .available-date").html(`${translate("Unavailable")}`)
										$(".modal-price").css("opacity", "0.5")
									} else {
										document.getElementById("bukiraj").disabled = false;
										$(".selected-date").addClass("available")
										$(".modal-price").css("opacity", "1")
										$(".selected-date .available-date").html(`${translate("Available")}`)

										if (podacioParceli.pausal === '1') {
											document.getElementById("bukiraj").disabled = true;
											bukirajButton.innerText = translate('Flatrate');
											$(".modal-price").css("opacity", "0.5")
											$(".selected-date").removeClass("available")
											$(".selected-date").addClass("unavailable")
											//$(".selected-date .available-date").html('')
											//$(".selected-date .available-date").html(`${translate("FlatratePoruka")}`)
										}
									}
								}
							}
						}
					}
					//xx
					// $(".selected-date .start-date").html(moment(1639350000000).format('L'))
					vratiParametreParcele();
				} //OVDJE JE KRAJ !klasa...
				/*phobs_end*/
			}
		}

		/*phobs*/

		/*phobs_end*/

		//MODAL ZA OBJEKTE
		if (e.features[0].properties.class.split(" ")[0] == "objekt") {
			gpsParcela = e.features[0].properties.id;
			destinationLocation = turf.centerOfMass(e.features[0]).geometry.coordinates;
			var obalaLine = rezultat1.features.find(e => e.properties.class == "obala-line")
			if (obalaLine != undefined) {
				obalaLine = obalaLine.geometry.coordinates
				var line = turf.lineString(obalaLine);
				var pt = turf.point(turf.centerOfMass(e.features[0]).geometry.coordinates);
				var seaDistance = turf.nearestPointOnLine(line, pt, {
					units: 'meters'
				});
				seaDistance = seaDistance.properties.dist

				$("#udaljenostmore").text(`${seaDistance.toFixed(0) + " m"}`);
			} else {
				$("#udaljenostmore").text(`${translate("Distance sea not available")}`);
			}

			$(".amenities").html(`<p id="amenities">${translate("Amenities")}</p>`)
			$("#povrsina").text(parseInt((turf.area(e.features[0]))) + " m²");
			if ($("#ModalObjekt").is(".located")) {
				$("#navigateTo").css({
					"opacity": "0.5",
					"pointer-events": "none"
				})
			}

			var temp1 = turf.envelope(e.features[0]);
			var duzina = turf.rhumbDistance(turf.point(temp1.geometry.coordinates[0][0]), turf.point(temp1.geometry.coordinates[0][1]), {
				units: 'meters'
			});
			var sirina = turf.rhumbDistance(turf.point(temp1.geometry.coordinates[0][1]), turf.point(temp1.geometry.coordinates[0][2]), {
				units: 'meters'
			});

			$("#dimenzija").text(duzina.toFixed(0) + '×' + sirina.toFixed(0) + ' m cca');

			function NaslovModal(klasa) {
				return e.features[0].properties.class;
			}

			console.log(e.features)

			var mapaId_dev = e.features[0].properties.id;
			var lang1 = e.features[0].properties[lng];
			var label1 = e.features[0].properties.label;
			var type1 = e.features[0].properties.type;
			var brand1 = e.features[0].properties.brand;
			var amenities1 = e.features[0].properties.amenities;
			var number1 = e.features[0].properties.number;
			var klasa11 = e.features[0].properties['class'];
			var draw1 = e.features[0].properties['Draw'];
			var kojiID = e.features[0].properties.id;
			var klasa = e.features[0].properties.class;
			panomBrand = e.features[0].properties.brand;

			if (klasa.split(" ")[0] == "objekt") {

				/*phobs*/
				let parametriParcele, podacioParceli;
				podacioParceli = '';
				async function ucitajParametreObjekta() {
					showLoader();
					var response = await fetch(_PARAMETRI_KAMPA.paramObjektiURL + kojiID + '&id=' + kampID + '&group=' + grupacijaName); //pazi, tu ce isto trebati dodati kampId kada bude vise od jednog kampa
					if (response.status === 200) {
						parametriParcele = await response.json();
						return parametriParcele
					}
				}

				async function vratiParametreObjekta() {
					podacioParceli = await ucitajParametreObjekta();
					arraySlikaSlider = podacioParceli.images;
					helper_vrstaSJ_zaSlike = podacioParceli.vrstaSJ;

					console.log('objekt', podacioParceli)

					hideLoader();

					const getWorkingHoursRes = await fetch(`https://campsabout.com/cms/api/radnoVrijemeObjekta?dbName=${grupacijaName}&objektId=${podacioParceli.uid}&datumOd=${moment().format('YYYY-MM-DD')}&datumDo=${moment().add(6, 'days').format('YYYY-MM-DD')}`)
					wh = await getWorkingHoursRes.json();
					console.log('ravrije', wh)
					// const modifiedRadnoVrijeme = wh;

					const daysMod = {
						"pon": translate('Monday'),
						"uto": translate('Tuesday'),
						"sri": translate('Wednesday'),
						"cet": translate('Thursday'),
						"pet": translate('Friday'),
						"sub": translate('Saturday'),
						"ned": translate('Sunday')
					};

					modifiedRadnoVrijeme = wh.map(([day, ...times]) => [
						daysMod[day],
						...times
					]);
					console.log(wh)
					console.log(_RadnoVrijeme(wh, lng))

					$("#podatak_prvi").text(translate('RadnoVrijeme'));
					$("#podatak_prvi_data").text(podacioParceli.radno_vrijeme);
					// console.log(wh)
					const definiranoRv = wh.some(r => r[1] !== undefined)
					$("#notesdivObjekt").html("");
					$("#raspored").html("")
					$("#notesdivObjekt").removeClass('showImportant')
					if (definiranoRv) {
						$("#notesdivObjekt").addClass('showImportant')
						$("#notesdivObjekt").html(getWorkingHours(wh));
						// $("#raspored").html()
					}
					$("#kontakt").text(translate('kontakt'));
					$("#kontakt_data").text(podacioParceli.telefon);

					$("#mail").text(translate('email'));
					$("#mail_data").text(podacioParceli.mail);

					let napomenaModal;

					switch (lng) {
						case 'hr':
							napomenaModal = podacioParceli.napomena_hr;
							break;
						case 'en':
							napomenaModal = podacioParceli.napomena_en;
							break;
						case 'de':
							napomenaModal = podacioParceli.napomena_de;
							break;
						case 'it':
							napomenaModal = podacioParceli.napomena_it;
							break;
						case 'pl':
							napomenaModal = podacioParceli.napomena_pl;
							break;
						case 'si':
							napomenaModal = podacioParceli.napomena_si;
							break;
						case 'nl':
							napomenaModal = podacioParceli.napomena_nl;
							break;
						case 'ru':
							napomenaModal = podacioParceli.napomena_ru;
							break;
						default:
							napomenaModal = podacioParceli.napomena_hr;
					}

					napomenaModal = (napomenaModal != '' && napomenaModal != null) ? napomenaModal : '-';

					$(".objektkontakt").css("display", "flex");
					$(".objektmail").css("display", "flex");
					$(".objektnapomena").css("display", "flex");
					$(".objektwww").css("display", "flex");
					$(".objektcjenik").css("display", "flex");
					$("#notesdivObjekt").css("display", "flex");

					if (napomenaModal === '-') {
						$("#notesdivObjekt").css("display", "none");
					}

					if (podacioParceli.noteHeader === '1') {
						$("#notesdivObjekt").text(napomenaModal);
						$(".objektnapomena").css("display", "none");
					} else {
						$("#podatak_napomena").text(translate('note'));
						$("#podataka_napomena_data").text(napomenaModal);
						$("#notesdivObjekt").css("display", "none");
					}

					$("#ocjenik").text(translate('cjenik'));
					$("#owww").text(translate('www'));
					$("#ocjenik_data").text(podacioParceli.cjenikText);
					$("#owww_data").text(podacioParceli.urlText);

					$("#ocjenik_data").attr('href', podacioParceli.cjenikurl);
					$("#owww_data").attr('href', podacioParceli.www);

					if (napomenaModal === '-') {
						$(".objektnapomena").css("display", "none");
					}
					if (podacioParceli.telefon == 0 || podacioParceli.telefon === '') {
						$(".objektkontakt").css("display", "none");
					}
					if (podacioParceli.mail == 0 || podacioParceli.mail === '' || podacioParceli.mail == undefined) {
						$(".objektmail").css("display", "none");
					}
					if (podacioParceli.www == 0 || podacioParceli.www === '' || podacioParceli.www == undefined) {
						$(".objektwww").css("display", "none");
					}
					if (podacioParceli.cjenikurl == 0 || podacioParceli.cjenikurl === '' || podacioParceli.cjenikurl == undefined) {
						$(".objektcjenik").css("display", "none");
					}

					panomPhotoUrlObjekt = podacioParceli.panom;
					panomPhotoUrl = podacioParceli.panom;

					//za sada MIČEM AMMENITIES IZ MODAL AOBJEKATA

					amenities1 = [];
					//za sada čemo ovako fiksirano, nije hitno, pa budemo rješavali da to bude fleksibilnije
					if (podacioParceli.wifi === '1') {
						amenities1.push("wifi")
					};
					if (podacioParceli.parking === '1') {
						amenities1.push("parking")
					};
					if (podacioParceli.microwawe === '1') {
						amenities1.push("microwave")
					};
					if (podacioParceli.shower === '1') {
						amenities1.push("shower")
					};
					if (podacioParceli.sink === '1') {
						amenities1.push("sink")
					};
					if (podacioParceli.laundry === '1') {
						amenities1.push("laundry")
					};
					if (podacioParceli.childrenToilet === '1') {
						amenities1.push("childrenToilet")
					};
					if (podacioParceli.chemicalToilet === '1') {
						amenities1.push("chemicalToilet")
					};
					if (podacioParceli.disabledToilet === '1') {
						amenities1.push("disabledToilet")
					};
					if (podacioParceli.privateToilet === '1') {
						amenities1.push("privateToilet")
					};
					if (podacioParceli.clothingWash === '1') {
						amenities1.push("clothingWash")
					};
					if (podacioParceli.dishWash === '1') {
						amenities1.push("dishWash")
					};
					if (podacioParceli.laundry === '1') {
						amenities1.push("laundry")
					};
					if (podacioParceli.dryer === '1') {
						amenities1.push("dryer")
					};
					if (podacioParceli.dogShower === '1') {
						amenities1.push("dogShower")
					};
					if (podacioParceli.refrigerator === '1') {
						amenities1.push("refrigerator")
					};
					if (podacioParceli.ambulanta === '1') {
						amenities1.push("ambulanta")
					};
					if (podacioParceli.restaurant === '1') {
						amenities1.push("restaurant")
					};
					if (podacioParceli.wellness === '1') {
						amenities1.push("wellness")
					};
					if (podacioParceli.hairdresser === '1') {
						amenities1.push("hairdresser")
					};
					if (podacioParceli.fitness === '1') {
						amenities1.push("fitness")
					};
					if (podacioParceli.kiosk === '1') {
						amenities1.push("kiosk")
					};
					if (podacioParceli.bar === '1') {
						amenities1.push("bar")
					};

					$(".objektamenities").css("display", "block");
					if (amenities1.length == 0) {
						$(".objektamenities").css("display", "none");
					}

					if (podacioParceli.noclick === '1') return false;

					console.log(podacioParceli)

					/*pannellum*/

					$('#containerObjekt').html(`<div class="swiper mySwiper">
          <div class="swiper-wrapper">
    
          </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>`)

					//botun za otvoriti panoramu
					$(".show-pitch.panom").remove()
					$("#containerObjekt").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
					// if (panomPhotoUrlObjekt != '') {
					//   $("#containerObjekt").append(`<div class="show-pitch panom">360&deg;</div>`);
					// }
					if (_POSTAVKE_KAMPA_.panomIframe === "1" && podacioParceli.panom !== "" && podacioParceli.panom !== null) {
						$("#containerParcela").append(`<div class="show-pitch panom">360&deg;</div>`);
					}

					$(".show-pitch.panom").on("click", function() {
						console.log('objektpanom', panomPhotoUrlObjekt)
						let iframeSrcPanorama = panomPhotoUrlObjekt;
						var dataVideo = {
							'src': iframeSrcPanorama,
							'height': '640px',
							'width': '1200px'
						};
						$('#modalUpitForma').find("iframe").attr(dataVideo);
						//$("#ModalObjekt").modal("hide");
						$("#modalUpitForma").modal("show");
					})

					$(".show-pitch.img").on("click", function() {
						$("#lbimgobjekt").trigger('click');
					})


					imgArray = [];
					let radnomLBGallery = getRandomIntLightbox(500);
					console.log('sss', arraySlikaSlider)

					if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
						arraySlikaSlider.forEach((element) => {
							imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
						});
					} else {
						//ako nema definiranu sliku za parcelu uzmi default od tipa parcele
						//ako uopce postoje default slike za parcelu

						let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
						if (pomocVrstaSlike != undefined) {
							pomocVrstaSlike.images.forEach((element) => {
								imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
							});
						} else {
							//postavi logo u slider
							imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
						}

					}
					if (swiper != undefined) {
						//swiper.destroy( true, true )  
					}

					var swiper = new Swiper(".mySwiper", {
						slidesPerView: 1,
						spaceBetween: 0,
						loop: false,
						allowSlidePrev: true,
						allowSlideNext: true,
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
							dynamicBullets: true,
						},
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
					});

					console.log('appendao5', imgArray)
					console.log('swiper', swiper)
					//swiper.appendSlide(imgArray); 
					//!!!!BITNO ovo gore sam maknuo jer je davalo gresku, izgleda da vec postoji swiper objekt iz nekog razloga, MOOOOŽDA možemo maknuti i cijeli swiper kreiranje???

					/*kraj pannellum*/

					lang1 = naslovModalaObjekt(podacioParceli.vrstaObjekta, lng);

					$("body").addClass("modal-parcela")
					$("#brojObjekta").html(`<div class="info-left"><div class="acc-name">${lang1} ${((podacioParceli.naziv) && (podacioParceli.naziv != '-')) ? podacioParceli.naziv : ""}${dev_env ? " (" + mapaId_dev + ")" : ""}</div>
    ${getAccType(type1)}
    ${getBrandBadge(brand1)}
    `);

					getAmenitiesObjekt(amenities1)
					$("#informationsobjekt").text(`${translate("Informations")}`);
					$('#ModalObjekt').modal('show');
					$("#ModalObjekt").attr("broj", number1)
					// console.log(number1)
					$("#ModalObjekt").attr("klasa", klasa11)
					$("#ModalObjekt").attr("draw", draw1)
				}
				//xx
				// $(".selected-date .start-date").html(moment(1639350000000).format('L'))
				vratiParametreObjekta();
			} //OVDJE JE KRAJ !klasa...
			/*phobs_end*/
		}

	});

	function KojiPanom(parcela, klasa, brand) {
		if (klasa.includes('parcela')) {
			if (panomBrand == "Comfort") return 'pa11----.jpg?'
			if (panomBrand == "Comfort Zone") return 'p66----.jpg?'
			if (panomBrand == "Standard") return 'p15----.jpg?'
		}
		if (klasa === 'mh') {
			return 'm64aa----.jpg?'
		}
		if (klasa === 'glamping') {
			return 's' + parcela + '.jpg'
		}
		if (klasa.includes('restoran')) {
			return 'restoran.jpg'
		}
		if (klasa.includes('recepcija')) {
			return 'recepcija1.jpg'
		}
		if (klasa.includes('bazen')) {
			return 'bazen.jpg'
		}
		if (klasa.includes('pekara')) {
			return 'pekara.jpg'
		}
		if (klasa.includes('igraliste')) {
			return 'igraliste.jpg'
		}
		if (klasa.includes('wc')) {
			return 'wc1.jpg?'
		}
		if (klasa.includes('odbojka')) {
			return 'odbojka.jpg'
		}
		if (klasa.includes('teren')) {
			return 'teren.jpg'
		}
		if (klasa.includes('parking')) {
			return 'parking.jpg'
		}
	}

	function PanoramaSlika(slika, path) {

	}

	function hotspot(hotSpotDiv, args) {
		hotSpotDiv.classList.add('custom-tooltip');
		var span = document.createElement('span');
		span.innerHTML = args;
		hotSpotDiv.appendChild(span);
		span.style.width = span.scrollWidth - 20 + 'px';
		span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
		span.style.marginTop = -span.scrollHeight - 12 + 'px';
	}

	$(".modal").on("shown.bs.modal", function(e) {
		if ($(window).width() < 576) {

		}
	})

	$(".modal").on("hide.bs.modal", function() {
		if ($(window).width() < 576) {

		}
	})

	var ctx
	var draw
	var hotSpotsActive = false
	$("#ModalParcela").on('shown.bs.modal', function() {

		//window.location = '#modal';

		var tmpParcela = $(this).attr("broj");
		console.log(tmpParcela)
		var tmpParcelaNaziv = $(this).attr("klasa");
		var panomFolder = "images222/"
		// var panomSource = panomFolder + KojiPanom(tmpParcela, tmpParcelaNaziv);
		var panomSource = '../../' + podacioParceli.panom.replace('/cms/', 'kamp/views/')

		let obalaObj = rezultat1.features.find(f => f.properties.class === "obala")
		//let obalaObj = rezultat1.features.find(e => e.properties.class == "obala-line")
		let parcelaObj = rezultat1.features.find(f => f.properties.brojMISH === podacioParceli.brojMISH)

		let centroidParcela = turf.centroid(turf.polygon(parcelaObj.geometry.coordinates[0]))

		let nearestObala = turf.pointToLineDistance(centroidParcela.geometry.coordinates, obalaObj.geometry.coordinates[0][0], { units: 'meters' });

		nearestObala = Math.round(nearestObala)

		let allWc = _pois_.features.filter(f => f.properties.icon === 'ico-wc')

		let allShop = _pois_.features.filter(f => f.properties.icon === 'ico-market')

		let allRest = _pois_.features.filter(f => f.properties.icon === 'ico-restaurant')

		allWc = allWc.map(wc => turf.point(wc.geometry.coordinates))

		allShop = allShop.map(sh => turf.point(sh.geometry.coordinates))

		allRest = allRest.map(rs => turf.point(rs.geometry.coordinates))
1
		let nearestWc = turf.nearestPoint(centroidParcela.geometry.coordinates, turf.featureCollection(allWc));

		let nearestShop = turf.nearestPoint(centroidParcela.geometry.coordinates, turf.featureCollection(allShop));

		let nearestRest = turf.nearestPoint(centroidParcela.geometry.coordinates, turf.featureCollection(allRest));

		nearestWc = Math.round(nearestWc.properties.distanceToPoint * 1000)

		nearestShop = Math.round(nearestShop.properties.distanceToPoint * 1000)

		nearestRest = Math.round(nearestRest.properties.distanceToPoint * 1000)

		$("#distance-sea").text(`${translate('Sea')} ${nearestObala}m`)
		$("#distance-shop").text(`${translate('ico-market')} ${nearestShop}m`)
		$("#distance-sanitary").text(`${translate('wc')} ${nearestWc}m`)
		$("#distance-restaurant").text(`${translate('ico-restaurant')} ${nearestRest}m`)
		
		draw = $(this).attr("draw")

		if (typeof draw !== "undefined") {
			draw = draw.replaceAll("p", "pitch")
			draw = draw.replaceAll("y", "yaw")
			draw = JSON.parse(draw)
		} else {
			draw = false
		}

		if (podacioParceli.panom !== null && podacioParceli.panom !== "") {
			viewera = pannellum.viewer('containerParcela', {
				"type": "equirectangular",
				"panorama": panomSource,
				"autoLoad": true,
				"yaw": 355,
				"hfov": 120,
				"showControls": false,
				"showFullscreenCtrl": false
			});

			viewera.setPitchBounds([-75, 75]);
			$(".pnlm-load-box").css("display", "flex")
			$(".pnlm-load-box p:first-of-type").html(`${translate("Loading")}...`)
			$(".modal-header button.close").animate({
				opacity: "1"
			}, 500)

			viewera.on("load", function() {
				console.log('load')
				$("#containerParcela").append(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="handGesture" x="0px" y="0px" width="34px" height="41px" viewBox="0 0 100 120" enable-background="new 0 0 100 120" xml:space="preserve">
        <g>
          <path fill="#FAFAFA" d="M75.005,66.367c-0.847-0.31-1.874-0.396-2.512-0.418c0.979-3.486-0.889-7.205-4.348-8.466   c-1.528-0.555-3.227-0.546-4.701-0.028c-0.003-1.001-0.224-1.999-0.659-2.933c-0.791-1.694-2.193-2.979-3.949-3.619   c-1.679-0.611-3.635-0.677-5.237-0.231l6.181-16.984c0.698-1.917,0.795-3.781,0.279-5.391c-0.591-1.843-1.919-3.187-3.842-3.886   c-0.775-0.283-1.562-0.426-2.338-0.426c-2.901,0-5.423,1.977-6.584,5.163L32.938,68.871l-3.345-7.65   c-1.337-2.868-4.233-4.721-7.378-4.721c-1.201,0-2.369,0.261-3.471,0.775c-1.986,0.926-3.496,2.568-4.249,4.624   c-0.755,2.061-0.661,4.291,0.232,6.201c0.029,0.072,2.942,7.324,7.391,16.865l0.722,1.559c4.204,9.082,7.836,16.748,19.299,20.92   c3.145,1.145,6.1,1.557,8.781,1.557c0,0,0.001,0,0.002,0c6.644,0,10.802-3.243,14.491-6.738   c5.07-4.799,13.282-27.182,13.629-28.135c0.546-1.496,0.373-3.186-0.474-4.715C77.779,67.983,76.48,66.903,75.005,66.367z    M76.225,73.194c-2.298,6.312-9.088,23.476-12.873,27.06c-3.386,3.206-6.885,6.085-12.43,6.084c-2.332,0-4.941-0.52-7.757-1.544   c-10.29-3.745-13.517-10.716-17.603-19.54l-0.725-1.561c-4.411-9.461-7.296-16.641-7.357-16.787   c-0.587-1.259-0.646-2.671-0.168-3.977c0.479-1.305,1.438-2.348,2.7-2.937c0.703-0.328,1.443-0.494,2.203-0.494   c2.014,0,3.8,1.146,4.645,2.957l4.837,11.063c0.246,0.562,0.785,0.927,1.423,0.898c0.614-0.021,1.153-0.412,1.362-0.99   l15.633-43.257c0.904-2.484,2.938-3.719,5.075-2.941c1.033,0.376,1.71,1.043,2.011,1.983c0.307,0.956,0.222,2.181-0.24,3.449   l-9.576,26.312c-0.284,0.779,0.118,1.639,0.896,1.923c0.773,0.281,1.639-0.118,1.922-0.896l1.368-3.759   c0.941-2.585,3.294-2.864,4.262-2.864c0.672,0,1.355,0.119,1.977,0.346c1.004,0.365,1.805,1.1,2.257,2.068   c0.451,0.968,0.499,2.054,0.134,3.059l-1.881,5.168c-0.283,0.779,0.118,1.639,0.896,1.923c0.774,0.282,1.638-0.118,1.922-0.896   l0.856-2.351c0.572-1.574,2.083-2.633,3.76-2.633c0.465,0,0.925,0.082,1.365,0.242c2.073,0.756,3.146,3.056,2.392,5.128   l-2.223,6.108c-0.283,0.777,0.118,1.639,0.896,1.922c0.774,0.282,1.638-0.117,1.922-0.896l1.306-3.586   c0.172-0.02,0.405-0.035,0.699-0.035c0.719,0,1.469,0.097,1.867,0.242c0.793,0.289,1.528,0.934,1.966,1.725   C76.195,71.363,76.564,72.262,76.225,73.194z"/>
          <path fill="#FAFAFA" d="M86.68,18.083c-1.512-2.583-3.158-5.137-4.938-7.649c-0.382-0.539-0.806-0.775-1.499-0.702   c-0.694,0.074-0.946,0.58-1.083,1.17c-0.336,1.462-0.672,2.924-1.009,4.386c-18.239-4.197-37.304-3.577-55.299,1.86   c-1.073,0.323-1.828,1.621-1.515,2.571c0.313,0.949,1.646,1.566,2.672,1.258c17.326-5.234,35.683-5.832,53.245-1.791   c-0.262,1.137-0.523,2.274-0.785,3.411c-0.136,0.592-0.143,1.149,0.36,1.507s0.922,0.33,1.453,0.021   c2.477-1.437,5.062-2.781,7.751-4.021C86.82,19.741,87.122,18.841,86.68,18.083z"/>
        </g>
        </svg>`);
				setTimeout(() => {
					$("#handGesture").fadeOut(400, function() {

					})
				}, 3000)
				$(".pnlm-zoom-in").addClass("fas fa-plus")
				$(".pnlm-zoom-out").addClass("fas fa-minus")
				$(".pnlm-fullscreen-toggle-button").addClass("fas fa-expand")
				$(".pnlm-sprite").removeClass("pnlm-sprite")
				$(".pnlm-zoom-controls").show()
				$(".pnlm-zoom-controls").animate({
					opacity: "1"
				}, 500)
				$(".pnlm-fullscreen-toggle-button").show()
				$(".pnlm-fullscreen-toggle-button").animate({
					opacity: "1"
				}, 500)
				$(".pnlm-orientation-button").addClass("far fa-compass")
				$(".pnlm-orientation-button").show()
				$(".pnlm-orientation-button").animate({
					opacity: "1"
				}, 500)
				$(".pnlm-orientation-button").on("click", function() {
					$(this).removeClass("fa-dot-circle")
					if ($(this).is(".pnlm-orientation-button-active")) {
						$(this).addClass("fa-dot-circle")
					}
				})

				if (typeof draw !== "undefined" && draw != false) {
					$(".pnlm-fullscreen-toggle-button").on("click", function() {
						viewera.on("fullscreenchange", function() {

							$("#ctx").attr("width", $(".pannellum-canvas").width())
							$("#ctx").attr("height", $(".pannellum-canvas").height())
							if ($(this).is(":not(.pnlm-fullscreen-toggle-button-active)")) {
								$("#ctx").attr("width", $(".pannellum-canvas").width())
								$("#ctx").attr("height", $(".pannellum-canvas").height())
							}
							viewera.resize()
						})
					})

					$(".pnlm-orientation-button").on("click", function() {
						var hotspotsLoaded = false
						$("#ctx").attr("width", $(".pnlm-render-container").width())
						$("#ctx").attr("height", $(".pnlm-render-container").height())
						if ($(this).is(":not(.pnlm-orientation-button-active)")) {
							$("#ctx").attr("width", $(".pnlm-render-container").width())
							$("#ctx").attr("height", $(".pnlm-render-container").height())
						}
						hotspotsLoaded = true
						var int = setInterval(function() {
							if (hotspotsLoaded == true) {
								viewera.resize()
								clearInterval(int)
							}
						}, 100)
					})

					$("#containerParcela").append(`<div class="show-pitch">${translate("Show pitch")}</div>`)
					$(".show-pitch").on("click", function() {
						var hotspotsLoaded = false
						$(this).toggleClass("hide-pitch")
						if ($(this).is(".hide-pitch")) {
							viewera.setPitch(0);
							viewera.setYaw(355)
							$("#ctx").show()
							$(".show-pitch").html(`${translate("Hide pitch")}`)
							for (var i = 0; i < draw.length; i++) {
								async function addingHotspots() {
									var waitHotspots = viewera.addHotSpot({
										"pitch": draw[i]["pitch"],
										"yaw": draw[i]["yaw"]
									})
									var result = await waitHotspots
									return result
								}
								addingHotspots().then(function(result) {
									if (i == draw.length) {
										hotspotsLoaded = true
									}
								})

							}
						}
						if ($(this).is(":not(.hide-pitch)")) {
							$(this).html(`${translate("Show pitch")}`)
							$("#ctx").hide()
							$(".pnlm-hotspot-base").remove()
						}
						var int = setInterval(function() {
							if (hotspotsLoaded == true) {
								viewera.resize()
								clearInterval(int)
							}
						}, 100)
					})
					$(".pnlm-render-container").append(`<canvas style="height: 100%; width: 100%;" width="${$(".pnlm-render-container").width()}" height="${$(".pnlm-render-container").height()}" id="ctx">`)
					$(window).on("resize", function() {
						$("#ctx").attr("width", $(".pannellum-canvas").width())
						$("#ctx").attr("height", $(".pannellum-canvas").height())
						if ($(this).is(":not(.pnlm-fullscreen-toggle-button-active)")) {
							$("#ctx").attr("width", $(".pannellum-canvas").width())
							$("#ctx").attr("height", $(".pannellum-canvas").height())
						}
						viewera.resize()
					})
				}
			})

			//dodao sam kontrolu da li je isključen panom iframe jer ako ne mislim da appe3nda dva puta!!!
			//if (_POSTAVKE_KAMPA_.panomIframe === '0') {
				viewera.on('error',
					function() {
						console.log('er')
						viewera.destroy();

						$('#containerParcela').html(`<div class="swiper mySwiper">
          <div class="swiper-wrapper">
  
          </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>`)

						$(".show-pitch.panom").remove()

						//botun za otvoriti panoramu
						$("#containerParcela").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
						if (_POSTAVKE_KAMPA_.panomIframe === "1" && panomPhotoUrl !== "" && panomPhotoUrl !== null) {
							$("#containerParcela").append(`<div class="show-pitch panom">360&deg;</div>`);
						}

						$(document).on('click', '.show-pitch.panom', function() {
							let iframeSrcPanorama = panomPhotoUrl;
							console.log('1234')
							var dataVideo = {
								'src': iframeSrcPanorama,
								'height': '640px',
								'width': '1200px'
							};
							$('#modalUpitForma').find("iframe").attr(dataVideo);
							//$("#ModalParcela").modal("hide");
							$("#modalUpitForma").modal("show");

						})

						$(".show-pitch.img").on("click", function() {
							$("#lbimg").trigger('click');
						})

						imgArray = [];
						let radnomLBGallery = getRandomIntLightbox(500);
						console.log('sss', arraySlikaSlider)

						if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
							arraySlikaSlider.forEach((element) => {
								imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
							});
						} else {
							//ako nema definiranu sliku za parcelu uzmi default od tipa parcele
							//ako uopce postoje default slike za parcelu

							let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
							//console.log('slika', pomocVrstaSlike)
							if (pomocVrstaSlike != undefined && pomocVrstaSlike.images.length) {
								pomocVrstaSlike.images.forEach((element) => {
									imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display: none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
								});
							} else {
								//postavi logo u slider
								imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
							}
						}

						var swiper = new Swiper(".mySwiper", {
							slidesPerView: 1,
							spaceBetween: 0,
							loop: false,
							allowSlidePrev: true,
							allowSlideNext: true,
							pagination: {
								el: ".swiper-pagination",
								clickable: true,
								dynamicBullets: true,
							},
							navigation: {
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							},
						});
						swiper.appendSlide(imgArray);
						console.log('appendao6', imgArray)

					}
				);
			//}

		}

		if (!userLocation) {
			if (!noGPS) {
				$("#ModalParcela #feature-info .brojParcele").before($(`<div class="col-sm-12 navigation-denied">${translate("Navigation not available")}</div>`))
			}
			$("#navigateTo").css("opacity", "0.5")
			$("#navigateTo").css("pointer-events", "none")
		}
	});

	$("#ModalObjekt").on('shown.bs.modal', function() {

		//window.location = '#modal';

		var tmpParcela = $(this).attr("broj");
		// console.log(tmpParcela)
		var tmpParcelaNaziv = $(this).attr("klasa");
		var panomFolder = "images2/"; //----> OVO JE PRIVREMNEO RADI TESTIRANJA
		var panomSource = panomFolder + KojiPanom(tmpParcela, tmpParcelaNaziv);

		// console.log(podacioParceli)

		draw = $(this).attr("draw")

		if (typeof draw !== "undefined") {
			draw = draw.replaceAll("p", "pitch")
			draw = draw.replaceAll("y", "yaw")
			draw = JSON.parse(draw)
		} else {
			draw = false
		}

		viewera = pannellum.viewer('containerObjekt', {
			"type": "equirectangular",
			"panorama": panomSource,
			"autoLoad": true,
			"yaw": 355,
			"hfov": 120,
			"showControls": false,
			"showFullscreenCtrl": false
		});

		viewera.setPitchBounds([-75, 75]);
		$(".pnlm-load-box").css("display", "flex")
		$(".pnlm-load-box p:first-of-type").html(`${translate("Loading")}...`)
		$(".modal-header button.close").animate({
			opacity: "1"
		}, 500)

		viewera.on("load", function() {
			console.log(1)
			$(".pnlm-zoom-in").addClass("fas fa-plus")
			$(".pnlm-zoom-out").addClass("fas fa-minus")
			$(".pnlm-fullscreen-toggle-button").addClass("fas fa-expand")
			$(".pnlm-sprite").removeClass("pnlm-sprite")
			$(".pnlm-zoom-controls").show()
			$(".pnlm-zoom-controls").animate({
				opacity: "1"
			}, 500)
			$(".pnlm-fullscreen-toggle-button").show()
			$(".pnlm-fullscreen-toggle-button").animate({
				opacity: "1"
			}, 500)
			$(".pnlm-orientation-button").addClass("far fa-compass")
			$(".pnlm-orientation-button").show()
			$(".pnlm-orientation-button").animate({
				opacity: "1"
			}, 500)
			$(".pnlm-orientation-button").on("click", function() {
				$(this).removeClass("fa-dot-circle")
				if ($(this).is(".pnlm-orientation-button-active")) {
					$(this).addClass("fa-dot-circle")
				}
			})

			if (typeof draw !== "undefined" && draw != false) {
				$(".pnlm-fullscreen-toggle-button").on("click", function() {
					viewera.on("fullscreenchange", function() {

						$("#ctx").attr("width", $(".pannellum-canvas").width())
						$("#ctx").attr("height", $(".pannellum-canvas").height())
						if ($(this).is(":not(.pnlm-fullscreen-toggle-button-active)")) {
							$("#ctx").attr("width", $(".pannellum-canvas").width())
							$("#ctx").attr("height", $(".pannellum-canvas").height())
						}
						viewera.resize()
					})
				})

				$(".pnlm-orientation-button").on("click", function() {
					var hotspotsLoaded = false
					$("#ctx").attr("width", $(".pnlm-render-container").width())
					$("#ctx").attr("height", $(".pnlm-render-container").height())
					if ($(this).is(":not(.pnlm-orientation-button-active)")) {
						$("#ctx").attr("width", $(".pnlm-render-container").width())
						$("#ctx").attr("height", $(".pnlm-render-container").height())
					}
					hotspotsLoaded = true
					var int = setInterval(function() {
						if (hotspotsLoaded == true) {
							viewera.resize()
							clearInterval(int)
						}
					}, 100)
				})

				$("#containerObjekt").append(`<div class="show-pitch">${translate("Show pitch")}</div>`)
				$(".show-pitch").on("click", function() {
					var hotspotsLoaded = false
					$(this).toggleClass("hide-pitch")
					if ($(this).is(".hide-pitch")) {
						viewera.setPitch(0);
						viewera.setYaw(355)
						$("#ctx").show()
						$(".show-pitch").html(`${translate("Hide pitch")}`)
						for (var i = 0; i < draw.length; i++) {
							async function addingHotspots() {
								var waitHotspots = viewera.addHotSpot({
									"pitch": draw[i]["pitch"],
									"yaw": draw[i]["yaw"]
								})
								var result = await waitHotspots
								return result
							}
							addingHotspots().then(function(result) {
								if (i == draw.length) {
									hotspotsLoaded = true
								}
							})

						}
					}
					if ($(this).is(":not(.hide-pitch)")) {
						$(this).html(`${translate("Show pitch")}`)
						$("#ctx").hide()
						$(".pnlm-hotspot-base").remove()
					}
					var int = setInterval(function() {
						if (hotspotsLoaded == true) {
							viewera.resize()
							clearInterval(int)
						}
					}, 100)
				})
				$(".pnlm-render-container").append(`<canvas style="height: 100%; width: 100%;" width="${$(".pnlm-render-container").width()}" height="${$(".pnlm-render-container").height()}" id="ctx">`)
				$(window).on("resize", function() {
					$("#ctx").attr("width", $(".pannellum-canvas").width())
					$("#ctx").attr("height", $(".pannellum-canvas").height())
					if ($(this).is(":not(.pnlm-fullscreen-toggle-button-active)")) {
						$("#ctx").attr("width", $(".pannellum-canvas").width())
						$("#ctx").attr("height", $(".pannellum-canvas").height())
					}
					viewera.resize()
				})
			}
		})

		if (!userLocation) {
			if (!noGPS) {
				$("#ModalObjekt #feature-info .modal-button").after($(`<div class="col-sm-12 navigation-denied">${translate("Navigation not available")}</div>`))
			}
			$("#navigateTo").css("opacity", "0.5")
			$("#navigateTo").css("pointer-events", "none")
		}

		//if (_POSTAVKE_KAMPA_.panomIframe === '0') {

			viewera.on('error',
				function() {
					viewera.destroy();

					$('#containerObjekt').html(`<div class="swiper mySwiperObjekt">
      <div class="swiper-wrapper">

      </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>`)
					$(".show-pitch.panom").remove()
					//botun za otvoriti panoramu
					console.log(panomPhotoUrlObjekt)
					$("#containerObjekt").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
					if (panomPhotoUrlObjekt != '' && _POSTAVKE_KAMPA_.panomIframe === '1' && panomPhotoUrlObjekt != null && panomPhotoUrlObjekt != 'null') {
						$("#containerObjekt").append(`<div class="show-pitch panom">360&deg;</div>`);
					}

					$(".show-pitch.panom").on("click", function() {
						console.log('objekt2', panomPhotoUrlObjekt)
						let iframeSrcPanorama = panomPhotoUrlObjekt;
						var dataVideo = {
							'src': iframeSrcPanorama,
							'height': '640px',
							'width': '1200px'
						};
						$('#modalUpitForma').find("iframe").attr(dataVideo);
						//$("#ModalObjekt").modal("hide");
						$("#modalUpitForma").modal("show");
					})

					$(".show-pitch.img").on("click", function() {
						$("#lbimgobjekt").trigger('click');
					})


					imgArray = [];
					let radnomLBGallery = getRandomIntLightbox(500);
					console.log('sss', arraySlikaSlider)

					if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
						arraySlikaSlider.forEach((element) => {
							imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
						});
					} else {
						//ako nema definiranu sliku za parcelu uzmi default od tipa parcele
						//ako uopce postoje default slike za parcelu

						let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
						if (pomocVrstaSlike != undefined) {
							pomocVrstaSlike.images.forEach((element) => {
								imgArray.push('<div class="swiper-slide"><img src="' + '../../' + element.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + element.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
							});
						} else {
							//postavi logo u slider
							imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip' + radnomLBGallery + '" /></div>');
						}

					}

					var swiper = new Swiper(".mySwiperObjekt", {
						slidesPerView: 1,
						spaceBetween: 0,
						loop: false,
						allowSlidePrev: true,
						allowSlideNext: true,
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
							dynamicBullets: true,
						},
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
					});
					swiper.appendSlide(imgArray);
					console.log('appendao7', imgArray)
				}
			);
		//}
	});

	$('#ModalParcela').on('hide.bs.modal', function() {
		$("body").removeClass("modal-parcela")
		$(this).removeAttr("draw")
		$(".amenities").html("")
		$(".modal-header button.close").animate({
			opacity: "0"
		}, 500)
		$(".navigation-denied").remove()
		$("#navigateTo").css("opacity", "1")
		$("#navigateTo").removeAttr("style")

		//$(".modal-price").remove()

		if (viewera != undefined) {
			viewera.destroy();
		}
		if ($(window).width() < 576) {}
	});

	$('#ModalObjekt').on('hide.bs.modal', function() {
		$("body").removeClass("modal-objekt")
		$(this).removeAttr("draw")
		$(".amenities").html("")
		$(".modal-header button.close").animate({
			opacity: "0"
		}, 500)
		$(".navigation-denied").remove()
		$("#navigateTo").css("opacity", "1")
		$("#navigateTo").removeAttr("style")

		//$(".modal-price").remove()

		if (viewera != undefined) {
			viewera.destroy();
		}
		if ($(window).width() < 576) {}
	});

	var randomUrl = Math.random().toString(36).slice(2)

	var geolocate = new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
		},
		fitBoundsOptions: {
			maxZoom: 18
		},
		trackUserLocation: true,
		showUserHeading: true
	});

	map.addControl(geolocate);

	var directions = new MapboxDirections({
		accessToken: accessToken,
		unit: 'metric',
		profile: 'mapbox/driving',
		container: 'directions',
		steps: true,
		modifier: true,
		voice_instructions: true,
		interactive: false,
		controls: {
			inputs: false,
			instructions: false,
			profileSwitcher: false
		}
	});

	var long
	var lat
	$('#return').on('click', function() {

		odradjeno = false
		isMuted = ""
		isAppleMuted = "muted"
		trackActive = true

		$(".banner").remove()
		$(".time-distance").remove()
		$(".annotation.route").remove()
		if (map.getLayer("route") != undefined &&
			map.getLayer("route2") != undefined &&
			map.getLayer("route-casing") != undefined &&
			map.getLayer("route2-casing") != undefined) {

			map.removeLayer("route")
			map.removeLayer("route2")
			map.removeLayer("route-casing")
			map.removeLayer("route2-casing")
		}

		if (map.getSource("route") != undefined &&
			map.getSource("route2") != undefined) {

			map.removeSource("route")
			map.removeSource("route2")
		}

		linestring = undefined

		isVratiPrikaz = false;
		map.removeControl(geolocate);
		directions.removeRoutes();

		setTimeout(_ => {
			if (map.getStyle().sources.directions.data.features.length > 0) {
				var getDirections = setInterval(function() {
					if (map.getStyle().sources.directions.data.features.length > 0) {
						directions.removeRoutes()
					}
					if (map.getStyle().sources.directions.data.features.length == 0) {
						clearInterval(getDirections)
					}
				}, 200)
			}
		}, 500)

		if ($("#nav-3d").is(".active")) {
			$("#nav-3d").toggleClass("active")
		}

		isSetOrigin = false;

		$(this).css('display', 'none');
		$(".mobile-menu").hide()
		$(".mobile-menu-shade").hide()
		$("#audio").remove()
		$("#voice").remove()

		if ($("#date").is(".active")) {
			if ($(".filter-item.brand").is(".active")) {
				var isBrandActive = $(".filter-item.brand.active").text()
				coloringFilterDate(isBrandActive)
				hideInterestPoints()
			} else if ($(".filter-item:not(.brand)").is(".active")) {
				var isBrandActive = $(".filter-item.active").data("class-object")
				var isIconActive = $(".filter-item.active").data("class")
				isBrandActive != undefined ? coloringClassesDate(isBrandActive) : coloringClassesDate("x")
				isIconActive != undefined ? showInterestPointFilterClass(isIconActive) : showInterestPointFilterClassObject(isBrandActive)
			} else {
				$("#layers").removeClass("active")
				$(".filter-item").removeAttr("style")
				resetColoringFilterDate()
			}

		}
		if ($("#date").is(":not(.active)")) {
			if ($(".filter-item.brand").is(".active")) {
				var isBrandActive = $(".filter-item.brand.active").text()
				coloringFilter(isBrandActive)
				hideInterestPoints()
			} else if ($(".filter-item:not(.brand)").is(".active")) {
				var isBrandActive = $(".filter-item.active").data("class-object")
				var isIconActive = $(".filter-item.active").data("class")
				isBrandActive != undefined ? coloringClasses(isBrandActive) : coloringClasses("x")
				isIconActive != undefined ? showInterestPointFilterClass(isIconActive) : showInterestPointFilterClassObject(isBrandActive)
			} else {
				$("#layers").removeClass("active")
				$(".filter-item").removeAttr("style")
				showInterestPointsAll()
				resetingColors();
			}
		}

		$("#home").hide()
		$("#map").css("pointer-events", "none")

		map.fitBounds(bbox, {
			padding: {
				top: ($(window).height() * 0.2),
				bottom: ($(window).height() * 0.2),
				left: 10,
				right: 10
			}
		})

		map.once("moveend", function() {

			map.addControl(geolocate);
			gpsActive = false;
			if (gpsActive == false) {
				setTimeout(function() {
					$("body").removeClass("gps-active")
					$("#home").show();
					$("#openTrazi").show();
					$("#layers").show();
					$("#lang").show();
					$("#date").show();
					$("#navigateTo").show()
					$(".mobile-menu").show()
					$(".mobile-menu-shade").show()
					$("#map").css("pointer-events", "auto")
				}, 1000)
				map.easeTo({
					center: map.getCenter(bbox),
					pitch: 0,
					duration: 1000
				})
			}
		})
	});

	var pitch = false

	$("#nav-3d").on("click", function() {
		pitch = true
		isVratiPrikaz = true
		$(this).css("pointer-events", "none")
		if ($("#nav-3d").is(".active")) {
			$("#nav-3d").toggleClass("active")
			map.easeTo({
				center: map.getCenter(),
				pitch: 0,
				duration: 1000
			});
		} else {
			$("#nav-3d").toggleClass("active")
			map.easeTo({
				center: map.getCenter(),
				pitch: 70,
				duration: 1000
			});
		}
		setTimeout(function() {
			$("#nav-3d").css("pointer-events", "auto")
			if ($(".mapboxgl-ctrl-geolocate-background").is(":hidden")) {
				isVratiPrikaz = false;
			}
			if ($(".mapboxgl-ctrl-geolocate-background").is(":visible")) {
				isVratiPrikaz = true;
			}
		}, 1000)
	})

	$("#nav-3d").mouseup(function() {
		setTimeout(function() {
			pitch = false
		}, 1000)

	});

	var tockeIteracija;
	tockeIteracija = 0;
	var gpsLok, d, d1, d2, prvaTocka, slijedecaTocka;
	var pero
	var sound
	var odradjeno = false

	$(document).on("click", "#audio", function() {
		$(this).toggleClass("active")
		if ($(this).is(".active")) {
			$(this).html(`<i class="fas fa-volume">`)
			if (document.getElementById('voice') != null) {
				document.getElementById('voice').muted = false
			}
			isMuted = ""
			isAppleMuted = ""
		}
		if ($(this).is(":not(.active)")) {
			// $(this).addClass("active")
			$(this).html(`<i class="fas fa-volume-slash">`)
			if (document.getElementById('voice') != null) {
				document.getElementById('voice').muted = true
			}
			isMuted = "muted"
			isAppleMuted = "muted"
		}
	})

	if (pitch !== true) {

		geolocate.on('geolocate', function(e) {

			if (trackActive == false) {

				map.once("idle", function(e) {
					if (prviprikaz == true) {
						$("#map").css("pointer-events", "auto")
						$("#home, #nav-3d, #return, #car, #walk, #audio").removeAttr("style")
						prviprikaz = false
						setTimeout(function() {
							odradjeno = true
						}, 2000)
						isVratiPrikaz = false
						$(".banner").remove();
						$("#voice").remove()
						$("body").append(`<div class="banner">${poly.route[0].legs[0].steps[0].instructions}</div>`);
						$("body").append(`<audio id="voice" ${isAppleDetected ? isAppleMuted : isMuted} autoplay>
            <source src="https://www.camp2guest.com/asdf${lng == "en" ? "" : "_" + lng}/api${lng == "en" ? "" : "_" + lng}/s?text=${poly.route[0].legs[0].steps[0].instructions}.${lng == "hr" ? "&speaker_id=hr" : ""}" type="audio/wav">
            </audio>`)
					}
				})

				map.setPaintProperty('directions-route-line', 'line-color', '#d3d3d3')
				map.setPaintProperty('directions-route-line-casing', 'line-color', '#a9a9a9')


				if (linestring != undefined && odradjeno == true) {

					var line = turf.lineString([...linestring]);

					var pt = turf.point([geolocate._lastKnownPosition.coords.longitude, geolocate._lastKnownPosition.coords.latitude]);

					var snapped = turf.nearestPointOnLine(line, pt, {
						units: 'meters'
					});

					gpsLok = [snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]];
					var isPointOnLine = turf.booleanPointOnLine(gpsLok, line);

					var segment = poly.route[0].legs[0].steps[tockeIteracija].geometry.coordinates;
					var segmentCisti = poly.route[0].legs[0].steps[tockeIteracija].geometry;
					var segmentInstru = poly.route[0].legs[0].steps[tockeIteracija].instructions;
					segment = turf.lineString([...segment]);
					var segmentDuzina = turf.length(segment, {
						units: "meters"
					});

					var snappedNovo = turf.nearestPointOnLine(segmentCisti, gpsLok, {
						units: 'meters'
					});
					snappedNovo = [snappedNovo.geometry.coordinates[0], snappedNovo.geometry.coordinates[1]];
					var vozimo = turf.booleanPointOnLine(snappedNovo, segmentCisti);

					var segmentSlijedeci = poly.route[0].legs[0].steps[tockeIteracija + 1].geometry.coordinates;
					if (segmentSlijedeci.length > 1) {
						segmentSlijedeci = turf.lineString([...segmentSlijedeci]);
						if (turf.booleanPointOnLine(snappedNovo, segmentSlijedeci)) {
							tockeIteracija++;
						}
					}

					if (snapped.properties.dist < 10) {
						geolocate._userLocationDotMarker.setLngLat([snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]])
						geolocate._accuracyCircleMarker.setLngLat([snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]])
					}

					var start = turf.point([geolocate._lastKnownPosition.coords.longitude, geolocate._lastKnownPosition.coords.latitude]);
					var stop = map.getStyle().sources.directions.data.features[1].geometry['coordinates']

					var sliced = turf.lineSlice(start, stop, line);
					line = sliced;

					var length = turf.length(line, {
						units: 'meters'
					});

					$(".time-distance .distance").html(`${formatTimeDistance.metric(length)} |`)
					$(".time-distance .time").html(`${formatTimeDistance.duration(length / speed * 3.6)}`)
					if (map.getLayer("route2") != undefined) {
						map.getSource("route2").setData(line)
					}

					var qwer = {
						units: 'meters'
					};

					gpsLok = [snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]];
					d, d1, d2;
					prvaTocka = tockeLegs[tockeIteracija].maneuver.location;
					slijedecaTocka = tockeLegs[tockeIteracija + 1].maneuver.location;

					d = Math.trunc(turf.distance(prvaTocka, slijedecaTocka, qwer));
					d1 = Math.trunc(turf.distance(gpsLok, prvaTocka, qwer));
					d2 = Math.trunc(turf.distance(gpsLok, slijedecaTocka, qwer));


					gpsLok = [snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]];
					d, d1, d2;
					prvaTocka = tockeLegs[tockeIteracija].maneuver.location;
					slijedecaTocka = tockeLegs[tockeIteracija + 1].maneuver.location;

					if (d1 > d) {
						$(".banner").remove();

						prvaTocka = tockeLegs[tockeIteracija].maneuver.location;
						slijedecaTocka = tockeLegs[tockeIteracija + 1].maneuver.location;

						d = Math.trunc(turf.distance(prvaTocka, slijedecaTocka, qwer));
						d1 = Math.trunc(turf.distance(gpsLok, prvaTocka, qwer));
						d2 = Math.trunc(turf.distance(gpsLok, slijedecaTocka, qwer));

					}

					if (d2 > d && d1 < d) {}

					if (d2 < d && d1 < d) {

						$(".banner").remove();
						var modifier = tockeLegs[tockeIteracija + 1].maneuver.modifier
						var type = tockeLegs[tockeIteracija + 1].maneuver.type


						if (tockeLegs[tockeIteracija + 1].voice_done != 1) {
							$("#voice").remove()
							$("body").append(`<audio id="voice" ${isAppleDetected ? isAppleMuted : isMuted} autoplay>
            <source src="https://www.camp2guest.com/asdf${lng == "en" ? "" : "_" + lng}/api${lng == "en" ? "" : "_" + lng}/s?text=${tockeLegs[tockeIteracija + 1].instructions}.${lng == "hr" ? "&speaker_id=hr" : ""}" type="audio/wav">
            </audio>`)

							tockeLegs[tockeIteracija + 1].voice_done = 1
						}

						$("body").append(
							`<div class="banner">
              <div class="banner-top">
                <img src="assets/img/arrows/${modifier == undefined && type == "arrive" ? type : modifier}.svg"/>
                <div>${tockeLegs[tockeIteracija + 1].instructions}</div>
              </div>
              <div class="banner-bottom">${formatGPSDistance["metric"](Math.floor(d2))}</div>
            </div>`
						);

						if (type == "arrive" && d2 < 10) {
							$(".annotation.gps-done").remove()
							$("body").addClass("message")
							$("body").append(`<div class="annotation gps-done"><h3>${translate("Travel done")}</h3>
            <p>${translate("Destination reached")} ${formatGPSDistance["metric"](Math.floor(d2))}.</p>
            <div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`)
							$(".annotation.gps-done .confirm").on("click", function() {
								$("body").removeClass("message")
								$(".annotation.gps-done").remove()
								$("#return").trigger("click")
							})
						}
					}
				}

				$("#navigateTo").hide()
				$('#return').css('display', 'block');
				map.on("touchstart", () => {
					isVratiPrikaz = true;
				})
				map.on('touchend', () => {
					isVratiPrikaz = true;

					if (gpsActive == true) {
						$(".time-distance").hide()
						$(".mapboxgl-ctrl-top-right .mapboxgl-ctrl").show();
						$(".mapboxgl-ctrl-geolocate").html(`${translate("Return view")}<img src='assets/img/gps-arrow.svg'>`);
					}
				});

				$('.mapboxgl-ctrl-geolocate-background').on('click', function() {
					$(".time-distance").removeAttr("style")
					map.flyTo({
						center: [snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]],
						zoom: 18,
						bearing: 0,
						curve: 1.42,
						speed: 1.2,
						duration: map._easeOptions.duration,
						easing(t) {
							return t;
						},
						function() {
							map.on("moveend", function() {})
						}
					})

					$(".mapboxgl-ctrl-top-right .mapboxgl-ctrl").hide()
					$("#nav-3d").css("pointer-events", "none")
					setTimeout(function() {
						isVratiPrikaz = false;
						$("#nav-3d").css("pointer-events", "auto")
					}, map._easeOptions.duration)

				});

				const layers2 = map.getStyle();
				var centrira
				if ((e.coords.speed > 0) && (isVratiPrikaz == false)) {

					if (snapped != undefined) {
						centrira = true
						if (e.coords.speed > 4) {
							map.easeTo({
								center: [snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]],
								zoom: 18,
								bearing: e.coords.heading,
								duration: 150,
								easing(t) {
									return t;
								}
							})
						}
						if (e.coords.speed < 4) {
							map.easeTo({
								center: [snapped.geometry.coordinates[0], snapped.geometry.coordinates[1]],
								zoom: 18,
								bearing: e.coords.heading,
								duration: 1000,
								easing(t) {
									return t;
								}
							})
						}

					} else {}

					map.on('rotate', (e) => {

						function getRotationDegrees(obj) {
							var matrix = obj.css("-webkit-transform") ||
								obj.css("-moz-transform") ||
								obj.css("-ms-transform") ||
								obj.css("-o-transform") ||
								obj.css("transform");
							if (matrix !== 'none' && matrix != undefined) {
								var values = matrix.split('(')[1].split(')')[0].split(',');
								var a = values[0];
								var b = values[1];
								var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
							} else {
								var angle = 0;
							}
							return angle;
						}
						angle1 = getRotationDegrees($('.mapboxgl-user-location'));

						var asdf;
						asdf = $(".mapboxgl-user-location-heading");

						asdf.css("transform", "rotate(" + (360 - angle1) + "deg)")

					});

				}

				if (!isSetOrigin) {
					directions.setDestination(destinationLocation);
					directions.setOrigin([e.coords.longitude, e.coords.latitude]); // On load, set the origin to "Toronto, Ontario".

					if ($("#date").is(".active")) {
						coloringGPSDate(gpsParcela)
					}
					if ($("#date").is(":not(.active)")) {
						coloringGPS(gpsParcela);
					}

					isSetOrigin = true;
				}

				long = e.coords.longitude
				lat = e.coords.latitude

				return long, lat
			}
		})
	}

	var nesto;
	var linestring;
	var poly
	var speed
	directions.on('route', function(e) {

		poly = e

		if (poly.route.length > 0) {
			speed = (poly.route[0].distance / poly.route[0].duration) * 3.6
			//$("body").append(`<div class="time-distance"><div class="distance">${formatTimeDistance.metric((poly.route[0].distance))} |</div><div class="time">${formatTimeDistance.duration(poly.route[0].duration)}</div></div>`)
			if ($(".mapboxgl-ctrl-geolocate-background").is(":visible")) {
				$(".time-distance").hide()
			}
			$(".annotation.route").remove()

			poly.route[0].geometry = polylineCustom.toGeoJSONCustom(poly.route[0].geometry, 5)
			poly.route[0].legs[0].steps.forEach(function(step) {
				step.geometry = polylineCustom.toGeoJSONCustom(step.geometry, 5);
				Object.assign(step, {
					instructions: module("v5").compile(`${lng}`, step)
				})
				Object.assign(step, {
					voice_done: 0
				})
			})

			tockeIteracija = 0;
			map.setPaintProperty('directions-route-line', 'line-color', '#1da1f2')
			map.setPaintProperty('directions-route-line-casing', 'line-color', '#2d5f99')

			linestring = map.getStyle().sources.directions.data.features[2].geometry.coordinates;
			tockeLegs = poly.route[0].legs[0].steps;
			duzinaLegs = tockeLegs.length;

			if (map.getSource("route2") != undefined && map.getSource("route") != undefined && map.getLayer("route") != undefined && map.getLayer("route-casing") != undefined && map.getLayer("route2") != undefined && map.getLayer("route2-casing") != undefined) {

				map.removeLayer("route2-casing")
				map.removeLayer("route2")
				map.removeSource("route2")
				map.removeLayer("route-casing")
				map.removeLayer("route")
				map.removeSource("route")

				//console.log('tu sam 2')
			}

			map.addSource('route2', {
				'type': 'geojson',
				'data': {
					"type": "FeatureCollection",
					"features": [{
						"type": "Feature",
						"properties": {},
						"geometry": {
							"type": "LineString",
							"coordinates": linestring
						}
					}]
				}
			});
			map.addLayer({
				'id': 'route2-casing',
				'type': 'line',
				'source': 'route2',
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': '#2d5f99',
					'line-width': 12
				}
			});
			map.addLayer({
				'id': 'route2',
				'type': 'line',
				'source': 'route2',
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': '#1da1f2',
					'line-width': 8
				}
			});

			map.addSource('route', {
				'type': 'geojson',
				'data': {
					"type": "FeatureCollection",
					"features": [{
						"type": "Feature",
						"properties": {},
						"geometry": {
							"type": "LineString",
							"coordinates": linestring
						}
					}]
				}
			});

			map.addLayer({
				'id': 'route-casing',
				'type': 'line',
				'source': 'route',
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': '#cccccc',
					'line-width': 12
				}
			});
			map.addLayer({
				'id': 'route',
				'type': 'line',
				'source': 'route',
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': '#eaeaea',
					'line-width': 8
				}
			});
			map.moveLayer('route-casing', 'directions-origin-point');
			map.moveLayer('route2-casing', 'directions-origin-point');
			map.moveLayer('route', 'directions-origin-point');
			map.moveLayer('route2', 'directions-origin-point');

			map.moveLayer('route-casing', 'poi-numbers');
			map.moveLayer('route2-casing', 'poi-numbers');
			map.moveLayer('route', 'poi-numbers');
			map.moveLayer('route2', 'poi-numbers');

		}

		if (poly.route.length == 0) {
			$(".annotation.route").remove()
			$("body").addClass("message")
			$("body").append(`<div class="annotation"><h3>${translate("Imporant message")}</h3>
  <p>${translate("Routing not available")}
  ${$(".profile-switch.active").attr("id") == "car" ? translate("Switch walking") : translate("Switch driving")}</p>
  <div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`)
			$(".confirm").on("click", function() {
				$("body").removeClass("message")
				$(".annotation").remove()
			})
		}
	});

	map.addControl(directions);
	//map.once('idle', () => {
	//});

	var data;
	var matches;

	function locirajParcelu(label) {
		$(".menu-item").removeClass("selected")
		$(".menu-item").removeClass("not-selected")
		$("#ModalParcela").addClass("located")
		$("#ModalObjekt").addClass("located")
		$(".form-group").removeClass("write")
		$("#layers").removeClass("active")
		$("#openTrazi").css({
			"opacity": "0.5",
			"pointer-events": "none"
		})
		$("#layers").css({
			"opacity": "0.5",
			"pointer-events": "none"
		})
		$("#date").css({
			"opacity": "0.5",
			"pointer-events": "none"
		})
		$("#lang").css({
			"opacity": "0.5",
			"pointer-events": "none"
		})
		var parcelaTrazim = rezultat1.features.find(el => el.properties.id == label.toString());
		var parcelaBbox = turf.envelope(parcelaTrazim).bbox


		$(".filter-item").removeClass("active")
		hideInterestPoints()
		if ($("#date").is(".active")) {
			coloringGPSDate(label)
		}
		if ($("#date").is(":not(.active)")) {
			coloringGPS(label);
		}

		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var verticalPadding = windowHeight * 0.4
		var horizontalPadding = windowWidth * 0.3

		setTimeout(function() {
			map.fitBounds(parcelaBbox, {
				padding: {
					top: verticalPadding,
					bottom: verticalPadding,
					left: horizontalPadding,
					right: horizontalPadding
				}
			})
			setTimeout(() => {
				$("#layers").css("pointer-events", "auto")
				$("#layers").animate({
					opacity: "1"
				}, 500)
				$("#date").css("pointer-events", "auto")
				$("#date").animate({
					opacity: "1"
				}, 500)
				$("#openTrazi").css("pointer-events", "auto")
				$("#openTrazi").animate({
					opacity: "1"
				}, 500)
				$("#lang").css("pointer-events", "auto")
				$("#lang").animate({
					opacity: "1"
				}, 500)
				$(".filter-item").removeAttr("style")

				if ($("#date").is(".active")) {
					resetColoringFilterDate()

				}
				if ($("#date").is(":not(.active)")) {
					resetingColors();
				}
				showInterestPointsAll()
				if (userLocation) {
					$("#ModalParcela").removeClass("located")
					$("#ModalObjekt").removeClass("located")
					$("#navigateTo").css("pointer-events", "auto")
					$("#navigateTo").animate({
						opacity: "1"
					}, 500)
				}
			}, 5000);
		}, 200)

		$("#ModalTrazi").modal("hide");
	}

	var syncdata;
	var nesto
	var nesto2

	const searchStates = async searchText => {
		if (rezultat1 !== undefined) {

			if (searchText.charAt(0) == " ") {
				search.value = '';
				$('#match-list').html('');
			}

			if (searchText.charAt(0) !== " " && searchText !== undefined) {
				$(".form-group").addClass("write")
				if (search.value == "") {
					$(".form-group").removeClass("write")
				}

				const states = rezultat1
				var podaciTrazi = [];
				podaciTrazi.push(states);
				data = podaciTrazi[0].features;

				matches = data.filter(state => {
					matchList.innerHTML = `<div class="search-error">${translate("Search error")}</div>`;
					matches = [];
					RegExp.quote = function allowSpecialSymbols(str) {
						return str.replace(/([.?*+^$[\]\\(){}|])/g, '');
					};
					const regex = new RegExp(RegExp.quote(`${searchText}`), 'gi');

					if (state.geometry.type == "MultiPolygon" || state.geometry.type == "Polygon") {
						if (state.properties[lng] !== null && state.properties[lng] !== undefined) {
							var searchNumber = state.properties.number !== undefined ? state.properties.number : ""
							var searchLabel = state.properties.label !== undefined ? state.properties.label : ""
							var searchLanguageBrand = state.properties[lng] + " " + (searchNumber ? searchNumber : (searchLabel ? searchLabel : ""));
							searchLanguageBrand = searchLanguageBrand.match(regex)
							var searchBrand = state.properties.brand !== undefined ? state.properties.brand : ""
							searchBrand = searchBrand.match(regex)

							if (searchLanguageBrand !== null) {
								if (searchLanguageBrand[0] !== "") {
									return searchLanguageBrand
								}
							}
							if (searchBrand !== null) {
								if (searchBrand[0] !== "") {
									return searchBrand
								}
							}
							if (searchLabel !== null) {
								if (searchLabel[0] !== "") {}
							}
						}
					}
				});

				if (searchText.length === 0) {
					matches = [];
					matchList.innerHTML = ``
				}

				clearInterval(nesto2);
				nesto = {
					time: function() {
						outputHTML(matches.sort((a, b) => (a.properties[lng] + a.properties.number).localeCompare((b.properties[lng] + b.properties.number), lng, {
							numeric: true,
							ignorePunctuation: true,
							sensitivity: 'base'
						})).slice(0, 10));
					}
				}

				nesto["time"]()

				nesto2 = setInterval(function() {
					nesto["time"]()
				}, 5000)
			}
		}
	};

	outputHTML = matches => {
		if (matches.length > 0) {
			console.log(matches)
			html = matches
				.map(
					match => `
        <div class="card card-body mb-4" id="test" data-id=${match.properties.id}>
            <span>${getFeatureName(match.properties["en"])} ${getAccName(match.properties.class)}
            <h4 class='text-primary'>${match.properties[lng]} ${match.properties.number ? match.properties.number : ""} ${match.properties.label ? match.properties.label : ""}</h4>${udaljenostDoLokacije(match.properties.id)}</span>
            ${/*getWorkingHours(match.properties)*/''}
            ${getAvailability(match.properties.id)}
            ${getBrand(match.properties.brand)}
        </div>`


				)
				.join("");
			if ($("input#search").val() != "") {
				matchList.innerHTML = html;
			}

			$("[data-id]").on("click", function() {
				let dataId = $(this).attr("data-id");
				const article = document.querySelector('[data-id="' + dataId + '"]');

				locirajParcelu(article.dataset.id)
			});

		}
	};

	function recommendedPics(param) {
		var pero
		// console.log(param);
		param.forEach((item, i) => {
			pero += `<div><img src="images/facilities/${item}"/></div>`
		})
		return pero.replace("undefined", "")
	}

	var recommendedButtons

	async function createFeatureButtons() {
		$("#match-list").after("<div class='recommandations-container'></div>")
		for (var featureButtonsItems of Object.keys(featureButtons)) {
			var featureButtonsItem = featureButtons[featureButtonsItems];
			var featureButtonClass = "feature-button"
			var featureIconClass = `fas fa-${featureButtonsItem[0]['icon']}`
			var found = rezultat1.features.find(element => element.properties.en == `${featureButtonsItems}`)
			var found2 = found
			var countItems = rezultat1.features
			countItems = countItems.filter(element => element.properties.en == `${featureButtonsItems}`).length
			var places = countItems == 1 ? places = 0 : places = 1
			let modifiedRadnoVrijeme
			if (found !== undefined && found2 !== undefined && countItems > 0) {
				// const getWorkingHoursRes = await fetch(`https://campsabout.com/cms/api/radnoVrijemeObjekta?dbName=${grupacijaName}&objektId=${podacioParceli.uid}&datumOd=${moment().format('YYYY-MM-DD')}&datumDo=${moment().add(6, 'days').format('YYYY-MM-DD')}`)
				// let wh = await getWorkingHoursRes.json();
				// 
				// const daysMod = {
				// "Utorak": "uto",
				// "Srijeda": "sri",
				// "Četvrtak": "cet",
				// "Petak": "pet",
				// "Subota": "sub",
				// "Nedjelja": "ned",
				// "Ponedjeljak": "pon"
				// };
				// 
				// const modifiedRadnoVrijeme = wh.map(([day, ...times]) => [
				// daysMod[day], 
				// ...times.map(time => (time === "" ? "" : parseFloat(time)))
				// ]);
				// console.log(wh)
				// console.log(_RadnoVrijeme(modifiedRadnoVrijeme, lng))
				console.log(found2)
				if (found.properties.hasOwnProperty('dbId')) {
					const getWorkingHoursRes = await fetch(`https://campsabout.com/cms/api/radnoVrijemeObjekta?dbName=demo&objektId=${found2.properties.dbId}&datumOd=${moment().format('YYYY-MM-DD')}&datumDo=${moment().add(6, 'days').format('YYYY-MM-DD')}`)
					let wh = await getWorkingHoursRes.json();

					modifiedRadnoVrijeme = wh.map(([day, ...times]) => [
						translations[day][0][lng],
						...times
					]);
				}

				found = found.properties[lng]
				// console.log(getWorkingHours(found2.propertie)
				$(".feature-buttons").append(`<div class="${featureButtonClass}" data-feature="${found}"><i class="${featureIconClass}"></i><span><span>${found}</span><small>${countItems} ${translate("Places")[places]}</small></span>`)
				recommendedButtons = $(".recommandations-container").append(`<div class="recommandations">
        <div class="card card-body mb-4" id="test" data-id="${found2.properties.id}" ">
            <div class="recommandations-image">
            ${recommendedPics(found2.properties.pics)}
            </div>
            <div class="recommandations-content">
            <i class="${featureIconClass}"></i>
              <h2>${found2.properties[lng]} ${found2.properties.label != undefined ? found2.properties.label : ""}</h2>
              <span class="udaljenost">
              ${found2.properties[lng]} ${udaljenostDoLokacije(found2.properties.id, "recommended")}</span>
              <span class="open">${found2.properties.hasOwnProperty('dbId') ? getWorkingHours(modifiedRadnoVrijeme) : ''}</span>
            </div>
          </div>
    </div>`)
				$("#openRadnoVrijeme").remove()
			}
		}

		$("[data-id]").on("click", function() {
			let dataId = $(this).attr("data-id");
			const article = document.querySelector('[data-id="' + dataId + '"]');

			locirajParcelu(article.dataset.id)
		});

		$("#match-list").before(`<div class='recommended'>${translate("Recommended")}</div>`)
		$(".feature-buttons").append(`<div class="feature-button FAKE"></div>`)

		$(".feature-buttons .feature-button").on("click", function() {
			if ($(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").is(":hidden")) {
				setTimeout(function() {
					$(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
				}, 100)
			}
			$(".found").remove()
			$("#match-list").before(`<div class='found'>${translate("Found")}</div>`)
			$(".feature-buttons .feature-button").removeClass("active")
			$(".recommended").remove()
			$(".recommandations-container").remove()
			$(this).addClass("active")
			var featureButton = $(this).data('feature')
			$("#search").val(featureButton);
			searchStates(featureButton);
		})

	}

	function udaljenostDoLokacije(label, recommended) {

		if (recommended == "recommended") {
			try {
				var temp1 = turf.envelope(rezultat1.features.find(el => el.properties.id === label.toString()));
				var udaljenost = turf.distance(userLocation, turf.centerOfMass(temp1), {
					units: 'meters'
				});

				return `${(udaljenost > 1000) ? ((udaljenost / 1000).toFixed(0) + ' km') : (udaljenost.toFixed(0) + ' m')}`;
			} catch {
				return `${translate("Distance not available")}`
			}
		} else {
			try {
				var temp1 = turf.envelope(data.find(el => el.properties.id === label.toString()));
				var udaljenost = turf.distance(userLocation, turf.centerOfMass(temp1), {
					units: 'meters'
				});

				return `<small>${(udaljenost > 1000) ? ((udaljenost / 1000).toFixed(0) + ' km') : (udaljenost.toFixed(0) + ' m')}</small>`;
			} catch {
				return `<small style="position: relative; margin-left: 38px; margin-bottom: 10px;">${translate("Distance not available")}</small>`
			}
		}
	}

	function racunajDuzine(label) {
		if (label.brand !== undefined) {
			var temp1 = turf.envelope(data.find(el => el.properties.id === label.id.toString()));
			var duzina = turf.rhumbDistance(turf.point(temp1.geometry.coordinates[0][0]), turf.point(temp1.geometry.coordinates[0][1]), {
				units: 'meters'
			});
			var sirina = turf.rhumbDistance(turf.point(temp1.geometry.coordinates[0][1]), turf.point(temp1.geometry.coordinates[0][2]), {
				units: 'meters'
			});
			return `<small>${translate("Dimensions")} cca: ${duzina.toFixed(0)} × ${sirina.toFixed(0)} m</small>`;
		} else {
			return ""
		}
	}

	search.addEventListener("input", () => searchStates(search.value));

	$("#openTrazi").on("click", function() {
		if ($("#ModalTrazi").is(":hidden")) {
			//window.location = '#search';
			$("#map").css("height", $(window).height() + "px")
			$(".feature-button").remove()
			createFeatureButtons()

			$('#ModalTrazi').modal("show");

			if ($(".filters").is(".open")) {
				setTimeout(() => {
					$(".filters").toggleClass("open")
				}, 150)
			}
			if ($(".languages").is(".open")) {
				setTimeout(() => {
					$(".languages").toggleClass("open")
				}, 150)
			}
			setTimeout(function() {
				search.value = '';
				$('#match-list').html('');
			}, 200);
		}
		if ($("#ModalTrazi").is(":visible")) {
			$("#ModalTrazi").modal("hide");
		}

		$(".mapboxgl-popup").remove()
	})

	$("input#search").on("focus", function() {
		$(".feature-buttons .feature-button").removeClass("active")
		if (window.outerWidth < 768) {
			$(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").hide()
		}
	})

	$("input#search").on("input", function() {
		$(".found").remove()
		$("#match-list").before(`<div class='found'>${translate("Found")}</div>`)
		$(".recommended").remove()
		$(".recommandations-container").remove()
		if ($(this).val() == "") {
			$(".found").remove()
			$("#match-list").before(`<div class='recommended'>${translate("Recommended")}</div>`)
			$("#match-list").after(recommendedButtons)
		}

	})
	$(document).on('keypress', function(e) {
		if (e.which == 13) {
			$("input#search").blur();
			setTimeout(function() {
				$(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
			}, 100)
		}
	});

	$(document).click(function(event) {
		var $target = $(event.target);
		if (!$target.closest('.form-group').length &&
			$('.form-group').is(":visible")) {
			$("input#search").blur();
			setTimeout(function() {
				$(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
			}, 100)
		}
	});

	$(document).on("click", ".modal-backdrop", function() {
		$(".menu-item").removeClass("selected")
		$(".menu-item").removeClass("not-selected")
	})

	$(".menu-item").on("click", function() {
		if ($(".annotation.weather").is(":visible")) {
			$(".annotation.weather").remove()
			$(".weather-bg").remove()
		}

		setTimeout(_ => {
			if ($(this).is(".selected")) {
				$(".menu-item").removeClass("not-selected")
				$(".menu-item").removeClass("selected")
			} else {
				$(".menu-item").removeClass("not-selected")
				$(".menu-item").not($(this)).addClass("not-selected")
				$(".menu-item").removeClass("selected")
				$(this).addClass("selected")
			}
		}, 100)

	})

	$('#ModalTrazi').on('hide.bs.modal', function() {
		clearInterval(nesto2);

		if (window.outerWidth > 768) {
			$("#ModalTrazi").animate({
				opacity: 0
			}, 100)
			setTimeout(function() {
				$("#ModalTrazi").css("opacity", "")
			}, 500)
		}

		$("#match-list").html("")
		$(".found").remove()
		$(".recommended").remove()
		$(".recommandations-container").remove()
		$("#map").removeAttr("style")
		$(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
		$(".form-group").removeClass("write")
	});

	document.addEventListener('gesturestart', function(e) {
		e.preventDefault();
	});

	//desni klik za preuzeti koordinate za POI
	map.on('contextmenu', function(e) {
		if (dev_env) {
			navigator.clipboard.writeText(JSON.stringify(e.lngLat.wrap()));
		}
	});

	document.getElementById("bukiraj").disabled = true;

	//tippy
	tippy('#home', {
		content: translate('hintHome'),
		placement: 'right',
		theme: 'light',
		dynamicTitle: true,
		boundary: 'scrollParent',
		touch: false,
		onShow(instance) {
			instance.setContent(translate('hintHome'));
		}
	});
	tippy('#openTrazi', {
		content: translate('hintTrazilica'),
		placement: 'right',
		theme: 'light',
		dynamicTitle: true,
		boundary: 'scrollParent',
		touch: false,
		onShow(instance) {
			instance.setContent(translate('hintTrazilica'));
		}
	});
	tippy('#layers', {
		content: translate('hintFilteri'),
		placement: 'right',
		theme: 'light',
		dynamicTitle: true,
		boundary: 'scrollParent',
		touch: false,
		onShow(instance) {
			instance.setContent(translate('hintFilteri'));
		}
	});
	tippy('#lang', {
		content: translate('hintJezici'),
		placement: 'right',
		theme: 'light',
		dynamicTitle: true,
		boundary: 'scrollParent',
		touch: false,
		onShow(instance) {
			instance.setContent(translate('hintJezici'));
		}
	});
	tippy('#booknowtraka', {
		content: translate('hintBukiraj'),
		placement: 'bottom',
		theme: 'light',
		dynamicTitle: true,
		boundary: 'scrollParent',
		touch: false,
		onShow(instance) {
			instance.setContent(translate('hintBukiraj'));
		}
	});

	if (_POSTAVKE_KAMPA_.bookingModul === '0') {
		$('.book-form').css('display', 'none');
	}

	//vodimo gosta do pitcha ako je tako definirano u parametrima
	if (takeMeToAccomodation != '') {

		$("body").addClass("message")
		$("body").append(`<div class="annotation"><h3>${translate("Taking You to pitch").replace('$pitch', takeMeToAccomodation)}</h3><div class="annotation-buttons"><div class="confirm">${translate("Fine")}</div></div></div>`)

		$(".confirm").on("click", function() {
			$("body").removeClass("message")
			$(".annotation").remove();
			//console.log('state', geolocate._watchState);
			const _tmp_id_to_navigate = rezultat1['features'].find(item => item.properties.brojGPS === takeMeToAccomodation);
			isSetOrigin = true;
			gpsParcela = _tmp_id_to_navigate.properties.id;
			//console.log(_tmp_id_to_navigate, gpsParcela);
			destinationLocation = turf.centerOfMass(turf.combine(turf.multiPolygon(_tmp_id_to_navigate.geometry.coordinates))).geometry.coordinates;
			navigateTo();

		})
	}

	intervalID = setInterval(() => {
		if (map.loaded()) {
			hideLoader();
			clearInterval(intervalID);
			//možda dodati još da ako nakon npr 5 sec nije odrađeno da ipak hidea, da se ne bi dogodilo da ne pozove map.loaded pa da loopa vječno?
		}
	}, 300)

}

function generirajRasporedHTML(raspored) {
	let html = '<ul class="raspored-lista">';
	let trenutnoRadnoVrijeme = null;
	let trenutniDani = [];

	for (let i = 0; i < raspored.length; i++) {
		const dan = raspored[i][0];
		const radnoVrijeme = raspored[i].slice(1);

		if (JSON.stringify(radnoVrijeme) !== JSON.stringify(trenutnoRadnoVrijeme)) {
			if (i > 0) {
				if (trenutnoRadnoVrijeme.length > 0) {
					console.log(trenutniDani)
					if (trenutniDani.length > 1) {
						html += '<strong>' + trenutniDani.join(' - ');
					} else if (trenutniDani.length === 1) {
						html += '<strong>' + trenutniDani[0];
					}
					let inputString = trenutnoRadnoVrijeme.join(' - ').replaceAll(".", ":")

					let crte = 0
					let vrijeme = 0

					for (let item of inputString.split(" ")) {
						if (item === "-") crte++
						if (item.includes(":")) vrijeme++
					}

					let arr = []

					for (let i = 0; i < inputString.split(" ").length; i++) {
						if (inputString.split(" ")[i] === "-") {
							if (i % crte === 0 && vrijeme > 2) {
								arr.push(" & ")
							} else {
								arr.push(' ' + inputString.split(" ")[i] + ' ')
							}
						} else {
							arr.push(inputString.split(" ")[i])
						}
					}

					let newStr = arr.toString().replaceAll(",", "")

					var indexes = [];

					for (let i = 0; i < newStr.split(" ").length; i++) {
						if (newStr.split(" ")[i] === "-") {
							indexes.push(i);
						}
					}

					let acceptable = []

					for (let i = 0; i < indexes.length; i++) {
						if (i % 2 !== 0) {
							acceptable.push(indexes[i]);
						}
					}

					let acceptableArr = []

					for (let i = 0; i < newStr.split(" ").length; i++) {
						if (newStr.split(" ")[i] === "-" && acceptable.includes(i)) {
							acceptableArr.push(" &")
						} else if (i === 0) {
							acceptableArr.push(newStr.split(" ")[i])
						} else {
							acceptableArr.push(' ' + newStr.split(" ")[i])
						}
					}

					html += '</strong> ' + acceptableArr.toString().replaceAll(",", "");
				}
				html += '</li>';
			}
			html += '<li class="raspored-item">';
			if (radnoVrijeme.length === 0) {
				html += '<strong>' + dan + '</strong> ' + translate('Closed');
			} else {
				trenutniDani = [dan];
			}
			trenutnoRadnoVrijeme = radnoVrijeme;
		} else {
			trenutniDani.push(dan);
		}
	}

	if (trenutnoRadnoVrijeme.length > 0) {
		if (trenutniDani.length > 1) {
			html += '<strong>' + trenutniDani.join(' - ') + '</strong>';
		} else if (trenutniDani.length === 1) {
			html += '<strong>' + trenutniDani[0] + '</strong>';
		}
		html += ' ' + trenutnoRadnoVrijeme.join(' - ').replaceAll(".", ":");
	}

	html += '</li></ul>';
	return html;
}

$(document).on("click", "#openRadnoVrijeme", function() {
	if (!showRvExtended) {
		$("#workHors").after(generirajRasporedHTML(modifiedRadnoVrijeme))
		$(this).css("rotate", "360deg")
	} else {
		$(".raspored-lista").remove()
		$(this).css("rotate", "180deg")
	}
	showRvExtended = !showRvExtended
})

function translate(prop) {
	let prijevod = translations.hasOwnProperty(prop) ? translations[prop][0][lng] : 'Prijevod ne postoji!'
	return prijevod
}