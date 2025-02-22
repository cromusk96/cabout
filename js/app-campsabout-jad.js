var destinationLocation, gpsParcela, userCoordinates, viewera, turfPoints, mapCenter, accomodation, tockeLegs, duzinaLegs, popupDiv, showAll, weather, lezaljke, userLocation, brandColors, slobodne, geojsonData, cijeneBaza, syncdataTest, cikatPrimjer, parametriKampaHelper, cikatMish, rezultat1, isNavigation = !1, isVratiPrikaz = !1, gpsActive = !1, isSetOrigin = !1, listWaypoints = [], lng = "en";
$("html").attr("lang", lng);
var trackActive = !0
  , isAppleDetected = ["iPhone", "iPad", "iPod", "iPad Simulator", "iPhone Simulator", "iPod Simulator", ].includes(navigator.platform)
  , isMuted = ""
  , isAppleMuted = "muted";
let _NATPISI_, linijePoKampu, brojGPS_QRCode, slobodniSmjestaji = new Set, zauzetiSmjestaji = new Set, GLOBAL_zauzetiSmjestaji = new Set, naUpitSmjestaji = new Set, slobodniSmjetaji_Sve = [], zauzetiSmjestaji_Sve = [], GLOBAL_zauzetiSmjestaji_Sve = [], naUpitSmjestaji_Sve = [], temporaryHelperBook, temporaryHelperBook_2, arraySlikaSlider = [], arraySlikaSlider_PO_TIPU = [], helper_vrstaSJ_zaSlike, _POSTAVKE_KAMPA_, _PARAMETRI_KAMPA, _pois_, _PERIODI_REZERVACIJE_, cmsObjekti, _CMS_data_Objekti, poiLabels, _CMS_POILabels, flag_SAMO_NA_UPIT, _TABLICA_VRSTE_, pmsPropertyId_New, iconZoomSize, panomPhotoUrl, panomPhotoUrlObjekt, _datumOdHelper, _datumDoHelper, picker, takeMeToAccomodation, _picker_temp_day = "0", PITCH_OR_MOBILE, PMS_RESERVATION_ID, mishHelper_Res, mishHelper_CancelRes, langFromURL, bookData = "", selectedChildren, selectedAdult, kampID, grupacijaName, _PRICES_PER_STAY_, mishDatumOd, mishDatumDo, phobsDatumOd, phobsBrojDana, wemDatumOd, wemDatumDo, CADatumOd, CADatumDo, _cmsParamsURL_ = "https://campsabout.com/mapAPI/params.php?id=", paramZaBooking = {
    brojSJ: "",
    brojMISH: "",
    pmsUnitId: "",
    pmsTip: "",
    propertyId: "",
    datumOd: "",
    brojDana: "",
    jezik: "",
    brojOsoba: "",
    djecaGodine: {}
};
function showLoader() {
    document.getElementById("spinner").classList.add("show")
}
function hideLoader() {
    document.getElementById("spinner").classList.remove("show")
}
userLocation = !0,
lightbox.option({
    alwaysShowNavOnTouchDevices: !0,
    fitImagesInViewport: !0,
    fixedNavigation: !0
});
let dev_env, noGPS;
const queryStringKamp = window.location.search
  , urlParamsKamp = new URLSearchParams(queryStringKamp);
dev_env = null !== urlParamsKamp.get("development"),
noGPS = null !== urlParamsKamp.get("nogps"),
langFromURL = null !== urlParamsKamp.get("lang") ? urlParamsKamp.get("lang") : "";
let RATE_ID_PROMO_MH = urlParamsKamp.get("promomh")
  , RATE_ID_PROMO_PI = urlParamsKamp.get("promopi")
  , qren = null !== urlParamsKamp.get("qren");
function getCookie(e) {
    let a = {};
    return document.cookie.split(";").forEach(function(e) {
        let[t,o] = e.split("=");
        a[t.trim()] = o
    }),
    a[e]
}
async function MISH_Reservation(e, a, t, o, n) {
    var s = await fetch(_PARAMETRI_KAMPA.mishReservationURL, {
        method: "POST",
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                propertyCode: e,
                unitId: a,
                dateFrom: t,
                dateTo: o,
                numGuests: n
            }
        })
    });
    if (200 === s.status)
        return mishHelper_Res = await s.json()
}
async function MISH_CancelationRes(e) {
    var a = await fetch(_PARAMETRI_KAMPA.mishCancelReservationURL, {
        method: "POST",
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                reservationId: e
            }
        })
    });
    if (200 === a.status)
        return mishHelper_CancelRes = await a.json()
}
async function ProcesBookiranja(e, a, t, o, n, s, l, c, d) {
    if ("A" === (await fetchMishByUnitCode(l, c, e, d)).units[0].status) {
        let p = paramZaBooking.brojOsoba + Object.keys(bookData.children).length
          , m = cikatPrimjer.find(a=>a.brojMISH === e).pmsPropertyId
          , u = await MISH_Reservation(pmsPropertyId_New = "" != m ? m : _POSTAVKE_KAMPA_.propertyId, paramZaBooking.pmsUnitId, l, c, p);
        if ("" != u.reservation_id && void 0 != u.reservation_id) {
            PMS_RESERVATION_ID = u.reservation_id,
            "1" === _PARAMETRI_KAMPA.cancelRezBeforeNewOne && MISH_CancelationRes(getCookie("reservationId"));
            var v = new Date
              , h = v.getTime() + 1e3 * _POSTAVKE_KAMPA_.cuvanjeRezMin * 60;
            v.setTime(h),
            document.cookie = "reservationId=" + PMS_RESERVATION_ID + ";expires=" + v.toUTCString() + "; SameSite=None; Secure; path=/",
            PhobsBook(paramZaBooking.brojSJ, paramZaBooking.datumOd, paramZaBooking.brojDana, paramZaBooking.brojOsoba, paramZaBooking.djecaGodine, paramZaBooking.jezik, l, c)
        } else
            document.getElementsByClassName("selected-date available")[0].innerHTML = translations["Smjestaj ipak nije dostupan"][0][lng],
            document.getElementsByClassName("selected-date available")[0].style.color = "red"
    } else
        document.getElementsByClassName("selected-date available")[0].innerHTML = translations["Smjestaj ipak nije dostupan"][0][lng],
        document.getElementsByClassName("selected-date available")[0].style.color = "red"
}
function PhobsBook(e, a, t, o, n, s, l, c) {
    showLoader();
    let d;
    "M" === PITCH_OR_MOBILE && (d = "2024" === phobsDatumOd.substring(0, 4) ? _POSTAVKE_KAMPA_.defaultRateId : _PARAMETRI_KAMPA.rateM2024),
    "P" === PITCH_OR_MOBILE && (d = "2024" === phobsDatumOd.substring(0, 4) ? _POSTAVKE_KAMPA_.parceleRateId : _PARAMETRI_KAMPA.rateP2024),
    "M" === PITCH_OR_MOBILE && (d = RATE_ID_PROMO_MH),
    "P" === PITCH_OR_MOBILE && (d = RATE_ID_PROMO_PI);
    let p = {
        data: {
            brojSJ: e,
            datumod: a,
            brojdana: t,
            brojosoba: o,
            djecaGodine: n,
            rateID: d,
            jezik: s,
            kampId: _POSTAVKE_KAMPA_.kampId,
            grupacija: grupacijaName
        }
    };
    if ("" === e || "" === a || "" === t || "" === o || void 0 == e || void 0 == a || void 0 == t || void 0 == o)
        return !1;
    var m = v;
    function u() {
        var e = ["then", "color", "target", "undefined", "phobsReplaceNewURL", '<div class="annotation"><h3>', "addClass", "$minutes", "hasOwnProperty", "phobsBookURL", "781094YiYkLz", "log", "message", "selected-date available", "8oEgKYz", "112335hZblma", "innerHTML", "9277155gEdXnp", "remove", "76niDjYK", "Fine", "action", "98669cpmJLe", "; SameSite=None; Secure; path=/", "name", "createElement", "post", "cuvanjeRezMin", "replace", "modal", "callPhobsFromPricesPerStay", "error_message", "style", "unitCode=", "1342938sSYHdg", "cookie", "Smjestaj ipak nije dostupan", "2608529bvNnIJ", '</h3><div class="annotation-buttons"><div class="confirm">', "getElementsByClassName", "</div></div></div>", "body", ".confirm", ".annotation", "#ModalParcela", "663462dMaQix", "cancelRezMessage", "appendChild", "stringify", "input", "submit", "Booking time message", "phobsReplaceOldURL", "_blank", "json", "reservationId", "bookTocnogBroja", "removeClass", "toUTCString", "red", "unitCode", "getTime", "brojSJ", "application/json", ";expires=", "form", "pmsTip", "value", "RezBezBroja"];
        return (u = function() {
            return e
        }
        )()
    }
    function v(e, a) {
        var t = u();
        return (v = function(e, a) {
            return t[e -= 145]
        }
        )(e, a)
    }
    async function h(e) {
        var a = v
          , t = await fetch(_PARAMETRI_KAMPA[a(147)], {
            method: "POST",
            headers: {
                Accept: a(201),
                "Content-Type": "application/json"
            },
            body: JSON[a(186)](e)
        });
        if (200 === t.status)
            return temporaryHelperBook = await t[a(192)]()
    }
    async function f(e) {
        var a = v;
        return "0" === _PARAMETRI_KAMPA[a(168)] ? temporaryHelperBook_2 = await h(e) : _PRICES_PER_STAY_[paramZaBooking[a(204)]].url
    }
    !function(e, a) {
        for (var t = v, o = e(); ; )
            try {
                if (parseInt(t(160)) / 1 + parseInt(t(148)) / 2 + parseInt(t(183)) / 3 + parseInt(t(157)) / 4 * (parseInt(t(153)) / 5) + -parseInt(t(172)) / 6 + parseInt(t(175)) / 7 + -parseInt(t(152)) / 8 * (parseInt(t(155)) / 9) == 255272)
                    break;
                o.push(o.shift())
            } catch (n) {
                o.push(o.shift())
            }
    }(u, 255272),
    f(p)[m(207)](e=>{
        var a = m;
        if (hideLoader(),
        e[a(146)](a(169)))
            document[a(177)](a(151))[0][a(154)] = translations[a(174)][0][lng] + " (" + e[a(169)] + ")",
            document[a(177)](a(151))[0][a(170)][a(208)] = a(197),
            MISH_CancelationRes(getCookie(a(193)));
        else {
            let t;
            if (t = "1" === _TABLICA_VRSTE_[paramZaBooking[a(204)]][0][a(194)] ? translations[a(189)][0][lng][a(166)](a(145), _POSTAVKE_KAMPA_[a(165)]) : translations[a(206)][0][lng],
            void 0 != getCookie(a(198)) && getCookie(a(198)) != a(210) && "" != getCookie("unitCode") && "1" === _PARAMETRI_KAMPA[a(184)])
                var o = '<div class="annotation"><h3>' + translations["Reservation cancelation"][0][lng].replace("$brojSJ", getCookie("unitCode")) + " " + t + a(176) + translations[a(158)][0][lng] + a(178);
            else
                var o = a(212) + t + a(176) + translations[a(158)][0][lng] + "</div></div></div>";
            $(a(182))[a(167)]("hide"),
            $(a(179)).append(o),
            $("body")[a(213)](a(150)),
            $(a(180)).on("click", function() {
                var t = a;
                $(t(179))[t(195)](t(150)),
                $(t(181))[t(156)]();
                var o = new Date
                  , n = o[t(199)]() + 1e3 * _POSTAVKE_KAMPA_.cuvanjeRezMin * 60;
                o.setTime(n),
                document[t(173)] = t(171) + paramZaBooking[t(200)] + t(202) + o[t(196)]() + t(161),
                void 0 != _PARAMETRI_KAMPA[t(190)] && "" != _PARAMETRI_KAMPA[t(190)] && null != _PARAMETRI_KAMPA[t(190)] && (e = e[t(166)](_PARAMETRI_KAMPA[t(190)], _PARAMETRI_KAMPA[t(211)])),
                console[t(149)](e),
                function e(a, t, o=m(164)) {
                    var n = m;
                    let s = document[n(163)](n(203));
                    for (let l in s.method = o,
                    s[n(159)] = a,
                    s[n(209)] = n(191),
                    t)
                        if (t[n(146)](l)) {
                            let c = document[n(163)](n(187));
                            c.type = "hidden",
                            c[n(162)] = l,
                            c[n(205)] = t[l],
                            s[n(185)](c)
                        }
                    document[n(179)][n(185)](s),
                    s[n(188)]()
                }(e, {
                    lot_number: paramZaBooking.brojSJ,
                    external_booking_id: PMS_RESERVATION_ID
                })
            })
        }
    }
    )
}
noGPS && $(".col-sm-12.modal-button").css("display", "none"),
takeMeToAccomodation = null !== urlParamsKamp.get("pitch") ? urlParamsKamp.get("pitch") : "",
"" !== langFromURL && (lng = langFromURL,
$("html").attr("lang", lng)),
$("#booknowtraka").text(translations["Book now"][0][lng]),
kampID = $("#kampName").text(),
grupacijaName = $("#groupName").text(),
null !== urlParamsKamp.get("group_dev") && (grupacijaName = urlParamsKamp.get("group_dev")),
null !== urlParamsKamp.get("kamp_dev") && (kampID = urlParamsKamp.get("kamp_dev")),
"<%= kamp %>" === kampID && (kampID = "1"),
"<%= group %>" === grupacijaName && (grupacijaName = "maistra"),
kampID = urlParamsKamp.get("kamp");
let odradibojanjedostupnosti;
showLoader(),
$(".la-anim-5").addClass("la-animate");
const search = document.getElementById("search")
  , matchList = document.getElementById("match-list");
var gj = {
    name: "MyFeatureType",
    type: "FeatureCollection",
    features: []
};
$(".search-header svg").on("click", function() {
    $(".menu-item").removeClass("selected"),
    $(".menu-item").removeClass("not-selected"),
    $("#ModalTrazi").modal("hide")
}),
$(document).click(function(e) {
    !$(e.target).closest("#ModalTrazi").length && $("#ModalTrazi").is(":visible") && $("#ModalTrazi").modal("hide")
}),
popupDiv = `<button class="btn btn-outline-secondary" id="navigateToPoi"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`,
$(window).on("load", function(e) {
    setTimeout(function() {
        $("#preloader").animate({
            opacity: 0
        }, 1e3),
        setTimeout(function() {
            $("html").removeClass("preloader"),
            $("#preloader").remove()
        }, 1e3)
    }, 2500)
}),
window.outerWidth < 768 && $(".mobile-menu .btn:not(#home)").on("click", function() {
    var e = $(this);
    $(e).addClass("click"),
    setTimeout(function() {
        $(e).removeClass("click")
    }, 500)
});
//const accessToken = "pk.eyJ1IjoidHJpbXJkIiwiYSI6ImNtNW1heHJzbjB2c2Uya3NjdWdmZnR4dm0ifQ.cNGh8ldIjEewUCDUvZRkwA"; //SANDI
const accessToken = 'pk.eyJ1IjoidHJpbXRvbW8iLCJhIjoiY2x3cTVsdzJhMnMybTJsbXA5MzlrcDMxaiJ9.kA16CemzbE-9N7Skw1ZPaA'; //WAS IST DAS?
//const accessToken = 'pk.eyJ1Ijoiam9zbyIsImEiOiJjbDBpN3NnbWMwMDJlM2ptcng2bGIxazJjIn0.xuMyew046jayaAFfWnsfJQ' //JOSO
mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
    container: "map",
    attribution: !0,
    pitch: 0,
    zoom: 18,
    //style: "mapbox://styles/trimrd/clj5qp2dt002p01o576nx3wnn", //SANDI
    style: "mapbox://styles/trimtomo/clyzj8xsy00ea01pf9zxt3z4f/draft", //JOSO 2?
  //style: "mapbox://styles/joso/cm0ezixxm004o01o520t230hp/draft"  //JOSO
});
var kojiFilter = ""
  , randomBroj = 1e3 * Math.random(1);
