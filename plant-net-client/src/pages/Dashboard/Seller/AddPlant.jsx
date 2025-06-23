import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/utils";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const handelFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const form = e.target;
    const name = form?.name?.value;
    const category = form?.category?.value;
    const description = form?.description?.value;
    const price = form?.price?.value;
    const quantity = form?.quantity?.value;
    const image = form?.image?.files[0];

    try {
      const imageUrl = await imageUpload(image);
      console.log(imageUrl);
      const plantData = {
        name,
        category,
        description,
        price,
        quantity,
        image: imageUrl,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };
      console.log(plantData);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-plant`,
        plantData
      );
      toast.success("Data Add success");
      form.reset();
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div>
      {/* Form */}
      <AddPlantForm
        handelFormSubmit={handelFormSubmit}
        isUploading={isUploading}
      />
    </div>
  );
};

export default AddPlant;
