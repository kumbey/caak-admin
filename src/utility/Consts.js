const Consts = {
    typeEmail: "email",
    typePhoneNumber: "phonenumber",
    typeMismatch: "mismatch",
    typeUsername: "username",
    typeName: "name",
    typeGender: "gender",
    typePassword: "password",
    typePasswordRepeat: "passwordRepeat",
    typeRequired: "required",
    typeDate: "date",
    typeConfirmationCode: "confirmationCode",
    regexUsername: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^[0-9]{8}$/,
    regexPassword: /^(?=.*[0-9])(?=.*[a-z]).{8,}$/,
    regexDate: /^\d{4}-\d{2}-\d{2}$/,
    regexNumber: /[^\d.]/ig,
    SS_UserKey: "user",
    signInUp: "signInUp",
    signIn: "signIn",
    signUp: "signUp"
}

export default Consts