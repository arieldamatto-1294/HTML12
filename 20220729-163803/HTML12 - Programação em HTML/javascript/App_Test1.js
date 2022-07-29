

console.log("Standard text");

document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(21)").addEventListener("click", function() {
  display_write(7);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(22)").addEventListener("click", function() {
  display_write(8);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(23)").addEventListener("click", function() {
  display_write(9);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(26)").addEventListener("click", function() {
  display_write(4);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(27)").addEventListener("click", function() {
  display_write(5);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(28)").addEventListener("click", function() {
  display_write(6);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(31)").addEventListener("click", function() {
  display_write(1);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(32)").addEventListener("click", function() {
  display_write(2);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(33)").addEventListener("click", function() {
  display_write(3);
});
document.querySelector("#device-body > div:nth-of-type(2) > div > div:nth-of-type(37)").addEventListener("click", function() {
  display_write(0);
});

let calc_seq = [];
let x = 0;


function display_write(a) {
  if (x == 0) {
    x = a;
  } else {
    x = (x * 10) + a;
  }
  document.querySelector("#display > p:nth-of-type(2)").innerHTML = x + ((x % 1 == 0) ? "." : "");
}

