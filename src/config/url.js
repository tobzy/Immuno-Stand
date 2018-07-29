const env = process.env.NODE_ENV;

export const baseURL = 'https://immuno-stand.herokuapp.com';

//----AUTH MANAGEMENT URLS---//

export const postLogin = baseURL + '/hospital';
export const postRegister = baseURL + '/signup';
export const getDashboardData = (id) => baseURL + `/hospital/${id}`;
export const postChildren = (hospitalId) => baseURL + `/child/${hospitalId}`;
export const getChild = (childHash) => baseURL + `/child/${childHash}`;
export const updateChild = (childHash, scheduleCode) => baseURL + `/child/${childHash}/${scheduleCode}`;
export const getTransactions = baseURL + '/get_transactions';
export const getUsers = baseURL + '/search_for_users';
export const postTransfer = baseURL + '/transfer';
export const postTopup = baseURL + '/topup';


export const getUser = (userId) => baseURL + `/users/${userId}`;
export const getOverviewSummary = baseURL + '/admin/details';






