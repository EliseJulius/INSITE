function setupNavbar() {

  const navItems =
    document.querySelectorAll(".nav-item");

  const screen =
    document.querySelector(".screen");

  if (!screen) {
    console.error("Screen not found.");
    return;
  }

  const currentPage =
    screen.dataset.page;

  console.log(
    "Current page:",
    currentPage
  );

  console.log(
    "Navbar items:",
    navItems.length
  );

  navItems.forEach((item) => {

    item.classList.remove("active");

    if (
      item.dataset.page === currentPage
    ) {

      item.classList.add("active");

    }

  });

}