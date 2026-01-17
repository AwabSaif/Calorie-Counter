const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
const langButtons = document.querySelectorAll('.lang-btn');

let currentLang = localStorage.getItem('lang') || 'en';
let isError = false;

const i18n = {
  en: {
    pageTitle: "Calorie Counter",
    mainHeading: "Calorie Counter",
    labelBudget: "Daily Budget",
    legendBreakfast: "Breakfast",
    legendLunch: "Lunch",
    legendDinner: "Dinner",
    legendSnacks: "Snacks",
    legendExercise: "Exercise",
    btnCalculate: "Calculate Balance",
    btnClear: "Reset",
    entryName: "Entry Name",
    entryCalories: "Calories",
    invalidInput: "Invalid Input: ",
    budgeted: "Budgeted",
    consumed: "Consumed",
    burned: "Burned",
    surplus: "Surplus",
    deficit: "Deficit",
    remaining: "Remaining Balance"
  },
  ar: {
    pageTitle: "حاسبة السعرات",
    mainHeading: "حاسبة السعرات الحرارية",
    labelBudget: "الميزانية اليومية",
    legendBreakfast: "الفطور",
    legendLunch: "الغداء",
    legendDinner: "العشاء",
    legendSnacks: "سناك",
    legendExercise: "تمارين",
    btnCalculate: "احسب الرصيد",
    btnClear: "إعادة تعيين",
    entryName: "اسم الصنف",
    entryCalories: "السعرات",
    invalidInput: "إدخال غير صالح: ",
    budgeted: "الميزانية",
    consumed: "المستهلك",
    burned: "المحروق",
    surplus: "فائض",
    deficit: "عجز",
    remaining: "الرصيد المتبقي"
  }
};

function trackEvent(name, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', name, params);
  }
}

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.body.classList.toggle('rtl', lang === 'ar');

  // Update static text
  Object.keys(i18n[lang]).forEach(key => {
    const el = document.getElementById(key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`));
    if (el) {
      if (el.tagName === 'INPUT') el.placeholder = i18n[lang][key];
      else el.innerText = i18n[lang][key];
    }
  });

  document.getElementById('page-title').innerText = i18n[lang].pageTitle;

  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry(category) {
  const targetInputContainer = document.querySelector(`#${category} .input-container`);

  const HTMLString = `
  <div class="entry-row">
    <input type="text" placeholder="${i18n[currentLang].entryName}" required />
    <input type="number" min="0" placeholder="${i18n[currentLang].entryCalories}" required />
  </div>`;

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
  trackEvent('add_entry', { category: category });
}

function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`${i18n[currentLang].invalidInput}${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const categories = ['breakfast', 'lunch', 'dinner', 'snacks', 'exercise'];
  const calorieData = {};

  categories.forEach(cat => {
    const inputs = document.querySelectorAll(`#${cat} input[type='number']`);
    calorieData[cat] = getCaloriesFromInputs(inputs);
  });

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) return;

  const consumedCalories = calorieData.breakfast + calorieData.lunch + calorieData.dinner + calorieData.snacks;
  const burnedCalories = calorieData.exercise;
  const remainingCalories = budgetCalories - consumedCalories + burnedCalories;

  const status = remainingCalories < 0 ? 'surplus' : 'deficit';
  const statusLabel = i18n[currentLang][status];

  output.innerHTML = `
    <span class="output-title ${status}">${Math.abs(remainingCalories).toLocaleString()} ${i18n[currentLang].entryCalories} ${statusLabel}</span>
    <p>${i18n[currentLang].remaining}</p>
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-label">${i18n[currentLang].budgeted}</span>
        <span class="stat-value">${budgetCalories.toLocaleString()}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">${i18n[currentLang].consumed}</span>
        <span class="stat-value">${consumedCalories.toLocaleString()}</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">${i18n[currentLang].burned}</span>
        <span class="stat-value">${burnedCalories.toLocaleString()}</span>
      </div>
    </div>
  `;

  output.classList.remove('hide');
  trackEvent('calculate_results', { budget: budgetCalories, status: status });
}

function clearForm() {
  document.querySelectorAll('.input-container').forEach(container => container.innerHTML = '');
  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
  trackEvent('reset_form');
}

// Event Listeners
document.querySelectorAll('.add-entry-btn').forEach(btn => {
  btn.addEventListener('click', () => addEntry(btn.dataset.category));
});

calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    updateLanguage(btn.dataset.lang);
    trackEvent('switch_language', { lang: btn.dataset.lang });
  });
});

// Init
updateLanguage(currentLang);