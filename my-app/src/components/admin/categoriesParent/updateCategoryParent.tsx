import { handleUpdateCategoryParentAction } from '@/actions';
import { useEffect, useState } from 'react';

export interface ICategoryParent {
    id?: number;
    categoryName: string;
    quantity: number;
}

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: ICategoryParent | null; // Thay đổi type ở đây
    setDataUpdate: (data: ICategoryParent | null) => void; // Cập nhật type cho setDataUpdate
}

const UpdateCategoryParent = (props: IProps) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    const [formData, setFormData] = useState<{ categoryName: string; quantity: number }>({ categoryName: '', quantity: 0 });

    useEffect(() => {
        if (dataUpdate) {
            setFormData({
                categoryName: dataUpdate.categoryName,
                quantity: dataUpdate.quantity,
            });
        }
    }, [dataUpdate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "quantity" ? Number(value) : value }));
    };

    const handleCloseUpdateModal = () => {
        setFormData({ categoryName: '', quantity: 0 });
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (dataUpdate) {
            const data = {
                id: dataUpdate.id,
                ...formData,
            };

            await handleUpdateCategoryParentAction(data);
            handleCloseUpdateModal();
            alert('Cập nhật thành công!');
        }
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isUpdateModalOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 font-sans">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px' }}>Cập nhật danh mục</h2>
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
                        <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }}>Số lượng</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={handleCloseUpdateModal}
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        >
                            Huỷ
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategoryParent;
