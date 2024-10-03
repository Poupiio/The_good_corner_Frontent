import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard, { AdCardProps } from "../components/AdCard";
import axios from "axios";

const AdsByCategory = () => {
   const { name } = useParams();
   const [ads, setAds] = useState<AdCardProps[]>([]);

   useEffect(() => {
      const fetchAdsByCategory = async () => {
         const result = await axios.get(`http://localhost:3000/ads?category=${name}`);
         setAds(result.data)
      }
      fetchAdsByCategory();
   }, [name]);

   return (
      <>
         <p>Annonces disponibles pour la catégorie "{name}"</p>
         <section className="recent-ads">
            {ads.map((ad) => (
               <div key={ad.id}>
                  <AdCard
                     id={ad.id}
                     title={ad.title}
                     owner={ad.owner}
                     description={ad.description}
                     picture={ad.picture}
                     location={ad.location}
                     price={ad.price}
                     createdAt={ad.createdAt}
                     category={ad.category}
                  />
               </div>
            ))}
         </section>
      </>
   );
};

export default AdsByCategory;