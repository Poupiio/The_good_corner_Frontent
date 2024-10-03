import axios from "axios";
import { useEffect, useState } from "react";
import { CategoryProps } from "../components/Category";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
// import { TagProps } from "../components/Tag";

type FormValues = {
   title: string
   description: string,
   category: number,
   price: number,
   picture: string,
   location: string,
   owner: string,
   createdAt: string
}

const CreateAd = () => {
   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

   console.log(errors);
   
   const navigate = useNavigate();
   const [categories, setCategories] = useState<CategoryProps[]>([]);
   // const [tags, setTags] = useState<TagProps[]>([]);

   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
         await axios.post("http://localhost:3000/ads", data);
   
         navigate("/");
      } catch (error) {
         console.error("Erreur lors de la création de l'annonce :", error);
      }
   }
   
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
         // onSubmit={(e) => {
         //    e.preventDefault();

         //    // Récupération des données
         //    const form = e.target as HTMLFormElement;
         //    const formData = new FormData(form as HTMLFormElement);
            
         //    // Conversion des données au format json
         //    // Utilisation de Object.fromEntries() pour ne pas avoir à récupérer manuellement chaque champ du formulaire
         //    const formJson = Object.fromEntries(formData.entries());

         //    // Envoi des données au back
         //    axios.post("http://localhost:3000/ads", formJson);
         //    navigate("/");
         // }}
         onSubmit={handleSubmit(onSubmit)}
      >
         <label htmlFor="title">Quel est le titre de votre annonce ?
            <input className="text-field" type="text" {...register("title", { required: true })} placeholder="Titre de l'annonce" />
         </label>
         
         <label htmlFor="description">Description
            <textarea className="text-field" {...register("description")} id="description" placeholder="Description..."></textarea>
         </label>
         
         <select className="text-field" {...register("category", { required: true })} id="category">
            <option value="">Choisissez une catégorie</option>
            {categories.map(category => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select>
         
         <label htmlFor="price">Prix
            <input className="text-field" type="number" {...register("price", { required: true })} min="0" />
         </label>
         
         {/* Provisoire pour le test ! */}
         <label htmlFor="picture">Entrez l'URL de votre image
            <input className="text-field" type="text" {...register("picture", { required: true })} maxLength={2000} />
         </label>

         <label htmlFor="location">Localisation
            <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" />
         </label>
         
         {/* <h4>Souhaitez-vous ajouter un tag ?</h4>
         {tags.map(tag => (
            <label htmlFor="tags">
               <input className="text-field" type="checkbox" name="tags" value={tag.id} />{tag.name}
            </label>
         ))} */}

         <label htmlFor="owner">Vendeur
            <input className="text-field" type="text" {...register("owner", { required: true })} placeholder="Votre nom" />
         </label>

         <label htmlFor="createdAt">Date d'ajout
            <input className="text-field" type="date" {...register("createdAt")} />
         </label>

         <button className="button" type="submit">Créer</button>
      </form>
   );
};

export default CreateAd;