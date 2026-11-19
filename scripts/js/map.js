var mapImagePath = "../../assets/myanmar-map.jpg";

var regionInformation = {
    "Kachin": {
        title: "Kachin State",
        risk: "other",
        label: "Inland area",
        description: "Kachin is a mountainous northern state with major river systems, including the upper Ayeyarwady. Heavy rainfall can affect mountain communities and settlements near rivers.",
        hazards: ["River flooding", "Landslides on steep slopes", "Heavy rainfall and strong winds"],
        extra: "Mountain roads and communities near rivers can become difficult to access during prolonged heavy rainfall."
    },
    "Kayah": {
        title: "Kayah State",
        risk: "other",
        label: "Inland area",
        description: "Kayah is a mountainous state with valleys and steep terrain. Although it is inland, heavy rain from a cyclone can still affect communities and transport routes.",
        hazards: ["Flash flooding in valleys", "Landslides on steep slopes", "Strong winds and heavy rainfall"],
        extra: "People living near hillsides and streams should be aware of the danger of sudden flooding and landslides."
    },
    "Kayin": {
        title: "Kayin State",
        risk: "other",
        label: "Inland area",
        description: "Kayin contains mountainous areas and river valleys, including areas around the Thanlwin River. Heavy rainfall can cause flooding and landslides.",
        hazards: ["River flooding", "Flash floods in valleys", "Landslides in mountainous areas"],
        extra: "Communities near rivers should monitor water levels and avoid crossing flooded roads or streams."
    },
    "Chin": {
        title: "Chin State",
        risk: "other",
        label: "Inland area",
        description: "Chin State has steep mountains and many hillside settlements. Heavy rainfall associated with cyclones can make slopes unstable and damage roads.",
        hazards: ["Landslides and slope failures", "Flash flooding", "Road damage caused by heavy rainfall"],
        extra: "Landslides can isolate communities by blocking roads. Avoid steep slopes when heavy rain has continued for a long time."
    },
    "Sagaing": {
        title: "Sagaing Region",
        risk: "other",
        label: "Inland area",
        description: "Sagaing includes large inland areas and communities along the Chindwin and Ayeyarwady rivers. Heavy rainfall can increase river levels and cause flooding.",
        hazards: ["River flooding", "Heavy rainfall", "Strong winds damaging trees and buildings"],
        extra: "Communities near major rivers should follow flood warnings even when the cyclone itself is far away."
    },
    "Bago": {
        title: "Bago Region",
        risk: "other",
        label: "Inland area",
        description: "Bago contains low-lying areas, rivers and agricultural land. Heavy rainfall can cause water to collect in low areas and increase river levels.",
        hazards: ["River and localised flooding", "Heavy rainfall affecting farmland", "Strong winds damaging trees and buildings"],
        extra: "Flooding may disrupt roads, farming activities and access to essential services."
    },
    "Magway": {
        title: "Magway Region",
        risk: "other",
        label: "Inland area",
        description: "Magway is an inland region with dry-zone areas and river communities. Although it is far from the coast, cyclone rainfall can still cause dangerous conditions.",
        hazards: ["Flash flooding after heavy rainfall", "River flooding near waterways", "Strong winds and damage to buildings"],
        extra: "Dry ground does not guarantee safety during intense rainfall. Sudden runoff can collect in low-lying areas."
    },
    "Mandalay": {
        title: "Mandalay Region",
        risk: "other",
        label: "Inland area",
        description: "Mandalay includes communities near the Ayeyarwady River and surrounding plains. Heavy rainfall can raise river levels and cause local flooding.",
        hazards: ["Flooding near rivers", "Heavy rainfall and drainage problems", "Strong winds damaging structures"],
        extra: "People near rivers and low-lying settlements should monitor official flood information during severe weather."
    },
    "Shan": {
        title: "Shan State",
        risk: "other",
        label: "Inland area",
        description: "Shan State has extensive highlands, mountains and valleys. Heavy rainfall can affect steep slopes, roads and settlements near streams.",
        hazards: ["Landslides in mountainous areas", "Flash flooding in valleys", "Road damage and strong winds"],
        extra: "Mountain roads may become dangerous during heavy rain. Travelling through areas with unstable slopes should be avoided."
    },
    "Rakhine": {
        title: "Rakhine State",
        risk: "high",
        label: "Higher coastal exposure",
        description: "Rakhine has a long coastline along the Bay of Bengal. Coastal settlements are exposed to cyclones approaching from the bay, particularly when strong winds and high sea levels occur together.",
        hazards: ["Storm surges along the coast", "Strong winds damaging buildings and trees", "Heavy rainfall and flooding"],
        extra: "Cyclone preparedness is especially important for coastal and low-lying communities. Residents should follow warnings from the Department of Meteorology and Hydrology."
    },
    "Ayeyarwady": {
        title: "Ayeyarwady Region",
        risk: "high",
        label: "Higher coastal exposure",
        description: "The Ayeyarwady Delta is a low-lying area with many rivers, waterways and coastal settlements. Its geography makes parts of the region vulnerable to seawater entering inland areas and widespread flooding.",
        hazards: ["Storm surges entering the delta", "River and rainfall flooding", "Strong winds damaging homes and crops"],
        extra: "The region was severely affected by Cyclone Nargis in 2008. Low elevation and proximity to the sea make evacuation planning particularly important."
    },
    "Yangon": {
        title: "Yangon Region",
        risk: "moderate",
        label: "Other vulnerable coastal areas",
        description: "Yangon is located near the Gulf of Martaban and the Ayeyarwady Delta. Its urban areas, rivers and drainage systems can make heavy rainfall especially disruptive.",
        hazards: ["Flooding in low-lying neighbourhoods", "Heavy rainfall overwhelming drainage systems", "Strong winds damaging buildings and trees"],
        extra: "Flooding can affect different townships differently. Dense urban development and drainage conditions influence local impacts."
    },
    "Mon": {
        title: "Mon State",
        risk: "moderate",
        label: "Other vulnerable coastal areas",
        description: "Mon State has a coastline along the Gulf of Martaban. Coastal communities, river valleys and low-lying settlements may be affected by severe weather.",
        hazards: ["Coastal flooding", "Heavy rainfall and overflowing rivers", "Strong winds affecting homes and infrastructure"],
        extra: "Communities near the coast and rivers should pay attention to both cyclone warnings and flood advisories."
    },
    "Tanintharyi": {
        title: "Tanintharyi Region",
        risk: "moderate",
        label: "Other vulnerable coastal areas",
        description: "Tanintharyi has a long coastline along the Andaman Sea, as well as islands and hilly inland areas. Coastal settlements may be exposed to rough seas and severe weather.",
        hazards: ["Coastal flooding and rough seas", "Heavy rainfall and flash floods", "Landslides in steep areas"],
        extra: "Fishing communities and people travelling by boat should take warnings about dangerous sea conditions seriously."
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
            name: "Maungdaw",
            description: "Maungdaw is located in northern Rakhine near the Bangladesh border. Heavy rainfall can affect roads, settlements and low-lying areas.",
            hazards: ["Heavy rainfall", "Localised flooding", "Strong winds"]
        },
        {
            name: "Sittwe",
            description: "Sittwe is a coastal city in western Myanmar. Its position near the Bay of Bengal exposes it to cyclones approaching from the sea.",
            hazards: ["Storm surges", "Coastal flooding", "Strong winds and heavy rainfall"]
        },
        {
            name: "Kyaukpyu",
            description: "Kyaukpyu is a coastal town on Ramree Island. Its location near the sea makes surrounding communities vulnerable to severe cyclone conditions.",
            hazards: ["Storm surges", "Coastal flooding", "Strong winds"]
        },
        {
            name: "Thandwe",
            description: "Thandwe is a coastal area in southern Rakhine. Heavy rainfall and rough sea conditions can affect communities and transport.",
            hazards: ["Heavy rainfall", "Coastal flooding", "Rough seas"]
        }
    ],
    "Ayeyarwady": [
        {
            name: "Pathein",
            description: "Pathein is a major city in the Ayeyarwady Delta. Its position within a large river delta exposes surrounding communities to flooding.",
            hazards: ["River flooding", "Heavy rainfall", "Strong winds"]
        },
        {
            name: "Labutta",
            description: "Labutta is located in the southern Ayeyarwady Delta. Its low elevation and proximity to the sea increase exposure to storm surges.",
            hazards: ["Storm surges", "Coastal flooding", "River flooding"]
        },
        {
            name: "Bogale",
            description: "Bogale is a delta town surrounded by waterways and low-lying land. Heavy rainfall and rising water levels can affect nearby communities.",
            hazards: ["River flooding", "Storm surges", "Heavy rainfall"]
        },
        {
            name: "Pyapon",
            description: "Pyapon is located in the southern delta, where rivers and waterways can increase flood exposure during severe weather.",
            hazards: ["River flooding", "Heavy rainfall", "Strong winds"]
        }
    ],
    "Tanintharyi": [
        {
            name: "Dawei",
            description: "Dawei is a coastal city along the Andaman Sea. Severe weather can affect coastal communities and transport routes.",
            hazards: ["Heavy rainfall", "Coastal flooding", "Strong winds"]
        },
        {
            name: "Myeik",
            description: "Myeik is a coastal city surrounded by islands and waterways. Rough seas and strong winds can affect fishing and boat travel.",
            hazards: ["Rough seas", "Strong winds", "Heavy rainfall"]
        },
        {
            name: "Kawthaung",
            description: "Kawthaung is located at the southern end of Myanmar near the Andaman Sea. Its coastal position exposes it to rough seas and severe weather.",
            hazards: ["Coastal flooding", "Rough seas", "Strong winds"]
        }
    ]
};

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function resetRegionalMarkers() {
    var allMarkers = document.querySelectorAll(".regional-location-marker");
    var allLabels = document.querySelectorAll(".regional-location-label");

    for (var i = 0; i < allMarkers.length; i++) {
        allMarkers[i].classList.remove("selected");
        allMarkers[i].setAttribute("aria-pressed", "false");
    }

    for (var j = 0; j < allLabels.length; j++) {
        allLabels[j].classList.remove("selected");
    }
}

