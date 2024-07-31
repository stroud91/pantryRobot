import { createSeedUsers } from './userManagement';
import { createSeedWarehouses } from './warehouseManagement';
import { createSeedSuppliers } from './supplierManagement';
import { createSeedOrders } from './orderManagement';
import { createSeedPantryItems } from './pantryItemManagement';
import { auth } from './firebaseConfig';

const seedAll = async () => {
  try {
    await createSeedUsers();
    console.log('Users seeded successfully.');

    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    await createSeedWarehouses();
    console.log('Warehouses seeded successfully.');

    await createSeedSuppliers();
    console.log('Suppliers seeded successfully.');

    await createSeedOrders();
    console.log('Orders seeded successfully.');

    if (userId) {
      await createSeedPantryItems(userId);
      console.log('Pantry items seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export { seedAll };
