// Role constants and utilities
export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
};

// Check if user is admin
export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === ROLES.ADMIN;
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Logout
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userRole");
};
