# Calorie Counter

A web-based calorie tracking application that helps you monitor your daily calorie intake and exercise to maintain a healthy lifestyle. Track calories for breakfast, lunch, dinner, snacks, and exercise activities to stay within your daily calorie budget.

## Features

- **Daily Calorie Budget**: Set and manage your daily calorie target
- **Meal Tracking**: Track calories for breakfast, lunch, dinner, and snacks separately
- **Exercise Tracking**: Log calories burned through exercise activities
- **Real-time Calculation**: Calculate remaining calories instantly
- **Surplus/Deficit Display**: Visual feedback showing whether you're over or under your budget
- **Dynamic Entry Management**: Add multiple entries for each meal category
- **Input Validation**: Prevents invalid input formats
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- HTML5
- CSS3 (with CSS Custom Properties)
- Vanilla JavaScript (ES6+)
- No external dependencies or frameworks

## Project Structure

```
.
├── index.html      # Main HTML structure
├── style.css       # Styling and layout
├── script.js       # Application logic and functionality
└── README.md       # Project documentation
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installation required

### Installation

1. Clone the repository or download the project files
2. Open `index.html` in your web browser
3. Start tracking your calories

### Usage

1. **Set Your Budget**: Enter your daily calorie budget in the "Budget" field
2. **Add Entries**: 
   - Select a category (Breakfast, Lunch, Dinner, Snacks, or Exercise) from the dropdown
   - Click "Add Entry" to add a new food or exercise item
   - Enter the name and calorie value for each entry
3. **Calculate**: Click "Calculate Remaining Calories" to see your results
4. **Clear**: Use the "Clear" button to reset all entries and start fresh

### How It Works

The application calculates your remaining calories using the formula:

```
Remaining Calories = Budget - (Breakfast + Lunch + Dinner + Snacks) + Exercise
```

- If remaining calories are positive, you have a calorie deficit
- If remaining calories are negative, you have a calorie surplus

## Browser Support

This application works on all modern browsers that support:
- ES6 JavaScript features
- CSS Custom Properties (CSS Variables)
- HTML5 form elements

## Author

Awab Saif

## License

This project is open source and available for personal and educational use.
