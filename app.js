/**
 * ==========================================================================
 * ADITYA SONI - MASTER UNIFIED SCRIPT (app.js)
 * Combines data models, interactive Chart.js visualizations, mobile customizer,
 * off-canvas drawer, swipe gestures, and theme management into one file.
 * ==========================================================================
 */

/* ==========================================================
   PART 1: DATA STORE & PRODUCTION CODE SNIPPETS
   ========================================================== */
const portfolioData = {
  profile: {
    name: "Aditya Soni",
    title: "Data Analyst & Business Intelligence Specialist",
    location: "Satna, Madhya Pradesh, India",
    email: "adityasoni852452@gmail.com",
    phone: "+91-9522593749",
    linkedin: "https://www.linkedin.com/in/aditya-soni-398a10325",
    github: "https://github.com/Aditya-soni03",
    repo: "https://github.com/Aditya-soni03/Aditya_Portfolio",
    bio: "Data Analyst Intern with an MCA degree (81%) and a strong foundation in Mathematics & Statistics (B.Sc.). Hands-on with SQL, Python, Excel, Power BI, and Tableau to clean, analyze, and visualize data, turning raw datasets into actionable insights that drive business decisions.",
    stats: {
      datasetsAnalyzed: "25+",
      dashboardsBuilt: "15+",
      mcaDistinction: "81%",
      queryOptimization: "35%"
    }
  },

  loanRiskData: {
    creditScores: {
      labels: ['300-579 (Poor)', '580-669 (Fair)', '670-739 (Good)', '740-799 (Very Good)', '800-850 (Exceptional)'],
      defaultRates: [31.4, 16.8, 6.2, 2.4, 0.9],
      loanVolumes: [420, 1150, 2480, 1820, 930]
    },
    loanPurpose: {
      labels: ['Debt Consolidation', 'Small Business', 'Home Improvement', 'Major Purchase', 'Auto Loan', 'Medical'],
      defaultRates: [18.2, 24.5, 9.4, 7.8, 11.2, 14.6],
      loanVolumes: [2800, 890, 1250, 740, 980, 540]
    },
    incomeBrackets: {
      labels: ['< $35K', '$35K-$60K', '$60K-$90K', '$90K-$120K', '$120K+'],
      defaultRates: [26.8, 15.4, 8.7, 4.2, 1.8],
      loanVolumes: [1450, 2300, 1900, 950, 600]
    }
  },

  accidentData: {
    hourly: {
      labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      accidents: [142, 68, 230, 780, 620, 890, 1240, 670],
      casualties: [45, 18, 55, 142, 110, 175, 290, 135]
    },
    weather: {
      labels: ['Fine / Clear', 'Raining without High Winds', 'Raining with High Winds', 'Fog / Mist', 'Snowing'],
      count: [4820, 1650, 430, 210, 95],
      severityRate: [14.2, 23.8, 31.4, 28.6, 34.0]
    },
    severity: {
      labels: ['Slight Injury (74.2%)', 'Serious Injury (22.5%)', 'Fatal Accident (3.3%)'],
      values: [74.2, 22.5, 3.3]
    }
  },

  biSimulator: {
    all: {
      revenue: "$1.48M",
      revenueDelta: "+14.2%",
      conversion: "3.85%",
      conversionDelta: "+0.6%",
      activeUsers: "42,850",
      activeDelta: "+8.9%",
      clv: "$1,820",
      clvDelta: "+5.1%",
      monthlyTrend: [92, 105, 118, 112, 134, 148, 162, 158, 175, 192, 210, 235],
      categories: [38, 26, 21, 15]
    },
    q1: {
      revenue: "$315K",
      revenueDelta: "+9.8%",
      conversion: "3.40%",
      conversionDelta: "+0.2%",
      activeUsers: "34,200",
      activeDelta: "+5.4%",
      clv: "$1,710",
      clvDelta: "+3.2%",
      monthlyTrend: [92, 105, 118],
      categories: [35, 28, 22, 15]
    },
    q2: {
      revenue: "$394K",
      revenueDelta: "+12.1%",
      conversion: "3.65%",
      conversionDelta: "+0.5%",
      activeUsers: "38,400",
      activeDelta: "+7.1%",
      clv: "$1,760",
      clvDelta: "+4.0%",
      monthlyTrend: [112, 134, 148],
      categories: [37, 27, 21, 15]
    },
    q3: {
      revenue: "$495K",
      revenueDelta: "+16.4%",
      conversion: "3.95%",
      conversionDelta: "+0.8%",
      activeUsers: "43,100",
      activeDelta: "+11.2%",
      clv: "$1,840",
      clvDelta: "+6.3%",
      monthlyTrend: [162, 158, 175],
      categories: [40, 25, 20, 15]
    },
    q4: {
      revenue: "$637K",
      revenueDelta: "+18.9%",
      conversion: "4.20%",
      conversionDelta: "+1.1%",
      activeUsers: "48,900",
      activeDelta: "+14.5%",
      clv: "$1,930",
      clvDelta: "+7.8%",
      monthlyTrend: [192, 210, 235],
      categories: [42, 24, 20, 14]
    }
  },

  codeSnippets: {
    sql: `-- ==========================================================
-- Customer Loan Risk Profiling & Default Rate Window Query
-- Demonstrates: CTEs, Window Aggregations, Conditional Filtering
-- ==========================================================

WITH CustomerRiskMetrics AS (
    SELECT 
        c.customer_id,
        c.credit_score,
        c.annual_income,
        l.loan_amount,
        l.loan_purpose,
        l.loan_status,
        ROUND((l.loan_amount / NULLIF(c.annual_income, 0)) * 100, 2) AS dti_ratio,
        CASE 
            WHEN c.credit_score >= 740 THEN 'Tier 1 - Low Risk'
            WHEN c.credit_score >= 670 THEN 'Tier 2 - Moderate Risk'
            WHEN c.credit_score >= 580 THEN 'Tier 3 - Subprime'
            ELSE 'Tier 4 - High Risk'
        END AS risk_tier
    FROM customers c
    INNER JOIN loan_records l ON c.customer_id = l.customer_id
    WHERE l.issue_year >= 2024
)
SELECT 
    risk_tier,
    loan_purpose,
    COUNT(customer_id) AS total_borrowers,
    ROUND(AVG(loan_amount), 2) AS avg_principal,
    ROUND(AVG(dti_ratio), 2) AS avg_dti,
    ROUND(
        (SUM(CASE WHEN loan_status = 'Default' THEN 1 ELSE 0 END) * 100.0) 
        / COUNT(customer_id), 
        2
    ) AS default_rate_pct,
    DENSE_RANK() OVER (
        PARTITION BY loan_purpose 
        ORDER BY (SUM(CASE WHEN loan_status = 'Default' THEN 1 ELSE 0 END) * 1.0) / COUNT(customer_id) DESC
    ) AS category_risk_rank
FROM CustomerRiskMetrics
GROUP BY risk_tier, loan_purpose
HAVING COUNT(customer_id) >= 20
ORDER BY default_rate_pct DESC;`,

    python: `# ==========================================================
# Automated EDA & Outlier Detection Pipeline
# Library: Pandas, NumPy, Scikit-learn
# ==========================================================

import pandas as pd
import numpy as np

def clean_and_profile_dataset(filepath: str) -> pd.DataFrame:
    df = pd.read_csv(filepath)
    df = df.drop_duplicates()
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')

    num_cols = df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        if df[col].isnull().sum() > 0:
            df[col] = df[col].fillna(df[col].median())

    cat_cols = df.select_dtypes(include=['object']).columns
    for col in cat_cols:
        df[col] = df[col].fillna('Unknown')

    for col in ['loan_amount', 'annual_income']:
        if col in df.columns:
            q25 = df[col].quantile(0.25)
            q75 = df[col].quantile(0.75)
            iqr = q75 - q25
            lower_bound = max(0, q25 - 1.5 * iqr)
            upper_bound = q75 + 1.5 * iqr
            df[col] = np.clip(df[col], lower_bound, upper_bound)

    if 'annual_income' in df.columns and 'loan_amount' in df.columns:
        df['dti_ratio'] = (df['loan_amount'] / df['annual_income']).round(4)
        df['is_high_risk'] = np.where(df['dti_ratio'] > 0.45, 1, 0)

    return df`,

    dax: `// ==========================================================
// Power BI DAX Measures for Executive BI Dashboard
// ==========================================================

Default Rate % = 
DIVIDE(
    CALCULATE(
        COUNTROWS('Loans'), 
        'Loans'[Status] = "Default"
    ),
    COUNTROWS('Loans'),
    0
)

Loan Volume YoY Growth % = 
VAR CurrentYearVolume = [Total Loan Volume]
VAR PreviousYearVolume = 
    CALCULATE(
        [Total Loan Volume], 
        SAMEPERIODLASTYEAR('Calendar'[Date])
    )
RETURN
    DIVIDE(
        CurrentYearVolume - PreviousYearVolume,
        PreviousYearVolume,
        BLANK()
    )

Risk Exposure Amount = 
SUMX(
    FILTER(
        'Loans',
        'Loans'[Credit Score] < 620 && 'Loans'[DTI Ratio] > 0.40
    ),
    'Loans'[Disbursed Amount]
)`
  }
};

