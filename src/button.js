import { ICONS } from "./constants";

const getTargetIndex = (icons, direction) => {
  let targetIndex, currentIndex;

  icons.forEach((item, index) => {
    if (item.className.includes("highlighted")) {
      currentIndex = index;
      targetIndex = index + direction;
      targetIndex =
        targetIndex < 0
          ? ICONS.length - 1
          : targetIndex > ICONS.length - 1
          ? 0
          : targetIndex;
    }
  });

  return { targetIndex, currentIndex };
};

export default function initButtons(handleUserAction) {
  const icons = document.querySelectorAll(".icons .icon");

  function buttonClick({ target }) {
    const btnClass = target.className;
    const direction = btnClass.includes("left")
      ? -1
      : btnClass.includes("right")
      ? 1
      : 0;

    const { targetIndex, currentIndex } = getTargetIndex(icons, direction);
    if (direction === 0) {
      handleUserAction(ICONS[targetIndex]);
    } else {
      icons[targetIndex].classList.add("highlighted");
      icons[currentIndex].classList.remove("highlighted");
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonClick);
}
