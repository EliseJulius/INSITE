/* =====================================================
   INSITE — PERSONAL
===================================================== */


/* =====================================================
   MASCOT DATA
===================================================== */

const mascots = [

  {
    name: "Monki",
    image: "monki.svg"
  },

  {
    name: "Monka",
    image: "monka.svg"
  }

];


let currentMascot = 0;


/* =====================================================
   ELEMENTS
===================================================== */

const mascotImage =
  document.getElementById("mascotImage");

const mascotName =
  document.getElementById("mascotName");

const mascotPrev =
  document.getElementById("mascotPrev");

const mascotNext =
  document.getElementById("mascotNext");

const personalDone =
  document.getElementById("personalDone");

const userName =
  document.getElementById("userName");

const userEmail =
  document.getElementById("userEmail");


/* =====================================================
   UPDATE MASCOT
===================================================== */

function updateMascot(direction) {

  const mascot =
    mascots[currentMascot];


  /*
    Remove animation
    để animation có thể chạy lại.
  */

  mascotImage.classList.remove(
    "slide-next",
    "slide-prev"
  );


  /*
    Force browser reflow.
    Không có dòng này thì khi chuyển
    mascot liên tục animation có thể
    không chạy lại.
  */

  void mascotImage.offsetWidth;


  mascotImage.src =
    mascot.image;

  mascotImage.alt =
    mascot.name;

  mascotName.textContent =
    mascot.name;


  /*
    Animation theo hướng.
  */

  if (direction === "next") {

    mascotImage.classList.add(
      "slide-next"
    );

  } else {

    mascotImage.classList.add(
      "slide-prev"
    );

  }

}


/* =====================================================
   NEXT
===================================================== */

mascotNext.addEventListener(
  "click",
  () => {

    currentMascot++;

    if (
      currentMascot >= mascots.length
    ) {

      currentMascot = 0;

    }


    updateMascot("next");

  }
);


/* =====================================================
   PREVIOUS
===================================================== */

mascotPrev.addEventListener(
  "click",
  () => {

    currentMascot--;

    if (
      currentMascot < 0
    ) {

      currentMascot =
        mascots.length - 1;

    }


    updateMascot("prev");

  }
);


/* =====================================================
   SAVE PERSONAL
===================================================== */

personalDone.addEventListener(
  "click",
  () => {

    const personalData = {

      name:
        userName.value.trim(),

      email:
        userEmail.value.trim(),

      mascot:
        mascots[currentMascot].name,

      mascotImage:
        mascots[currentMascot].image

    };


    /*
      Prototype data.
      Sau này có thể thay bằng database.
    */

    localStorage.setItem(
      "insitePersonal",
      JSON.stringify(personalData)
    );


    /*
      Tạm thời quay về profile.
      Nếu flow của bạn có trang Monki
      voice setup thì đổi thành:
      "personal-voice.html"
    */

    window.location.href =
      "profile.html";

  }
);