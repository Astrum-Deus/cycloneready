document.addEventListener("DOMContentLoaded", () => {
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
                console.error("Failed to parse saved checklist progress", e);
            }
        }
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
                progressMessage.textContent = "Everything is checked! Remember to keep your supplies ready.";
            } else if (percentage >= 75) {
                progressMessage.textContent = "Almost there! Review the remaining tasks.";
            } else if (percentage >= 40) {
                progressMessage.textContent = "Good progress! Keep preparing.";
            } else if (percentage > 0) {
                progressMessage.textContent = "Good start! Continue working through the checklist.";
            } else {
                progressMessage.textContent = "Start with the preparations you can do now.";
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