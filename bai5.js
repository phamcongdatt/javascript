const API = "http://localhost:3000/product";

const form = document.getElementById("addForm");
const itemList = document.getElementById("productTable"); // phải có bảng hiển thị
let editId = null;

// Lấy danh sách sản phẩm
async function fetchProducts() {
  const res = await fetch(API);
  const data = await res.json();
  render(data);
}

// Hiển thị danh sách
function render(products) {
  if (!itemList) return; // tránh lỗi khi không có bảng
  itemList.innerHTML = "";
  products.forEach((p) => {
    itemList.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.quantity}</td>
        <td><img src="${p.imageUrl}" width="50"/></td>
        <td>${p.category}</td>
        <td>
          <button onclick="editProduct(${p.id})" class="btn btn-warning btn-sm">Sửa</button>
          <button onclick="deleteProduct(${p.id})" class="btn btn-danger btn-sm">Xóa</button>
        </td>
      </tr>
    `;
  });
}
function editProduct(id) {
    window.location.href = `formEdit.html?id=${id}`;
}

// Xử lý submit form
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const category = document.getElementById("category").value;

    // Validate
    if (!title || isNaN(quantity) || quantity < 0 || !imageUrl || !category) {
      alert("Vui lòng nhập đầy đủ và đúng định dạng thông tin!");
      return;
    }

    const productData = { title, quantity, imageUrl, category };

    if (editId) {
      // Cập nhật
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        alert("Sản phẩm đã được cập nhật!");
        editId = null;
        form.reset();
        fetchProducts();
      } else {
        alert("Có lỗi xảy ra khi cập nhật!");
      }
    } else {
      // Thêm mới
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (res.ok) {
        alert("Sản phẩm đã được thêm!");
        form.reset();
        fetchProducts();
      } else {
        alert("Có lỗi xảy ra khi thêm!");
      }
    }
  });
}

// Xóa sản phẩm
window.deleteProduct = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Xóa thành công!");
    fetchProducts();
  } else {
    alert("Có lỗi xảy ra khi xóa!");
  }
};

// Chỉnh sửa sản phẩm
window.editProduct = async (id) => {
  const res = await fetch(`${API}/${id}`);
  const product = await res.json();

  document.getElementById("title").value = product.title;
  document.getElementById("quantity").value = product.quantity;
  document.getElementById("imageUrl").value = product.imageUrl;
  document.getElementById("category").value = product.category;
  editId = id;
};

// Gọi khi load trang danh sách
if (itemList) {
  fetchProducts();
}
