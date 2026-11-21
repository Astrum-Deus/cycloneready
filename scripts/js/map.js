(async function () {
    const i18n = window.CycloneReadyI18n;
    if (i18n && i18n.ready) await i18n.ready;

var mapImagePath = "../../assets/myanmar-map.jpg";

var regionInformation = {
    "Kachin": {
        "titleKey": "region_kachin_title",
        "risk": "other",
        "labelKey": "region_kachin_label",
        "descriptionKey": "region_kachin_desc",
        "hazardKeys": [
            "region_kachin_h1",
            "region_kachin_h2",
            "region_kachin_h3"
        ],
        "extraKey": "region_kachin_extra"
    },
    "Kayah": {
        "titleKey": "region_kayah_title",
        "risk": "other",
        "labelKey": "region_kayah_label",
        "descriptionKey": "region_kayah_desc",
        "hazardKeys": [
            "region_kayah_h1",
            "region_kayah_h2",
            "region_kayah_h3"
        ],
        "extraKey": "region_kayah_extra"
    },
    "Kayin": {
        "titleKey": "region_kayin_title",
        "risk": "other",
        "labelKey": "region_kayin_label",
        "descriptionKey": "region_kayin_desc",
        "hazardKeys": [
            "region_kayin_h1",
            "region_kayin_h2",
            "region_kayin_h3"
        ],
        "extraKey": "region_kayin_extra"
    },
    "Chin": {
        "titleKey": "region_chin_title",
        "risk": "other",
        "labelKey": "region_chin_label",
        "descriptionKey": "region_chin_desc",
        "hazardKeys": [
            "region_chin_h1",
            "region_chin_h2",
            "region_chin_h3"
        ],
        "extraKey": "region_chin_extra"
    },
    "Sagaing": {
        "titleKey": "region_sagaing_title",
        "risk": "other",
        "labelKey": "region_sagaing_label",
        "descriptionKey": "region_sagaing_desc",
        "hazardKeys": [
            "region_sagaing_h1",
            "region_sagaing_h2",
            "region_sagaing_h3"
        ],
        "extraKey": "region_sagaing_extra"
    },
    "Bago": {
        "titleKey": "region_bago_title",
        "risk": "other",
        "labelKey": "region_bago_label",
        "descriptionKey": "region_bago_desc",
        "hazardKeys": [
            "region_bago_h1",
            "region_bago_h2",
            "region_bago_h3"
        ],
        "extraKey": "region_bago_extra"
    },
    "Magway": {
        "titleKey": "region_magway_title",
        "risk": "other",
        "labelKey": "region_magway_label",
        "descriptionKey": "region_magway_desc",
        "hazardKeys": [
            "region_magway_h1",
            "region_magway_h2",
            "region_magway_h3"
        ],
        "extraKey": "region_magway_extra"
    },
    "Mandalay": {
        "titleKey": "region_mandalay_title",
        "risk": "other",
        "labelKey": "region_mandalay_label",
        "descriptionKey": "region_mandalay_desc",
        "hazardKeys": [
            "region_mandalay_h1",
            "region_mandalay_h2",
            "region_mandalay_h3"
        ],
        "extraKey": "region_mandalay_extra"
    },
    "Shan": {
        "titleKey": "region_shan_title",
        "risk": "other",
        "labelKey": "region_shan_label",
        "descriptionKey": "region_shan_desc",
        "hazardKeys": [
            "region_shan_h1",
            "region_shan_h2",
            "region_shan_h3"
        ],
        "extraKey": "region_shan_extra"
    },
    "Rakhine": {
        "titleKey": "region_rakhine_title",
        "risk": "high",
        "labelKey": "region_rakhine_label",
        "descriptionKey": "region_rakhine_desc",
        "hazardKeys": [
            "region_rakhine_h1",
            "region_rakhine_h2",
            "region_rakhine_h3"
        ],
        "extraKey": "region_rakhine_extra"
    },
    "Ayeyarwady": {
        "titleKey": "region_ayeyarwady_title",
        "risk": "high",
        "labelKey": "region_ayeyarwady_label",
        "descriptionKey": "region_ayeyarwady_desc",
        "hazardKeys": [
            "region_ayeyarwady_h1",
            "region_ayeyarwady_h2",
            "region_ayeyarwady_h3"
        ],
        "extraKey": "region_ayeyarwady_extra"
    },
    "Yangon": {
        "titleKey": "region_yangon_title",
        "risk": "moderate",
        "labelKey": "region_yangon_label",
        "descriptionKey": "region_yangon_desc",
        "hazardKeys": [
            "region_yangon_h1",
            "region_yangon_h2",
            "region_yangon_h3"
        ],
        "extraKey": "region_yangon_extra"
    },
    "Mon": {
        "titleKey": "region_mon_title",
        "risk": "moderate",
        "labelKey": "region_mon_label",
        "descriptionKey": "region_mon_desc",
        "hazardKeys": [
            "region_mon_h1",
            "region_mon_h2",
            "region_mon_h3"
        ],
        "extraKey": "region_mon_extra"
    },
    "Tanintharyi": {
        "titleKey": "region_tanintharyi_title",
        "risk": "moderate",
        "labelKey": "region_tanintharyi_label",
        "descriptionKey": "region_tanintharyi_desc",
        "hazardKeys": [
            "region_tanintharyi_h1",
            "region_tanintharyi_h2",
            "region_tanintharyi_h3"
        ],
        "extraKey": "region_tanintharyi_extra"
    }
};

var regionMapPaths = {
    "Rakhine": "../../assets/rakhine-map.jpg",
    "Ayeyarwady": "../../assets/ayeyarwady-map.jpg",
    "Tanintharyi": "../../assets/tanintharyi-map.jpg"
};

var regionalLocations = {
    "Rakhine": [
        {
            "name": "Maungdaw",
            "nameKey": "loc_maungdaw",
            "descriptionKey": "loc_maungdaw_desc",
            "hazardKeys": [
                "loc_maungdaw_h1",
                "loc_maungdaw_h2",
                "loc_maungdaw_h3"
            ]
        },
        {
            "name": "Sittwe",
            "nameKey": "loc_sittwe",
            "descriptionKey": "loc_sittwe_desc",
            "hazardKeys": [
                "loc_sittwe_h1",
                "loc_sittwe_h2",
                "loc_sittwe_h3"
            ]
        },
        {
            "name": "Kyaukpyu",
            "nameKey": "loc_kyaukpyu",
            "descriptionKey": "loc_kyaukpyu_desc",
            "hazardKeys": [
                "loc_kyaukpyu_h1",
                "loc_kyaukpyu_h2",
                "loc_kyaukpyu_h3"
            ]
        },
        {
            "name": "Thandwe",
            "nameKey": "loc_thandwe",
            "descriptionKey": "loc_thandwe_desc",
            "hazardKeys": [
                "loc_thandwe_h1",
                "loc_thandwe_h2",
                "loc_thandwe_h3"
            ]
        }
    ],
    "Ayeyarwady": [
        {
            "name": "Pathein",
            "nameKey": "loc_pathein",
            "descriptionKey": "loc_pathein_desc",
            "hazardKeys": [
                "loc_pathein_h1",
                "loc_pathein_h2",
                "loc_pathein_h3"
            ]
        },
        {
            "name": "Labutta",
            "nameKey": "loc_labutta",
            "descriptionKey": "loc_labutta_desc",
            "hazardKeys": [
                "loc_labutta_h1",
                "loc_labutta_h2",
                "loc_labutta_h3"
            ]
        },
        {
            "name": "Bogale",
            "nameKey": "loc_bogale",
            "descriptionKey": "loc_bogale_desc",
            "hazardKeys": [
                "loc_bogale_h1",
                "loc_bogale_h2",
                "loc_bogale_h3"
            ]
        },
        {
            "name": "Pyapon",
            "nameKey": "loc_pyapon",
            "descriptionKey": "loc_pyapon_desc",
            "hazardKeys": [
                "loc_pyapon_h1",
                "loc_pyapon_h2",
                "loc_pyapon_h3"
            ]
        }
    ],
    "Tanintharyi": [
        {
            "name": "Dawei",
            "nameKey": "loc_dawei",
            "descriptionKey": "loc_dawei_desc",
            "hazardKeys": [
                "loc_dawei_h1",
                "loc_dawei_h2",
                "loc_dawei_h3"
            ]
        },
        {
            "name": "Myeik",
            "nameKey": "loc_myeik",
            "descriptionKey": "loc_myeik_desc",
            "hazardKeys": [
                "loc_myeik_h1",
                "loc_myeik_h2",
                "loc_myeik_h3"
            ]
        },
        {
            "name": "Kawthaung",
            "nameKey": "loc_kawthaung",
            "descriptionKey": "loc_kawthaung_desc",
            "hazardKeys": [
                "loc_kawthaung_h1",
                "loc_kawthaung_h2",
                "loc_kawthaung_h3"
            ]
        }
    ]
};

function escapeHTML(str) {
    return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function tr(key, params = {}, fallback = "") {
    return window.CycloneReadyI18n
        ? window.CycloneReadyI18n.t(key, params, fallback || key)
        : (fallback || key);
}

function bindText(element, key, params = {}, fallback = "") {
    if (!element) return;
    element.setAttribute("data-i18n-key", key);
    if (Object.keys(params).length) element.setAttribute("data-i18n-params", JSON.stringify(params));
    if (fallback) element.setAttribute("data-i18n-fallback", fallback);
    element.textContent = tr(key, params, fallback);
}

function bindAttribute(element, attribute, key, params = {}, fallback = "") {
    if (!element) return;
    element.setAttribute("data-i18n-key", key);
    element.setAttribute("data-i18n-attr", attribute);
    if (Object.keys(params).length) element.setAttribute("data-i18n-params", JSON.stringify(params));
    if (fallback) element.setAttribute("data-i18n-fallback", fallback);
    element.setAttribute(attribute, tr(key, params, fallback));
}

function resetRegionalMarkers() {
    document.querySelectorAll(".regional-location-marker").forEach(marker => {
        marker.classList.remove("selected");
        marker.setAttribute("aria-pressed", "false");
    });
    document.querySelectorAll(".regional-location-label").forEach(label => label.classList.remove("selected"));
}

function makeHazardList(keys) {
    return keys.map(key => `<li data-i18n-key="${key}">${escapeHTML(tr(key))}</li>`).join("");
}

function showRegionInformation(name) {
    const information = regionInformation[name];
    if (!information) return;
    resetRegionalMarkers();

    const regionNameEl = document.getElementById("regionName");
    const regionContentEl = document.getElementById("regionContent");
    bindText(regionNameEl, information.titleKey);
    if (!regionContentEl) return;

    const mapContainer = document.getElementById("myanmarMap");
    const isZoomedIntoThisRegion = mapContainer && mapContainer.classList.contains("is-zoomed");
    let actionButtonHTML = "";
    if (regionMapPaths[name] && isZoomedIntoThisRegion) {
        actionButtonHTML = `<button type="button" class="map-back-btn location-back-btn" id="backToMyanmarFromRegionBtn"><i class="bi bi-arrow-left"></i><span data-i18n-key="ui_back_myanmar">${escapeHTML(tr("ui_back_myanmar"))}</span></button>`;
    } else if (regionMapPaths[name]) {
        actionButtonHTML = `<button type="button" class="zoom-map-btn" id="zoomIntoRegionBtn"><i class="bi bi-zoom-in"></i><span data-i18n-key="ui_zoom_in">${escapeHTML(tr("ui_zoom_in"))}</span></button>`;
    }

    regionContentEl.innerHTML = `
        <span class="region-risk ${escapeHTML(information.risk)}" data-i18n-key="${information.labelKey}">${escapeHTML(tr(information.labelKey))}</span>
        <p class="region-description" data-i18n-key="${information.descriptionKey}">${escapeHTML(tr(information.descriptionKey))}</p>
        <div class="region-detail-title" data-i18n-key="ui_possible_hazards">${escapeHTML(tr("ui_possible_hazards"))}</div>
        <ul class="region-hazard-list">${makeHazardList(information.hazardKeys)}</ul>
        <div class="region-extra" data-i18n-key="${information.extraKey}">${escapeHTML(tr(information.extraKey))}</div>
        ${actionButtonHTML}
    `;

    const zoomBtn = document.getElementById("zoomIntoRegionBtn");
    if (zoomBtn) zoomBtn.addEventListener("click", () => zoomIntoRegion(name));
    const backBtn = document.getElementById("backToMyanmarFromRegionBtn");
    if (backBtn) backBtn.addEventListener("click", () => returnToMyanmarMap(name));
}

function showLocationInformation(region, locationIndex) {
    const regionInfo = regionInformation[region];
    const information = regionalLocations[region] && regionalLocations[region][locationIndex];
    if (!regionInfo || !information) return;

    const regionNameEl = document.getElementById("regionName");
    const regionContentEl = document.getElementById("regionContent");
    bindText(regionNameEl, information.nameKey, {}, information.name);
    if (!regionContentEl) return;

    regionContentEl.innerHTML = `
        <span class="region-risk ${escapeHTML(regionInfo.risk)}" data-i18n-key="${regionInfo.labelKey}">${escapeHTML(tr(regionInfo.labelKey))}</span>
        <p class="region-description" data-i18n-key="${information.descriptionKey}">${escapeHTML(tr(information.descriptionKey))}</p>
        <div class="region-detail-title" data-i18n-key="ui_possible_hazards">${escapeHTML(tr("ui_possible_hazards"))}</div>
        <ul class="region-hazard-list">${makeHazardList(information.hazardKeys)}</ul>
        <div class="region-extra" data-i18n-key="ui_general_hazards_note">${escapeHTML(tr("ui_general_hazards_note"))}</div>
        <button type="button" class="map-back-btn location-back-btn" id="locationBackBtn"><i class="bi bi-arrow-left"></i><span id="locationBackLabel" data-i18n-key="ui_back_region" data-i18n-params='${escapeHTML(JSON.stringify({region: tr(regionInfo.titleKey)}))}'>${escapeHTML(tr("ui_back_region", {region:tr(regionInfo.titleKey)}))}</span></button>
        <button type="button" class="map-back-btn location-back-btn" id="backToMyanmarFromLocationBtn"><i class="bi bi-arrow-left"></i><span data-i18n-key="ui_back_myanmar">${escapeHTML(tr("ui_back_myanmar"))}</span></button>
    `;

    const backToRegionBtn = document.getElementById("locationBackBtn");
    if (backToRegionBtn) backToRegionBtn.addEventListener("click", () => showRegionInformation(region));
    const backToMyanmarBtn = document.getElementById("backToMyanmarFromLocationBtn");
    if (backToMyanmarBtn) backToMyanmarBtn.addEventListener("click", () => returnToMyanmarMap(region));

    resetRegionalMarkers();
    const selectedMarker = document.getElementById("location-" + region + "-" + locationIndex);
    const selectedLabel = document.getElementById("location-label-" + region + "-" + locationIndex);
    if (selectedMarker) {
        selectedMarker.classList.add("selected");
        selectedMarker.setAttribute("aria-pressed", "true");
    }
    if (selectedLabel) selectedLabel.classList.add("selected");
}

function resetAllDotsAndLabels() {
    Object.keys(regionInformation).forEach(region => {
        const dot = document.getElementById("dot-" + region);
        const label = document.getElementById("label-" + region);
        if (dot) {
            dot.classList.remove("selected");
            dot.setAttribute("aria-pressed", "false");
        }
        if (label) label.classList.remove("selected");
    });
}

function selectRegion(name) {
    if (!regionInformation[name]) return;
    resetAllDotsAndLabels();
    const dot = document.getElementById("dot-" + name);
    const label = document.getElementById("label-" + name);
    if (dot) {
        dot.classList.add("selected");
        dot.setAttribute("aria-pressed", "true");
    }
    if (label) label.classList.add("selected");
    showRegionInformation(name);
}

function makeSingleRegionMarker(wrapper, name) {
    const key = "region_" + name.toLowerCase() + "_short";
    const marker = document.createElement("button");
    marker.type = "button";
    marker.id = "dot-" + name;
    marker.className = "map-region-dot";
    bindAttribute(marker, "aria-label", "ui_view_region_info", {name:tr(regionInformation[name].titleKey)}, "View information about {name}");
    marker.setAttribute("aria-pressed", "false");
    marker.addEventListener("click", () => selectRegion(name));

    const label = document.createElement("span");
    label.id = "label-" + name;
    label.className = "map-dot-label";
    bindText(label, key, {}, name);
    label.addEventListener("click", () => selectRegion(name));
    wrapper.append(marker, label);
}

function makeRegionalLocationMarker(wrapper, region, index) {
    const information = regionalLocations[region][index];
    const marker = document.createElement("button");
    marker.type = "button";
    marker.id = "location-" + region + "-" + index;
    marker.className = "regional-location-marker";
    bindAttribute(marker, "aria-label", "ui_view_location_info", {name:tr(information.nameKey, {}, information.name)}, "View information about {name}");
    marker.setAttribute("aria-pressed", "false");
    marker.addEventListener("click", () => showLocationInformation(region, index));

    const label = document.createElement("span");
    label.id = "location-label-" + region + "-" + index;
    label.className = "regional-location-label";
    bindText(label, information.nameKey, {}, information.name);
    label.addEventListener("click", () => showLocationInformation(region, index));
    wrapper.append(marker, label);
}

function renderMapError(container, titleKey, path, toolbar) {
    container.innerHTML = "";
    if (toolbar) container.appendChild(toolbar);
    const errorBox = document.createElement("div");
    errorBox.className = "map-error";
    const heading = document.createElement("h4");
    bindText(heading, titleKey);
    const message = document.createElement("p");
    bindText(message, "ui_map_error_check");
    const pathEl = document.createElement("p");
    pathEl.textContent = path;
    errorBox.append(heading, message, pathEl);
    container.appendChild(errorBox);
}

function zoomIntoRegion(name) {
    const mapContainer = document.getElementById("myanmarMap");
    if (!mapContainer || !regionMapPaths[name]) return;
    mapContainer.innerHTML = "";
    mapContainer.classList.add("is-zoomed");

    const toolbar = document.createElement("div");
    toolbar.className = "zoomed-map-toolbar";
    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "map-back-btn";
    backButton.innerHTML = `<i class="bi bi-arrow-left"></i><span data-i18n-key="ui_back_myanmar">${escapeHTML(tr("ui_back_myanmar"))}</span>`;
    backButton.addEventListener("click", () => returnToMyanmarMap(name));
    toolbar.appendChild(backButton);
    mapContainer.appendChild(toolbar);

    const mapWrapper = document.createElement("div");
    mapWrapper.className = "regional-map-wrapper";
    const mapImage = document.createElement("img");
    mapImage.className = "regional-map-image";
    mapImage.src = regionMapPaths[name];
    bindAttribute(mapImage, "alt", "alt_region_map", {region:tr(regionInformation[name].titleKey)}, "Map of {region}");
    mapImage.addEventListener("error", () => renderMapError(mapContainer, "ui_region_map_error", regionMapPaths[name], toolbar));
    mapWrapper.appendChild(mapImage);

    (regionalLocations[name] || []).forEach((location, index) => makeRegionalLocationMarker(mapWrapper, name, index));
    mapContainer.appendChild(mapWrapper);

    const legend = document.querySelector(".map-legend");
    if (legend) legend.style.display = "none";
    const mapTitleEl = document.getElementById("mapTitle");
    const mapHintEl = document.getElementById("mapHint");
    bindText(mapTitleEl, regionInformation[name].titleKey);
    if (mapHintEl) mapHintEl.innerHTML = `<i class="bi bi-cursor"></i><span data-i18n-key="ui_click_location">${escapeHTML(tr("ui_click_location"))}</span>`;
    showRegionInformation(name);
}

function returnToMyanmarMap(name) {
    createMyanmarMap(name);
}

function createMyanmarMap(selectedRegion) {
    const mapContainer = document.getElementById("myanmarMap");
    if (!mapContainer) return;
    mapContainer.innerHTML = "";
    mapContainer.classList.remove("is-zoomed");

    const legend = document.querySelector(".map-legend");
    if (legend) legend.style.display = "flex";
    const mapWrapper = document.createElement("div");
    mapWrapper.className = "myanmar-map-wrapper";
    const mapImage = document.createElement("img");
    mapImage.className = "myanmar-map-image";
    mapImage.src = mapImagePath;
    bindAttribute(mapImage, "alt", "alt_myanmar_map");
    mapImage.addEventListener("error", () => renderMapError(mapContainer, "ui_myanmar_map_error", mapImagePath, null));
    mapWrapper.appendChild(mapImage);

    Object.keys(regionInformation).forEach(name => makeSingleRegionMarker(mapWrapper, name));
    mapContainer.appendChild(mapWrapper);
    const mapTitleEl = document.getElementById("mapTitle");
    const mapHintEl = document.getElementById("mapHint");
    bindText(mapTitleEl, "map_country_myanmar");
    if (mapHintEl) mapHintEl.innerHTML = `<i class="bi bi-cursor"></i><span data-i18n-key="click_area">${escapeHTML(tr("click_area"))}</span>`;
    selectRegion(selectedRegion || "Rakhine");
}

function initializeMap() {
    createMyanmarMap();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeMap, {once:true});
} else {
    initializeMap();
}

})();
