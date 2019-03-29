/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['ADMINWEB'],
    staff    : ['ADMINWEB', 'DEBTOR'],
    user     : ['ADMINWEB', 'DEBTOR'],
    onlyGuest: ['guest']
};

export default authRoles;
