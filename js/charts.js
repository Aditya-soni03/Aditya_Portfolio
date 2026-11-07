/**
 * ADITYA SONI - INTERACTIVE DATA VISUALIZATIONS
 * Chart.js configurations with responsive dark/light theme switching
 */

let loanChartInstance = null;
let accidentChartInstance = null;
let biRevenueChartInstance = null;
let biCategoryChartInstance = null;
let heroMiniChartInstance = null;

// Palette definitions
const chartTheme = {
  dark: {
    textColor: '#94a3b8',
    gridColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    tooltipBg: '#0f172a',
    tooltipBorder: 'rgba(59, 130, 246, 0.4)',
    tooltipText: '#f8fafc'
  },
  light: {
    textColor: '#475569',
    gridColor: 'rgba(0, 0, 0, 0.05)',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    tooltipBg: '#ffffff',
    tooltipBorder: 'rgba(59, 130, 246, 0.4)',
    tooltipText: '#0f172a'
  }
};

function getActiveTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  return currentTheme === 'light' ? chartTheme.light : chartTheme.dark;
}

// Global default options for sleek modern charts with mobile awareness
function applyChartDefaults() {
  if (typeof Chart === 'undefined') return;
  const isMobile = window.innerWidth <= 768;
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.font.size = isMobile ? 10 : 12;
  Chart.defaults.plugins.tooltip.padding = isMobile ? 8 : 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.boxPadding = isMobile ? 4 : 6;
  Chart.defaults.plugins.tooltip.usePointStyle = true;
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
}

// 1. Hero Mini Trend Sparkline
function initHeroMiniChart() {
  const ctx = document.getElementById('heroMiniChart');
  if (!ctx) return;
  const theme = getActiveTheme();

  heroMiniChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'],
      datasets: [{
        label: 'Model Accuracy (%)',
        data: [78, 82, 85, 89, 91, 94, 96, 98.4],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#06b6d4',
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: theme.tooltipBg,
          titleColor: theme.tooltipText,
          bodyColor: theme.tooltipText,
          borderColor: theme.tooltipBorder,
          borderWidth: 1
        }
      },
      scales: {
        x: {
          display: true,
          grid: { display: false },
          ticks: { color: theme.textColor, font: { size: 10 } }
        },
        y: {
          display: true,
          min: 70,
          max: 100,
          grid: { color: theme.gridColor },
          ticks: { color: theme.textColor, font: { size: 10 }, stepSize: 10 }
        }
      }
    }
  });
}

