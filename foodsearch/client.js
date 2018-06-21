// API key required to access the food2fork API.
const API_KEY = '5b5db650cd471fa8a983a16c32b6ebb9';

/**
 * onClick() function used to retrieve a random recipe from the food2fork API.
 */
function findRecipe() {
    let recipeParameters = generateIngredients();
    
    // Make first AJAX request for a list of recipe IDs.
    $.ajax({
      url: "/foodsearch/index.html/recipe-id",
      data: { q: recipeParameters }, // The ingredients selected by the user.
      type: "get", 
      success: function(response) {
        // If no recipe is found from the database, display error message.
        if (response.recipes.length === 0) {
            const errorDiv = document.getElementById('error-message');
            errorDiv.innerHTML = '';
            errorDiv.innerHTML += '<h4>No recipes found. Try different ingredients</h4>';
        } else { 
            const randInt = Math.floor(Math.random() * response.recipes.length) + 1;
            let recipe = response.recipes[randInt];
            const rId = recipe.recipe_id;

            // Use selected recipe ID to make second AJAX request for the recipe details.
            $.ajax({
                url: "/foodsearch/index.html/recipe-details",
                data: { rId: rId },
                type: "get",
                success: function(response) { 
                    displayRecipeResults(response);
                },
                error: function(xhr) {
                    console.log(xhr);
                }
            });
        }
      },
      error: function(xhr) {
        console.log(xhr); 
      }
    }); 
}

/**
 * Display the results of the ingredient search by hiding the input form and displaying the selected recipe.
 */
function displayRecipeResults(response) {
    // Find search container and hide it.
    const searchDiv = document.getElementById('search');
    searchDiv.style.display = "none";

    // Find error message and hide it.
    const errorDiv = document.getElementById('error-message');
    errorDiv.style.display = "none";

    // Find results container and display it.
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = "block";
 
    clearOldRecipe();   
    addNewRecipe(response.recipe.title, response.recipe.image_url, response.recipe.ingredients, response.recipe.source_url);
}

/**
 * Helper function used to remove the ingredient input forms.
 */
function clearOldRecipe() {
    const titleDiv = document.getElementById('recipe-title');
    const ingredientsDiv = document.getElementById('ingredients-list');
    const imageDiv = document.getElementById('recipe-img');
    const recipeLinkDiv = document.getElementById('recipe-link');

    titleDiv.innerHTML = "";
    ingredientsDiv.innerHTML = ""; 
    imageDiv.innerHTML = ""; 
    recipeLinkDiv.innerHTML = "";
}

/**
 * Helper function used to add the new recipe to the page.
 * @param {!String} recipeTitle The title of the recipe.
 * @param {!String} imgUrl The URL to the image associated with the recipe.
 * @param {!Array<String>} ingredientsList List of ingredients used in the recipe.
 * @param {!String} recipeLink The URL to the original recipe.
 */
function addNewRecipe(recipeTitle, imgUrl, ingredientsList, recipeLink) {
    // Find div containers to append ingredients, image, and recipe link.
    const titleDiv = document.getElementById('recipe-title');
    const ingredientsDiv = document.getElementById('ingredients-list');
    const imageDiv = document.getElementById('recipe-img');
    const recipeLinkDiv = document.getElementById('recipe-link');

    titleDiv.innerHTML += '<h3>' + recipeTitle + '</h3>';
    ingredientsList.forEach(ingredient => {
        ingredientsDiv.innerHTML += ingredient + '<br/>';
    });
    imageDiv.innerHTML += '<img src=' + imgUrl + ">";
    recipeLinkDiv.innerHTML += '<a href="' + recipeLink + '" target="_blank">Full Instructions</a>';
}

/**
 * Helper function used to generate a list of ingredients from input forms.
 */
function generateIngredients() {
    let meat = (Array.from(document.getElementsByName("meatList")).find(r => r.checked).value);
    let vegetable = (Array.from(document.getElementsByName("vegetableList")).find(r => r.checked).value);

    return meat + ',' + vegetable;
}
