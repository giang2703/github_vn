import ListCategoriesParent from "@/components/admin/categoriesParent/listCategoryParent";

interface IProps {
    searchParams?: {
        page?: number;
    };
}

const calculatePagesCount = (pageSize: number, totalCount: number) => {
    return totalCount <pageSize ? 1 : Math.ceil(totalCount / pageSize);
}

const CategoriesParentPage = async (props: IProps) => {
    const LIMIT = 5;
    const page = props?.searchParams?.page ?? 1;

    const res = await fetch(`http://localhost:3001/CategoriesParent?_page=${page}&_limit=${LIMIT}&_sort=id&_order=asc`, {
        method: "GET",
    });
    

    const total_items = +(res.headers?.get("X-Total-Count") ?? 0);
    const totalPages = calculatePagesCount(LIMIT, total_items);


    const data = await res.json();
    console.log("check props: ", props);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <ListCategoriesParent
                categories={data ? data : []}
                meta={{
                    current: +page,
                    pageSize: LIMIT,
                    total: total_items,
                }}
            />
        </div>
    );
};

export default CategoriesParentPage;
