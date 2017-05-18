"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function valid_email_address(email) {
    console.log("Deprecated, use isemail from: https://github.com/hapijs/isemail/");
    // Lax email validation to allow for https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Internationalized_country_code_top-level_domains
    var valid = email && email.match(/^\S+@\S+\.\S+$/);
    return !!valid;
}
exports.valid_email_address = valid_email_address;
//# sourceMappingURL=email.js.map