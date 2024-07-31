import { createSeedUsers } from './userManagement';
import { createSeedWarehouses } from './warehouseManagement';
import { createSeedSuppliers } from './supplierManagement';
import { createSeedOrders } from './orderManagement';
import { createSeedPantryItems } from './pantryItemManagement';

const seedAll = async () => {
  try {
    console.log("Starting database seeding...");

    // Seed users
    await createSeedUsers();
    console.log("Users seeded successfully.");

    // Seed warehouses
    await createSeedWarehouses();
    console.log("Warehouses seeded successfully.");

    // Seed suppliers
    await createSeedSuppliers();
    console.log("Suppliers seeded successfully.");

    // Seed orders
    await createSeedOrders();
    console.log("Orders seeded successfully.");

    // Seed pantry items
    await createSeedPantryItems();
    console.log("Pantry items seeded successfully.");

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export { seedAll };
