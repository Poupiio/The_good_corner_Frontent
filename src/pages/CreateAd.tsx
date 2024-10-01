import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryProps } from "../components/Category";
import { TagProps } from "../components/Tag";

const CreateAd = () => {

   const [categories, setCategories] = useState<CategoryProps[]>([]);
   const [tags, setTags] = useState<TagProps[]>([]);
   
   useEffect(() => {
      const fetchCategories = async () => {
         const result = await axios.get("http://localhost:3000/categories");
         setCategories(result.data);
      }

      const fetchTags = async () => {
         const result = await axios.get("http://localhost:3000/tags");
         setTags(result.data);
      }

      fetchCategories();
      fetchTags();
   }, []);

   return (
      <form
         method="post"
         onSubmit={(e) => {
            e.preventDefault();

            // Récupération des données
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form as HTMLFormElement);
            
            // Récupération de toutes les checkbox sélectionnées
            // const selectedTagIds = formData.getAll('tags');
            // Filtrer les tags pour obtenir les objets
            // const selectedTags = tags.filter(tag => selectedTagIds.includes(tag.id.toString()));

            // console.log("Tags sélectionnés : ", selectedTags, selectedTagIds);

            // Conversion des données au format json
            // Utilisation de Object.fromEntries() pour ne pas avoir à récupérer manuellement chaque champ du formulaire
            const formJson = Object.fromEntries(formData.entries());
            // const formJson = {
            //    ...Object.fromEntries(formData.entries()), // Convertit les autres champs du formulaire
            //    tags: selectedTags // Inclure les objets tags
            // };
            console.log(formJson);

            // Envoi des données au back
            fetch('http://localhost:3000/ads', { method: form.method, body: formData });
         }}
      >
         <label htmlFor="title">Titre de l'annonce
            <input type="text" name="title" placeholder="Titre de l'annonce" required />
         </label>
<br />
         <label htmlFor="description">Description
            <textarea name="description" id="description" placeholder="Description..."></textarea>
         </label>
<br />
         {/* <select name="category" id="category">
            <option value="">Choisissez une catégorie</option>
            {categories.map(category => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select> */}
<br />
         <label htmlFor="price">Prix
            <input type="number" name="price" min="0" required />
         </label>
<br />
         {/* Provisoire pour le test ! */}
         <label htmlFor="picture">Entrez l'URL de votre image
            <input type="text" name="picture" maxLength={2000} required />
         </label>

         <label htmlFor="location">Localisation
            <input type="text" name="location" placeholder="Paris" required />
         </label>
<br />
         {/* <h4>Souhaitez-vous ajouter un tag ?</h4>
         {tags.map(tag => (
            <label htmlFor="tags">
               <input type="checkbox" name="tags" value={tag.id} />{tag.name}
            </label>
         ))} */}

         <label htmlFor="owner">Adresse email
            <input type="email" name="owner" placeholder="john.doe@gmail.com" required />
         </label>

         <button className="btn" type="submit">Créer</button>
      </form>
   );
};

export default CreateAd;