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

onReady(() => {
    const checklistItems = document.querySelectorAll("[data-task]");

    const completedCount = document.getElementById("completedCount");
    const totalCount = document.getElementById("totalCount");
    const progressPercent = document.getElementById("progressPercent");
    const progressFill = document.getElementById("progressFill");
    const progressTrack = document.getElementById("progressTrack");
    const progressMessage = document.getElementById("progressMessage");

    const storageName = "cycloneReadyChecklist";

    function saveProgress() {
        let savedItems = {};
        checklistItems.forEach(item => {
            savedItems[item.dataset.task] = item.checked;
        });
        localStorage.setItem(storageName, JSON.stringify(savedItems));
    }

    function loadProgress() {
        let savedItems = localStorage.getItem(storageName);
        if (savedItems) {
            try {
                savedItems = JSON.parse(savedItems);
                checklistItems.forEach(item => {
                    if (savedItems[item.dataset.task] !== undefined) {
                        item.checked = savedItems[item.dataset.task];
                    }
                });
            } catch (e) {
                console.error(tr("error_saved_progress", "Failed to parse saved checklist progress"), e);
            }
        }
    }

    function setProgressMessage(key, fallback) {
        if (!progressMessage) return;
        progressMessage.setAttribute("data-i18n-key", key);
        progressMessage.setAttribute("data-i18n-fallback", fallback);
        progressMessage.textContent = tr(key, fallback);
    }

    function updateProgress() {
        let completed = 0;
        let total = checklistItems.length;

        checklistItems.forEach(item => {
            if (item.checked) {
                completed++;
            }
        });

        let percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        if (completedCount) completedCount.textContent = completed;
        if (totalCount) totalCount.textContent = total;
        if (progressPercent) progressPercent.textContent = percentage + "%";

        if (progressFill) progressFill.style.width = percentage + "%";
        if (progressTrack) progressTrack.setAttribute("aria-valuenow", percentage);

        if (progressMessage) {
            if (percentage === 100) {
                setProgressMessage("progress_100", "Everything is checked! Remember to keep your supplies ready.");
            } else if (percentage >= 75) {
                setProgressMessage("progress_75", "Almost there! Review the remaining tasks.");
            } else if (percentage >= 40) {
                setProgressMessage("progress_40", "Good progress! Keep preparing.");
            } else if (percentage > 0) {
                setProgressMessage("progress_partial", "Good start! Continue working through the checklist.");
            } else {
                setProgressMessage("progress_0", "Start with the preparations you can do now.");
            }
        }

        saveProgress();
    }

    checklistItems.forEach(item => {
        item.addEventListener("change", updateProgress);
    });

    loadProgress();
    updateProgress();
});
})();
