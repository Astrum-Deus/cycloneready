(async function () {
    const i18n = window.CycloneReadyI18n;
    if (i18n && i18n.ready) await i18n.ready;
    const tr = (key, fallback = "") => i18n ? i18n.t(key, {}, fallback || key) : (fallback || key);
    const onReady = callback => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
        } else {
            callback();
        }
    };

onReady(function () {
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
        nameKey: "js_rakhine_name",
        riskKey: "js_rakhine_risk",
        level: "high",
        descriptionKey: "js_rakhine_desc",
        concerns: [
            ["bi-water", "js_rakhine_concern1"],
            ["bi-wind", "js_rakhine_concern2"],
            ["bi-house-exclamation", "js_rakhine_concern3"]
        ],
        adviceKey: "js_rakhine_advice"
    },
    ayeyarwady: {
        nameKey: "js_ayeyarwady_name",
        riskKey: "js_ayeyarwady_risk",
        level: "high",
        descriptionKey: "js_ayeyarwady_desc",
        concerns: [
            ["bi-water", "js_ayeyarwady_concern1"],
            ["bi-house-exclamation", "js_ayeyarwady_concern2"],
            ["bi-tree", "js_ayeyarwady_concern3"]
        ],
        adviceKey: "js_ayeyarwady_advice"
    },
    yangon: {
        nameKey: "js_yangon_name",
        riskKey: "js_yangon_risk",
        level: "moderate",
        descriptionKey: "js_yangon_desc",
        concerns: [
            ["bi-water", "js_yangon_concern1"],
            ["bi-building", "js_yangon_concern2"],
            ["bi-exclamation-triangle", "js_yangon_concern3"]
        ],
        adviceKey: "js_yangon_advice"
    },
    tanintharyi: {
        nameKey: "js_tanintharyi_name",
        riskKey: "js_tanintharyi_risk",
        level: "moderate",
        descriptionKey: "js_tanintharyi_desc",
        concerns: [
            ["bi-water", "js_tanintharyi_concern1"],
            ["bi-wind", "js_tanintharyi_concern2"],
            ["bi-water", "js_tanintharyi_concern3"]
        ],
        adviceKey: "js_tanintharyi_advice"
    }
};

function setTextKey(element, key, fallback = "") {
    if (!element) return;
    element.setAttribute("data-i18n-key", key);
    if (fallback) element.setAttribute("data-i18n-fallback", fallback);
    element.textContent = tr(key, fallback);
}

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

        setTextKey(document.getElementById("regionalName"), information.nameKey);
        setTextKey(document.getElementById("regionalRisk"), information.riskKey);
        document.getElementById("regionalRisk").className = "regional-risk-badge " + information.level;
        setTextKey(document.getElementById("regionalDescription"), information.descriptionKey);
        setTextKey(document.getElementById("regionalAdvice"), information.adviceKey);

        const concernsContainer = document.getElementById("regionalConcerns");

        concernsContainer.innerHTML = "";

        information.concerns.forEach(concern => {
            const item = document.createElement("li");

            const icon = document.createElement("i");
            icon.className = "bi " + concern[0];

            const text = document.createElement("span");
            text.setAttribute("data-i18n-key", concern[1]);
            text.textContent = tr(concern[1]);

            item.appendChild(icon);
            item.appendChild(text);

            concernsContainer.appendChild(item);
        });
    });
});

})();
