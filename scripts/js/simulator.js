
const stageNames = [
    "Tropical Disturbance",
    "Tropical Depression",
    "Tropical Storm",
    "Severe Tropical Storm",
    "Mature Cyclone"
];

const stageFolders = [
    "disturbance",
    "depression",
    "tropical-storm",
    "severe-storm",
    "mature-cyclone"
];

const stageDescriptions = [
    "A tropical disturbance is an area of unsettled weather with developing thunderstorms. It does not yet have a well-organised circulation.",
    "A tropical depression has a more organised circulation, with winds beginning to rotate around a developing centre.",
    "A tropical storm has stronger winds and more organised thunderstorms. Its cloud bands become more noticeable.",
    "A severe tropical storm has stronger winds and increasingly organised clouds, bringing a greater risk of damaging weather.",
    "A mature cyclone has a well-developed circulation, powerful winds and organised cloud bands. Stronger cyclones may also develop a visible eye."
];

const conditions = {
    temperature: {
        slider: document.getElementById("temperature"),
        value: document.getElementById("temperatureValue"),
        status: document.getElementById("temperatureStatus"),
        analysis: document.getElementById("temperatureAnalysis"),
        favourable: value => value >= 26.5,
        format: value => `${value}°C`,
        goodText: "Warm ocean water provides energy that helps storms develop.",
        badText: "Cooler ocean water provides less energy for storm development."
    },
    moisture: {
        slider: document.getElementById("moisture"),
        value: document.getElementById("moistureValue"),
        status: document.getElementById("moistureStatus"),
        analysis: document.getElementById("moistureAnalysis"),
        favourable: value => value >= 60,
        format: value => `${value}%`,
        goodText: "Moist air helps thunderstorms grow and continue developing.",
        badText: "Drier air makes it harder for thunderstorms to develop."
    },
    windShear: {
        slider: document.getElementById("windShear"),
        value: document.getElementById("windShearValue"),
        status: document.getElementById("windShearStatus"),
        analysis: document.getElementById("windShearAnalysis"),
        favourable: value => value < 50,
        format: value => `${value}%`,
        goodText: "Lower wind shear allows the storm to stay more organised.",
        badText: "Strong wind shear can push the storm's clouds apart and weaken its organisation."
    },
    instability: {
        slider: document.getElementById("instability"),
        value: document.getElementById("instabilityValue"),
        status: document.getElementById("instabilityStatus"),
        analysis: document.getElementById("instabilityAnalysis"),
        favourable: value => value >= 60,
        format: value => `${value}%`,
        goodText: "Unstable air helps warm air rise and supports thunderstorm development.",
        badText: "More stable air makes it harder for strong thunderstorms to develop."
    }
};

const cycloneImage = document.getElementById("cycloneImage");
const visualPlaceholder = document.getElementById("visualPlaceholder");
const imageStage = document.getElementById("imageStage");
const currentStageName = document.getElementById("currentStageName");
const stageDescription = document.getElementById("stageDescription");
const explanation = document.getElementById("explanation");
const stageButtons = document.querySelectorAll("[data-stage]");
const resetButton = document.getElementById("resetButton");

let currentStage = 0;
let previousStatuses = {};
let previousGifPath = "";
let imageRequest = 0;

const explanations = [
    "None of the selected conditions are favourable. The environment is generally less supportive of tropical cyclone development.",
    "Only one condition is favourable. The environment is generally less supportive of storm development.",
    "Two conditions are favourable. The environment has a mixture of supportive and challenging conditions.",
    "Three conditions are favourable. Most of the selected conditions support storm development.",
    "All four conditions are favourable. The environment is highly supportive of tropical cyclone development."
];

function getConditionStatus(condition) {
    return condition.favourable(Number(condition.slider.value));
}

function getFavourableCount() {
    return Object.values(conditions).filter(condition => getConditionStatus(condition)).length;
}

function animateElement(element, className, duration = 400) {
    if (!element) return;

    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);

    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

function updateRangeFill(condition) {
    const min = Number(condition.slider.min || 0);
    const max = Number(condition.slider.max || 100);
    const value = Number(condition.slider.value);
    const progress = ((value - min) / (max - min)) * 100;

    condition.slider.style.setProperty("--range-progress", `${progress}%`);
}

