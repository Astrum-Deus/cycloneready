(async function () {
    const i18n = window.CycloneReadyI18n;
    if (i18n && i18n.ready) await i18n.ready;
    const tr = (key, fallback = "") => i18n ? i18n.t(key, {}, fallback || key) : (fallback || key);

const stageNameKeys = [
    "js_stage_disturbance",
    "js_stage_depression",
    "js_stage_storm",
    "js_stage_severe",
    "js_stage_mature"
];

const stageFolders = [
    "disturbance",
    "depression",
    "tropical-storm",
    "severe-storm",
    "mature-cyclone"
];

const stageDescriptionKeys = [
    "js_stage_desc_1",
    "js_stage_desc_2",
    "js_stage_desc_3",
    "js_stage_desc_4",
    "js_stage_desc_5"
];

const conditions = {
    temperature: {
        slider: document.getElementById("temperature"),
        value: document.getElementById("temperatureValue"),
        status: document.getElementById("temperatureStatus"),
        analysis: document.getElementById("temperatureAnalysis"),
        favourable: value => value >= 26.5,
        format: value => `${value}°C`,
        goodKey: "js_temp_good",
        badKey: "js_temp_bad"
    },
    moisture: {
        slider: document.getElementById("moisture"),
        value: document.getElementById("moistureValue"),
        status: document.getElementById("moistureStatus"),
        analysis: document.getElementById("moistureAnalysis"),
        favourable: value => value >= 60,
        format: value => `${value}%`,
        goodKey: "js_moist_good",
        badKey: "js_moist_bad"
    },
    windShear: {
        slider: document.getElementById("windShear"),
        value: document.getElementById("windShearValue"),
        status: document.getElementById("windShearStatus"),
        analysis: document.getElementById("windShearAnalysis"),
        favourable: value => value < 50,
        format: value => `${value}%`,
        goodKey: "js_wind_good",
        badKey: "js_wind_bad"
    },
    instability: {
        slider: document.getElementById("instability"),
        value: document.getElementById("instabilityValue"),
        status: document.getElementById("instabilityStatus"),
        analysis: document.getElementById("instabilityAnalysis"),
        favourable: value => value >= 60,
        format: value => `${value}%`,
        goodKey: "js_instability_good",
        badKey: "js_instability_bad"
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

const explanationKeys = [
    "js_explanation_0",
    "js_explanation_1",
    "js_explanation_2",
    "js_explanation_3",
    "js_explanation_4"
];

function setTextKey(element, key, fallback = "") {
    if (!element) return;
    element.setAttribute("data-i18n-key", key);
    if (fallback) element.setAttribute("data-i18n-fallback", fallback);
    element.textContent = tr(key, fallback);
}

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

        setTextKey(condition.status, isFavourable ? "favourable" : "unfavourable", isFavourable ? "Favourable" : "Unfavourable");
        condition.status.classList.toggle("less-favourable", !isFavourable);

        setTextKey(condition.analysis, isFavourable ? condition.goodKey : condition.badKey);

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
        meterLabel.innerHTML = `<span data-i18n-key="js_favourable_conditions">${tr("js_favourable_conditions", "Favourable conditions")}</span><span id="favourableCount"></span>`;
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
        setTextKey(explanation, explanationKeys[count]);
    }

    updateConditionsMeter(count);
}


function updateGif() {
    const favourableCount = getFavourableCount();
    const folder = stageFolders[currentStage];
    const basePath = `../../assets/simulator/${folder}/${favourableCount}`;

    if (basePath === previousGifPath) return;

    previousGifPath = basePath;
    imageRequest++;

    const currentRequest = imageRequest;

    if (imageStage) {
        const stageLabel = String(currentStage + 1).padStart(2, "0");
        const fallbackStageLabel = `STAGE ${stageLabel} · ${favourableCount}/4 FAVOURABLE`;
        if (window.CycloneReadyI18n) {
            window.CycloneReadyI18n.bind(imageStage, "js_stage_meter", {
                params: { stage: stageLabel, count: favourableCount },
                fallback: "STAGE {stage} · {count}/4 FAVOURABLE"
            });
        } else {
            imageStage.textContent = fallbackStageLabel;
        }
    }

    if (!cycloneImage) return;

    cycloneImage.classList.add("image-changing");

    const extensions = [".gif", ".jpg", ".jpeg", ".png"];
    let extensionIndex = 0;

    function tryNextImage() {
        if (currentRequest !== imageRequest) return;

        if (extensionIndex >= extensions.length) {
            cycloneImage.classList.remove("image-changing");
            cycloneImage.hidden = true;

            if (visualPlaceholder) {
                visualPlaceholder.hidden = false;
            }

            return;
        }

        const imagePath = basePath + extensions[extensionIndex];
        extensionIndex++;

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
            tryNextImage();
        };

        newImage.src = imagePath;
    }

    tryNextImage();
}


function updateAnalysis(animateChanges = true) {
    updateConditionValues(animateChanges);
    updateExplanation();
    updateGif();
}

function selectStage(stageIndex) {
    if (stageIndex < 0 || stageIndex >= stageNameKeys.length) return;

    if (currentStage === stageIndex && previousGifPath !== "") return;

    currentStage = stageIndex;

    if (currentStageName) {
        setTextKey(currentStageName, stageNameKeys[currentStage]);
        animateElement(currentStageName, "stage-name-change", 350);
    }

    if (stageDescription) {
        setTextKey(stageDescription, stageDescriptionKeys[currentStage]);
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
}

updateConditionValues(false);
updateExplanation();
selectStage(0);
})();
