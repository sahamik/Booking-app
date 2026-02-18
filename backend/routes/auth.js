import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Rekisteröityminen
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Debug: Tulostetaan kaikki käyttäjät ennen tarkistusta
    const allUsers = await User.find();
    console.log("Kaikki käyttäjät DB:ssä:", allUsers);

    // Tarkistetaan onko käyttäjä jo olemassa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Käyttäjä on jo olemassa' });
    }

    // Salasanan hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Luo uusi käyttäjä
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Luo JWT
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name,
        email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});

// Kirjautuminen
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tarkista käyttäjä
    const user = await User.findOne({ email });
    if (!user) {
        console.log("Ei löydy käyttäjää tällä sähköpostilla:", email);
        return res.status(400).json({ message: 'Virheellinen sähköposti tai salasana' });
    }

    // Tarkista salasana
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Salasana ei täsmää käyttäjälle:", email);
        return res.status(400).json({ message: 'Virheellinen sähköposti tai salasana' });
    }
    console.log("Login onnistui:", email);

    // Luo token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Palvelinvirhe' });
  }
});


export default router;

