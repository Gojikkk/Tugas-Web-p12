function renderLogs(logs) {
  const content = document.getElementById('content');
  document.getElementById('tab-label').textContent = 'Log terbaru';

  content.innerHTML = `
    <div class="page-title">Activity logs</div>
    <div class="page-sub">Riwayat aktivitas yang tersimpan di MongoDB.</div>

    ${
      logs.length === 0
        ? `<div class="empty"><i class="ti ti-notes-off"></i><p>Belum ada log aktivitas.</p></div>`
        : `<div class="log-list">
            ${[...logs]
              .reverse()
              .map((log) => {
                const isPembelian = log.message?.toLowerCase().includes('pembelian');
                const dotColor = isPembelian ? '#2b5cc8' : '#2d7d35';
                return `
                <div class="log-row">
                  <div class="log-dot" style="background:${dotColor}"></div>
                  <div>
                    <div class="log-msg">${log.message}</div>
                    <div class="log-time">${fmtDate(log.timestamp)}</div>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>`
    }
  `;
}
