import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        let userRef;
        
        const authUnsub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
              // user is logged in
              userRef = database.ref(`/profiles/${authObj.uid}`);
              // get user profile from the database
              userRef.on('value', snap => {
                const { name, createdAt } = snap.val();
      
                // construct object to be set as profile state
                const data = {
                  name,
                  createdAt,
                  uid: authObj.uid,
                  email: authObj.email,
                };
      
                // update states
                setProfile(data);
                setIsLoading(false);
              });
            } else {
              // user is NOT logged in
              if (userRef) {
                userRef.off();
              }
      
              // update states
              setProfile(null);
              setIsLoading(false);
            }
          });

        return () => {
            authUnsub();

            if(userRef) {
                userRef.off();
            }
        }

    }, []);


    return (
     <ProfileContext.Provider value={{ isLoading, profile}}>
        {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);

