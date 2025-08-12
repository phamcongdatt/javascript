const API = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const name = document.getElementById("name").value.trim();

        if (!email || !password || !confirmPassword || !name) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name })
            });

            if (res.ok) {
                alert("Đăng ký thành công!");
                form.reset();
                window.location.href = "index3.html"; 
            } else {
                alert("Đăng ký thất bại! Kiểm tra lại thông tin.");
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Không thể kết nối đến server!");
        }
    });
});
