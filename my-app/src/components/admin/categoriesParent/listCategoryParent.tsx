'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddCategoryParent from './addCategoryParent';
import UpdateCategoryParent from './updateCategoryParent';
import DetailCategoryParent from './detailCategoryParent';
import { handleDeleteCategoryParentAction } from '@/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface ICategoryParent {
    id?: number,
    categoryName: string;
    quantity: number;
}

interface IProps {
    categories: ICategoryParent[];
    meta: {
        current: number;
        pageSize: number;
        total: number;
    }
}

const CategoryParentTable = (props: IProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { categories, meta } = props;
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<ICategoryParent | null>(null);
    const [dataDetail, setDataDetail] = useState<ICategoryParent | null>(null);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<ICategoryParent | null>(null);

    useEffect(() => {
        if (categories) setIsFetching(false);
    }, [categories]);

    const handleDeleteCategoryParent = async () => {
        if (categoryToDelete?.id !== undefined) {
            await handleDeleteCategoryParentAction({ id: categoryToDelete.id });
            setCategoryToDelete(null); // Reset categoryToDelete after deletion
            setIsConfirmDeleteOpen(false); // Close the confirmation modal
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center mb-4 font-sans text-lg leading-5">
                <span className="text-lg leading-5 font-bold">Danh sách danh mục</span>
                {isFetching && <div className="text-center">Đang tải...</div>}
                <button
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-500"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    + Thêm mới
                </button>
            </div>
        );
    };

    const onChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        replace(`${pathname}?${params.toString()}`);
        setIsFetching(true);
    };

    // Tính toán tổng số trang
    const totalPages = Math.ceil(meta.total / meta.pageSize);

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans text-sm leading-5">
            {renderHeader()}

            {/* Table */}
            <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                <table className="min-w-full text-left table-auto">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-4">Id</th>
                            <th className="p-4">Tên danh mục</th>
                            <th className="p-4">Số lượng</th>
                            <th className="p-4 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-b">
                                <td className="p-4">{category.id}</td>
                                <td className="p-4">{category.categoryName}</td>
                                <td className="p-4">{category.quantity}</td>
                                <td className="p-4 text-center">
                                    <div className="flex justify-center gap-4">
                                        <FontAwesomeIcon 
                                            icon={faEye}
                                            className="w-5 h-5 text-orange-500 cursor-pointer"
                                            onClick={() => {
                                                setIsDetailModalOpen(true);
                                                setDataDetail(category);
                                            }}
                                        />
                                        <FontAwesomeIcon 
                                            icon={faEdit}
                                            className="w-5 h-5 text-blue-500 cursor-pointer"
                                            onClick={() => {
                                                setIsUpdateModalOpen(true);
                                                setDataUpdate(category);
                                            }}
                                        />
                                        <FontAwesomeIcon 
                                            icon={faTrash}
                                            className="w-5 h-5 text-red-500 cursor-pointer"
                                            onClick={() => {
                                                setCategoryToDelete(category);
                                                setIsConfirmDeleteOpen(true);
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="p-4 text-right">
                    <span>{`Trang ${meta.current} - Tổng số ${totalPages} trang`}</span>
                    <button
                        className={`px-3 py-1 rounded ${meta.current === 1 ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'}`}
                        onClick={() => onChange(meta.current - 1)}
                        disabled={meta.current === 1}
                    >
                        &lt;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`px-3 py-1 rounded ${page === meta.current ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'}`}
                            onClick={() => onChange(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className={`px-3 py-1 rounded ${meta.current === totalPages ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'}`}
                        onClick={() => onChange(meta.current + 1)}
                        disabled={meta.current === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* Modal xác nhận xoá */}
            {isConfirmDeleteOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Bạn có chắc chắn muốn xoá?</h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                                onClick={handleDeleteCategoryParent}
                            >
                                Xoá
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={() => setIsConfirmDeleteOpen(false)}
                            >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AddCategoryParent isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
            <UpdateCategoryParent
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <DetailCategoryParent 
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
                dataDetail={dataDetail}
            />
        </div>
    );
};

export default CategoryParentTable;
