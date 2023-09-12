import React from "react";
import { Router } from "@/core/router";
import { ProfileProvider, AccountProvider } from "@/core/profile";

import "./style.css";

export const App: React.FC = () => {
    return (
        <ProfileProvider>
            <AccountProvider>
                <Router />
            </AccountProvider>
        </ProfileProvider>
    );
};
