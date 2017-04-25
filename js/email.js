"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function valid_email_address(email) {
    var valid = email && email.match(/^\S+@\S+[\.][0-9a-z]+$/);
    return !!valid;
}
exports.valid_email_address = valid_email_address;
//# sourceMappingURL=email.js.map