function showRegionInformation(name) {
    var information = regionInformation[name];
    if (!information) return;

    resetRegionalMarkers();

    var regionNameEl = document.getElementById("regionName");
    var regionContentEl = document.getElementById("regionContent");
    if (regionNameEl) regionNameEl.textContent = information.title;
    if (!regionContentEl) return;

    var hazardHTML = "";
    for (var i = 0; i < information.hazards.length; i++) {
        hazardHTML += "<li>" + escapeHTML(information.hazards[i]) + "</li>";
    }

    var mapContainer = document.getElementById("myanmarMap");
    var isZoomedIntoThisRegion = mapContainer && mapContainer.classList.contains("is-zoomed");

    var actionButtonHTML = "";
    if (regionMapPaths[name] && isZoomedIntoThisRegion) {
        actionButtonHTML = `
            <button type="button" class="map-back-btn location-back-btn" id="backToMyanmarFromRegionBtn">
                <i class="bi bi-arrow-left"></i>
                Back to Myanmar Map
            </button>
        `;
    } else if (regionMapPaths[name]) {
        actionButtonHTML = `
            <button type="button" class="zoom-map-btn" id="zoomIntoRegionBtn">
                <i class="bi bi-zoom-in"></i>
                Zoom In
            </button>
        `;
    }

    regionContentEl.innerHTML = `
        <span class="region-risk ${escapeHTML(information.risk)}">
            ${escapeHTML(information.label)}
        </span>

        <p class="region-description">
            ${escapeHTML(information.description)}
        </p>

        <div class="region-detail-title">POSSIBLE HAZARDS</div>

        <ul class="region-hazard-list">
            ${hazardHTML}
        </ul>

        <div class="region-extra">
            ${escapeHTML(information.extra)}
        </div>

        ${actionButtonHTML}
    `;

    var zoomBtn = document.getElementById("zoomIntoRegionBtn");
    if (zoomBtn) {
        zoomBtn.addEventListener("click", function() {
            zoomIntoRegion(name);
        });
    }

    var backFromRegionBtn = document.getElementById("backToMyanmarFromRegionBtn");
    if (backFromRegionBtn) {
        backFromRegionBtn.addEventListener("click", function() {
            returnToMyanmarMap(name);
        });
    }
}

