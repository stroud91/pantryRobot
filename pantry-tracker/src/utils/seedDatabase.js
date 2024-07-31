import { createSeedUsers } from './userManagement';
import { createSeedPantryItems } from './pantryItemManagement';
import { createSeedSuppliers } from './supplierManagement';
import { createSeedOrders } from './orderManagement';
import { createSeedWarehouses } from './warehouseManagement';


export const seedAll = async () => {
  await createSeedUsers();
  await createSeedPantryItems();
  await createSeedSuppliers();
  await createSeedOrders();
  await createSeedWarehouses();
};
