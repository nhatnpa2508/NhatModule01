
let inputwidth;
let inputheight;
inputwidth = prompt("Nhập chiều rộng:");
inputheight = prompt("Nhập chiều cao:");
let width = parseInt(inputwidth);
let height = parseInt(inputheight);
let area = width * height;
document.write("Tính diện tích hình chữ nhật");
document.write("<br/>")
document.write("Chiều rộng = ", + inputwidth);
document.write("<br/>")
document.write("Chiều cao =", + inputheight);
document.write("<br/>")
document.write("Diện tích = ", + area);
