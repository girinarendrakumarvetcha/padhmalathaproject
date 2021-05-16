const recordStatus  = [
    { value: 'Active', label:'Active' },
    { value: 'Inactive', label:'Inactive' }
]
const intervalPeriod  = [
        
    { interval: '15', label:'Twice a Month', value : 'twice_a_month' },
    { interval: '90', label:'Quaterly', value : 'quaterly' }
]

const paymentStatus  = [
        
    { label:'Paid', value : 'Paid', shortcode:'paid' },
    { label:'Unpaid', value : 'Unpaid', shortcode:'unpaid' },
    { label:'Partially Paid', value : 'Partially Paid', shortcode:'partially_paid' },
]
const initialState = {
    record_status : recordStatus,
    payment_status : paymentStatus,
    interval_period : intervalPeriod
}
export default function dropdownList(state = initialState, action){
    return state;
}
