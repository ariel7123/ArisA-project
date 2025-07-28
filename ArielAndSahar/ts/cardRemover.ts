// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButtons = document.querySelectorAll(".deleteCardBtn");

//   deleteButtons.forEach((btn) => {
//     btn.addEventListener("click", (e: Event) => {
//       const target = e.target as HTMLElement | null;

//       if (!target) return; // בטיחות ל-null

//       const card = target.closest(".cardContainer__item");

//       if (card instanceof HTMLElement) {
//         card.remove();
//       }
//     });
//   });
// });