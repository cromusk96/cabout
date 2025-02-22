const urlParams = new URLSearchParams(window.location.search);
const from = urlParams.get('from');

const beforeParams = new URL(from);

const grupacijaName = beforeParams.searchParams.get("group_dev")

let _POSTAVKE_KAMPA_

async function fetchSettings() {
    var response = await fetch("https://campsabout.com/mapAPI/settings.php?" + "id=" + "1" + '&group=' + grupacijaName);
    if (response.status === 200) {
      settingsData = await response.json();
      return settingsData
    }
  }
  
async function vratiSettings() {
    _POSTAVKE_KAMPA_ = await fetchSettings();

    if (_POSTAVKE_KAMPA_.maintenanceMode === "0") {
        window.location.href = from
    }
}  

vratiSettings()