 const timelineTabs = document.querySelectorAll(".history-tab");
        const timelineDots = document.querySelectorAll(".timeline-dot");

        timelineTabs.forEach((tab, index) => {
            tab.addEventListener("shown.bs.tab", function () {
                timelineDots.forEach(dot => dot.classList.remove("active-dot"));
                timelineDots[index].classList.add("active-dot");
            });
        });