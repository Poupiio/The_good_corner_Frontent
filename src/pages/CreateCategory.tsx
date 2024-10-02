import axios from "axios";

const CreateCategory = () => {

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form as HTMLFormElement);

      const formJson = Object.fromEntries(formData.entries());
      axios.post("http://localhost:3000/categories", formJson);
   };

   return (
      <>
         <h1>Créer une catégorie</h1>
         <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="name">Nom de la catégorie
               <input type="text" name="name" required />
            </label>
            <button className="button" type="submit">Créer</button>
         </form>
      </>
   );
};

export default CreateCategory;