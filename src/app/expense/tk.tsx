// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { filters = {}, pagination = {} } = body;
    
//     const { page = 1, limit = 10 } = pagination;
//     const skip = (page - 1) * limit;

//     // Build where clause based on filters
//     const where = {};
    
//     // Text search on itemName
//     if (filters.search) {
//       where.itemName = {
//         contains: filters.search,
//         mode: 'insensitive',
//       };
//     }
    
//     // Price range filter
//     if (filters.minPrice || filters.maxPrice) {
//       where.itemPrice = {};
//       if (filters.minPrice) where.itemPrice.gte = filters.minPrice;
//       if (filters.maxPrice) where.itemPrice.lte = filters.maxPrice;
//     }
    
//     // Date range filter
//     if (filters.startDate && filters.endDate) {
//       where.dateTime = {
//         gte: new Date(filters.startDate),
//         lte: new Date(filters.endDate),
//       };
//     }
    
//     // Filter by capacity
//     if (filters.minCapacity || filters.maxCapacity) {
//       where.capacity = {};
//       if (filters.minCapacity) where.capacity.gte = filters.minCapacity;
//       if (filters.maxCapacity) where.capacity.lte = filters.maxCapacity;
//     }
    
//     // Filter by unit
//     if (filters.unit) {
//       where.unit = filters.unit;
//     }

//     const total = await prisma.expense.count({ where });

//     const data = await prisma.expense.findMany({
//       where,
//       skip,
//       take: limit,
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     return Response.json({
//       success: true,
//       data,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit),
//       },
//     });
    
//   } catch (error) {
//     console.error('Error in POST /api/expense:', error);
//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }