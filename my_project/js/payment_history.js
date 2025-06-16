document.addEventListener("DOMContentLoaded", function () {
  // Modal interactions
  const detailModal = document.getElementById("detailModal");
  const closeDetailModal = document.getElementById("closeDetailModal");
  const printReceipt = document.getElementById("printReceipt");
  const detailButtons = document.querySelectorAll("button.text-primary");

  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      detailModal.classList.remove("hidden");

      const row = this.closest("tr");
      document.getElementById("fieldName").textContent = row.querySelector("td:nth-child(1)").textContent;
      document.getElementById("bookingTime").textContent = row.querySelector("td:nth-child(2)").textContent;
      document.getElementById("paymentTime").textContent = row.querySelector("td:nth-child(3)").textContent;
      document.getElementById("paymentAmount").textContent = row.querySelector("td:nth-child(4)").textContent;

      const paymentMethod = row.querySelector("td:nth-child(5)").textContent.trim();
      document.getElementById("paymentMethod").innerHTML = row.querySelector("td:nth-child(5)").querySelector("div").innerHTML;
    });
  });

  closeDetailModal.addEventListener("click", function () {
    detailModal.classList.add("hidden");
  });

  printReceipt.addEventListener("click", function () {
    alert("Đang chuẩn bị in hóa đơn...");
  });

  detailModal.addEventListener("click", function (e) {
    if (e.target === detailModal) {
      detailModal.classList.add("hidden");
    }
  });

  // Filter interactions
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const selectFilter = document.querySelector("select");
  const searchInput = document.querySelector('input[type="text"]');
  const exportButton = document.querySelector("button.bg-primary");

  dateInputs.forEach((input) => {
    input.addEventListener("change", function () {
      console.log("Date filter changed:", this.value);
    });
  });

  selectFilter.addEventListener("change", function () {
    console.log("Payment method filter changed:", this.value);
  });

  searchInput.addEventListener("input", function () {
    console.log("Search query:", this.value);
  });

  exportButton.addEventListener("click", function () {
    alert("Đang xuất báo cáo...");
  });
});