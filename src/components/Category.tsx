export type CategoryProps = { id: number, name: string };

const Category = ({ name }: CategoryProps) => {
   return (
      <>
         <a href="" className="category-navigation-link">{name}</a> •
      </>
   );
};

export default Category;