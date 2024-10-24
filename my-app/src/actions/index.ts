'use server'
import { revalidateTag } from 'next/cache'

export interface IUser {
    id: number;
    email: string;
    name: string;
}
export const handleCreateUserAction = async (data: IUser) => {
    const res = await fetch(`http://localhost:3001/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-users")
    return await res.json()
}

export const handleUpdateUserAction = async (data: IUser) => {
    const res = await fetch(`http://localhost:3001/users/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-users")
    return await res.json()
}

export const handleDeleteUserAction = async (data: IUser) => {
    const res = await fetch(`http://localhost:3001/users/${data.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-users")
    return await res.json()
}

// category parent
export interface ICategoryParent {
    id?: number;
    categoryName: string;
    quantity: number;
}
export const handleAddCategoryParentAction = async (data: ICategoryParent) => {
    const res = await fetch(`http://localhost:3001/CategoriesParent`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    revalidateTag("list-category-parents")
    return await res.json()
}

export const handleUpdateCategoryParentAction = async (data: ICategoryParent) => {
    const res = await fetch(`http://localhost:3001/CategoriesParent/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-category-parents")
    return await res.json()
}

export const handleDeleteCategoryParentAction = async ({ id }: { id: number }) => {
    const res = await fetch(`http://localhost:3001/CategoriesParent/${id}`, {
        method: "DELETE",
    });
    revalidateTag("list-category-parents");
    return await res.json();
};

