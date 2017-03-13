

export function valid_email(email?: string): boolean {
  var valid = email && email.match(/^\S+@\S+[\.][0-9a-z]+$/);
  return !!valid;
}
