// import Seller from "../../models/Seller";
// import Buyer from "../../models/Buyer";
// import bcrypt from "bcrypt";

// const register = async (req, res) => {
//   if (req.method === "POST") {
//     const { email, password, userType, ...otherDetails } = req.body;
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       if (userType === "seller") {
//         const newSeller = new Seller({ email, password: hashedPassword, ...otherDetails });
//         await newSeller.save();
//         res.status(201).json({ message: "Seller registered successfully!" });
//       } else if (userType === "buyer") {
//         const newBuyer = new Buyer({ email, password: hashedPassword, ...otherDetails });
//         await newBuyer.save();
//         res.status(201).json({ message: "Buyer registered successfully!" });
//       } else {
//         res.status(400).json({ error: "Invalid user type!" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// };

// export default register;

import bcrypt from 'bcrypt';
import { Buyer } from '../../models/buyers'; 
import { Seller } from '../../models/sellers';

const registerHandler = async (req, res) => {
  const { username, email, password, userType } = req.body;

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    if (userType === 'seller') {
      // Register seller
      const newSeller = await Seller.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(newSeller);
    } else if (userType === 'buyer') {
      // Register buyer
      const newBuyer = await Buyer.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(newBuyer);
    } else {
      res.status(400).json({ message: 'Invalid user type' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export default registerHandler;
