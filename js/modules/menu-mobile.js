import outsideClick from "./outsideclick.js";

export default function initMenuMobile() {
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="list"]');

  function openMenu(event) {
    event.preventDefault();

    menuList.classList.add("active");
    menuButton.classList.add("active");

    outsideClick(menuList, ["click"], () => {
      menuList.classList.remove("active");
      menuButton.classList.remove("active");
    });
  }

  if (menuButton && menuList) {
    menuButton.addEventListener("click", openMenu);
  }
}
