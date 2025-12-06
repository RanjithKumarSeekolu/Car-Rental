import React, { useState } from 'react';
import useCarStore from '../../../store/useCarStore';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { motion } from 'framer-motion';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../config/firebase';

const HostCarForm = () => {
  const { addCar, loading: storeLoading } = useCarStore();
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price_per_day: '',
    location: '',
    image_url: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;
    
    // Create a unique filename
    const filename = `cars/${Date.now()}_${imageFile.name}`;
    const storageRef = ref(storage, filename);
    
    await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
        // Basic Validation
        if (!formData.make || !formData.model || !formData.price_per_day || (!formData.image_url && !imageFile)) {
        setError('Please fill in all required fields and provide an image.');
        setLoading(false);
        return;
        }

        let imageUrl = formData.image_url;
        if (imageFile) {
            imageUrl = await uploadImage();
        }

        const carData = { ...formData, image_url: imageUrl };

        const result = await addCar(carData);
        
        if (result.success) {
        setSuccess('Your car has been successfully listed!');
        setFormData({
            make: '',
            model: '',
            year: '',
            price_per_day: '',
            location: '',
            image_url: '',
            description: ''
        });
        setImageFile(null);
        } else {
        setError(result.error || 'Failed to list car. Please try again.');
        }
    } catch (err) {
        setError("Failed to upload image or submit form: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">List Your Car</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Make *"
            name="make"
            placeholder="e.g. Toyota"
            value={formData.make}
            onChange={handleChange}
            disabled={loading || storeLoading}
          />
          <Input 
            label="Model *"
            name="model"
            placeholder="e.g. Camry"
            value={formData.model}
            onChange={handleChange}
            disabled={loading || storeLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Year"
            name="year"
            type="number"
            placeholder="e.g. 2023"
            value={formData.year}
            onChange={handleChange}
            disabled={loading || storeLoading}
          />
          <Input 
            label="Price Per Day (₹) *"
            name="price_per_day"
            type="number"
            placeholder="e.g. 2500"
            value={formData.price_per_day}
            onChange={handleChange}
            disabled={loading || storeLoading}
          />
        </div>

        <Input 
          label="Location *"
          name="location"
          placeholder="e.g. Bangalore, India"
          value={formData.location}
          onChange={handleChange}
          disabled={loading || storeLoading}
        />

        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">Car Image *</label>
            <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                disabled={loading || storeLoading}
            />
             {formData.image_url && <span className="text-xs text-gray-400">Or use URL: {formData.image_url}</span>}
        </div>
        
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
                name="description"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[100px]"
                placeholder="Tell us about your car..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading || storeLoading}
            />
        </div>

        <Button 
          type="submit" 
          className="w-full mt-4" 
          disabled={loading || storeLoading}
        >
          {loading || storeLoading ? 'Submitting...' : 'Host Car'}
        </Button>
      </form>
    </div>
  );
};

export default HostCarForm;
