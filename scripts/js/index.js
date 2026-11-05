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