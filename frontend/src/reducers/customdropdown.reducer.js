export const recordStatus  = [
    { value: 'Active', label:'Active' },
    { value: 'Inactive', label:'Inactive' }
]
export const yesNoStatus  = [
    { value: 'Yes', label:'Yes' },
    { value: 'No', label:'No' }
]
export const intervalPeriod  = [
        
    { interval: '30', label:'Monthly', value : 'monthly' },
    { interval: '15', label:'Twice a Month', value : 'twice_a_month' },
    { interval: '90', label:'Quaterly', value : 'quaterly' }
]

export const paymentStatus  = [
        
    { label:'Paid', value : 'Paid', shortcode:'paid' },
    { label:'Unpaid', value : 'Unpaid', shortcode:'unpaid' },
    { label:'Partially Paid', value : 'Partially Paid', shortcode:'partially_paid' },
]

export const defineType  = [
    { label:'Pre Defined', value : 'predefined', shortcode:'predefined' },
    { label:'Post Defined', value : 'postdefined', shortcode:'postdefined' },
    { label:'Semi Predefined', value : 'semipredefined', shortcode:'semipredefined' }
]
const initialState = {
    recordStatus,
    paymentStatus,
    intervalPeriod,
    defineType,
    yesNoStatus
}

export default function dropdownList(state = initialState, action){
    return state;
}
