// import cookie from "cookie";

// const handler = (req, res) => {
//   if (req.method === "POST") {
//     const { username, password } = req.body;
//     if (
//       username === process.env.ADMIN_USERNAME &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       res.setHeader(
//         "Set-Cookie",
//         cookie.serialize("token", process.env.TOKEN, {
//           maxAge: 60 * 60,
//           sameSite: "strict",
//           path: "/",
//         })
//       );
//       res.status(200).json("Succesfull");
//     } else {
//       res.status(400).json("Wrong Credentials!");
//     }
//   }
// };

// export default handler;

import cookie from 'cookie';
import bcrypt from 'bcrypt';
import { Buyer } from '../../models/buyers'; 
import { Seller } from '../../models/sellers';

const loginHandler = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    let user;
    if (userType === 'seller') {
      user = await Seller.findOne({ where: { email } });
    } else if (userType === 'buyer') {
      user = await Buyer.findOne({ where: { email } });
    }

    if (!user) {
      return res.status(404).json('User not found');
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json('Wrong credentials');
    }

    // Set cookie for authentication
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', process.env.TOKEN, {
        maxAge: 60 * 60 * 24, // 1 day expiration
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json('Login successful');
  } catch (err) {
    res.status(500).json('Error during login');
  }
};

export default loginHandler;
