module.exports = {
    nameMinLength: 4,
    nameMaxLength: 16,
    nameRegex: /^([a-zA-Z0-9]{4,16})$/,
    passMinLength: 8,
    passMaxLength: 32,
    passRegex: /^([a-z]+[A-Z]+[0-9]+[\,\.\!\@\#\$\%\^\&\*\-\_\?]+){8,32}$/,
    emailMinLength: 8,
    emailMaxLength: 100
};