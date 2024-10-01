export type TagProps = { id: number, name: string };

const Tag = ({ name }: TagProps) => {
   return (
      <>
         <span className="tag">{name}</span>
      </>
   );
};

export default Tag;