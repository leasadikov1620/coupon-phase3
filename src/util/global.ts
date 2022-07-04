class Globals{
}
class DevelopmentGlobals extends Globals{

    public urls = {
      
        login: "http://localhost:8080/login",
      //  logout:"http://localhost:8080/"
        logout:"http://localhost:8080/logout"
    }


    public admin = {
        addCompany: "http://localhost:8080/admin/addCompany",
        addCustomer: "http://localhost:8080/admin/addCustomer",
        deleteCompany:"http://localhost:8080/admin/deleteCompany/",
        deleteCustomer:"http://localhost:8080/admin/deleteCustomer/",
        getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
        getAllCustomers:"http://localhost:8080/admin/getAllCustomers",
        oneCompany:"http://localhost:8080/admin/getOneCompany/",
        oneCustomer:"http://localhost:8080/admin/getOneCustomer/",
        updateCompany:"http://localhost:8080/admin/updateCompany",
        updateCustomer:"http://localhost:8080/admin/updateCustomer",
    }

    public company = {
         addCoupon:"http://localhost:8080/company/addCoupon",
        deleteCoupon:"http://localhost:8080/company/deleteCoupon/",
        getCompanyCoupons:"http://localhost:8080/company/getAllCompanyCoupons",
        getCompanyDetails:"http://localhost:8080/company/getCompanyDetails",
        getCouponByCategory:"http://localhost:8080/company/getCouponByCategory/",
        getCouponByMaxPrice:"http://localhost:8080/company/getCouponByMaxPrice/",
        updateCoupon:"http://localhost:8080/company/updateCoupon",
    }

    public customer = {
        getCustomerCoupons:"http://localhost:8080/customer/getCustomerCoupons",
        getCustomerCouponsByCategory:"http://localhost:8080/customer/getCustomerCouponsByCategory/",
        getCustomerCouponsByMaxPrice:"http://localhost:8080/customer/getCustomerCouponsByMaxPrice/",
        getCustomerDetails:"http://localhost:8080/customer/getCustomerDetails",
        purchaseCoupon:"http://localhost:8080/customer/purchaseCoupon/",

    }

}
class ProductionGlobals extends Globals{
    public urls = {
      
         login: "/login",
        //logout:"/"
        logout:"/logout"
    }

    public admin = {
        addCompany: "/addCompany",
        addCustomer: "/addCustomer",
        deleteCompany:"/deleteCompany/",
        deleteCustomer:"/deleteCustomer/",
        getAllCompanies: "/getAllCompanies",
        getAllCustomers:"/getAllCustomers",
        oneCompany:"/getOneCompany/",
        oneCustomer:"/getOneCustomer/",
        updateCompany:"/updateCompany",
        updateCustomer:"/updateCustomer",
    }
    public company = {
        addCoupon:"/addCoupon",
        deleteCoupon:"/deleteCoupon/",
        getCompanyCoupons:"/getAllCompanyCoupons",
        getCompanyDetails:"/getCompanyDetails",
        getCouponByCategory:"/getCouponByCategory/",
        getCouponByMaxPrice:"/getCouponByMaxPrice/",
        updateCoupon:"/updateCoupon",
    }

    public customer = {
        getCustomerCoupons:"/getCustomerCoupons",
        getCustomerCouponsByCategory:"/getCustomerCouponsByCategory/",
        getCustomerCouponsByMaxPrice:"/getCustomerCouponsByMaxPrice/",
        getCustomerDetails:"/getCustomerDetails",
        purchaseCoupon:"/purchaseCoupon/",
    }

}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals :  new DevelopmentGlobals;
export default globals;