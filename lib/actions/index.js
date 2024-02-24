"use server";
import Product from "@/models/product.model";
import Person from "@/models/person.model";
import { connectToDb } from "../mongoose";
import Flexy from "@/models/flexy.model";

export const getProducts = async (startDate, endDate, searchQuery) => {
    try {
        connectToDb();

        // Convert string dates to Date objects
        const startDateTime = startDate ? new Date(startDate + 'T00:00:00.000Z') : null;
        const endDateTime = endDate ? new Date(endDate + 'T23:59:59.999Z') : null;

        // Construct the basic query
        const query = {};

        // Add date range conditions if provided
        if (startDateTime && endDateTime) {
            query.createdAt = { $gte: startDateTime, $lte: endDateTime };
        }

        // Add search query condition if provided
        if (searchQuery) {
            query.$or = [
                { title: { $regex: new RegExp(searchQuery, 'i') } },
                // Add other fields to search if needed
            ];
        }

        // Find products based on the constructed query
        const products = await Product.find(query);

        return products;
    } catch (error) {
        console.log(error);
    }
};


export const getProductById = async (id) => {
    try {
        connectToDb()
        const product = await Product.findById(id);
        return product;

    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (data) => {
    try {
        connectToDb();

        // Create the product
        const product = await Product.create({
            title: data.title.trim(),
            buyPrice: data.buyPrice,
            sellPrice: data.sellPrice,
            isNotPayed: data.isNotPayed,
        });
        // Check if a person with the given name already exists
        let person = await Person.findOne({ name: data.name.trim() });

        if (!person && product.isNotPayed) {
            // If the person doesn't exist, create a new person
            person = await Person.create({
                name: data.name.trim(),
                unpaidProducts: [product._id],
            });
        }

        // Add the product to the person's unpaidProducts array
        person.unpaidProducts.push(product._id);
        await person.save();

        return "Product created successfully";
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        connectToDb();

        // Find the product by ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            // Handle the case where the product with the given ID is not found
            return "Product not found";
        }

        // Check if the product was associated with a person
        if (deletedProduct.isNotPayed) {
            // Find the associated person by searching in unpaidProducts
            const person = await Person.findOne({ unpaidProducts: id });

            if (person) {
                // Remove the product ID from the unpaidProducts array
                person.unpaidProducts = person.unpaidProducts.filter(productId => productId.toString() !== id);
                await person.save();
            }
        }

        return "Product deleted successfully";
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (id, updatedProduct) => {
    try {
        connectToDb();

        const product = await Product.findByIdAndUpdate(id, {
            title: updatedProduct.title.trim(),
            buyPrice: updatedProduct.buyPrice,
            sellPrice: updatedProduct.sellPrice,
            isNotPayed: updatedProduct.isNotPayed,
        });



        if (!updatedProduct.isNotPayed) {
            const person = await Person.findOne({ unpaidProducts: id });
            if (person) {
                // Remove the product ID from the unpaidProducts array
                person.unpaidProducts = person.unpaidProducts.filter(productId => productId.toString() !== id);
                await person.save();
            }
        }else {
            let person = await Person.findOne({ name: updatedProduct.name.trim() });
            if(person) {
                person.unpaidProducts.push(id);
                await person.save();
            }else {
                await Person.create({
                    name: updatedProduct.name.trim(),
                    unpaidProducts: [id],
                });
            }
        }
        return "Product updated successfully";

    } catch (error) {
        console.log(error);
    }
};



// flex actions 


export const getFlexy = async (startDate, endDate, searchQuery) => {
    try {
        connectToDb();

        // Convert string dates to Date objects
        const startDateTime = startDate ? new Date(startDate + 'T00:00:00.000Z') : null;
        const endDateTime = endDate ? new Date(endDate + 'T23:59:59.999Z') : null;

        // Construct the basic query
        const query = {};

        // Add date range conditions if provided
        if (startDateTime && endDateTime) {
            query.createdAt = { $gte: startDateTime, $lte: endDateTime };
        }

        // Add search query condition if provided
        if (searchQuery) {
            query.$or = [
                { title: { $regex: new RegExp(searchQuery, 'i') } },
                // Add other fields to search if needed
            ];
        }

        // Find products based on the constructed query
        const flexy = await Flexy.find(query);

        return flexy;
    } catch (error) {
        console.log(error);
    }
};

export const getFlexyById = async (id) => {
    try {
        connectToDb();
        const flexy = await Flexy.findById(id);

        return flexy;

    } catch (error) {
        console.log(error);
    }
}

export const createFlexy = async (data) => {
    try {
        connectToDb();


        // Create the product
        const flexy = await Flexy.create({
            title: data.title.trim(),
            buyPrice: data.buyPrice,
            sellPrice: data.sellPrice,
            isNotPayed: data.isNotPayed,
        });
       // Check if a person with the given name already exists
       let person = await Person.findOne({ name: data.name.trim() });

       if (!person && flexy.isNotPayed) {
           // If the person doesn't exist, create a new person
           person = await Person.create({
               name: data.name.trim(),
               unpaidFlexy: [],
           });
       }

        // Add the product to the person's unpaidProducts array
        person.unpaidFlexy.push(flexy._id);
        await person.save();

        return "Product created successfully";
    } catch (error) {
        console.log(error);
    }
};

export const deleteFlexy= async (id) => {
    try {
        connectToDb();

        // Find the Flexy by ID
        const deletedFlexy = await Flexy.findByIdAndDelete(id);

        if (!deletedFlexy) {
            // Handle the case where the Flexy with the given ID is not found
            return "Flexy not found";
        }

        // Check if the Flexy was associated with a person
        if (deletedFlexy.isNotPayed) {
            // Find the associated person by searching in unpaidFlexys
            const person = await Flexy.findOne({ unpaidFlexy: id });

            if (person) {
                // Remove the product ID from the unpaidProducts array
                person.unpaiunpaidFlexyd = person.unpaidFlexy.filter(productId => productId.toString() !== id);
                await person.save();
            }
        }

        return "Product deleted successfully";
    } catch (error) {
        console.log(error);
    }
};

export const updateFlexy = async (id, updatedProduct) => {
    try {
        connectToDb();

        const flexy = await Flexy.findByIdAndUpdate(id, {
            title: updatedProduct.title.trim(),
            buyPrice: updatedProduct.buyPrice,
            sellPrice: updatedProduct.sellPrice,
            isNotPayed: updatedProduct.isNotPayed,
        });



        if (!updatedProduct.isNotPayed) {
            const person = await Person.findOne({ unpaidFlexy: id });
            if (person) {
                // Remove the product ID from the unpaidProducts array
                person.unpaidProducts = person.unpaidProducts.filter(productId => productId.toString() !== id);
                await person.save();
            }
        }else {
            let person = await Person.findOne({ name: updatedProduct.name.trim() });
            if(person) {
                person.unpaidFlexy.push(id);
                await person.save();
            }else {
                await Person.create({
                    name: updatedProduct.name.trim(),
                    unpaidFlexy: [id],
                });
            }
        }
        return "Product updated successfully";

    } catch (error) {
        console.log(error);
    }
};
0

// Peaple actions 

export const getPeople = async () => {
    try {
        connectToDb();
        const people = await Person.find().populate('unpaidFlexy').populate('unpaidProducts')
 
        return people
    } catch (error) {
        console.log(error);
    }
}

export const deletePerson = async (id) => {
    try {
        const deletedPerson  = await Person.findByIdAndDelete(id)

        if (deletedPerson) {
            const unpaidProducts = deletedPerson.unpaidProducts;
            const unpaidFlexy = deletedPerson.unpaidFlexy;

            // Update unpaid products to set isNotPaid to false
            for (const productId of unpaidProducts) {
                await Product.findByIdAndUpdate(productId, { isNotPayed: false });
            }

            // Update unpaid flexy to set isNotPaid to false
            for (const flexyId of unpaidFlexy) {
                await Flexy.findByIdAndUpdate(flexyId, { isNotPayed: false });
            }

            console.log(`Person with ID ${id} deleted successfully.`);
        } else {
            console.log(`Person with ID ${id} not found.`);
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteItemFromPerson = async (personId, productId, flexyId) => {
    try{
        const person = await Person.findById(personId);

        if (person) {
            // Remove productId from unpaidProducts and update isNotPaid to false
            if (productId) {
                person.unpaidProducts.pull(productId);
                await Product.findByIdAndUpdate(productId, { isNotPayed: false });
            }

            // Remove flexyId from unpaidFlexy and update isNotPaid to false
            if (flexyId) {
                person.unpaidFlexy.pull(flexyId);
                await Flexy.findByIdAndUpdate(flexyId, { isNotPayed: false });
            }

            // Save the updated person document
            await person.save();

            console.log('Item deleted successfully.');
            return 'item deleted successfully'
        }

        return "something went wrong"
    }catch(error){
        console.log(error)
    }
}