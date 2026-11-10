const stages = [
    {
        name: "Tropical Disturbance",
        image: "../../assets/simulator/disturbance.gif",
        description: "A tropical disturbance is an area of unsettled weather with developing thunderstorms. It does not yet have a well-organized circulation."
    },
    {
        name: "Tropical Depression",
        image: "../../assets/simulator/depression.gif",
        description: "A tropical depression forms when thunderstorms begin organizing around a low-pressure centre. Winds start circulating around the system."
    },
    {
        name: "Tropical Storm",
        image: "../../assets/simulator/tropical-storm.gif",
        description: "The system becomes more organized, with stronger winds and a clearer circulation. It is now classified as a tropical storm."
    },
    {
        name: "Severe Tropical Storm",
        image: "../../assets/simulator/severe-storm.gif",
        description: "The storm continues strengthening, with powerful winds and organized thunderstorms surrounding its centre."
    },
    {
        name: "Mature Cyclone",
        image: "../../assets/simulator/mature-cyclone.gif",
        description: "A mature tropical cyclone has a well-developed circulation. It may have a visible eye surrounded by intense thunderstorms."
    }
];

let currentStage = 0;

const stageButtons = document.querySelectorAll(".stage-button");
const cycloneImage = document.getElementById("cycloneImage");
const visualPlaceholder = document.getElementById("visualPlaceholder");

const currentStageName = document.getElementById("currentStageName");
const stageDescription = document.getElementById("stageDescription");
const imageStage = document.getElementById("imageStage");

const temperature = document.getElementById("temperature");
const moisture = document.getElementById("moisture");
const windShear = document.getElementById("windShear");
const instability = document.getElementById("instability");

const temperatureValue = document.getElementById("temperatureValue");
const moistureValue = document.getElementById("moistureValue");
const windShearValue = document.getElementById("windShearValue");
const instabilityValue = document.getElementById("instabilityValue");

const temperatureStatus = document.getElementById("temperatureStatus");
const moistureStatus = document.getElementById("moistureStatus");
const windShearStatus = document.getElementById("windShearStatus");
const instabilityStatus = document.getElementById("instabilityStatus");

const temperatureAnalysis = document.getElementById("temperatureAnalysis");
const moistureAnalysis = document.getElementById("moistureAnalysis");
const windShearAnalysis = document.getElementById("windShearAnalysis");
const instabilityAnalysis = document.getElementById("instabilityAnalysis");

const explanation = document.getElementById("explanation");
const resetButton = document.getElementById("resetButton");

const visualTemperatureBar = document.getElementById("visualTemperatureBar");
const visualMoistureBar = document.getElementById("visualMoistureBar");
const visualWindShearBar = document.getElementById("visualWindShearBar");
const visualInstabilityBar = document.getElementById("visualInstabilityBar");

const visualTemperatureStatus = document.getElementById("visualTemperatureStatus");
const visualMoistureStatus = document.getElementById("visualMoistureStatus");
const visualWindShearStatus = document.getElementById("visualWindShearStatus");
const visualInstabilityStatus = document.getElementById("visualInstabilityStatus");

function selectStage(index) {
    if (index < 0 || index >= stages.length) {
        return;
    }

    currentStage = index;

    stageButtons.forEach(button => {
        button.classList.remove("active");
    });

    stageButtons[index].classList.add("active");

    currentStageName.textContent = stages[index].name;
    stageDescription.textContent = stages[index].description;
    imageStage.textContent = stages[index].name.toUpperCase();

    visualPlaceholder.style.display = "flex";
    cycloneImage.hidden = true;

    cycloneImage.onload = function () {
        visualPlaceholder.style.display = "none";
        cycloneImage.hidden = false;
    };

    cycloneImage.onerror = function () {
        cycloneImage.hidden = true;
        visualPlaceholder.style.display = "flex";
        console.log("Could not load image:", stages[index].image);
    };

    cycloneImage.src = stages[index].image;
}

stageButtons.forEach(button => {
    button.addEventListener("click", function () {
        let stageIndex = Number(this.dataset.stage);
        selectStage(stageIndex);
    });
});

function setAnalysis(statusElement, textElement, status, message) {
    statusElement.textContent = status;
    statusElement.className = "analysis-status " + status.toLowerCase().replaceAll(" ", "-");
    textElement.textContent = message;
}