function updateConditionValues(animateChanges = true) {
    Object.entries(conditions).forEach(([key, condition]) => {
        const value = Number(condition.slider.value);
        const isFavourable = condition.favourable(value);
        const previousStatus = previousStatuses[key];
        const statusChanged = previousStatus !== undefined && previousStatus !== isFavourable;

        condition.value.textContent = condition.format(value);
        updateRangeFill(condition);

        condition.status.textContent = isFavourable ? "Favourable" : "Unfavourable";
        condition.status.classList.toggle("less-favourable", !isFavourable);

        condition.analysis.textContent = isFavourable
            ? condition.goodText
            : condition.badText;

        if (animateChanges && statusChanged) {
            const analysisCard = condition.status.closest(".analysis-item");
            const controlCard = condition.slider.closest(".condition-control");

            animateElement(condition.status, "status-change", 400);
            animateElement(analysisCard, "analysis-change", 450);
            animateElement(controlCard, "is-changing", 400);
        }

        previousStatuses[key] = isFavourable;
    });
}

function updateConditionsMeter(count) {
    const overallPanel = document.querySelector(".overall-analysis");

    if (!overallPanel) return;

    let meterLabel = overallPanel.querySelector(".meter-label");
    let meter = overallPanel.querySelector(".conditions-meter");

    if (!meterLabel) {
        meterLabel = document.createElement("div");
        meterLabel.className = "meter-label";
        meterLabel.innerHTML = "<span>Favourable conditions</span><span id='favourableCount'></span>";
        overallPanel.insertBefore(meterLabel, explanation);
    }

    if (!meter) {
        meter = document.createElement("div");
        meter.className = "conditions-meter";

        for (let i = 0; i < 4; i++) {
            const segment = document.createElement("span");
            meter.appendChild(segment);
        }

        overallPanel.insertBefore(meter, explanation);
    }

    const countLabel = document.getElementById("favourableCount");

    if (countLabel) {
        countLabel.textContent = `${count}/4`;
    }

    Array.from(meter.children).forEach((segment, index) => {
        segment.classList.toggle("active", index < count);
    });
}

function updateExplanation() {
    const count = getFavourableCount();

    if (explanation) {
        explanation.textContent = explanations[count];
    }

    updateConditionsMeter(count);
}

function updateGif() {
    const favourableCount = getFavourableCount();
    const folder = stageFolders[currentStage];
    const imagePath = `../../assets/simulator/stages/${folder}/${favourableCount}.gif`;

    if (imagePath === previousGifPath) return;

    previousGifPath = imagePath;
    imageRequest++;

    const currentRequest = imageRequest;

    if (imageStage) {
        imageStage.textContent = `STAGE ${String(currentStage + 1).padStart(2, "0")} · ${favourableCount}/4 FAVOURABLE`;
    }

    if (!cycloneImage) return;

    cycloneImage.classList.add("image-changing");

    const newImage = new Image();

    newImage.onload = () => {
        if (currentRequest !== imageRequest) return;

        cycloneImage.src = imagePath;
        cycloneImage.hidden = false;

        if (visualPlaceholder) {
            visualPlaceholder.hidden = true;
        }

        requestAnimationFrame(() => {
            cycloneImage.classList.remove("image-changing");
        });
    };

    newImage.onerror = () => {
        if (currentRequest !== imageRequest) return;

        cycloneImage.classList.remove("image-changing");
        cycloneImage.hidden = true;

        if (visualPlaceholder) {
            visualPlaceholder.hidden = false;
        }
    };

    newImage.src = imagePath;
}

function updateAnalysis(animateChanges = true) {
    updateConditionValues(animateChanges);
    updateExplanation();
    updateGif();
}

function selectStage(stageIndex) {
    if (stageIndex < 0 || stageIndex >= stageNames.length) return;

    if (currentStage === stageIndex && previousGifPath !== "") return;

    currentStage = stageIndex;

    if (currentStageName) {
        currentStageName.textContent = stageNames[currentStage];
        animateElement(currentStageName, "stage-name-change", 350);
    }

    if (stageDescription) {
        stageDescription.textContent = stageDescriptions[currentStage];
        animateElement(stageDescription, "stage-description-change", 350);
    }

    stageButtons.forEach(button => {
        const selected = Number(button.dataset.stage) === currentStage;

        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    updateGif();
}

Object.values(conditions).forEach(condition => {
    condition.slider.addEventListener("input", () => {
        updateAnalysis(true);
    });
});

stageButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectStage(Number(button.dataset.stage));
    });
});

if (resetButton) {
    resetButton.addEventListener("click", () => {
        conditions.temperature.slider.value = 28;
        conditions.moisture.slider.value = 60;
        conditions.windShear.slider.value = 30;
        conditions.instability.slider.value = 65;

        updateAnalysis(true);
    });
};

updateConditionValues(false);
updateExplanation();
selectStage(0);
