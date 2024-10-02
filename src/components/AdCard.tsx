import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export type AdCardProps = {
   id: number, 
   title: string,
   description: string,
   owner: string,
   picture: string,
   price: number,
   location: string,
   createdAt: Date,
   category: {
      id: number,
      name: string
   }
}

const AdCard = ({ id, title, picture, price, category }: AdCardProps) => {
   const navigate = useNavigate(); 

   // Redirection vers la page de modification de l'annonce
   const handleUpdate = async () => {
      navigate(`/ad/edit/${id}`);
   }

   const handleDelete = async () => {
      try {
         axios.delete(`http://localhost:3000/ads/${id}`);
      } catch (err) {
         console.log("error: ", err);
      }
   };

   return (
      <div className="ad-card-container">
         <Link className="ad-card-link" to={`/ad/${id}`}>
            <img className="ad-card-image" src={picture} />
            <div className="ad-card-text">
               <div className="ad-card-title">{title}</div>
               <div className="ad-card-price">{price} €</div>
            </div>
            <div className="ad-card-content">
               <div className="ad-card-category">
                  <p>{category.name}</p>
               </div>
               <button className="button ad-card-update" onClick={handleUpdate}>Modifier</button>
               <button className="button ad-card-delete" onClick={handleDelete}>Supprimer</button>
            </div>
         </Link>
      </div>
   );
};

export default AdCard;