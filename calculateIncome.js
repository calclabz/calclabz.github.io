let cachedRates = null;
let lastFetched = null;

async function getExchangeRates() {
    if (cachedRates && lastFetched && (Date.now() - lastFetched < 86400000)) {
        return cachedRates;
    }
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        cachedRates = data.rates;
        lastFetched = Date.now();
        return cachedRates;
    } catch (error) {
        return { GBP: 0.79, CAD: 1.36, INR: 91.08 };
    }
}

let selectPeriod = "monthly";

function setPeriod(period) {
    selectPeriod = period;
    document.getElementById("monthlyBtn").classList.toggle("active", period === "monthly");
    document.getElementById("annualBtn").classList.toggle("active", period === "annual");
}

async function calculateIncome() {
    const views = Math.floor(parseFloat(document.getElementById("views").value)) || 0;
    const niche = document.getElementById("niche").value;
    const country = document.getElementById("country").value;
    const format = document.getElementById("format").value;

    if (views <= 0) {
        document.getElementById("result").innerText = "Please enter valid views!";
        return;
    }

    const baseRPM = {
        finance: 22.5, technology: 14, education: 11.5,
        health: 9.5, travel: 7.5, diy: 6.5, fashion: 5.5,
        sports: 4.5, food: 4.5, cooking: 4.5, news: 3.5,
        entertainment: 3, gaming: 3.5, comedy: 2.5,
        music: 2, animation: 2
    };

    const countryMultiplier = {
        usa: 1.0, uk: 0.85, canada: 0.8, india: 0.07
    };

    const currencyConfig = {
        usa: { symbol: "$", code: "USD", key: "USD" },
        uk: { symbol: "£", code: "GBP", key: "GBP", locale: "en-GB" },
        canada: { symbol: "CA$", code: "CAD", key: "CAD", locale: "en-CA" },
        india: { symbol: "₹", code: "INR", key: "INR", locale: "en-IN" }
    };

    // Live rates fetch 
    const rates = await getExchangeRates();
    const currency = currencyConfig[country];
    const liveRate = country === "usa" ? 1.0 : (rates[currency.key] || 1);

    const customRpmEl = document.getElementById("customRpm");
    const customRPM = customRpmEl ? parseFloat(customRpmEl.value) : 0;
    let finalRPM = customRPM > 0 ? customRPM : (baseRPM[niche] || 4.0) * (countryMultiplier[country] || 0.1);

    if (format === "shorts") {
        finalRPM = finalRPM * 0.1;
    }

    const monthlyUSD = (views / 1000) * finalRPM;
    const incomeUSD = selectPeriod === "annual" ? monthlyUSD * 12 : monthlyUSD;
    const convertedIncome = incomeUSD * liveRate;
    const resultElement = document.getElementById("result");

    if (country === "usa") {
        animateCounter(resultElement, 0, incomeUSD, 1500, "$");
    } else {
        animateCounter(resultElement, 0, convertedIncome, 1500,
            "$" + incomeUSD.toFixed(2) + " | " + currency.symbol);
    }

    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("rpm-info").innerText =
        "Estimated RPM: $" + finalRPM.toFixed(3) +
        " | " + (selectPeriod === "annual" ? "Annual" : "Monthly") + " Earnings" +
        (country !== "usa" ? " | Live Rate: " + liveRate.toFixed(2) : "");
}

function animateCounter(element, start, end, duration, prefix) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (range * easeOut);

        element.innerText = prefix + current.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    answer.classList.toggle('closed');
    
    // Icon change karo
    const icon = button.querySelector('.faq-icon');
    if (icon) {
        icon.textContent = answer.classList.contains('closed') ? '+' : '−';
    }
}
