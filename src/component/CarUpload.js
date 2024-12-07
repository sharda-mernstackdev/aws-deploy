import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCar, FaGasPump, FaRoad, FaPalette, FaIdCard, FaMoneyBillWave, FaImage } from 'react-icons/fa';

const brands = ['Tata', 'Maruti Suzuki', 'Kia', 'Toyota', 'Honda', 'Ford', 'Hyundai', 'Mahindra', 'Nissan', 'Volkswagen', 'BMW', 'Audi', 'Other'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'];

function CarUpload() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    carName: '',
    brand: '',
    year: new Date().getFullYear(),
    kilometer: 0,
    fuelType: '',
    color: 'red',
    vehicleNumber: '',
    owner: '',
    price: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.carName.trim()) newErrors.carName = 'Car name is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (formData.year < 1900 || formData.year > new Date().getFullYear()) newErrors.year = 'Invalid year';
    if (formData.kilometer < 0) newErrors.kilometer = 'Kilometer must be positive';
    if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle number is required';
    if (!formData.owner.trim()) newErrors.owner = 'Owner name is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      images.forEach((image, index) => {
        formDataToSend.append('images', image.file);
      });
  
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
  
      const response = await fetch('http://3.110.84.64:3000/api/cars/newCar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Car upload failed');
      }
  
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setShowSuccessModal(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function nextStep() {
    if (step < 6) setStep((prevStep) => prevStep + 1);
  }

  function prevStep() {
    if (step > 1) setStep(step - 1);
  }

  function renderStepIndicator() {
    const steps = [
      { icon: FaCar, label: 'Basic Info' },
      { icon: FaGasPump, label: 'Specifications' },
      { icon: FaRoad, label: 'History' },
      { icon: FaPalette, label: 'Appearance' },
      { icon: FaImage, label: 'Images' },
      { icon: FaMoneyBillWave, label: 'Pricing' },
    ];

    return (
      <div className="step-indicator">
        {steps.map((s, index) => (
          <div key={index} className={`step ${index + 1 <= step ? 'active' : ''}`}>
            <s.icon />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    );
  }

  function renderForm() {
    switch (step) {
      case 1:
        return (
          <div className="form-group">
            <label htmlFor="carName">Car Name</label>
            <input
              type="text"
              id="carName"
              name="carName"
              value={formData.carName}
              onChange={handleInputChange}
              placeholder="Enter car name"
            />
            {errors.carName && <p className="error">{errors.carName}</p>}

            <label htmlFor="brand">Brand</label>
            <select id="brand" name="brand" value={formData.brand} onChange={handleInputChange}>
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand.toLowerCase()}>
                  {brand}
                </option>
              ))}
            </select>
            {errors.brand && <p className="error">{errors.brand}</p>}

            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              min="1900"
              max={new Date().getFullYear()}
            />
            {errors.year && <p className="error">{errors.year}</p>}
          </div>
        );
      case 2:
        return (
          <div className="form-group">
            <label htmlFor="kilometer">Kilometer</label>
            <div className="slider-container">
              <input
                type="range"
                id="kilometer"
                name="kilometer"
                min="0"
                max="50000"
                step="100"
                value={formData.kilometer}
                onChange={handleInputChange}
              />
              <span className='text-black'>{formData.kilometer} km</span>
            </div>
            {errors.kilometer && <p className="error">{errors.kilometer}</p>}

            <label htmlFor="fuelType">Fuel Type</label>
            <select id="fuelType" name="fuelType" value={formData.fuelType} onChange={handleInputChange}>
              <option value="">Select fuel type</option>
              {fuelTypes.map((fuel) => (
                <option key={fuel} value={fuel.toLowerCase()}>
                  {fuel}
                </option>
              ))}
            </select>
            {errors.fuelType && <p className="error">{errors.fuelType}</p>}
          </div>
        );
      case 3:
        return (
          <div className="form-group">
            <label htmlFor="owner">Owner</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              placeholder="Enter owner's name"
            />
            {errors.owner && <p className="error">{errors.owner}</p>}

            <label htmlFor="vehicleNumber">Vehicle Number</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
              placeholder="Enter vehicle number"
            />
            {errors.vehicleNumber && <p className="error">{errors.vehicleNumber}</p>}
          </div>
        );
      case 4:
        return (
          <div className="form-group">
            <label htmlFor="color">Color</label>
            <div className="color-picker">
              <input
                type="text"
                id="text"
                name="text"
                value={formData.color}
                onChange={handleInputChange}
              />
              <span>{formData.color}</span>
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter car description"
              rows="5"
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </div>
        );
      case 5:
        return (
          <div className="form-group">
            <label htmlFor="images" >Car Images</label>
            <div
              className="dropzone"
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleImageChange({ target: { files: e.dataTransfer.files } });
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                id="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
              />
              <p className='text-black'>Drag and drop images here or click to upload</p>
            </div>
            {errors.images && <p className="error">{errors.images}</p>}
            <div className="image-preview">
              {images.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img src={image.preview} alt={`Preview ${index + 1}`} />
                  <button type="button" onClick={() => removeImage(index)} className="remove-image">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-group">
            <label htmlFor="price">Price (in ₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
            />
            {errors.price && <p className="error">{errors.price}</p>}

            <div className="summary">
              <h3>Final Summary</h3>
              <div className="summary-grid">
                <div>
                  <p className="label">Car Name:</p>
                  <p>{formData.carName}</p>
                </div>
                <div>
                  <p className="label">Brand:</p>
                  <p>{formData.brand}</p>
                </div>
                <div>
                  <p className="label">Year:</p>
                  <p>{formData.year}</p>
                </div>
                <div>
                  <p className="label">Kilometer:</p>
                  <p>{formData.kilometer} km</p>
                </div>
                <div>
                  <p className="label">Fuel Type:</p>
                  <p>{formData.fuelType}</p>
                </div>
                <div>
                  <p className="label">Color:</p>
                  <p>{formData.color}</p>
                </div>
                <div>
                  <p className="label">Vehicle Number:</p>
                  <p>{formData.vehicleNumber}</p>
                </div>
                <div>
                  <p className="label">Owner:</p>
                  <p className='text-blue-600'>{formData.owner}</p>
                </div>
                <div>
                  <p className="label">Price:</p>
                  <p >₹{formData.price}</p>
                </div>
              </div>
              <div>
                <p className="label">Description:</p>
                <p>{formData.description}</p>
              </div>
              <div>
                <p className="label">Images:</p>
                <div className="summary-images">
                  {images.map((image, index) => (
                    <img key={index} src={image.preview} alt={`Preview ${index + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  function SuccessModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Success!</h2>
          <p>Your car details have been successfully submitted.</p>
          <button
            onClick={() => {
              setFormData({
                carName: '',
                brand: '',
                year: new Date().getFullYear(),
                kilometer: 0,
                fuelType: '',
                color: '#000000',
                vehicleNumber: '',
                owner: '',
                price: '',
                description: '',
              });
              setImages([]);
              setStep(1);
              onClose();
            }}
            className="button primary"
          >
            Submit Another Car
          </button>
          <button onClick={() => navigate('/usedcars')} className="button secondary">
            View Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="hero">
        <div className="hero-content">
          <h1>Professional Car Upload</h1>
          <p>List your car with ease and connect with potential buyers</p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {renderStepIndicator()}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderForm()}
              </motion.div>
            </AnimatePresence>
            <div className="button-group">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="button secondary">
                  Previous
                </button>
              )}
              {step < 6 ? (
                <button type="button" onClick={nextStep} className="button primary">
                  Next
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="button primary">
                  {isSubmitting ? 'Uploading...' : 'Submit Car Details'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <style jsx>{`
        .container {
          font-family: 'Roboto', Arial, sans-serif;
          max-width: 100%;
          margin: 0 auto;
          padding: 0;
          background-color: #f0f4f8;
        }
        .hero {
          background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }
        .hero-content {
          text-align: center;
          margin-bottom: 40px;
        }
        .hero h1 {
          font-size: 48px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .hero p {
          font-size: 24px;
          max-width: 600px;
          margin: 0 auto;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .form-container {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 800px;
        }
        .step-indicator {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          color: #64748b;
          transition: all 0.3s ease;
        }
        .step.active {
          color: #f97316;
          transform: scale(1.1);
        }
        .step svg {
          margin-bottom: 5px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #0c37ad;
        }
        input[type="text"],
        input[type="number"],
        select,
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 16px;
          color: #000000;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus,
        input[type="number"]:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
        }
        input::placeholder,
        textarea::placeholder {
          color: #94a3b8;
        }
        select {
          appearance: none;
          background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
          background-repeat: no-repeat;
          background-position: right 10px top 50%;
          background-size: 12px auto;
        }
        .slider-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        input[type="range"] {
          flex-grow: 1;
          -webkit-appearance: none;
          width: 100%;
          height: 10px;
          border-radius: 5px;
          background: #e2e8f0;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
        }
        .color-picker {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .color-picker input[type="color"] {
          -webkit-appearance: none;
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
        }
        .color-picker input[type="color"]::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        .color-picker input[type="color"]::-webkit-color-swatch {
          border: none;
          border-radius: 50%;
        }
        .dropzone {
          border: 2px dashed #e2e8f0;
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        .dropzone:hover {
          border-color: #f97316;
        }
        .image-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        .image-preview-item {
          position: relative;
        }
        .image-preview-item img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
        }
        .remove-image {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #f97316;
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s, transform 0.1s;
        }
        .button:active {
          transform: scale(0.98);
        }
        .button.primary {
          background-color: #f97316;
          color: white;
        }
        .button.secondary {
          background-color: #1e40af;
          color: white;
        }
        .button:hover {
          opacity: 0.9;
        }
        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .error {
          color: #ef4444;
          font-size: 14px;
          margin-top: 5px;
        }
        .summary h3 {
          color: #0c37ad;
          font-size: 18px;
          margin-bottom: 15px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .summary .label {
          font-weight: bold;
          color: #0c37ad;
        }
        .summary-images {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }
        .summary-images img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }
        .modal-content h2 {
          color: #22c55e;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .modal-content p {
          margin-bottom: 20px;
        }
        .modal-content .button {
          margin: 10px;
        }
        .modal-content .button.secondary {
          background-color: #64748b;
        }
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 36px;
          }
          .hero p {
            font-size: 18px;
          }
          .form-container {
            padding: 20px;
          }
          .step-indicator {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default CarUpload;

