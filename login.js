/* =====================================================
   INSITE — LOGIN
===================================================== */

const loginForm = document.getElementById("loginForm");

const passwordInput =
  document.getElementById("loginPassword");

const passwordToggle =
  document.getElementById("passwordToggle");

const rememberMe =
  document.getElementById("rememberMe");

const forgotButton =
  document.getElementById("forgotButton");


/* =====================================================
   LOAD SAVED LOGIN
===================================================== */

const savedEmail =
  localStorage.getItem("insiteLoginEmail");

if (savedEmail) {

  document.getElementById("loginEmail").value =
    savedEmail;

  rememberMe.checked = true;

}


/* =====================================================
   PASSWORD TOGGLE
===================================================== */

passwordToggle.addEventListener(
  "click",
  () => {

    const isPassword =
      passwordInput.type === "password";

    passwordInput.type =
      isPassword
        ? "text"
        : "password";

    passwordToggle.setAttribute(
      "aria-label",
      isPassword
        ? "Ẩn mật khẩu"
        : "Hiện mật khẩu"
    );

  }
);


/* =====================================================
   FORGOT PASSWORD
===================================================== */

forgotButton.addEventListener(
  "click",
  () => {

    alert(
      "Tính năng khôi phục mật khẩu sẽ được bổ sung sau."
    );

  }
);


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const email =
      document.getElementById("loginEmail")
        .value
        .trim();


    if (!email) {
      return;
    }


    /* ====================
       REMEMBER EMAIL
    ==================== */

    if (rememberMe.checked) {

      localStorage.setItem(
        "insiteLoginEmail",
        email
      );

    } else {

      localStorage.removeItem(
        "insiteLoginEmail"
      );

    }


    /* ====================
       LOGIN STATE
    ==================== */

    localStorage.setItem(
      "insiteLoggedIn",
      "true"
    );


    /* ====================
       PROFILE DEFAULT
    ==================== */

    const existingProfile =
      localStorage.getItem("insiteProfile");


    if (!existingProfile) {

      localStorage.setItem(
        "insiteProfile",
        JSON.stringify({
          name: "Bảo Anh",
          email: email,
          avatar: "monki.svg",
          mascot: "Khỉ"
        })
      );

    }


    /* ====================
       NEXT SCREEN
    ==================== */

    window.location.href =
      "personal.html";

  }
);