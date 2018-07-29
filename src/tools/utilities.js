// function getScreenWidth() {
//   if (self.innerWidth) {
//     return self.innerWidth;
//   }
//
//   if (document.documentElement && document.documentElement.clientWidth) {
//     return document.documentElement.clientWidth;
//   }
//
//   if (document.body) {
//     return document.body.clientWidth;
//   }
// }

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}
export {getOffset};
