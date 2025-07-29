// Bài 1: DOM Manipulation
function changeTitle() {
  const title = document.getElementById("title");
  title.textContent = "DOM đã được cập nhật!";
  title.classList.add("highlight");
}

// Bài 2: Bubbling & Capturing
document.querySelector(".outer").addEventListener(
  "click",
  () => {
    console.log("Outer clicked (capturing)");
  },
  true
);

document.querySelector(".middle").addEventListener("click", () => {
  console.log("Middle clicked");
});

document.querySelector(".inner").addEventListener("click", (e) => {
  console.log("Inner clicked");
  // e.stopPropagation(); // Bật dòng này để test ngăn bubbling
});

// Bài 3: Page Navigation
document.getElementById("scrollBtn").addEventListener("click", () => {
  document.getElementById("sectionIntro").scrollIntoView({ behavior: "smooth" });
});

// Bài 4: DOM Traversing
const heading = document.getElementById("heading");
console.log("Parent:", heading.parentElement);
console.log("Children of box:", heading.parentElement.children);
console.log("Next sibling:", heading.nextElementSibling);
console.log("Previous sibling:", heading.previousElementSibling);

// Bài 5: Passing Arguments to Event Handlers
const products = [
  { id: 101, name: "Áo thun" },
  { id: 102, name: "Quần jeans" },
  { id: 103, name: "Giày thể thao" },
];

const container = document.getElementById("productList");
products.forEach((product) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${product.name}</p>
    <button>Thêm vào giỏ</button>
  `;
  const button = div.querySelector("button");
  button.addEventListener("click", addToCart.bind(null, product.id));
  container.appendChild(div);
});

function addToCart(productId) {
  console.log("Đã thêm sản phẩm ID:", productId);
}
