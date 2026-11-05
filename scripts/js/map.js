
var highExposure = ["Rakhine", "Ayeyarwady"];
var coastalExposure = ["Yangon", "Mon", "Tanintharyi"];

var regionInformation = {
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
    },
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
    "Naypyidaw": {
        title: "Naypyidaw Union Territory",
        risk: "other",
        label: "Inland area",
        description: "Naypyidaw is inland and does not have direct coastal exposure. However, heavy rainfall from a cyclone can still affect roads, drainage systems and nearby waterways.",
        hazards: ["Localised flooding", "Flash flooding after intense rainfall", "Strong winds and fallen trees"],
        extra: "Being inland reduces direct exposure to storm surges, but does not remove the danger of heavy rain and strong winds."
    }
};

var selectedRegion = null;

function normalizeRegionName(name) {
    return String(name)
        .replace(/\s+(State|Region|Division|Union Territory)$/i, "")
        .replace(/Nay Pyi Taw|Naypyitaw/i, "Naypyidaw")
        .trim();
}

function getRegionName(feature) {
    var properties = feature.properties || {};

    var name = properties.shapeName ||
        properties.shapeName_en ||
        properties.NAME_1 ||
        properties.name ||
        properties.NAME ||
        "Unknown area";

    name = String(name).trim();

    var key = normalizeRegionName(name);

    if (regionInformation[key]) {
        return key;
    }

    return key;
}

function getRegionTitle(name) {
    if (regionInformation[name]) {
        return regionInformation[name].title;
    }

    return name;
}

function getRegionType(name) {
    if (highExposure.includes(name)) {
        return "high";
    }

    if (coastalExposure.includes(name)) {
        return "moderate";
    }

    return "other";
}

function getRegionColor(name) {
    var type = getRegionType(name);

    if (type === "high") {
        return "#c76b5d";
    }

    if (type === "moderate") {
        return "#d5a75e";
    }

    return "#8c9db5";
}

function showRegionInformation(name) {
    var information = regionInformation[name];

    if (!information) {
        return;
    }

    document.getElementById("regionName").textContent = information.title;

    var hazardHTML = "";

    for (var i = 0; i < information.hazards.length; i++) {
        hazardHTML += "<li>" + information.hazards[i] + "</li>";
    }

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

function getCoordinates(geometry) {
    var coordinates = [];

    function collect(item) {
        if (typeof item[0] === "number") {
            coordinates.push(item);
        } else {
            for (var i = 0; i < item.length; i++) {
                collect(item[i]);
            }
        }
    }

    collect(geometry.coordinates);

    return coordinates;
}

function getMapBounds(features) {
    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;

    var middleLatitude = 19.5;
    var longitudeScale = Math.cos(middleLatitude * Math.PI / 180);

    features.forEach(function(feature) {
        var coordinates = getCoordinates(feature.geometry);

        coordinates.forEach(function(point) {
            var x = point[0] * longitudeScale;
            var y = point[1];

            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        });
    });

    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
        longitudeScale: longitudeScale
    };
}

function projectPoint(point, bounds, width, height, padding) {
    var x = point[0] * bounds.longitudeScale;
    var y = point[1];

    var mapWidth = width - padding * 2;
    var mapHeight = height - padding * 2;

    var scale = Math.min(
        mapWidth / (bounds.maxX - bounds.minX),
        mapHeight / (bounds.maxY - bounds.minY)
    );

    var drawnWidth = (bounds.maxX - bounds.minX) * scale;
    var drawnHeight = (bounds.maxY - bounds.minY) * scale;

    var offsetX = (width - drawnWidth) / 2;
    var offsetY = (height - drawnHeight) / 2;

    return {
        x: offsetX + (x - bounds.minX) * scale,
        y: height - offsetY - (y - bounds.minY) * scale
    };
}

function makeRingPath(ring, bounds, width, height, padding) {
    var path = "";

    ring.forEach(function(point, index) {
        var position = projectPoint(
            point,
            bounds,
            width,
            height,
            padding
        );

        if (index === 0) {
            path += "M " + position.x + " " + position.y;
        } else {
            path += " L " + position.x + " " + position.y;
        }
    });

    return path + " Z ";
}

