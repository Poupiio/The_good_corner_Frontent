import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdCardProps } from "../components/AdCard";

const AdDetails = () => {
   const { id } = useParams();
   const [ad, setAd] = useState<AdCardProps>();
   
   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await axios.get<AdCardProps>(`http://localhost:3000/ads/${id}`);
            setAd(result.data);
            console.log(result.data);
            
         } catch (err) {
            console.log("error", err);
         }
      }
      fetchData();
   }, [id]);

   return (
      <>
         <h1>Cette page affiche les détails de l'annonce { ad?.title } 😎</h1>
         <h3>{ad?.title}</h3>
         <p>{ad?.description}</p>

         <div className="ad-card-container">
            <a className="ad-card-link" href={ad?.picture}>
               <img className="ad-card-image" src={ad?.picture} />
               <div className="ad-card-text">
                  <div className="ad-card-title">{ad?.title}</div>
                  <div className="ad-card-description">{ad?.description}</div>
                  <div className="ad-card-price">{ad?.price} €</div>
               </div>
               {/* <div className="ad-card-category">
                  <p>{category.name}</p>
               </div> */}
            </a>
            {/* <button className="button ad-card-update" onClick={handleUpdate}>Modifier</button>
            <button className="button ad-card-delete" onClick={handleDelete}>Supprimer</button> */}
         </div>
      </>
   );
};

export default AdDetails;