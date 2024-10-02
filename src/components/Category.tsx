import { Link } from "react-router-dom";

export type CategoryProps = { id: number, name: string };

const Category = ({ id, name }: CategoryProps) => {
   return (
      <>
         <Link to={`/category/${id}`} className="category-navigation-link">{name}</Link>
      </>
   );
};

export default Category;