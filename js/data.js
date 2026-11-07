/**
 * ADITYA SONI - PORTFOLIO DATA STORE
 * Data definitions for interactive charts, SQL snippets, and projects
 */

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
        -- Calculate individual Debt-to-Income (DTI) ratio
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
    -- Default Rate Percentage Calculation
    ROUND(
        (SUM(CASE WHEN loan_status = 'Default' THEN 1 ELSE 0 END) * 100.0) 
        / COUNT(customer_id), 
        2
    ) AS default_rate_pct,
    -- Window function: Rank risk tiers by default rate within category
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
    """
    Cleans raw tabular records, imputes missing statistics,
    and removes extreme multivariate outliers using IQR.
    """
    df = pd.read_csv(filepath)
    print(f"[INFO] Raw shape: {df.shape}")

    # 1. Deduplicate & standardise column naming
    df = df.drop_duplicates()
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')

    # 2. Impute missing numerical features with median
    num_cols = df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        if df[col].isnull().sum() > 0:
            median_val = df[col].median()
            df[col] = df[col].fillna(median_val)

    # 3. Handle categorical missing values with mode
    cat_cols = df.select_dtypes(include=['object']).columns
    for col in cat_cols:
        df[col] = df[col].fillna('Unknown')

    # 4. Outlier clipping using Interquartile Range (IQR)
    for col in ['loan_amount', 'annual_income']:
        if col in df.columns:
            q25 = df[col].quantile(0.25)
            q75 = df[col].quantile(0.75)
            iqr = q75 - q25
            lower_bound = max(0, q25 - 1.5 * iqr)
            upper_bound = q75 + 1.5 * iqr
            # Clip extreme anomalies rather than dropping records
            df[col] = np.clip(df[col], lower_bound, upper_bound)

    # 5. Feature Engineering: Risk Score Indicator
    if 'annual_income' in df.columns and 'loan_amount' in df.columns:
        df['dti_ratio'] = (df['loan_amount'] / df['annual_income']).round(4)
        df['is_high_risk'] = np.where(df['dti_ratio'] > 0.45, 1, 0)

    print(f"[INFO] Cleaned dataset ready. Retained rows: {len(df)}")
    return df`,

    dax: `// ==========================================================
// Power BI DAX Measures for Executive BI Dashboard
// Portfolio: Loan Risk Analysis & Customer Insights
// ==========================================================

// 1. Dynamic Default Rate Percentage
Default Rate % = 
DIVIDE(
    CALCULATE(
        COUNTROWS('Loans'), 
        'Loans'[Status] = "Default"
    ),
    COUNTROWS('Loans'),
    0
)

// 2. Year-over-Year (YoY) Loan Volume Growth
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

// 3. Dynamic High-Risk Exposure Index
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
