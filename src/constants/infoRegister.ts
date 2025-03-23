import { FaGoogle } from "react-icons/fa";
import React from "react";

export const infoRegister = {
    typeLogo: 'register',
    button: {
        icon: React.createElement(FaGoogle),
        text: 'Continue with Google',
        type:'google'
    },
    separator: 'or',
    haveAccount: {
        text: "Already have an Account?",
        link: '/login',
        linkText: 'Login'
    },
    terms: "By continuing, you agree to AuditAI's Terms of Service and Privacy Policy."
};