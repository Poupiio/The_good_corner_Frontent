import { Link,  } from "react-router-dom";
export type CategoryProps = { id: number, name: string };

const Category = ({ name }: CategoryProps) => {
   return (
      <>
         <Link to={`ad/category/${name}`} className="category-navigation-link">{name}</Link>
      </>
   );
};

export default Category;