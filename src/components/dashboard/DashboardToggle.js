import React, { useCallback } from 'react';
import { Button, Drawer, Icon, Alert } from 'rsuite';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';
import Dashboard from '.';
import { auth } from '../../misc/firebase';


const DashboardToggle = () => {
    const { isOpen, close, open } = useModalState();
    const isMobile = useMediaQuery('(max-width: 992px)');

    const onSignOut = useCallback(() => {
        auth.signOut(); // Corrected from auth.SignOut();

        Alert.info('Signed out', 4000);
        close();
    }, [close]);

    return (
        <>
            <Button block color="blue" onClick={open}>
                <Icon icon="dashboard" /> Dashboard
            </Button>
            <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
                <Dashboard onSignOut={onSignOut}/>
            </Drawer>
        </>
    );
};

export default DashboardToggle;
