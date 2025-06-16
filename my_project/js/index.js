document.addEventListener("DOMContentLoaded", function () {
  // View Switching
  const views = document.querySelectorAll('.view');
  const navLinks = document.querySelectorAll('.nav-link');

  function showView(viewId) {
    views.forEach(view => view.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    document.title = viewId === 'paymentView' ? 'Thanh toán danh sách sân đã đặt' : 'Lịch sử thanh toán';
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showView(link.dataset.view + 'View');
    });
  });

  // Payment Modal Logic
  const paymentModal = document.getElementById('paymentModal');
  const modalLocation = document.getElementById('modalLocation');
  const modalFieldType = document.getElementById('modalFieldType');
  const modalTime = document.getElementById('modalTime');
  const modalAmount = document.getElementById('modalAmount');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');

  const paymentButtons = document.querySelectorAll('.payment-button');
  paymentButtons.forEach(button => {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      modalLocation.textContent = row.querySelector('td:nth-child(2)').textContent;
      modalFieldType.textContent = row.querySelector('td:nth-child(4)').textContent;
      modalTime.textContent = row.querySelector('td:nth-child(3)').textContent;
      modalAmount.textContent = row.querySelector('td:nth-child(6)').textContent;
      paymentModal.classList.remove('hidden');
    });
  });

  modalCancel.addEventListener('click', () => paymentModal.classList.add('hidden'));

  const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
  paymentMethodInputs.forEach(input => {
    input.addEventListener('change', () => {
      modalConfirm.disabled = false;
      modalConfirm.classList.remove('opacity-50', 'cursor-not-allowed');
    });
  });

  modalConfirm.addEventListener('click', () => {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'text-red-500 text-sm mt-2';
      errorDiv.textContent = 'Vui lòng chọn phương thức thanh toán';
      modalConfirm.parentElement.insertBefore(errorDiv, modalConfirm);
      setTimeout(() => errorDiv.remove(), 3000);
      return;
    }
    paymentModal.classList.add('hidden');
    showSuccessModal(selectedMethod.value);
  });

  modalConfirm.disabled = true;
  modalConfirm.classList.add('opacity-50', 'cursor-not-allowed');

  function showSuccessModal(method) {
    const message = method === 'offline' ? 'Đã xác nhận đặt sân, vui lòng thanh toán tại sân trước giờ đá' : 'Thanh toán thành công';
    const successModal = document.createElement('div');
    successModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    successModal.innerHTML = `
      <div class="bg-white rounded-lg p-8 w-[400px] text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <i class="ri-check-line text-4xl text-green-500"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2">Thanh Toán Đặt Sân</h3>
        <p class="text-green-500 font-medium mb-6">${message}</p>
        <button class="px-6 py-2 bg-primary text-white rounded-button hover:bg-primary/90 whitespace-nowrap">OK</button>
      </div>
    `;
    document.body.appendChild(successModal);
    successModal.querySelector('button').addEventListener('click', () => successModal.remove());
  }

  // Cancel Button Logic
  const cancelButtons = document.querySelectorAll('.cancel-button');
  cancelButtons.forEach(button => {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const fieldName = row.querySelector('td:first-child').textContent;
      const confirmModal = document.createElement('div');
      confirmModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
      confirmModal.innerHTML = `
        <div class="bg-white rounded-lg p-6 w-[400px] text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <i class="ri-question-line text-2xl text-red-500"></i>
          </div>
          <h3 class="text-xl font-semibold mb-4">Bạn có muốn hủy đặt sân</h3>
          <div class="flex justify-center space-x-3">
            <button class="cancel-no px-6 py-2 border rounded-button text-gray-700 hover:bg-gray-50 whitespace-nowrap">Không</button>
            <button class="cancel-yes px-6 py-2 bg-red-500 text-white rounded-button hover:bg-red-600 whitespace-nowrap">Xác nhận</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);
      confirmModal.querySelector('.cancel-no').addEventListener('click', () => confirmModal.remove());
      confirmModal.querySelector('.cancel-yes').addEventListener('click', () => {
        row.remove();
        confirmModal.remove();
      });
    });
  });

  // Detail Modal Logic
  const detailModal = document.getElementById('detailModal');
  const closeDetailModal = document.getElementById('closeDetailModal');
  const printReceipt = document.getElementById('printReceipt');
  const detailButtons = document.querySelectorAll('.detail-button');

  detailButtons.forEach(button => {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      document.getElementById('fieldName').textContent = row.querySelector('td:nth-child(1)').textContent;
      document.getElementById('bookingTime').textContent = row.querySelector('td:nth-child(2)').textContent;
      document.getElementById('paymentTime').textContent = row.querySelector('td:nth-child(3)').textContent;
      document.getElementById('paymentAmount').textContent = row.querySelector('td:nth-child(4)').textContent;
      document.getElementById('paymentMethod').innerHTML = row.querySelector('td:nth-child(5)').querySelector('div').innerHTML;
      document.getElementById('fieldAddress').textContent = 'Quận Thanh Xuân, Hà Nội'; // Static for demo
      detailModal.classList.remove('hidden');
    });
  });

  closeDetailModal.addEventListener('click', () => detailModal.classList.add('hidden'));

  printReceipt.addEventListener('click', () => alert('Đang chuẩn bị in hóa đơn...'));

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) detailModal.classList.add('hidden');
  });

  // Filter Logic
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const selectFilter = document.querySelector('select');
  const searchInput = document.querySelector('input[type="text"]');
  const exportButton = document.querySelector('.export-button');

  dateInputs.forEach(input => input.addEventListener('change', () => console.log('Date filter changed:', input.value)));
  selectFilter.addEventListener('change', () => console.log('Payment method filter changed:', selectFilter.value));
  searchInput.addEventListener('input', () => console.log('Search query:', searchInput.value));
  exportButton.addEventListener('click', () => alert('Đang xuất báo cáo...'));

  // Initialize View
  showView('paymentView');
});