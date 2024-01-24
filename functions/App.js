const express = require("express");
const app = express();
const cors = require("cors");
// const { locations, car_categories } = require("./Cars");

//firebase
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin-sdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

//middleware
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:1234", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
  allowedHeaders: "Content-Type", // Allow this header
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Car Rantal");
});

app.get("/cars/getAllCars", async (req, res) => {
  try {
    const collection = await db.collection("cars");
    const snapshot = await collection.get();
    const cars = [];
    snapshot.forEach((doc) => {
      cars.push(doc.data());
    });
    res.json(cars);
  } catch (err) {
    res.status(400).json({ status: -1, error: err });
  }
});

app.get("/cars/getCars", async (req, res) => {
  const limit = req.query.limit;
  try {
    const collection = await db.collection("cars");
    const snapshot = await collection.get();
    const cars = [];
    snapshot.forEach((doc) => {
      const car_category = doc.data();
      cars.push({ ...car_category, cars: car_category.cars.slice(0, limit) });
    });
    res.json(cars);
  } catch (err) {
    res.status(400).json({ status: -1, error: err });
  }
});

app.get("/cars/getCategoryCars/:id", async (req, res) => {
  const carType = req.params.id;
  try {
    const docRef = db.collection("cars").doc(carType);
    const doc = await docRef.get();
    if (doc.exists) {
      res.status(200).json({ status: 1, data: doc.data() });
    } else {
      res.status(404).json({ status: -1, error: "Car not found" });
    }
  } catch (err) {
    res.status(400).json({ status: -1, error: err });
  }
});

app.get("/cars/getAvailableCars", async (req, res) => {
  const {
    pickUpLocation,
    dropOffLocation,
    pickUpDate,
    pickUpTime,
    dropOffData,
    dropOffTime,
  } = req.body;
});

app.post("/cars/bookCar", async (req, res) => {
  const {
    carId,
    carType,
    selectedPickUpLocation,
    selectedDropOffLocation,
    selectedPickUpDate,
    selectedPickUpTime,
    selectedDropOffDate,
    selectedDropOffTime,
  } = req.body;
  try {
    const result = await db.collection("bookings").doc(carType).set({
      carId,
      carType,
      selectedPickUpLocation,
      selectedDropOffLocation,
      selectedPickUpDate,
      selectedPickUpTime,
      selectedDropOffDate,
      selectedDropOffTime,
    });
    res.status(200).json({ status: 1, data: result });
  } catch (err) {
    res.status(200).json({ status: -1, error: err });
  }
});

app.get("/locations/getLocations", async (req, res) => {
  try {
    const collection = await db.collection("locations");
    const snapshot = await collection.get();
    const locations = [];
    snapshot.forEach((doc) => {
      locations.push(doc.data());
    });
    res.json(locations);
  } catch (err) {
    res.status(400).json({ status: -1, error: err });
  }
});

// const importData = async () => {
//   try {
//     const collection = await db.collection("locations");
//     for (const location of locations) {
//       const docId = location.name;
//       await collection.doc(docId).set(location);
//     }
//     console.log("datasent scucc");
//   } catch (err) {
//     console.log(err);
//   }
// };
// importData();

// const importData = async () => {
//   try {
//     const collection = await db.collection("cars");
//     for (const cars of car_categories) {
//       const docId = cars.name;
//       await collection.doc(docId).set(cars);
//     }
//     console.log("data sent successfully");
//   } catch (err) {
//     console.log(err);
//   }
// };

// importData();

const port = 4000;
app.listen(port, console.log(`listening on port ${4000}`));
