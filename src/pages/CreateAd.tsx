import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryProps } from "../components/Category";
import { useNavigate } from "react-router-dom";
// import { TagProps } from "../components/Tag";

const CreateAd = () => {

   const navigate = useNavigate();
   const [categories, setCategories] = useState<CategoryProps[]>([]);
   // const [tags, setTags] = useState<TagProps[]>([]);
   
   useEffect(() => {
      const fetchCategories = async () => {
         const result = await axios.get("http://localhost:3000/categories");
         setCategories(result.data);
      }

      // const fetchTags = async () => {
      //    const result = await axios.get("http://localhost:3000/tags");
      //    setTags(result.data);
      // }

      fetchCategories();
      // fetchTags();
   }, []);

   return (
      <form
         method="post"
         className="form"
         onSubmit={(e) => {
            e.preventDefault();

            // Récupération des données
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form as HTMLFormElement);
            
            // Conversion des données au format json
            // Utilisation de Object.fromEntries() pour ne pas avoir à récupérer manuellement chaque champ du formulaire
            const formJson = Object.fromEntries(formData.entries());

            // Envoi des données au back
            axios.post("http://localhost:3000/ads", formJson);
            navigate("/");
         }}
      >
         <label htmlFor="title">Quel est le titre de votre annonce ?
            <input className="text-field" type="text" name="title" placeholder="Titre de l'annonce" required />
         </label>
         
         <label htmlFor="description">Description
            <textarea className="text-field" name="description" id="description" placeholder="Description..."></textarea>
         </label>
         
         <select className="text-field" name="category" id="category">
            <option value="">Choisissez une catégorie</option>
            {categories.map(category => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select>
         
         <label htmlFor="price">Prix
            <input className="text-field" type="number" name="price" min="0" required />
         </label>
         
         {/* Provisoire pour le test ! */}
         <label htmlFor="picture">Entrez l'URL de votre image
            <input className="text-field" type="text" name="picture" maxLength={2000} required />
         </label>

         <label htmlFor="location">Localisation
            <input className="text-field" type="text" name="location" placeholder="Paris" required />
         </label>
         
         {/* <h4>Souhaitez-vous ajouter un tag ?</h4>
         {tags.map(tag => (
            <label htmlFor="tags">
               <input className="text-field" type="checkbox" name="tags" value={tag.id} />{tag.name}
            </label>
         ))} */}

         <label htmlFor="owner">Vendeur
            <input className="text-field" type="text" name="owner" placeholder="Votre nom" required />
         </label>

         <label htmlFor="createdAt">Date d'ajout
            <input className="text-field" type="date" name="createdAt" />
         </label>

         <button className="button" type="submit">Créer</button>
      </form>
   );
};

export default CreateAd;