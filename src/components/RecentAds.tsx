import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";

const RecentAds = () => {
   
   const [total, setTotal] = useState(0);
   const [ads, setAds] = useState<AdCardProps[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await axios.get<AdCardProps[]>("http://localhost:3000/ads");
            setAds(result.data);
            console.log(result.data);
            
         } catch (err) {
            console.log("error", err);
         }
      }
      fetchData();
   }, []);

  return (
      <>
         <h2>Annonces récentes</h2>
         <p>Total : {total} €</p>
         <section className="recent-ads">
            {ads.map(ad => (
               <div key={ad.id}>
                  <AdCard 
                     id={ad.id}
                     picture={ad.picture}
                     link={ad.link}
                     price={ad.price}
                     title={ad.title}
                     category={ad.category}
                  />
                  <button onClick={() => setTotal(total + ad.price)}>Add to total</button>
               </div>
            ))}
         </section>
      </>
  );
};

export default RecentAds;
