import { Helmet } from 'react-helmet-async';
import AddPlantForm from '../../../components/Form/AddPlantForm';
import { imageUpload } from '../../../api/utils';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddPlant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadButtonText, setUploadButtonText] = useState({ name: 'Upload Image' });
  const [loading, setLoading] = useState(false);

  // handle form submission
  const handleSubmit = async (e) => {
    // before sending data to server, set Loading state to true
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // create plant object
    const plant = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
      seller,
    };

    // save plant data to database
    try {
      // post request to server
      await axiosSecure.post('/plants', plant);
      toast.success('plant data  added successfully');

      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadButtonText={uploadButtonText}
        setUploadButtonText={setUploadButtonText}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
