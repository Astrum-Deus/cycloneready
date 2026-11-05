
document.addEventListener("DOMContentLoaded", function () {

    const nightModeSwitch = document.getElementById("nightModeSwitch");

    const settingsForm = document.getElementById("settingsForm");
    const newsletterForm = document.getElementById("newsletterForm");
    const footerSearchForm = document.getElementById("footerSearchForm");


    function changeNightMode(isNight) {

        document.body.classList.toggle("night-mode", isNight);
        document.body.classList.toggle("dark-mode", isNight);
        document.documentElement.classList.toggle("night-mode", isNight);

        localStorage.setItem("nightMode", isNight);

        if (nightModeSwitch) {
            nightModeSwitch.checked = isNight;
        }

    }


    function loadNightMode() {

        let savedMode = localStorage.getItem("nightMode");

        let isNight = savedMode === "true";

        changeNightMode(isNight);

    }


    if (nightModeSwitch) {

        nightModeSwitch.addEventListener("change", function () {

            changeNightMode(nightModeSwitch.checked);

        });

    }


    if (settingsForm) {

        settingsForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (nightModeSwitch) {
                changeNightMode(nightModeSwitch.checked);
            }

        });

    }


    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Thank you for subscribing to CycloneReady updates!");

            newsletterForm.reset();

        });

    }


    if (footerSearchForm) {

        footerSearchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            let searchBox = footerSearchForm.querySelector("input");
            let searchText = searchBox.value.trim();

            if (searchText !== "") {

                alert("Searching for: " + searchText);

            }

        });

    }


    loadNightMode();

});
