

export function valid_email_address(email?: string): boolean {
    var valid = email && email.match(/^\S+@\S+[\.][0-9a-z]+$/);
    return !!valid;
}
