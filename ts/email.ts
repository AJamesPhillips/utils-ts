

export function valid_email_address(email?: string): boolean {
    console.log("Deprecated, use isemail from: https://github.com/hapijs/isemail/")
    // Lax email validation to allow for https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Internationalized_country_code_top-level_domains
    var valid = email && email.match(/^\S+@\S+\.\S+$/);
    return !!valid;
}
