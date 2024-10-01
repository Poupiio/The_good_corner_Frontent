import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryProps } from "../components/Category";

const CreateAd = () => {

   const [categories, setCategories] = useState<CategoryProps[]>([]);
   
   useEffect(() => {
      const fetchCategories = async () => {
         const result = await axios.get("http://localhost:3000/categories");
         console.log(result.data);
         setCategories(result.data);
      }
      fetchCategories();
   }, []);

   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();

            // Récupération des données
            const form = e.target;
            const formData = new FormData(form as HTMLFormElement);

            // Conversion des données au format json
            // Utilisation de Object.fromEntries() pour ne pas avoir à récupérer manuellement chaque champ du formulaire
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
         }}
      >
         <label htmlFor="title">Titre de l'annonce
            <input type="text" name="title" placeholder="Titre de l'annonce" />
         </label>

         <label htmlFor="description">Description
            <textarea name="description" id="description" placeholder="Description..."></textarea>
         </label>

         <select name="category" id="category">
            <option value="">Choisissez une catégorie</option>
            {categories.map(category => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select>

         <label htmlFor="price">Prix
            <input type="number" name="price" min="0" />
         </label>

         <label htmlFor="owner">Adresse email
            <input type="email" name="owner" placeholder="john.doe@gmail.com" />
         </label>

         <label htmlFor="location">Localisation
            <input type="text" name="location" placeholder="Paris" />
         </label>

         <button className="btn">Créer</button>
      </form>
   );
};

export default CreateAd;