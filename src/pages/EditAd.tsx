import { useNavigate, useParams } from "react-router-dom";
import { AdCardProps } from "../components/AdCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryProps } from "../components/Category";

const EditAd = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [ad, setAd] = useState({} as AdCardProps);
   const [categories, setCategories] = useState<CategoryProps[]>([]);

   const handleUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form as HTMLFormElement);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
      await axios.put(`http://localhost:3000/ads/${id}`, formJson);
      navigate("/");
   }

   useEffect(() => {
      const fetchCategories = async () => {
         const result = await axios.get("http://localhost:3000/categories");
         setCategories(result.data);
      }

      const fetchData = async () => {
         try {
            const result = await axios.get(`http://localhost:3000/ads/${id}`);
            setAd(result.data);
            console.log("Catégorie sélectionnée : ", ad.category.name);
            
            
         } catch (err) {
            console.log("error", err);
         }
      }
      fetchCategories();
      fetchData();
   }, [ad.category.name, id]);

   if (!ad || !ad.category) {
      return <p>Loading...</p>;
   }

      return (
         <>
            <h1>Modifier {ad.title}</h1>
            <form className="form" method="post" onSubmit={handleUpdate}>
               <label htmlFor="title">Titre de l'annonce
                  <input className="text-field" type="text" name="title" placeholder="Titre de l'annonce" defaultValue={ad.title}  required />
               </label>
               
               <label htmlFor="description">Description
                  <textarea className="text-field" name="description" id="description" placeholder="Description..." defaultValue={ad.description} ></textarea>
               </label>
               
               <select className="text-field" name="category" id="category" defaultValue={ad.category.id}>
                  {/* <option defaultValue="">
                     {ad.category?.name || "Sélectionnez une catégorie"}
                  </option> */}
                  {categories.map(category => (
                     <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
               </select>
               
               <label htmlFor="price">Prix
                  <input className="text-field" type="number" name="price" min="0" defaultValue={ad.price}  required />
               </label>
               
               {/* Provisoire pour le test ! */}
               <label htmlFor="picture">Entrez l'URL de votre image
                  <input className="text-field" type="text" name="picture" maxLength={2000} defaultValue={ad.picture}  required />
               </label>

               <label htmlFor="location">Localisation
                  <input className="text-field" type="text" name="location" placeholder="Paris" defaultValue={ad.location}  required />
               </label>
               
               <label htmlFor="owner">Vendeur
                  <input className="text-field" type="text" name="owner" placeholder="Votre nom" defaultValue={ad.owner}  required />
               </label>

               <label htmlFor="createdAt">Date d'ajout
                  <input className="text-field" type="date" name="createdAt" defaultValue={ad.createdAt ? new Date(ad.createdAt).toISOString().split("T")[0] : ""}/>
               </label>

               <button type="submit">Modifier</button>
            </form>
         </>
      );
   
};

export default EditAd;