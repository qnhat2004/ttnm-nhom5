const customers = [
  {
    id: 1,
    username: "nguyenvana",
    name: "Nguyễn Văn A",
    cccd: "123456789",
    address: "Hà Nội",
    phone: "0901234567",
    bookings: 3,
    reviews: 2,
    active: true,
  },
  {
    id: 2,
    username: "tranthib",
    name: "Trần Thị B",
    cccd: "987654321",
    address: "TP. Hồ Chí Minh",
    phone: "0912345678",
    bookings: 5,
    reviews: 4,
    active: false,
  },
  {
    id: 3,
    username: "levancc",
    name: "Lê Văn C",
    cccd: "192837465",
    address: "Đà Nẵng",
    phone: "0923456789",
    bookings: 2,
    reviews: 0,
    active: true,
  },
];

let selectedCustomer = null;
let editModal = null;

const tableBody = document.querySelector("#customerTable tbody");
const filterSelect = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");

const confirmModal = document.getElementById("confirmModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

let currentToggleIndex = null;

function openModal(isActivate, customerName, index) {
  modalTitle.textContent = isActivate
    ? "Kích hoạt tài khoản"
    : "Khóa tài khoản";
  modalMessage.textContent = `Bạn có chắc muốn ${
    isActivate ? "kích hoạt" : "khóa"
  } tài khoản ${customerName}?`;
  currentToggleIndex = index;
  confirmModal.classList.remove("hidden");
}

function closeModal() {
  confirmModal.classList.add("hidden");
  currentToggleIndex = null;
}

cancelBtn.onclick = closeModal;
confirmBtn.onclick = () => {
  if (currentToggleIndex !== null) {
    customers[currentToggleIndex].active =
      !customers[currentToggleIndex].active;
    renderTable(filteredData());
    closeModal();
  }
};

function openEditModal(id) {
  selectedCustomer = customers.find((c) => c.id === id);
  if (!selectedCustomer) return;

  // Gán data vào form
  document.getElementById("edit-name").value = selectedCustomer.name;
  document.getElementById("edit-phone").value = selectedCustomer.phone;
  document.getElementById("edit-cccd").value = selectedCustomer.cccd;
  document.getElementById("edit-address").value = selectedCustomer.address;
  document.getElementById("edit-username").value = selectedCustomer.username;

  editModal.classList.remove("hidden");
}

function submitEdit() {
  if (!selectedCustomer) return;

  selectedCustomer.name = document.getElementById("edit-name").value;
  selectedCustomer.phone = document.getElementById("edit-phone").value;
  selectedCustomer.cccd = document.getElementById("edit-cccd").value;
  selectedCustomer.address = document.getElementById("edit-address").value;

  editModal.classList.add("hidden");
  renderTable(); // Cập nhật bảng
}

function renderTable(data = customers) {
  tableBody.innerHTML = "";
  data.forEach((customer, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.cccd}</td>
        <td>${customer.address}</td>
        <td>${customer.phone}</td>
        <td>${customer.bookings}</td>
        <td>${customer.reviews}</td>
        <td>
          <label class="switch">
            <input type="checkbox" ${
              customer.active ? "checked" : ""
            } data-index="${index}">
            <span class="slider"></span>
          </label>
          <span class="status-label">${
            customer.active ? "Kích hoạt" : "Khóa"
          }</span>
        </td>
        <td class="px-4 py-2">
          <button
            onclick="openEditModal(${customer.id})"
            class="text-blue-600 hover:underline text-sm"
          >
            ✏️
          </button>
        </td>
      `;

    // Gán lại checkbox event (trạng thái)
    const checkbox = row.querySelector("input[type='checkbox']");
    checkbox.addEventListener("click", (e) => {
      e.stopPropagation(); // Không lan ra sự kiện click hàng
      openModal(!customer.active, customer.name, index);
    });

    // Gán sự kiện click vào hàng (trừ cột chứa checkbox và nút)
    row.addEventListener("click", (e) => {
      const isInsideAction = e.target.closest(
        "td:nth-child(8), td:nth-child(9)"
      );
      if (!isInsideAction) {
        openCustomerDetailModal(customer);
      }
    });

    tableBody.appendChild(row);
  });
}

function openCustomerDetailModal(customer) {
  document.getElementById("customerName").textContent = customer.name;
  document.getElementById(
    "customerCccd"
  ).textContent = `CCCD: ${customer.cccd}`;
  document.getElementById(
    "customerAddress"
  ).textContent = `Địa chỉ: ${customer.address}`;
  document.getElementById(
    "customerPhone"
  ).textContent = `SĐT: ${customer.phone}`;
  document.getElementById("customerStatus").textContent = `Trạng thái: ${
    customer.active ? "Kích hoạt" : "Khóa"
  }`;

  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "";
  for (let i = 0; i < customer.bookings; i++) {
    const div = document.createElement("div");
    div.style.border = "1px solid #e5e7eb";
    div.style.borderRadius = "8px";
    div.style.padding = "10px";
    div.innerHTML = `
        <img src="../public/football_field.png" alt="field" style="width: 100%; border-radius: 4px; margin-bottom: 6px;">
        <p><strong>Sân bóng La Thành</strong></p>
        <p>⏰ 05:00 - 22:00</p>
        <p>📍 Quận Thanh Xuân, Hà Nội</p>
      `;
    bookingList.appendChild(div);
  }

  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";
  for (let i = 0; i < customer.reviews; i++) {
    const div = document.createElement("div");
    div.style.border = "1px solid #e5e7eb";
    div.style.borderRadius = "8px";
    div.style.padding = "10px";
    div.style.marginBottom = "12px";
    div.innerHTML = `
        <p><strong>${customer.name}</strong></p>
        <p style="font-size: 12px; color: gray;">2023-10-01</p>
        <div style="color: #facc15;">${"★".repeat(5)}</div>
        <p>Sân bóng rất đẹp và sạch sẽ!</p>
        <p style="font-size: 13px; color: #555;">🏟 Sân bóng La Thành - Quận Thanh Xuân, Hà Nội</p>
      `;
    reviewList.appendChild(div);
  }

  document.getElementById("customerDetailModal").classList.remove("hidden");
}

function closeCustomerModal() {
  document.getElementById("customerDetailModal").classList.add("hidden");
}

function filteredData() {
  const value = filterSelect.value;
  const keyword = searchInput.value.toLowerCase();
  return customers.filter((c) => {
    const statusMatch = value === "" || String(c.active) === value;
    const keywordMatch = c.name.toLowerCase().includes(keyword);
    return statusMatch && keywordMatch;
  });
}

filterSelect.addEventListener("change", () => renderTable(filteredData()));
searchInput.addEventListener("input", () => renderTable(filteredData()));

// Tải xuông dữ liệu
document
  .getElementById("downloadBtn")
  .addEventListener("click", handleDownload);

function handleDownload() {
  const headers = [
    "Tên",
    "CCCD",
    "Địa chỉ",
    "Số điện thoại",
    "Lượt đặt sân",
    "Lượt đánh giá",
    "Trạng thái",
  ];

  const filteredCustomers =
    filterSelect.value === ""
      ? customers
      : customers.filter((c) => String(c.active) === filterSelect.value);

  const rows = filteredCustomers.map((cust) => [
    cust.name,
    cust.cccd,
    cust.address,
    cust.phone,
    cust.bookings,
    cust.reviews,
    cust.active ? "Kích hoạt" : "Khóa",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((val) => `"${val}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "danh_sach_khach_hang.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const addModal = document.getElementById("addCustomerModal");
const addCustomerForm = document.getElementById("addCustomerForm");

function openAddCustomerModal() {
  addModal.classList.remove("hidden");
  addCustomerForm.reset();
  updateRules();
}

function closeAddCustomerModal() {
  addModal.classList.add("hidden");
}

function updateRules() {
  const pwd = addCustomerForm.password.value;
  const confirmPwd = addCustomerForm.confirmPassword.value;

  const hasNumber = /\d/.test(pwd);
  const hasLetter = /[a-zA-Z]/.test(pwd);
  const longEnough = pwd.length >= 6;
  const match = pwd === confirmPwd && pwd !== "";

  document.getElementById("rule-number").style.color = hasNumber
    ? "green"
    : "gray";
  document.getElementById("rule-letter").style.color = hasLetter
    ? "green"
    : "gray";
  document.getElementById("rule-length").style.color = longEnough
    ? "green"
    : "gray";
  document.getElementById("rule-match").style.color = match ? "green" : "gray";

  return hasNumber && hasLetter && longEnough && match;
}

addCustomerForm.password.addEventListener("input", updateRules);
addCustomerForm.confirmPassword.addEventListener("input", updateRules);

addCustomerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!updateRules()) {
    alert("Mật khẩu chưa hợp lệ.");
    return;
  }

  const formData = new FormData(addCustomerForm);
  const newCustomer = Object.fromEntries(formData.entries());
  delete newCustomer.confirmPassword;

  const customer = {
    id: customers.length + 1,
    name: newCustomer.name,
    cccd: newCustomer.cccd,
    address: newCustomer.address,
    phone: newCustomer.phone,
    bookings: 0,
    status: true,
  };

  customers.push(customer);
  renderTable();
  closeAddCustomerModal();
});

window.onload = () => {
  editModal = document.getElementById("editModal");
};

function openAddModal() {
  document.getElementById("addModal").classList.remove("hidden");
}
function closeAddModal() {
  document.getElementById("addModal").classList.add("hidden");
}

renderTable(customers);
