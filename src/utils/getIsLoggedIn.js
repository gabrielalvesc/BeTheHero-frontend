const getIsLoggedIn = () => localStorage.getItem('ong') !== null;

export default getIsLoggedIn;
