// export const API_HOSTNAME = 'http://localhost:3001';

// console.log("In api.jsx", process.env.API_HOSTNAME);

export const API_HOSTNAME = process.env.API_HOSTNAME || "http://localhost:3001"; 
export const DEFAULT_ERROR_MESSAGE = 'Something Went Wrong';

export default {};