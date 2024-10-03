import { useNavigate, useParams } from "react-router-dom";
import { AdCardProps } from "../components/AdCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryProps } from "../components/Category";
import { FormValues } from "./CreateAd";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditAd = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [ad, setAd] = useState({} as AdCardProps);
   const [categories, setCategories] = useState<CategoryProps[]>([]);
   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

   // const handleUpdate = async (e: React.FormEvent) => {
   //    e.preventDefault();
   //    const form = e.target as HTMLFormElement;
   //    const formData = new FormData(form as HTMLFormElement);
   //    const formJson = Object.fromEntries(formData.entries());
   //    console.log(formJson);
   //    await axios.put(`http://localhost:3000/ads/${id}`, formJson);
   //    navigate("/");
   // }
   const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
         await axios.put(`http://localhost:3000/ads/${id}`, data);
         toast.success("Ad has been updated");
         
         navigate("/");
      } catch (error) {
         console.error("Erreur lors de la création de l'annonce :", error, errors);
      }
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
         } catch (err) {
            console.log("error", err);
         }
      }
      fetchCategories();
      fetchData();
   }, [id]);

   if (!ad || !ad.category) {
      return <p>Loading...</p>;
   }

   return (
      <>
         <h1>Modifier {ad.title}</h1>
         <form className="form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Titre de l'annonce
               <input className="text-field" type="text" {...register("title", { required: true })} placeholder="Titre de l'annonce" defaultValue={ad.title}  required />
            </label>
            
            <label htmlFor="description">Description
               <textarea className="text-field" {...register("description")} id="description" placeholder="Description..." defaultValue={ad.description} ></textarea>
            </label>
            
            <select className="text-field" {...register("category", { required: true })} id="category" defaultValue={ad.category.id}>
               {categories.map(category => (
                  <option value={category.id} key={category.id}>{category.name}</option>
               ))}
            </select>
            
            <label htmlFor="price">Prix
               <input className="text-field" type="number" {...register("price", { required: true })} min="0" defaultValue={ad.price}  required />
            </label>
            
            {/* Provisoire pour le test ! */}
            <label htmlFor="picture">Entrez l'URL de votre image
               <input className="text-field" type="text" {...register("picture", { required: true })} maxLength={2000} defaultValue={ad.picture}  required />
            </label>

            <label htmlFor="location">Localisation
               <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" defaultValue={ad.location}  required />
            </label>
            
            <label htmlFor="owner">Vendeur
               <input className="text-field" type="text" {...register("owner", { required: true })} placeholder="Votre nom" defaultValue={ad.owner}  required />
            </label>

            <label htmlFor="createdAt">Date d'ajout
               <input className="text-field" type="date" {...register("createdAt")} defaultValue={ad.createdAt ? new Date(ad.createdAt).toISOString().split("T")[0] : ""}/>
            </label>

            <button className="button" type="submit">Modifier</button>
         </form>
      </>
   );
};

export default EditAd;