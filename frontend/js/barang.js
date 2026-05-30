function renderBarang(barang) {
  const content = document.getElementById('content');
  document.getElementById('tab-label').textContent = 'Semua barang';

  const minH = barang.length ? Math.min(...barang.map((b) => b.harga)) : 0;
  const maxH = barang.length ? Math.max(...barang.map((b) => b.harga)) : 0;

  content.innerHTML = `
    <div class="page-title">Barang</div>
    <div class="page-sub">Kelola semua produk yang tersedia di toko.</div>

    <div class="stats">
      <div class="stat">
        <div class="stat-lbl">Total barang</div>
        <div class="stat-val">${barang.length}</div>
      </div>
      <div class="stat">
        <div class="stat-lbl">Harga terendah</div>
        <div class="stat-val sm">${barang.length ? fmt(minH) : '—'}</div>
      </div>
      <div class="stat">
        <div class="stat-lbl">Harga tertinggi</div>
        <div class="stat-val sm">${barang.length ? fmt(maxH) : '—'}</div>
      </div>
    </div>

    <div class="toolbar">
      <div class="toolbar-count">${barang.length} item</div>
      <button class="btn btn-primary" onclick="showModalBarang()">
        <i class="ti ti-plus"></i>Tambah barang
      </button>
    </div>

    ${
      barang.length === 0
        ? `<div class="empty"><i class="ti ti-box-off"></i><p>Belum ada barang. Tambahkan yang pertama.</p></div>`
        : `
      <table class="tbl">
        <thead>
          <tr>
            <th style="width:40px">#</th>
            <th>Nama barang</th>
            <th style="width:180px">Harga</th>
            <th style="width:100px">Status</th>
          </tr>
        </thead>
        <tbody>
          ${barang
            .map(
              (b, i) => `
            <tr>
              <td class="id-col">${i + 1}</td>
              <td class="name">${b.nama}</td>
              <td>${fmt(b.harga)}</td>
              <td><span class="chip chip-green">Tersedia</span></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      <div class="add-row" onclick="showModalBarang()">
        <i class="ti ti-plus"></i>Tambah baris baru
      </div>
    `
    }
  `;
}

function showModalBarang() {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">Tambah barang</div>
          <button class="btn btn-ghost" onclick="closeModal()" style="padding:4px 8px">
            <i class="ti ti-x" style="font-size:14px"></i>
          </button>
        </div>
        <div class="field">
          <label>Nama barang</label>
          <input id="input-nama" placeholder="Contoh: Mouse Logitech"/>
        </div>
        <div class="field">
          <label>Harga (Rp)</label>
          <input id="input-harga" type="number" placeholder="85000"/>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeModal()">Batal</button>
          <button class="btn btn-primary" onclick="submitBarang()">
            <i class="ti ti-check"></i>Simpan
          </button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
}

async function submitBarang() {
  const nama = document.getElementById('input-nama').value.trim();
  const harga = parseInt(document.getElementById('input-harga').value);
  if (!nama || !harga) return;
  await postBarang({ nama, harga });
  closeModal();
  fetchAll();
}