randomBroj = randomBroj.toString().replace(".", "");
var url_data = "assets/gj/" + grupacijaName + "_" + kampID + ".1ax3";
url_data = url_data.replace("1ax3", "json?" + randomBroj);
var url_data_linije = "assets/gj/" + grupacijaName + "_linije_" + kampID + ".json?" + randomBroj;
async function fetchCijene() {
    var e = await fetch(_PARAMETRI_KAMPA.phobsPricesUrl + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return syncdataTest = await e.json()
}
async function vratiCijene() {
    cijeneBaza = await fetchCijene()
}
let gjNatpisi;
async function fetchNatpisi() {
    var e = await fetch(_PARAMETRI_KAMPA.cmsNatpisiURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return gjNatpisi = await e.json()
}
let cmspoilabels;
async function fetchPOILabels() {
    var e = await fetch(_PARAMETRI_KAMPA.poiLabelsURL + "?group=" + grupacijaName);
    if (200 === e.status)
        return cmspoilabels = await e.json()
}
let gjpois;
async function fetchPOIS() {
    var e = await fetch(_PARAMETRI_KAMPA.poisURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return gjpois = await e.json()
}
async function vratiPOIS() {
    gjpois = await fetchPOIS()
}
let _ZATVORENE_REZERVACIJE_;
async function fetchZatvoreneRezervacije(e, a) {
    var t = await fetch(_PARAMETRI_KAMPA.zatvoreneRezURL + kampID + "&group=" + grupacijaName + "&dateFrom=" + e + "&dateTo=" + a);
    if (200 === t.status)
        return _ZATVORENE_REZERVACIJE_ = await t.json()
}
async function fetch_GEOJSON() {
    var e = await fetch(url_data);
    if (200 === e.status)
        return geojsonData = await e.json()
}
async function fetch_LineLayer() {
    var e = await fetch(url_data_linije);
    if (200 === e.status)
        return linijePoKampu = await e.json()
}
async function fetch_CMSDATA() {
    var e = await fetch(_PARAMETRI_KAMPA.cmsDataURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return syncdataTest = await e.json()
}
async function vrati_CMSDATA() {
    cikatPrimjer = await fetch_CMSDATA()
}
async function fetch_ParametriKampa() {
    var e = await fetch(_cmsParamsURL_ + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return parametriKampaHelper = await e.json()
}
async function fetch_CMS_Objekti() {
    var e = await fetch(_PARAMETRI_KAMPA.cmsObjektiURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return cmsObjekti = await e.json()
}
let headers = new Headers, mishUnitCodeStatusHelper;
async function fetchMishByUnitCode(e, a, t, o) {
    var n = await fetch(_PARAMETRI_KAMPA.mishUnitStatusURL, {
        method: "POST",
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                dateFrom: e,
                dateTo: a,
                unit_code: t,
                pmsid: o
            }
        })
    });
    if (200 === n.status)
        return mishUnitCodeStatusHelper = await n.json()
}
let pricesPerStay;
async function PhobsPricesPerStay(e) {
    var a = await fetch(_PARAMETRI_KAMPA.phobsTotalPricesUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
    });
    if (200 === a.status)
        return pricesPerStay = await a.json()
}
async function fetchCikatMish(e, a, t) {
    var o = await fetch(_PARAMETRI_KAMPA.mishUnitStatusURL, {
        method: "POST",
        headers: {
            Accept: "application.json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                dateFrom: e,
                dateTo: a,
                pmsid: t
            }
        })
    });
    if (200 === o.status)
        return syncdataTest = await o.json()
}
async function vratiCikatMish(e, a, t) {
    cikatMish = await fetchCikatMish(e, a, _POSTAVKE_KAMPA_.propertyId);
    var o = {}
      , n = {}
      , s = [];
    for (let l in cikatMish.units)
        n.brojSJ = cikatMish.units[l].unit_code,
        n.status = cikatMish.units[l].status,
        n.nasstatus = "teststatus",
        "A" === cikatMish.units[l].status && "0" === _POSTAVKE_KAMPA_.zatvoriBooking && s.push(cikatMish.units[l].unit_code),
        o[l] = n
}
let prijevoditbl;
async function fetchTranslations() {
    var e = await fetch(_PARAMETRI_KAMPA.translationsURL + "?group=" + grupacijaName);
    if (200 === e.status)
        return prijevoditbl = await e.json()
}
async function vratiTranslations() {
    translations = await fetchTranslations()
}
let periodiRezervacije, periodiHelper;
async function fetchPeriodiRez() {
    var e = await fetch(_PARAMETRI_KAMPA.periodiRezURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return periodiRezervacije = await e.json()
}
async function vratiPeriodiRez() {
    periodiHelper = await fetchPeriodiRez()
}
let slikepotipovima;
async function fetchSlikePoSJ() {
    var e = await fetch(_PARAMETRI_KAMPA.slikeVrstaURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return slikepotipovima = await e.json()
}
async function vratiSlikePoSJ() {
    arraySlikaSlider_PO_TIPU = await fetchSlikePoSJ()
}
async function fetchTextTest() {
    var e = await fetch(_PARAMETRI_KAMPA.colorsURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return await e.json()
}
let tempTablicaVrste;
async function fetchTablicaVrste() {
    var e = await fetch(_PARAMETRI_KAMPA.cmsVrsteBrojOsobaURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return tempTablicaVrste = await e.json()
}
async function vratiRezultatBoje() {
    brandColors = await fetchTextTest()
}
let settingsData;
async function fetchSettings() {
    var e = await fetch(_PARAMETRI_KAMPA.settingsURL + kampID + "&group=" + grupacijaName);
    if (200 === e.status)
        return settingsData = await e.json()
}
async function vratiSettings() {
    _POSTAVKE_KAMPA_ = await fetchSettings()
}
async function apiCall() {
    _PARAMETRI_KAMPA = await fetch_ParametriKampa(),
    brandColors = await fetchTextTest(),
    _TABLICA_VRSTE_ = await fetchTablicaVrste(),
    cijeneBaza = await fetchCijene(),
    translations = await fetchTranslations(),
    _CMS_POILabels = await fetchPOILabels(),
    arraySlikaSlider_PO_TIPU = await fetchSlikePoSJ(),
    _POSTAVKE_KAMPA_ = await fetchSettings(),
    _pois_ = await fetchPOIS(),
    _PERIODI_REZERVACIJE_ = await fetchPeriodiRez(),
    rezultat1 = await fetch_GEOJSON(),
    linijePoKampu = await fetch_LineLayer(),
    _CMS_data_Objekti = await fetch_CMS_Objekti(),
    _NATPISI_ = await fetchNatpisi(),
    await vrati_CMSDATA()
}
let test222, broj_temp, popisZaCMS = [];
async function apiCallRez() {
    test222 = await apiCall(),
    zauzetiSmjestaji = new Set,
    zauzetiSmjestaji_Sve = [],
    rezultat1.features.forEach(function(e, a) {
        e.properties.hasOwnProperty("class") && (("parcela" === e.properties.class || "mh" === e.properties.class || "glamping" === e.properties.class) && (popisZaCMS.push({
            id: e.properties.id,
            brand: e.properties.brand,
            broj: e.properties.number
        }),
        zauzetiSmjestaji.add(e.properties.id),
        GLOBAL_zauzetiSmjestaji.add(e.properties.id),
        void 0 != (broj_temp = cikatPrimjer.find(a=>a.mapaId === e.properties.id)) && (e.properties.brojMISH = broj_temp.brojMISH,
        e.properties.vrstaMISH = broj_temp.oznakaMISH,
        e.properties.oznakaPHOBS = broj_temp.oznakaPHOBS,
        e.properties.brojGPS = broj_temp.brojGps,
        e.properties.brand = broj_temp.tipNaziv,
        e.properties.number = broj_temp.broj,
        "parcela" === e.properties.class && (e.properties.en = translations.gjparcela[0].en,
        e.properties.de = translations.gjparcela[0].de,
        e.properties.it = translations.gjparcela[0].it,
        e.properties.hr = translations.gjparcela[0].hr,
        e.properties.ru = translations.gjparcela[0].ru,
        e.properties.si = translations.gjparcela[0].si,
        e.properties.pl = translations.gjparcela[0].pl,
        e.properties.nl = translations.gjparcela[0].nl),
        "mh" === e.properties.class && (e.properties.en = translations.gjmobilka[0].en,
        e.properties.de = translations.gjmobilka[0].de,
        e.properties.it = translations.gjmobilka[0].it,
        e.properties.hr = translations.gjmobilka[0].hr,
        e.properties.ru = translations.gjmobilka[0].ru,
        e.properties.si = translations.gjmobilka[0].si,
        e.properties.pl = translations.gjmobilka[0].pl,
        e.properties.nl = translations.gjmobilka[0].nl),
        "glamping" === e.properties.class && (e.properties.en = translations.gjglamping[0].en,
        e.properties.de = translations.gjglamping[0].de,
        e.properties.it = translations.gjglamping[0].it,
        e.properties.hr = translations.gjglamping[0].hr,
        e.properties.ru = translations.gjglamping[0].ru,
        e.properties.si = translations.gjglamping[0].si,
        e.properties.pl = translations.gjglamping[0].pl,
        e.properties.nl = translations.gjglamping[0].nl),
        "caravan" === e.properties.class && (e.properties.en = translations.gjcaravan[0].en,
        e.properties.de = translations.gjcaravan[0].de,
        e.properties.it = translations.gjcaravan[0].it,
        e.properties.hr = translations.gjcaravan[0].hr,
        e.properties.ru = translations.gjcaravan[0].ru,
        e.properties.si = translations.gjcaravan[0].si,
        e.properties.pl = translations.gjcaravan[0].pl,
        e.properties.nl = translations.gjcaravan[0].nl))),
        "objekt" == e.properties.class.split(" ")[0] && void 0 != (broj_temp = _CMS_data_Objekti.find(a=>a.mapaId === e.properties.id)) && (e.properties.label = broj_temp.naziv))
    }),
    rezultat1 = {
        type: "FeatureCollection",
        features: rezultat1.features.concat(_pois_.features)
    },
    zauzetiSmjestaji_Sve = Array.from(zauzetiSmjestaji),
    ucitajMapu()
}
async function apiCall_Dostupnost(e, a, t) {
    !1 === t && showLoader();
    let o = await fetchZatvoreneRezervacije(CADatumOd, CADatumDo)
      , n = new Set;
    for (var s in o)
        for (let l = 0; l < o[s].oznaka.length; l++)
            n.add(o[s].oznaka[l]);
    let c;
    "M" === PITCH_OR_MOBILE && (c = "2024" === phobsDatumOd.substring(0, 4) ? _POSTAVKE_KAMPA_.defaultRateId : _PARAMETRI_KAMPA.rateM2024),
    "P" === PITCH_OR_MOBILE && (c = "2024" === phobsDatumOd.substring(0, 4) ? _POSTAVKE_KAMPA_.parceleRateId : _PARAMETRI_KAMPA.rateP2024),
    "M" === PITCH_OR_MOBILE && (c = RATE_ID_PROMO_MH),
    "P" === PITCH_OR_MOBILE && (c = RATE_ID_PROMO_PI);
    let d = {
        data: {
            datumod: phobsDatumOd,
            brojdana: phobsBrojDana,
            brojosoba: bookData.adults,
            pitchOrMobile: PITCH_OR_MOBILE,
            jezik: lng,
            rateId: c,
            djecaGodine: bookData.children,
            kampId: _POSTAVKE_KAMPA_.kampId,
            grupacija: grupacijaName
        }
    };
    t || (_PRICES_PER_STAY_ = await PhobsPricesPerStay(d)),
    zauzetiSmjestaji = new Set,
    zauzetiSmjestaji = new Set([...GLOBAL_zauzetiSmjestaji]),
    slobodniSmjestaji.clear(),
    naUpitSmjestaji.add("1000000"),
    zauzetiSmjestaji.add("2000000"),
    slobodniSmjestaji.add("3000000"),
    await vratiCikatMish(e, a, _POSTAVKE_KAMPA_.propeartyId),
    cikatMish.units.forEach(function(e) {
        let a;
        a = !0;
        let t = cikatPrimjer.find(a=>a.brojMISH === e.unit_code)
          , o = Array.from(n).find(a=>a === e.unit_code);
        if (void 0 != t) {
            let s = t.mapaId;
            "1" !== _PARAMETRI_KAMPA.checkPhobsPrice || qren || (a = void 0 != _PRICES_PER_STAY_[e.unit_type_code]),
            "A" === e.status && "0" === _POSTAVKE_KAMPA_.zatvoriBooking && void 0 == o && a ? void 0 != s && PITCH_OR_MOBILE === t.tip && ("1" === t.dostupna && (slobodniSmjestaji.add(s),
            zauzetiSmjestaji.delete(s)),
            "1" === t.samoNaUpit && (naUpitSmjestaji.add(s),
            zauzetiSmjestaji.delete(s),
            slobodniSmjestaji.delete(s))) : "1" === t.samoNaUpit && (naUpitSmjestaji.add(s),
            zauzetiSmjestaji.delete(s),
            slobodniSmjestaji.delete(s))
        }
    }),
    slobodniSmjetaji_Sve = Array.from(slobodniSmjestaji),
    zauzetiSmjestaji_Sve = Array.from(zauzetiSmjestaji),
    naUpitSmjestaji_Sve = Array.from(naUpitSmjestaji),
    slobodne = zauzetiSmjestaji_Sve,
    odradibojanjedostupnosti(),
    !1 === t && hideLoader()
}
function ucitajMapu() {
    setInterval(function e() {
        "" != _datumOdHelper && void 0 != _datumOdHelper && apiCall_Dostupnost(_datumOdHelper, _datumDoHelper, !0)
    }, _PARAMETRI_KAMPA.intervalUpdateStatus);
    document.getElementById("kamplogo").src = _POSTAVKE_KAMPA_.logo;
    let e = document.getElementById("nazivkampa");
    "." === _POSTAVKE_KAMPA_.naziv && (_POSTAVKE_KAMPA_.naziv = ""),
    e.innerHTML = _POSTAVKE_KAMPA_.naziv,
    iconZoomSize = void 0 != _PARAMETRI_KAMPA.iconZoomSize ? parseFloat(_PARAMETRI_KAMPA.iconZoomSize) : 1,
    document.title = _POSTAVKE_KAMPA_.naziv,
    odradibojanjedostupnosti = function() {
        var e, a;
        $(".filter-item:not(.brand)").is(".active") && $(".filter-item").removeClass("active"),
        $(".filter-item.brand").is(".active") ? (kojiFilter = e = $(".filter-item.brand.active").text(),
        eg(e)) : ($("#layers").removeClass("active"),
        $(".filter-item:not(#viewall):not(#filter)").css({
            opacity: "1",
            "font-weight": "600"
        }),
        ek(),
        en(),
        a = J,
        map.setPaintProperty(a(317), a(296), [a(321), ["get", "class"], ...ee.fill(...ei[a(307)](e=>e != a(294) && e != a(319))), ["match", [a(314), "id"], slobodne, Y[a(320)], [a(321), [a(314), "id"], naUpitSmjestaji_Sve, Y[a(285)], [a(321), ["get", "id"], accomodation, Y[a(340)], a(310)]]]]),
        map[a(324)](a(316), a(287), [a(321), [a(314), a(302)], ...ee[a(311)](...ei.filter(e=>e != a(294) && e != a(319))), ["match", [a(314), "id"], slobodne, G(Y[a(320)], W), [a(321), [a(314), "id"], naUpitSmjestaji_Sve, G(Y[a(285)], W), [a(321), ["get", "id"], accomodation, G(Y[a(340)], W), a(310)]]]])),
        $("#date").addClass("active")
    }
    ;
    let a = moment();
    function t(e) {
        let a, t, o;
        return a = e.getDate(),
        `${a}-${t = e.getMonth() + 1}-${o = e.getFullYear()}`
    }
    function o(e) {
        let a, t, o;
        return a = e.getDate(),
        `${o = e.getFullYear()}-${t = e.getMonth() + 1}-${a}`
    }
    function n(e) {
        let a, t, o;
        return a = e.getDate(),
        t = e.getMonth() + 1,
        o = e.getFullYear(),
        `${a = a.toString().padStart(2, "0")}.${t = t.toString().padStart(2, "0")}.${o}`
    }
    function s(e) {
        let a, t, o;
        return a = e.getDate(),
        t = e.getMonth() + 1,
        o = e.getFullYear(),
        `${o}-${t = t.toString().padStart(2, "0")}-${a = a.toString().padStart(2, "0")}`
    }
    function l(e, a) {
        return parseInt((e - a) / 864e5)
    }
    function c(e, a) {
        let t = new Date(e);
        return new Date(a) >= t
    }
    let d = new Date(new Date().getFullYear(),11,31);
    function p() {
        m = Object.keys(brandColors),
        u = Object.values(brandColors)
    }
    d = s(d),
    setTimeout(function() {
        let e, a, t, o, n;
        e = new Date,
        a = e.getDate(),
        t = e.getMonth() + 1,
        o = e.getMonth() + 2,
        n = e.getFullYear(),
        $("#bookfield").attr("value", `${a}.${t}.${n}. - ${a}.${12 == t ? 1 : o}.${12 == t ? n + 1 : n}.`)
    }, 2e3),
    bookData = {},
    $(".book-form").on("click", function() {
        picker.hide(),
        setTimeout(()=>{
            $(".book-select").remove(),
            $("body").append(`<div class="book-select">
      <div class="book-first-step">
        <h2>${translations["Select accomodation type"][0][lng]}</h2>
        <div class="select-type">
          <div class="book-type" data-book-type="pitch"><i class="fas fa-rv"></i>${translations["Select pitch"][0][lng]}</div>
          <div class="book-type" data-book-type="mh"><i class="fas-pro fa-house-tree"></i>${translations["Select mh"][0][lng]}</div>
        </div>
      </div>
    </div>`),
            $(".filters").is(".open") && $(".filters").toggleClass("open"),
            $(".languages").is(".open") && $(".languages").toggleClass("open"),
            "11" === kampID && ($('[data-book-type="mh"]').css("display", "none"),
            $('[data-book-type="pitch"]').trigger("click"))
        }
        , 150)
    }),
    $(document).on("click", ".book-type", function(e) {
        "I" == e.target.tagName ? bookData.accomodation = e.target.parentElement.dataset.bookType : bookData.accomodation = e.target.dataset.bookType,
        PITCH_OR_MOBILE = "pitch" === bookData.accomodation ? "P" : "M",
        $(".book-first-step").addClass("date-selected"),
        $(".book-select").append(`<div class="book-second-step">
      <h2>${translations["Broj gostiju select"][0][lng]}</h2>
      <div class="select-guests">
      <div class="adults">
        <div class="guest-number"><i class="fas fa-people"></i>${translations.Odrasli[0][lng]}</div>
        <div class="adults-number">${bookData.hasOwnProperty("adults") ? bookData.adults : "2"}</div>
      </div>
      <div class="children">
        <div class="guest-number"><i class="fas fa-children"></i>${translations.Djeca[0][lng]}</div>
        <div class="children-number">${bookData.hasOwnProperty("children") ? Object.keys(bookData.children).length : "0"}</div>
      </div>
      </div>
      <div id="confirm-book" class="confirm-book">${translations.Potvrdi[0][lng]}</div>
    </div>`),
        bookData.hasOwnProperty("children") && setTimeout(function() {
            if ($(".children-select").remove(),
            $(".children-age").remove(),
            0 != selectedChildren && void 0 != selectedChildren) {
                $(".children").after(`<div class="children-age">
            <h3>${translations["Enter children age"][0][lng]}</h3>
          </div>`);
                for (var e = 0; e < selectedChildren; e++)
                    $(".children-age").append(`<div class="child">
              <div class="child-text">${translations.Dijete[0][lng]} ${e + 1}</div>
              <div class="child-age">${bookData.children["child" + (e + 1)]}</div>
            </div>`)
            }
        }, 150)
    }),
    $(document).on("click", ".adults-number", function() {
        $(".adults-select").is(":visible") ? $(".adults-select").remove() : ($(".adults-select").remove(),
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
    </div>`))
    }),
    $(document).on("click", ".adults-select span", function(e) {
        selectedAdult = e.target.innerHTML,
        $(".adults-number").html(selectedAdult),
        setTimeout(function() {
            $(".adults-select").remove()
        }, 150)
    }),
    $(document).on("click", ".children-number", function() {
        $(".children-select").is(":visible") ? $(".children-select").remove() : ($(".children-select").remove(),
        $(".children").after(`<div class="children-select">
      <span>0</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
    </div>`))
    }),
    $(document).on("click", ".children-select span", function(e) {
        selectedChildren = e.target.innerHTML,
        $(".children-number").html(selectedChildren),
        setTimeout(function() {
            if ($(".children-select").remove(),
            $(".children-age").remove(),
            0 != selectedChildren) {
                $(".children").after(`<div class="children-age">
        <h3>${translations["Enter children age"][0][lng]}</h3>
      </div>`);
                for (var e = 0; e < selectedChildren; e++)
                    $(".children-age").append(`<div class="child">
          <div class="child-text">${translations.Dijete[0][lng]} ${e + 1}</div>
          <div class="child-age">0</div>
        </div>`)
            }
        }, 150)
    }),
    $(document).on("click", ".child-age", function(e) {
        $(e.target.parentElement).next(".age").is(":visible") ? $(e.target.parentElement).next(".age").remove() : ($(e.target.parentElement).next(".age").remove(),
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
    </div>`))
    }),
    $(document).on("click", ".age span", function(e) {
        let a = e.target.innerHTML;
        $(e.target.parentElement).prev(".child").children(".child-age").html(a),
        setTimeout(function() {
            $(e.target.parentElement).remove()
        }, 150)
    }),
    void 0 == _PARAMETRI_KAMPA.prviDanZaRez && (_PARAMETRI_KAMPA.prviDanZaRez = 0),
    qren && (_PARAMETRI_KAMPA.prviDanZaRez = 0),
    picker = new Litepicker({
        element: document.getElementById("booknowtraka"),
        singleMode: !1,
        autoApply: !1,
        position: "bottom",
        numberOfMonths: 1,
        minDate: c(a, _POSTAVKE_KAMPA_.otvorenOd) ? moment(_POSTAVKE_KAMPA_.otvorenOd).add(_PARAMETRI_KAMPA.prviDanZaRez, "d") : moment(a).add(_PARAMETRI_KAMPA.prviDanZaRez, "d"),
        maxDate: c(d, _POSTAVKE_KAMPA_.otvorenDo) ? _POSTAVKE_KAMPA_.otvorenDo : c(_POSTAVKE_KAMPA_.otvorenDo, d) ? _POSTAVKE_KAMPA_.otvorenDo : null,
        selectForward: !0,
        minDays: !0 == qren ? 2 : "P" === PITCH_OR_MOBILE ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1,
        maxDays: 90,
        zIndex: 1,
        disallowLockDaysInRange: !0,
        plugins: ["mobilefriendly"],
        mobilefriendly: {
            breakpoint: 680
        },
        tooltipText: {
            one: translations.Nights[0][lng][0],
            other: translations.Nights[0][lng][1]
        },
        tooltipNumber: e=>(phobsBrojDana = e - 1,
        e - 1),
        resetButton() {
            var e = document.createElement("button");
            return e.classList.add("reset-button"),
            e.innerHTML = translations.Clear[0][lng],
            phobsDatumOd = "",
            _datumOdHelper = "",
            _datumDoHelper = "",
            e.addEventListener("click", e=>{
                if (e.preventDefault(),
                $("#layers").is(".active") || en(),
                $(".selected-date").remove(),
                $("#date").removeClass("active"),
                $(".selected-parameters").remove(),
                $(".filter-item.brand").is(".active")) {
                    var t = $(".filter-item.brand.active").text();
                    eu(t),
                    ey()
                }
                if ($(".filter-item:not(.brand)").is(".active")) {
                    var t = $(".filter-item.active").data("class-object")
                      , o = $(".filter-item.active").data("class");
                    void 0 != t ? eb(t) : eb("x"),
                    void 0 != o ? e8(o) : ew(t)
                }
                picker.setOptions({
                    minDays: !0 == qren ? 2 : "P" === PITCH_OR_MOBILE ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1
                }),
                _picker_temp_day = "0",
                !1 == qren && _PERIODI_REZERVACIJE_.forEach(e=>{
                    if (e.tip === PITCH_OR_MOBILE) {
                        let t = new Date(e.datumOd)
                          , o = new Date(e.datumDo)
                          , n = [];
                        "0" === e.ponD && n.push(1),
                        "0" === e.utoD && n.push(2),
                        "0" === e.sriD && n.push(3),
                        "0" === e.cetD && n.push(4),
                        "0" === e.petD && n.push(5),
                        "0" === e.subD && n.push(6),
                        "0" === e.nedD && n.push(0),
                        picker.setOptions({
                            lockDaysFilter(e) {
                                let a = e.getDay();
                                if (e.getTime() <= o.getTime() && e.getTime() > t.getTime() || e.getTime() <= o.getTime() + 31536e6 && e.getTime() > t.getTime() + 31536e6)
                                    return n.includes(a)
                            },
                            minDate: a,
                            startDate: a
                        }),
                        picker.gotoDate(a)
                    }
                }
                )
            }
            ),
            e
        },
        setup(e) {
            e.on("mobilefriendly.before:show", a=>{
                e.setOptions({
                    tooltipText: {
                        one: translations.Nights[0][lng][0],
                        other: translations.Nights[0][lng][1]
                    },
                    buttonText: {
                        apply: translations.Apply[0][lng],
                        cancel: translations.Cancel[0][lng]
                    }
                })
            }
            ),
            e.on("show", function(a, t) {
                e.setOptions({
                    tooltipText: {
                        one: translations.Nights[0][lng][0],
                        other: translations.Nights[0][lng][1]
                    },
                    buttonText: {
                        apply: translations.Apply[0][lng],
                        cancel: translations.Cancel[0][lng]
                    }
                })
            }),
            e.on("hide", ()=>{
                $("#date").removeClass("open"),
                $(".menu-item").removeClass("selected"),
                $(".menu-item").removeClass("not-selected")
            }
            ),
            e.on("button:apply", (e,a)=>{
                void 0 != e && (mishDatumOd = n(e),
                mishDatumDo = n(a),
                wemDatumOd = t(e),
                wemDatumDo = t(a),
                phobsDatumOd = s(e),
                CADatumOd = o(e),
                CADatumDo = o(a),
                _datumOdHelper = mishDatumOd,
                _datumDoHelper = mishDatumDo,
                apiCall_Dostupnost(mishDatumOd, mishDatumDo, !1))
            }
            ),
            e.on("render:day", (a,t)=>{
                let o, n, s, l;
                _PERIODI_REZERVACIJE_.forEach(a=>{
                    !1 == qren && "0" === _picker_temp_day && a.tip === PITCH_OR_MOBILE && (o = new Date(a.datumOd),
                    n = new Date(a.datumDo),
                    s = [],
                    l = parseInt(a.minDana),
                    "0" === a.ponO && s.push(1),
                    "0" === a.utoO && s.push(2),
                    "0" === a.sriO && s.push(3),
                    "0" === a.cetO && s.push(4),
                    "0" === a.petO && s.push(5),
                    "0" === a.subO && s.push(6),
                    "0" === a.nedO && s.push(0),
                    (t.getTime() <= n.getTime() && t.getTime() > o.getTime() || t.getTime() <= n.getTime() + 31536e6 && t.getTime() > o.getTime() + 31536e6) && (e.options.minDays != l + 1 && e.setOptions({
                        minDays: l + 1
                    }),
                    _picker_temp_day = "1",
                    e.gotoDate(t)))
                }
                );
                var c = t.format("DD.MM.YYYY.");
                if ("" != kojiFilter && void 0 != kojiFilter && void 0 != cijeneBaza[kojiFilter]) {
                    var d = cijeneBaza[kojiFilter].find(e=>e.date == c)
                      , p = `<div class="cijenadan">${void 0 != d ? d.price : "-€"}</div>`;
                    a.insertAdjacentHTML("beforeend", p)
                }
            }
            ),
            e.on("preselect", (a,t)=>{
                if (void 0 == a && (_picker_temp_day = "0"),
                void 0 != a && void 0 == t && !1 == qren) {
                    "0" === _picker_temp_day && e.setOptions({
                        minDays: "P" === PITCH_OR_MOBILE ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1
                    });
                    let o, n, s;
                    _PERIODI_REZERVACIJE_.forEach(t=>{
                        t.tip === PITCH_OR_MOBILE && (o = new Date(t.datumOd),
                        n = new Date(t.datumDo),
                        s = [],
                        "0" === t.ponO && s.push(1),
                        "0" === t.utoO && s.push(2),
                        "0" === t.sriO && s.push(3),
                        "0" === t.cetO && s.push(4),
                        "0" === t.petO && s.push(5),
                        "0" === t.subO && s.push(6),
                        "0" === t.nedO && s.push(0),
                        e.setOptions({
                            lockDaysFilter(e) {
                                let a = e.getDay();
                                if (e.getTime() <= n.getTime() && e.getTime() > o.getTime() || e.getTime() <= n.getTime() + 31536e6 && e.getTime() > o.getTime() + 31536e6)
                                    return s.includes(a)
                            },
                            minDate: a,
                            startDate: a
                        }),
                        e.gotoDate(a))
                    }
                    ),
                    a.getTime() > n.getTime() && (e.setOptions({
                        minDays: "P" === PITCH_OR_MOBILE ? parseInt(_POSTAVKE_KAMPA_.minDanRez) + 1 : parseInt(_POSTAVKE_KAMPA_.minDanRezMobilke) + 1
                    }),
                    e.gotoDate(a))
                }
            }
            )
        }
    }),
    $(document).on("click", ".confirm-book", function() {
        0 != parseInt($(".children-number").html()) ? (bookData.adults = parseInt($(".adults-number").html()),
        bookData.children = {},
        $(".child-age").each((e,a)=>{
            bookData.children["child" + parseInt(e + 1)] = parseInt($(a).html())
        }
        )) : (bookData.adults = parseInt($(".adults-number").html()),
        bookData.children = 0),
        !1 == qren && _PERIODI_REZERVACIJE_.forEach(e=>{
            if (e.tip === PITCH_OR_MOBILE) {
                let a = new Date(e.datumOd)
                  , t = new Date(e.datumDo)
                  , o = [];
                "0" === e.ponD && o.push(1),
                "0" === e.utoD && o.push(2),
                "0" === e.sriD && o.push(3),
                "0" === e.cetD && o.push(4),
                "0" === e.petD && o.push(5),
                "0" === e.subD && o.push(6),
                "0" === e.nedD && o.push(0),
                picker.setOptions({
                    lockDaysFilter(e) {
                        let n = e.getDay();
                        if (e.getTime() <= t.getTime() && e.getTime() > a.getTime() || e.getTime() <= t.getTime() + 31536e6 && e.getTime() > a.getTime() + 31536e6)
                            return o.includes(n)
                    }
                })
            }
        }
        ),
        $(".selected-parameters").remove(),
        $("body").append(`<div class="selected-parameters">
    <div class="selected-type">${translations["Selected accomodation"][0][lng]} ${bookData.accomodation} | ${translations.Odrasli[0][lng]} ${bookData.adults}, ${translations.Djeca[0][lng]} ${0 != bookData.children ? Object.keys(bookData.children).length : 0}</div>
  </div>`),
        $(".book-select").remove(),
        picker.show()
    }),
    $(document).on("click", ".book-select", function() {
        setTimeout(function() {
            let e = 120;
            768 > $(window).width() && (e = 140),
            $(window).height() - e <= Math.floor($(".book-second-step").outerHeight()) ? $(".book-select").addClass("over") : $(".book-select").removeClass("over")
        }, 150)
    }),
    $(document).on("click", ".button-apply", function() {
        if ("" != $(".preview-date-range").html()) {
            let e = $(".preview-date-range").html().split(" - ")
              , a = e[0].split("-")[0]
              , t = e[0].split("-")[1]
              , o = e[0].split("-")[2]
              , n = e[1].split("-")[0]
              , s = e[1].split("-")[1]
              , l = e[1].split("-")[2];
            $("#bookfield").val(`${o}.${t}.${a} - ${l}.${s}.${n}.`)
        }
    }),
    $(document).on("click", function(e) {
        var a = $(e.target);
        !a.closest(".book-form").length && !a.closest(".book-select").length && $(".book-select").is(":visible") && $(".book-select").remove()
    }),
    $(document).on("click", "#bukiraj", function() {
        if (document.getElementById("bukiraj").disabled = !0,
        flag_SAMO_NA_UPIT) {
            var e;
            let a, t = (a = "en" === (e = lng) ? _PARAMETRI_KAMPA.contactFormEn : "hr" === e ? _PARAMETRI_KAMPA.contactFormHr : "it" === e ? _PARAMETRI_KAMPA.contactFormIt : "de" === e ? _PARAMETRI_KAMPA.contactFormDe : "si" === e ? _PARAMETRI_KAMPA.contactFormSi : "pl" === e ? _PARAMETRI_KAMPA.contactFormPl : "nl" === e ? _PARAMETRI_KAMPA.contactFormNl : void 0) + "?space_code=" + paramZaBooking.brojSJ + "&date_from=" + wemDatumOd + "&date_to=" + wemDatumDo + "#specimen";
            $("#modalUpitForma").find("iframe").attr({
                src: t,
                height: "640px",
                width: "640px"
            }),
            $("#modalUpitForma").modal("show"),
            document.getElementById("bukiraj").disabled = !1
        } else {
            let o = cikatPrimjer.find(e=>e.brojMISH === paramZaBooking.brojSJ).pmsPropertyId;
            pmsPropertyId_New = "" != o ? o : _POSTAVKE_KAMPA_.propertyId,
            ProcesBookiranja(paramZaBooking.brojSJ, paramZaBooking.datumOd, paramZaBooking.brojDana, paramZaBooking.brojOsoba, paramZaBooking.djecaGodine, paramZaBooking.jezik, mishDatumOd, mishDatumDo, pmsPropertyId_New),
            document.getElementById("bukiraj").disabled = !1
        }
    }),
    slobodne = zauzetiSmjestaji_Sve;
    var m, u, v, h, f, _, x, y, k, w, P, j, A, S, T, M, C, O, E, L, I, z, R, D, K, B, H = {};
    H.decodeCustom = function(e, a) {
        for (var t, o, n = 0, s = 0, l = 0, c = [], d = 0, p = 0, m = null, u = Math.pow(10, Number.isInteger(a) ? a : 5); n < e.length; ) {
            m = null,
            d = 0,
            p = 0;
            do
                p |= (31 & (m = e.charCodeAt(n++) - 63)) << d,
                d += 5;
            while (m >= 32);
            t = 1 & p ? ~(p >> 1) : p >> 1,
            d = p = 0;
            do
                p |= (31 & (m = e.charCodeAt(n++) - 63)) << d,
                d += 5;
            while (m >= 32);
            o = 1 & p ? ~(p >> 1) : p >> 1,
            s += t,
            l += o,
            c.push([s / u, l / u])
        }
        return c
    }
    ,
    H.toGeoJSONCustom = function(e, a) {
        return {
            type: "LineString",
            coordinates: function e(a) {
                for (var t = [], o = 0; o < a.length; o++) {
                    var n = a[o].slice();
                    t.push([n[1], n[0]])
                }
                return t
            }(H.decodeCustom(e, a))
        }
    }
    ,
    formatGPSDistance = {
        metric: function e(a) {
            return a >= 1e5 ? (a / 1e3).toFixed(0) + "km" : a >= 1e4 ? (a / 1e3).toFixed(1) + "km" : a >= 1e3 ? (a / 1e3).toFixed(2) + "km" : a >= 100 ? a + "m" : a.toFixed(0) + "m"
        }
    };
    var U = {
        Market: [{
            icon: "shopping-cart"
        }],
        Restaurant: [{
            icon: "utensils"
        }],
        Bakery: [{
            icon: "croissant"
        }]
    }
      , N = {
        "objekt recepcija": [{
            icon: "ico-info"
        }],
        "objekt wc": [{
            icon: "ico-wc"
        }],
        "objekt restoran": [{
            icon: "ico-restaurant"
        }],
        "objekt bar": [{
            icon: "ico-caffe-bar"
        }],
        "objekt suncobran": [{
            icon: "ico-beach-umbrella"
        }],
        "objekt lezaljke": [{
            icon: "ico-lounger"
        }]
    };
    poiLabels = _CMS_POILabels;
    var F = {
        rub: [{
            color: "#d9ccb5",
            border: "#d9ccb5"
        }],
        obala: [{
            color: "#f2f2e6",
            border: "#9e9e8c"
        }],
        obala_append: [{
            color: "#dedec5",
            border: "#b9bbbb"
        }],
        zemlja: [{
            color: "#dedec5",
            border: "#b2b39f"
        }],
        trava: [{
            color: "#b4d894",
            border: "#94b37b"
        }],
        zona: [{
            color: _PARAMETRI_KAMPA.zonaLayerColor,
            border: "#94b37b"
        }],
        zona_b: [{
            color: _PARAMETRI_KAMPA.zona_bLayerColor,
            border: "#94b37b"
        }],
        cesta: [{
            color: "#e2e6e8",
            border: "#adaeae"
        }],
        vegetacija: [{
            color: "#98b87c",
            border: "#8ba870"
        }],
        vege_shadow: [{
            color: "#6d8b52",
            border: "#8ba870"
        }],
        top4: [{
            color: "#43632E",
            border: "#43632E"
        }],
        top3: [{
            color: "#8fbe72",
            border: "#709f50"
        }],
        top2: [{
            color: "#66954C",
            border: "#66954C"
        }],
        top1: [{
            color: "#709f50",
            border: "#709f50"
        }],
        parking_podloga: [{
            color: "#e2e6e8",
            border: "#adaeae"
        }],
        rampa_podloga: [{
            color: "#f2f2f2",
            border: "#adaeae"
        }],
        rampa: [{
            color: "#ffffff",
            border: "#adaeae"
        }],
        "rampa crveno": [{
            color: "#d20808",
            border: "#b20606"
        }],
        parking_linija: [{
            color: "#ffffff",
            border: "#ffffff"
        }],
        teren_linija: [{
            color: "#ffffff",
            border: "#ffffff"
        }],
        bazen_podloga: [{
            color: "#ebebeb",
            border: "#9bc07b"
        }],
        bazen: [{
            color: "#8dedff",
            border: "#6ab2bf"
        }],
        objekti_podloga: [{
            color: "#f2f2f2",
            border: "#adaeae"
        }],
        "objekt restoran": [{
            color: "transparent",
            border: "transparent"
        }],
        "objekt recepcija": [{
            color: "transparent",
            border: "transparent"
        }],
        "objekt teren": [{
            color: "#68b29e",
            border: "#68b29e"
        }],
        teren_podloga: [{
            color: "#65cbbf",
            border: "#68b29e"
        }],
        "objekt parking": [{
            color: "#f1f2f5",
            border: "#b2b3b3"
        }],
        "objekt bar": [{
            color: "transparent",
            border: "transparent"
        }],
        mobilka: [{
            color: "#6babdd",
            border: "#5d94bf"
        }],
        "objekt wc": [{
            color: "transparent",
            border: "transparent"
        }],
        "objekt wc roof1": [{
            color: "#f28586",
            border: "#c26b6c"
        }],
        "objekt wc roof2": [{
            color: "#cf7273",
            border: "#c26b6c"
        }],
        "objekt recepcija roof1": [{
            color: "#f28586",
            border: "#c26b6c"
        }],
        "objekt recepcija roof2": [{
            color: "#cf7273",
            border: "#c26b6c"
        }],
        "objekt restoran roof1": [{
            color: "#f28586",
            border: "#c26b6c"
        }],
        "objekt restoran roof2": [{
            color: "#cf7273",
            border: "#c26b6c"
        }],
        "objekt bar roof1": [{
            color: "#f28586",
            border: "#c26b6c"
        }],
        "objekt bar roof2": [{
            color: "#cf7273",
            border: "#c26b6c"
        }],
        "objekt lezaljke": [{
            color: "#d5dcde",
            border: "#a0a5a7"
        }],
        "objekt suncobran": [{
            color: "#98e4f2",
            border: "#7fbfcc"
        }],
        "objekt suncobran color": [{
            color: "#85c7d5",
            border: "#7fbfcc"
        }],
        "objekt suncobran_boja": [{
            color: "#ffffff",
            border: "#7fbfcc"
        }]
    }
      , V = {
        "2B": [{
            en: "2 Bedroom",
            hr: "2 spavaće sobe",
            it: "2 camere da letto",
            de: "2 Schlafzimmer"
        }]
    }
      , Z = {
        wifi: [{
            icon: "wifi"
        }],
        parking: [{
            icon: "parking"
        }],
        spa: [{
            icon: "spa"
        }],
        laundry: [{
            icon: "washer"
        }],
        microwave: [{
            icon: "microwave"
        }],
        odvodnja: [{
            icon: "water-lower"
        }],
        struja6a: [{
            icon: "bolt"
        }],
        struja10a: [{
            icon: "bolt"
        }],
        struja16a: [{
            icon: "bolt"
        }],
        water: [{
            icon: "water"
        }],
        sattv: [{
            icon: "tv"
        }],
        kabeltv: [{
            icon: "tv"
        }],
        perilicaposuda: [{
            icon: "washing-machine"
        }],
        perilicarublja: [{
            icon: "washer"
        }],
        klima: [{
            icon: "air-conditioner"
        }],
        toster: [{
            icon: "bread-slice"
        }],
        pegla: [{
            icon: "tshirt"
        }],
        shower: [{
            icon: "shower"
        }],
        sink: [{
            icon: "sink"
        }],
        childrenToilet: [{
            icon: "child"
        }],
        chemicalToilet: [{
            icon: "atom"
        }],
        disabledToilet: [{
            icon: "wheelchair"
        }],
        privateToilet: [{
            icon: "user-secret"
        }],
        clothingWash: [{
            icon: "washer"
        }],
        dishWash: [{
            icon: "hand-wash"
        }],
        laundry: [{
            icon: "washing-machine"
        }],
        dryer: [{
            icon: "dryer"
        }],
        dogShower: [{
            icon: "dog"
        }],
        refrigerator: [{
            icon: "refrigerator"
        }],
        ambulanta: [{
            icon: "ambulance"
        }],
        restaurant: [{
            icon: "soup"
        }],
        wellness: [{
            icon: "spa"
        }],
        hairdresser: [{
            icon: "user-hair"
        }],
        fitness: [{
            icon: "running"
        }],
        kiosk: [{
            icon: "store"
        }],
        bar: [{
            icon: "beer"
        }],
        dog: [{
            icon: "dog"
        }],
        ban: [{
            icon: "ban"
        }]
    }
      , Y = {
        free: "#00d64a",
        occupied: "#ff4659",
        naupit: "#FFD580"
    }
      , J = ev;
    function q(e, a) {
        var t = ev;
        if (e == t(310))
            return t(310);
        var o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i[t(330)](e);
        r = parseInt(o[1], 16),
        g = parseInt(o[2], 16),
        b = parseInt(o[3], 16),
        r /= 255,
        g /= 255,
        b /= 255;
        var n, s, l = Math[t(308)](r, g, b), c = Math[t(301)](r, g, b), d = (l + c) / 2;
        if (l == c)
            n = s = 0;
        else {
            var p = l - c;
            switch (s = d > .5 ? p / (2 - l - c) : p / (l + c),
            l) {
            case r:
                n = (g - b) / p + (g < b ? 6 : 0);
                break;
            case g:
                n = (b - r) / p + 2;
                break;
            case b:
                n = (r - g) / p + 4
            }
            n /= 6
        }
        var m = {};
        return n *= 360,
        s *= 100,
        d *= 100,
        "border" == a && (d -= 4),
        "gps" == a && (d = 90),
        a == t(288) && (d = 85),
        m.h = Math[t(272)](n),
        m.s = Math[t(272)](s),
        m.l = Math[t(272)](d),
        "hsl(" + m.h + t(286) + m.s + "%, " + m.l + "%)"
    }
    function G(e, a) {
        var t = ev;
        let o = !1;
        "#" == e[0] && (e = e[t(299)](1),
        o = !0);
        let n = parseInt(e, 16)
          , s = (n >> 16) + a;
        s > 255 ? s = 255 : s < 0 && (s = 0);
        let l = (n >> 8 & 255) + a;
        l > 255 ? l = 255 : l < 0 && (l = 0);
        let c = (255 & n) + a;
        c > 255 ? c = 255 : c < 0 && (c = 0);
        let d = (c | l << 8 | s << 16)[t(322)](16);
        for (; d[t(298)] < 6; )
            d = 0 + d;
        return (o ? "#" : "") + d
    }
    !function(e, a) {
        for (var t = ev, o = e(); ; )
            try {
                if (parseInt(t(289)) / 1 + parseInt(t(315)) / 2 * (parseInt(t(273)) / 3) + -parseInt(t(339)) / 4 + parseInt(t(290)) / 5 * (parseInt(t(295)) / 6) + -parseInt(t(305)) / 7 + parseInt(t(278)) / 8 + -parseInt(t(297)) / 9 * (parseInt(t(300)) / 10) == 798154)
                    break;
                o.push(o.shift())
            } catch (n) {
                o.push(o.shift())
            }
    }(ex, 798154);
    var W = -40
      , Q = -20
      , X = -100
      , ee = {
        fill: function() {
            var e = ev
              , a = [];
            for (i = 0; i < arguments[e(298)]; i++)
                if (arguments[i][e(276)](e(277)) || arguments[i].includes(e(291)) || arguments[i][e(276)]("mh") || a[e(271)](arguments[i], eS(arguments[i], e(280))),
                arguments[i][e(276)](e(277)) || arguments[i][e(276)]("glamping") || arguments[i][e(276)]("mh")) {
                    for (i = 0; i < m.length; i++)
                        a.push(m[i], u[i][0][e(280)]);
                    a.push(e(310))
                }
            return a
        },
        border: function() {
            var e = ev
              , a = [];
            for (i = 0; i < arguments[e(298)]; i++)
                if (arguments[i][e(276)](e(277)) || arguments[i][e(276)](e(291)) || arguments[i].includes("mh") || a[e(271)](arguments[i], eS(arguments[i], e(311))),
                arguments[i][e(276)](e(277)) || arguments[i][e(276)](e(291)) || arguments[i][e(276)]("mh")) {
                    for (i = 0; i < m[e(298)]; i++)
                        a[e(271)](m[i], G(u[i][0][e(280)], W));
                    a[e(271)]("transparent")
                }
            return a
        },
        fill_gps: function() {
            var e = ev
              , a = [];
            for (i = 0; i < arguments[e(298)]; i++)
                if (arguments[i][e(276)](e(277)) || arguments[i][e(276)](e(291)) || arguments[i][e(276)]("mh") || a[e(271)](arguments[i], q(eS(arguments[i], e(280)), "gps")),
                arguments[i][e(276)]("parcela") || arguments[i][e(276)]("glamping") || arguments[i][e(276)]("mh")) {
                    for (i = 0; i < m[e(298)]; i++)
                        a[e(271)](m[i], q(u[i][0][e(280)], e(335)));
                    a[e(271)](e(310))
                }
            return a
        },
        border_gps: function() {
            var e = ev
              , a = [];
            for (i = 0; i < arguments[e(298)]; i++)
                if (arguments[i][e(276)](e(277)) || arguments[i][e(276)]("glamping") || arguments[i][e(276)]("mh") || a.push(arguments[i], q(eS(arguments[i], "border"), e(288))),
                arguments[i].includes(e(277)) || arguments[i].includes("glamping") || arguments[i][e(276)]("mh")) {
                    for (i = 0; i < m[e(298)]; i++)
                        a[e(271)](m[i], q(G(u[i][0][e(280)], W), "gps_border"));
                    a[e(271)](e(310))
                }
            return a
        }
    };
    m = Object[J(337)](brandColors),
    u = Object[J(306)](brandColors);
    var ea = [J(275), J(325), J(329), J(318), "zona_b", J(284)]
      , et = [J(279)]
      , ei = Object[J(337)](F).filter(e=>!ea[J(276)](e) && !et[J(276)](e))
      , eo = [J(277), J(291), "mh"];
    function en() {
        var e = J;
        void 0 != map[e(282)](e(341)) && ep(),
        map[e(324)](e(283), "fill-color", [e(321), [e(314), e(302)], ...ee[e(293)](...ea), "transparent"]),
        map[e(324)](e(334), e(287), [e(321), [e(314), e(302)], ...ee[e(311)](...ea), e(310)]),
        map.setPaintProperty(e(338), e(296), ["match", [e(314), e(302)], ...ee[e(293)](...et), e(310)]),
        map[e(324)]("layer2_border", e(287), ["match", [e(314), e(302)], ...ee.border(...et), e(310)]),
        map[e(324)]("layer3_fill", e(296), [e(321), [e(314), e(302)], ...ee[e(293)](...ei), [e(321), ["get", e(333)], ...ee[e(293)](...eo)]]),
        map[e(324)](e(316), e(287), [e(321), ["get", "class"], ...ee[e(311)](...ei), [e(321), [e(314), e(333)], ...ee.border(...eo)]])
    }
    function er() {
        var e = J;
        map[e(324)](e(283), "fill-color", ["match", [e(314), e(302)], ...ee.fill_gps(...ea), e(310)]),
        map[e(324)]("layer1_border", "line-color", [e(321), [e(314), e(302)], ...ee[e(336)](...ea), e(310)]),
        map[e(324)](e(338), e(296), [e(321), [e(314), e(302)], ...ee[e(323)](...et), e(310)]),
        map[e(324)](e(328), e(287), [e(321), [e(314), e(302)], ...ee[e(336)](...et), e(310)])
    }
    function es(e) {
        var a = J;
        ed(e.toString()),
        er(),
        map[a(324)](a(317), a(296), ["match", [a(312), [a(314), "id"], ["get", a(331)]], e[a(322)](), [a(321), [a(314), a(333)], ...ee[a(293)](...eo), a(310), [a(321), [a(314), a(302)], ...ee[a(293)](...ei), a(310)]], [a(321), [a(314), "class"], ...ee.fill_gps(...ei), ["match", [a(314), a(333)], ...ee[a(323)](...eo)]]]),
        map[a(324)](a(316), a(287), [a(321), [a(312), [a(314), "id"], [a(314), "foreign-key"]], e[a(322)](), ["match", ["get", a(333)], ...ee[a(311)](...eo), a(310), [a(321), [a(314), "class"], ...ee[a(311)](...ei), a(310)]], [a(321), [a(314), a(302)], ...ee[a(336)](...ei), [a(321), ["get", a(333)], ...ee[a(336)](...eo)]]])
    }
    function el(e) {
        var a = J;
        ed(e[a(322)]()),
        er(),
        map[a(324)](a(317), a(296), [a(321), [a(312), [a(314), "id"], ["get", a(331)]], e.toString(), [a(321), ["get", "id"], slobodne, Y[a(320)], ["match", [a(314), "id"], accomodation, Y[a(340)], [a(321), [a(314), a(302)], ...ee[a(293)](...ei), a(310)]]], [a(321), [a(314), "class"], ...ee[a(323)](...ei), ["match", ["get", "id"], slobodne, q(Y.occupied, [a(335)]), [a(321), [a(314), "id"], accomodation, q(Y[a(340)], [a(335)]), a(310)]]]]),
        map.setPaintProperty(a(316), a(287), [a(321), [a(312), [a(314), "id"], [a(314), a(331)]], e[a(322)](), [a(321), [a(314), "id"], slobodne, G(Y.occupied, W), ["match", [a(314), "id"], accomodation, G(Y[a(340)], W), ["match", ["get", a(302)], ...ee[a(311)](...ei), "transparent"]]], ["match", [a(314), a(302)], ...ee[a(336)](...ei), [a(321), [a(314), "id"], slobodne, q(G(Y.occupied, Q), [a(288)]), [a(321), ["get", "id"], accomodation, q(G(Y[a(340)], X), [a(288)]), a(310)]]]])
    }
    function ec(e) {
        var a = J;
        map[a(324)](a(341), a(326), [a(321), ["get", a(333)], e, .8, .2])
    }
    function ed(e) {
        var a = J;
        map.setPaintProperty(a(341), a(326), [a(321), [a(314), "id"], e, .8, .2]),
        map[a(324)](a(327), "icon-opacity", [a(321), [a(314), "foreign-id"], e[a(322)](), 1, [a(321), [a(314), "id"], e[a(322)](), 1, .3]])
    }
    function ep() {
        var e = J;
        map[e(324)](e(341), e(326), .8)
    }
    function e$() {
        var e = J;
        map[e(324)](e(341), e(326), .2)
    }
    function em(e) {
        var a = J;
        map[a(324)]("poi-numbers", a(326), [a(321), [a(314), a(302)], e, .8, .2]),
        map[a(324)](a(327), "icon-opacity", [a(321), [a(314), a(303)], e, .8, .2])
    }
    function eu(e) {
        var a = J;
        ec(e.toString()),
        er(),
        map[a(324)](a(317), "fill-color", ["match", [a(314), a(333)], e[a(322)](), [a(321), [a(314), a(333)], ...ee[a(293)](...eo)], [a(321), [a(314), "class"], ...ee[a(323)](...ei), ["match", [a(314), a(333)], ...ee.fill_gps(...eo)]]]),
        map[a(324)](a(316), "line-color", [a(321), ["get", a(333)], e.toString(), [a(321), [a(314), "brand"], ...ee.border(...eo)], ["match", ["get", "class"], ...ee[a(336)](...ei), [a(321), [a(314), a(333)], ...ee[a(336)](...eo)]]])
    }
    function eg(e) {
        var a = J;
        ec(e.toString()),
        er(),
        map[a(324)](a(317), a(296), ["match", [a(314), a(302)], ...ee.fill_gps(...ei), [a(321), [a(314), a(333)], e[a(322)](), [a(321), [a(314), "id"], slobodne, Y[a(320)], ["match", [a(314), "id"], accomodation, Y[a(340)], a(310)]], [a(321), [a(314), "id"], slobodne, q(Y[a(320)], [a(335)]), [a(321), [a(314), "id"], accomodation, q(Y.free, ["gps"]), a(310)]]]]),
        map.setPaintProperty(a(316), a(287), [a(321), [a(314), "class"], ...ee[a(336)](...ei), [a(321), [a(314), "brand"], e.toString(), [a(321), [a(314), "id"], slobodne, G(Y.occupied, W), [a(321), ["get", "id"], accomodation, G(Y.free, W), a(310)]], [a(321), [a(314), "id"], slobodne, q(G(Y[a(320)], Q), [a(288)]), [a(321), [a(314), "id"], accomodation, q(G(Y[a(340)], X), [a(288)]), a(310)]]]])
    }
    function ev(e, a) {
        var t = ex();
        return (ev = function(e, a) {
            return t[e -= 271]
        }
        )(e, a)
    }
    function eh(e) {
        var a = J;
        em(e),
        er();
        var t = [e[a(322)](), e.toString() + " roof1", e.toString() + a(304)];
        "objekt lezaljke" == e && (map.setPaintProperty(a(317), "fill-color", [a(321), ["get", a(302)], ...ee[a(323)](...ei.filter(e=>"objekt lezaljke" != e)), [a(321), ["get", a(302)], e, [a(321), [a(314), "id"], slobodne, Y[a(320)], [a(321), [a(314), "id"], accomodation, Y[a(340)], a(310)]], [a(321), [a(314), "id"], slobodne, q(Y[a(320)], [a(335)]), [a(321), [a(314), "id"], accomodation, q(Y[a(340)], ["gps"]), a(310)]]]]),
        map[a(324)]("layer3_border", "line-color", ["match", [a(314), a(302)], ...ee[a(336)](...ei.filter(e=>"objekt lezaljke" != e)), [a(321), [a(314), a(302)], e, [a(321), [a(314), "id"], slobodne, G(Y.occupied, W), [a(321), [a(314), "id"], accomodation, G(Y[a(340)], W), a(310)]], [a(321), [a(314), "id"], slobodne, q(G(Y[a(320)], Q), [a(288)]), ["match", [a(314), "id"], accomodation, q(G(Y[a(340)], X), [a(288)]), a(310)]]]])),
        "objekt suncobran" == e && (map[a(324)](a(317), "fill-color", [a(321), ["get", a(302)], ...ee[a(323)](...ei[a(307)](e=>e != a(319))), [a(321), [a(314), a(302)], e, [a(321), ["get", "id"], slobodne, Y[a(320)], ["match", [a(314), "id"], accomodation, Y[a(340)], "transparent"]], [a(321), [a(314), "id"], slobodne, q(Y[a(320)], ["gps"]), ["match", ["get", "id"], accomodation, q(Y[a(340)], [a(335)]), a(310)]]]]),
        map[a(324)](a(316), a(287), [a(321), [a(314), a(302)], ...ee[a(336)](...ei[a(307)](e=>"objekt suncobran" != e)), ["match", ["get", "class"], e, [a(321), [a(314), "id"], slobodne, G(Y[a(320)], W), ["match", ["get", "id"], accomodation, G(Y[a(340)], W), a(310)]], [a(321), [a(314), "id"], slobodne, q(G(Y[a(320)], Q), [a(288)]), [a(321), ["get", "id"], accomodation, q(G(Y[a(340)], X), [a(288)]), "transparent"]]]])),
        e != a(294) && e != a(319) && (map[a(324)]("layer3_fill", a(296), ["match", [a(314), "class"], t, ["match", ["get", a(302)], ...ee[a(293)](...ei), a(310)], [a(321), [a(314), a(302)], ...ee[a(323)](...ei), [a(321), [a(314), "id"], slobodne, q(Y[a(320)], [a(335)]), [a(321), [a(314), "id"], accomodation, q(Y[a(340)], ["gps"]), a(310)]]]]),
        map[a(324)](a(316), a(287), [a(321), [a(314), a(302)], t, [a(321), [a(314), a(302)], ...ee[a(311)](...ei), "transparent"], [a(321), [a(314), a(302)], ...ee[a(336)](...ei), ["match", ["get", "id"], slobodne, q(G(Y.occupied, Q), [a(288)]), [a(321), ["get", "id"], accomodation, q(G(Y[a(340)], X), [a(288)]), a(310)]]]]))
    }
    function ef() {
        var e = J;
        map[e(324)](e(317), e(296), [e(321), [e(314), "id"], lezaljke, Y[e(320)], [e(321), [e(314), "id"], lezaljke, Y[e(340)], e(310)]])
    }
    function e_() {
        var e = J;
        ep(),
        en(),
        ek(),
        map[e(324)](e(317), e(296), [e(321), ["get", e(302)], ...ee[e(293)](...ei), [e(321), ["get", "id"], slobodne, Y[e(320)], ["match", ["get", "id"], accomodation, Y[e(340)], "transparent"]]]),
        map.setPaintProperty(e(316), e(287), [e(321), ["get", e(302)], ...ee.border(...ei), [e(321), ["get", "id"], slobodne, G(Y[e(320)], W), ["match", [e(314), "id"], accomodation, G(Y[e(340)], W), e(310)]]])
    }
    function eb(e) {
        var a = J;
        em(e),
        er();
        var t = [e[a(322)](), e[a(322)]() + a(309), e[a(322)]() + a(304)];
        map[a(324)](a(317), a(296), ["match", [a(314), a(302)], t, [a(321), [a(314), a(302)], ...ee[a(293)](...ei), a(310)], [a(321), [a(314), a(302)], ...ee[a(323)](...ei), [a(321), [a(314), a(333)], ...ee.fill_gps(...eo)]]]),
        map[a(324)](a(316), a(287), [a(321), [a(314), "class"], t, [a(321), ["get", a(302)], ...ee[a(311)](...ei), a(310)], ["match", [a(314), a(302)], ...ee.border_gps(...ei), [a(321), [a(314), a(333)], ...ee[a(336)](...eo)]]])
    }
    function ex() {
        var e = [" roof2", "9987775nUEEYd", "values", "filter", "max", " roof1", "transparent", "border", "concat", "forEach", "get", "13426ypVtHR", "layer3_border", "layer3_fill", "zona", "objekt suncobran", "occupied", "match", "toString", "fill_gps", "setPaintProperty", "obala", "text-opacity", "poi", "layer2_border", "zemlja", "exec", "foreign-key", "map", "brand", "layer1_border", "gps", "border_gps", "keys", "layer2_fill", "4160064pFgmUQ", "free", "poi-numbers", "push", "ceil", "276FcOvQp", "properties", "rub", "includes", "parcela", "9365440tsTsgw", "cesta", "color", "number", "getLayer", "layer1_fill", "trava", "naupit", "deg, ", "line-color", "gps_border", "1060020Eqnclo", "15KsvnaX", "glamping", "features", "fill", "objekt lezaljke", "1661742pSoqmC", "fill-color", "84717TRgUSU", "length", "slice", "440WLdtxS", "min", "class", "icon"];
        return (ex = function() {
            return e
        }
        )()
    }
    function ey() {
        map.setPaintProperty("poi", "icon-opacity", .3)
    }
    function ek() {
        map.setPaintProperty("poi", "icon-opacity", 1)
    }
    function e8(e) {
        map.setPaintProperty("poi", "icon-opacity", ["match", ["get", "icon"], e.toString(), 1, .3])
    }
    function ew(e) {
        map.setPaintProperty("poi", "icon-opacity", ["match", ["get", "icon"], N[e][0].icon.toString(), 1, .3])
    }
    function eP(e) {
        return void 0 === V[e] ? "" : `<span class="text-acc-type">${V[e][0][lng]}</span>`
    }
    function ej(e) {
        return void 0 === V[e] ? "" : `<div class="acc-type">${V[e][0][lng]}</div>`
    }
    function eA(e) {
        return void 0 === brandColors[e] ? "" : `<div class="brand-badge" style="background:${brandColors[e][0].color};border:2px solid ${q(brandColors[e][0].color, "border")}">${e}</div>`
    }
    function e0(e, a) {
        if (void 0 === e || void 0 === e["Working Hours"])
            return "";
        var t, o, n = e["Working Hours"], s = _RadnoVrijeme(n, lng);
        return (t = "open" === s.status ? translations.danas[0][lng] : translations[s.slijedecidan][0][lng],
        void 0 === n) ? "" : (o = "" === s.zatvaramo && "" === s.otvaramo ? "" : "open" === s.status ? "" === s.zatvaramo ? "" : translations.Closing[0][lng] + " " + s.zatvaramo : translations.Opening[0][lng] + " " + s.otvaramo,
        "recommended" == a) ? `<div id="openTag" class="${s.status}">${translations[s.status.substr(0, 1).toUpperCase() + s.status.substr(1)][0][lng]}</div>
                <div id="closeTag" class=${"open" === s.status ? "closing" : ""}>${o}</div>` : `<div id="openTag" class="${s.status}">${translations[s.status.substr(0, 1).toUpperCase() + s.status.substr(1)][0][lng]}</div>
        <div id="closeTag" class=${"open" === s.status ? "closing" : ""}>${o}</div>
        <div id="workHors">${translations["Working hours"][0][lng] + t + ": <b>" + s.vrijemedo}</b></div>`
    }
    function eS(e, a) {
        return void 0 === F[e] ? "transparent" : F[e][0][a]
    }
    function eT(e, a) {
        return void 0 === brandColors[e] ? "transparent" : brandColors[e][0][a]
    }
    function eM(e) {
        if (void 0 !== e) {
            var a = e.replace(/\\/g, "");
            for (i = 0,
            a = JSON.parse(a = (a = a.replace('"{', "")).replace('"}', "")); i < a.length; i++)
                if (void 0 !== Z[a[i]]) {
                    var t = `<div class="modal-info-inner"><i class="fas fa-${Z[a[i]][0].icon}"></i><div><p>${Z[a[i]][0][lng]}</p></div></div>`;
                    $(".amenities").append(t)
                }
        } else {
            var t = `<div class="modal-info-inner"><i class="fas fa-wifi"></i><div><p>WiFi</p></div></div>
<div class="modal-info-inner"><i class="fas fa-parking"></i><div><p>Parking</p></div></div>`;
            $(".amenities").append(t)
        }
    }
    function e2() {
        !0 == map.loaded() && !0 == map.areTilesLoaded() || setTimeout(function() {
            e2()
        }, 1e3)
    }
    map.on("style.load", ()=>{
        let e = ()=>{
            myMap.isStyleLoaded() || setTimeout(e, 200)
        }
        ;
        e()
    }
    ),
    map.once("idle", ()=>{
        function e() {
            return centroids = {
                type: "FeatureCollection",
                features: []
            },
            centroidNames = rezultat1.features.filter((e,a)=>"yes" == e.properties["centroid-name"]),
            centroidIcon = rezultat1.features.filter((e,a)=>"yes" != e.properties["centroid-name"] && e.properties["centroid-name"]),
            poiNumbers = rezultat1.features.filter((e,a)=>e.properties.number && !e.properties.centroid && "lezaljke" != e.properties.class.split(" ")[1] && "suncobran" != e.properties.class.split(" ")[1]),
            lezaljkeNumbers = rezultat1.features.filter((e,a)=>e.properties.numbera),
            suncobraniNumbers = rezultat1.features.filter((e,a)=>e.properties.numberb),
            poiCentroids = rezultat1.features.filter((e,a)=>e.properties.number && e.properties.centroid),
            centroidNames.forEach(e=>centroids.features.push(turf.centerOfMass(e.geometry, {
                properties: {
                    "centroid-name": void 0 != e.properties.label ? e.properties[lng] + "\n" + e.properties.label : e.properties[lng],
                    id: e.properties.id,
                    class: e.properties.class
                }
            }))),
            centroidIcon.forEach(e=>centroids.features.push(turf.centerOfMass(e.geometry, {
                properties: {
                    icon: e.properties["centroid-name"],
                    brand: e.properties.brand,
                    id: e.properties.id
                }
            }))),
            poiNumbers.forEach(e=>centroids.features.push(turf.centerOfMass(e.geometry, {
                properties: {
                    number: e.properties.number,
                    brand: e.properties.brand,
                    id: e.properties.id
                }
            }))),
            lezaljkeNumbers.forEach(e=>centroids.features.push(turf.centerOfMass(e.geometry, {
                properties: {
                    numbera: e.properties.numbera,
                    id: e.properties.id
                }
            }))),
            suncobraniNumbers.forEach(e=>centroids.features.push(turf.centerOfMass(e.geometry, {
                properties: {
                    numberb: e.properties.numberb,
                    id: e.properties.id
                }
            }))),
            poiCentroids.forEach(e=>centroids.features.push(turf.point(e.properties.centroid, {
                number: e.properties.number,
                brand: e.properties.brand,
                id: e.properties.id
            }))),
            centroids
        }
        map.addSource("statesData", {
            type: "geojson",
            data: rezultat1
        }),
        $("body").append(`<div class="languages"><h3 class="languages-header">${translations["Select language"][0][lng]}</h3><span class="lang-list"><div data-lang="en"></div><div data-lang="hr"></div><div data-lang="it"></div><div data-lang="de"></div><div data-lang="nl"></div><div data-lang="si"></div><div data-lang="pl"></div></div></span></div>`),
        $(".languages div").each(function() {
            $(this).data("lang") == lng && $(this).addClass("active")
        }),
        $(".languages div").on("click", function(a) {
            $(".menu-item").removeClass("selected"),
            $(".menu-item").removeClass("not-selected");
            var t, o, n = lng;
            lng = $(a.target).data("lang"),
            map.getSource("centroids").setData(e()),
            $("html").attr("lang", lng),
            $(".languages-header").text(`${translations["Select language"][0][lng]}`),
            $(".languages div").removeAttr("class"),
            $(this).addClass("active"),
            $(".languages").toggleClass("open"),
            $("#navigateTo span").text(`${translations["Take me"][0][lng]}`),
            $("#filter").text(`${translations.Filter[0][lng]}`),
            $("[data-id=accomodation]").text(`${translations.Accomodation[0][lng]}`),
            $("[data-id=facilities]").text(`${translations.Facilities[0][lng]}`),
            $("[data-caption=Pitch]").text(`${translations.Pitch[0][lng]}`),
            $("[data-caption=MH]").text(`${translations.MH[0][lng]}`),
            $("[data-caption=Glamping]").text(`${translations.Glamping[0][lng]}`),
            $("[data-caption=Caravan]").text(`${translations.Caravan[0][lng]}`),
            void 0 != $(".filter-item:not(.brand).active").data("class-object") && (t = $(".filter-item:not(.brand).active").data("class-object")),
            void 0 != $(".filter-item:not(.brand).active").data("class") && (o = $(".filter-item:not(.brand).active").data("class")),
            $(".facilities").html("");
            var s = Array.from(new Set(rezultat1.features.filter(e=>"objekt" == e.properties.class.split(" ")[0] && "yes" != e.properties.filter && !e.properties.class.includes("roof") && !e.properties.class.includes("suncobran_boja")).map(e=>e.properties.class)));
            if ((s = s.sort(function(e, a) {
                return poiLabels[N[e][0].icon][0][lng] < poiLabels[N[a][0].icon][0][lng] ? -1 : poiLabels[N[e][0].icon][0][lng] > poiLabels[N[a][0].icon][0][lng] ? 1 : 0
            })).length > 0) {
                var l = document.createElement("div");
                l.classList.add("facilities-caption"),
                l.setAttribute("data-caption", "Main"),
                l.innerHTML = translations.Main[0][lng],
                $(".facilities").append(l),
                s.forEach((e,a)=>{
                    var n = document.createElement("div");
                    n.classList.add("filter-item"),
                    n.setAttribute("data-class-object", e),
                    void 0 != t && (e == t && (n.classList.add("active"),
                    n.style.opacity = 1,
                    n.style.fontWeight = 700),
                    e != t && (n.style.opacity = .5)),
                    (void 0 == t && void 0 != o || $(".filter-item.brand").is(".active")) && (n.style.opacity = .5);
                    var s = document.createTextNode(poiLabels[N[e][0].icon][0][lng])
                      , l = document.createElement("span")
                      , c = document.createElement("span")
                      , d = document.createElement("img");
                    d.src = "assets/img/icons/" + N[e][0].icon + ".svg?",
                    l.classList.add("filter-square"),
                    c.classList.add("filter-text"),
                    n.appendChild(l),
                    l.appendChild(d),
                    l.appendChild(s),
                    c.appendChild(s),
                    n.appendChild(c),
                    $(".facilities").append(n)
                }
                )
            }
            var c = Array.from(new Set(rezultat1.features.filter(e=>"interest-point" == e.properties.class && "no" != e.properties.filter).map(e=>e.properties.icon)));
            if ((c = c.sort(function(e, a) {
                return poiLabels[e][0][lng] < poiLabels[a][0][lng] ? -1 : poiLabels[e][0][lng] > poiLabels[a][0][lng] ? 1 : 0
            })).length > 0) {
                var l = document.createElement("div");
                l.classList.add("facilities-caption"),
                l.setAttribute("data-caption", "POI"),
                l.innerHTML = translations.POI[0][lng],
                $(".facilities").append(l),
                c.forEach((e,a)=>{
                    var n = document.createElement("div");
                    n.classList.add("filter-item"),
                    n.setAttribute("data-class", e),
                    void 0 != o && (e == o && (n.classList.add("active"),
                    n.style.opacity = 1,
                    n.style.fontWeight = 700),
                    e != o && (n.style.opacity = .5)),
                    (void 0 == o && void 0 != t || $(".filter-item.brand").is(".active")) && (n.style.opacity = .5);
                    var s = document.createTextNode(void 0 != poiLabels[e] ? poiLabels[e][0][lng] : "")
                      , l = document.createElement("span")
                      , c = document.createElement("span")
                      , d = document.createElement("img");
                    d.src = "assets/img/icons/" + e + ".svg",
                    l.classList.add("filter-square"),
                    c.classList.add("filter-text"),
                    n.appendChild(l),
                    l.appendChild(d),
                    l.appendChild(s),
                    c.appendChild(s),
                    n.appendChild(c),
                    $(".facilities").append(n)
                }
                )
            }
            $("#informations").text(`${translations.Informations[0][lng]}`),
            $("#dimensions").text(`${translations.Dimensions[0][lng]}`),
            $("#area").text(`${translations.Area[0][lng]}`),
            $("#distance").text(`${translations["Distance from the sea"][0][lng]}`),
            $(".amenities").html(`<p id="amenities">${translations.Amenities[0][lng]}</p>`),
            $("#searchHeader").text(`${translations.Search[0][lng]}`),
            $("#search").attr("placeholder", `${translations["Search placeholder"][0][lng]}...`),
            $("#viewall").text(`${translations.Reset[0][lng]}`),
            $(a.target).data("lang") != n && ($("#booknowtraka").text(translations["Book now"][0][lng]),
            $("body").append(`
      <div class="annotation language">
        <h3>${translations["Language changed"][0][lng]}</h3>
        <div class="message">
          <span class="filter-square"><img src="assets/img/flags/${lng}.svg"></span>
          <p>${translations["Language changed to"][0][lng]}</p>
        </div>
      </div>`),
            $(".annotation.language").delay(1500).animate({
                opacity: 0
            }, {
                duration: 1e3,
                complete: function() {
                    $(".annotation.language").remove()
                }
            })),
            picker.setOptions({
                lang: lng
            })
        }),
        $("#layers").click(function() {
            $(".filters").toggleClass("open"),
            $(".filter-item").is(".active") || ($("[data-id=accomodation]").trigger("click"),
            document.querySelector(".accomodation").scrollTo(0, 0)),
            $(".filter-item.brand").is(".active") && ($("[data-id=accomodation]").trigger("click"),
            document.querySelector(".accomodation").scrollTo(0, 0),
            document.querySelector(".accomodation").scrollTo({
                top: $(".filter-item.brand.active").position().top - 10,
                behavior: "smooth"
            })),
            $(".filter-item:not(.brand)").is(".active") && ($("[data-id=facilities]").trigger("click"),
            document.querySelector(".facilities").scrollTo(0, 0),
            document.querySelector(".facilities").scrollTo({
                top: $(".filter-item.active").position().top - 10,
                behavior: "smooth"
            })),
            $("#ModalTrazi").is(":visible") && $("#ModalTrazi").modal("hide"),
            $(".languages").is(".open") && $(".languages").toggleClass("open"),
            $(".mapboxgl-popup").remove()
        }),
        $("#date").on("click", function() {
            !1 == qren && _PERIODI_REZERVACIJE_.forEach(e=>{
                if (e.tip === PITCH_OR_MOBILE) {
                    let a = new Date(e.datumOd)
                      , t = new Date(e.datumDo)
                      , o = [];
                    "0" === e.ponD && o.push(1),
                    "0" === e.utoD && o.push(2),
                    "0" === e.sriD && o.push(3),
                    "0" === e.cetD && o.push(4),
                    "0" === e.petD && o.push(5),
                    "0" === e.subD && o.push(6),
                    "0" === e.nedD && o.push(0),
                    picker.setOptions({
                        lockDaysFilter(e) {
                            let n = e.getDay();
                            if (e.getTime() <= t.getTime() && e.getTime() > a.getTime() || e.getTime() <= t.getTime() + 31536e6 && e.getTime() > a.getTime() + 31536e6)
                                return o.includes(n)
                        }
                    })
                }
            }
            ),
            $("#ModalTrazi").is(":visible") && $("#ModalTrazi").modal("hide"),
            $(this).toggleClass("open"),
            $(".filters").is(".open") && $(".filters").toggleClass("open"),
            $(".languages").is(".open") && $(".languages").toggleClass("open"),
            $(this).is(".open") || $(".litepicker").hide(),
            $(".mapboxgl-popup").remove(),
            $(".book-form").trigger("click")
        }),
        $("#lang").click(function() {
            $("#ModalTrazi").is(":visible") && $("#ModalTrazi").modal("hide"),
            $(".languages").toggleClass("open"),
            $(".filters").is(".open") && $(".filters").toggleClass("open"),
            $(".mapboxgl-popup").remove()
        }),
        $("#navigateTo span").text(`${translations["Take me"][0][lng]}`),
        $("#filter").text(`${translations.Filter[0][lng]}`),
        $("#informations").text(`${translations.Informations[0][lng]}`),
        $("#dimensions").text(`${translations.Dimensions[0][lng]}`),
        $("#area").text(`${translations.Area[0][lng]}`),
        $("#distance").text(`${translations["Distance from the sea"][0][lng]}`),
        $(".amenities").html(`<p id="amenities">${translations.Amenities[0][lng]}</p>`),
        $("#searchHeader").text(`${translations.Search[0][lng]}`),
        $("#search").attr("placeholder", `${translations["Search placeholder"][0][lng]}...`),
        $(".delete").on("click", function() {
            $(".found").remove(),
            $(".recommended").remove(),
            $(".recommandations-container").remove(),
            $("#match-list").before(`<div class='recommended'>${translations.Recommended[0][lng]}</div>`),
            $("#match-list").after(B),
            $("#match-list").html(""),
            $(".feature-buttons .feature-button").removeClass("active"),
            $("#search").val(""),
            $(".form-group").removeClass("write"),
            $("input#search").focus()
        }),
        $("#home").on("click", function() {
            $(".menu-item").removeClass("selected"),
            $(".menu-item").removeClass("not-selected"),
            map.fitBounds(v, {
                padding: {
                    top: .2 * $(window).height(),
                    bottom: .2 * $(window).height(),
                    left: 10,
                    right: 10
                }
            }),
            $("#ModalTrazi").is(":visible") && $("#ModalTrazi").modal("hide"),
            $(".filters").is(".open") && $(".filters").toggleClass("open"),
            $(".languages").is(".open") && $(".languages").toggleClass("open"),
            !0 == gpsActive && ($(".time-distance").hide(),
            $(".mapboxgl-ctrl-top-right .mapboxgl-ctrl").show(),
            $(".mapboxgl-ctrl-geolocate").html(`${translations["Return view"][0][lng]}<img src='assets/img/gps-arrow.svg'>`),
            isVratiPrikaz = !0),
            $(".annotation.weather").is(":visible") && ($(".annotation.weather").remove(),
            $(".weather-bg").remove()),
            $(".mapboxgl-popup").remove()
        }),
        $("#map").click(function() {
            $(".menu-item").removeClass("selected"),
            $(".menu-item").removeClass("not-selected"),
            $(".filters").is(".open") && $(".filters").toggleClass("open"),
            $(".languages").is(".open") && $(".languages").toggleClass("open")
        }),
        map.addLayer({
            id: "layer1_fill",
            type: "fill",
            source: "statesData",
            layout: {},
            paint: {}
        }),
        map.addLayer({
            id: "layer1_border",
            type: "line",
            source: "statesData",
            layout: {},
            paint: {
                "line-width": ["interpolate", ["linear"], ["zoom"], 14, .5, 19, 1]
            }
        }),
        map.addLayer({
            id: "layer2_fill",
            type: "fill",
            source: "statesData",
            layout: {},
            paint: {}
        }),
        map.addLayer({
            id: "layer2_border",
            type: "line",
            source: "statesData",
            layout: {},
            paint: {
                "line-width": ["interpolate", ["linear"], ["zoom"], 14, .5, 19, 1]
            }
        }),
        map.addLayer({
            id: "layer3_fill",
            type: "fill",
            source: "statesData",
            layout: {},
            paint: {}
        }),
        map.addLayer({
            id: "layer3_border",
            type: "line",
            source: "statesData",
            layout: {},
            paint: {
                "line-width": ["interpolate", ["linear"], ["zoom"], 14, .5, 19, 1]
            }
        }),
        map.addSource("linesSource", {
            type: "geojson",
            data: linijePoKampu
        }),
        map.addLayer({
            type: "line",
            source: "linesSource",
            id: "line-background",
            paint: {
                "line-color": ["get", "color"],
                "line-width": ["get", "width"],
                "line-opacity": .6
            }
        }),
        mapLabels = _NATPISI_,
        map.addSource("labelLayer", {
            type: "geojson",
            data: _NATPISI_
        }),
        map.addLayer({
            id: "poi-labelsmap",
            type: "symbol",
            source: "labelLayer",
            layout: {
                "text-field": ["get", "description"],
                "text-variable-anchor": ["center"],
                "text-radial-offset": 0,
                "text-allow-overlap": !0,
                "text-justify": "auto",
                "text-font": ["DIN Pro Bold", "Arial Unicode MS Regular"],
                "text-size": ["interpolate", ["linear"], ["zoom"], 15.5, ["get", "fontmin"], 19, ["get", "fontmax"]],
                "text-justify": "auto",
                "text-rotate": ["get", "rotation"]
            },
            paint: {
                "text-color": ["get", "color"],
                "text-halo-color": ["get", "halo"],
                "text-halo-width": ["get", "halow"]
            }
        }),
        map.addLayer({
            id: "poi",
            type: "symbol",
            source: "statesData",
            layout: {
                "icon-image": ["get", "icon"],
                "icon-size": ["interpolate", ["linear"], ["zoom"], 14, 0, 15.5, ["match", ["get", "icon"], ["ico-info-01"], .4, 0], 19, iconZoomSize],
                "icon-anchor": "center",
                "icon-allow-overlap": !0
            },
            paint: {
                "icon-opacity": 1
            }
        }),
        en(),
        $("#map").css("pointer-events", "none");
        var a, t, o = setInterval(function() {
            var n = map.loaded();
            if (!0 == n) {
                n = !0,
                new NoSleep().enable(),
                $(".mapboxgl-ctrl-geolocate").is("[disabled]") && !noGPS && ($("body").addClass("message"),
                $("body").append(`<div class="annotation"><h3>${translations["Imporant message"][0][lng]}</h3><p>${translations["Navigation not available"][0][lng]}</p><div class="annotation-buttons"><div class="confirm">${translations.Fine[0][lng]}</div></div></div>`),
                $(".confirm").on("click", function() {
                    $("body").removeClass("message"),
                    $(".annotation").remove()
                })),
                $(".profile-switch").on("click", function() {
                    $(".banner").remove(),
                    $(".time-distance").remove(),
                    $("#voice").remove(),
                    $(".annotation.route").remove(),
                    $("body").append($(eC)),
                    void 0 != map.getSource("route2") && void 0 != map.getSource("route") && void 0 != map.getLayer("route") && void 0 != map.getLayer("route-casing") && void 0 != map.getLayer("route2") && void 0 != map.getLayer("route2-casing") && (map.removeLayer("route2-casing"),
                    map.removeLayer("route2"),
                    map.removeSource("route2"),
                    map.removeLayer("route-casing"),
                    map.removeLayer("route"),
                    map.removeSource("route"))
                }),
                $("#car").on("click", function() {
                    ez.actions.setProfile("mapbox/driving"),
                    $("#car").addClass("active"),
                    $("#walk").removeClass("active")
                }),
                $("#walk").on("click", function() {
                    ez.actions.setProfile("mapbox/walking"),
                    $("#walk").addClass("active"),
                    $("#car").removeClass("active")
                }),
                a = turf.envelope(rezultat1.features[0]),
                t = turf.buffer(a, 50, {
                    units: "meters"
                }),
                map.addSource("centroids", {
                    type: "geojson",
                    data: e()
                }),
                map.addLayer({
                    id: "poi-numbers",
                    type: "symbol",
                    source: "centroids",
                    layout: {
                        "text-field": ["concat", ["get", "number"], ["get", "centroid-name"], ["get", "label"], ["get", "price"]],
                        "text-allow-overlap": !0,
                        "text-justify": "auto",
                        "text-font": ["DIN Pro Bold", "Arial Unicode MS Regular"],
                        "text-size": ["interpolate", ["linear"], ["zoom"], 15.5, .5, 19, 17],
                        "icon-image": ["get", "icon"],
                        "icon-size": ["interpolate", ["linear"], ["zoom"], 16, 0, 19, 1],
                        "icon-anchor": "center",
                        "icon-pitch-alignment": "map",
                        "icon-allow-overlap": !0
                    },
                    paint: {
                        "text-opacity": .8,
                        "icon-opacity": 1
                    }
                }),
                map.addLayer({
                    id: "poi-lezaljke",
                    type: "symbol",
                    source: "centroids",
                    layout: {
                        "text-field": ["get", "numbera"],
                        "text-allow-overlap": !0,
                        "text-justify": "auto",
                        "text-font": ["DIN Pro Bold", "Arial Unicode MS Regular"],
                        "text-size": ["interpolate", ["linear"], ["zoom"], 18, 0, 19, 8, 20, 12]
                    },
                    paint: {
                        "text-opacity": .8,
                        "icon-opacity": 1
                    }
                }),
                map.addLayer({
                    id: "poi-suncobrani",
                    type: "symbol",
                    source: "centroids",
                    layout: {
                        "text-field": ["get", "numberb"],
                        "text-allow-overlap": !0,
                        "text-justify": "auto",
                        "text-font": ["DIN Pro Bold", "Arial Unicode MS Regular"],
                        "text-size": ["interpolate", ["linear"], ["zoom"], 17, 0, 18, 3, 19, 14, 20, 16]
                    },
                    paint: {
                        "text-opacity": .8,
                        "icon-opacity": 1,
                        "text-halo-color": "#fff",
                        "text-halo-width": 2
                    }
                }),
                map.removeLayer("directions-origin-label"),
                map.removeLayer("directions-destination-label"),
                map.setPaintProperty("directions-origin-point", "circle-radius", ["interpolate", ["linear"], ["zoom"], 14, 8, 19, 16]),
                map.setPaintProperty("directions-destination-point", "circle-radius", ["interpolate", ["linear"], ["zoom"], 14, 8, 19, 16]),
                map.setPaintProperty("directions-origin-point", "circle-pitch-alignment", "map"),
                map.setPaintProperty("directions-origin-point", "circle-stroke-width", 3),
                map.setPaintProperty("directions-origin-point", "circle-stroke-color", "#dddddd"),
                map.setPaintProperty("directions-origin-point", "circle-color", "#ffffff"),
                map.setPaintProperty("directions-destination-point", "circle-pitch-alignment", "map"),
                map.setPaintProperty("directions-destination-point", "circle-color", "#1da1f2"),
                map.setPaintProperty("directions-destination-point", "circle-stroke-width", 3),
                map.setPaintProperty("directions-destination-point", "circle-stroke-color", "white"),
                map.setLayoutProperty("directions-route-line", "line-join", "round"),
                map.setPaintProperty("directions-route-line", "line-width", 8),
                map.setPaintProperty("land", "background-color", "#EBDEC3"),
                map.setPaintProperty("landuse", "fill-color", "#EBDEC3"),
                map.setPaintProperty("water", "fill-color", "#6ECCDE");
                let s = map.getStyle().layers;
                function l(e) {
                    map.rotateTo(e / 100 % 360, {
                        duration: 0
                    }),
                    requestAnimationFrame(l)
                }
                s.find(e=>"symbol" === e.type && e.layout["text-field"]).id,
                s.find(e=>"directions-waypoint-point" === e.id).id,
                e(),
                $(".litepicker-backdrop").remove(),
                accomodation = rezultat1.features.filter((e,a)=>"mh" == e.properties.class || "parcela" == e.properties.class || "glamping" == e.properties.class || "caravan" == e.properties.class).map(e=>e.properties.id);
                var c, d, p = document.createElement("div"), m = document.createElement("div"), u = document.createElement("div"), h = document.createElement("div"), f = document.createElement("div"), _ = document.createElement("div");
                for (p.classList.add("filters"),
                m.classList.add("filters-toggle"),
                u.classList.add("filter-header"),
                h.classList.add("filter-container"),
                f.classList.add("accomodation"),
                _.classList.add("facilities"),
                $(p).append(u),
                $(u).append(`<div id="filter">${translations.Filter[0][lng]}</div>`),
                $(h).append(f),
                $(h).append(_),
                K = 0; K < 4; K++) {
                    if (0 == K) {
                        var x = new Set(rezultat1.features.filter(e=>"parcela" == e.properties.class).map(e=>e.properties.brand))
                          , y = Array.from(x);
                        if ((y = (y = y.sort(function(e, a) {
                            return e < a ? -1 : e > a ? 1 : 0
                        })).filter(function(e, a) {
                            return 0 == arraySlikaSlider_PO_TIPU.find(a=>a.naziv == e)?.nofilter
                        })).length > 0) {
                            var k = document.createElement("div");
                            k.classList.add("accomodation-caption"),
                            k.setAttribute("data-caption", "Pitch"),
                            k.innerHTML = translations.Pitch[0][lng],
                            f.appendChild(k),
                            y.forEach((e,a)=>{
                                var t = document.createElement("div");
                                t.classList.add("filter-item"),
                                t.classList.add("brand");
                                var o = document.createTextNode(Object.keys(brandColors).find(a=>a == e))
                                  , n = document.createElement("span")
                                  , s = document.createElement("span");
                                n.classList.add("filter-square"),
                                s.classList.add("filter-text"),
                                n.style.background = brandColors[Object.keys(brandColors).find(a=>a == e)][0].color,
                                t.appendChild(n),
                                n.appendChild(o),
                                s.appendChild(o),
                                t.appendChild(s),
                                f.appendChild(t)
                            }
                            )
                        }
                    }
                    if (1 == K) {
                        var x = new Set(rezultat1.features.filter(e=>"mh" == e.properties.class).map(e=>e.properties.brand))
                          , y = Array.from(x);
                        if ((y = y.filter(function(e, a) {
                            return 0 == arraySlikaSlider_PO_TIPU.find(a=>a.naziv == e)?.nofilter
                        })).length > 0) {
                            var k = document.createElement("div");
                            k.classList.add("accomodation-caption"),
                            k.setAttribute("data-caption", "MH"),
                            k.innerHTML = translations.MH[0][lng],
                            f.appendChild(k),
                            y.forEach((e,a)=>{
                                var t = document.createElement("div");
                                t.classList.add("filter-item"),
                                t.classList.add("brand");
                                var o = document.createTextNode(Object.keys(brandColors).find(a=>a == e))
                                  , n = document.createElement("span")
                                  , s = document.createElement("span");
                                n.classList.add("filter-square"),
                                s.classList.add("filter-text"),
                                n.style.background = brandColors[Object.keys(brandColors).find(a=>a == e)][0].color,
                                t.appendChild(n),
                                n.appendChild(o),
                                s.appendChild(o),
                                t.appendChild(s),
                                f.appendChild(t)
                            }
                            )
                        }
                    }
                    if (2 == K) {
                        var x = new Set(rezultat1.features.filter(e=>"glamping" == e.properties.class).map(e=>e.properties.brand))
                          , y = Array.from(x);
                        if ((y = y.filter(function(e, a) {
                            return 0 == arraySlikaSlider_PO_TIPU.find(a=>a.naziv == e)?.nofilter
                        })).length > 0) {
                            var k = document.createElement("div");
                            k.classList.add("accomodation-caption"),
                            k.setAttribute("data-caption", "Glamping"),
                            k.innerHTML = translations.Glamping[0][lng],
                            f.appendChild(k),
                            y.forEach((e,a)=>{
                                var t = document.createElement("div");
                                t.classList.add("filter-item"),
                                t.classList.add("brand");
                                var o = document.createTextNode(Object.keys(brandColors).find(a=>a == e))
                                  , n = document.createElement("span")
                                  , s = document.createElement("span");
                                n.classList.add("filter-square"),
                                s.classList.add("filter-text"),
                                n.style.background = brandColors[Object.keys(brandColors).find(a=>a == e)][0].color,
                                t.appendChild(n),
                                n.appendChild(o),
                                s.appendChild(o),
                                t.appendChild(s),
                                f.appendChild(t)
                            }
                            )
                        }
                    }
                    if (3 == K) {
                        var x = new Set(rezultat1.features.filter(e=>"caravan" == e.properties.class).map(e=>e.properties.brand))
                          , y = Array.from(x);
                        if ((y = y.filter(function(e, a) {
                            return 0 == arraySlikaSlider_PO_TIPU.find(a=>a.naziv == e)?.nofilter
                        })).length > 0) {
                            var k = document.createElement("div");
                            k.classList.add("accomodation-caption"),
                            k.setAttribute("data-caption", "Caravan"),
                            k.innerHTML = translations.Caravan[0][lng],
                            f.appendChild(k),
                            y.forEach((e,a)=>{
                                var t = document.createElement("div");
                                t.classList.add("filter-item"),
                                t.classList.add("brand");
                                var o = document.createTextNode(Object.keys(brandColors).find(a=>a == e))
                                  , n = document.createElement("span")
                                  , s = document.createElement("span");
                                n.classList.add("filter-square"),
                                s.classList.add("filter-text"),
                                n.style.background = brandColors[Object.keys(brandColors).find(a=>a == e)][0].color,
                                t.appendChild(n),
                                n.appendChild(o),
                                s.appendChild(o),
                                t.appendChild(s),
                                f.appendChild(t)
                            }
                            )
                        }
                    }
                }
                var w, P, j, A, S, T, M = Array.from(new Set(rezultat1.features.filter(e=>"objekt" == e.properties.class.split(" ")[0] && "yes" != e.properties.filter && "yes" != e.properties.nofilter && !e.properties.class.includes("roof") && !e.properties.class.includes("suncobran_boja")).map(e=>e.properties.class)));
                /*if ((M = M.sort(function(e, a) {
                    return poiLabels[N[e][0].icon][0][lng] < poiLabels[N[a][0].icon][0][lng] ? -1 : poiLabels[N[e][0].icon][0][lng] > poiLabels[N[a][0].icon][0][lng] ? 1 : 0
                })).length > 0) {
                    var k = document.createElement("div");
                    k.classList.add("facilities-caption"),
                    k.setAttribute("data-caption", "Main"),
                    k.innerHTML = translations.Main[0][lng],
                    _.appendChild(k),
                    M.forEach((e,a)=>{
                        var t = document.createElement("div");
                        t.classList.add("filter-item"),
                        t.setAttribute("data-class-object", e);
                        var o = document.createTextNode(poiLabels[N[e][0].icon][0][lng])
                          , n = document.createElement("span")
                          , s = document.createElement("span")
                          , l = document.createElement("img");
                        l.src = "assets/img/icons/" + N[e][0].icon + ".svg?",
                        n.classList.add("filter-square"),
                        s.classList.add("filter-text"),
                        t.appendChild(n),
                        n.appendChild(l),
                        n.appendChild(o),
                        s.appendChild(o),
                        t.appendChild(s),
                        _.appendChild(t)
                    }
                    )
                }*/
                var C = Array.from(new Set(rezultat1.features.filter(e=>"interest-point" == e.properties.class && "no" != e.properties.filter && "yes" != e.properties.nofilter).map(e=>e.properties.icon)));
                if (C = C.sort(function(e, a) {
                    return poiLabels[e][0][lng] < poiLabels[a][0][lng] ? -1 : poiLabels[e][0][lng] > poiLabels[a][0][lng] ? 1 : 0
                }),
                "1" === _POSTAVKE_KAMPA_.sortFilterByRb) {
                    (C = (d = C = Array.from(new Set(rezultat1.features.filter(e=>"interest-point" == e.properties.class && "no" != e.properties.filter && void 0 != e.properties.icon && "yes" != e.properties.nofilter).map(e=>({
                        name: e.properties.icon,
                        id: e.properties.rb
                    })))),
                    [...new Map(d.map(e=>[e.name, e])).values()])).sort((e,a)=>parseInt(e.id) > parseInt(a.id) ? 1 : parseInt(a.id) > parseInt(e.id) ? -1 : 0)
                }
                if (C.length > 0) {
                    let O;
                    var k = document.createElement("div");
                    k.classList.add("facilities-caption"),
                    k.setAttribute("data-caption", "POI"),
                    k.innerHTML = translations.POI[0][lng],
                    _.appendChild(k),
                    C.forEach((e,a)=>{
                        O = "1" === _POSTAVKE_KAMPA_.sortFilterByRb ? e.name : e;
                        var t = document.createElement("div");
                        t.classList.add("filter-item"),
                        t.setAttribute("data-class", O);
                        var o = document.createTextNode(void 0 != poiLabels[O] ? poiLabels[O][0][lng] : "")
                          , n = document.createElement("span")
                          , s = document.createElement("span")
                          , l = document.createElement("img");
                        l.src = "assets/img/icons/" + O + ".svg",
                        n.classList.add("filter-square"),
                        s.classList.add("filter-text"),
                        t.appendChild(n),
                        n.appendChild(l),
                        n.appendChild(o),
                        s.appendChild(o),
                        t.appendChild(s),
                        _.appendChild(t)
                    }
                    )
                }
                $(p).append(`
        <div class="swiper swepper">
          <div class="swiper-pagination"></div>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              ${f.outerHTML}
            </div>
            <div class="swiper-slide">
              ${_.outerHTML}
            </div>
          </div>
        </div>`);
                var E = ["accomodation", "facilities"];
                setTimeout(function() {
                    new Swiper(".swepper",{
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: !1,
                        allowSlidePrev: !0,
                        calculateHeight: !0,
                        allowSlideNext: !0,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: !0,
                            renderBullet: function(e, a) {
                                return `<h4 data-id="${E[e]}" class="${a}">${translations[E[e].slice(0, 1).toUpperCase() + E[e].slice(1, E[e].length)][0][lng]}</h4>`
                            }
                        }
                    })
                }, 500);
                var L = document.createElement("div")
                  , I = document.createTextNode(`${translations.Reset[0][lng]}`)
                  , z = document.createElement("div");
                async function R() {
                    var e = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=36b9f41791c44268896103416242808&days=3&q=${mapCenter[1]},${mapCenter[0]}&aqi=no`);
                    if (200 === e.status)
                        return await e.json()
                }
                async function D() {
                    weather = await R()
                }
                L.classList.add("filter-item"),
                z.classList.add("reset"),
                L.appendChild(I),
                z.appendChild(L),
                p.appendChild(z),
                $(L).attr("id", "viewall"),
                $("body").append(p),
                $(document).on("click", ".filter-item", function(e) {
                    768 > $(window).width() && ($(".menu-item").removeClass("selected"),
                    $(".menu-item").removeClass("not-selected")),
                    768 > $(window).width() && $(".filters").removeClass("open"),
                    map.fitBounds(v, {
                        padding: {
                            top: .2 * $(window).height(),
                            bottom: .2 * $(window).height(),
                            left: 10,
                            right: 10
                        }
                    }),
                    kojiFilter = showAll = $(this).text(),
                    $(this).data("tag");
                    var a = $(this).data("class")
                      , t = $(this).data("class-object");
                    if ($(".filter-item:not(#viewall):not(#filter)").css({
                        opacity: "0.5",
                        "font-weight": "600"
                    }),
                    $(this).css({
                        opacity: "1",
                        "font-weight": "700"
                    }),
                    ek(),
                    $("#layers").removeClass("active"),
                    $(".filter-item").removeClass("active"),
                    !$(this).is("#viewall")) {
                        $("#layers").addClass("active"),
                        $(this).addClass("active");
                        var o = new mapboxgl.LngLatBounds;
                        rezultat1.features.forEach(function(e) {
                            if (e.properties.hasOwnProperty("brand") && e.properties.brand == showAll && (ey(),
                            $("#date").is(".active") && eg(showAll),
                            $("#date").is(":not(.active)") && eu(showAll),
                            o.extend(turf.envelope(e).bbox)),
                            e.properties.hasOwnProperty("class") && e.properties.class == t && (ey(),
                            $("#date").is(".active") && (eh(t),
                            ew(t)),
                            $("#date").is(":not(.active)") && (eb(t),
                            ew(t)),
                            o.extend(turf.envelope(e).bbox)),
                            e.properties.hasOwnProperty("icon") && e.properties.icon.includes(a)) {
                                var n, s, l;
                                $("#date").is(".active") && (n = J,
                                e$(),
                                er(),
                                map[n(324)](n(317), "fill-color", [n(321), ["get", n(302)], ...ee[n(323)](...ei), [n(321), [n(314), "id"], slobodne, q(Y[n(320)], ["gps"]), [n(321), ["get", "id"], accomodation, q(Y.free, [n(335)]), n(310)]]]),
                                map[n(324)]("layer3_border", "line-color", [n(321), ["get", n(302)], ...ee.border_gps(...ei), [n(321), [n(314), "id"], slobodne, q(G(Y[n(320)], Q), ["gps_border"]), [n(321), [n(314), "id"], accomodation, q(G(Y[n(340)], X), [n(288)]), n(310)]]])),
                                $("#date").is(":not(.active)") && (s = J,
                                e$(),
                                er(),
                                map[s(324)](s(317), s(296), [s(321), [s(314), s(302)], ...ee[s(323)](...ei), [s(321), [s(314), s(333)], ...ee[s(323)](...eo)]]),
                                map[s(324)](s(316), s(287), [s(321), [s(314), s(302)], ...ee.border_gps(...ei), [s(321), [s(314), s(333)], ...ee[s(336)](...eo)]])),
                                l = a,
                                map.setPaintProperty("poi", "icon-opacity", ["match", ["get", "icon"], l.toString(), 1, .3]),
                                o.extend(turf.envelope(e).bbox)
                            }
                        }),
                        map.fitBounds(o, {
                            padding: {
                                top: .2 * $(window).height(),
                                bottom: .2 * $(window).height(),
                                left: 20,
                                right: 20
                            }
                        })
                    }
                    $(this).is("#viewall") && (document.querySelector(".accomodation").scrollTo({
                        top: 0,
                        behavior: "smooth"
                    }),
                    document.querySelector(".facilities").scrollTo({
                        top: 0,
                        behavior: "smooth"
                    }),
                    $(".filter-item").removeAttr("style"),
                    $("#date").is(".active") && e_(),
                    $("#date").is(":not(.active)") && en()),
                    map.once("idle", function() {
                        map.resize()
                    })
                }),
                clearInterval(o),
                $(".ui-loader").remove(),
                $("#ModalTrazi").removeClass("in"),
                $(".pannellum-canvas").after('<div class="bg-shadow"></div>'),
                mapCenter = turf.centerOfMass(rezultat1.features[0]).geometry.coordinates,
                map.setCenter(mapCenter),
                v = turf.envelope(rezultat1.features[1]).bbox,
                map.fitBounds(v, {
                    padding: {
                        top: .2 * $(window).height(),
                        bottom: .2 * $(window).height(),
                        left: 10,
                        right: 10
                    }
                }),
                D().then(()=>void ($(".temp").html(`${Math.floor(weather.current.temp_c)}\xb0C`),
                $(".weather").prepend(`<img src="assets/img/weather/${weather.current.condition.icon.split("/")[5]}/${weather.current.condition.icon.split("/")[6].replace(".png", ".svg")}">`))),
                map.on("moveend", function() {
                    $("#map").css("pointer-events", "auto"),
                    w = map.getZoom(),
                    P = turf.point(mapCenter),
                    A = {
                        units: "meters"
                    }
                }),
                setTimeout(function() {}, 500);
                var K = 0
                  , B = !1;
                map.on("moveend", e=>{
                    async function a() {
                        map.once("moveend", ()=>{
                            j = turf.point([map.getCenter().lng, map.getCenter().lat]),
                            S = turf.distance(turf.point(mapCenter), j, A),
                            T = map.getZoom()
                        }
                        )
                    }
                    B = !0,
                    K += 1,
                    a().then(function() {
                        "OFF" === eI._watchState && (17.5 > T.toFixed(2) && $(".mapboxgl-popup-close-button").trigger("click"),
                        (!turf.booleanPointInPolygon(j, t) || T.toFixed(2) < w.toFixed(2)) && ($(".mobile-header").hide(),
                        $(".selected-parameters").hide(),
                        $(".mobile-menu").hide(),
                        $(".mobile-menu-shade").hide(),
                        $(".mobile-menu-shade-top").hide(),
                        $("#map").css("pointer-events", "none"),
                        $("#home").hide(),
                        $("#openTrazi").hide(),
                        $("#layers").hide(),
                        $("#date").hide(),
                        $("#lang").hide(),
                        $(".mapboxgl-ctrl-top-right").hide(),
                        map.once("idle", function() {
                            $("#home").trigger("click")
                        }),
                        map.once("moveend", function() {
                            $(".mobile-header").removeAttr("style"),
                            $(".mobile-menu").show(),
                            $(".mobile-menu-shade").show(),
                            $(".mobile-menu-shade-top").removeAttr("style"),
                            $("#map").css("pointer-events", "auto"),
                            $("#home").show(),
                            $("#openTrazi").show(),
                            $("#layers").show(),
                            $("#date").show(),
                            $("#lang").show(),
                            $(".mapboxgl-ctrl-top-right").show()
                        })))
                    })
                }
                )
            }
        }, 200);
        function n(e=0, a=100) {
            let t = Math.random();
            return t = Math.floor(t * (a - e)),
            t += e
        }
        function s(e, a) {
            var t = Array(a)
              , o = e.length
              , n = Array(o);
            if (a > o)
                throw RangeError("getRandom: more elements taken than available");
            for (; a--; ) {
                var s = Math.floor(Math.random() * o);
                t[a] = e[s in n ? n[s] : s],
                n[s] = --o in n ? n[o] : o
            }
            return t
        }
        $(document).on("click", ".weather-bg", e=>{
            $(".annotation.weather .close").trigger("click")
        }
        )
    }
    ),
    $(".weather").on("click", e=>{
        h = "",
        weather.forecast.forecastday.forEach((e,a)=>{
            0 == a && (h += `<div class="w-heading">${translations.Weather[0][lng]}</div><div class="weather-day">
        <div class="weather-left">
          <p class="day-temp">${Math.floor(weather.current.temp_c)}\xb0</p>
          <p class="day">${translations[moment(weather.location.localtime).format("dddd")][0][lng]}</p>
          <p class="w-date">${moment(weather.location.localtime).format("D")} ${translations[moment(weather.location.localtime).format("MMMM")][0][lng]}</p>
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
          </div>`)
        }
        ),
        $("body").append(`<div class="annotation weather">
  <button class="close" type="button" data-dismiss="modal" aria-hidden="true" style="opacity: 1;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" fill="#0bae81" stroke="#0bae81" stroke-width="8"></path></svg>

  </div>`),
        $(".annotation.weather").append($("<div/>", {
            html: h,
            class: "weather-day-container"
        })),
        $("body").append('<div class="weather-bg"></div>')
    }
    ),
    $(document).on("click", ".weather .close", e=>{
        $(".annotation.weather").remove(),
        $(".weather-bg").remove()
    }
    );
    var eC = `<div class="annotation route"><p>${translations["Route message"][0][lng]}</p>${$("<img/>", {
        src: "assets/img/logo.svg"
    })[0].outerHTML}</div>`;
    function e1() {
        $("#map").css("pointer-events", "none"),
        $(".annotation.route").remove(),
        $("body").append($(eC)),
        trackActive && (map.removeControl(eI),
        map.addControl(eI)),
        f = !0,
        isVratiPrikaz = !0,
        trackActive = !1,
        gpsActive = !0,
        isSetOrigin = !1,
        eI.trigger(),
        $("#ModalParcela").modal("hide"),
        $("#ModalObjekt").modal("hide"),
        $(".selected-parameters").hide(),
        $("#openTrazi").hide(),
        $("#layers").hide(),
        $("#date").hide(),
        $("#lang").hide(),
        $("body").addClass("gps-active"),
        $("body").append(`${isAppleDetected ? '<button class="btn" id="audio"><i class="fas fa-volume-slash"></i></button>' : '<button class="btn active" id="audio"><i class="fas fa-volume"></i></button>'}`),
        $("#home, #nav-3d, #return, #car, #walk, #audio").css({
            opacity: "0.5",
            "pointer-events": "none"
        })
    }
    function eO(e, a, t) {
        if (a.includes("parcela")) {
            if ("Comfort" == y)
                return "pa11----.jpg?";
            if ("Comfort Zone" == y)
                return "p66----.jpg?";
            if ("Standard" == y)
                return "p15----.jpg?"
        }
        return "mh" === a ? "m64aa----.jpg?" : "glamping" === a ? "s" + e + ".jpg" : a.includes("restoran") ? "restoran.jpg" : a.includes("recepcija") ? "recepcija1.jpg" : a.includes("bazen") ? "bazen.jpg" : a.includes("pekara") ? "pekara.jpg" : a.includes("igraliste") ? "igraliste.jpg" : a.includes("wc") ? "wc1.jpg?" : a.includes("odbojka") ? "odbojka.jpg" : a.includes("teren") ? "teren.jpg" : a.includes("parking") ? "parking.jpg" : void 0
    }
    function eE(e, a) {}
    function eL(e, a) {
        e.classList.add("custom-tooltip");
        var t = document.createElement("span");
        t.innerHTML = a,
        e.appendChild(t),
        t.style.width = t.scrollWidth - 20 + "px",
        t.style.marginLeft = -(t.scrollWidth - e.offsetWidth) / 2 + "px",
        t.style.marginTop = -t.scrollHeight - 12 + "px"
    }
    $(document).on("click", "#navigateTo", function() {
        e1()
    }),
    !1 == qren && $(".bqr").css("display", "none"),
    $(document).on("click", "#qrcode", function() {
        var e;
        e = brojGPS_QRCode,
        window.open("https://campsabout.com/guestmail.html?kampid=" + kampID + "&pitch=" + e, "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes")
    }),
    $(document).on("click", "#navigateToPoi", function() {
        var e;
        $(".mapboxgl-popup-close-button").trigger("click"),
        destinationLocation = _,
        e = gpsParcela,
        map.setPaintProperty("poi", "icon-opacity", ["match", ["get", "id"], e.toString(), 1, .3]),
        e1()
    }),
    $(document).on("click", "#navigateToLezaljke", function() {
        $(".mapboxgl-popup-close-button").trigger("click"),
        e1()
    }),
    $(document).on("click", ".mapboxgl-ctrl-geolocate", function() {
        "OFF" == eI._watchState && $("#home").trigger("click"),
        setTimeout(()=>{
            "WAITING_ACTIVE" == eI._watchState && ($("body").addClass("message"),
            $("body").append(`<div class="annotation"><h3>${translations["Imporant message"][0][lng]}</h3><p>${translations["Navigation not available"][0][lng]}</p><div class="annotation-buttons"><div class="confirm">${translations.Fine[0][lng]}</div></div></div>`),
            $(".confirm").on("click", function() {
                $("body").removeClass("message"),
                $(".annotation").remove()
            }))
        }
        , 5e3)
    }),
    $(document).keyup(function(e) {
        "Escape" === e.key && ($(".mapboxgl-popup").is(":visible") && $(".mapboxgl-popup-close-button").trigger("click"),
        $("#ModalTrazi").is(":visible") && $(".search-header svg").trigger("click"),
        $(".annotation.weather").is(":visible") && $(".annotation.weather .close").trigger("click"))
    }),
    map.on("click", "poi", e=>{
        popupDiv = `<button class="btn btn-outline-secondary" id="navigateToPoi"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`;
        var a = poiLabels[e.features[0].properties.icon];
        e.features[0].properties.hasOwnProperty("class") && e.features[0].properties.hasOwnProperty("icon") && void 0 != a && !e.features[0].properties.class.includes("noclick") && (x = !0,
        a = a[0][lng],
        gpsParcela = e.features[0].properties.id,
        _ = e.features[0].geometry.coordinates,
        noGPS && $("#navigateToPoi").css({
            opacity: "0.5",
            "pointer-events": "none"
        }),
        "0" === e.features[0].properties.navigation ? new mapboxgl.Popup({
            closeOnClick: !0
        }).setLngLat(e.features[0].geometry.coordinates).setOffset(20).setHTML(`<h3>${a}${dev_env ? e.features[0].properties.id : ""}</h3>`).addTo(map) : new mapboxgl.Popup({
            closeOnClick: !0
        }).setLngLat(e.features[0].geometry.coordinates).setOffset(20).setHTML(`<h3>${a}${dev_env ? e.features[0].properties.id : ""}</h3>${userLocation ? "" : "<span class='col-sm-12 navigation-denied'>" + translations["Navigation not available"][0][lng] + "</span>"}${popupDiv}`).addTo(map),
        $(document).on("click", ()=>{
            $(".mapboxgl-popup").is(":visible") && setTimeout(function() {
                x = !1
            }, 500)
        }
        ))
    }
    ),
    map.on("click", "layer1_fill", e=>{
        if ("lezaljke" == e.features[0].properties.class.split(" ")[1] && (gpsParcela = e.features[0].properties.id,
        x = !0,
        destinationLocation = turf.centerOfMass(turf.combine(turf.multiPolygon(e.features[0].geometry.coordinates))).geometry.coordinates,
        new mapboxgl.Popup({
            closeOnClick: !0
        }).setLngLat(turf.centerOfMass(e.features[0]).geometry.coordinates).setOffset(20).setHTML(`<h3>${translations.Loungers[0][lng]}</h3><span class="lounger-price">9,99€/day</span>
      ${$("#date").is(".active") ? (a = gpsParcela.toString(),
        void 0 == slobodne ? "" : $(".is-start-date") && void 0 != $(".is-start-date").html() ? slobodne.includes(a) ? `<span class="availability unavailable">${translations["Lounger availability"][0][lng]} ${translations.Unavailable[0][lng]}</span><spanclass="book-lounger not-available">Book now</span>` : !slobodne.includes(a) && accomodation.includes(a) ? `<span class="availability available">${translations["Lounger availability"][0][lng]} ${translations.Available[0][lng]}</span><span class="book-lounger">Book now</span>` : "" : "") : "<span class='check-lounger'>You can check availability of a lounger by selecting dates.</span>"}
      ${userLocation ? "" : "<span class='col-sm-12 navigation-denied'>" + translations["Navigation not available"][0][lng] + "</span>"}<button class="btn btn-outline-secondary" id="navigateToLezaljke"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`).addTo(map),
        $(document).on("click", ()=>{
            $(".mapboxgl-popup").is(":visible") && setTimeout(function() {
                x = !1
            }, 500)
        }
        )),
        ("suncobran" == e.features[0].properties.class.split(" ")[1] || "suncobran_boja" == e.features[0].properties.class.split(" ")[1]) && ("suncobran_boja" == e.features[0].properties.class.split(" ")[1] ? (gpsParcela = e.features[0].properties["foreign-id"],
        destinationLocation = turf.centerOfMass(turf.combine(turf.multiPolygon(e.features[0].geometry.coordinates))).geometry.coordinates) : (gpsParcela = e.features[0].properties.id,
        destinationLocation = turf.centerOfMass(e.features[0]).geometry.coordinates),
        x = !0,
        new mapboxgl.Popup({
            closeOnClick: !0
        }).setLngLat(turf.centerOfMass(e.features[0]).geometry.coordinates).setOffset(20).setHTML(`<h3>${translations.Umbrella[0][lng]}</h3><span class="lounger-price">9,99€/day</span>
      ${$("#date").is(".active") ? (t = gpsParcela.toString(),
        void 0 == slobodne ? "" : $(".is-start-date") && void 0 != $(".is-start-date").html() ? slobodne.includes(t) ? `<span class="availability unavailable">${translations["Umbrella availability"][0][lng]} ${translations.Unavailable[0][lng]}</span><span class="book-lounger not-available">Book now</span>` : !slobodne.includes(t) && accomodation.includes(t) ? `<span class="availability available">${translations["Umbrella availability"][0][lng]} ${translations.Available[0][lng]}</span><span class="book-lounger">Book now</span>` : "" : "") : "<span class='check-lounger'>You can check availability of an umbrella by selecting dates.</span>"}
      ${userLocation ? "" : "<span class='col-sm-12 navigation-denied'>" + translations["Navigation not available"][0][lng] + "</span>"}<button class="btn btn-outline-secondary" id="navigateToLezaljke"><span>${translations["Take me"][0][lng]}</span><img src="assets/img/gps-arrow.svg"></button>`).addTo(map),
        $(document).on("click", ()=>{
            $(".mapboxgl-popup").is(":visible") && setTimeout(function() {
                x = !1
            }, 500)
        }
        )),
        !0 != x && "lezaljke" != e.features[0].properties.class.split(" ")[1] && "objekt" != e.features[0].properties.class.split(" ")[0]) {
            gpsParcela = e.features[0].properties.id,
            brojGPS_QRCode = e.features[0].properties.brojMISH,
            destinationLocation = turf.centerOfMass(e.features[0]).geometry.coordinates,
            dev_env && console.log("ID gis", gpsParcela);
            var a, t, o = rezultat1.features.find(e=>"obala-line" == e.properties.class);
            if (void 0 != o) {
                o = o.geometry.coordinates;
                var n = turf.lineString(o[0])
                  , s = turf.point(turf.centerOfMass(e.features[0]).geometry.coordinates)
                  , l = turf.nearestPointOnLine(n, s, {
                    units: "meters"
                });
                l = l.properties.dist,
                $("#udaljenostmore").text(`${l.toFixed(0) + " m"}`)
            } else
                $("#udaljenostmore").text(`${translations["Distance sea not available"][0][lng]}`);
            $(".amenities").html(`<p id="amenities">${translations.Amenities[0][lng]}</p>`),
            $("#povrsina").text(parseInt(turf.area(e.features[0])) + " m\xb2"),
            $("#ModalParcela").is(".located") && $("#navigateTo").css({
                opacity: "0.5",
                "pointer-events": "none"
            }),
            $("#ModalObjekt").is(".located") && $("#navigateTo").css({
                opacity: "0.5",
                "pointer-events": "none"
            });
            var c = turf.envelope(e.features[0])
              , d = turf.rhumbDistance(turf.point(c.geometry.coordinates[0][0]), turf.point(c.geometry.coordinates[0][1]), {
                units: "meters"
            })
              , p = turf.rhumbDistance(turf.point(c.geometry.coordinates[0][1]), turf.point(c.geometry.coordinates[0][2]), {
                units: "meters"
            });
            function m(a) {
                return e.features[0].properties.class
            }
            $("#dimenzija").text(d.toFixed(0) + "\xd7" + p.toFixed(0) + " m cca");
            var u = e.features[0].properties.id
              , v = e.features[0].properties[lng]
              , h = e.features[0].properties.label
              , f = e.features[0].properties.type
              , _ = e.features[0].properties.brand
              , k = e.features[0].properties.amenities
              , w = e.features[0].properties.number
              , P = e.features[0].properties.class
              , j = e.features[0].properties.Draw
              , A = e.features[0].properties.id
              , S = e.features[0].properties.class;
            if (y = e.features[0].properties.brand,
            S.includes("mh") || S.includes("parcela") || S.includes("glamping") || S.includes("caravan")) {
                if ("" === e.features[0].properties.number)
                    return !1;
                let T, M;
                async function C() {
                    showLoader();
                    var e = await fetch(_PARAMETRI_KAMPA.paramParcelaURL + A + "&id=" + kampID + "&group=" + grupacijaName);
                    if (200 === e.status)
                        return T = await e.json()
                }
                async function O() {
                    M = await C(),
                    paramZaBooking.brojSJ = M.brojMISH,
                    paramZaBooking.pmsUnitId = M.pmsUnitId,
                    paramZaBooking.datumOd = phobsDatumOd,
                    paramZaBooking.brojDana = phobsBrojDana,
                    paramZaBooking.pmsTip = M.tipMISH,
                    paramZaBooking.brojOsoba = bookData.adults,
                    paramZaBooking.djecaGodine = bookData.children,
                    paramZaBooking.jezik = lng,
                    arraySlikaSlider = M.images,
                    helper_vrstaSJ_zaSlike = M.vrstaSJ,
                    (null === T.brojOsoba || "0" == T.brojOsoba || "null" == T.brojOsoba || void 0 == T.brojOsoba) && (M.brojOsoba = _TABLICA_VRSTE_[M.tipMISH][0].brojOsoba),
                    (null === T.brojDjece || "0" == T.brojDjece || "null" == T.brojDjece || void 0 == T.brojDjece) && (M.brojDjece = _TABLICA_VRSTE_[M.tipMISH][0].brojDjece),
                    flag_SAMO_NA_UPIT = "1" === M.samoNaUpit,
                    hideLoader(),
                    0 != M.duzina && "" != M.duzina && null != M.duzina ? $("#dimenzija").text(M.duzina + "\xd7" + M.sirina + " (" + M.povrsina + "m\xb2 cca)") : $("#dimenzija").text("-"),
                    0 != M.duzina2 && "" != M.duzina2 && null != M.duzina2 ? $("#povrsina").text(M.duzina2 + "\xd7" + M.sirina3 + " (" + M.velicina + "m\xb2 cca)") : $("#povrsina").text("-"),
                    $("#osuncanost").text(`${translations.Sunqty[0][lng]}`),
                    "PAUŠAL" === M.osuncanost && $("#osuncanost").text(`${translations.Flatrate[0][lng]}`),
                    0 != M.osuncanost && "" != M.osuncanost && void 0 != M.osuncanost ? $("#osuncanostdata").text(translations[M.osuncanost][0][lng]) : $("#osuncanostdata").text("-"),
                    $("#brojosoba").text(`${translations.dozvoljenoosoba[0][lng]}`),
                    0 != M.brojOsoba && "" != M.brojOsoba && void 0 != M.brojOsoba && $("#brojosobadata").text(M.brojOsoba);
                    let e;
                    switch (lng) {
                    case "hr":
                    default:
                        e = M.napomena_hr;
                        break;
                    case "en":
                        e = M.napomena_en;
                        break;
                    case "de":
                        e = M.napomena_de;
                        break;
                    case "it":
                        e = M.napomena_it;
                        break;
                    case "pl":
                        e = M.napomena_pl;
                        break;
                    case "si":
                        e = M.napomena_si;
                        break;
                    case "nl":
                        e = M.napomena_nl;
                        break;
                    case "ru":
                        e = M.napomena_ru
                    }
                    e = "" != e && null != e ? e : "-",
                    $(".napomena").css("display", "flex"),
                    $(".povrsina").css("display", "flex"),
                    $(".osuncanost").css("display", "flex"),
                    $(".brojosoba").css("display", "flex"),
                    $("#notesdivParcela").css("display", "flex"),
                    "-" === e && $("#notesdivParcela").css("display", "none"),
                    "1" === M.noteHeader ? ($("#notesdivParcela").text(e),
                    $(".napomena").css("display", "none")) : ($("#podatak_napomenap").text(translations.note[0][lng]),
                    $("#podataka_napomena_datap").text(e),
                    $("#notesdivParcela").css("display", "none")),
                    "-" === e && $(".napomena").css("display", "none"),
                    (0 == M.duzina2 || "" === M.duzina2) && $(".povrsina").css("display", "none"),
                    (0 == M.osuncanost || "" === M.osuncanost || void 0 == M.osuncanost) && $(".osuncanost").css("display", "none"),
                    (0 == M.brojOsoba || "" === M.brojOsoba || void 0 == M.brojOsoba) && $(".brojosoba").css("display", "none"),
                    panomPhotoUrl = T.panom,
                    "" === T.panom && (panomPhotoUrl = arraySlikaSlider_PO_TIPU.find(e=>e.vrstaSJ == helper_vrstaSJ_zaSlike).panom),
                    k = [],
                    "1" === M.wifi && k.push("wifi"),
                    "1" === M.mikrovalna && k.push("microwave"),
                    "1" === M.odvodnja && k.push("odvodnja"),
                    "1" === M.struja6a && k.push("struja6a"),
                    "1" === M.struja10a && k.push("struja10a"),
                    "1" === M.struja16a && k.push("struja16a"),
                    "1" === M.parking && k.push("parking"),
                    "1" === M.voda && k.push("water"),
                    "1" === M.satelitskaTv && k.push("sattv"),
                    "1" === M.kabelskaTv && k.push("kabeltv"),
                    "1" === M.perilicaPosuda && k.push("perilicaposuda"),
                    "1" === M.perilicaRublja && k.push("perilicarublja"),
                    "1" === M.klimaUredaj && k.push("klima"),
                    "1" === M.toster && k.push("toster"),
                    "1" === M.pegla && k.push("pegla"),
                    "1" === M.dogsAllowed && k.push("dog"),
                    "1" === M.dogsNotAllowed && k.push("ban"),
                    $("body").addClass("modal-parcela"),
                    $(".brand-badge").remove(),
                    $(".selected-date").remove(),
                    $(".modal-price").css("opacity", "0.5"),
                    document.getElementById("bukiraj").disabled = !0,
                    $(".acc-name").after(`${ej(f)}${eA(_)}`),
                    $(".acc-name").text(`${v} ${M.broj ? M.broj : ""}${dev_env ? " (" + u + " " + M.brojMISH + ")" : ""}${void 0 != h ? h : ""}`);
                    let a;
                    if (a = moment(a = "" != paramZaBooking.datumOd && void 0 != paramZaBooking.datumOd ? paramZaBooking.datumOd : new Date).format("DD.MM.YYYY."),
                    cijeneBaza[_].find(e=>e.date == a),
                    void 0 != _PRICES_PER_STAY_ ? $(".priceeur").text((void 0 != _PRICES_PER_STAY_[M.tipMISH] ? _PRICES_PER_STAY_[M.tipMISH].price : "-") + "€") : $(".priceeur").text("-€"),
                    $(".oddana").text(`${translations.totalperstay[0][lng]}`),
                    $(".nights").text(`${translations.perstay[0][lng]}`),
                    $(".date").text(`${moment(s).format("DD.MM.YYYY.")} - ${moment(s).add(1, "d").format("DD.MM.YYYY.")}`),
                    function e(a) {
                        if (void 0 !== a) {
                            for (i = 0,
                            nameObj = a; i < nameObj.length; i++)
                                if (void 0 !== Z[nameObj[i]]) {
                                    var t = `<div class="modal-info-inner"><i class="fas fa-${Z[nameObj[i]][0].icon}"></i><div><p>${translations[nameObj[i]][0][lng]}</p></div></div>`;
                                    $(".amenities").append(t)
                                }
                        } else {
                            var t = `<div class="modal-info-inner"><i class="fas fa-wifi"></i><div><p>WiFi</p></div></div>
<div class="modal-info-inner"><i class="fas fa-parking"></i><div><p>Parking</p></div></div>`;
                            $(".amenities").append(t)
                        }
                    }(k),
                    $("#amenities").css("visibility", "visible"),
                    0 === k.length && $("#amenities").css("visibility", "hidden"),
                    "1" === M.noclick)
                        return !1;
                    $("#containerParcela").html(`<div class="swiper mySwiper">
            <div class="swiper-wrapper">
    
            </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-pagination"></div>
            </div>`),
                    $("#containerParcela").append('<div class="show-pitch img"><i class="fa fa-search"></i></div>'),
                    "" != panomPhotoUrl && null != panomPhotoUrl && "false" != _PARAMETRI_KAMPA.prikazi360Botun && $("#containerParcela").append('<div class="show-pitch panom">360&deg;</div>'),
                    $(document).on("click", ".show-pitch.panom", function() {
                        let e = panomPhotoUrl;
                        $("#modalUpitForma").find("iframe").attr({
                            src: e,
                            height: "640px",
                            width: "1200px"
                        }),
                        $("#modalUpitForma").modal("show")
                    }),
                    $(".show-pitch.img").on("click", function() {
                        $("#lbimg").trigger("click")
                    });
                    var t = [];
                    if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length)
                        arraySlikaSlider.forEach(e=>{
                            t.push('<div class="swiper-slide"><img src="' + e + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + e + '" data-lightbox="roadtrip" /></div>')
                        }
                        );
                    else {
                        let o = arraySlikaSlider_PO_TIPU.find(e=>e.vrstaSJ == helper_vrstaSJ_zaSlike);
                        void 0 != o && o.images.length ? o.images.forEach(e=>{
                            t.push('<div class="swiper-slide"><img src="' + e + '"style="width: 100%"><a id="lbimg" style="display: none" href="' + e + '" data-lightbox="roadtrip" /></div>')
                        }
                        ) : t.push('<div class="swiper-slide"><img src="' + _POSTAVKE_KAMPA_.defaultimg + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + _POSTAVKE_KAMPA_.defaultimg + '" data-lightbox="roadtrip" /></div>')
                    }
                    new Swiper(".mySwiper",{
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: !1,
                        allowSlidePrev: !0,
                        allowSlideNext: !0,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: !0,
                            dynamicBullets: !0
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    }).appendSlide(t),
                    $("#ModalParcela").modal("show"),
                    $("#ModalParcela").attr("broj", w),
                    $("#ModalParcela").attr("klasa", P),
                    $("#ModalParcela").attr("draw", j),
                    $("#ModalParcela").attr("naupit", M.samoNaUpit);
                    let n = document.getElementById("bukiraj");
                    if (n.innerText = translations["Book now"][0][lng],
                    "1" === M.samoNaUpit && (n.innerText = translations.SendQuery[0][lng]),
                    "objekt" != S.split(" ")[0]) {
                        var s = new Date(paramZaBooking.datumOd)
                          , l = new Date(paramZaBooking.datumOd);
                        l.setDate(l.getDate() + paramZaBooking.brojDana),
                        void 0 != slobodne && "" != phobsDatumOd && (flag_SAMO_NA_UPIT ? $("#brojparcele").append(`<div class='selected-date'>${translations["Send query info"][0][lng]}</div>`) : $("#brojparcele").append(`<div class='selected-date'>${translations["Accomodation availability"][0][lng]} <span class='start-date'></span> - <span class='end-date'></span> <span class='available-date'></span></div>`),
                        $(".date").text(`${moment(s).format("DD.MM.YYYY.")} - ${moment(l).format("DD.MM.YYYY.")}`),
                        $(".selected-date .start-date").html(moment($(".is-start-date").data("time")).format("DD.MM.YYYY.")),
                        $(".selected-date .end-date").html(moment($(".is-end-date").data("time")).format("DD.MM.YYYY.")),
                        slobodne.includes(gpsParcela) ? (document.getElementById("bukiraj").disabled = !0,
                        $(".selected-date").addClass("unavailable"),
                        $(".selected-date .available-date").html(`${translations.Unavailable[0][lng]}`),
                        $(".modal-price").css("opacity", "0.5")) : (document.getElementById("bukiraj").disabled = !1,
                        $(".selected-date").addClass("available"),
                        $(".modal-price").css("opacity", "1"),
                        $(".selected-date .available-date").html(`${translations.Available[0][lng]}`),
                        "1" === M.pausal && (document.getElementById("bukiraj").disabled = !0,
                        n.innerText = translations.Flatrate[0][lng],
                        $(".modal-price").css("opacity", "0.5"),
                        $(".selected-date").removeClass("available"),
                        $(".selected-date").addClass("unavailable"))))
                    }
                }
                M = "",
                O()
            }
        }
        if ("objekt" == e.features[0].properties.class.split(" ")[0]) {
            gpsParcela = e.features[0].properties.id,
            destinationLocation = turf.centerOfMass(e.features[0]).geometry.coordinates;
            var o = rezultat1.features.find(e=>"obala-line" == e.properties.class);
            if (void 0 != o) {
                o = o.geometry.coordinates;
                var n = turf.lineString(o[0])
                  , s = turf.point(turf.centerOfMass(e.features[0]).geometry.coordinates)
                  , l = turf.nearestPointOnLine(n, s, {
                    units: "meters"
                });
                l = l.properties.dist,
                $("#udaljenostmore").text(`${l.toFixed(0) + " m"}`)
            } else
                $("#udaljenostmore").text(`${translations["Distance sea not available"][0][lng]}`);
            $(".amenities").html(`<p id="amenities">${translations.Amenities[0][lng]}</p>`),
            $("#povrsina").text(parseInt(turf.area(e.features[0])) + " m\xb2"),
            $("#ModalObjekt").is(".located") && $("#navigateTo").css({
                opacity: "0.5",
                "pointer-events": "none"
            });
            var c = turf.envelope(e.features[0])
              , d = turf.rhumbDistance(turf.point(c.geometry.coordinates[0][0]), turf.point(c.geometry.coordinates[0][1]), {
                units: "meters"
            })
              , p = turf.rhumbDistance(turf.point(c.geometry.coordinates[0][1]), turf.point(c.geometry.coordinates[0][2]), {
                units: "meters"
            });
            function m(a) {
                return e.features[0].properties.class
            }
            $("#dimenzija").text(d.toFixed(0) + "\xd7" + p.toFixed(0) + " m cca");
            var u = e.features[0].properties.id
              , v = e.features[0].properties[lng]
              , h = e.features[0].properties.label
              , f = e.features[0].properties.type
              , _ = e.features[0].properties.brand
              , k = e.features[0].properties.amenities
              , w = e.features[0].properties.number
              , P = e.features[0].properties.class
              , j = e.features[0].properties.Draw
              , A = e.features[0].properties.id
              , S = e.features[0].properties.class;
            if (y = e.features[0].properties.brand,
            "objekt" == S.split(" ")[0]) {
                let E, L;
                async function I() {
                    showLoader();
                    var e = await fetch(_PARAMETRI_KAMPA.paramObjektiURL + A + "&id=" + kampID + "&group=" + grupacijaName);
                    if (200 === e.status)
                        return E = await e.json()
                }
                async function z() {
                    arraySlikaSlider = (L = await I()).images,
                    helper_vrstaSJ_zaSlike = L.vrstaSJ,
                    hideLoader(),
                    $("#podatak_prvi").text(translations.RadnoVrijeme[0][lng]),
                    $("#podatak_prvi_data").text(L.radno_vrijeme),
                    $("#kontakt").text(translations.kontakt[0][lng]),
                    $("#kontakt_data").text(L.telefon),
                    $("#mail").text(translations.email[0][lng]),
                    $("#mail_data").text(L.mail);
                    let e;
                    switch (lng) {
                    case "hr":
                    default:
                        e = L.napomena_hr;
                        break;
                    case "en":
                        e = L.napomena_en;
                        break;
                    case "de":
                        e = L.napomena_de;
                        break;
                    case "it":
                        e = L.napomena_it;
                        break;
                    case "pl":
                        e = L.napomena_pl;
                        break;
                    case "si":
                        e = L.napomena_si;
                        break;
                    case "nl":
                        e = L.napomena_nl;
                        break;
                    case "ru":
                        e = L.napomena_ru
                    }
                    if (e = "" != e && null != e ? e : "-",
                    $(".objektkontakt").css("display", "flex"),
                    $(".objektmail").css("display", "flex"),
                    $(".objektnapomena").css("display", "flex"),
                    $(".objektwww").css("display", "flex"),
                    $(".objektcjenik").css("display", "flex"),
                    $("#notesdivObjekt").css("display", "flex"),
                    "-" === e && $("#notesdivObjekt").css("display", "none"),
                    "1" === L.noteHeader ? ($("#notesdivObjekt").text(e),
                    $(".objektnapomena").css("display", "none")) : ($("#podatak_napomena").text(translations.note[0][lng]),
                    $("#podataka_napomena_data").text(e),
                    $("#notesdivObjekt").css("display", "none")),
                    $("#ocjenik").text(translations.cjenik[0][lng]),
                    $("#owww").text(translations.www[0][lng]),
                    $("#ocjenik_data").text(L.cjenikText),
                    $("#owww_data").text(L.urlText),
                    $("#ocjenik_data").attr("href", L.cjenikurl),
                    $("#owww_data").attr("href", L.www),
                    "-" === e && $(".objektnapomena").css("display", "none"),
                    (0 == L.telefon || "" === L.telefon) && $(".objektkontakt").css("display", "none"),
                    (0 == L.mail || "" === L.mail || void 0 == L.mail) && $(".objektmail").css("display", "none"),
                    (0 == L.www || "" === L.www || void 0 == L.www) && $(".objektwww").css("display", "none"),
                    (0 == L.cjenikurl || "" === L.cjenikurl || void 0 == L.cjenikurl) && $(".objektcjenik").css("display", "none"),
                    panomPhotoUrlObjekt = L.panom,
                    k = [],
                    "1" === L.wifi && k.push("wifi"),
                    "1" === L.parking && k.push("parking"),
                    "1" === L.microwawe && k.push("microwave"),
                    "1" === L.shower && k.push("shower"),
                    "1" === L.sink && k.push("sink"),
                    "1" === L.laundry && k.push("laundry"),
                    "1" === L.childrenToilet && k.push("childrenToilet"),
                    "1" === L.chemicalToilet && k.push("chemicalToilet"),
                    "1" === L.disabledToilet && k.push("disabledToilet"),
                    "1" === L.privateToilet && k.push("privateToilet"),
                    "1" === L.clothingWash && k.push("clothingWash"),
                    "1" === L.dishWash && k.push("dishWash"),
                    "1" === L.laundry && k.push("laundry"),
                    "1" === L.dryer && k.push("dryer"),
                    "1" === L.dogShower && k.push("dogShower"),
                    "1" === L.refrigerator && k.push("refrigerator"),
                    "1" === L.ambulanta && k.push("ambulanta"),
                    "1" === L.restaurant && k.push("restaurant"),
                    "1" === L.wellness && k.push("wellness"),
                    "1" === L.hairdresser && k.push("hairdresser"),
                    "1" === L.fitness && k.push("fitness"),
                    "1" === L.kiosk && k.push("kiosk"),
                    "1" === L.bar && k.push("bar"),
                    $(".objektamenities").css("display", "block"),
                    0 == k.length && $(".objektamenities").css("display", "none"),
                    "1" === L.noclick)
                        return !1;
                    $("#containerObjekt").html(`<div class="swiper mySwiper">
          <div class="swiper-wrapper">
    
          </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>`),
                    $("#containerObjekt").append('<div class="show-pitch img"><i class="fa fa-search"></i></div>'),
                    "" != panomPhotoUrlObjekt && $("#containerObjekt").append('<div class="show-pitch panom">360&deg;</div>'),
                    $(".show-pitch.panom").on("click", function() {
                        let e = panomPhotoUrlObjekt;
                        $("#modalUpitForma").find("iframe").attr({
                            src: e,
                            height: "640px",
                            width: "1200px"
                        }),
                        $("#modalUpitForma").modal("show")
                    }),
                    $(".show-pitch.img").on("click", function() {
                        $("#lbimgobjekt").trigger("click")
                    });
                    var a = [];
                    if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length)
                        arraySlikaSlider.forEach(e=>{
                            a.push('<div class="swiper-slide"><img src="' + e + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + e + '" data-lightbox="roadtrip" /></div>')
                        }
                        );
                    else {
                        let t = arraySlikaSlider_PO_TIPU.find(e=>e.vrstaSJ == helper_vrstaSJ_zaSlike);
                        void 0 != t ? t.images.forEach(e=>{
                            a.push('<div class="swiper-slide"><img src="' + e + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + e + '" data-lightbox="roadtrip" /></div>')
                        }
                        ) : a.push('<div class="swiper-slide"><img src="' + _POSTAVKE_KAMPA_.defaultimg + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + _POSTAVKE_KAMPA_.defaultimg + '" data-lightbox="roadtrip" /></div>')
                    }
                    new Swiper(".mySwiper",{
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: !1,
                        allowSlidePrev: !0,
                        allowSlideNext: !0,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: !0,
                            dynamicBullets: !0
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    }).appendSlide(a),
                    v = function e(a, t) {
                        switch (a) {
                        case "1":
                            return translations.recepcija[0][t];
                        case "2":
                            return translations.bazen[0][t];
                        case "3":
                            return translations.pekara[0][t];
                        case "4":
                            return translations.trgovina[0][t];
                        case "5":
                            return translations.stand[0][t];
                        case "6":
                            return translations.sport[0][t];
                        case "7":
                            return translations.masaza[0][t];
                        case "8":
                            return translations.kafic[0][t];
                        case "9":
                            return translations.restoran[0][t];
                        case "10":
                            return translations.pizzeria[0][t];
                        case "11":
                            return translations.fastfood[0][t];
                        case "12":
                            return translations.wc[0][t];
                        case "13":
                            return translations.aquapark[0][t];
                        case "14":
                            return translations.hotel[0][t];
                        default:
                            return ""
                        }
                    }(L.vrstaObjekta, lng),
                    $("body").addClass("modal-parcela"),
                    $("#brojObjekta").html(`<div class="info-left"><div class="acc-name">${v} ${L.naziv && "-" != L.naziv ? L.naziv : ""}${dev_env ? " (" + u + ")" : ""}</div>
    ${ej(f)}
    ${eA(_)}
    `),
                    function e(a) {
                        if (void 0 !== a) {
                            for (i = 0,
                            nameObj = a; i < nameObj.length; i++)
                                if (void 0 !== Z[nameObj[i]]) {
                                    var t = `<div class="modal-info-inner"><i class="fas fa-${Z[nameObj[i]][0].icon}"></i><div><p>${translations[nameObj[i]][0][lng]}</p></div></div>`;
                                    $(".objektamenities").append(t)
                                }
                        } else {
                            var t = `<div class="modal-info-inner"><i class="fas fa-wifi"></i><div><p>WiFi</p></div></div>
<div class="modal-info-inner"><i class="fas fa-parking"></i><div><p>Parking</p></div></div>`;
                            $(".objektamenities").append(t)
                        }
                    }(k),
                    $("#informationsobjekt").text(`${translations.Informations[0][lng]}`),
                    $("#ModalObjekt").modal("show"),
                    $("#ModalObjekt").attr("broj", w),
                    $("#ModalObjekt").attr("klasa", P),
                    $("#ModalObjekt").attr("draw", j)
                }
                L = "",
                z()
            }
        }
    }
    ),
    $(".modal").on("shown.bs.modal", function(e) {
        $(window).width()
    }),
    $(".modal").on("hide.bs.modal", function() {
        $(window).width()
    }),
    $("#ModalParcela").on("shown.bs.modal", function() {
        var e = $(this).attr("broj")
          , a = $(this).attr("klasa")
          , t = "images222/" + eO(e, a);
        k = void 0 !== (k = $(this).attr("draw")) && JSON.parse(k = (k = k.replaceAll("p", "pitch")).replaceAll("y", "yaw")),
        (viewera = pannellum.viewer("containerParcela", {
            type: "equirectangular",
            panorama: t,
            autoLoad: !0,
            yaw: 355,
            hfov: 120,
            showControls: !1,
            showFullscreenCtrl: !1
        })).setPitchBounds([-75, 75]),
        $(".pnlm-load-box").css("display", "flex"),
        $(".pnlm-load-box p:first-of-type").html(`${translations.Loading[0][lng]}...`),
        $(".modal-header button.close").animate({
            opacity: "1"
        }, 500),
        viewera.on("load", function() {
            $(".pnlm-zoom-in").addClass("fas fa-plus"),
            $(".pnlm-zoom-out").addClass("fas fa-minus"),
            $(".pnlm-fullscreen-toggle-button").addClass("fas fa-expand"),
            $(".pnlm-sprite").removeClass("pnlm-sprite"),
            $(".pnlm-zoom-controls").show(),
            $(".pnlm-zoom-controls").animate({
                opacity: "1"
            }, 500),
            $(".pnlm-fullscreen-toggle-button").show(),
            $(".pnlm-fullscreen-toggle-button").animate({
                opacity: "1"
            }, 500),
            $(".pnlm-orientation-button").addClass("far fa-compass"),
            $(".pnlm-orientation-button").show(),
            $(".pnlm-orientation-button").animate({
                opacity: "1"
            }, 500),
            $(".pnlm-orientation-button").on("click", function() {
                $(this).removeClass("fa-dot-circle"),
                $(this).is(".pnlm-orientation-button-active") && $(this).addClass("fa-dot-circle")
            }),
            void 0 !== k && !1 != k && ($(".pnlm-fullscreen-toggle-button").on("click", function() {
                viewera.on("fullscreenchange", function() {
                    $("#ctx").attr("width", $(".pannellum-canvas").width()),
                    $("#ctx").attr("height", $(".pannellum-canvas").height()),
                    $(this).is(":not(.pnlm-fullscreen-toggle-button-active)") && ($("#ctx").attr("width", $(".pannellum-canvas").width()),
                    $("#ctx").attr("height", $(".pannellum-canvas").height())),
                    viewera.resize()
                })
            }),
            $(".pnlm-orientation-button").on("click", function() {
                var e = !1;
                $("#ctx").attr("width", $(".pnlm-render-container").width()),
                $("#ctx").attr("height", $(".pnlm-render-container").height()),
                $(this).is(":not(.pnlm-orientation-button-active)") && ($("#ctx").attr("width", $(".pnlm-render-container").width()),
                $("#ctx").attr("height", $(".pnlm-render-container").height())),
                e = !0;
                var a = setInterval(function() {
                    !0 == e && (viewera.resize(),
                    clearInterval(a))
                }, 100)
            }),
            $("#containerParcela").append(`<div class="show-pitch">${translations["Show pitch"][0][lng]}</div>`),
            $(".show-pitch").on("click", function() {
                var e = !1;
                if ($(this).toggleClass("hide-pitch"),
                $(this).is(".hide-pitch")) {
                    viewera.setPitch(0),
                    viewera.setYaw(355),
                    $("#ctx").show(),
                    $(".show-pitch").html(`${translations["Hide pitch"][0][lng]}`);
                    for (var a = 0; a < k.length; a++) {
                        async function t() {
                            return await viewera.addHotSpot({
                                pitch: k[a].pitch,
                                yaw: k[a].yaw
                            })
                        }
                        t().then(function(t) {
                            a == k.length && (e = !0)
                        })
                    }
                }
                $(this).is(":not(.hide-pitch)") && ($(this).html(`${translations["Show pitch"][0][lng]}`),
                $("#ctx").hide(),
                $(".pnlm-hotspot-base").remove());
                var o = setInterval(function() {
                    !0 == e && (viewera.resize(),
                    clearInterval(o))
                }, 100)
            }),
            $(".pnlm-render-container").append(`<canvas style="height: 100%; width: 100%;" width="${$(".pnlm-render-container").width()}" height="${$(".pnlm-render-container").height()}" id="ctx">`),
            $(window).on("resize", function() {
                $("#ctx").attr("width", $(".pannellum-canvas").width()),
                $("#ctx").attr("height", $(".pannellum-canvas").height()),
                $(this).is(":not(.pnlm-fullscreen-toggle-button-active)") && ($("#ctx").attr("width", $(".pannellum-canvas").width()),
                $("#ctx").attr("height", $(".pannellum-canvas").height())),
                viewera.resize()
            }))
        }),
        userLocation || (noGPS || $("#ModalParcela #feature-info .brojParcele").before($(`<div class="col-sm-12 navigation-denied">${translations["Navigation not available"][0][lng]}</div>`)),
        $("#navigateTo").css("opacity", "0.5"),
        $("#navigateTo").css("pointer-events", "none")),
        viewera.on("error", function() {
            viewera.destroy(),
            $("#containerParcela").html(`<div class="swiper mySwiper">
        <div class="swiper-wrapper">

        </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>`),
            $("#containerParcela").append('<div class="show-pitch img"><i class="fa fa-search"></i></div>'),
            "" != panomPhotoUrl && null != panomPhotoUrl && $("#containerParcela").append('<div class="show-pitch panom">360&deg;</div>'),
            $(document).on("click", ".show-pitch.panom", function() {
                let e = panomPhotoUrl;
                $("#modalUpitForma").find("iframe").attr({
                    src: e,
                    height: "640px",
                    width: "1200px"
                }),
                $("#modalUpitForma").modal("show")
            }),
            $(".show-pitch.img").on("click", function() {
                $("#lbimg").trigger("click")
            });
            var e = [];
            if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length)
                arraySlikaSlider.forEach(a=>{
                    e.push('<div class="swiper-slide"><img src="' + a + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + a + '" data-lightbox="roadtrip" /></div>')
                }
                );
            else {
                let a = arraySlikaSlider_PO_TIPU.find(e=>e.vrstaSJ == helper_vrstaSJ_zaSlike);
                void 0 != a && a.images.length ? a.images.forEach(a=>{
                    e.push('<div class="swiper-slide"><img src="' + a + '"style="width: 100%"><a id="lbimg" style="display: none" href="' + a + '" data-lightbox="roadtrip" /></div>')
                }
                ) : e.push('<div class="swiper-slide"><img src="' + _POSTAVKE_KAMPA_.defaultimg + '"style="width: 100%"><a id="lbimg" style="display:none" href="' + _POSTAVKE_KAMPA_.defaultimg + '" data-lightbox="roadtrip" /></div>')
            }
            new Swiper(".mySwiper",{
                slidesPerView: 1,
                spaceBetween: 0,
                loop: !1,
                allowSlidePrev: !0,
                allowSlideNext: !0,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: !0,
                    dynamicBullets: !0
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            }).appendSlide(e)
        })
    }),
    $("#ModalObjekt").on("shown.bs.modal", function() {
        var e = $(this).attr("broj")
          , a = $(this).attr("klasa")
          , t = "images2/" + eO(e, a);
        k = void 0 !== (k = $(this).attr("draw")) && JSON.parse(k = (k = k.replaceAll("p", "pitch")).replaceAll("y", "yaw")),
        (viewera = pannellum.viewer("containerObjekt", {
            type: "equirectangular",
            panorama: t,
            autoLoad: !0,
            yaw: 355,
            hfov: 120,
            showControls: !1,
            showFullscreenCtrl: !1
        })).setPitchBounds([-75, 75]),
        $(".pnlm-load-box").css("display", "flex"),
        $(".pnlm-load-box p:first-of-type").html(`${translations.Loading[0][lng]}...`),
        $(".modal-header button.close").animate({
            opacity: "1"
        }, 500),
        viewera.on("load", function() {
            $(".pnlm-zoom-in").addClass("fas fa-plus"),
            $(".pnlm-zoom-out").addClass("fas fa-minus"),
            $(".pnlm-fullscreen-toggle-button").addClass("fas fa-expand"),
            $(".pnlm-sprite").removeClass("pnlm-sprite"),
            $(".pnlm-zoom-controls").show(),
            $(".pnlm-zoom-controls").animate({
                opacity: "1"
            }, 500),
            $(".pnlm-fullscreen-toggle-button").show(),
            $(".pnlm-fullscreen-toggle-button").animate({
                opacity: "1"
            }, 500),
            $(".pnlm-orientation-button").addClass("far fa-compass"),
            $(".pnlm-orientation-button").show(),
            $(".pnlm-orientation-button").animate({
                opacity: "1"
            }, 500),
            $(".pnlm-orientation-button").on("click", function() {
                $(this).removeClass("fa-dot-circle"),
                $(this).is(".pnlm-orientation-button-active") && $(this).addClass("fa-dot-circle")
            }),
            void 0 !== k && !1 != k && ($(".pnlm-fullscreen-toggle-button").on("click", function() {
                viewera.on("fullscreenchange", function() {
                    $("#ctx").attr("width", $(".pannellum-canvas").width()),
                    $("#ctx").attr("height", $(".pannellum-canvas").height()),
                    $(this).is(":not(.pnlm-fullscreen-toggle-button-active)") && ($("#ctx").attr("width", $(".pannellum-canvas").width()),
                    $("#ctx").attr("height", $(".pannellum-canvas").height())),
                    viewera.resize()
                })
            }),
            $(".pnlm-orientation-button").on("click", function() {
                var e = !1;
                $("#ctx").attr("width", $(".pnlm-render-container").width()),
                $("#ctx").attr("height", $(".pnlm-render-container").height()),
                $(this).is(":not(.pnlm-orientation-button-active)") && ($("#ctx").attr("width", $(".pnlm-render-container").width()),
                $("#ctx").attr("height", $(".pnlm-render-container").height())),
                e = !0;
                var a = setInterval(function() {
                    !0 == e && (viewera.resize(),
                    clearInterval(a))
                }, 100)
            }),
            $("#containerObjekt").append(`<div class="show-pitch">${translations["Show pitch"][0][lng]}</div>`),
            $(".show-pitch").on("click", function() {
                var e = !1;
                if ($(this).toggleClass("hide-pitch"),
                $(this).is(".hide-pitch")) {
                    viewera.setPitch(0),
                    viewera.setYaw(355),
                    $("#ctx").show(),
                    $(".show-pitch").html(`${translations["Hide pitch"][0][lng]}`);
                    for (var a = 0; a < k.length; a++) {
                        async function t() {
                            return await viewera.addHotSpot({
                                pitch: k[a].pitch,
                                yaw: k[a].yaw
                            })
                        }
                        t().then(function(t) {
                            a == k.length && (e = !0)
                        })
                    }
                }
                $(this).is(":not(.hide-pitch)") && ($(this).html(`${translations["Show pitch"][0][lng]}`),
                $("#ctx").hide(),
                $(".pnlm-hotspot-base").remove());
                var o = setInterval(function() {
                    !0 == e && (viewera.resize(),
                    clearInterval(o))
                }, 100)
            }),
            $(".pnlm-render-container").append(`<canvas style="height: 100%; width: 100%;" width="${$(".pnlm-render-container").width()}" height="${$(".pnlm-render-container").height()}" id="ctx">`),
            $(window).on("resize", function() {
                $("#ctx").attr("width", $(".pannellum-canvas").width()),
                $("#ctx").attr("height", $(".pannellum-canvas").height()),
                $(this).is(":not(.pnlm-fullscreen-toggle-button-active)") && ($("#ctx").attr("width", $(".pannellum-canvas").width()),
                $("#ctx").attr("height", $(".pannellum-canvas").height())),
                viewera.resize()
            }))
        }),
        userLocation || (noGPS || $("#ModalObjekt #feature-info .modal-button").after($(`<div class="col-sm-12 navigation-denied">${translations["Navigation not available"][0][lng]}</div>`)),
        $("#navigateTo").css("opacity", "0.5"),
        $("#navigateTo").css("pointer-events", "none")),
        viewera.on("error", function() {
            viewera.destroy(),
            $("#containerObjekt").html(`<div class="swiper mySwiper">
      <div class="swiper-wrapper">

      </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>`),
            $("#containerObjekt").append('<div class="show-pitch img"><i class="fa fa-search"></i></div>'),
            "" != panomPhotoUrlObjekt && $("#containerObjekt").append('<div class="show-pitch panom">360&deg;</div>'),
            $(".show-pitch.panom").on("click", function() {
                let e = panomPhotoUrlObjekt;
                $("#modalUpitForma").find("iframe").attr({
                    src: e,
                    height: "640px",
                    width: "1200px"
                }),
                $("#modalUpitForma").modal("show")
            }),
            $(".show-pitch.img").on("click", function() {
                $("#lbimgobjekt").trigger("click")
            });
            var e = [];
            if (Array.isArray(arraySlikaSlider) && arraySlikaSlider.length)
                arraySlikaSlider.forEach(a=>{
                    e.push('<div class="swiper-slide"><img src="' + a + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + a + '" data-lightbox="roadtrip" /></div>')
                }
                );
            else {
                let a = arraySlikaSlider_PO_TIPU.find(e=>e.vrstaSJ == helper_vrstaSJ_zaSlike);
                void 0 != a ? a.images.forEach(a=>{
                    e.push('<div class="swiper-slide"><img src="' + a + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + a + '" data-lightbox="roadtrip" /></div>')
                }
                ) : e.push('<div class="swiper-slide"><img src="' + _POSTAVKE_KAMPA_.defaultimg + '"style="width: 100%"><a id="lbimgobjekt" style="display:none" href="' + _POSTAVKE_KAMPA_.defaultimg + '" data-lightbox="roadtrip" /></div>')
            }
            new Swiper(".mySwiper",{
                slidesPerView: 1,
                spaceBetween: 0,
                loop: !1,
                allowSlidePrev: !0,
                allowSlideNext: !0,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: !0,
                    dynamicBullets: !0
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            }).appendSlide(e)
        })
    }),
    $("#ModalParcela").on("hide.bs.modal", function() {
        $("body").removeClass("modal-parcela"),
        $(this).removeAttr("draw"),
        $(".amenities").html(""),
        $(".modal-header button.close").animate({
            opacity: "0"
        }, 500),
        $(".navigation-denied").remove(),
        $("#navigateTo").css("opacity", "1"),
        $("#navigateTo").removeAttr("style"),
        void 0 != viewera && viewera.destroy(),
        $(window).width()
    }),
    $("#ModalObjekt").on("hide.bs.modal", function() {
        $("body").removeClass("modal-objekt"),
        $(this).removeAttr("draw"),
        $(".amenities").html(""),
        $(".modal-header button.close").animate({
            opacity: "0"
        }, 500),
        $(".navigation-denied").remove(),
        $("#navigateTo").css("opacity", "1"),
        $("#navigateTo").removeAttr("style"),
        void 0 != viewera && viewera.destroy(),
        $(window).width()
    }),
    Math.random().toString(36).slice(2);
    var eI = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: !0
        },
        fitBoundsOptions: {
            maxZoom: 18
        },
        trackUserLocation: !0,
        showUserHeading: !0
    });
    map.addControl(eI);
    var ez = new MapboxDirections({
        accessToken: accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        container: "directions",
        steps: !0,
        modifier: !0,
        voice_instructions: !0,
        interactive: !1,
        controls: {
            inputs: !1,
            instructions: !1,
            profileSwitcher: !1
        }
    });
    $("#return").on("click", function() {
        if (eD = !1,
        isMuted = "",
        isAppleMuted = "muted",
        trackActive = !0,
        $(".banner").remove(),
        $(".time-distance").remove(),
        $(".annotation.route").remove(),
        void 0 != map.getLayer("route") && void 0 != map.getLayer("route2") && void 0 != map.getLayer("route-casing") && void 0 != map.getLayer("route2-casing") && (map.removeLayer("route"),
        map.removeLayer("route2"),
        map.removeLayer("route-casing"),
        map.removeLayer("route2-casing")),
        void 0 != map.getSource("route") && void 0 != map.getSource("route2") && (map.removeSource("route"),
        map.removeSource("route2")),
        L = void 0,
        isVratiPrikaz = !1,
        map.removeControl(eI),
        ez.removeRoutes(),
        setTimeout(e=>{
            if (map.getStyle().sources.directions.data.features.length > 0)
                var a = setInterval(function() {
                    map.getStyle().sources.directions.data.features.length > 0 && ez.removeRoutes(),
                    0 == map.getStyle().sources.directions.data.features.length && clearInterval(a)
                }, 200)
        }
        , 500),
        $("#nav-3d").is(".active") && $("#nav-3d").toggleClass("active"),
        isSetOrigin = !1,
        $(this).css("display", "none"),
        $(".mobile-menu").hide(),
        $(".mobile-menu-shade").hide(),
        $("#audio").remove(),
        $("#voice").remove(),
        $("#date").is(".active")) {
            if ($(".filter-item.brand").is(".active")) {
                var e = $(".filter-item.brand.active").text();
                eg(e),
                ey()
            } else if ($(".filter-item:not(.brand)").is(".active")) {
                var e = $(".filter-item.active").data("class-object")
                  , a = $(".filter-item.active").data("class");
                void 0 != e ? eh(e) : eh("x"),
                void 0 != a ? e8(a) : ew(e)
            } else
                $("#layers").removeClass("active"),
                $(".filter-item").removeAttr("style"),
                e_()
        }
        if ($("#date").is(":not(.active)")) {
            if ($(".filter-item.brand").is(".active")) {
                var e = $(".filter-item.brand.active").text();
                eu(e),
                ey()
            } else if ($(".filter-item:not(.brand)").is(".active")) {
                var e = $(".filter-item.active").data("class-object")
                  , a = $(".filter-item.active").data("class");
                void 0 != e ? eb(e) : eb("x"),
                void 0 != a ? e8(a) : ew(e)
            } else
                $("#layers").removeClass("active"),
                $(".filter-item").removeAttr("style"),
                ek(),
                en()
        }
        $("#home").hide(),
        $("#map").css("pointer-events", "none"),
        map.fitBounds(v, {
            padding: {
                top: .2 * $(window).height(),
                bottom: .2 * $(window).height(),
                left: 10,
                right: 10
            }
        }),
        map.once("moveend", function() {
            map.addControl(eI),
            !1 == (gpsActive = !1) && (setTimeout(function() {
                $("body").removeClass("gps-active"),
                $("#home").show(),
                $("#openTrazi").show(),
                $("#layers").show(),
                $("#lang").show(),
                $("#date").show(),
                $("#navigateTo").show(),
                $(".mobile-menu").show(),
                $(".mobile-menu-shade").show(),
                $("#map").css("pointer-events", "auto")
            }, 1e3),
            map.easeTo({
                center: map.getCenter(v),
                pitch: 0,
                duration: 1e3
            }))
        })
    });
    var eR = !1;
    $("#nav-3d").on("click", function() {
        eR = !0,
        isVratiPrikaz = !0,
        $(this).css("pointer-events", "none"),
        $("#nav-3d").is(".active") ? ($("#nav-3d").toggleClass("active"),
        map.easeTo({
            center: map.getCenter(),
            pitch: 0,
            duration: 1e3
        })) : ($("#nav-3d").toggleClass("active"),
        map.easeTo({
            center: map.getCenter(),
            pitch: 70,
            duration: 1e3
        })),
        setTimeout(function() {
            $("#nav-3d").css("pointer-events", "auto"),
            $(".mapboxgl-ctrl-geolocate-background").is(":hidden") && (isVratiPrikaz = !1),
            $(".mapboxgl-ctrl-geolocate-background").is(":visible") && (isVratiPrikaz = !0)
        }, 1e3)
    }),
    $("#nav-3d").mouseup(function() {
        setTimeout(function() {
            eR = !1
        }, 1e3)
    }),
    j = 0;
    var eD = !1;
    function e9(e) {
        $(".menu-item").removeClass("selected"),
        $(".menu-item").removeClass("not-selected"),
        $("#ModalParcela").addClass("located"),
        $("#ModalObjekt").addClass("located"),
        $(".form-group").removeClass("write"),
        $("#layers").removeClass("active"),
        $("#openTrazi").css({
            opacity: "0.5",
            "pointer-events": "none"
        }),
        $("#layers").css({
            opacity: "0.5",
            "pointer-events": "none"
        }),
        $("#date").css({
            opacity: "0.5",
            "pointer-events": "none"
        }),
        $("#lang").css({
            opacity: "0.5",
            "pointer-events": "none"
        });
        var a = rezultat1.features.find(a=>a.properties.id == e.toString())
          , t = turf.envelope(a).bbox;
        $(".filter-item").removeClass("active"),
        ey(),
        $("#date").is(".active") && el(e),
        $("#date").is(":not(.active)") && es(e);
        var o = $(window).height()
          , n = $(window).width()
          , s = .4 * o
          , l = .3 * n;
        setTimeout(function() {
            map.fitBounds(t, {
                padding: {
                    top: s,
                    bottom: s,
                    left: l,
                    right: l
                }
            }),
            setTimeout(()=>{
                $("#layers").css("pointer-events", "auto"),
                $("#layers").animate({
                    opacity: "1"
                }, 500),
                $("#date").css("pointer-events", "auto"),
                $("#date").animate({
                    opacity: "1"
                }, 500),
                $("#openTrazi").css("pointer-events", "auto"),
                $("#openTrazi").animate({
                    opacity: "1"
                }, 500),
                $("#lang").css("pointer-events", "auto"),
                $("#lang").animate({
                    opacity: "1"
                }, 500),
                $(".filter-item").removeAttr("style"),
                $("#date").is(".active") && e_(),
                $("#date").is(":not(.active)") && en(),
                ek(),
                userLocation && ($("#ModalParcela").removeClass("located"),
                $("#ModalObjekt").removeClass("located"),
                $("#navigateTo").css("pointer-events", "auto"),
                $("#navigateTo").animate({
                    opacity: "1"
                }, 500))
            }
            , 5e3)
        }, 200),
        $("#ModalTrazi").modal("hide")
    }
    $(document).on("click", "#audio", function() {
        $(this).toggleClass("active"),
        $(this).is(".active") && ($(this).html('<i class="fas fa-volume">'),
        null != document.getElementById("voice") && (document.getElementById("voice").muted = !1),
        isMuted = "",
        isAppleMuted = ""),
        $(this).is(":not(.active)") && ($(this).html('<i class="fas fa-volume-slash">'),
        null != document.getElementById("voice") && (document.getElementById("voice").muted = !0),
        isMuted = "muted",
        isAppleMuted = "muted")
    }),
    !0 !== eR && eI.on("geolocate", function(e) {
        if (!1 == trackActive) {
            if (map.once("idle", function(e) {
                !0 == f && ($("#map").css("pointer-events", "auto"),
                $("#home, #nav-3d, #return, #car, #walk, #audio").removeAttr("style"),
                f = !1,
                setTimeout(function() {
                    eD = !0
                }, 2e3),
                isVratiPrikaz = !1,
                $(".banner").remove(),
                $("#voice").remove(),
                $("body").append(`<div class="banner">${I.route[0].legs[0].steps[0].instructions}</div>`),
                $("body").append(`<audio id="voice" ${isAppleDetected ? isAppleMuted : isMuted} autoplay>
            <source src="https://www.camp2guest.com/asdf${"en" == lng ? "" : "_" + lng}/api${"en" == lng ? "" : "_" + lng}/s?text=${I.route[0].legs[0].steps[0].instructions}.${"hr" == lng ? "&speaker_id=hr" : ""}" type="audio/wav">
            </audio>`))
            }),
            map.setPaintProperty("directions-route-line", "line-color", "#d3d3d3"),
            map.setPaintProperty("directions-route-line-casing", "line-color", "#a9a9a9"),
            void 0 != L && !0 == eD) {
                var a, t = turf.lineString([...L]), o = turf.point([eI._lastKnownPosition.coords.longitude, eI._lastKnownPosition.coords.latitude]), n = turf.nearestPointOnLine(t, o, {
                    units: "meters"
                });
                A = [n.geometry.coordinates[0], n.geometry.coordinates[1]],
                turf.booleanPointOnLine(A, t);
                var s = I.route[0].legs[0].steps[j].geometry.coordinates
                  , l = I.route[0].legs[0].steps[j].geometry;
                I.route[0].legs[0].steps[j].instructions,
                s = turf.lineString([...s]),
                turf.length(s, {
                    units: "meters"
                });
                var c = turf.nearestPointOnLine(l, A, {
                    units: "meters"
                });
                c = [c.geometry.coordinates[0], c.geometry.coordinates[1]],
                turf.booleanPointOnLine(c, l);
                var d = I.route[0].legs[0].steps[j + 1].geometry.coordinates;
                d.length > 1 && (d = turf.lineString([...d]),
                turf.booleanPointOnLine(c, d) && j++),
                n.properties.dist < 10 && (eI._userLocationDotMarker.setLngLat([n.geometry.coordinates[0], n.geometry.coordinates[1]]),
                eI._accuracyCircleMarker.setLngLat([n.geometry.coordinates[0], n.geometry.coordinates[1]]));
                var p = turf.point([eI._lastKnownPosition.coords.longitude, eI._lastKnownPosition.coords.latitude])
                  , m = map.getStyle().sources.directions.data.features[1].geometry.coordinates;
                t = turf.lineSlice(p, m, t);
                var u = turf.length(t, {
                    units: "meters"
                });
                $(".time-distance .distance").html(`${formatTimeDistance.metric(u)} |`),
                $(".time-distance .time").html(`${formatTimeDistance.duration(u / z * 3.6)}`),
                void 0 != map.getLayer("route2") && map.getSource("route2").setData(t);
                var v = {
                    units: "meters"
                };
                if (A = [n.geometry.coordinates[0], n.geometry.coordinates[1]],
                C = tockeLegs[j].maneuver.location,
                O = tockeLegs[j + 1].maneuver.location,
                S = Math.trunc(turf.distance(C, O, v)),
                T = Math.trunc(turf.distance(A, C, v)),
                M = Math.trunc(turf.distance(A, O, v)),
                A = [n.geometry.coordinates[0], n.geometry.coordinates[1]],
                C = tockeLegs[j].maneuver.location,
                O = tockeLegs[j + 1].maneuver.location,
                T > S && ($(".banner").remove(),
                C = tockeLegs[j].maneuver.location,
                O = tockeLegs[j + 1].maneuver.location,
                S = Math.trunc(turf.distance(C, O, v)),
                T = Math.trunc(turf.distance(A, C, v)),
                M = Math.trunc(turf.distance(A, O, v))),
                M < S && T < S) {
                    $(".banner").remove();
                    var h = tockeLegs[j + 1].maneuver.modifier
                      , _ = tockeLegs[j + 1].maneuver.type;
                    1 != tockeLegs[j + 1].voice_done && ($("#voice").remove(),
                    $("body").append(`<audio id="voice" ${isAppleDetected ? isAppleMuted : isMuted} autoplay>
            <source src="https://www.camp2guest.com/asdf${"en" == lng ? "" : "_" + lng}/api${"en" == lng ? "" : "_" + lng}/s?text=${tockeLegs[j + 1].instructions}.${"hr" == lng ? "&speaker_id=hr" : ""}" type="audio/wav">
            </audio>`),
                    tockeLegs[j + 1].voice_done = 1),
                    $("body").append(`<div class="banner">
              <div class="banner-top">
                <img src="assets/img/arrows/${void 0 == h && "arrive" == _ ? _ : h}.svg"/>
                <div>${tockeLegs[j + 1].instructions}</div>
              </div>
              <div class="banner-bottom">${formatGPSDistance.metric(Math.floor(M))}</div>
            </div>`),
                    "arrive" == _ && M < 10 && ($(".annotation.gps-done").remove(),
                    $("body").addClass("message"),
                    $("body").append(`<div class="annotation gps-done"><h3>${translations["Travel done"][0][lng]}</h3>
            <p>${translations["Destination reached"][0][lng]} ${formatGPSDistance.metric(Math.floor(M))}.</p>
            <div class="annotation-buttons"><div class="confirm">${translations.Fine[0][lng]}</div></div></div>`),
                    $(".annotation.gps-done .confirm").on("click", function() {
                        $("body").removeClass("message"),
                        $(".annotation.gps-done").remove(),
                        $("#return").trigger("click")
                    }))
                }
            }
            return $("#navigateTo").hide(),
            $("#return").css("display", "block"),
            map.on("touchstart", ()=>{
                isVratiPrikaz = !0
            }
            ),
            map.on("touchend", ()=>{
                isVratiPrikaz = !0,
                !0 == gpsActive && ($(".time-distance").hide(),
                $(".mapboxgl-ctrl-top-right .mapboxgl-ctrl").show(),
                $(".mapboxgl-ctrl-geolocate").html(`${translations["Return view"][0][lng]}<img src='assets/img/gps-arrow.svg'>`))
            }
            ),
            $(".mapboxgl-ctrl-geolocate-background").on("click", function() {
                $(".time-distance").removeAttr("style"),
                map.flyTo({
                    center: [n.geometry.coordinates[0], n.geometry.coordinates[1]],
                    zoom: 18,
                    bearing: 0,
                    curve: 1.42,
                    speed: 1.2,
                    duration: map._easeOptions.duration,
                    easing: e=>e,
                    function() {
                        map.on("moveend", function() {})
                    }
                }),
                $(".mapboxgl-ctrl-top-right .mapboxgl-ctrl").hide(),
                $("#nav-3d").css("pointer-events", "none"),
                setTimeout(function() {
                    isVratiPrikaz = !1,
                    $("#nav-3d").css("pointer-events", "auto")
                }, map._easeOptions.duration)
            }),
            map.getStyle(),
            e.coords.speed > 0 && !1 == isVratiPrikaz && (void 0 != n && (a = !0,
            e.coords.speed > 4 && map.easeTo({
                center: [n.geometry.coordinates[0], n.geometry.coordinates[1]],
                zoom: 18,
                bearing: e.coords.heading,
                duration: 150,
                easing: e=>e
            }),
            e.coords.speed < 4 && map.easeTo({
                center: [n.geometry.coordinates[0], n.geometry.coordinates[1]],
                zoom: 18,
                bearing: e.coords.heading,
                duration: 1e3,
                easing: e=>e
            })),
            map.on("rotate", e=>{
                var a;
                angle1 = function e(a) {
                    var t = a.css("-webkit-transform") || a.css("-moz-transform") || a.css("-ms-transform") || a.css("-o-transform") || a.css("transform");
                    if ("none" !== t && void 0 != t)
                        var o = t.split("(")[1].split(")")[0].split(",")
                          , n = o[0]
                          , s = Math.round(Math.atan2(o[1], n) * (180 / Math.PI));
                    else
                        var s = 0;
                    return s
                }($(".mapboxgl-user-location")),
                (a = $(".mapboxgl-user-location-heading")).css("transform", "rotate(" + (360 - angle1) + "deg)")
            }
            )),
            isSetOrigin || (ez.setDestination(destinationLocation),
            ez.setOrigin([e.coords.longitude, e.coords.latitude]),
            $("#date").is(".active") && el(gpsParcela),
            $("#date").is(":not(.active)") && es(gpsParcela),
            isSetOrigin = !0),
            w = e.coords.longitude,
            P = e.coords.latitude
        }
    }),
    ez.on("route", function(e) {
        (I = e).route.length > 0 && (z = I.route[0].distance / I.route[0].duration * 3.6,
        $(".mapboxgl-ctrl-geolocate-background").is(":visible") && $(".time-distance").hide(),
        $(".annotation.route").remove(),
        I.route[0].geometry = H.toGeoJSONCustom(I.route[0].geometry, 5),
        I.route[0].legs[0].steps.forEach(function(e) {
            e.geometry = H.toGeoJSONCustom(e.geometry, 5),
            Object.assign(e, {
                instructions: module("v5").compile(`${lng}`, e)
            }),
            Object.assign(e, {
                voice_done: 0
            })
        }),
        j = 0,
        map.setPaintProperty("directions-route-line", "line-color", "#1da1f2"),
        map.setPaintProperty("directions-route-line-casing", "line-color", "#2d5f99"),
        L = map.getStyle().sources.directions.data.features[2].geometry.coordinates,
        duzinaLegs = (tockeLegs = I.route[0].legs[0].steps).length,
        void 0 != map.getSource("route2") && void 0 != map.getSource("route") && void 0 != map.getLayer("route") && void 0 != map.getLayer("route-casing") && void 0 != map.getLayer("route2") && void 0 != map.getLayer("route2-casing") && (map.removeLayer("route2-casing"),
        map.removeLayer("route2"),
        map.removeSource("route2"),
        map.removeLayer("route-casing"),
        map.removeLayer("route"),
        map.removeSource("route")),
        map.addSource("route2", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: L
                    }
                }]
            }
        }),
        map.addLayer({
            id: "route2-casing",
            type: "line",
            source: "route2",
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#2d5f99",
                "line-width": 12
            }
        }),
        map.addLayer({
            id: "route2",
            type: "line",
            source: "route2",
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#1da1f2",
                "line-width": 8
            }
        }),
        map.addSource("route", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: L
                    }
                }]
            }
        }),
        map.addLayer({
            id: "route-casing",
            type: "line",
            source: "route",
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#cccccc",
                "line-width": 12
            }
        }),
        map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#eaeaea",
                "line-width": 8
            }
        }),
        map.moveLayer("route-casing", "directions-origin-point"),
        map.moveLayer("route2-casing", "directions-origin-point"),
        map.moveLayer("route", "directions-origin-point"),
        map.moveLayer("route2", "directions-origin-point"),
        map.moveLayer("route-casing", "poi-numbers"),
        map.moveLayer("route2-casing", "poi-numbers"),
        map.moveLayer("route", "poi-numbers"),
        map.moveLayer("route2", "poi-numbers")),
        0 == I.route.length && ($(".annotation.route").remove(),
        $("body").addClass("message"),
        $("body").append(`<div class="annotation"><h3>${translations["Imporant message"][0][lng]}</h3>
  <p>${translations["Routing not available"][0][lng]}
  ${"car" == $(".profile-switch.active").attr("id") ? translations["Switch walking"][0][lng] : translations["Switch driving"][0][lng]}</p>
  <div class="annotation-buttons"><div class="confirm">${translations.Fine[0][lng]}</div></div></div>`),
        $(".confirm").on("click", function() {
            $("body").removeClass("message"),
            $(".annotation").remove()
        }))
    }),
    map.addControl(ez);
    let e3 = async e=>{
        if (void 0 !== rezultat1 && (" " == e.charAt(0) && (search.value = "",
        $("#match-list").html("")),
        " " !== e.charAt(0) && void 0 !== e)) {
            $(".form-group").addClass("write"),
            "" == search.value && $(".form-group").removeClass("write");
            let a = rezultat1;
            var t = [];
            t.push(a),
            D = (R = t[0].features).filter(a=>{
                matchList.innerHTML = `<div class="search-error">${translations["Search error"][0][lng]}</div>`,
                D = [],
                RegExp.quote = function e(a) {
                    return a.replace(/([.?*+^$[\]\\(){}|])/g, "")
                }
                ;
                let t = RegExp(RegExp.quote(`${e}`), "gi");
                if (("MultiPolygon" == a.geometry.type || "Polygon" == a.geometry.type) && null !== a.properties[lng] && void 0 !== a.properties[lng]) {
                    var o = void 0 !== a.properties.number ? a.properties.number : ""
                      , n = void 0 !== a.properties.label ? a.properties.label : ""
                      , s = a.properties[lng] + " " + (o || n || "");
                    s = s.match(t);
                    var l = void 0 !== a.properties.brand ? a.properties.brand : "";
                    if (l = l.match(t),
                    null !== s && "" !== s[0])
                        return s;
                    if (null !== l && "" !== l[0])
                        return l;
                    null !== n && n[0]
                }
            }
            ),
            0 === e.length && (D = [],
            matchList.innerHTML = ""),
            clearInterval(K),
            (E = {
                time: function() {
                    outputHTML(D.sort((e,a)=>(e.properties[lng] + e.properties.number).localeCompare(a.properties[lng] + a.properties.number, lng, {
                        numeric: !0,
                        ignorePunctuation: !0,
                        sensitivity: "base"
                    })).slice(0, 10))
                }
            }).time(),
            K = setInterval(function() {
                E.time()
            }, 5e3)
        }
    }
    ;
    function e4(e) {
        var a;
        return e.forEach((e,t)=>{
            a += `<div><img src="images/facilities/${e}"/></div>`
        }
        ),
        a.replace("undefined", "")
    }
    function eK(e, a) {
        if ("recommended" == a)
            try {
                var t = turf.envelope(rezultat1.features.find(a=>a.properties.id === e.toString()))
                  , o = turf.distance(userLocation, turf.centerOfMass(t), {
                    units: "meters"
                });
                return `${o > 1e3 ? (o / 1e3).toFixed(0) + " km" : o.toFixed(0) + " m"}`
            } catch {
                return `${translations["Distance not available"][0][lng]}`
            }
        else
            try {
                var t = turf.envelope(R.find(a=>a.properties.id === e.toString()))
                  , o = turf.distance(userLocation, turf.centerOfMass(t), {
                    units: "meters"
                });
                return `<small>${o > 1e3 ? (o / 1e3).toFixed(0) + " km" : o.toFixed(0) + " m"}</small>`
            } catch {
                return `<small style="position: relative; margin-left: 38px; margin-bottom: 10px;">${translations["Distance not available"][0][lng]}</small>`
            }
    }
    function eB(e) {
        if (void 0 === e.brand)
            return "";
        var a, t = turf.envelope(R.find(a=>a.properties.id === e.id.toString()));
        return `<small>${translations.Dimensions[0][lng]} cca: ${turf.rhumbDistance(turf.point(t.geometry.coordinates[0][0]), turf.point(t.geometry.coordinates[0][1]), {
            units: "meters"
        }).toFixed(0)} \xd7 ${turf.rhumbDistance(turf.point(t.geometry.coordinates[0][1]), turf.point(t.geometry.coordinates[0][2]), {
            units: "meters"
        }).toFixed(0)} m</small>`
    }
    outputHTML = e=>{
        e.length > 0 && (html = e.map(e=>{
            var a, t, o, n;
            return `
        <div class="card card-body mb-4" id="test" data-id=${e.properties.id}>
            <span>${void 0 === U[a = e.properties.en] ? "" : `<i class="fas fa-${U[a][0].icon}"></i>`} ${void 0 === (t = e.properties.class) ? "" : "glamping" == t ? '<i class="fas-pro fa-campground"></i>' : "caravan" == t ? '<i class="fas-pro fa-caravan"></i>' : "parcela" == t ? '<i class="fas fa-rv"></i>' : "mh" == t ? '<i class="fas-pro fa-house-tree"></i>' : ""}
            <h4 class='text-primary'>${e.properties[lng]} ${e.properties.number ? e.properties.number : ""} ${e.properties.label ? e.properties.label : ""}</h4>${eK(e.properties.id)}</span>
            ${e0(e.properties)}
            ${o = e.properties.id,
            void 0 == slobodne ? "" : $(".is-start-date") && void 0 != $(".is-start-date").html() ? slobodne.includes(o) ? `<span class="availability unavailable">${translations["Accomodation availability"][0][lng]} ${translations.Unavailable[0][lng]}</span>` : !slobodne.includes(o) && accomodation.includes(o) ? `<span class="availability available">${translations["Accomodation availability"][0][lng]} ${translations.Available[0][lng]}</span>` : "" : ""}
            ${void 0 === brandColors[n = e.properties.brand] ? "" : `<span class="text-brand" style="background:${brandColors[n][0].color}">${n}</span>`}
        </div>`
        }
        ).join(""),
        "" != $("input#search").val() && (matchList.innerHTML = html),
        $("[data-id]").on("click", function() {
            let e = $(this).attr("data-id")
              , a = document.querySelector('[data-id="' + e + '"]');
            e9(a.dataset.id)
        }))
    }
    ,
    search.addEventListener("input", ()=>e3(search.value)),
    $("#openTrazi").on("click", function() {
        $("#ModalTrazi").is(":hidden") && ($("#map").css("height", $(window).height() + "px"),
        $(".feature-button").remove(),
        function e() {
            for (var a of ($("#match-list").after("<div class='recommandations-container'></div>"),
            Object.keys(U))) {
                var t, o = `fas fa-${U[a][0].icon}`, n = rezultat1.features.find(e=>e.properties.en == `${a}`), s = n, l = rezultat1.features, c = c = 1 == (l = l.filter(e=>e.properties.en == `${a}`).length) ? 0 : 1;
                void 0 !== n && void 0 !== s && l > 0 && (n = n.properties[lng],
                $(".feature-buttons").append(`<div class="feature-button" data-feature="${n}"><i class="${o}"></i><span><span>${n}</span><small>${l} ${translations.Places[0][lng][c]}</small></span>`),
                B = $(".recommandations-container").append(`<div class="recommandations">
        <div class="card card-body mb-4" id="test" data-id="${s.properties.id}" ">
            <div class="recommandations-image">
            ${e4(s.properties.pics)}
            </div>
            <div class="recommandations-content">
            <i class="${o}"></i>
              <h2>${s.properties[lng]} ${void 0 != s.properties.label ? s.properties.label : ""}</h2>
              <span class="udaljenost">
              ${s.properties[lng]} \xd7 ${eK(s.properties.id, "recommended")}</span>
              <span class="open">${e0(s.properties, "recommended")}</span>
            </div>
          </div>
    </div>`))
            }
            $("[data-id]").on("click", function() {
                let e = $(this).attr("data-id")
                  , a = document.querySelector('[data-id="' + e + '"]');
                e9(a.dataset.id)
            }),
            $("#match-list").before(`<div class='recommended'>${translations.Recommended[0][lng]}</div>`),
            $(".feature-buttons").append('<div class="feature-button FAKE"></div>'),
            $(".feature-buttons .feature-button").on("click", function() {
                $(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").is(":hidden") && setTimeout(function() {
                    $(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
                }, 100),
                $(".found").remove(),
                $("#match-list").before(`<div class='found'>${translations.Found[0][lng]}</div>`),
                $(".feature-buttons .feature-button").removeClass("active"),
                $(".recommended").remove(),
                $(".recommandations-container").remove(),
                $(this).addClass("active");
                var e = $(this).data("feature");
                $("#search").val(e),
                e3(e)
            })
        }(),
        $("#ModalTrazi").modal("show"),
        $(".filters").is(".open") && setTimeout(()=>{
            $(".filters").toggleClass("open")
        }
        , 150),
        $(".languages").is(".open") && setTimeout(()=>{
            $(".languages").toggleClass("open")
        }
        , 150),
        setTimeout(function() {
            search.value = "",
            $("#match-list").html("")
        }, 200)),
        $("#ModalTrazi").is(":visible") && $("#ModalTrazi").modal("hide"),
        $(".mapboxgl-popup").remove()
    }),
    $("input#search").on("focus", function() {
        $(".feature-buttons .feature-button").removeClass("active"),
        window.outerWidth < 768 && $(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").hide()
    }),
    $("input#search").on("input", function() {
        $(".found").remove(),
        $("#match-list").before(`<div class='found'>${translations.Found[0][lng]}</div>`),
        $(".recommended").remove(),
        $(".recommandations-container").remove(),
        "" == $(this).val() && ($(".found").remove(),
        $("#match-list").before(`<div class='recommended'>${translations.Recommended[0][lng]}</div>`),
        $("#match-list").after(B))
    }),
    $(document).on("keypress", function(e) {
        13 == e.which && ($("input#search").blur(),
        setTimeout(function() {
            $(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
        }, 100))
    }),
    $(document).click(function(e) {
        !$(e.target).closest(".form-group").length && $(".form-group").is(":visible") && ($("input#search").blur(),
        setTimeout(function() {
            $(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show()
        }, 100))
    }),
    $(document).on("click", ".modal-backdrop", function() {
        $(".menu-item").removeClass("selected"),
        $(".menu-item").removeClass("not-selected")
    }),
    $(".menu-item").on("click", function() {
        $(".annotation.weather").is(":visible") && ($(".annotation.weather").remove(),
        $(".weather-bg").remove()),
        setTimeout(e=>{
            $(this).is(".selected") ? ($(".menu-item").removeClass("not-selected"),
            $(".menu-item").removeClass("selected")) : ($(".menu-item").removeClass("not-selected"),
            $(".menu-item").not($(this)).addClass("not-selected"),
            $(".menu-item").removeClass("selected"),
            $(this).addClass("selected"))
        }
        , 100)
    }),
    $("#ModalTrazi").on("hide.bs.modal", function() {
        clearInterval(K),
        window.outerWidth > 768 && ($("#ModalTrazi").animate({
            opacity: 0
        }, 100),
        setTimeout(function() {
            $("#ModalTrazi").css("opacity", "")
        }, 500)),
        $("#match-list").html(""),
        $(".found").remove(),
        $(".recommended").remove(),
        $(".recommandations-container").remove(),
        $("#map").removeAttr("style"),
        $(".mobile-menu, #home, #lang, #layers, #date, #openTrazi").show(),
        $(".form-group").removeClass("write")
    }),
    document.addEventListener("gesturestart", function(e) {
        e.preventDefault()
    }),
    map.on("contextmenu", function(e) {
        dev_env && navigator.clipboard.writeText(JSON.stringify(e.lngLat.wrap()))
    }),
    document.getElementById("bukiraj").disabled = !0,
    tippy("#home", {
        content: translations.hintHome[0][lng],
        placement: "right",
        theme: "light",
        dynamicTitle: !0,
        boundary: "scrollParent",
        touch: !1,
        onShow(e) {
            e.setContent(translations.hintHome[0][lng])
        }
    }),
    tippy("#openTrazi", {
        content: translations.hintTrazilica[0][lng],
        placement: "right",
        theme: "light",
        dynamicTitle: !0,
        boundary: "scrollParent",
        touch: !1,
        onShow(e) {
            e.setContent(translations.hintTrazilica[0][lng])
        }
    }),
    tippy("#layers", {
        content: translations.hintFilteri[0][lng],
        placement: "right",
        theme: "light",
        dynamicTitle: !0,
        boundary: "scrollParent",
        touch: !1,
        onShow(e) {
            e.setContent(translations.hintFilteri[0][lng])
        }
    }),
    tippy("#lang", {
        content: translations.hintJezici[0][lng],
        placement: "right",
        theme: "light",
        dynamicTitle: !0,
        boundary: "scrollParent",
        touch: !1,
        onShow(e) {
            e.setContent(translations.hintJezici[0][lng])
        }
    }),
    tippy("#booknowtraka", {
        content: translations.hintBukiraj[0][lng],
        placement: "bottom",
        theme: "light",
        dynamicTitle: !0,
        boundary: "scrollParent",
        touch: !1,
        onShow(e) {
            e.setContent(translations.hintBukiraj[0][lng])
        }
    }),
    "0" === _POSTAVKE_KAMPA_.bookingModul && ($(".book-form").css("display", "none"),
    $("#date").css("pointer-events", "none"),
    $("#date").css("opacity", "0.5")),
    "" != takeMeToAccomodation && ($("body").addClass("message"),
    $("body").append(`<div class="annotation"><h3>${translations["Taking You to pitch"][0][lng].replace("$pitch", takeMeToAccomodation)}</h3><div class="annotation-buttons"><div class="confirm">${translations.Fine[0][lng]}</div></div></div>`),
    $(".confirm").on("click", function() {
        $("body").removeClass("message"),
        $(".annotation").remove();
        let e = rezultat1.features.find(e=>e.properties.brojGPS === takeMeToAccomodation);
        isSetOrigin = !0,
        gpsParcela = e.properties.id,
        destinationLocation = turf.centerOfMass(turf.combine(turf.multiPolygon(e.geometry.coordinates))).geometry.coordinates,
        e1()
    })),
    intervalID = setInterval(()=>{
        map.loaded() && (hideLoader(),
        clearInterval(intervalID))
    }
    , 300)
}
apiCallRez(),
document.addEventListener("gesturestart", function(e) {
    e.preventDefault()
});
