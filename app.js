
 let result = document.querySelector('#result');
 let btn = document.querySelector('#search-btn');
 let input = document.querySelector('input');

 
 let url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
 
 //  console.log(url)
 
 
 btn.addEventListener('click', function(){
   
   if(input.value==0){
     result.innerHTML = `<h3>Input field cannot be empty</h3>`
   }
   

  else{

   fetchApi();

  }
 
  });
  

    
  async function fetchApi(){

     
  let response = await fetch(url + input.value);
  
  let data = await response.json();
  
  try {
    let mymeal = data.meals[0];


    //     console.log(mymeal)
     //   console.log(mymeal.strMealThumb)
     //   console.log(mymeal.strArea)
     //   console.log(mymeal.strMeal)
       
     //  console.log(mymeal.strInstructions)
    
      
      let ingredents = [];
      let count = 1;
    
      for(let i in mymeal){
       
       let ingredent = "";
       let measure = "";
    
       if(i.startsWith("strIngredient") && mymeal[i]){
          
         ingredent = mymeal[i];
    
         measure = mymeal[`strMeasure` + count];
    
         count += 1;
        
        //  console.log(ingredent,measure)
         
         ingredents.push(`${ingredent} - ${measure}`);
    
         
       }
       
     }
     
    //  console.log(ingredents);
      
      result.innerHTML = `
      <img src=${mymeal.strMealThumb}>
      
       <div id="details">
         <h3>${mymeal.strMeal}</h3>
         <h5>${mymeal.strArea}</h5>
         </div>
         
         <div id="ingredent-con"></div>
    
         <div id="recipe">
         <button id="hide-recipe">X</button>
          
         <pre id="instructions">${mymeal.strInstructions}</pre>
         
         </div>
    
         <button id="view-recipe">view-recipe</button>
    
      `
    
      let ingredentcon = document.querySelector('#ingredent-con');
      let parent = document.createElement("ul");
    
      let recipe = document.querySelector('#recipe');
    
      let hideRecipe = document.querySelector('#hide-recipe');
      let viewRecipe = document.querySelector('#view-recipe');
    
      ingredents.forEach((i) => {
       
       let child = document.createElement("li");
       child.innerHTML = i;

    
       parent.appendChild(child);
       ingredentcon.appendChild(parent);
    
      }); 
    
    
      hideRecipe.addEventListener('click' , () => {
         
          recipe.style.display='none';
    
      })
      viewRecipe.addEventListener('click' , () => {
         
          recipe.style.display="block";
    
      })

  } catch (error) {
      
      result.innerHTML = `<h3>There is no such Dish</h3>`
     
  }



 }

 
