import axios from 'axios';

class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  getCookingTime() {
    // a dumb way to calc cooking time
    // require 15 min per every 3 ingredients lol
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.time = periods * 3;
  }

  getServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsMap = new Map([
      ['tablespoon', 'tbsp'],
      ['tablespoons', 'tbsp'],
      ['ounce', 'oz'],
      ['ounces', 'oz'],
      ['teaspoon', 'tsp'],
      ['teaspoons', 'tsp'],
      ['cups', 'cup'],
      ['pounds', 'pound'],
      ['lbs', 'pound'],
      ['lb', 'pound']
    ]);
    const unitsAbbr = [ ...unitsMap.values()];

    const newIngredients = this.ingredients.map(ing => {
      // 1) Uniform units
      let ingredient = ing
        .toLowerCase()
        .split(' ')
        .map(word => 
          unitsMap.has(word) ? unitsMap.get(word) : word)
        .join(' ');

      // 2) Remove parentheses (and text inbetween them)
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3) Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      
      const unitIndex = arrIng.findIndex(el2 => unitsAbbr.includes(el2));


      let ingObj;

      if (unitIndex > -1) {
        // there is a unit
        // Ex: 4 1/2 cups, arrCount is [4, 1/2]
        // Ex: 4 cups, arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);
        let count;

        if (arrCount === 1) {
          count = eval(arrCount[0].replace('-', '+'));
        } else {
          //count = eval(arrCount.slice(0, unitIndex).join('+'));
          count = eval(arrCount.join('+').replace('-', '+'));
        }

        ingObj = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
          src: ing
        }
      } else if (parseInt(arrIng[0], 10)) {
        // there is no unit, but first element is a number
        ingObj = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' '),
          src: ing
        }
      } else if (unitIndex === -1) {
        // there is NO unit
        ingObj = {
          count: 1,
          unit: '',
          ingredient,
          src: ing
        }
      }

      return ingObj;
    });
    //this.sourceIngredients = this.ingredients;
    this.ingredients = newIngredients;
  }
}

export default Recipe;