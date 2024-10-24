import { useEffect, useState } from 'react';

export interface ICategoryParent {
    id?: number;
    categoryName: string;
    quantity: number;
}

interface IProps {
    isDetailModalOpen: boolean;
    setIsDetailModalOpen: (v: boolean) => void;
    dataDetail: ICategoryParent | null; // Dữ liệu chi tiết của danh mục
}

const CategoryParentDetail = (props: IProps) => {
    const { isDetailModalOpen, setIsDetailModalOpen, dataDetail } = props;
    const [formData, setFormData] = useState<{ categoryName: string; quantity: number }>({ categoryName: '', quantity: 0 });

    useEffect(() => {
        if (dataDetail) {
            setFormData({
                categoryName: dataDetail.categoryName,
                quantity: dataDetail.quantity,
            });
        }
    }, [dataDetail]);

    const handleCloseDetailModal = () => {
        setFormData({ categoryName: '', quantity: 0 });
        setIsDetailModalOpen(false);
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${isDetailModalOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 font-sans">
                <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px' }}>Chi tiết danh mục</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }}>Tên danh mục</label>
                        <input
                            type="text"
                            value={formData.categoryName}
                            readOnly // Không cho phép chỉnh sửa
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }}>Số lượng</label>
                        <input
                            type="number"
                            value={formData.quantity}
                            readOnly // Không cho phép chỉnh sửa
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={handleCloseDetailModal}
                            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} // Thêm font chữ
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryParentDetail;
