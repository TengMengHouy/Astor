'use client';

import { useState } from 'react';
import api from "@/lib/axios";

export default function ProductForm() {
    const [formData, setFormData] = useState({
        tittle: '',
        image: '',
        description: '',
        price: '',
        rating: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating),
            };

            const res = await api.post('product/create', payload);
            alert(`Product created: ${res.data?.tittle ?? 'Success'}`);
            setFormData({ tittle: '', image: '', description: '', price: '', rating: '' });
        } catch (error: any) {
            console.error(error);
            alert('Failed to create product: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
            <input
                name="tittle"
                value={formData.tittle}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                name="rating"
                type="number"
                step="0.01"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Rating"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Create Product'}
            </button>
        </form>
    );
}