/* ==========================================================
   PART 2: INTERACTIVE CHART.JS CONTROLLERS
   ========================================================== */
let loanChartInstance = null;
let accidentChartInstance = null;
let biRevenueChartInstance = null;
let biCategoryChartInstance = null;
let heroMiniChartInstance = null;

const chartTheme = {
  dark: {
    textColor: '#94a3b8',
    gridColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    tooltipBg: '#0f172a',
    tooltipBorder: 'rgba(59, 130, 246, 0.4)',
    tooltipText: '#f8fafc'
  },
  oled: {
    textColor: '#a1a1aa',
    gridColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    tooltipBg: '#050505',
    tooltipBorder: 'rgba(59, 130, 246, 0.6)',
    tooltipText: '#ffffff'
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
  return chartTheme[currentTheme] || chartTheme.dark;
}

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

function initHeroMiniChart() {
  const ctx = document.getElementById('heroMiniChart');
  if (!ctx) return;
  const theme = getActiveTheme();

  heroMiniChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'],
      datasets: [{
        label: 'Accuracy (%)',
        data: [78, 82, 85, 89, 91, 94, 96, 98.4],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.12)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#06b6d4'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: true, grid: { display: false }, ticks: { color: theme.textColor, font: { size: 10 } } },
        y: { display: true, min: 70, max: 100, grid: { color: theme.gridColor }, ticks: { color: theme.textColor, font: { size: 10 } } }
      }
    }
  });
}