function showLocationInformation(region, location) {
    var regionInfo = regionInformation[region];
    var information = regionalLocations[region] && regionalLocations[region][location];
    if (!regionInfo || !information) return;

    var regionNameEl = document.getElementById("regionName");
    var regionContentEl = document.getElementById("regionContent");
    if (regionNameEl) regionNameEl.textContent = information.name;
    if (!regionContentEl) return;

    var hazardHTML = "";
    for (var i = 0; i < information.hazards.length; i++) {
        hazardHTML += "<li>" + escapeHTML(information.hazards[i]) + "</li>";
    }

    regionContentEl.innerHTML = `
        <span class="region-risk ${escapeHTML(regionInfo.risk)}">
            ${escapeHTML(regionInfo.label)}
        </span>

        <p class="region-description">
            ${escapeHTML(information.description)}
        </p>

        <div class="region-detail-title">POSSIBLE HAZARDS</div>

        <ul class="region-hazard-list">
            ${hazardHTML}
        </ul>

        <div class="region-extra">
            This is a general overview of possible hazards. Actual impacts
            depend on the cyclone's path, strength and local conditions.
        </div>

        <button type="button" class="map-back-btn location-back-btn" id="locationBackBtn">
            <i class="bi bi-arrow-left"></i>
            Back to ${escapeHTML(regionInfo.title)}
        </button>

        <button type="button" class="map-back-btn location-back-btn" id="backToMyanmarFromLocationBtn">
            <i class="bi bi-arrow-left"></i>
            Back to Myanmar Map
        </button>
    `;

    var backToRegionBtn = document.getElementById("locationBackBtn");
    if (backToRegionBtn) {
        backToRegionBtn.addEventListener("click", function() {
            showRegionInformation(region);
        });
    }

    var backToMyanmarBtn = document.getElementById("backToMyanmarFromLocationBtn");
    if (backToMyanmarBtn) {
        backToMyanmarBtn.addEventListener("click", function() {
            returnToMyanmarMap(region);
        });
    }

    resetRegionalMarkers();

    var selectedMarker = document.getElementById("location-" + region + "-" + location);
    var selectedLabel = document.getElementById("location-label-" + region + "-" + location);

    if (selectedMarker) {
        selectedMarker.classList.add("selected");
        selectedMarker.setAttribute("aria-pressed", "true");
    }

    if (selectedLabel) {
        selectedLabel.classList.add("selected");
    }
}

