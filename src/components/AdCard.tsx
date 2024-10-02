import axios from "axios";

export type AdCardProps = {
   id: number, 
   title: string,
   description: string,
   owner: string,
   picture: string,
   price: number,
   link: string,
   location: string,
   category: {
      id: number,
      name: string
   }
}

const AdCard = ({ id, title, picture, price, link, category }: AdCardProps) => {

   const handleUpdate = async () => {
      console.log(id);
      
      // try {
         
      //    axios.put(`http://localhost:3000/ads/${id}`);
      // } catch (err) {
      //    console.log("error: ", err);
      // }
      
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
         <a className="ad-card-link" href={link}>
            <img className="ad-card-image" src={picture} />
            <div className="ad-card-text">
               <div className="ad-card-title">{title}</div>
               <div className="ad-card-price">{price} €</div>
            </div>
            <div className="ad-card-category">
               <p>{category.name}</p>
            </div>
         </a>
         <button className="button ad-card-update" onClick={handleUpdate}>Modifier</button>
         <button className="button ad-card-delete" onClick={handleDelete}>Supprimer</button>
      </div>
   );
};

export default AdCard;