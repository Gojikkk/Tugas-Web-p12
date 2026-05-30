let currentPage = 'barang';
window._barang = [];
window._pembelian = [];
window._logs = [];

async function fetchAll() {
  try {
    const [barang, pembelian, logs] = await Promise.all([
      getBarang().catch(() => []),
      getPembelian().catch(() => []),
      getLogs().catch(() => []),
    ]);
    window._barang = Array.isArray(barang) ? barang : [];
    window._pembelian = Array.isArray(pembelian) ? pembelian : [];
    window._logs = Array.isArray(logs) ? logs : [];
    renderPage();
  } catch (e) {
    console.error('Gagal fetch data:', e);
  }
}

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.nav').forEach((el) => el.classList.remove('on'));
  const navMap = { barang: 0, pembelian: 1, logs: 2 };
  const navBtns = document.querySelectorAll('.nav');
  navBtns[navMap[page]]?.classList.add('on');
  renderPage();
}

function renderPage() {
  if (currentPage === 'barang') renderBarang(window._barang);
  else if (currentPage === 'pembelian') renderPembelian(window._pembelian, window._barang);
  else if (currentPage === 'logs') renderLogs(window._logs);
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}

fetchAll();
