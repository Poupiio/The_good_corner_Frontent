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
         <h2 className="ad-details-title">{ad?.title}</h2>
         <section className="ad-details">
         <div className="ad-details-image-container">
            <img className="ad-details-image" src={ad?.picture} />
         </div>
         <div className="ad-details-info">
            <div className="ad-details-price">{ad?.price} €</div>
            <div className="ad-details-description">{ad?.description}</div>
            <div className="ad-details-location">{ad?.location}</div>
            <hr className="separator" />
            <div className="ad-details-owner">
               Annoncée publiée par <b>{ad?.owner}</b> aujourd'hui (9:32).
            </div>
            <a
               href="mailto:serge@serge.com"
               className="button button-primary link-button"
               ><svg
               aria-hidden="true"
               width="16"
               height="16"
               viewBox="0 0 32 32"
               xmlns="http://www.w3.org/2000/svg"
               className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
               >
               <path
                  d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
               ></path>
               </svg>
               Envoyer un email</a>
         </div>
         </section>

         {/* <div className="ad-card-container">
            <a className="ad-card-link" href={ad?.picture}>
               <img className="ad-card-image" src={ad?.picture} />
               <div className="ad-card-text">
                  <div className="ad-card-title">{ad?.title}</div>
                  <div className="ad-card-description">{ad?.description}</div>
                  <div className="ad-card-price">{ad?.price} €</div>
               </div> */}
               {/* <div className="ad-card-category">
                  <p>{category.name}</p>
               </div> */}
            {/* </a> */}
            {/* <button className="button ad-card-update" onClick={handleUpdate}>Modifier</button>
            <button className="button ad-card-delete" onClick={handleDelete}>Supprimer</button> */}
         {/* </div> */}
      </>
   );
};

export default AdDetails;