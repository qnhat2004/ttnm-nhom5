// calendar.js
document.addEventListener("DOMContentLoaded", function () {
  const dates = document.querySelectorAll(".calendar-grid .date");

  dates.forEach((date) => {
    date.addEventListener("click", function () {
      // Remove selected class from all dates
      dates.forEach((d) => d.classList.remove("selected"));
      // Add selected class to clicked date
      this.classList.add("selected");
    });
  });
});

// select-date-display.js

document.addEventListener("DOMContentLoaded", function () {
  const selectedDisplay = document.getElementById("selectedDateDisplay");
  const dates = document.querySelectorAll(".date");

  dates.forEach((date) => {
    date.addEventListener("click", function () {
      // Bỏ class selected cũ
      document
        .querySelectorAll(".date.selected")
        .forEach((d) => d.classList.remove("selected"));

      // Thêm class selected mới
      this.classList.add("selected");

      // Lấy ngày được chọn
      const day = this.textContent.trim();
      const month = "06"; // có thể thay bằng biến động nếu cần
      const year = "2025";

      selectedDisplay.textContent = `${day.padStart(2, "0")}/${month}/${year}`;
    });
  });
});

// field-type-toggle.js

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#fieldTypeButtons button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("bg-primary", "text-white");
        b.classList.add("border-gray-300", "text-black");
      });

      btn.classList.add("bg-primary", "text-white");
      btn.classList.remove("border-gray-300", "text-black");
    });
  });
});
// booking-modal.js

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("bookingModal");
  const closeBtn = document.getElementById("closeBookingModal");
  const openBtns = document.querySelectorAll(".open-booking-btn");

  if (!modal || !closeBtn || openBtns.length === 0) return;

  // Mở modal khi click vào nút mở
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  });

  // Đóng modal khi click nút đóng
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Đóng modal khi click ra ngoài
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

// booking-modal-close.js

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("bookingModal");
  const closeBtn1 = modal?.querySelector("button");
  const closeBtn2 = document.getElementById("closeBookingModal");

  if (modal && closeBtn1) {
    closeBtn1.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (modal && closeBtn2) {
    closeBtn2.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }
});

// dropdown-functionality.js

document.addEventListener("DOMContentLoaded", function () {
  // Field dropdown
  setupDropdown("fieldDropdownBtn", "fieldDropdown", "selectedField");
  // Start time dropdowns
  setupDropdown("startHourBtn", "startHourDropdown", "selectedStartHour");
  setupDropdown("startMinuteBtn", "startMinuteDropdown", "selectedStartMinute");
  // End time dropdowns
  setupDropdown("endHourBtn", "endHourDropdown", "selectedEndHour");
  setupDropdown("endMinuteBtn", "endMinuteDropdown", "selectedEndMinute");

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
      const container = dropdown.parentElement;
      if (!container.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  });

  function setupDropdown(btnId, dropdownId, selectedId) {
    const btn = document.getElementById(btnId);
    const dropdown = document.getElementById(dropdownId);
    const selectedText = document.getElementById(selectedId);

    if (!btn || !dropdown || !selectedText) return;

    btn.addEventListener("click", function () {
      dropdown.classList.toggle("show");
    });

    const options = dropdown.querySelectorAll("div");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        selectedText.textContent = this.textContent;
        dropdown.classList.remove("show");
      });
    });
  }
});

