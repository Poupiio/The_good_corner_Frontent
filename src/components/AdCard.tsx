export type AdCardProps = {
   id: number, 
   title: string,
   picture: string,
   price: number,
   link: string,
   category: {
      id: number,
      name: string
   }
}

const AdCard = ({ title, picture, price, link, category }: AdCardProps) => {
   return (
      <div>
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
         </div>
      </div>
   );
};

export default AdCard;