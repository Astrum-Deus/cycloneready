
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

var regionPositions = {
    "Kachin": { x: 53, y: 17 },
    "Kayah": { x: 53.5, y: 49 },
    "Kayin": { x: 57, y: 60 },
    "Chin": { x: 33.5, y: 36 },
    "Sagaing": { x: 42, y: 26 },
    "Bago": { x: 47, y: 53 },
    "Magway": { x: 39.5, y: 44 },
    "Mandalay": { x: 46, y: 41 },
    "Shan": { x: 57.5, y: 37 },
    "Rakhine": { x: 35.5, y: 45 },
    "Ayeyarwady": { x: 42, y: 59 },
    "Yangon": { x: 47, y: 60 },
    "Mon": { x: 56, y: 64 },
    "Tanintharyi": { x: 62, y: 81 }
};

var selectedRegion = null;

function showRegionInformation(name) {
    var information = regionInformation[name];

    if (!information) {
        return;
    }

    document.getElementById("regionName").textContent = information.title;

    var hazardHTML = "";

    information.hazards.forEach(function(hazard) {
        hazardHTML += "<li>" + hazard + "</li>";
    });

    document.getElementById("regionContent").innerHTML = `
        <span class="region-risk ${information.risk}">
            ${information.label}
        </span>

        <p class="region-description">
            ${information.description}
        </p>

        <div class="region-detail-title">POSSIBLE HAZARDS</div>

        <ul class="region-hazard-list">
            ${hazardHTML}
        </ul>

        <div class="region-extra">
            ${information.extra}
        </div>
    `;
}

function selectRegion(name) {
    var dots = document.querySelectorAll(".map-region-dot");

    dots.forEach(function(dot) {
        dot.classList.remove("selected");
        dot.setAttribute("aria-pressed", "false");
    });

    var selectedDot = document.querySelector(
        '.map-region-dot[data-name="' + name + '"]'
    );

    if (selectedDot) {
        selectedDot.classList.add("selected");
        selectedDot.setAttribute("aria-pressed", "true");
    }

    selectedRegion = name;
    showRegionInformation(name);
}

function createMyanmarMap() {
    var mapContainer = document.getElementById("myanmarMap");

    if (!mapContainer) {
        return;
    }

    mapContainer.innerHTML = "";

    var mapWrapper = document.createElement("div");
    mapWrapper.className = "myanmar-map-wrapper";

    var mapImage = document.createElement("img");
    mapImage.className = "myanmar-map-image";
    mapImage.src = mapImagePath;
    mapImage.alt = "Map of Myanmar showing its states and regions";

    mapImage.onerror = function() {
        mapContainer.innerHTML = `
            <div class="map-error">
                <h4>Map image could not be loaded</h4>
                <p>Check that the image exists at this location:</p>
                <p>${mapImagePath}</p>
            </div>
        `;
    };

    mapWrapper.appendChild(mapImage);

    Object.keys(regionPositions).forEach(function(name) {
        var position = regionPositions[name];

        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "map-region-dot";
        dot.dataset.name = name;
        dot.style.left = position.x + "%";
        dot.style.top = position.y + "%";
        dot.setAttribute("aria-label", "View information about " + name);
        dot.setAttribute("aria-pressed", "false");
        dot.title = name;

        dot.addEventListener("click", function() {
            selectRegion(name);
        });

        mapWrapper.appendChild(dot);
    });

    mapContainer.appendChild(mapWrapper);

    selectRegion("Rakhine");
}

document.addEventListener("DOMContentLoaded", function() {
    createMyanmarMap();
});
