const API = "http://localhost:3000/products";

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editId = null;

// Load danh sách sản phẩm
const fetchProducts = async () => {
  const res = await fetch(API);
  const products = await res.json();
  render(products);
};

// Hiển thị sản phẩm
function render(products) {
  productList.innerHTML = "";
  products.forEach((p) => {
    productList.innerHTML += `
      <tr>
        <td><img src="${p.image}" width="50"/></td>
        <td>${p.title}</td>
        <td>${p.name}</td>
        <td>${p.price} VNĐ</td>
        <td>
          <button onclick="editProduct(${p.id})" class="btn btn-warning btn-sm">Sửa</button>
          <button onclick="deleteProduct(${p.id})" class="btn btn-danger btn-sm">Xoá</button>
        </td>
      </tr>
    `;
  });
}

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const image = document.getElementById("image").value.trim();

  // Validate
  if (!title || !name || !price || !image || price <= 0) {
    alert("Vui lòng nhập đầy đủ thông tin hợp lệ!");
    return;
  }

  const newProduct = { title, name, price, image };

  try {
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      editId = null;
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
    }

    form.reset();
    fetchProducts();
  } catch (err) {
    alert("Lỗi xử lý sản phẩm: " + err.message);
  }
});

// Sửa
window.editProduct = async (id) => {
  const res = await fetch(`${API}/${id}`);
  const p = await res.json();

  document.getElementById("title").value = p.title;
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("image").value = p.image;
  editId = id;
};

// Xoá
window.deleteProduct = async (id) => {
  if (confirm("Bạn chắc chắn muốn xoá?")) {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      alert("Xoá thất bại: " + err.message);
    }
  }
};

// Khởi tạo
fetchProducts();
