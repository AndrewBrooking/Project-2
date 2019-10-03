module.exports = {
    nameMinLength: 4,
    nameMaxLength: 16,
    nameRegex: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,16}[a-zA-Z0-9]$/,
    passMinLength: 8,
    passMaxLength: 32,
    passRegex: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){8,32}[a-zA-Z0-9]$/,
    emailMinLength: 8,
    emailMaxLength: 100
};