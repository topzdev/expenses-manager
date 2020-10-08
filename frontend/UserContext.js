import React from 'react';

// Create a context object
const UserContext = React.createContext();

// Provider component that allows to consume/use data from context
export const UserProvider = UserContext.Provider;

export default UserContext;