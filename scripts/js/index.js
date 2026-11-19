document.addEventListener("DOMContentLoaded", function () {
    const counter = document.querySelectorAll('.counter');

    counter.forEach(myCounter);

    function myCounter(cValue) {
        let dataCeil = Number(cValue.getAttribute("data-ceil"));
        let decimals = Number(cValue.getAttribute("data-decimals")) || 0;
        let suffix = cValue.getAttribute("data-suffix") || "";

        let duration = 2000;
        let startTime = null;

        function incrementCounter(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }

            let progress = Math.min((timestamp - startTime) / duration, 1);
            let currentNum = progress * dataCeil;

            cValue.innerText = currentNum.toFixed(decimals) + suffix;

            if (progress < 1) {
                requestAnimationFrame(incrementCounter);
            } else {
                cValue.innerText = dataCeil.toFixed(decimals) + suffix;
            }
        }

        requestAnimationFrame(incrementCounter);
    }
});

const regionalInformation = {
    rakhine: {
        name: "Rakhine State",
        risk: "HIGH COASTAL EXPOSURE",
        level: "high",
        description: "Rakhine's long coastline along the Bay of Bengal exposes coastal communities to strong winds, storm surges and heavy rainfall during cyclones.",
        concerns: [
            ["bi-water", "Coastal flooding and storm surges"],
            ["bi-wind", "Strong winds and heavy rainfall"],
            ["bi-house-exclamation", "Damage to coastal homes and infrastructure"]
        ],
        advice: "Coastal communities should pay close attention to official cyclone warnings and evacuation instructions."
    },
    ayeyarwady: {
        name: "Ayeyarwady Region",
        risk: "VERY HIGH DELTA EXPOSURE",
        level: "high",
        description: "The low-lying Ayeyarwady Delta is particularly vulnerable to storm surges, flooding and heavy rainfall. Many communities depend on agriculture and fishing.",
        concerns: [
            ["bi-water", "Storm surges and widespread flooding"],
            ["bi-house-exclamation", "Flooding of low-lying settlements"],
            ["bi-tree", "Damage to agricultural land and livelihoods"]
        ],
        advice: "Residents in low-lying delta communities should identify safe shelters and know their evacuation routes before a cyclone arrives."
    },
    yangon: {
        name: "Yangon Region",
        risk: "HIGH POPULATION EXPOSURE",
        level: "moderate",
        description: "Yangon's large urban population and low-lying areas make flooding and infrastructure disruption important concerns during severe storms.",
        concerns: [
            ["bi-water", "Urban and river-related flooding"],
            ["bi-building", "Damage to buildings and infrastructure"],
            ["bi-exclamation-triangle", "Disruption to transport and essential services"]
        ],
        advice: "Residents should avoid flooded roads, follow local warnings and prepare for possible disruptions to electricity and transport."
    },
    tanintharyi: {
        name: "Tanintharyi Region",
        risk: "COASTAL EXPOSURE",
        level: "moderate",
        description: "Tanintharyi's long coastline and scattered coastal settlements can experience rough seas, heavy rainfall and strong winds during tropical storms.",
        concerns: [
            ["bi-water", "Rough seas and dangerous coastal conditions"],
            ["bi-wind", "Strong winds and heavy rainfall"],
            ["bi-water", "Flooding in low-lying communities"]
        ],
        advice: "Fishing communities should pay attention to marine weather warnings and avoid going out to sea when conditions become dangerous."
    }
};

const regionalMarkers = document.querySelectorAll(".regional-marker");

regionalMarkers.forEach(marker => {
    marker.addEventListener("click", function () {
        const region = this.dataset.region;
        const information = regionalInformation[region];

        if (!information) {
            return;
        }

        regionalMarkers.forEach(button => {
            button.classList.remove("active");
            button.setAttribute("aria-pressed", "false");
        });

        this.classList.add("active");
        this.setAttribute("aria-pressed", "true");

        document.getElementById("regionalName").textContent = information.name;
        document.getElementById("regionalRisk").textContent = information.risk;
        document.getElementById("regionalRisk").className = "regional-risk-badge " + information.level;
        document.getElementById("regionalDescription").textContent = information.description;
        document.getElementById("regionalAdvice").textContent = information.advice;

        const concernsContainer = document.getElementById("regionalConcerns");

        concernsContainer.innerHTML = "";

        information.concerns.forEach(concern => {
            const item = document.createElement("li");

            const icon = document.createElement("i");
            icon.className = "bi " + concern[0];

            const text = document.createElement("span");
            text.textContent = concern[1];

            item.appendChild(icon);
            item.appendChild(text);

            concernsContainer.appendChild(item);
        });
    });
});
