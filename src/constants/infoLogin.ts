import { FaGoogle } from "react-icons/fa";
import React from "react";

export const infoLogin = {
    typeLogo: 'login',
    button: {
        icon: React.createElement(FaGoogle),
        text: 'Continue with Google',
        type:'google'
    },
    separator: 'or',
    noAccount: {
        text: "Don't have an account? ",
        link: '/register',
        linkText: 'Register'
    },
    terms: "By continuing, you agree to AuditAI's Terms of Service and Privacy Policy."
};