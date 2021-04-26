import apis from '../api';

export const AUCTION_DROPDOWN_LIST = async () => {
    await apis.auctionDropdown().then(auction_dropdown => {
       return  auction_dropdown.data.data
    })
}