export default async function () {
  const imports = (await import('@medusajs/medusa/dist/api/routes/admin/store/index')) as any;
  imports.allowedAdminStoreRelation = [...imports.allowedAdminStoreRelation, 'roles'];
}
