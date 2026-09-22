/* =====================================================
   INSITE — MAIN SCRIPT
===================================================== */


/* =====================================================
   LOAD NAVBAR
===================================================== */

async function loadNavbar() {
  const navbar = document.getElementById("navbar");

  console.log("[INSITE] Script loaded.");
  console.log("[INSITE] Navbar container:", navbar);

  if (!navbar) {
    console.error(
      "[INSITE] ERROR: #navbar container was not found."
    );
    return;
  }

  try {
    console.log("[INSITE] Loading navbar.html...");

    const response = await fetch("navbar.html", {
      method: "GET",
      cache: "no-store"
    });

    console.log(
      "[INSITE] navbar.html response:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      throw new Error(
        `Failed to load navbar.html (${response.status})`
      );
    }

    const navbarHTML = await response.text();

    console.log(
      "[INSITE] navbar.html received:",
      navbarHTML.length,
      "characters"
    );

    if (!navbarHTML.trim()) {
      throw new Error(
        "navbar.html returned empty content."
      );
    }

    navbar.innerHTML = navbarHTML;

    console.log(
      "[INSITE] Navbar injected successfully."
    );

    setupNavbar();

  } catch (error) {

    console.error(
      "[INSITE] Navbar loading failed:",
      error
    );

    navbar.innerHTML = "";

  }
}


/* =====================================================
   SET ACTIVE NAV ITEM
===================================================== */

function setupNavbar() {

  const screen =
    document.querySelector(".screen");

  const navItems =
    document.querySelectorAll(".nav-item");

  console.log(
    "[INSITE] Setting up navbar..."
  );

  console.log(
    "[INSITE] Nav items found:",
    navItems.length
  );

  if (!screen) {
    console.error(
      "[INSITE] ERROR: .screen was not found."
    );
    return;
  }

  if (navItems.length === 0) {
    console.error(
      "[INSITE] ERROR: No .nav-item elements found."
    );
    return;
  }


  /* ---------------------------------------------
     GET CURRENT PAGE
  --------------------------------------------- */

  const currentPage =
    screen.dataset.page;

  console.log(
    "[INSITE] Current page:",
    currentPage
  );


  /* ---------------------------------------------
     REMOVE ALL ACTIVE STATES
  --------------------------------------------- */

  navItems.forEach((item) => {
    item.classList.remove("active");
  });


  /* ---------------------------------------------
     SET ACTIVE STATE
  --------------------------------------------- */

  if (!currentPage) {

    console.warn(
      "[INSITE] WARNING: .screen has no data-page attribute."
    );

    return;
  }


  let activeItemFound = false;


  navItems.forEach((item) => {

    const itemPage =
      item.dataset.page;

    if (itemPage === currentPage) {

      item.classList.add("active");

      activeItemFound = true;

      console.log(
        `[INSITE] Active nav item: ${itemPage}`
      );

    }

  });


  if (!activeItemFound) {

    console.warn(
      `[INSITE] WARNING: No navbar item matches page "${currentPage}".`
    );

  }

}


/* =====================================================
   NAVBAR LINK HANDLING
===================================================== */

function setupNavbarLinks() {

  const navItems =
    document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {

    item.addEventListener("click", () => {

      console.log(
        "[INSITE] Navigation:",
        item.dataset.page,
        "→",
        item.getAttribute("href")
      );

    });

  });

}


/* =====================================================
   INITIALIZE APP
===================================================== */

async function initApp() {

  console.log(
    "[INSITE] Initializing app..."
  );

  await loadNavbar();

  setupNavbarLinks();

  console.log(
    "[INSITE] App initialized."
  );

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  initApp
);


  /* =====================================================
     SEARCH NAVIGATION
  ===================================================== */

  const searchButton =
    document.getElementById("searchButton");

  const voiceButton =
    document.getElementById("voiceButton");


  /* ==================== TEXT SEARCH ==================== */

  if (searchButton) {

    searchButton.addEventListener("click", () => {

      window.location.href = "search-text.html";

    });

  }


  /* ==================== VOICE SEARCH ==================== */

  if (voiceButton) {

    voiceButton.addEventListener("click", (event) => {

      event.stopPropagation();

      window.location.href = "search-voice.html";

    });

  }
