
export default function Home() {
  async function create(formData: FormData) {
    'use server'
    console.log("check form data: ", formData.get("username"));
    
  }

  return (
    <>
    <div>Trang chủ Admin</div>
    <div>
     
    </div>
    
    </>
    
  )
}