function initLoanRiskChart(viewType = 'creditScore') {
  const ctx = document.getElementById('loanRiskChart');
  if (!ctx) return;
  const theme = getActiveTheme();

  let labels = [], defaultRates = [], loanVolumes = [];
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

  if (loanChartInstance) loanChartInstance.destroy();

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
          pointRadius: 5
        },
        {
          type: 'bar',
          label: 'Borrowers',
          data: loanVolumes,
          backgroundColor: 'rgba(59, 130, 246, 0.65)',
          borderRadius: 6,
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { color: theme.textColor, usePointStyle: true } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: theme.textColor } },
        y: { type: 'linear', position: 'left', grid: { color: theme.gridColor }, ticks: { color: theme.textColor } },
        y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#f59e0b', callback: v => v + '%' } }
      }
    }
  });
}

function initAccidentChart(viewType = 'hourly') {
  const ctx = document.getElementById('accidentChart');
  if (!ctx) return;
  const theme = getActiveTheme();

  if (accidentChartInstance) accidentChartInstance.destroy();

  if (viewType === 'hourly') {
    accidentChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: portfolioData.accidentData.hourly.labels,
        datasets: [
          {
            label: 'Incidents',
            data: portfolioData.accidentData.hourly.accidents,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            borderWidth: 3,
            fill: true,
            tension: 0.35
          },
          {
            label: 'Casualties',
            data: portfolioData.accidentData.hourly.casualties,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            borderWidth: 2,
            tension: 0.35
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { color: theme.textColor, usePointStyle: true } } },
        scales: {
          x: { grid: { display: false }, ticks: { color: theme.textColor } },
          y: { grid: { color: theme.gridColor }, ticks: { color: theme.textColor } }
        }
      }
    });
  } else if (viewType === 'weather') {
    accidentChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: portfolioData.accidentData.weather.labels,
        datasets: [{
          label: 'Severity Rate %',
          data: portfolioData.accidentData.weather.severityRate,
          backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(6, 182, 212, 0.7)', 'rgba(245, 158, 11, 0.8)', 'rgba(139, 92, 246, 0.7)', 'rgba(239, 68, 68, 0.8)'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: theme.textColor, font: { size: 10 } } },
          y: { grid: { color: theme.gridColor }, ticks: { color: theme.textColor, callback: v => v + '%' } }
        }
      }
    });
  }
}

