import { handleAddCategoryParentAction } from '@/actions';
import { useState } from 'react';

export interface ICategoryParent {
    id?: number;
    categoryName: string;
    quantity: number;
}

interface IProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (v: boolean) => void;
}

const AddCategoryParent = (props: IProps) => {
    const { isAddModalOpen, setIsAddModalOpen } = props;
    const [formData, setFormData] = useState<ICategoryParent>({ categoryName: '', quantity: 0 });

    const handleCloseAddModal = () => {
        setFormData({ categoryName: '', quantity: 0 });
        setIsAddModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "quantity" ? Number(value) : value }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (formData.quantity <= 0) {
            alert('Số lượng phải lớn hơn 0.');
            return;
        }
    
        const res = await handleAddCategoryParentAction(formData);
        if (res?.id) {
            handleCloseAddModal();
            alert('Add succeed!');
        }
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isAddModalOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 font-sans">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px' }}>Thêm danh mục</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }}>Tên danh mục</label>
                        <input
                            type="text"
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }}>Số lượng</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                min="0" // Đảm bảo không nhập số âm
                                required
                                style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400"></span> {/* Đơn vị "pcs" nếu cần */}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={handleCloseAddModal}
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        >
                            Huỷ
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        >
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryParent;
