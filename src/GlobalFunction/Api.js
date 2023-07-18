import axios from "axios"

// Api load ra tất cả tour trong danh sách tour
export const getTour = async ()=>{
    const res = await axios.get('https://travel2h.click/public_html/api/tour');
    return res.data.data;
}
// Api đăng nhập
export const loginApi = async (email, password)=>{
    const res = await axios.post('https://travel2h.click/public_html/api/login',{
        email,
        password,
    })
    return res.data;
}
// Api đăng ký
export const registerApi = async (customer_name,email,password)=>{
    const res = await axios.post('https://travel2h.click/public_html/api/signup',{
        customer_name,
        email,
        password,
    })
    return res.data;
}
//Api phân trang 
export const paginationApi = async (currentPage)=>{
    const res = await axios.get('https://travel2h.click/public_html/api/pagnination/tour?page=' + currentPage);
    return res.data.data;
}
// Api tìm kiếm
export const searchApi = async (nameTour,priceTour,id_location)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/search?tourLocationId=${id_location}`,{
        params: {name: nameTour , adult_price : priceTour , id_location: id_location}
    })
    return res.data;
}
//Api tỉnh thành 
export const locationApi = async (mien)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/location/${mien}`)
    return res.data.data;
}
//Api chi tiết tour
export const detailTourApi = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/detail/${id}`)
    return res.data.data;
}
// Api load ra tất cả tin tức trong danh sách tour
export const getNews = async ()=>{
    const res = await axios.get('https://travel2h.click/public_html/api/news');
    return res.data.data;
}
// Api chi tiết đơn hàng
export const getDetailOrder = async (id)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/order/detail/${id}`)
    return res.data.data;
}
//Api đơn đặt tour theo id
export const getOrder = async (id)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/order/${id}`)
    return res.data.data;
}
// Api đơn đặt tour

export const getOrderTour = async ()=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/order`)
    return res.data.data;
}
//Api số lượng data của table

export const getQuantityData = async ()=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/analytic/quantityData`)
    return res.data;
}
//Api chi tiếtkhách hàng
export const detailCustomerApi = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/user/detail/${id}`)
    return res.data.data;
}
//Api chi tiếtkhách hàng
export const detailCustomerSocial = async (email) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/user/social/${email}`)
    return res.data;
}
//Api chi tiết tin tức
export const detailNews = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/news/detail/${id}`)
    return res.data.data;
}

//Api chi tiết hóa đơn đặt tour
export const detailTourOder = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/order/detail/${id}`)
return res.data.data;
}
//Api danh sách khách hàng của 1 ngày cụ thể của 1 tour
export const listCustomerOfDate = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/datego/order/${id}`)
    return res.data.data;
}
//Api danh sách khách hàng của 1 ngày cụ thể của 1 tour
export const dategoApi = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/datego/`)
    return res.data.data;
}
//Api danh sách khách hàng của 1 ngày cụ thể của 1 tour
export const changePass = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/user/changepass/${id}`)
    return res.data.data;
}
//Api danh sách khách hàng của 1 ngày cụ thể của 1 tour
export const userFaceio = async (email) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/user/faceio/${email}`)
    return res.data.data;
}
//Api danh sách khách hàng của 1 ngày cụ thể của 1 tour
export const listGuideApi = async () =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/guide`)
    return res.data.data;
}
// Api thêm ngày khởi hành
export const addDateGo = async (id_tour, date , id_guide , seats)=>{
    const res = await axios.post('https://travel2h.click/public_html/api/datego/store',{
        id_tour: id_tour,
        date: date,
        id_guide: id_guide,
        seats: seats
    })
    return res.data;
}
// Api lưu thông tin thanh toán
export const paymentMoMoStore = async (id_customer, id_order , amount_paid , payment_methods)=>{
    const res = await axios.post('https://travel2h.click/public_html/api/momo-payment/store',{
        id_customer: id_customer,
        id_order: id_order,
        amount_paid: amount_paid,
        payment_methods: payment_methods
    })
    return res.data;
}
// Api mã giảm giá
export const applyDiscount = async (total,code)=>{
    const res = await axios.post('https://travel2h.click/public_html/api/apply-discount',{
            total: total,
            discount_code:code
    })
    return res.data;
}