function initBIDashboardCharts(period = 'all') {
  const revCtx = document.getElementById('biRevenueChart');
  const catCtx = document.getElementById('biCategoryChart');
  if (!revCtx || !catCtx) return;

  const theme = getActiveTheme();
  const currentData = portfolioData.biSimulator[period] || portfolioData.biSimulator.all;

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

  if (biRevenueChartInstance) biRevenueChartInstance.destroy();
  if (biCategoryChartInstance) biCategoryChartInstance.destroy();

  let labels = period === 'all' 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : period === 'q1' ? ['Jan', 'Feb', 'Mar']
    : period === 'q2' ? ['Apr', 'May', 'Jun']
    : period === 'q3' ? ['Jul', 'Aug', 'Sep'] : ['Oct', 'Nov', 'Dec'];

  biRevenueChartInstance = new Chart(revCtx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { type: 'bar', label: 'Revenue ($K)', data: currentData.monthlyTrend, backgroundColor: 'rgba(6, 182, 212, 0.75)', borderRadius: 6 },
        { type: 'line', label: 'Target ($K)', data: currentData.monthlyTrend.map(v => Math.round(v * 0.94)), borderColor: '#10b981', borderDash: [5, 5], tension: 0.2 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { color: theme.textColor, usePointStyle: true } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: theme.textColor } },
        y: { grid: { color: theme.gridColor }, ticks: { color: theme.textColor, callback: v => '$' + v + 'K' } }
      }
    }
  });

  biCategoryChartInstance = new Chart(catCtx, {
    type: 'doughnut',
    data: {
      labels: ['Enterprise BI', 'Fintech', 'Retail CRM', 'Operations'],
      datasets: [{
        data: currentData.categories,
        backgroundColor: ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { position: 'bottom', labels: { color: theme.textColor, usePointStyle: true, font: { size: 10 } } }
      }
    }
  });
}

function updateAllChartsTheme() {
  initHeroMiniChart();
  initLoanRiskChart('creditScore');
  initAccidentChart('hourly');
  initBIDashboardCharts('all');
}

