import { useCallback, useEffect, useState } from "react";

let logOutTimer = "";

export const useAuth = () => {

    const [token, setToken] = useState<string | null>();
    const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
    const [userId, setUserId] = useState<string | null>();
    const [userName, setUserName] = useState<string | null>();
  
    // Set the local environment to retain the user's login information.  Expires after a timeout.
    const login = useCallback((uid: string, userName: string, token: string, expiration: Date) => {
      setToken(token);
      setUserId(uid);
      setUserName(userName);
  
      const tokenExpirationDate = new Date(expiration || new Date().getTime() + (1000 * 60 * 60));
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem('userData', JSON.stringify({
        userId: uid,
        userName: userName,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      }))
    }, [])
  
    // On load, retrieve any user's info, if any exists.
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData')!);
      if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
        login(storedData.userId, storedData.userName, storedData.token, storedData.expiration);
      }
    }, [login]);
    
    // Removes the user's data from the session
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      setUserName(null);
      setTokenExpirationDate(null);
      localStorage.removeItem('userData');
    }, [])
  
    // When the session info changes (i.e. logging in), set a timer to log the user out after a period of time.
    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remaningTime = tokenExpirationDate.getTime() - new Date().getTime();
        logOutTimer = setTimeout(logout, remaningTime).toString();
      } else {
        clearTimeout(logOutTimer);
      }
    }, [token, logout, tokenExpirationDate]);

  return { userId, userName, token, login, logout };
}