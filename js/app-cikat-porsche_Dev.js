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
let _pois_;
let _PERIODI_REZERVACIJE_;
let cmsObjekti;
let _CMS_data_Objekti;
let poiLabels;
let _CMS_POILabels;
let flag_SAMO_NA_UPIT;
let _TABLICA_VRSTE_;
let pmsPropertyId_New;
let iconZoomSize;

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

function showLoader() {
  document.getElementById("spinner").classList.add("show");
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

$('#booknowtraka').text(translations['Book now'][0][lng]);

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
  grupacijaName = 'maistra'
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
      document.getElementsByClassName('selected-date available')[0].innerHTML = translations['Smjestaj ipak nije dostupan'][0][lng];
      document.getElementsByClassName('selected-date available')[0].style.color = 'red';
    }

  } else {
    document.getElementsByClassName('selected-date available')[0].innerHTML = translations['Smjestaj ipak nije dostupan'][0][lng];
    document.getElementsByClassName('selected-date available')[0].style.color = 'red';
  }

}

//funkcija za phobsd book link
function PhobsBook(brojSJ, datumOd, brojDana, brojOsoba, djecaGodine, jezik, mishDatumOd, mishDatumDo) {

  showLoader();

  let RATE_ID_;

  if (PITCH_OR_MOBILE === 'M') {RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2024') ? _POSTAVKE_KAMPA_.defaultRateId : _PARAMETRI_KAMPA.rateM2024};
  if (PITCH_OR_MOBILE === 'P') {RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2024') ? _POSTAVKE_KAMPA_.parceleRateId : _PARAMETRI_KAMPA.rateP2024};

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

  var _0x268840=_0x5ee7;(function(_0x3a4ac9,_0x596f85){var _0x2ac72a=_0x5ee7,_0x49ba55=_0x3a4ac9();while(!![]){try{var _0x5be9e3=parseInt(_0x2ac72a(0xa0))/0x1+parseInt(_0x2ac72a(0x94))/0x2+parseInt(_0x2ac72a(0xb7))/0x3+parseInt(_0x2ac72a(0x9d))/0x4*(parseInt(_0x2ac72a(0x99))/0x5)+-parseInt(_0x2ac72a(0xac))/0x6+parseInt(_0x2ac72a(0xaf))/0x7+-parseInt(_0x2ac72a(0x98))/0x8*(parseInt(_0x2ac72a(0x9b))/0x9);if(_0x5be9e3===_0x596f85)break;else _0x49ba55['push'](_0x49ba55['shift']());}catch(_0x3d5cfc){_0x49ba55['push'](_0x49ba55['shift']());}}}(_0x4146,0x3e528));function _0x4146(){var _0x42c9e3=['then','color','target','undefined','phobsReplaceNewURL','<div\x20class=\x22annotation\x22><h3>','addClass','$minutes','hasOwnProperty','phobsBookURL','781094YiYkLz','log','message','selected-date\x20available','8oEgKYz','112335hZblma','innerHTML','9277155gEdXnp','remove','76niDjYK','Fine','action','98669cpmJLe',';\x20SameSite=None;\x20Secure;\x20path=/','name','createElement','post','cuvanjeRezMin','replace','modal','callPhobsFromPricesPerStay','error_message','style','unitCode=','1342938sSYHdg','cookie','Smjestaj\x20ipak\x20nije\x20dostupan','2608529bvNnIJ','</h3><div\x20class=\x22annotation-buttons\x22><div\x20class=\x22confirm\x22>','getElementsByClassName','</div></div></div>','body','.confirm','.annotation','#ModalParcela','663462dMaQix','cancelRezMessage','appendChild','stringify','input','submit','Booking\x20time\x20message','phobsReplaceOldURL','_blank','json','reservationId','bookTocnogBroja','removeClass','toUTCString','red','unitCode','getTime','brojSJ','application/json',';expires=','form','pmsTip','value','RezBezBroja'];_0x4146=function(){return _0x42c9e3;};return _0x4146();}function _0x5ee7(_0x22c56e,_0x394a37){var _0x41462d=_0x4146();return _0x5ee7=function(_0x5ee726,_0x361179){_0x5ee726=_0x5ee726-0x91;var _0x43a008=_0x41462d[_0x5ee726];return _0x43a008;},_0x5ee7(_0x22c56e,_0x394a37);}async function PhobsCampsaboutApiCall(_0x168d4c){var _0x54c610=_0x5ee7,_0x58b17c=await fetch(_PARAMETRI_KAMPA[_0x54c610(0x93)],{'method':'POST','headers':{'Accept':_0x54c610(0xc9),'Content-Type':'application/json'},'body':JSON[_0x54c610(0xba)](_0x168d4c)});if(_0x58b17c['status']===0xc8)return temporaryHelperBook=await _0x58b17c[_0x54c610(0xc0)](),temporaryHelperBook;}async function POZOVI_PhobsCampsaboutApiCall(_0x2f52a7){var _0x27c0a5=_0x5ee7;return _PARAMETRI_KAMPA[_0x27c0a5(0xa8)]==='0'?(temporaryHelperBook_2=await PhobsCampsaboutApiCall(_0x2f52a7),temporaryHelperBook_2):_PRICES_PER_STAY_[paramZaBooking[_0x27c0a5(0xcc)]]['url'];}function postPhobs(_0x2daf0d,_0x1b8ecc,_0x5b05ca=_0x268840(0xa4)){var _0x23f1dd=_0x268840;const _0x579dce=document[_0x23f1dd(0xa3)](_0x23f1dd(0xcb));_0x579dce['method']=_0x5b05ca,_0x579dce[_0x23f1dd(0x9f)]=_0x2daf0d,_0x579dce[_0x23f1dd(0xd1)]=_0x23f1dd(0xbf);for(const _0x1af73d in _0x1b8ecc){if(_0x1b8ecc[_0x23f1dd(0x92)](_0x1af73d)){const _0xa62d82=document[_0x23f1dd(0xa3)](_0x23f1dd(0xbb));_0xa62d82['type']='hidden',_0xa62d82[_0x23f1dd(0xa2)]=_0x1af73d,_0xa62d82[_0x23f1dd(0xcd)]=_0x1b8ecc[_0x1af73d],_0x579dce[_0x23f1dd(0xb9)](_0xa62d82);}}document[_0x23f1dd(0xb3)][_0x23f1dd(0xb9)](_0x579dce),_0x579dce[_0x23f1dd(0xbc)]();}POZOVI_PhobsCampsaboutApiCall(dataToSend)[_0x268840(0xcf)](_0x102622=>{var _0x2129ed=_0x268840;hideLoader();if(_0x102622[_0x2129ed(0x92)](_0x2129ed(0xa9)))document[_0x2129ed(0xb1)](_0x2129ed(0x97))[0x0][_0x2129ed(0x9a)]=translations[_0x2129ed(0xae)][0x0][lng]+'\x20('+_0x102622[_0x2129ed(0xa9)]+')',document[_0x2129ed(0xb1)](_0x2129ed(0x97))[0x0][_0x2129ed(0xaa)][_0x2129ed(0xd0)]=_0x2129ed(0xc5),MISH_CancelationRes(getCookie(_0x2129ed(0xc1)));else{let _0x36598f;_0x36598f=_TABLICA_VRSTE_[paramZaBooking[_0x2129ed(0xcc)]][0x0][_0x2129ed(0xc2)]==='1'?translations[_0x2129ed(0xbd)][0x0][lng][_0x2129ed(0xa6)](_0x2129ed(0x91),_POSTAVKE_KAMPA_[_0x2129ed(0xa5)]):translations[_0x2129ed(0xce)][0x0][lng];if(getCookie(_0x2129ed(0xc6))!=undefined&&getCookie(_0x2129ed(0xc6))!=_0x2129ed(0xd2)&&getCookie('unitCode')!=''&&_PARAMETRI_KAMPA[_0x2129ed(0xb8)]==='1')var _0x2a5ed2='<div\x20class=\x22annotation\x22><h3>'+(translations['Reservation\x20cancelation'][0x0][lng]['replace']('$brojSJ',getCookie('unitCode'))+'\x20'+_0x36598f)+_0x2129ed(0xb0)+translations[_0x2129ed(0x9e)][0x0][lng]+_0x2129ed(0xb2);else var _0x2a5ed2=_0x2129ed(0xd4)+_0x36598f+_0x2129ed(0xb0)+translations[_0x2129ed(0x9e)][0x0][lng]+'</div></div></div>';$(_0x2129ed(0xb6))[_0x2129ed(0xa7)]('hide'),$(_0x2129ed(0xb3))['append'](_0x2a5ed2),$('body')[_0x2129ed(0xd5)](_0x2129ed(0x96)),$(_0x2129ed(0xb4))['on']('click',function(){var _0x28f9a2=_0x2129ed;$(_0x28f9a2(0xb3))[_0x28f9a2(0xc3)](_0x28f9a2(0x96)),$(_0x28f9a2(0xb5))[_0x28f9a2(0x9c)]();var _0x1cc109=new Date(),_0x96effb=_0x1cc109[_0x28f9a2(0xc7)](),_0x481b3a=_0x96effb+0x3e8*_POSTAVKE_KAMPA_['cuvanjeRezMin']*0x3c;_0x1cc109['setTime'](_0x481b3a),document[_0x28f9a2(0xad)]=_0x28f9a2(0xab)+paramZaBooking[_0x28f9a2(0xc8)]+_0x28f9a2(0xca)+_0x1cc109[_0x28f9a2(0xc4)]()+_0x28f9a2(0xa1),_PARAMETRI_KAMPA[_0x28f9a2(0xbe)]!=undefined&&_PARAMETRI_KAMPA[_0x28f9a2(0xbe)]!=''&&_PARAMETRI_KAMPA[_0x28f9a2(0xbe)]!=null&&(_0x102622=_0x102622[_0x28f9a2(0xa6)](_PARAMETRI_KAMPA[_0x28f9a2(0xbe)],_PARAMETRI_KAMPA[_0x28f9a2(0xd3)])),console[_0x28f9a2(0x95)](_0x102622),postPhobs(_0x102622,{'lot_number':paramZaBooking['brojSJ'],'external_booking_id':PMS_RESERVATION_ID});});}});

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

popupDiv = `<button class="btn btn-outline-secondary" id="navigateToPoi"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`

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

async function vratiPOIS() {
  gjpois = await fetchPOIS();
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
  _pois_ = await fetchPOIS();
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

  if (PITCH_OR_MOBILE === 'M') {RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2024') ? _POSTAVKE_KAMPA_.defaultRateId : _PARAMETRI_KAMPA.rateM2024};
  if (PITCH_OR_MOBILE === 'P') {RATE_ID_ = (phobsDatumOd.substring(0, 4) === '2024') ? _POSTAVKE_KAMPA_.parceleRateId : _PARAMETRI_KAMPA.rateP2024};

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

  let nazivKampaElement = document.getElementById('nazivkampa');
  if (_POSTAVKE_KAMPA_.naziv === '.') {
    _POSTAVKE_KAMPA_.naziv = ''
  };
  nazivKampaElement.innerHTML = _POSTAVKE_KAMPA_.naziv;

  iconZoomSize = _PARAMETRI_KAMPA.iconZoomSize != undefined ? parseFloat(_PARAMETRI_KAMPA.iconZoomSize) : 1;

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
            $("body").append(`<div class="annotation"><h3>${translations["Imporant message"][0][lng]}</h3><p>Booking platform is currently under maintenance!</p><div class="annotation-buttons"><div class="confirm">${translations["Fine"][0][lng]}</div></div></div>`)
          return;
      }*/

      $(".book-select").remove()
      $("body").append(`<div class="book-select">
      <div class="book-first-step">
        <h2>${translations['Select accomodation type'][0][lng]}</h2>
        <div class="select-type">
          <div class="book-type" data-book-type="pitch"><i class="fas fa-rv"></i>${translations['Select pitch'][0][lng]}</div>
          <div class="book-type" data-book-type="mh"><i class="fas-pro fa-house-tree"></i>${translations['Select mh'][0][lng]}</div>
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


    if (e.target.tagName == "I") {
      bookData['accomodation'] = e.target.parentElement.dataset.bookType
    } else {
      bookData['accomodation'] = e.target.dataset.bookType
    }
    (bookData['accomodation'] === 'pitch') ? PITCH_OR_MOBILE = 'P': PITCH_OR_MOBILE = 'M';

    // console.log($(e.target).closest(".book-select"));
    $(".book-first-step").addClass("date-selected")
    $(".book-select").append(`<div class="book-second-step">
      <h2>${translations['Broj gostiju select'][0][lng]}</h2>
      <div class="select-guests">
      <div class="adults">
        <div class="guest-number"><i class="fas fa-people"></i>${translations['Odrasli'][0][lng]}</div>
        <div class="adults-number">${(bookData.hasOwnProperty('adults')) ? bookData['adults'] : '2'}</div>
      </div>
      <div class="children">
        <div class="guest-number"><i class="fas fa-children"></i>${translations['Djeca'][0][lng]}</div>
        <div class="children-number">${(bookData.hasOwnProperty('children')) ? Object.keys(bookData['children']).length : '0'}</div>
      </div>
      </div>
      <div id="confirm-book" class="confirm-book">${translations['Potvrdi'][0][lng]}</div>
    </div>`)
    // console.log();
    // console.log(e.target.dataset.bookType);
    if (bookData.hasOwnProperty('children')) {
      setTimeout(function() {
        $(".children-select").remove()
        $(".children-age").remove()

        if (selectedChildren != 0 && selectedChildren != undefined) {
          $(".children").after(`<div class="children-age">
            <h3>${translations['Enter children age'][0][lng]}</h3>
          </div>`)
          for (var i = 0; i < selectedChildren; i++) {
            $(".children-age").append(`<div class="child">
              <div class="child-text">${translations['Dijete'][0][lng]} ${i+1}</div>
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
        <h3>${translations['Enter children age'][0][lng]}</h3>
      </div>`)
        for (var i = 0; i < selectedChildren; i++) {
          $(".children-age").append(`<div class="child">
          <div class="child-text">${translations['Dijete'][0][lng]} ${i+1}</div>
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

  if (qren) {
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
      one: translations["Nights"][0][lng][0],
      other: translations["Nights"][0][lng][1]
    },
    tooltipNumber: (totalDays) => {
      phobsBrojDana = totalDays - 1; //možda bi bilo pametnije da ipak računamo broj dana između dva datuma jer ovo nismo 100% da će uvijek trigerirat
      return totalDays - 1;
    },

    resetButton: () => {
      var btn = document.createElement('button');
      btn.classList.add("reset-button")
      btn.innerHTML = translations["Clear"][0][lng];
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

        picker.setOptions({minDays: (qren == true) ? 2 : ((PITCH_OR_MOBILE === 'P') ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1)})
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
              one: translations["Nights"][0][lng][0],
              other: translations["Nights"][0][lng][1]
            },
            buttonText: {
              "apply": translations["Apply"][0][lng],
              "cancel": translations["Cancel"][0][lng]
            }
          })
        }),
        picker.on('show', function(date1, date2) {
          picker.setOptions({
            tooltipText: {
              one: translations["Nights"][0][lng][0],
              other: translations["Nights"][0][lng][1]
            },
            buttonText: {
              "apply": translations["Apply"][0][lng],
              "cancel": translations["Cancel"][0][lng]
            }
          })
        }),
        picker.on('hide', () => {
          $("#date").removeClass("open")
          $(".menu-item").removeClass("selected")
          $(".menu-item").removeClass("not-selected")
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
                  picker.setOptions({minDays: minDanaRezPeriodi + 1});
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

          if ((date1 != undefined) && (date2 == undefined) && (qren == false)) {
            if (_picker_temp_day === '0') {
              picker.setOptions({minDays: (PITCH_OR_MOBILE === 'P') ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1})
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
              picker.setOptions({minDays: (PITCH_OR_MOBILE === 'P') ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1})
              picker.gotoDate(date1);
            }

          }
        })
    },
  });



  $(document).on("click", ".confirm-book", function() {
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
    <div class="selected-type">${translations['Selected accomodation'][0][lng]} ${bookData['accomodation']} | ${translations['Odrasli'][0][lng]} ${bookData['adults']}, ${translations['Djeca'][0][lng]} ${bookData['children'] != 0 ? Object.keys(bookData['children']).length : 0}</div>
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
        return translations['recepcija'][0][jezik];
        break;
      case '2':
        return translations['bazen'][0][jezik];
        break;
      case '3':
        return translations['pekara'][0][jezik];
        break;
      case '4':
        return translations['trgovina'][0][jezik];
        break;
      case '5':
        return translations['stand'][0][jezik];
        break;
      case '6':
        return translations['sport'][0][jezik];
        break;
      case '7':
        return translations['masaza'][0][jezik];
        break;
      case '8':
        return translations['kafic'][0][jezik];
        break;
      case '9':
        return translations['restoran'][0][jezik];
        break;
      case '10':
        return translations['pizzeria'][0][jezik];
        break;
      case '11':
        return translations['fastfood'][0][jezik];
        break;
      case '12':
        return translations['wc'][0][jezik];
        break;
      case '13':
        return translations['aquapark'][0][jezik];
        break;
      case '14':
        return translations['hotel'][0][jezik];
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

  var _0x575785=_0x1dcf;(function(_0x338a11,_0x1f6e02){var _0x2749b5=_0x1dcf,_0x3d3608=_0x338a11();while(!![]){try{var _0x1f23c2=parseInt(_0x2749b5(0x121))/0x1+parseInt(_0x2749b5(0x13b))/0x2*(parseInt(_0x2749b5(0x111))/0x3)+-parseInt(_0x2749b5(0x153))/0x4+parseInt(_0x2749b5(0x122))/0x5*(parseInt(_0x2749b5(0x127))/0x6)+-parseInt(_0x2749b5(0x131))/0x7+parseInt(_0x2749b5(0x116))/0x8+-parseInt(_0x2749b5(0x129))/0x9*(parseInt(_0x2749b5(0x12c))/0xa);if(_0x1f23c2===_0x1f6e02)break;else _0x3d3608['push'](_0x3d3608['shift']());}catch(_0x5e2b06){_0x3d3608['push'](_0x3d3608['shift']());}}}(_0x3587,0xc2dca));function hexToHSL(_0x51cae9,_0x4095a8){var _0x128437=_0x1dcf;if(_0x51cae9!=_0x128437(0x136)){var _0x452da6=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i[_0x128437(0x14a)](_0x51cae9);r=parseInt(_0x452da6[0x1],0x10),g=parseInt(_0x452da6[0x2],0x10),b=parseInt(_0x452da6[0x3],0x10),(r/=0xff,g/=0xff,b/=0xff);var _0xdac122=Math[_0x128437(0x134)](r,g,b),_0x35d207=Math[_0x128437(0x12d)](r,g,b),_0x5dbc3f,_0x389bb7,_0x2cb181=(_0xdac122+_0x35d207)/0x2;if(_0xdac122==_0x35d207)_0x5dbc3f=_0x389bb7=0x0;else{var _0x2e9025=_0xdac122-_0x35d207;_0x389bb7=_0x2cb181>0.5?_0x2e9025/(0x2-_0xdac122-_0x35d207):_0x2e9025/(_0xdac122+_0x35d207);switch(_0xdac122){case r:_0x5dbc3f=(g-b)/_0x2e9025+(g<b?0x6:0x0);break;case g:_0x5dbc3f=(b-r)/_0x2e9025+0x2;break;case b:_0x5dbc3f=(r-g)/_0x2e9025+0x4;break;}_0x5dbc3f/=0x6;}var _0x2d441f=new Object();return _0x5dbc3f=_0x5dbc3f*0x168,_0x389bb7=_0x389bb7*0x64,_0x2cb181=_0x2cb181*0x64,_0x4095a8=='border'&&(_0x2cb181=_0x2cb181-0x4),_0x4095a8=='gps'&&(_0x2cb181=0x5a),_0x4095a8==_0x128437(0x120)&&(_0x2cb181=0x55),_0x2d441f['h']=Math[_0x128437(0x110)](_0x5dbc3f),_0x2d441f['s']=Math[_0x128437(0x110)](_0x389bb7),_0x2d441f['l']=Math[_0x128437(0x110)](_0x2cb181),'hsl('+_0x2d441f['h']+_0x128437(0x11e)+_0x2d441f['s']+'%,\x20'+_0x2d441f['l']+'%)';}else return _0x128437(0x136);}function lightenDarkenColor(_0x24cd46,_0x33da65){var _0x46c5cf=_0x1dcf;let _0x115935=![];_0x24cd46[0x0]=='#'&&(_0x24cd46=_0x24cd46[_0x46c5cf(0x12b)](0x1),_0x115935=!![]);const _0x307f02=parseInt(_0x24cd46,0x10);let _0x5eb001=(_0x307f02>>0x10)+_0x33da65;if(_0x5eb001>0xff)_0x5eb001=0xff;else _0x5eb001<0x0&&(_0x5eb001=0x0);let _0x33d0d4=(_0x307f02>>0x8&0xff)+_0x33da65;if(_0x33d0d4>0xff)_0x33d0d4=0xff;else _0x33d0d4<0x0&&(_0x33d0d4=0x0);let _0x4d98bb=(_0x307f02&0xff)+_0x33da65;if(_0x4d98bb>0xff)_0x4d98bb=0xff;else _0x4d98bb<0x0&&(_0x4d98bb=0x0);let _0x457f35=(_0x4d98bb|_0x33d0d4<<0x8|_0x5eb001<<0x10)[_0x46c5cf(0x142)](0x10);while(_0x457f35[_0x46c5cf(0x12a)]<0x6){_0x457f35=0x0+_0x457f35;}return(_0x115935?'#':'')+_0x457f35;}var ligthPercentage=-0x28,ligthPercentageOccupied=-0x14,ligthPercentageFree=-0x64,layerColors={'fill':function(){var _0x15b25f=_0x1dcf,_0x447229=[];for(i=0x0;i<arguments[_0x15b25f(0x12a)];i++){!arguments[i][_0x15b25f(0x114)](_0x15b25f(0x115))&&!arguments[i]['includes'](_0x15b25f(0x123))&&!arguments[i][_0x15b25f(0x114)]('mh')&&_0x447229[_0x15b25f(0x10f)](arguments[i],getClassColors(arguments[i],_0x15b25f(0x118)));if(arguments[i][_0x15b25f(0x114)](_0x15b25f(0x115))||arguments[i][_0x15b25f(0x114)]('glamping')||arguments[i][_0x15b25f(0x114)]('mh')){for(i=0x0;i<brandName['length'];i++){_0x447229['push'](brandName[i],brandValue[i][0x0][_0x15b25f(0x118)]);}_0x447229['push'](_0x15b25f(0x136));}}return _0x447229;},'border':function(){var _0x464ddc=_0x1dcf,_0x6d6a3b=[];for(i=0x0;i<arguments[_0x464ddc(0x12a)];i++){!arguments[i][_0x464ddc(0x114)](_0x464ddc(0x115))&&!arguments[i][_0x464ddc(0x114)](_0x464ddc(0x123))&&!arguments[i]['includes']('mh')&&_0x6d6a3b[_0x464ddc(0x10f)](arguments[i],getClassColors(arguments[i],_0x464ddc(0x137)));if(arguments[i][_0x464ddc(0x114)](_0x464ddc(0x115))||arguments[i][_0x464ddc(0x114)](_0x464ddc(0x123))||arguments[i][_0x464ddc(0x114)]('mh')){for(i=0x0;i<brandName[_0x464ddc(0x12a)];i++){_0x6d6a3b[_0x464ddc(0x10f)](brandName[i],lightenDarkenColor(brandValue[i][0x0][_0x464ddc(0x118)],ligthPercentage));}_0x6d6a3b[_0x464ddc(0x10f)]('transparent');}}return _0x6d6a3b;},'fill_gps':function(){var _0x224e77=_0x1dcf,_0x5c235c=[];for(i=0x0;i<arguments[_0x224e77(0x12a)];i++){!arguments[i][_0x224e77(0x114)](_0x224e77(0x115))&&!arguments[i][_0x224e77(0x114)](_0x224e77(0x123))&&!arguments[i][_0x224e77(0x114)]('mh')&&_0x5c235c[_0x224e77(0x10f)](arguments[i],hexToHSL(getClassColors(arguments[i],_0x224e77(0x118)),'gps'));if(arguments[i][_0x224e77(0x114)]('parcela')||arguments[i][_0x224e77(0x114)]('glamping')||arguments[i][_0x224e77(0x114)]('mh')){for(i=0x0;i<brandName[_0x224e77(0x12a)];i++){_0x5c235c[_0x224e77(0x10f)](brandName[i],hexToHSL(brandValue[i][0x0][_0x224e77(0x118)],_0x224e77(0x14f)));}_0x5c235c[_0x224e77(0x10f)](_0x224e77(0x136));}}return _0x5c235c;},'border_gps':function(){var _0x175674=_0x1dcf,_0x482706=[];for(i=0x0;i<arguments[_0x175674(0x12a)];i++){!arguments[i][_0x175674(0x114)](_0x175674(0x115))&&!arguments[i][_0x175674(0x114)]('glamping')&&!arguments[i][_0x175674(0x114)]('mh')&&_0x482706['push'](arguments[i],hexToHSL(getClassColors(arguments[i],'border'),_0x175674(0x120)));if(arguments[i]['includes'](_0x175674(0x115))||arguments[i]['includes']('glamping')||arguments[i][_0x175674(0x114)]('mh')){for(i=0x0;i<brandName[_0x175674(0x12a)];i++){_0x482706[_0x175674(0x10f)](brandName[i],hexToHSL(lightenDarkenColor(brandValue[i][0x0][_0x175674(0x118)],ligthPercentage),'gps_border'));}_0x482706[_0x175674(0x10f)](_0x175674(0x136));}}return _0x482706;}};brandName=Object[_0x575785(0x151)](brandColors),brandValue=Object[_0x575785(0x132)](brandColors);var layer1=[_0x575785(0x113),_0x575785(0x145),_0x575785(0x149),_0x575785(0x13e),'zona_b',_0x575785(0x11c)],layer2=[_0x575785(0x117)],layer3=Object[_0x575785(0x151)](classColors)['filter'](_0x2e79ae=>!layer1[_0x575785(0x114)](_0x2e79ae)&&!layer2[_0x575785(0x114)](_0x2e79ae)),layerBrands=[_0x575785(0x115),_0x575785(0x123),'mh'];function resetingColors(){var _0x3db34f=_0x575785;map[_0x3db34f(0x11a)](_0x3db34f(0x155))!=undefined&&resetNumberOpacity(),map[_0x3db34f(0x144)](_0x3db34f(0x11b),'fill-color',[_0x3db34f(0x141),[_0x3db34f(0x13a),_0x3db34f(0x12e)],...layerColors[_0x3db34f(0x125)](...layer1),'transparent']),map[_0x3db34f(0x144)](_0x3db34f(0x14e),_0x3db34f(0x11f),[_0x3db34f(0x141),[_0x3db34f(0x13a),_0x3db34f(0x12e)],...layerColors[_0x3db34f(0x137)](...layer1),_0x3db34f(0x136)]),map['setPaintProperty'](_0x3db34f(0x152),_0x3db34f(0x128),['match',[_0x3db34f(0x13a),_0x3db34f(0x12e)],...layerColors[_0x3db34f(0x125)](...layer2),_0x3db34f(0x136)]),map[_0x3db34f(0x144)]('layer2_border',_0x3db34f(0x11f),['match',[_0x3db34f(0x13a),_0x3db34f(0x12e)],...layerColors['border'](...layer2),_0x3db34f(0x136)]),map[_0x3db34f(0x144)]('layer3_fill',_0x3db34f(0x128),[_0x3db34f(0x141),[_0x3db34f(0x13a),_0x3db34f(0x12e)],...layerColors[_0x3db34f(0x125)](...layer3),[_0x3db34f(0x141),['get',_0x3db34f(0x14d)],...layerColors[_0x3db34f(0x125)](...layerBrands)]]),map[_0x3db34f(0x144)](_0x3db34f(0x13c),_0x3db34f(0x11f),[_0x3db34f(0x141),['get','class'],...layerColors[_0x3db34f(0x137)](...layer3),[_0x3db34f(0x141),[_0x3db34f(0x13a),_0x3db34f(0x14d)],...layerColors['border'](...layerBrands)]]);}function coloringUpperLayers(){var _0x2f3d6a=_0x575785;map[_0x2f3d6a(0x144)](_0x2f3d6a(0x11b),'fill-color',['match',[_0x2f3d6a(0x13a),_0x2f3d6a(0x12e)],...layerColors['fill_gps'](...layer1),_0x2f3d6a(0x136)]),map[_0x2f3d6a(0x144)]('layer1_border','line-color',[_0x2f3d6a(0x141),[_0x2f3d6a(0x13a),_0x2f3d6a(0x12e)],...layerColors[_0x2f3d6a(0x150)](...layer1),_0x2f3d6a(0x136)]),map[_0x2f3d6a(0x144)](_0x2f3d6a(0x152),_0x2f3d6a(0x128),[_0x2f3d6a(0x141),[_0x2f3d6a(0x13a),_0x2f3d6a(0x12e)],...layerColors[_0x2f3d6a(0x143)](...layer2),_0x2f3d6a(0x136)]),map[_0x2f3d6a(0x144)](_0x2f3d6a(0x148),_0x2f3d6a(0x11f),[_0x2f3d6a(0x141),[_0x2f3d6a(0x13a),_0x2f3d6a(0x12e)],...layerColors[_0x2f3d6a(0x150)](...layer2),_0x2f3d6a(0x136)]);}function coloringGPS(_0x278c11){var _0x51113f=_0x575785;GPSNumberOpacity(_0x278c11['toString']()),coloringUpperLayers(),map[_0x51113f(0x144)](_0x51113f(0x13d),_0x51113f(0x128),['match',[_0x51113f(0x138),[_0x51113f(0x13a),'id'],['get',_0x51113f(0x14b)]],_0x278c11[_0x51113f(0x142)](),[_0x51113f(0x141),[_0x51113f(0x13a),_0x51113f(0x14d)],...layerColors[_0x51113f(0x125)](...layerBrands),_0x51113f(0x136),[_0x51113f(0x141),[_0x51113f(0x13a),_0x51113f(0x12e)],...layerColors[_0x51113f(0x125)](...layer3),_0x51113f(0x136)]],[_0x51113f(0x141),[_0x51113f(0x13a),'class'],...layerColors['fill_gps'](...layer3),['match',[_0x51113f(0x13a),_0x51113f(0x14d)],...layerColors[_0x51113f(0x143)](...layerBrands)]]]),map[_0x51113f(0x144)](_0x51113f(0x13c),_0x51113f(0x11f),[_0x51113f(0x141),[_0x51113f(0x138),[_0x51113f(0x13a),'id'],[_0x51113f(0x13a),'foreign-key']],_0x278c11[_0x51113f(0x142)](),['match',['get',_0x51113f(0x14d)],...layerColors[_0x51113f(0x137)](...layerBrands),_0x51113f(0x136),[_0x51113f(0x141),[_0x51113f(0x13a),'class'],...layerColors[_0x51113f(0x137)](...layer3),_0x51113f(0x136)]],[_0x51113f(0x141),[_0x51113f(0x13a),_0x51113f(0x12e)],...layerColors[_0x51113f(0x150)](...layer3),[_0x51113f(0x141),['get',_0x51113f(0x14d)],...layerColors[_0x51113f(0x150)](...layerBrands)]]]);}function coloringGPSDate(_0x2a95fd){var _0x31bbba=_0x575785;GPSNumberOpacity(_0x2a95fd[_0x31bbba(0x142)]()),coloringUpperLayers(),map[_0x31bbba(0x144)](_0x31bbba(0x13d),_0x31bbba(0x128),[_0x31bbba(0x141),[_0x31bbba(0x138),[_0x31bbba(0x13a),'id'],['get',_0x31bbba(0x14b)]],_0x2a95fd['toString'](),[_0x31bbba(0x141),['get','id'],slobodne,availabilityColors[_0x31bbba(0x140)],['match',[_0x31bbba(0x13a),'id'],accomodation,availabilityColors[_0x31bbba(0x154)],[_0x31bbba(0x141),[_0x31bbba(0x13a),_0x31bbba(0x12e)],...layerColors[_0x31bbba(0x125)](...layer3),_0x31bbba(0x136)]]],[_0x31bbba(0x141),[_0x31bbba(0x13a),'class'],...layerColors[_0x31bbba(0x143)](...layer3),['match',['get','id'],slobodne,hexToHSL(availabilityColors['occupied'],[_0x31bbba(0x14f)]),[_0x31bbba(0x141),[_0x31bbba(0x13a),'id'],accomodation,hexToHSL(availabilityColors[_0x31bbba(0x154)],[_0x31bbba(0x14f)]),_0x31bbba(0x136)]]]]),map['setPaintProperty'](_0x31bbba(0x13c),_0x31bbba(0x11f),[_0x31bbba(0x141),[_0x31bbba(0x138),[_0x31bbba(0x13a),'id'],[_0x31bbba(0x13a),_0x31bbba(0x14b)]],_0x2a95fd[_0x31bbba(0x142)](),[_0x31bbba(0x141),[_0x31bbba(0x13a),'id'],slobodne,lightenDarkenColor(availabilityColors['occupied'],ligthPercentage),['match',[_0x31bbba(0x13a),'id'],accomodation,lightenDarkenColor(availabilityColors[_0x31bbba(0x154)],ligthPercentage),['match',['get',_0x31bbba(0x12e)],...layerColors[_0x31bbba(0x137)](...layer3),'transparent']]],['match',[_0x31bbba(0x13a),_0x31bbba(0x12e)],...layerColors[_0x31bbba(0x150)](...layer3),[_0x31bbba(0x141),[_0x31bbba(0x13a),'id'],slobodne,hexToHSL(lightenDarkenColor(availabilityColors['occupied'],ligthPercentageOccupied),[_0x31bbba(0x120)]),[_0x31bbba(0x141),['get','id'],accomodation,hexToHSL(lightenDarkenColor(availabilityColors[_0x31bbba(0x154)],ligthPercentageFree),[_0x31bbba(0x120)]),_0x31bbba(0x136)]]]]);}var djole={'getBrandName':function(_0x1d1d6b){var _0x2ef80c=_0x575785;return jole=[],pero=rezultat1[_0x2ef80c(0x124)][_0x2ef80c(0x133)]((_0xac80cf,_0x18d1a4)=>_0xac80cf['properties'][_0x2ef80c(0x14d)]==_0x1d1d6b&&_0xac80cf[_0x2ef80c(0x112)][_0x2ef80c(0x119)])[_0x2ef80c(0x14c)](_0x442c2d=>_0x442c2d[_0x2ef80c(0x112)][_0x2ef80c(0x119)]),pero[_0x2ef80c(0x139)]((_0x540868,_0x2ce3c6)=>{var _0x3d3db1=_0x2ef80c;jole[_0x3d3db1(0x10f)](_0x540868,0.8);}),jole;}};function brandNumberOpacity(_0x2ddb76){var _0x3f2e25=_0x575785;map[_0x3f2e25(0x144)](_0x3f2e25(0x155),_0x3f2e25(0x146),[_0x3f2e25(0x141),['get',_0x3f2e25(0x14d)],_0x2ddb76,0.8,0.2]);}function GPSNumberOpacity(_0x5cb8c5){var _0x16cb90=_0x575785;map['setPaintProperty'](_0x16cb90(0x155),_0x16cb90(0x146),[_0x16cb90(0x141),[_0x16cb90(0x13a),'id'],_0x5cb8c5,0.8,0.2]),map[_0x16cb90(0x144)](_0x16cb90(0x147),'icon-opacity',[_0x16cb90(0x141),[_0x16cb90(0x13a),'foreign-id'],_0x5cb8c5[_0x16cb90(0x142)](),0x1,[_0x16cb90(0x141),[_0x16cb90(0x13a),'id'],_0x5cb8c5[_0x16cb90(0x142)](),0x1,0.3]]);}function resetNumberOpacity(){var _0x4ac9ec=_0x575785;map[_0x4ac9ec(0x144)](_0x4ac9ec(0x155),_0x4ac9ec(0x146),0.8);}function NumberOpacity(){var _0x1a5e42=_0x575785;map[_0x1a5e42(0x144)](_0x1a5e42(0x155),_0x1a5e42(0x146),0.2);}function classNumberOpacity(_0x3148fa){var _0x3d46de=_0x575785;map[_0x3d46de(0x144)]('poi-numbers',_0x3d46de(0x146),[_0x3d46de(0x141),[_0x3d46de(0x13a),_0x3d46de(0x12e)],_0x3148fa,0.8,0.2]),map[_0x3d46de(0x144)](_0x3d46de(0x147),'icon-opacity',[_0x3d46de(0x141),[_0x3d46de(0x13a),_0x3d46de(0x12f)],_0x3148fa,0.8,0.2]);}function coloringFilter(_0x48e1e9){var _0xece33=_0x575785;brandNumberOpacity(_0x48e1e9['toString']()),coloringUpperLayers(),map[_0xece33(0x144)](_0xece33(0x13d),'fill-color',['match',[_0xece33(0x13a),_0xece33(0x14d)],_0x48e1e9[_0xece33(0x142)](),[_0xece33(0x141),[_0xece33(0x13a),_0xece33(0x14d)],...layerColors[_0xece33(0x125)](...layerBrands)],[_0xece33(0x141),[_0xece33(0x13a),'class'],...layerColors[_0xece33(0x143)](...layer3),['match',[_0xece33(0x13a),_0xece33(0x14d)],...layerColors['fill_gps'](...layerBrands)]]]),map[_0xece33(0x144)](_0xece33(0x13c),'line-color',[_0xece33(0x141),['get',_0xece33(0x14d)],_0x48e1e9['toString'](),[_0xece33(0x141),[_0xece33(0x13a),'brand'],...layerColors['border'](...layerBrands)],['match',['get','class'],...layerColors[_0xece33(0x150)](...layer3),[_0xece33(0x141),[_0xece33(0x13a),_0xece33(0x14d)],...layerColors[_0xece33(0x150)](...layerBrands)]]]);}function coloringFilterDate(_0x7dadd){var _0x18b1d5=_0x575785;brandNumberOpacity(_0x7dadd['toString']()),coloringUpperLayers(),map[_0x18b1d5(0x144)](_0x18b1d5(0x13d),_0x18b1d5(0x128),['match',[_0x18b1d5(0x13a),_0x18b1d5(0x12e)],...layerColors['fill_gps'](...layer3),[_0x18b1d5(0x141),[_0x18b1d5(0x13a),_0x18b1d5(0x14d)],_0x7dadd[_0x18b1d5(0x142)](),[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'id'],slobodne,availabilityColors[_0x18b1d5(0x140)],['match',[_0x18b1d5(0x13a),'id'],accomodation,availabilityColors[_0x18b1d5(0x154)],_0x18b1d5(0x136)]],[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'id'],slobodne,hexToHSL(availabilityColors[_0x18b1d5(0x140)],[_0x18b1d5(0x14f)]),[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'id'],accomodation,hexToHSL(availabilityColors['free'],['gps']),_0x18b1d5(0x136)]]]]),map['setPaintProperty'](_0x18b1d5(0x13c),_0x18b1d5(0x11f),[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'class'],...layerColors[_0x18b1d5(0x150)](...layer3),[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'brand'],_0x7dadd['toString'](),[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'id'],slobodne,lightenDarkenColor(availabilityColors['occupied'],ligthPercentage),[_0x18b1d5(0x141),['get','id'],accomodation,lightenDarkenColor(availabilityColors['free'],ligthPercentage),_0x18b1d5(0x136)]],[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'id'],slobodne,hexToHSL(lightenDarkenColor(availabilityColors[_0x18b1d5(0x140)],ligthPercentageOccupied),[_0x18b1d5(0x120)]),[_0x18b1d5(0x141),[_0x18b1d5(0x13a),'id'],accomodation,hexToHSL(lightenDarkenColor(availabilityColors[_0x18b1d5(0x154)],ligthPercentageFree),[_0x18b1d5(0x120)]),_0x18b1d5(0x136)]]]]);}function _0x1dcf(_0x2d07a3,_0x594416){var _0x35874c=_0x3587();return _0x1dcf=function(_0x1dcfa3,_0x298b5b){_0x1dcfa3=_0x1dcfa3-0x10f;var _0x416a24=_0x35874c[_0x1dcfa3];return _0x416a24;},_0x1dcf(_0x2d07a3,_0x594416);}function coloringClassesDate(_0x5ecf27){var _0x33319e=_0x575785;classNumberOpacity(_0x5ecf27),coloringUpperLayers();var _0x2d62d7=[_0x5ecf27[_0x33319e(0x142)](),_0x5ecf27['toString']()+'\x20roof1',_0x5ecf27['toString']()+_0x33319e(0x130)];_0x5ecf27=='objekt\x20lezaljke'&&(map['setPaintProperty'](_0x33319e(0x13d),'fill-color',[_0x33319e(0x141),['get',_0x33319e(0x12e)],...layerColors[_0x33319e(0x143)](...layer3['filter'](_0x30e7b5=>_0x30e7b5!='objekt\x20lezaljke')),[_0x33319e(0x141),['get',_0x33319e(0x12e)],_0x5ecf27,[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,availabilityColors[_0x33319e(0x140)],[_0x33319e(0x141),[_0x33319e(0x13a),'id'],accomodation,availabilityColors[_0x33319e(0x154)],_0x33319e(0x136)]],[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,hexToHSL(availabilityColors[_0x33319e(0x140)],[_0x33319e(0x14f)]),[_0x33319e(0x141),[_0x33319e(0x13a),'id'],accomodation,hexToHSL(availabilityColors[_0x33319e(0x154)],['gps']),_0x33319e(0x136)]]]]),map[_0x33319e(0x144)]('layer3_border','line-color',['match',[_0x33319e(0x13a),_0x33319e(0x12e)],...layerColors[_0x33319e(0x150)](...layer3['filter'](_0xdd04a0=>_0xdd04a0!='objekt\x20lezaljke')),[_0x33319e(0x141),[_0x33319e(0x13a),_0x33319e(0x12e)],_0x5ecf27,[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,lightenDarkenColor(availabilityColors['occupied'],ligthPercentage),[_0x33319e(0x141),[_0x33319e(0x13a),'id'],accomodation,lightenDarkenColor(availabilityColors[_0x33319e(0x154)],ligthPercentage),_0x33319e(0x136)]],[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,hexToHSL(lightenDarkenColor(availabilityColors[_0x33319e(0x140)],ligthPercentageOccupied),[_0x33319e(0x120)]),['match',[_0x33319e(0x13a),'id'],accomodation,hexToHSL(lightenDarkenColor(availabilityColors[_0x33319e(0x154)],ligthPercentageFree),[_0x33319e(0x120)]),_0x33319e(0x136)]]]])),_0x5ecf27=='objekt\x20suncobran'&&(map[_0x33319e(0x144)](_0x33319e(0x13d),'fill-color',[_0x33319e(0x141),['get',_0x33319e(0x12e)],...layerColors[_0x33319e(0x143)](...layer3[_0x33319e(0x133)](_0x5dbb37=>_0x5dbb37!=_0x33319e(0x13f))),[_0x33319e(0x141),[_0x33319e(0x13a),_0x33319e(0x12e)],_0x5ecf27,[_0x33319e(0x141),['get','id'],slobodne,availabilityColors[_0x33319e(0x140)],['match',[_0x33319e(0x13a),'id'],accomodation,availabilityColors[_0x33319e(0x154)],'transparent']],[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,hexToHSL(availabilityColors[_0x33319e(0x140)],['gps']),['match',['get','id'],accomodation,hexToHSL(availabilityColors[_0x33319e(0x154)],[_0x33319e(0x14f)]),_0x33319e(0x136)]]]]),map[_0x33319e(0x144)](_0x33319e(0x13c),_0x33319e(0x11f),[_0x33319e(0x141),[_0x33319e(0x13a),_0x33319e(0x12e)],...layerColors[_0x33319e(0x150)](...layer3[_0x33319e(0x133)](_0x210c3b=>_0x210c3b!='objekt\x20suncobran')),['match',['get','class'],_0x5ecf27,[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,lightenDarkenColor(availabilityColors[_0x33319e(0x140)],ligthPercentage),['match',['get','id'],accomodation,lightenDarkenColor(availabilityColors[_0x33319e(0x154)],ligthPercentage),_0x33319e(0x136)]],[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,hexToHSL(lightenDarkenColor(availabilityColors[_0x33319e(0x140)],ligthPercentageOccupied),[_0x33319e(0x120)]),[_0x33319e(0x141),['get','id'],accomodation,hexToHSL(lightenDarkenColor(availabilityColors[_0x33319e(0x154)],ligthPercentageFree),[_0x33319e(0x120)]),'transparent']]]])),_0x5ecf27!=_0x33319e(0x126)&&_0x5ecf27!=_0x33319e(0x13f)&&(map[_0x33319e(0x144)]('layer3_fill',_0x33319e(0x128),['match',[_0x33319e(0x13a),'class'],_0x2d62d7,['match',['get',_0x33319e(0x12e)],...layerColors[_0x33319e(0x125)](...layer3),_0x33319e(0x136)],[_0x33319e(0x141),[_0x33319e(0x13a),_0x33319e(0x12e)],...layerColors[_0x33319e(0x143)](...layer3),[_0x33319e(0x141),[_0x33319e(0x13a),'id'],slobodne,hexToHSL(availabilityColors[_0x33319e(0x140)],[_0x33319e(0x14f)]),[_0x33319e(0x141),[_0x33319e(0x13a),'id'],accomodation,hexToHSL(availabilityColors[_0x33319e(0x154)],['gps']),_0x33319e(0x136)]]]]),map[_0x33319e(0x144)](_0x33319e(0x13c),_0x33319e(0x11f),[_0x33319e(0x141),[_0x33319e(0x13a),_0x33319e(0x12e)],_0x2d62d7,[_0x33319e(0x141),[_0x33319e(0x13a),_0x33319e(0x12e)],...layerColors[_0x33319e(0x137)](...layer3),'transparent'],[_0x33319e(0x141),[_0x33319e(0x13a),_0x33319e(0x12e)],...layerColors[_0x33319e(0x150)](...layer3),['match',['get','id'],slobodne,hexToHSL(lightenDarkenColor(availabilityColors['occupied'],ligthPercentageOccupied),[_0x33319e(0x120)]),[_0x33319e(0x141),['get','id'],accomodation,hexToHSL(lightenDarkenColor(availabilityColors[_0x33319e(0x154)],ligthPercentageFree),[_0x33319e(0x120)]),_0x33319e(0x136)]]]]));}function coloringLezljke(){var _0x4997bf=_0x575785;map[_0x4997bf(0x144)](_0x4997bf(0x13d),_0x4997bf(0x128),[_0x4997bf(0x141),[_0x4997bf(0x13a),'id'],lezaljke,availabilityColors[_0x4997bf(0x140)],[_0x4997bf(0x141),[_0x4997bf(0x13a),'id'],lezaljke,availabilityColors[_0x4997bf(0x154)],_0x4997bf(0x136)]]);}function resetColoringFilterDate(){var _0x7ef1a=_0x575785;resetNumberOpacity(),resetingColors(),showInterestPointsAll(),map[_0x7ef1a(0x144)](_0x7ef1a(0x13d),_0x7ef1a(0x128),[_0x7ef1a(0x141),['get',_0x7ef1a(0x12e)],...layerColors[_0x7ef1a(0x125)](...layer3),[_0x7ef1a(0x141),['get','id'],slobodne,availabilityColors[_0x7ef1a(0x140)],['match',['get','id'],accomodation,availabilityColors[_0x7ef1a(0x154)],'transparent']]]),map['setPaintProperty'](_0x7ef1a(0x13c),_0x7ef1a(0x11f),[_0x7ef1a(0x141),['get',_0x7ef1a(0x12e)],...layerColors['border'](...layer3),[_0x7ef1a(0x141),['get','id'],slobodne,lightenDarkenColor(availabilityColors[_0x7ef1a(0x140)],ligthPercentage),['match',[_0x7ef1a(0x13a),'id'],accomodation,lightenDarkenColor(availabilityColors[_0x7ef1a(0x154)],ligthPercentage),_0x7ef1a(0x136)]]]);}function poiResetColoringFilterDate(){var _0x1d7547=_0x575785;NumberOpacity(),coloringUpperLayers(),map[_0x1d7547(0x144)](_0x1d7547(0x13d),'fill-color',[_0x1d7547(0x141),['get',_0x1d7547(0x12e)],...layerColors[_0x1d7547(0x143)](...layer3),[_0x1d7547(0x141),[_0x1d7547(0x13a),'id'],slobodne,hexToHSL(availabilityColors[_0x1d7547(0x140)],['gps']),[_0x1d7547(0x141),['get','id'],accomodation,hexToHSL(availabilityColors['free'],[_0x1d7547(0x14f)]),_0x1d7547(0x136)]]]),map[_0x1d7547(0x144)]('layer3_border','line-color',[_0x1d7547(0x141),['get',_0x1d7547(0x12e)],...layerColors['border_gps'](...layer3),[_0x1d7547(0x141),[_0x1d7547(0x13a),'id'],slobodne,hexToHSL(lightenDarkenColor(availabilityColors[_0x1d7547(0x140)],ligthPercentageOccupied),['gps_border']),[_0x1d7547(0x141),[_0x1d7547(0x13a),'id'],accomodation,hexToHSL(lightenDarkenColor(availabilityColors[_0x1d7547(0x154)],ligthPercentageFree),[_0x1d7547(0x120)]),_0x1d7547(0x136)]]]);}function poiResetColoringFilter(){var _0x3356b1=_0x575785;NumberOpacity(),coloringUpperLayers(),map[_0x3356b1(0x144)](_0x3356b1(0x13d),_0x3356b1(0x128),[_0x3356b1(0x141),[_0x3356b1(0x13a),_0x3356b1(0x12e)],...layerColors[_0x3356b1(0x143)](...layer3),[_0x3356b1(0x141),[_0x3356b1(0x13a),_0x3356b1(0x14d)],...layerColors[_0x3356b1(0x143)](...layerBrands)]]),map[_0x3356b1(0x144)](_0x3356b1(0x13c),_0x3356b1(0x11f),[_0x3356b1(0x141),[_0x3356b1(0x13a),_0x3356b1(0x12e)],...layerColors['border_gps'](...layer3),[_0x3356b1(0x141),[_0x3356b1(0x13a),_0x3356b1(0x14d)],...layerColors[_0x3356b1(0x150)](...layerBrands)]]);}function coloringClasses(_0x43a437){var _0x56658a=_0x575785;classNumberOpacity(_0x43a437),coloringUpperLayers();var _0x1cbdbc=[_0x43a437[_0x56658a(0x142)](),_0x43a437[_0x56658a(0x142)]()+_0x56658a(0x135),_0x43a437[_0x56658a(0x142)]()+_0x56658a(0x130)];map[_0x56658a(0x144)](_0x56658a(0x13d),_0x56658a(0x128),['match',[_0x56658a(0x13a),_0x56658a(0x12e)],_0x1cbdbc,[_0x56658a(0x141),[_0x56658a(0x13a),_0x56658a(0x12e)],...layerColors[_0x56658a(0x125)](...layer3),_0x56658a(0x136)],[_0x56658a(0x141),[_0x56658a(0x13a),_0x56658a(0x12e)],...layerColors[_0x56658a(0x143)](...layer3),[_0x56658a(0x141),[_0x56658a(0x13a),_0x56658a(0x14d)],...layerColors['fill_gps'](...layerBrands)]]]),map[_0x56658a(0x144)](_0x56658a(0x13c),_0x56658a(0x11f),[_0x56658a(0x141),[_0x56658a(0x13a),'class'],_0x1cbdbc,[_0x56658a(0x141),['get',_0x56658a(0x12e)],...layerColors[_0x56658a(0x137)](...layer3),_0x56658a(0x136)],['match',[_0x56658a(0x13a),_0x56658a(0x12e)],...layerColors['border_gps'](...layer3),[_0x56658a(0x141),[_0x56658a(0x13a),_0x56658a(0x14d)],...layerColors[_0x56658a(0x150)](...layerBrands)]]]);}function coloringAvailable(){var _0x540dd4=_0x575785;map['setPaintProperty'](_0x540dd4(0x13d),_0x540dd4(0x128),[_0x540dd4(0x141),['get','class'],...layerColors['fill'](...layer3[_0x540dd4(0x133)](_0x2627f9=>_0x2627f9!=_0x540dd4(0x126)&&_0x2627f9!=_0x540dd4(0x13f))),['match',[_0x540dd4(0x13a),'id'],slobodne,availabilityColors[_0x540dd4(0x140)],[_0x540dd4(0x141),[_0x540dd4(0x13a),'id'],naUpitSmjestaji_Sve,availabilityColors[_0x540dd4(0x11d)],[_0x540dd4(0x141),['get','id'],accomodation,availabilityColors[_0x540dd4(0x154)],_0x540dd4(0x136)]]]]),map[_0x540dd4(0x144)](_0x540dd4(0x13c),_0x540dd4(0x11f),[_0x540dd4(0x141),[_0x540dd4(0x13a),_0x540dd4(0x12e)],...layerColors[_0x540dd4(0x137)](...layer3['filter'](_0x40cb29=>_0x40cb29!=_0x540dd4(0x126)&&_0x40cb29!=_0x540dd4(0x13f))),['match',[_0x540dd4(0x13a),'id'],slobodne,lightenDarkenColor(availabilityColors[_0x540dd4(0x140)],ligthPercentage),[_0x540dd4(0x141),[_0x540dd4(0x13a),'id'],naUpitSmjestaji_Sve,lightenDarkenColor(availabilityColors[_0x540dd4(0x11d)],ligthPercentage),[_0x540dd4(0x141),['get','id'],accomodation,lightenDarkenColor(availabilityColors[_0x540dd4(0x154)],ligthPercentage),_0x540dd4(0x136)]]]]);}function _0x3587(){var _0x2ef98d=['\x20roof2','9987775nUEEYd','values','filter','max','\x20roof1','transparent','border','concat','forEach','get','13426ypVtHR','layer3_border','layer3_fill','zona','objekt\x20suncobran','occupied','match','toString','fill_gps','setPaintProperty','obala','text-opacity','poi','layer2_border','zemlja','exec','foreign-key','map','brand','layer1_border','gps','border_gps','keys','layer2_fill','4160064pFgmUQ','free','poi-numbers','push','ceil','276FcOvQp','properties','rub','includes','parcela','9365440tsTsgw','cesta','color','number','getLayer','layer1_fill','trava','naupit','deg,\x20','line-color','gps_border','1060020Eqnclo','15KsvnaX','glamping','features','fill','objekt\x20lezaljke','1661742pSoqmC','fill-color','84717TRgUSU','length','slice','440WLdtxS','min','class','icon'];_0x3587=function(){return _0x2ef98d;};return _0x3587();}

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

  function getBrandBadge(name) {
    if (typeof brandColors[name] == "undefined") {
      return ""
    } else {
      return `<div class="brand-badge" style="background:${brandColors[name][0]["color"]};border:2px solid ${hexToHSL(brandColors[name][0]["color"], "border")}">${name}</div>`
    }
  }

  function getAvailability(name) {
    if (slobodne != undefined) {
      if ($(".is-start-date") && $(".is-start-date").html() != undefined) {
        if (slobodne.includes(name)) {
          // $(".selected-date").addClass("unavailable")
          return `<span class="availability unavailable">${translations["Accomodation availability"][0][lng]} ${translations["Unavailable"][0][lng]}</span>`
        }
        if (!slobodne.includes(name) && accomodation.includes(name)) {
          return `<span class="availability available">${translations["Accomodation availability"][0][lng]} ${translations["Available"][0][lng]}</span>`
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
          return `<span class="availability unavailable">${translations["Lounger availability"][0][lng]} ${translations["Unavailable"][0][lng]}</span><spanclass="book-lounger not-available">Book now</span>`
        }
        if (!slobodne.includes(name) && accomodation.includes(name)) {
          return `<span class="availability available">${translations["Lounger availability"][0][lng]} ${translations["Available"][0][lng]}</span><span class="book-lounger">Book now</span>`
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
          return `<span class="availability unavailable">${translations["Umbrella availability"][0][lng]} ${translations["Unavailable"][0][lng]}</span><span class="book-lounger not-available">Book now</span>`
        }
        if (!slobodne.includes(name) && accomodation.includes(name)) {
          return `<span class="availability available">${translations["Umbrella availability"][0][lng]} ${translations["Available"][0][lng]}</span><span class="book-lounger">Book now</span>`
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
    if (typeof name !== "undefined" && name["Working Hours"] !== undefined) {
      var tmp = name["Working Hours"]
      var rez = _RadnoVrijeme(tmp, lng)

      var slijedecidan;
      rez.status === 'open' ? slijedecidan = translations['danas'][0][lng] : slijedecidan = translations[rez.slijedecidan][0][lng]
      var bla
      if (tmp !== undefined) {
        if (rez.zatvaramo === '' && rez.otvaramo === '') {
          bla = ''
        } else {
          bla = rez.status === 'open' ?
            (rez.zatvaramo === '' ? '' : translations['Closing'][0][lng] + ' ' + rez.zatvaramo) :
            translations['Opening'][0][lng] + ' ' + rez.otvaramo;
        }

        if (recommended == "recommended") {
          return `<div id="openTag" class="${rez.status}">${translations[(rez.status).substr(0, 1).toUpperCase() + (rez.status).substr(1)][0][lng]}</div>
                <div id="closeTag" class=${rez.status === 'open' ? "closing" : ""}>${bla}</div>`
        } else {
          return `<div id="openTag" class="${rez.status}">${translations[(rez.status).substr(0, 1).toUpperCase() + (rez.status).substr(1)][0][lng]}</div>
        <div id="closeTag" class=${rez.status === 'open' ? "closing" : ""}>${bla}</div>
        <div id="workHors">${translations['Working hours'][0][lng] + slijedecidan + ': <b>' + rez.vrijemedo}</b></div>`
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

    $("body").append(`<div class="languages"><h3 class="languages-header">${translations["Select language"][0][lng]}</h3><span class="lang-list"><div data-lang="en"></div><div data-lang="hr"></div><div data-lang="it"></div><div data-lang="de"></div><div data-lang="nl"></div><div data-lang="si"></div><div data-lang="pl"></div></div></span></div>`)

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
      $(".languages-header").text(`${translations["Select language"][0][lng]}`)
      $(".languages div").removeAttr("class")
      $(this).addClass("active")
      $(".languages").toggleClass("open");
      $("#navigateTo span").text(`${translations["Take me"][0][lng]}`)
      $("#filter").text(`${translations["Filter"][0][lng]}`)

      $("[data-id=accomodation]").text(`${translations["Accomodation"][0][lng]}`)
      $("[data-id=facilities]").text(`${translations["Facilities"][0][lng]}`)
      $("[data-caption=Pitch]").text(`${translations["Pitch"][0][lng]}`)
      $("[data-caption=MH]").text(`${translations["MH"][0][lng]}`)
      $("[data-caption=Glamping]").text(`${translations["Glamping"][0][lng]}`)
      $("[data-caption=Caravan]").text(`${translations["Caravan"][0][lng]}`)
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

      if (joskoDva.length > 0) {
        var filterParcele = document.createElement("div");
        filterParcele.classList.add("facilities-caption")
        filterParcele.setAttribute("data-caption", "Main")
        filterParcele.innerHTML = translations["Main"][0][lng]
        $(".facilities").append(filterParcele)
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
        filterParcele.innerHTML = translations["POI"][0][lng]
        $(".facilities").append(filterParcele)
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

      $("#informations").text(`${translations["Informations"][0][lng]}`)
      $("#dimensions").text(`${translations["Dimensions"][0][lng]}`)
      $("#area").text(`${translations["Area"][0][lng]}`)
      $("#distance").text(`${translations["Distance from the sea"][0][lng]}`)
      $(".amenities").html(`<p id="amenities">${translations["Amenities"][0][lng]}</p>`)
      // $("#amenities").text(``)
      $("#searchHeader").text(`${translations["Search"][0][lng]}`)
      $("#search").attr("placeholder", `${translations["Search placeholder"][0][lng]}...`)
      $("#viewall").text(`${translations["Reset"][0][lng]}`)

      if ($(e.target).data("lang") != lngCheck) {
        $('#booknowtraka').text(translations['Book now'][0][lng]);
        // var lngImg = $("<img/>",{src:`assets/img/flags/${lng}.svg`})
        $("body").append(`
      <div class="annotation language">
        <h3>${translations["Language changed"][0][lng]}</h3>
        <div class="message">
          <span class="filter-square"><img src="assets/img/flags/${lng}.svg"></span>
          <p>${translations["Language changed to"][0][lng]}</p>
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

    $("#navigateTo span").text(`${translations["Take me"][0][lng]}`)
    $("#filter").text(`${translations["Filter"][0][lng]}`)
    $("#informations").text(`${translations["Informations"][0][lng]}`)
    $("#dimensions").text(`${translations["Dimensions"][0][lng]}`)
    $("#area").text(`${translations["Area"][0][lng]}`)
    $("#distance").text(`${translations["Distance from the sea"][0][lng]}`)
    $(".amenities").html(`<p id="amenities">${translations["Amenities"][0][lng]}</p>`)
    $("#searchHeader").text(`${translations["Search"][0][lng]}`)
    $("#search").attr("placeholder", `${translations["Search placeholder"][0][lng]}...`)

    $(".delete").on("click", function() {
      $(".found").remove()
      $(".recommended").remove()
      $(".recommandations-container").remove()
      $("#match-list").before(`<div class='recommended'>${translations["Recommended"][0][lng]}</div>`)
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
        $(".mapboxgl-ctrl-geolocate").html(`${translations["Return view"][0][lng]}<img src='assets/img/gps-arrow.svg'>`);
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
          ], 19, iconZoomSize
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
          $("body").append(`<div class="annotation"><h3>${translations["Imporant message"][0][lng]}</h3><p>${translations["Navigation not available"][0][lng]}</p><div class="annotation-buttons"><div class="confirm">${translations["Fine"][0][lng]}</div></div></div>`)

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
          map.rotateTo((timestamp / 100) % 360, {
            duration: 0
          });
          requestAnimationFrame(rotateCamera);
        }

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
        $(createFilterHeader).append(`<div id="filter">${translations["Filter"][0][lng]}</div>`)

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
              filterParcele.innerHTML = translations["Pitch"][0][lng]
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
              filterParcele.innerHTML = translations["MH"][0][lng]
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
              filterParcele.innerHTML = translations["Glamping"][0][lng]
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
              filterParcele.innerHTML = translations["Caravan"][0][lng]
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
        var jolimirABC = []
        joskoDva = joskoDva.sort(function(a, b) {
          return (poiLabels[filterObjects[a][0].icon][0][lng] < poiLabels[filterObjects[b][0].icon][0][lng]) ? -1 : (poiLabels[filterObjects[a][0].icon][0][lng] > poiLabels[filterObjects[b][0].icon][0][lng]) ? 1 : 0;
        })
        if (joskoDva.length > 0) {
          var filterParcele = document.createElement("div");
          filterParcele.classList.add("facilities-caption")
          filterParcele.setAttribute("data-caption", "Main")
          filterParcele.innerHTML = translations["Main"][0][lng]
          createFacilities.appendChild(filterParcele)
          joskoDva.forEach((item, index) => {

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

          })
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

          var filterParcele = document.createElement("div");
          filterParcele.classList.add("facilities-caption")
          filterParcele.setAttribute("data-caption", "POI")
          filterParcele.innerHTML = translations["POI"][0][lng]
          createFacilities.appendChild(filterParcele)
          joskoDvaIkonice.forEach((item, index) => {
            if (_POSTAVKE_KAMPA_.sortFilterByRb === '1') {
              _item_ = item.name
            } else {
              _item_ = item
            }
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
            createFacilities.appendChild(filters)
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
        var filterText = document.createTextNode(`${translations["Reset"][0][lng]}`)
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
        test += `<div class="w-heading">${translations["Weather"][0][lng]}</div><div class="weather-day">
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
  var routingMessage = `<div class="annotation route"><p>${translations["Route message"][0][lng]}</p>${routingSpinner[0].outerHTML}</div>`

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
        $("body").append(`<div class="annotation"><h3>${translations["Imporant message"][0][lng]}</h3><p>${translations["Navigation not available"][0][lng]}</p><div class="annotation-buttons"><div class="confirm">${translations["Fine"][0][lng]}</div></div></div>`)

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

    popupDiv = `<button class="btn btn-outline-secondary" id="navigateToPoi"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`;

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
            .setHTML(`<h3>${getTranslation}${dev_env ? e.features[0].properties.id : ''}</h3>${!userLocation ? "<span class='col-sm-12 navigation-denied'>" + translations["Navigation not available"][0][lng] + "</span>" : ""}${popupDiv}`)
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
        .setHTML(`<h3>${translations["Loungers"][0][lng]}</h3><span class="lounger-price">9,99€/day</span>
      ${$("#date").is(".active") ? getAvailabilityLounger(gpsParcela.toString()) : "<span class='check-lounger'>You can check availability of a lounger by selecting dates.</span>"}
      ${!userLocation ? "<span class='col-sm-12 navigation-denied'>" + translations["Navigation not available"][0][lng] + "</span>" : ""}<button class="btn btn-outline-secondary" id="navigateToLezaljke"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`)
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
        .setHTML(`<h3>${translations["Umbrella"][0][lng]}</h3><span class="lounger-price">9,99€/day</span>
      ${$("#date").is(".active") ? getAvailabilityUmbrella(gpsParcela.toString()) : "<span class='check-lounger'>You can check availability of an umbrella by selecting dates.</span>"}
      ${!userLocation ? "<span class='col-sm-12 navigation-denied'>" + translations["Navigation not available"][0][lng] + "</span>" : ""}<button class="btn btn-outline-secondary" id="navigateToLezaljke"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`)
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
          $("#udaljenostmore").text(`${translations["Distance sea not available"][0][lng]}`);
        }

        $(".amenities").html(`<p id="amenities">${translations["Amenities"][0][lng]}</p>`)
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
          let parametriParcele, podacioParceli;
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

            $("#osuncanost").text(`${translations["Sunqty"][0][lng]}`);
            if (podacioParceli.osuncanost === 'PAUŠAL') {
              $("#osuncanost").text(`${translations["Flatrate"][0][lng]}`);
            }

            if (podacioParceli.osuncanost != 0 && podacioParceli.osuncanost != '' && podacioParceli.osuncanost != undefined) {
              $("#osuncanostdata").text(translations[podacioParceli.osuncanost][0][lng]);
            } else {
              $("#osuncanostdata").text('-');
            }

            $("#brojosoba").text(`${translations["dozvoljenoosoba"][0][lng]}`);

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
              $("#podatak_napomenap").text(translations['note'][0][lng]);
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
            document.getElementById("bukiraj").disabled = true;
            //$("#brojparcele").html(`<div class="info-left"><div class="acc-name">${lang1} ${podacioParceli.broj ? podacioParceli.broj : ""}${dev_env ? " (" + mapaId_dev + " "+ podacioParceli.brojMISH + ")" : ""}${label1 != undefined ? label1 : ""}</div>${getAccType(type1)}${getBrandBadge(brand1)}`);
            $('.acc-name').after(`${getAccType(type1)}${getBrandBadge(brand1)}`);
            $('.acc-name').text(`${lang1} ${podacioParceli.broj ? podacioParceli.broj : ""}${dev_env ? " (" + mapaId_dev + " "+ podacioParceli.brojMISH + ")" : ""}${label1 != undefined ? label1 : ""}`);
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
              $('.priceeur').text(((_PRICES_PER_STAY_[podacioParceli.tipMISH] != undefined) ?_PRICES_PER_STAY_[podacioParceli.tipMISH].price : '-') + '€')
            } else {
              $('.priceeur').text('-€')
            };
            $('.oddana').text(`${translations['totalperstay'][0][lng]}`)
            //$('.nights').text('1 ' + `${translations['Nights'][0][lng][0]}`)
            $('.nights').text(`${translations['perstay'][0][lng]}`)
            $('.date').text(`${moment(danas).format("DD.MM.YYYY.")} - ${moment(danas).add(1, 'd').format("DD.MM.YYYY.")}`);
            getAmenities(amenities1)
            $('#amenities').css('visibility', 'visible')
            if (amenities1.length === 0) {
              $('#amenities').css('visibility', 'hidden')
            }

            if (podacioParceli.noclick === '1') return false;

            //test

            $('#containerParcela').html(`<div class="swiper mySwiper">
            <div class="swiper-wrapper">
    
            </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-pagination"></div>
            </div>`)

            //botun za otvoriti panoramu
            $("#containerParcela").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
            if (panomPhotoUrl != '' && panomPhotoUrl != null) {
              if (_PARAMETRI_KAMPA.prikazi360Botun != 'false') {
                $("#containerParcela").append(`<div class="show-pitch panom">360&deg;</div>`);
              }
              
            }

            $(document).on('click', '.show-pitch.panom', function() {
              let iframeSrcPanorama = panomPhotoUrl;
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

            var imgArray = [];

            if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
              arraySlikaSlider.forEach((element) => {
                imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + element + '" data-lightbox="roadtrip" /></div>');
              });
            } else {
              //ako nema definiranu sliku za parcelu uzmi default od tipa parcele
              //ako uopce postoje default slike za parcelu

              let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
              //console.log('slika', pomocVrstaSlike)
              if (pomocVrstaSlike != undefined && pomocVrstaSlike.images.length) {
                pomocVrstaSlike.images.forEach((element) => {
                  imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimg" style="display: none" href="' + element + '" data-lightbox="roadtrip" /></div>');
                });
              } else {
                //postavi logo u slider
                imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip" /></div>');
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
            //krajtest

            $('#ModalParcela').modal('show');
            $("#ModalParcela").attr("broj", number1)
            $("#ModalParcela").attr("klasa", klasa11)
            $("#ModalParcela").attr("draw", draw1)
            $("#ModalParcela").attr("naupit", podacioParceli.samoNaUpit)


            let bukirajButton = document.getElementById('bukiraj');
            bukirajButton.innerText = translations['Book now'][0][lng];

            if (podacioParceli.samoNaUpit === '1') {
              bukirajButton.innerText = translations['SendQuery'][0][lng];
            }

            if (klasa.split(" ")[0] != "objekt") {
              var danas = new Date(paramZaBooking.datumOd)
              var sutra = new Date(paramZaBooking.datumOd)
              sutra.setDate(sutra.getDate() + paramZaBooking.brojDana)
              //sutra.add(paramZaBooking.brojDana, 'days');

              //$("#brojparcele").append(`<div class="modal-price"><div class="price"><p>99€</p><small>1 ${translations["Nights"][0][lng][0]}</small></div><div class="price-info"><div class="date">${moment(danas).format("DD.MM.YYYY.")} - ${moment(sutra).format("DD.MM.YYYY.")}</div><button id="bukiraj" class="book">${translations["Book now"][0][lng]}</button></div></div>`)
              if (slobodne != undefined) {
                if (phobsDatumOd != '') {
                  //if ($(".is-start-date") && $(".is-start-date").html() != undefined) {
                  if (flag_SAMO_NA_UPIT) {
                    $("#brojparcele").append(`<div class='selected-date'>${translations["Send query info"][0][lng]}</div>`)
                  } else {
                    $("#brojparcele").append(`<div class='selected-date'>${translations["Accomodation availability"][0][lng]} <span class='start-date'></span> - <span class='end-date'></span> <span class='available-date'></span></div>`)
                  }
                  $('.date').text(`${moment(danas).format("DD.MM.YYYY.")} - ${moment(sutra).format("DD.MM.YYYY.")}`);
                  $(".selected-date .start-date").html(moment($(".is-start-date").data("time")).format('DD.MM.YYYY.'))
                  $(".selected-date .end-date").html(moment($(".is-end-date").data("time")).format('DD.MM.YYYY.'))
                  if (slobodne.includes(gpsParcela)) {
                    document.getElementById("bukiraj").disabled = true;
                    $(".selected-date").addClass("unavailable")
                    $(".selected-date .available-date").html(`${translations["Unavailable"][0][lng]}`)
                    $(".modal-price").css("opacity", "0.5")
                  } else {
                    document.getElementById("bukiraj").disabled = false;
                    $(".selected-date").addClass("available")
                    $(".modal-price").css("opacity", "1")
                    $(".selected-date .available-date").html(`${translations["Available"][0][lng]}`)

                    if (podacioParceli.pausal === '1') {
                      document.getElementById("bukiraj").disabled = true;
                      bukirajButton.innerText = translations['Flatrate'][0][lng];
                      $(".modal-price").css("opacity", "0.5")
                      $(".selected-date").removeClass("available")
                      $(".selected-date").addClass("unavailable")
                      //$(".selected-date .available-date").html('')
                      //$(".selected-date .available-date").html(`${translations["FlatratePoruka"][0][lng]}`)
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
        $("#udaljenostmore").text(`${translations["Distance sea not available"][0][lng]}`);
      }

      $(".amenities").html(`<p id="amenities">${translations["Amenities"][0][lng]}</p>`)
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

          hideLoader();

          $("#podatak_prvi").text(translations['RadnoVrijeme'][0][lng]);
          $("#podatak_prvi_data").text(podacioParceli.radno_vrijeme);

          $("#kontakt").text(translations['kontakt'][0][lng]);
          $("#kontakt_data").text(podacioParceli.telefon);

          $("#mail").text(translations['email'][0][lng]);
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
            $("#podatak_napomena").text(translations['note'][0][lng]);
            $("#podataka_napomena_data").text(napomenaModal);
            $("#notesdivObjekt").css("display", "none");
          }

          $("#ocjenik").text(translations['cjenik'][0][lng]);
          $("#owww").text(translations['www'][0][lng]);
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

          /*pannellum*/

          $('#containerObjekt').html(`<div class="swiper mySwiper">
          <div class="swiper-wrapper">
    
          </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>`)

          //botun za otvoriti panoramu
          $("#containerObjekt").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
          if (panomPhotoUrlObjekt != '') {
            $("#containerObjekt").append(`<div class="show-pitch panom">360&deg;</div>`);
          }

          $(".show-pitch.panom").on("click", function() {
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


          var imgArray = [];

          if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
            arraySlikaSlider.forEach((element) => {
              imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + element + '" data-lightbox="roadtrip" /></div>');
            });
          } else {
            //ako nema definiranu sliku za parcelu uzmi default od tipa parcele
            //ako uopce postoje default slike za parcelu

            let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
            if (pomocVrstaSlike != undefined) {
              pomocVrstaSlike.images.forEach((element) => {
                imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + element + '" data-lightbox="roadtrip" /></div>');
              });
            } else {
              //postavi logo u slider
              imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip" /></div>');
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
          /*kraj pannellum*/

          lang1 = naslovModalaObjekt(podacioParceli.vrstaObjekta, lng);

          $("body").addClass("modal-parcela")
          $("#brojObjekta").html(`<div class="info-left"><div class="acc-name">${lang1} ${((podacioParceli.naziv) && (podacioParceli.naziv != '-')) ? podacioParceli.naziv : ""}${dev_env ? " (" + mapaId_dev + ")" : ""}</div>
    ${getAccType(type1)}
    ${getBrandBadge(brand1)}
    `);

          getAmenitiesObjekt(amenities1)
          $("#informationsobjekt").text(`${translations["Informations"][0][lng]}`);
          $('#ModalObjekt').modal('show');
          $("#ModalObjekt").attr("broj", number1)
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
    var tmpParcelaNaziv = $(this).attr("klasa");
    var panomFolder = "images222/"
    var panomSource = panomFolder + KojiPanom(tmpParcela, tmpParcelaNaziv);

    draw = $(this).attr("draw")

    if (typeof draw !== "undefined") {
      draw = draw.replaceAll("p", "pitch")
      draw = draw.replaceAll("y", "yaw")
      draw = JSON.parse(draw)
    } else {
      draw = false
    }

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
    $(".pnlm-load-box p:first-of-type").html(`${translations["Loading"][0][lng]}...`)
    $(".modal-header button.close").animate({
      opacity: "1"
    }, 500)

    viewera.on("load", function() {

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

        $("#containerParcela").append(`<div class="show-pitch">${translations["Show pitch"][0][lng]}</div>`)
        $(".show-pitch").on("click", function() {
          var hotspotsLoaded = false
          $(this).toggleClass("hide-pitch")
          if ($(this).is(".hide-pitch")) {
            viewera.setPitch(0);
            viewera.setYaw(355)
            $("#ctx").show()
            $(".show-pitch").html(`${translations["Hide pitch"][0][lng]}`)
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
            $(this).html(`${translations["Show pitch"][0][lng]}`)
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
        $("#ModalParcela #feature-info .brojParcele").before($(`<div class="col-sm-12 navigation-denied">${translations["Navigation not available"][0][lng]}</div>`))
      }
      $("#navigateTo").css("opacity", "0.5")
      $("#navigateTo").css("pointer-events", "none")
    }

    viewera.on('error',
      function() {
        viewera.destroy();

        $('#containerParcela').html(`<div class="swiper mySwiper">
        <div class="swiper-wrapper">

        </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>`)

        //botun za otvoriti panoramu
        $("#containerParcela").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
        if (panomPhotoUrl != '' && panomPhotoUrl != null) {
          $("#containerParcela").append(`<div class="show-pitch panom">360&deg;</div>`);
        }

        $(document).on('click', '.show-pitch.panom', function() {
          let iframeSrcPanorama = panomPhotoUrl;
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

        var imgArray = [];

        if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
          arraySlikaSlider.forEach((element) => {
            imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + element + '" data-lightbox="roadtrip" /></div>');
          });
        } else {
          //ako nema definiranu sliku za parcelu uzmi default od tipa parcele
          //ako uopce postoje default slike za parcelu

          let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
          //console.log('slika', pomocVrstaSlike)
          if (pomocVrstaSlike != undefined && pomocVrstaSlike.images.length) {
            pomocVrstaSlike.images.forEach((element) => {
              imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimg" style="display: none" href="' + element + '" data-lightbox="roadtrip" /></div>');
            });
          } else {
            //postavi logo u slider
            imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip" /></div>');
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

      }
    );
  });

  $("#ModalObjekt").on('shown.bs.modal', function() {

    //window.location = '#modal';

    var tmpParcela = $(this).attr("broj");
    var tmpParcelaNaziv = $(this).attr("klasa");
    var panomFolder = "images2/"; //----> OVO JE PRIVREMNEO RADI TESTIRANJA
    var panomSource = panomFolder + KojiPanom(tmpParcela, tmpParcelaNaziv);

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
    $(".pnlm-load-box p:first-of-type").html(`${translations["Loading"][0][lng]}...`)
    $(".modal-header button.close").animate({
      opacity: "1"
    }, 500)

    viewera.on("load", function() {

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

        $("#containerObjekt").append(`<div class="show-pitch">${translations["Show pitch"][0][lng]}</div>`)
        $(".show-pitch").on("click", function() {
          var hotspotsLoaded = false
          $(this).toggleClass("hide-pitch")
          if ($(this).is(".hide-pitch")) {
            viewera.setPitch(0);
            viewera.setYaw(355)
            $("#ctx").show()
            $(".show-pitch").html(`${translations["Hide pitch"][0][lng]}`)
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
            $(this).html(`${translations["Show pitch"][0][lng]}`)
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
        $("#ModalObjekt #feature-info .modal-button").after($(`<div class="col-sm-12 navigation-denied">${translations["Navigation not available"][0][lng]}</div>`))
      }
      $("#navigateTo").css("opacity", "0.5")
      $("#navigateTo").css("pointer-events", "none")
    }

    viewera.on('error',
      function() {
        viewera.destroy();

        $('#containerObjekt').html(`<div class="swiper mySwiper">
      <div class="swiper-wrapper">

      </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>`)

        //botun za otvoriti panoramu
        $("#containerObjekt").append(`<div class="show-pitch img"><i class="fa fa-search"></i></div>`);
        if (panomPhotoUrlObjekt != '') {
          $("#containerObjekt").append(`<div class="show-pitch panom">360&deg;</div>`);
        }

        $(".show-pitch.panom").on("click", function() {
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


        var imgArray = [];

        if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length) {
          arraySlikaSlider.forEach((element) => {
            imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + element + '" data-lightbox="roadtrip" /></div>');
          });
        } else {
          //ako nema definiranu sliku za parcelu uzmi default od tipa parcele
          //ako uopce postoje default slike za parcelu

          let pomocVrstaSlike = arraySlikaSlider_PO_TIPU.find(el => el.vrstaSJ == helper_vrstaSJ_zaSlike);
          if (pomocVrstaSlike != undefined) {
            pomocVrstaSlike.images.forEach((element) => {
              imgArray.push('<div class="swiper-slide"><img src="' + element + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + element + '" data-lightbox="roadtrip" /></div>');
            });
          } else {
            //postavi logo u slider
            imgArray.push('<div class="swiper-slide"><img src="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + '../../' + _POSTAVKE_KAMPA_.defaultimg.replace('/cms/', 'kamp/views/') + '" data-lightbox="roadtrip" /></div>');
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
      }
    );
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
              $("body").append(`<div class="annotation gps-done"><h3>${translations["Travel done"][0][lng]}</h3>
            <p>${translations["Destination reached"][0][lng]} ${formatGPSDistance["metric"](Math.floor(d2))}.</p>
            <div class="annotation-buttons"><div class="confirm">${translations["Fine"][0][lng]}</div></div></div>`)
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
            $(".mapboxgl-ctrl-geolocate").html(`${translations["Return view"][0][lng]}<img src='assets/img/gps-arrow.svg'>`);
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
      $("body").append(`<div class="annotation"><h3>${translations["Imporant message"][0][lng]}</h3>
  <p>${translations["Routing not available"][0][lng]}
  ${$(".profile-switch.active").attr("id") == "car" ? translations["Switch walking"][0][lng] : translations["Switch driving"][0][lng]}</p>
  <div class="annotation-buttons"><div class="confirm">${translations["Fine"][0][lng]}</div></div></div>`)
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
          matchList.innerHTML = `<div class="search-error">${translations["Search error"][0][lng]}</div>`;
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
      html = matches
        .map(
          match => `
        <div class="card card-body mb-4" id="test" data-id=${match.properties.id}>
            <span>${getFeatureName(match.properties["en"])} ${getAccName(match.properties.class)}
            <h4 class='text-primary'>${match.properties[lng]} ${match.properties.number ? match.properties.number : ""} ${match.properties.label ? match.properties.label : ""}</h4>${udaljenostDoLokacije(match.properties.id)}</span>
            ${getWorkingHours(match.properties)}
            ${getAvailability(match.properties.id)}
            ${getBrand(match.properties.brand)}
        </div>`


        )
        .join("");
      if ($("input#search").val() != "") {
        matchList.innerHTML = html;
      }

      $("[data-id]").on( "click", function () {
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

  function createFeatureButtons() {
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
      if (found !== undefined && found2 !== undefined && countItems > 0) {
        found = found.properties[lng]
        $(".feature-buttons").append(`<div class="${featureButtonClass}" data-feature="${found}"><i class="${featureIconClass}"></i><span><span>${found}</span><small>${countItems} ${translations["Places"][0][lng][places]}</small></span>`)
        recommendedButtons = $(".recommandations-container").append(`<div class="recommandations">
        <div class="card card-body mb-4" id="test" data-id="${found2.properties.id}" ">
            <div class="recommandations-image">
            ${recommendedPics(found2.properties.pics)}
            </div>
            <div class="recommandations-content">
            <i class="${featureIconClass}"></i>
              <h2>${found2.properties[lng]} ${found2.properties.label != undefined ? found2.properties.label : ""}</h2>
              <span class="udaljenost">
              ${found2.properties[lng]} × ${udaljenostDoLokacije(found2.properties.id, "recommended")}</span>
              <span class="open">${getWorkingHours(found2.properties, "recommended")}</span>
            </div>
          </div>
    </div>`)
      }
    }

    $("[data-id]").on( "click", function () {
      let dataId = $(this).attr("data-id");
      const article = document.querySelector('[data-id="' + dataId + '"]');

      locirajParcelu(article.dataset.id)
    });    

    $("#match-list").before(`<div class='recommended'>${translations["Recommended"][0][lng]}</div>`)
    $(".feature-buttons").append(`<div class="feature-button FAKE"></div>`)

    $(".feature-buttons .feature-button").on("click", function() {
      if ($(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").is(":hidden")) {
        setTimeout(function() {
          $(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
        }, 100)
      }
      $(".found").remove()
      $("#match-list").before(`<div class='found'>${translations["Found"][0][lng]}</div>`)
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
        return `${translations["Distance not available"][0][lng]}`
      }
    } else {
      try {
        var temp1 = turf.envelope(data.find(el => el.properties.id === label.toString()));
        var udaljenost = turf.distance(userLocation, turf.centerOfMass(temp1), {
          units: 'meters'
        });

        return `<small>${(udaljenost > 1000) ? ((udaljenost / 1000).toFixed(0) + ' km') : (udaljenost.toFixed(0) + ' m')}</small>`;
      } catch {
        return `<small style="position: relative; margin-left: 38px; margin-bottom: 10px;">${translations["Distance not available"][0][lng]}</small>`
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
      return `<small>${translations["Dimensions"][0][lng]} cca: ${duzina.toFixed(0)} × ${sirina.toFixed(0)} m</small>`;
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
    $("#match-list").before(`<div class='found'>${translations["Found"][0][lng]}</div>`)
    $(".recommended").remove()
    $(".recommandations-container").remove()
    if ($(this).val() == "") {
      $(".found").remove()
      $("#match-list").before(`<div class='recommended'>${translations["Recommended"][0][lng]}</div>`)
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
    content: translations['hintHome'][0][lng],
    placement: 'right',
    theme: 'light',
    dynamicTitle: true,
    boundary: 'scrollParent',
    touch: false,
    onShow(instance) {
      instance.setContent(translations['hintHome'][0][lng]);
  }
  });
  tippy('#openTrazi', {
    content: translations['hintTrazilica'][0][lng],
    placement: 'right',
    theme: 'light',
    dynamicTitle: true,
    boundary: 'scrollParent',
    touch: false,
    onShow(instance) {
      instance.setContent(translations['hintTrazilica'][0][lng]);
  }    
  });
  tippy('#layers', {
    content: translations['hintFilteri'][0][lng],
    placement: 'right',
    theme: 'light',
    dynamicTitle: true,
    boundary: 'scrollParent',
    touch: false,
    onShow(instance) {
      instance.setContent(translations['hintFilteri'][0][lng]);
  }    
  });
  tippy('#lang', {
    content: translations['hintJezici'][0][lng],
    placement: 'right',
    theme: 'light',
    dynamicTitle: true,
    boundary: 'scrollParent',
    touch: false,
    onShow(instance) {
      instance.setContent(translations['hintJezici'][0][lng]);
  }    
  });     
  tippy('#booknowtraka', {
    content: translations['hintBukiraj'][0][lng],
    placement: 'bottom',
    theme: 'light',
    dynamicTitle: true,
    boundary: 'scrollParent',
    touch: false,
    onShow(instance) {
      instance.setContent(translations['hintBukiraj'][0][lng]);
  }    
  });  

  if (_POSTAVKE_KAMPA_.bookingModul === '0') {
    $('.book-form').css('display', 'none');
    $('#date').css('pointer-events', 'none');
    $('#date').css('opacity', '0.5');
  }

  //vodimo gosta do pitcha ako je tako definirano u parametrima
  if (takeMeToAccomodation != '') {

    $("body").addClass("message")
    $("body").append(`<div class="annotation"><h3>${translations["Taking You to pitch"][0][lng].replace('$pitch', takeMeToAccomodation)}</h3><div class="annotation-buttons"><div class="confirm">${translations["Fine"][0][lng]}</div></div></div>`)

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

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});