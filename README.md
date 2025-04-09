# Recipe Hub 🍽️ by Sehansi Perera

Welcome to **Recipe Hub** – the ultimate recipe app that brings you a world of culinary delights! With an easy-to-use interface, you can browse, filter, and favorite your favorite recipes, and even share them with your friends! Whether you're a seasoned chef or just getting started in the kitchen, Recipe Hub has everything you need. 

---

## Features 

- **Home Page**: Displays all available recipes from a mock dummy JSON API. 
- **Recipe Filtering**: Easily filter recipes by meal type like Chicken, Vegetarian, etc.
- **Search Bar**: Find your favorite recipes by searching for ingredients or meal names. 
- **Favorites**: Save your favorite recipes and access them easily via the "Favorites" tab on the navbar. 
- **Recipe Details**: Clicking on a recipe takes you to a detailed page showing ingredients, step-by-step instructions, and a timer. 
- **Interactive Timer**: Track your meal prep time for better kitchen management. 
- **Social Sharing**: Share your recipes on social media platforms like Twitter, Facebook, and WhatsApp. 
- **Interactive Rating System**: Add your rating to your favourite recipes
- **Printable Recipes**: Easily get your favourite recipes in print format 
- **User Recipe Management**: Add, update, and delete your own recipes. 
- **Local Storage**: User details, favorite meals, and personal recipes are stored in the browser's local storage. 
- **React Router**: Smooth navigation throughout the app using React Router. 
- **Context API**: Manage global states, such as user data and favorite recipes. 
- **Bootstrap**: Fully responsive design with Bootstrap for a clean, modern look. 

---

## Tech Stack 

- **React**: For building the UI with reusable components.
- **Bootstrap**: To make the app fully responsive and stylish.
- **React Router**: For seamless navigation between pages.
- **Context API**: To manage the global state for user data and favorite recipes.
- **LocalStorage**: To persist user data and preferences.
- **Mock JSON API**: For fetching recipe data. <https://dummyjson.com/docs/recipes>
- **CSS**: For custom styling and making the app visually appealing.

---
## Flow
- User logins/signs up (The site blocks all routes and directs to auth page if no user credentials are available in local storage)
- Unfilled fields during auth process are instantly alerted
- User data, user favourites, and new recipes added by the user are stored in local storage; deleting and updating the added recipes are instantly updated in the local storage
- Error messages are displayed if fetching from API fails
- The logout button clears user data from local storage and redirects to auth page, blocking all routes.

## Screenshots 

### Home Page with search bar
![Home Page with search bar](https://github.com/user-attachments/assets/2cdece7b-5eb8-4053-8065-f1d58f6bb7be)
### Detailed Recipe Page with timer and social sharable options
![Detailed Recipe Page](https://github.com/user-attachments/assets/ae8698fc-1645-4bdc-be90-af8cb7282087)
### Printable Recipes
![Printable Recipes](https://github.com/user-attachments/assets/10e25326-6d31-4ac2-af6f-133625ec7992)
### Adding a new recipe
![Adding a new recipe](https://github.com/user-attachments/assets/b63744af-7031-453f-9421-6240fbd3a01c)
### Added Recipes that are editable
![Added Recipes that are editable](https://github.com/user-attachments/assets/529292f9-6e6a-40a7-a08e-cdf78409eee3)
### Sign up mock-up
![Sign up mock-up](https://github.com/user-attachments/assets/af213a21-42c7-46fc-b8de-8d595a9ff8af)

---

## Folder Structure 

```plaintext
/src
  ├── /components   # Reusable UI components like RecipeCard, RecipeDetails, etc.
  ├── /contexts     # Global state management with Context API.
  ├── /css          # Custom CSS files for styling.
  ├── /pages        # Pages such as Home, RecipeDetails, Favorites, etc.
  └── /services     # Fetching data from the Mock API.
```
## How to Run the App 

1. Clone the repository:
   ```bash
   git clone https://github.com/sehansi-9/recipe-sharing-platform.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
 ---
Now, you can open your browser and visit (http://localhost:3000) to check out the Recipe Hub! 