function resetAllDotsAndLabels() {
    var allRegions = Object.keys(regionInformation);

    for (var i = 0; i < allRegions.length; i++) {
        var r = allRegions[i];
        var dot = document.getElementById("dot-" + r);
        var lbl = document.getElementById("label-" + r);

        if (dot) {
            dot.classList.remove("selected");
            dot.setAttribute("aria-pressed", "false");
        }

        if (lbl) {
            lbl.classList.remove("selected");
        }
    }
}

function selectRegion(name) {
    if (!regionInformation[name]) return;

    resetAllDotsAndLabels();

    var dot = document.getElementById("dot-" + name);
    var lbl = document.getElementById("label-" + name);

    if (dot) {
        dot.classList.add("selected");
        dot.setAttribute("aria-pressed", "true");
    }

    if (lbl) {
        lbl.classList.add("selected");
    }

    showRegionInformation(name);
}

function makeSingleRegionMarker(wrapper, name, labelText) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "dot-" + name;
    btn.className = "map-region-dot";
    btn.setAttribute("aria-label", "View information about " + name);
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("click", function() {
        selectRegion(name);
    });

    var tag = document.createElement("span");
    tag.id = "label-" + name;
    tag.className = "map-dot-label";
    tag.textContent = labelText;

    tag.addEventListener("click", function() {
        selectRegion(name);
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(tag);
}

function makeRegionalLocationMarker(wrapper, region, index) {
    var information = regionalLocations[region][index];

    var marker = document.createElement("button");
    marker.type = "button";
    marker.id = "location-" + region + "-" + index;
    marker.className = "regional-location-marker";
    marker.setAttribute("aria-label", "View information about " + information.name);
    marker.setAttribute("aria-pressed", "false");

    marker.addEventListener("click", function() {
        showLocationInformation(region, index);
    });

    var label = document.createElement("span");
    label.id = "location-label-" + region + "-" + index;
    label.className = "regional-location-label";
    label.textContent = information.name;

    label.addEventListener("click", function() {
        showLocationInformation(region, index);
    });

    wrapper.appendChild(marker);
    wrapper.appendChild(label);
}

function renderMapError(container, title, path, toolbar) {
    container.innerHTML = "";
    if (toolbar) {
        container.appendChild(toolbar);
    }

    var errorBox = document.createElement("div");
    errorBox.className = "map-error";

    var heading = document.createElement("h4");
    heading.textContent = title;

    var msg = document.createElement("p");
    msg.textContent = "Check that the image exists at this location:";

    var pathEl = document.createElement("p");
    pathEl.textContent = path;

    errorBox.appendChild(heading);
    errorBox.appendChild(msg);
    errorBox.appendChild(pathEl);
    container.appendChild(errorBox);
}

function zoomIntoRegion(name) {
    var mapContainer = document.getElementById("myanmarMap");
    if (!mapContainer || !regionMapPaths[name]) return;

    mapContainer.innerHTML = "";
    mapContainer.classList.add("is-zoomed");

    var toolbar = document.createElement("div");
    toolbar.className = "zoomed-map-toolbar";

    var backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "map-back-btn";
    backButton.innerHTML = `
        <i class="bi bi-arrow-left"></i>
        Back to Myanmar Map
    `;

    backButton.addEventListener("click", function() {
        returnToMyanmarMap(name);
    });

    toolbar.appendChild(backButton);
    mapContainer.appendChild(toolbar);

    var mapWrapper = document.createElement("div");
    mapWrapper.className = "regional-map-wrapper";

    var mapImage = document.createElement("img");
    mapImage.className = "regional-map-image";
    mapImage.src = regionMapPaths[name];
    mapImage.alt = "Map of " + regionInformation[name].title;

    mapImage.addEventListener("error", function() {
        renderMapError(
            mapContainer,
            "Regional map could not be loaded",
            regionMapPaths[name],
            toolbar
        );
    });

    mapWrapper.appendChild(mapImage);

    var locations = regionalLocations[name] || [];
    for (var i = 0; i < locations.length; i++) {
        makeRegionalLocationMarker(mapWrapper, name, i);
    }

    mapContainer.appendChild(mapWrapper);

    var legend = document.querySelector(".map-legend");
    if (legend) legend.style.display = "none";

    var mapTitleEl = document.getElementById("mapTitle");
    var mapHintEl = document.getElementById("mapHint");
    if (mapTitleEl) mapTitleEl.textContent = regionInformation[name].title;
    if (mapHintEl) mapHintEl.innerHTML = `<i class="bi bi-cursor"></i> Click a location`;

    showRegionInformation(name);
}

function returnToMyanmarMap(name) {
    createMyanmarMap(name);
}

function createMyanmarMap(selectedRegion) {
    var mapContainer = document.getElementById("myanmarMap");
    if (!mapContainer) return;

    mapContainer.innerHTML = "";
    mapContainer.classList.remove("is-zoomed");

    var legend = document.querySelector(".map-legend");
    if (legend) legend.style.display = "flex";

    var mapWrapper = document.createElement("div");
    mapWrapper.className = "myanmar-map-wrapper";

    var mapImage = document.createElement("img");
    mapImage.className = "myanmar-map-image";
    mapImage.src = mapImagePath;
    mapImage.alt = "Map of Myanmar showing its states and regions";

    mapImage.addEventListener("error", function() {
        renderMapError(
            mapContainer,
            "Map image could not be loaded",
            mapImagePath,
            null
        );
    });

    mapWrapper.appendChild(mapImage);

    var regions = Object.keys(regionInformation);
    for (var i = 0; i < regions.length; i++) {
        makeSingleRegionMarker(mapWrapper, regions[i], regions[i]);
    }

    mapContainer.appendChild(mapWrapper);

    var mapTitleEl = document.getElementById("mapTitle");
    var mapHintEl = document.getElementById("mapHint");
    if (mapTitleEl) mapTitleEl.textContent = "Myanmar";
    if (mapHintEl) mapHintEl.innerHTML = `<i class="bi bi-cursor"></i> Click an area`;

    selectRegion(selectedRegion || "Rakhine");
}

document.addEventListener("DOMContentLoaded", function() {
    createMyanmarMap();
});