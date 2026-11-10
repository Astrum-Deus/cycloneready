document.addEventListener("DOMContentLoaded", function () {

    const nightModeSwitch = document.getElementById("nightModeSwitch");

    if (nightModeSwitch) {
        const savedNightMode = localStorage.getItem("nightMode") === "true";

        document.body.classList.toggle("night-mode", savedNightMode);
        document.body.classList.toggle("dark-mode", savedNightMode);

        nightModeSwitch.checked = savedNightMode;
    }

    const settingsForm = document.getElementById("settingsForm");

    if (settingsForm) {
        settingsForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (nightModeSwitch) {
                const enabled = nightModeSwitch.checked;

                document.body.classList.toggle("night-mode", enabled);
                document.body.classList.toggle("dark-mode", enabled);

                localStorage.setItem("nightMode", enabled);
            }

            const settingsModal = document.getElementById("settingsModal");

            if (settingsModal && window.bootstrap) {
                bootstrap.Modal.getOrCreateInstance(settingsModal).hide();
            }
        });
    }

    function showMessage(element, message, type) {
        if (!element) return;

        element.textContent = message;
        element.className = "alert alert-" + type;
    }

    function clearMessage(element) {
        if (!element) return;

        element.textContent = "";
        element.className = "alert d-none";
    }

    document.querySelectorAll("[data-toggle-password]").forEach(function (button) {
        button.addEventListener("click", function () {
            const inputId = button.getAttribute("data-toggle-password");
            const passwordInput = document.getElementById(inputId);
            const icon = button.querySelector("i");

            if (!passwordInput) return;

            const isHidden = passwordInput.type === "password";

            passwordInput.type = isHidden ? "text" : "password";

            if (icon) {
                icon.className = isHidden ? "bi bi-eye-slash" : "bi bi-eye";
            }

            button.setAttribute(
                "aria-label",
                isHidden ? "Hide password" : "Show password"
            );
        });
    });

    const accountsKey = "cycloneReadyAccounts";

    function getAccounts() {
        try {
            return JSON.parse(localStorage.getItem(accountsKey)) || [];
        } catch (error) {
            return [];
        }
    }

    async function hashPassword(password) {
        if (!window.crypto || !window.crypto.subtle) {
            throw new Error("Password hashing is unavailable in this browser.");
        }

        const encodedPassword = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);

        const hashArray = Array.from(new Uint8Array(hashBuffer));

        return hashArray.map(function (byte) {
            return byte.toString(16).padStart(2, "0");
        }).join("");
    }

    const signinForm = document.getElementById("signinForm");
    const signinMessage = document.getElementById("signinMessage");

    if (signinForm) {
        signinForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            clearMessage(signinMessage);

            signinForm.classList.add("was-validated");

            if (!signinForm.checkValidity()) {
                signinForm.reportValidity();
                return;
            }

            const email = document.getElementById("signinEmail").value.trim().toLowerCase();
            const password = document.getElementById("signinPassword").value;
            const rememberMe = document.getElementById("rememberMe").checked;

            const accounts = getAccounts();

            const account = accounts.find(function (savedAccount) {
                return savedAccount.email === email;
            });

            if (!account) {
                showMessage(signinMessage, "No account was found with that email address.", "danger");
                return;
            }

            try {
                const passwordHash = await hashPassword(password);

                if (passwordHash !== account.passwordHash) {
                    showMessage(signinMessage, "Incorrect password. Please try again.", "danger");
                    return;
                }

                const userSession = {
                    name: account.name,
                    username: account.username,
                    email: account.email
                };

                if (rememberMe) {
                    localStorage.setItem("cycloneReadyCurrentUser", JSON.stringify(userSession));
                    sessionStorage.removeItem("cycloneReadyCurrentUser");
                } else {
                    sessionStorage.setItem("cycloneReadyCurrentUser", JSON.stringify(userSession));
                    localStorage.removeItem("cycloneReadyCurrentUser");
                }

                showMessage(signinMessage, "Welcome back, " + account.name + "! You have successfully signed in.", "success");

            } catch (error) {
                showMessage(signinMessage, "Something went wrong while checking your password. Please try again.", "danger");
            }
        });

        signinForm.addEventListener("input", function () {
            clearMessage(signinMessage);
        });
    }

    const signupForm = document.getElementById("signupForm");
    const signupMessage = document.getElementById("signupMessage");

    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const passwordLength = document.getElementById("passwordLength");
    const passwordUpper = document.getElementById("passwordUpper");
    const passwordLower = document.getElementById("passwordLower");
    const passwordNumber = document.getElementById("passwordNumber");

    function updateRequirement(element, passed) {
        if (!element) return;

        element.classList.toggle("text-success", passed);
        element.classList.toggle("text-danger", !passed);

        const icon = element.querySelector("i");

        if (icon) {
            icon.className = passed
                ? "bi bi-check-circle-fill me-1"
                : "bi bi-x-circle me-1";
        }
    }

    function updatePasswordRequirements() {
        if (!signupPassword) return;

        const password = signupPassword.value;

        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        updateRequirement(passwordLength, hasLength);
        updateRequirement(passwordUpper, hasUpper);
        updateRequirement(passwordLower, hasLower);
        updateRequirement(passwordNumber, hasNumber);

        const passwordIsValid = hasLength && hasUpper && hasLower && hasNumber;

        signupPassword.setCustomValidity(
            passwordIsValid ? "" : "Your password does not meet all requirements."
        );

        updatePasswordConfirmation();
    }

    function updatePasswordConfirmation() {
        if (!signupPassword || !confirmPassword) return;

        if (confirmPassword.value === "") {
            confirmPassword.setCustomValidity("");
            return;
        }

        confirmPassword.setCustomValidity(
            signupPassword.value === confirmPassword.value
                ? ""
                : "Passwords do not match."
        );
    }

    if (signupPassword) {
        signupPassword.addEventListener("input", function () {
            updatePasswordRequirements();
            clearMessage(signupMessage);
        });
    }

    if (confirmPassword) {
        confirmPassword.addEventListener("input", function () {
            updatePasswordConfirmation();
            clearMessage(signupMessage);
        });
    }

    updatePasswordRequirements();

    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            clearMessage(signupMessage);

            updatePasswordRequirements();
            updatePasswordConfirmation();

            signupForm.classList.add("was-validated");

            if (!signupForm.checkValidity()) {
                signupForm.reportValidity();
                return;
            }

            const name = document.getElementById("signupName").value.trim();
            const username = document.getElementById("signupUsername").value.trim();
            const email = document.getElementById("signupEmail").value.trim().toLowerCase();

            const password = signupPassword.value;
            const newsletter = document.getElementById("newsletterOptIn").checked;

            const accounts = getAccounts();

            const usernameExists = accounts.some(function (account) {
                return account.username.toLowerCase() === username.toLowerCase();
            });

            const emailExists = accounts.some(function (account) {
                return account.email.toLowerCase() === email;
            });

            if (usernameExists) {
                showMessage(signupMessage, "That username is already taken. Please choose another one.", "danger");
                return;
            }

            if (emailExists) {
                showMessage(signupMessage, "An account with that email address already exists.", "danger");
                return;
            }

            try {
                const passwordHash = await hashPassword(password);

                const newAccount = {
                    name: name,
                    username: username,
                    email: email,
                    passwordHash: passwordHash,
                    newsletter: newsletter,
                    createdAt: new Date().toISOString()
                };

                accounts.push(newAccount);

                localStorage.setItem(accountsKey, JSON.stringify(accounts));

                showMessage(signupMessage, "Account created successfully! You can now sign in.", "success");

                const registeredEmail = email;

                signupForm.reset();
                signupForm.classList.remove("was-validated");

                updatePasswordRequirements();

                document.getElementById("signinEmail").value = registeredEmail;

                const signinTab = document.getElementById("signin-tab");

                if (signinTab && window.bootstrap) {
                    bootstrap.Tab.getOrCreateInstance(signinTab).show();
                }

                clearMessage(signinMessage);

            } catch (error) {
                showMessage(signupMessage, "Your account could not be saved. Please check that browser storage is available and try again.", "danger");
            }
        });

        signupForm.addEventListener("input", function () {
            clearMessage(signupMessage);
        });

        signupForm.addEventListener("change", function () {
            clearMessage(signupMessage);
        });
    }

    const signinTab = document.getElementById("signin-tab");
    const signupTab = document.getElementById("signup-tab");

    if (signinTab) {
        signinTab.addEventListener("shown.bs.tab", function () {
            clearMessage(signinMessage);
        });
    }

    if (signupTab) {
        signupTab.addEventListener("shown.bs.tab", function () {
            clearMessage(signupMessage);
        });
    }

    const newsletterForm = document.getElementById("newsletterForm");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            newsletterForm.classList.add("was-validated");

            if (!newsletterForm.checkValidity()) {
                newsletterForm.reportValidity();
                return;
            }

            alert("Thank you for your interest! Newsletter subscriptions are not connected yet.");

            newsletterForm.reset();
            newsletterForm.classList.remove("was-validated");
        });
    }


});