const API = 'http://127.0.0.1:3000';

const fmt = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

const fmtDate = (d) =>
  new Date(d).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

async function getBarang() {
  const res = await fetch(`${API}/barang`);
  return res.json();
}

async function postBarang(data) {
  await fetch(`${API}/barang`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

async function getPembelian() {
  const res = await fetch(`${API}/pembelian`);
  return res.json();
}

async function postPembelian(data) {
  await fetch(`${API}/pembelian`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

async function getLogs() {
  const res = await fetch(`${API}/logs`);
  return res.json();
}