function updateAnalysis() {
    let temp = Number(temperature.value);
    let moistureAmount = Number(moisture.value);
    let shear = Number(windShear.value);
    let unstable = Number(instability.value);

    let favourableCount = 0;

    if (temp >= 26.5) {
        setAnalysis(
            temperatureStatus,
            temperatureAnalysis,
            "Favourable",
            "The sea is warm enough to provide heat and moisture that can support cyclone development."
        );
        favourableCount++;
    } else {
        setAnalysis(
            temperatureStatus,
            temperatureAnalysis,
            "Unfavourable",
            "The sea is relatively cool. This means there may be less heat and moisture available to fuel the developing system."
        );
    }

    if (moistureAmount >= 60) {
        setAnalysis(
            moistureStatus,
            moistureAnalysis,
            "Favourable",
            "There is a high amount of atmospheric moisture. This supports cloud formation and developing thunderstorms."
        );
        favourableCount++;
    } else {
        setAnalysis(
            moistureStatus,
            moistureAnalysis,
            "Unfavourable",
            "The air is relatively dry. This can make it harder for thunderstorms to develop and remain active."
        );
    }

    if (shear < 50) {
        setAnalysis(
            windShearStatus,
            windShearAnalysis,
            "Favourable",
            "Wind shear is relatively weak. This allows the storm to stay more organized instead of having its structure disrupted."
        );
        favourableCount++;
    } else {
        setAnalysis(
            windShearStatus,
            windShearAnalysis,
            "Unfavourable",
            "Strong wind shear can push the storm's clouds away from its centre and disrupt its organization."
        );
    }

    if (unstable >= 60) {
        setAnalysis(
            instabilityStatus,
            instabilityAnalysis,
            "Favourable",
            "The atmosphere is unstable, encouraging warm air to rise and helping thunderstorms develop."
        );
        favourableCount++;
    } else {
        setAnalysis(
            instabilityStatus,
            instabilityAnalysis,
            "Unfavourable",
            "The atmosphere is relatively stable, meaning there may be less rising air to support thunderstorm development."
        );
    }

    if (favourableCount === 4) {
        explanation.textContent = "Most of the selected environmental conditions are favourable for cyclone development. Warm water, moist air, weak wind shear and atmospheric instability can all help a tropical system organize and strengthen.";
    } else if (favourableCount >= 2) {
        explanation.textContent = "The selected conditions are mixed. Some factors can support cyclone development, while others may make it more difficult for the system to organize or strengthen.";
    } else {
        explanation.textContent = "Most of the selected conditions are unfavourable for cyclone development. The system may have difficulty organizing and strengthening under these conditions.";
    }
}

function updateVisualConditions() {
    let temp = Number(temperature.value);
    let moistureAmount = Number(moisture.value);
    let shear = Number(windShear.value);
    let unstable = Number(instability.value);

    function updateIndicator(bar, status, value, message, favourable) {
        bar.style.width = Math.max(0, Math.min(100, value)) + "%";
        bar.classList.toggle("unfavourable", !favourable);
        status.textContent = message;
    }

    updateIndicator(
        visualTemperatureBar,
        visualTemperatureStatus,
        ((temp - 24) / 8) * 100,
        temp >= 26.5 ? "Warm enough" : "Relatively cool",
        temp >= 26.5
    );

    updateIndicator(
        visualMoistureBar,
        visualMoistureStatus,
        moistureAmount,
        moistureAmount >= 60 ? "Moist air" : "Relatively dry",
        moistureAmount >= 60
    );

    updateIndicator(
        visualWindShearBar,
        visualWindShearStatus,
        shear,
        shear < 50 ? "Weak wind shear" : "Strong wind shear",
        shear < 50
    );

    updateIndicator(
        visualInstabilityBar,
        visualInstabilityStatus,
        unstable,
        unstable >= 60 ? "High instability" : "Low instability",
        unstable >= 60
    );
}

function updateValues() {
    temperatureValue.textContent = temperature.value;
    moistureValue.textContent = moisture.value;
    windShearValue.textContent = windShear.value;
    instabilityValue.textContent = instability.value;

    updateAnalysis();
    updateVisualConditions();
}

temperature.addEventListener("input", updateValues);
moisture.addEventListener("input", updateValues);
windShear.addEventListener("input", updateValues);
instability.addEventListener("input", updateValues);

resetButton.addEventListener("click", function () {
    temperature.value = 28;
    moisture.value = 60;
    windShear.value = 30;
    instability.value = 65;

    updateValues();
    selectStage(0);
});

updateValues();
selectStage(currentStage);