// custom-calendar.js

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("customDateInput");
  const toggleBtn = document.getElementById("calendarToggleBtn");
  const calendar = document.getElementById("customCalendar");
  const calendarDays = document.getElementById("calendarDays");
  const currentMonthText = document.getElementById("currentMonth");
  const prevBtn = document.getElementById("prevMonthBtn");
  const nextBtn = document.getElementById("nextMonthBtn");

  let selectedDate = new Date();
  let currentMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  const renderCalendar = () => {
    calendarDays.innerHTML = "";
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    currentMonthText.textContent = `Tháng ${month + 1}, ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = (firstDayOfMonth.getDay() + 6) % 7; // Bắt đầu từ thứ 2

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startingDay; i++) {
      calendarDays.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();

      const div = document.createElement("div");
      div.textContent = d;
      div.className = `cursor-pointer p-1 hover:bg-gray-200 rounded ${
        isToday ? "today" : ""
      } ${isSelected ? "selected-date" : ""}`;
      div.addEventListener("click", () => {
        selectedDate = date;
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        input.value = `${yyyy}-${mm}-${dd}`;
        calendar.classList.add("hidden");
        renderCalendar();
      });

      calendarDays.appendChild(div);
    }
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    calendar.classList.toggle("hidden");
  });

  prevBtn.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
  });

  document.addEventListener("click", (e) => {
    if (!calendar.contains(e.target) && !toggleBtn.contains(e.target)) {
      calendar.classList.add("hidden");
    }
  });

  renderCalendar();
});

// toggle-timeslots.js

document.addEventListener("DOMContentLoaded", function () {
  const viewBtn = document.getElementById("viewTimeSlotsBtn");
  const slots = document.getElementById("availableTimeSlots");

  if (viewBtn && slots) {
    viewBtn.addEventListener("click", () => {
      slots.classList.toggle("hidden");
    });
  }
});

// timeslot-calendar.js

document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openTimeSlotForm");
  const closeBtn = document.getElementById("closeTimeSlotForm");
  const calendarToggleBtn = document.getElementById("openCalendarBtn");
  const calendarWrapper = document.getElementById("timeSlotCalendar");
  const currentDateText = document.getElementById("currentSelectedDateText");

  const calendarDays = document.getElementById("calendarDaysTimeSlot");
  const currentMonthLabel = document.getElementById("currentMonthTimeSlot");
  const prevMonthBtn = document.getElementById("prevMonthBtnTimeSlot");
  const nextMonthBtn = document.getElementById("nextMonthBtnTimeSlot");

  let selectedDate = new Date();
  let currentMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  function renderTimeSlotCalendar() {
    calendarDays.innerHTML = "";

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    currentMonthLabel.textContent = `Tháng ${month + 1}, ${year}`;

    const firstDay = new Date(year, month, 1);
    const startingDay = (firstDay.getDay() + 6) % 7; // Bắt đầu từ Thứ 2
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startingDay; i++) {
      calendarDays.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const div = document.createElement("div");
      div.textContent = d;
      div.className = `cursor-pointer p-1 hover:bg-gray-200 rounded text-sm ${
        date.toDateString() === selectedDate.toDateString() ? "bg-blue-100" : ""
      }`;
      div.addEventListener("click", () => {
        selectedDate = date;
        currentDateText.textContent = date.toISOString().split("T")[0];
        calendarWrapper.classList.add("hidden");
        renderTimeSlotCalendar();
      });
      calendarDays.appendChild(div);
    }
  }

  if (openBtn)
    openBtn.onclick = () =>
      document.getElementById("timeSlotForm").classList.remove("hidden");
  if (closeBtn)
    closeBtn.onclick = () =>
      document.getElementById("timeSlotForm").classList.add("hidden");
  if (calendarToggleBtn)
    calendarToggleBtn.onclick = () =>
      calendarWrapper.classList.toggle("hidden");

  if (prevMonthBtn)
    prevMonthBtn.onclick = () => {
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      renderTimeSlotCalendar();
    };

  if (nextMonthBtn)
    nextMonthBtn.onclick = () => {
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      renderTimeSlotCalendar();
    };

  renderTimeSlotCalendar();
});

// custom-calendar.js

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("customCalendarBtn");
  const calendar = document.getElementById("customCalendarBox");
  const calendarDays = document.getElementById("customCalendarDays");
  const currentMonthText = document.getElementById("customCurrentMonth");
  const prevBtn = document.getElementById("customPrevMonthBtn");
  const nextBtn = document.getElementById("customNextMonthBtn");

  let selectedDate = new Date();
  let currentMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  const renderCalendar = () => {
    calendarDays.innerHTML = "";
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    currentMonthText.textContent = `Tháng ${month + 1}, ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = (firstDayOfMonth.getDay() + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startingDay; i++) {
      calendarDays.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday = date.toDateString() === new Date().toDateString();
      const div = document.createElement("div");
      div.textContent = d;
      div.className = `cursor-pointer p-1 hover:bg-gray-200 rounded text-sm ${
        isToday ? "bg-blue-100" : ""
      }`;
      div.addEventListener("click", () => {
        selectedDate = date;
        calendar.classList.add("hidden");
        renderCalendar();
      });
      calendarDays.appendChild(div);
    }
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    calendar.classList.toggle("hidden");
  });

  prevBtn.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
  });

  document.addEventListener("click", (e) => {
    if (!calendar.contains(e.target) && !toggleBtn.contains(e.target)) {
      calendar.classList.add("hidden");
    }
  });

  renderCalendar();
});

// show-detail-toggle.js

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".show-detail-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const detailSection = document.getElementById(targetId);
      if (detailSection) {
        detailSection.classList.toggle("hidden");
        if (!detailSection.classList.contains("hidden")) {
          detailSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".show-detail-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Điều hướng đến trang xem chi tiết
      window.location.href = "xemchitiet.html";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".rating-stars .star");
  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      const rating = this.getAttribute("data-rating");
      highlightStars(rating);
    });
    star.addEventListener("mouseout", function () {
      resetStars();
    });
    star.addEventListener("click", function () {
      const rating = this.getAttribute("data-rating");
      setRating(rating);
    });
  });
  function highlightStars(rating) {
    stars.forEach((star) => {
      const starRating = star.getAttribute("data-rating");
      if (starRating <= rating) {
        star.classList.add("active");
        star.querySelector("i").style.color = "#FFD700";
      } else {
        star.classList.remove("active");
        star.querySelector("i").style.color = "#ddd";
      }
    });
  }
  function resetStars() {
    const activeRating =
      document
        .querySelector(".rating-stars")
        .getAttribute("data-active-rating") || 0;
    highlightStars(activeRating);
  }
  function setRating(rating) {
    document
      .querySelector(".rating-stars")
      .setAttribute("data-active-rating", rating);
    highlightStars(rating);
  }
});

// fetch('../html/header.html')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('header-container').innerHTML = data;
// });

// booking.js

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("btn-sumbit");

  if (!button) return;

  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Random thành công hoặc thất bại
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      document.getElementById("successModal").classList.remove("hidden");
    } else {
      document.getElementById("errorModal").classList.remove("hidden");
    }
  });
});

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");

  // Nếu là modal thành công thì chuyển hướng
  if (modalId === "successModal") {
    window.location.href = "giaodiendatsan.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const checkBtn = document.getElementById("checkAvailability");
  const bookingBtn = document.getElementById("btn-sumbit");
  const noSlotMsg = document.getElementById("noSlotMessage");

  let checkState = 0;

  checkBtn.addEventListener("click", function () {
    checkState++;

    if (checkState % 2 === 1) {
      // Lần 1: Ẩn nút đặt sân, hiện thông báo
      bookingBtn.classList.add("hidden");
      noSlotMsg.classList.remove("hidden");
    } else {
      // Lần 2: Hiện nút đặt sân lại, ẩn thông báo
      bookingBtn.classList.remove("hidden");
      noSlotMsg.classList.add("hidden");
    }
  });
});