/* ==========================================================
   PART 3: CORE APPLICATION & MOBILE SUITE LOGIC
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDataGridCanvas();
  initTypewriter();
  initScrollSpy();
  initCounters();
  initProjectFilters();
  initChartControls();
  initCodeViewer();
  initContactForm();
  initResumeModal();
  initMobileNavigation();
  initMobileCustomizer();
  initQrModal();
  initMobileAutoDetect();

  applyChartDefaults();
  initHeroMiniChart();
  initLoanRiskChart('creditScore');
  initAccidentChart('hourly');
  initBIDashboardCharts('all');
});

// Resize & Orientation Listener
let resizeTimeout = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    applyChartDefaults();
  }, 250);
});

function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('as_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateMobileThemeColor(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('as_theme', nextTheme);
      updateMobileThemeColor(nextTheme);

      updateAllChartsTheme();
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

function updateMobileThemeColor(theme) {
  const themeMeta = document.getElementById('themeColorMeta');
  if (themeMeta) {
    themeMeta.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0a0f1d');
  }
}

function initDataGridCanvas() {
  const canvas = document.getElementById('data-grid-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  const totalNodes = Math.min(45, Math.floor(width / 35));

  for (let i = 0; i < totalNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nodeColor = isLight ? 'rgba(59, 130, 246, 0.4)' : 'rgba(56, 189, 248, 0.4)';
    const lineColor = isLight ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.12)';

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - dist / 130;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

function initTypewriter() {
  const target = document.getElementById('typewriterText');
  if (!target) return;

  const roles = [
    "Data Analyst",
    "Business Intelligence Specialist",
    "Python & SQL Developer",
    "Statistical Problem Solver",
    "Dashboard Architect"
  ];

  let roleIdx = 0, charIdx = 0, isDeleting = false, delay = 120;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 60;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 120;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

function initScrollSpy() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-item');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (navbar) {
      if (scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });

        dockItems.forEach(item => {
          const target = item.getAttribute('data-section');
          item.classList.toggle('active', target === id || (id === 'about' && target === 'hero'));
        });

        drawerLinks.forEach(dlink => {
          dlink.classList.toggle('active', dlink.getAttribute('href') === `#${id}`);
        });
      }
    });
  });
}

function initCounters() {
  const countElements = document.querySelectorAll('[data-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        countElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-counter'));
          const duration = 1600;
          const isDecimal = target % 1 !== 0;
          let startTime = null;

          function animateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * target;

            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

            if (progress < 1) requestAnimationFrame(animateCount);
            else el.textContent = target;
          }

          requestAnimationFrame(animateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) observer.observe(statsSection);
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('[data-project-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-project-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initChartControls() {
  const loanBtns = document.querySelectorAll('[data-loan-view]');
  loanBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      loanBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      initLoanRiskChart(btn.getAttribute('data-loan-view'));
    });
  });

  const accBtns = document.querySelectorAll('[data-accident-view]');
  accBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      accBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      initAccidentChart(btn.getAttribute('data-accident-view'));
    });
  });

  const biSelect = document.getElementById('biQuarterSelect');
  if (biSelect) {
    biSelect.addEventListener('change', (e) => {
      initBIDashboardCharts(e.target.value);
    });
  }
}

function initCodeViewer() {
  const codeBtns = document.querySelectorAll('.code-tab-btn');
  const codeBody = document.getElementById('codeDisplayBody');
  const codeDesc = document.getElementById('codeDescText');
  const copyBtn = document.getElementById('copyCodeBtn');

  const descriptions = {
    sql: "Production MySQL CTE query aggregating borrower credit scores, calculating DTI, and computing default rates partitioned by loan purpose.",
    python: "Python data cleaning pipeline utilizing Pandas & NumPy with median/mode imputation and Interquartile Range (IQR) outlier clipping.",
    dax: "Power BI DAX measures for calculating real-time Loan Default %, Year-over-Year (YoY) volume trends, and risk index exposure."
  };

  codeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      codeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const lang = btn.getAttribute('data-code-lang');
      if (portfolioData && portfolioData.codeSnippets[lang]) {
        if (codeBody) codeBody.textContent = portfolioData.codeSnippets[lang];
        if (codeDesc) codeDesc.textContent = descriptions[lang] || '';
      }
    });
  });

  if (codeBody && portfolioData.codeSnippets.sql) {
    codeBody.textContent = portfolioData.codeSnippets.sql;
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = codeBody ? codeBody.textContent : '';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Code copied to clipboard!");
      });
    });
  }
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields", true);
        return;
      }

      const mailtoLink = `mailto:adityasoni852452@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${subject || 'Data Analyst Opportunity'} from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoLink;
      showToast("Opening your email client to connect with Aditya!");
      form.reset();
    });
  }

  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText("adityasoni852452@gmail.com").then(() => {
        showToast("Email address copied: adityasoni852452@gmail.com");
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText("+919522593749").then(() => {
        showToast("Phone number copied: +91 9522593749");
      });
    });
  }
}

function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('viewResumeBtn');
  const closeBtn = document.getElementById('closeResumeModalBtn');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawerNav');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const dockItems = document.querySelectorAll('.dock-item');

  function openDrawer() {
    if (drawer && backdrop) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) closeDrawer();
  });

  let touchStartX = 0;
  if (drawer) {
    drawer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    drawer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX - touchStartX > 50) closeDrawer();
    }, { passive: true });
  }

  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      dockItems.forEach(di => di.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function triggerMobileHaptic(duration = 15) {
  const isEnabled = localStorage.getItem('as_haptics') !== 'false';
  if (isEnabled && 'vibrate' in navigator) {
    try { navigator.vibrate(duration); } catch (e) {}
  }
}

function initMobileCustomizer() {
  const modal = document.getElementById('mobileCustomizerModal');
  const triggerBtns = [
    document.getElementById('mobileCustomizeTriggerBtn'),
    document.getElementById('dockCustomizeBtn'),
    document.getElementById('openMobilePreviewBtn')
  ];
  const closeBtn = document.getElementById('closeCustomizerModalBtn');
  const resetBtn = document.getElementById('resetCustomizerBtn');
  const modalShareBtn = document.getElementById('modalShareBtn');
  const fabShareBtn = document.getElementById('mobileShareBtn');

  const savedFont = localStorage.getItem('as_font_scale') || 'medium';
  const savedDensity = localStorage.getItem('as_density') || 'standard';
  const savedTheme = localStorage.getItem('as_theme') || 'dark';
  const savedHaptics = localStorage.getItem('as_haptics') !== 'false';

  document.documentElement.setAttribute('data-font-scale', savedFont);
  document.body.setAttribute('data-density', savedDensity);

  document.querySelectorAll('[data-font-scale]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-font-scale') === savedFont);
  });
  document.querySelectorAll('[data-density-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-density-mode') === savedDensity);
  });
  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === savedTheme);
  });

  const hapticToggle = document.getElementById('hapticToggleCheck');
  if (hapticToggle) hapticToggle.checked = savedHaptics;

  function openCustomizer() {
    triggerMobileHaptic(20);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCustomizer() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  triggerBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCustomizer();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCustomizer);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCustomizer();
    });
  }

  document.querySelectorAll('[data-font-scale]').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerMobileHaptic();
      const scale = btn.getAttribute('data-font-scale');
      document.documentElement.setAttribute('data-font-scale', scale);
      localStorage.setItem('as_font_scale', scale);
      document.querySelectorAll('[data-font-scale]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Font scaled to: ${btn.querySelector('span').textContent}`);
    });
  });

  document.querySelectorAll('[data-density-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerMobileHaptic();
      const mode = btn.getAttribute('data-density-mode');
      document.body.setAttribute('data-density', mode);
      localStorage.setItem('as_density', mode);
      document.querySelectorAll('[data-density-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(mode === 'compact' ? "⚡ Switched to Fast Executive Summary" : "📊 Switched to Full Visuals");
    });
  });

  document.querySelectorAll('[data-theme-choice]').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerMobileHaptic();
      const choice = btn.getAttribute('data-theme-choice');
      document.documentElement.setAttribute('data-theme', choice);
      localStorage.setItem('as_theme', choice);
      updateMobileThemeColor(choice);
      document.querySelectorAll('[data-theme-choice]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateAllChartsTheme();
      showToast(`Theme updated: ${btn.querySelector('span').textContent}`);
    });
  });

  if (hapticToggle) {
    hapticToggle.addEventListener('change', () => {
      localStorage.setItem('as_haptics', hapticToggle.checked);
      if (hapticToggle.checked) triggerMobileHaptic(30);
      showToast(hapticToggle.checked ? "Haptic vibration enabled" : "Haptic vibration disabled");
    });
  }

  function handleNativeShare() {
    triggerMobileHaptic(20);
    const shareData = {
      title: "Aditya Soni - Data Analyst Portfolio",
      text: "Explore Aditya Soni's Data Analyst & BI Portfolio with interactive dashboards!",
      url: window.location.href.split('#')[0]
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        showToast("Portfolio link copied to clipboard!");
      });
    }
  }

  if (modalShareBtn) modalShareBtn.addEventListener('click', handleNativeShare);
  if (fabShareBtn) fabShareBtn.addEventListener('click', handleNativeShare);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      triggerMobileHaptic(25);
      document.documentElement.setAttribute('data-font-scale', 'medium');
      document.body.setAttribute('data-density', 'standard');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.removeItem('as_font_scale');
      localStorage.removeItem('as_density');
      localStorage.removeItem('as_theme');
      localStorage.removeItem('as_haptics');
      if (hapticToggle) hapticToggle.checked = true;

      document.querySelectorAll('[data-font-scale]').forEach(b => b.classList.toggle('active', b.getAttribute('data-font-scale') === 'medium'));
      document.querySelectorAll('[data-density-mode]').forEach(b => b.classList.toggle('active', b.getAttribute('data-density-mode') === 'standard'));
      document.querySelectorAll('[data-theme-choice]').forEach(b => b.classList.toggle('active', b.getAttribute('data-theme-choice') === 'dark'));

      updateAllChartsTheme();
      showToast("Reset to default mobile settings");
    });
  }
}

function initQrModal() {
  const modal = document.getElementById('qrModal');
  const openBtn = document.getElementById('openMobileModalBtn');
  const closeBtn = document.getElementById('closeQrModalBtn');
  const copyBtn = document.getElementById('copySiteUrlBtn');
  const qrImage = document.getElementById('qrCodeImage');

  const targetLiveUrl = window.location.protocol === 'file:' 
    ? 'https://aditya-soni03.github.io/Aditya_Portfolio/' 
    : window.location.href.split('#')[0];

  if (qrImage) {
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetLiveUrl)}`;
  }

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  function closeQr() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeQr);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQr();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(targetLiveUrl).then(() => {
        showToast("Live link copied to clipboard!");
      });
    });
  }
}

function initMobileAutoDetect() {
  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.documentElement.classList.add('mobile-detected');
    const pill = document.getElementById('mobileWelcomePill');
    const isDismissed = sessionStorage.getItem('as_mobile_pill_dismissed');
    if (pill && !isDismissed) {
      pill.style.display = 'flex';
      setTimeout(() => pill.classList.add('visible'), 250);
    }
  }

  const dismissBtn = document.getElementById('dismissMobilePill');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      const pill = document.getElementById('mobileWelcomePill');
      if (pill) {
        pill.classList.remove('visible');
        setTimeout(() => { pill.style.display = 'none'; }, 350);
        sessionStorage.setItem('as_mobile_pill_dismissed', 'true');
      }
    });
  }

  setupSwipeableChart('loanRiskChart', ['creditScore', 'purpose', 'income'], (nextView) => {
    const loanBtns = document.querySelectorAll('[data-loan-view]');
    loanBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-loan-view') === nextView));
    initLoanRiskChart(nextView);
    triggerMobileHaptic(15);
    showToast(`Swiped view: ${nextView}`);
  });

  setupSwipeableChart('accidentChart', ['hourly', 'weather'], (nextView) => {
    const accBtns = document.querySelectorAll('[data-accident-view]');
    accBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-accident-view') === nextView));
    initAccidentChart(nextView);
    triggerMobileHaptic(15);
    showToast(`Swiped view: ${nextView}`);
  });
}

function setupSwipeableChart(canvasId, views, callback) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  let startX = 0, currentIdx = 0;

  canvas.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  canvas.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].screenX;
    const diff = endX - startX;

    if (Math.abs(diff) > 45) {
      if (diff < 0) currentIdx = (currentIdx + 1) % views.length;
      else currentIdx = (currentIdx - 1 + views.length) % views.length;
      callback(views[currentIdx]);
    }
  }, { passive: true });
}

function showToast(message, isError = false) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i class="${isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}" style="color: ${isError ? '#ef4444' : '#10b981'};"></i>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
