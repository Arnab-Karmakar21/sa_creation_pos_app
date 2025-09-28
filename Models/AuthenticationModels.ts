export interface LoginPayload {
    username: string;
    password: string;
}
export interface GenerateCodePayload{
    partner_phone: string;
    partner_email: string;
    partner_category: number;
}
export interface SignUpPayload {
    firstname: string;
    lastname: string;
    designation: string;
    partner_code: string;
    addressline1: string;
    addressline2: string;
    state_id: number;
    country_id: number;
    pin: number;
    city_id: number;
    password: string;
    confirm_password?: string;
    company_name: string;
    billing_name: string;
    gst_numbers: string;
    pan: string;
    account_holder_name: string;
    account_no: string;
    ifsc_code: string;
    bank_name: string;
}