function makeRegionPath(feature, bounds, width, height, padding) {
    var geometry = feature.geometry;
    var path = "";

    if (geometry.type === "Polygon") {
        geometry.coordinates.forEach(function(ring) {
            path += makeRingPath(ring, bounds, width, height, padding);
        });
    }

    if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach(function(polygon) {
            polygon.forEach(function(ring) {
                path += makeRingPath(ring, bounds, width, height, padding);
            });
        });
    }

    return path;
}

function selectRegion(shape, name) {
    if (selectedRegion) {
        selectedRegion.classList.remove("selected");
    }

    selectedRegion = shape;
    selectedRegion.classList.add("selected");

    showRegionInformation(name);

    if (document.activeElement === shape) {
        shape.blur();
    }
}

function enableMapControls() {
    var svg = document.getElementById("myanmarSvg");
    var content = document.getElementById("mapContent");
    var mapContainer = document.getElementById("myanmarMap");

    var zoom = 1;
    var minZoom = 1;
    var maxZoom = 5;

    var moveX = 0;
    var moveY = 0;

    var dragging = false;
    var moved = false;
    var suppressClick = false;

    var startX = 0;
    var startY = 0;

    var startMoveX = 0;
    var startMoveY = 0;

    var activePointer = null;

    function updateMap() {
        content.setAttribute(
            "transform",
            "translate(" + moveX + " " + moveY + ") scale(" + zoom + ")"
        );
    }

    function getPosition(event) {
        var rect = svg.getBoundingClientRect();

        return {
            x: (event.clientX - rect.left) * (600 / rect.width),
            y: (event.clientY - rect.top) * (700 / rect.height)
        };
    }

    function changeZoom(amount, centerX, centerY) {
        var oldZoom = zoom;

        zoom = Math.max(minZoom, Math.min(maxZoom, zoom * amount));

        var scaleChange = zoom / oldZoom;

        moveX = centerX - (centerX - moveX) * scaleChange;
        moveY = centerY - (centerY - moveY) * scaleChange;

        updateMap();
    }

    svg.addEventListener("wheel", function(event) {
        event.preventDefault();

        var position = getPosition(event);

        if (event.deltaY < 0) {
            changeZoom(1.2, position.x, position.y);
        } else {
            changeZoom(0.83, position.x, position.y);
        }
    }, { passive: false });

    svg.addEventListener("pointerdown", function(event) {
        if (event.pointerType === "touch") {
            return;
        }

        if (event.button !== 0) {
            return;
        }

        activePointer = event.pointerId;
        dragging = true;
        moved = false;

        startX = event.clientX;
        startY = event.clientY;

        startMoveX = moveX;
        startMoveY = moveY;
    });

    window.addEventListener("pointermove", function(event) {
        if (!dragging || event.pointerId !== activePointer) {
            return;
        }

        var distanceX = event.clientX - startX;
        var distanceY = event.clientY - startY;

        if (Math.abs(distanceX) > 4 || Math.abs(distanceY) > 4) {
            moved = true;
        }

        if (moved) {
            var rect = svg.getBoundingClientRect();

            moveX = startMoveX + distanceX * (600 / rect.width);
            moveY = startMoveY + distanceY * (700 / rect.height);

            updateMap();
        }
    });

    window.addEventListener("pointerup", function(event) {
        if (event.pointerId !== activePointer) {
            return;
        }

        dragging = false;
        activePointer = null;

        if (moved) {
            suppressClick = true;

            setTimeout(function() {
                suppressClick = false;
            }, 150);
        }
    });

    window.addEventListener("pointercancel", function() {
        dragging = false;
        activePointer = null;
        moved = false;
    });

    var controls = document.createElement("div");
    controls.className = "map-zoom-controls";

    controls.innerHTML = `
        <button type="button" class="map-zoom-button" id="mapZoomIn" aria-label="Zoom in">
            <i class="bi bi-plus-lg"></i>
        </button>

        <button type="button" class="map-zoom-button" id="mapZoomOut" aria-label="Zoom out">
            <i class="bi bi-dash-lg"></i>
        </button>

        <button type="button" class="map-zoom-button" id="mapZoomReset" aria-label="Reset map">
            <i class="bi bi-arrows-fullscreen"></i>
        </button>
    `;

    mapContainer.appendChild(controls);

    document.getElementById("mapZoomIn").addEventListener("click", function() {
        changeZoom(1.3, 300, 350);
    });

    document.getElementById("mapZoomOut").addEventListener("click", function() {
        changeZoom(0.77, 300, 350);
    });

    document.getElementById("mapZoomReset").addEventListener("click", function() {
        zoom = 1;
        moveX = 0;
        moveY = 0;
        updateMap();
    });

    updateMap();

    return function() {
        return suppressClick;
    };
}

