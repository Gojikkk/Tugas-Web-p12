function renderPembelian(pembelian, barang) {
  const content = document.getElementById('content');
  document.getElementById('tab-label').textContent = 'Semua transaksi';

  const getNama = (id) => barang.find((b) => b.id === id)?.nama || `Barang #${id}`;
  const getHarga = (id) => barang.find((b) => b.id === id)?.harga || 0;
  const totalNilai = pembelian.reduce((s, p) => s + getHarga(p.id_barang) * p.jumlah, 0);

  content.innerHTML = `
    <div class="page-title">Pembelian</div>
    <div class="page-sub">Riwayat transaksi dan pembelian barang.</div>

    <div class="stats">
      <div class="stat">
        <div class="stat-lbl">Total transaksi</div>
        <div class="stat-val">${pembelian.length}</div>
      </div>
      <div class="stat">
        <div class="stat-lbl">Total nilai</div>
        <div class="stat-val sm">${fmt(totalNilai)}</div>
      </div>
    </div>

    <div class="toolbar">
      <div class="toolbar-count">${pembelian.length} transaksi</div>
      <button class="btn btn-primary" onclick="showModalPembelian()">
        <i class="ti ti-plus"></i>Beli barang
      </button>
    </div>

    ${
      pembelian.length === 0
        ? `<div class="empty"><i class="ti ti-shopping-cart-off"></i><p>Belum ada transaksi pembelian.</p></div>`
        : `
      <table class="tbl">
        <thead>
          <tr>
            <th style="width:40px">#</th>
            <th>Barang</th>
            <th style="width:100px">Jumlah</th>
            <th style="width:180px">Total</th>
          </tr>
        </thead>
        <tbody>
          ${pembelian
            .map(
              (p, i) => `
            <tr>
              <td class="id-col">${i + 1}</td>
              <td class="name">${getNama(p.id_barang)}</td>
              <td><span class="chip chip-blue">${p.jumlah} pcs</span></td>
              <td>${fmt(getHarga(p.id_barang) * p.jumlah)}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      <div class="add-row" onclick="showModalPembelian()">
        <i class="ti ti-plus"></i>Tambah baris baru
      </div>
    `
    }
  `;
}

function showModalPembelian() {
  const barang = window._barang || [];
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">Beli barang</div>
          <button class="btn btn-ghost" onclick="closeModal()" style="padding:4px 8px">
            <i class="ti ti-x" style="font-size:14px"></i>
          </button>
        </div>
        <div class="field">
          <label>Pilih barang</label>
          <select id="input-id-barang" onchange="updateTotalHint()">
            <option value="">— Pilih barang —</option>
            ${barang.map((b) => `<option value="${b.id}" data-harga="${b.harga}">${b.nama} · ${fmt(b.harga)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Jumlah</label>
          <input id="input-jumlah" type="number" min="1" placeholder="1" oninput="updateTotalHint()"/>
        </div>
        <div id="total-hint"></div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="closeModal()">Batal</button>
          <button class="btn btn-primary" onclick="submitPembelian()">
            <i class="ti ti-check"></i>Beli
          </button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  });
}

function updateTotalHint() {
  const select = document.getElementById('input-id-barang');
  const jumlah = parseInt(document.getElementById('input-jumlah').value);
  const harga = parseInt(select.selectedOptions[0]?.dataset.harga || 0);
  const hint = document.getElementById('total-hint');
  if (harga && jumlah) {
    hint.innerHTML = `<div class="modal-hint">Total: <strong>${fmt(harga * jumlah)}</strong></div>`;
  } else {
    hint.innerHTML = '';
  }
}

async function submitPembelian() {
  const id_barang = parseInt(document.getElementById('input-id-barang').value);
  const jumlah = parseInt(document.getElementById('input-jumlah').value);
  if (!id_barang || !jumlah) return;
  await postPembelian({ id_barang, jumlah });
  closeModal();
  fetchAll();
}
