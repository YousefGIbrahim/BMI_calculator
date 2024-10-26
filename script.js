function startApp() {
    const userName = document.getElementById("userName").value;
    if (userName) {
        document.getElementById("userDisplay").innerText = userName;
        document.getElementById("welcomePage").classList.add("hidden");
        document.getElementById("mainPage").classList.remove("hidden");
        
        // Show the Metrics page immediately after entering the name
        showPage('metricsPage');
    } else {
        alert("Please enter your name.");
    }
}

function showPage(page) {
    const pages = ["metricsPage", "bmiPage", "caloriesPage"];
    pages.forEach(p => {
        document.getElementById(p).classList.add("hidden");
    });
    document.getElementById(page).classList.remove("hidden");
}

function calculate() {
    const feet = parseFloat(document.getElementById("feet").value);
    const inches = parseFloat(document.getElementById("inches").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const age = parseFloat(document.getElementById("age").value);
    const sex = document.getElementById("sex").value;
    const activity = document.getElementById("activity").value;

    // Calculate BMI
    const bmi = (weight / 2.205) / ((((feet * 12) + inches) * 0.0254) ** 2);
    document.getElementById("bmiResult").innerText = bmi.toFixed(1);

    // Calculate BMR
    const bmr = (sex === "Male")
        ? (10 * (weight / 2.205)) + (6.25 * ((feet * 30.48) + (inches * 2.54))) - (5 * age) + 5
        : (10 * (weight / 2.205)) + (6.25 * ((feet * 30.48) + (inches * 2.54))) - (5 * age) + 161;

    // Activity multiplier
    const activityLevels = {
        "Little or no exercise": 1.2,
        "Exercise 1-3 times/week": 1.375,
        "Exercise 3-5 times/week": 1.55,
        "Exercise 6-7 times/week": 1.725,
        "Very intense exercise or 2x training": 1.9
    };

    // Calculate daily caloric needs
    const calories = Math.round(bmr * activityLevels[activity]);
    document.getElementById("caloriesResult").innerText = calories;
    document.getElementById("caloriesMildResult").innerText = calories - 250;
    document.getElementById("caloriesLossResult").innerText = calories - 500;
    document.getElementById("caloriesExtremeResult").innerText = calories - 1000;

    showPage('bmiPage');
}
