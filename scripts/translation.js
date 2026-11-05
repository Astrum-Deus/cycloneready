
document.addEventListener("DOMContentLoaded", function () {

    let templateTranslations = {};
    let pageTranslations = {};

    const languageSelect = document.getElementById("languageSelect");

    const languageScript = document.querySelector('script[src$="translation.js"]');

    const translationFolder = new URL("translations/", languageScript.src);

    const pageName = document.body.dataset.page;


    function setText(element, text) {

        if (element.children.length === 0) {
            element.textContent = text;
            return;
        }

        for (let node of element.childNodes) {

            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
                node.textContent = text;
                return;
            }

        }

        let label = element.querySelector(":scope > span");

        if (label) {
            label.textContent = text;
        }

    }


    async function loadJSON(filePath) {

        try {

            let response = await fetch(filePath);

            if (!response.ok) {
                throw new Error("Could not load translation file.");
            }

            return await response.json();

        } catch (error) {

            console.log(error);
            return {};

        }

    }


    async function loadTranslations() {

        templateTranslations = await loadJSON(
            new URL("template.json", translationFolder)
        );

        if (pageName) {

            pageTranslations = await loadJSON(
                new URL(pageName + ".json", translationFolder)
            );

        }

        let savedLanguage = localStorage.getItem("language") || "en";

        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }

        changeLanguage(savedLanguage);

    }


    function changeLanguage(language) {

        let englishWords = {
            ...templateTranslations.en,
            ...pageTranslations.en
        };

        let selectedWords = {
            ...templateTranslations[language],
            ...pageTranslations[language]
        };


        if (pageTranslations[language] === undefined || pageTranslations[language].page_title === undefined) {
            delete selectedWords.page_title;
        }

        if (pageTranslations.en === undefined || pageTranslations.en.page_title === undefined) {
            delete englishWords.page_title;
        }


        function getWord(key) {

            if (selectedWords[key] !== undefined) {
                return selectedWords[key];
            }

            if (englishWords[key] !== undefined) {
                return englishWords[key];
            }

            return null;

        }


        document.querySelectorAll("[data-translate]").forEach(function (element) {

            let key = element.getAttribute("data-translate");
            let translation = getWord(key);

            if (translation !== null) {
                setText(element, translation);
            }

        });


        document.querySelectorAll("[data-translate-placeholder]").forEach(function (element) {

            let key = element.getAttribute("data-translate-placeholder");
            let translation = getWord(key);

            if (translation !== null) {
                element.placeholder = translation;
            }

        });


        document.querySelectorAll("[data-translate-title]").forEach(function (element) {

            let key = element.getAttribute("data-translate-title");
            let translation = getWord(key);

            if (translation !== null) {
                element.title = translation;
            }

        });


        document.querySelectorAll("[data-translate-aria]").forEach(function (element) {

            let key = element.getAttribute("data-translate-aria");
            let translation = getWord(key);

            if (translation !== null) {
                element.setAttribute("aria-label", translation);
            }

        });


        document.querySelectorAll("[data-translate-alt]").forEach(function (element) {

            let key = element.getAttribute("data-translate-alt");
            let translation = getWord(key);

            if (translation !== null) {
                element.alt = translation;
            }

        });


        let pageTitle = getWord("page_title");

        if (pageTitle !== null) {
            document.title = pageTitle;
        }


        document.documentElement.lang = language;

        if (language === "my") {
            document.body.classList.add("burmese");
        } else {
            document.body.classList.remove("burmese");
        }

        localStorage.setItem("language", language);

    }


    if (languageSelect) {

        languageSelect.addEventListener("change", function () {

            changeLanguage(languageSelect.value);

        });

    }


    loadTranslations();

});