// 2. Loan Risk Interactive Chart
function initLoanRiskChart(viewType = 'creditScore') {
  const ctx = document.getElementById('loanRiskChart');
  if (!ctx) return;
  const theme = getActiveTheme();

  let labels = [];
  let defaultRates = [];
  let loanVolumes = [];

  if (viewType === 'creditScore') {
    labels = portfolioData.loanRiskData.creditScores.labels;
    defaultRates = portfolioData.loanRiskData.creditScores.defaultRates;
    loanVolumes = portfolioData.loanRiskData.creditScores.loanVolumes;
  } else if (viewType === 'purpose') {
    labels = portfolioData.loanRiskData.loanPurpose.labels;
    defaultRates = portfolioData.loanRiskData.loanPurpose.defaultRates;
    loanVolumes = portfolioData.loanRiskData.loanPurpose.loanVolumes;
  } else if (viewType === 'income') {
    labels = portfolioData.loanRiskData.incomeBrackets.labels;
    defaultRates = portfolioData.loanRiskData.incomeBrackets.defaultRates;
    loanVolumes = portfolioData.loanRiskData.incomeBrackets.loanVolumes;
  }

  if (loanChartInstance) {
    loanChartInstance.destroy();
  }

  loanChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Default Rate (%)',
          data: defaultRates,
          borderColor: '#f59e0b',
          backgroundColor: '#f59e0b',
          borderWidth: 3,
          tension: 0.25,
          yAxisID: 'y1',
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          type: 'bar',
          label: 'Loan Volume (Borrowers)',
          data: loanVolumes,
          backgroundColor: 'rgba(59, 130, 246, 0.65)',
          hoverBackgroundColor: 'rgba(59, 130, 246, 0.85)',
          borderRadius: 6,
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: { color: theme.textColor, usePointStyle: true, font: { weight: 600 } }
        },
        tooltip: {
          backgroundColor: theme.tooltipBg,
          titleColor: theme.tooltipText,
          bodyColor: theme.tooltipText,
          borderColor: theme.tooltipBorder,
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              if (context.dataset.type === 'line') {
                return ` Default Rate: ${context.parsed.y}%`;
              }
              return ` Borrowers: ${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: theme.textColor, font: { size: 11 } }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: theme.gridColor },
          ticks: { color: theme.textColor },
          title: { display: true, text: 'Borrower Count', color: theme.textColor }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            color: '#f59e0b',
            callback: value => value + '%'
          },
          title: { display: true, text: 'Default Rate (%)', color: '#f59e0b' }
        }
      }
    }
  });
}

// 3. Road Accident Interactive Chart
function initAccidentChart(viewType = 'hourly') {
  const ctx = document.getElementById('accidentChart');
  if (!ctx) return;
  const theme = getActiveTheme();

  if (accidentChartInstance) {
    accidentChartInstance.destroy();
  }

  if (viewType === 'hourly') {
    accidentChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: portfolioData.accidentData.hourly.labels,
        datasets: [
          {
            label: 'Total Incident Count',
            data: portfolioData.accidentData.hourly.accidents,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 4
          },
          {
            label: 'Casualties Recorded',
            data: portfolioData.accidentData.hourly.casualties,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.35,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { color: theme.textColor, usePointStyle: true } },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            borderColor: theme.tooltipBorder,
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: theme.textColor }
          },
          y: {
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor },
            title: { display: true, text: 'Recorded Occurrences', color: theme.textColor }
          }
        }
      }
    });
  } else if (viewType === 'weather') {
    accidentChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: portfolioData.accidentData.weather.labels,
        datasets: [{
          label: 'Severity Rate (% of accidents serious/fatal)',
          data: portfolioData.accidentData.weather.severityRate,
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(6, 182, 212, 0.7)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            borderColor: theme.tooltipBorder,
            borderWidth: 1,
            callbacks: {
              label: ctx => ` High Severity Rate: ${ctx.parsed.y}%`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: theme.textColor, font: { size: 10 } }
          },
          y: {
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor, callback: val => val + '%' },
            title: { display: true, text: 'Severe / Fatal Ratio %', color: theme.textColor }
          }
        }
      }
    });
  }
}

// 4. BI Executive Dashboard Simulator Charts
function initBIDashboardCharts(period = 'all') {
  const revCtx = document.getElementById('biRevenueChart');
  const catCtx = document.getElementById('biCategoryChart');
  if (!revCtx || !catCtx) return;

  const theme = getActiveTheme();
  const currentData = portfolioData.biSimulator[period] || portfolioData.biSimulator.all;

  // Update KPI card numbers
  const revEl = document.getElementById('bi-val-revenue');
  const revDeltaEl = document.getElementById('bi-delta-revenue');
  const convEl = document.getElementById('bi-val-conv');
  const convDeltaEl = document.getElementById('bi-delta-conv');
  const userEl = document.getElementById('bi-val-users');
  const userDeltaEl = document.getElementById('bi-delta-users');
  const clvEl = document.getElementById('bi-val-clv');
  const clvDeltaEl = document.getElementById('bi-delta-clv');

  if (revEl) revEl.textContent = currentData.revenue;
  if (revDeltaEl) revDeltaEl.textContent = currentData.revenueDelta;
  if (convEl) convEl.textContent = currentData.conversion;
  if (convDeltaEl) convDeltaEl.textContent = currentData.conversionDelta;
  if (userEl) userEl.textContent = currentData.activeUsers;
  if (userDeltaEl) userDeltaEl.textContent = currentData.activeDelta;
  if (clvEl) clvEl.textContent = currentData.clv;
  if (clvDeltaEl) clvDeltaEl.textContent = currentData.clvDelta;

  // Destroy old charts if existing
  if (biRevenueChartInstance) biRevenueChartInstance.destroy();
  if (biCategoryChartInstance) biCategoryChartInstance.destroy();

  // Monthly or Quarterly labels
  let labels = [];
  if (period === 'all') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  } else if (period === 'q1') {
    labels = ['January', 'February', 'March'];
  } else if (period === 'q2') {
    labels = ['April', 'May', 'June'];
  } else if (period === 'q3') {
    labels = ['July', 'August', 'September'];
  } else if (period === 'q4') {
    labels = ['October', 'November', 'December'];
  }

  biRevenueChartInstance = new Chart(revCtx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: 'Revenue ($K)',
          data: currentData.monthlyTrend,
          backgroundColor: 'rgba(6, 182, 212, 0.75)',
          borderRadius: 6
        },
        {
          type: 'line',
          label: 'Target ($K)',
          data: currentData.monthlyTrend.map(v => Math.round(v * 0.94)),
          borderColor: '#10b981',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { color: theme.textColor, usePointStyle: true } },
        tooltip: {
          backgroundColor: theme.tooltipBg,
          titleColor: theme.tooltipText,
          bodyColor: theme.tooltipText,
          borderColor: theme.tooltipBorder,
          borderWidth: 1,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: $${ctx.parsed.y}K`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: theme.textColor }
        },
        y: {
          grid: { color: theme.gridColor },
          ticks: { color: theme.textColor, callback: val => '$' + val + 'K' }
        }
      }
    }
  });

  biCategoryChartInstance = new Chart(catCtx, {
    type: 'doughnut',
    data: {
      labels: ['Enterprise BI', 'Fintech Analytics', 'Retail & CRM', 'Operations'],
      datasets: [{
        data: currentData.categories,
        backgroundColor: [
          '#3b82f6',
          '#06b6d4',
          '#10b981',
          '#8b5cf6'
        ],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: theme.textColor, usePointStyle: true, boxWidth: 8, font: { size: 10 } }
        },
        tooltip: {
          backgroundColor: theme.tooltipBg,
          titleColor: theme.tooltipText,
          bodyColor: theme.tooltipText,
          borderColor: theme.tooltipBorder,
          borderWidth: 1,
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed}%`
          }
        }
      }
    }
  });
}

// Function to refresh all charts on theme change
function updateAllChartsTheme() {
  initHeroMiniChart();
  initLoanRiskChart('creditScore');
  initAccidentChart('hourly');
  initBIDashboardCharts('all');
}

window.addEventListener('DOMContentLoaded', () => {
  applyChartDefaults();
  initHeroMiniChart();
  initLoanRiskChart('creditScore');
  initAccidentChart('hourly');
  initBIDashboardCharts('all');
});

// Orientation and responsive resize handler
let chartResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(chartResizeTimer);
  chartResizeTimer = setTimeout(() => {
    applyChartDefaults();
  }, 250);
});
