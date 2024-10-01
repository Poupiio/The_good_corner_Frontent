import { useParams } from "react-router-dom";

const AdDetails = () => {
   const { id } = useParams();

   return (
      <>
         <h1>Cette page affiche les détails de l'annonce portant l'id { id } 😎</h1>
      </>
   );
};

export default AdDetails;