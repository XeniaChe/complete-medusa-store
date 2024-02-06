export default async function () {
  const imports = (await import('@medusajs/medusa/dist/api/routes/admin/users/index')) as any;
  imports.allowedAdminUsersFields = [...imports.allowedAdminUsersFields, 'store_id', 'role_id'];
  imports.defaultAdminUsersFields = [...imports.defaultAdminUsersFields, 'store_id', 'role_id'];
  imports.allowedAdminUserRelation = [...imports.allowedAdminUserRelation, 'store', 'teamRole'];
}