function drawMyanmarMap(mapData) {
    var mapContainer = document.getElementById("myanmarMap");

    var width = 600;
    var height = 700;
    var padding = 15;

    var features = mapData.features;
    var bounds = getMapBounds(features);

    var svgHTML = `
        <svg
            viewBox="0 0 ${width} ${height}"
            xmlns="http://www.w3.org/2000/svg"
            class="myanmar-svg"
            id="myanmarSvg"
        >
            <g id="mapContent">
    `;

    features.forEach(function(feature) {
        var name = getRegionName(feature);
        var title = getRegionTitle(name);
        var color = getRegionColor(name);

        var path = makeRegionPath(
            feature,
            bounds,
            width,
            height,
            padding
        );

        svgHTML += `
            <path
                class="map-region"
                data-name="${name}"
                d="${path}"
                fill="${color}"
                fill-rule="evenodd"
                tabindex="0"
                role="button"
                aria-label="${title}"
            >
                <title>${title}</title>
            </path>
        `;
    });

    svgHTML += `
            </g>
        </svg>
    `;

    mapContainer.innerHTML = svgHTML;

    var svg = document.getElementById("myanmarSvg");
    var shapes = mapContainer.querySelectorAll(".map-region");
    var checkDrag = enableMapControls();

    svg.addEventListener("click", function(event) {
        if (checkDrag()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        var target = event.target;

        if (!target.closest || !target.closest(".map-region")) {
            target = document.elementFromPoint(event.clientX, event.clientY);
        }

        var shape = target && target.closest
            ? target.closest(".map-region")
            : null;

        if (!shape || !svg.contains(shape)) {
            return;
        }

        var name = shape.getAttribute("data-name");

        if (name) {
            selectRegion(shape, name);
        }
    });

    shapes.forEach(function(shape) {
        shape.addEventListener("mouseenter", function() {
            shape.classList.add("hovered");
        });

        shape.addEventListener("mouseleave", function() {
            shape.classList.remove("hovered");
        });

        shape.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectRegion(shape, shape.getAttribute("data-name"));
            }
        });
    });

    console.log("Myanmar map loaded!");
    console.log("Regions found:", features.length);

    var rakhine = Array.from(shapes).find(function(shape) {
        return shape.getAttribute("data-name") === "Rakhine";
    });

    if (rakhine) {
        selectRegion(rakhine, "Rakhine");
    } else {
        showRegionInformation("Rakhine");
    }
}

async function loadMyanmarMap() {
    var mapContainer = document.getElementById("myanmarMap");

    try {
        var response = await fetch(
            "https://www.geoboundaries.org/api/current/gbOpen/MMR/ADM1/"
        );

        if (!response.ok) {
            throw new Error("Boundary API error: " + response.status);
        }

        var boundaryData = await response.json();

        console.log("Boundary information:", boundaryData);

        if (!boundaryData.simplifiedGeometryGeoJSON) {
            throw new Error("GeoJSON download link was not found.");
        }

        var geoJsonUrl = boundaryData.simplifiedGeometryGeoJSON
            .replace(
                "https://github.com/",
                "https://media.githubusercontent.com/media/"
            )
            .replace("/raw/", "/");

        console.log("GeoJSON URL:", geoJsonUrl);

        var mapResponse = await fetch(geoJsonUrl);

        if (!mapResponse.ok) {
            throw new Error("GeoJSON download error: " + mapResponse.status);
        }

        var mapText = await mapResponse.text();

        if (mapText.startsWith("version https://git-lfs")) {
            throw new Error("The download returned a Git LFS pointer instead of the map data.");
        }

        var mapData = JSON.parse(mapText);

        if (!mapData.features || mapData.features.length === 0) {
            throw new Error("No map regions were found in the GeoJSON file.");
        }

        drawMyanmarMap(mapData);

    } catch (error) {
        console.error("Map loading failed:", error);

        mapContainer.innerHTML = `
            <div class="map-error">
                <h4>Map loading failed</h4>
                <p>${error.message}</p>
                <p>Please refresh the page or try again later.</p>
            </div>
        `;
    }
}

loadMyanmarMap();
