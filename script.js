// LOADING SCREEN
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }, 500);
    }, 2000);
});

// THEME SWITCHER
function setTheme(themeName) {
    document.body.classList.remove('theme-klasik', 'theme-hangat', 'theme-gelap');
    document.body.classList.add(`theme-${themeName}`);
    localStorage.setItem('preferred-theme', themeName);
}

const savedTheme = localStorage.getItem('preferred-theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('klasik');
}

document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        setTheme(theme);
    });
});

// COLLAPSE SECTIONS
document.querySelectorAll('.collapse-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.classList.toggle('active');
        btn.innerHTML = content.classList.contains('active') ? btn.innerHTML.replace('Klik untuk lihat', 'Klik untuk tutup') : btn.innerHTML.replace('Klik untuk tutup', 'Klik untuk lihat');
    });
});

// GRAFIK PERTUMBUHAN (Fase Chlorella)
const ctx = document.getElementById('growthChart')?.getContext('2d');
if (ctx) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['H0', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14'],
            datasets: [{
                label: 'Kepadatan (×10⁶ sel/mL)',
                data: [0.2, 0.21, 0.25, 0.4, 0.8, 1.6, 3.2, 6.4, 10, 12, 12.5, 12, 10, 7, 4],
                borderColor: '#0056B3',
                backgroundColor: 'rgba(0,86,179,0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            let value = context.raw;
                            return `${label}: ${value} ×10⁶ sel/mL`;
                        }
                    }
                },
                annotation: {
                    annotations: {
                        box1: {
                            type: 'box',
                            xMin: 1,
                            xMax: 7,
                            yMin: 0,
                            yMax: 14,
                            backgroundColor: 'rgba(40, 167, 69, 0.1)',
                            borderColor: 'rgba(40, 167, 69, 0.5)',
                            label: {
                                content: '📈 FASE EKSPONENSIAL (PANEN)',
                                enabled: true,
                                position: 'top'
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Juta sel / mL'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Hari Kultur'
                    }
                }
            }
        }
    });
}

// DASHBOARD DATA
const dashboardData = [
    { name: 'Chlorella', icon: 'fa-leaf', value: '12M sel/mL', color: '#28a745', progress: 85, status: 'Eksponensial 🟢' },
    { name: 'Nannochloropsis', icon: 'fa-water', value: '8M sel/mL', color: '#20c997', progress: 70, status: 'Eksponensial 🟢' },
    { name: 'Spirulina', icon: 'fa-spiral', value: '0.8 g/L', color: '#17a2b8', progress: 65, status: 'Log phase 🟢' },
    { name: 'Rotifera', icon: 'fa-bug', value: '250 ind/mL', color: '#fd7e14', progress: 80, status: 'Mendekati stasioner 🟡' },
    { name: 'Artemia', icon: 'fa-shrimp', value: 'Hatching 78%', color: '#e83e8c', progress: 78, status: 'Optimal 🟢' },
    { name: 'Daphnia', icon: 'fa-fish', value: '120 ind/L', color: '#6f42c1', progress: 55, status: 'Lag phase 🟡' }
];

const dashboardGrid = document.getElementById('dashboard-grid');
if (dashboardGrid) {
    dashboardData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dash-card';
        card.innerHTML = `
            <div class="dash-icon"><i class="fa-solid ${item.icon}"></i></div>
            <div class="dash-title">${item.name}</div>
            <div class="dash-value">${item.value}</div>
            <div class="dash-progress">
                <div class="dash-progress-fill" style="width: ${item.progress}%; background: ${item.color};"></div>
            </div>
            <div class="dash-status">
                <i class="fa-solid fa-circle" style="color: ${item.progress > 70 ? '#28a745' : (item.progress > 50 ? '#ffc107' : '#dc3545')}; font-size: 10px;"></i>
                ${item.status}
            </div>
        `;
        dashboardGrid.appendChild(card);
    });
}

// PERBAIKAN UNTUK COLLAPSE BUTTON (agar teks berubah)
document.querySelectorAll('.collapse-section').forEach(section => {
    const btn = section.querySelector('.collapse-btn');
    const content = section.querySelector('.collapse-content');
    if (btn && content) {
        const originalText = btn.innerHTML;
        btn.addEventListener('click', () => {
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                btn.innerHTML = originalText.replace('Klik untuk tutup', 'Klik untuk lihat');
            } else {
                content.classList.add('active');
                btn.innerHTML = originalText.replace('Klik untuk lihat', 'Klik untuk tutup');
            }
        });
    }
});