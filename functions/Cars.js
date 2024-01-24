const locations = [
  { name: "Banjara Hills, Hyderabad", lat: 17.415432, lng: 78.434799 },
  { name: "Jubilee Hills, Hyderabad", lat: 17.421306, lng: 78.434202 },
  { name: "Hitech City, Hyderabad", lat: 17.441136, lng: 78.393282 },
  { name: "Secunderabad, Hyderabad", lat: 17.433489, lng: 78.500862 },
  // Visakhapatnam
  {
    name: "Visakhapatnam International Airport, Visakhapatnam",
    lat: 17.721476,
    lng: 83.226425,
  },
  { name: "Rushikonda Beach, Visakhapatnam", lat: 17.743201, lng: 83.3438 },
  { name: "Kailasagiri, Visakhapatnam", lat: 17.722949, lng: 83.328109 },
  // Bengaluru
  {
    name: "Kempegowda International Airport, Bengaluru",
    lat: 13.198635,
    lng: 77.706592,
  },
  { name: "Cubbon Park, Bengaluru", lat: 12.977442, lng: 77.59525 },
  {
    name: "Lalbagh Botanical Garden, Bengaluru",
    lat: 12.949748,
    lng: 77.583055,
  },
  // Kakinada
  { name: "madhurapudi airport", lat: 17.005229, lng: 81.784309 },
  { name: "Bhanugudi, Kakinada", lat: 16.965915, lng: 82.238838 },
  // Vijayawada
  { name: "Vijayawada Airport", lat: 16.529742, lng: 80.796649 },
  { name: "Bhavani Island, Vijayawada", lat: 16.500458, lng: 80.704342 },
];

const car_categories = [
  {
    id: 1,
    name: "SUV",
    image_url:
      "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg?q=75&q=75",
    cars: [
      {
        id: 101,
        make: "Toyota",
        model: "Fortuner",
        year: 2022,
        price_per_day: 90,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "3.0L V6",
          transmission: "Automatic",
          seating_capacity: 7,
        },
        image_url:
          "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg?q=75&q=75",
      },
      {
        id: 102,
        make: "Ford",
        model: "Endeavour",
        year: 2022,
        price_per_day: 85,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "2.0L EcoBlue",
          transmission: "Automatic",
          seating_capacity: 7,
        },
        image_url:
          "https://imgd.aeplcdn.com/664x374/n/cw/ec/37640/endeavour-exterior-right-front-three-quarter-149473.jpeg?q=75&q=75",
      },
      {
        id: 103,
        make: "Nissan",
        model: "Pathfinder",
        year: 2022,
        price_per_day: 80,
        location: {
          name: "Hitech City, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "3.5L V6",
          transmission: "Automatic",
          seating_capacity: 7,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/10/2018/11/2019-nissan-pathfinder-s-4wd-suv-angular-front.png?fit=around%7C770:481.25",
      },
      {
        id: 104,
        make: "Chevrolet",
        model: "Traverse",
        year: 2022,
        price_per_day: 75,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "3.6L V6",
          transmission: "Automatic",
          seating_capacity: 8,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/10/2017/09/2018-chevrolet-traverse-1lt-suv-angular-front.png",
      },
      {
        id: 105,
        make: "Honda",
        model: "Pilot",
        year: 2022,
        price_per_day: 88,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "3.5L V6",
          transmission: "Automatic",
          seating_capacity: 8,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/10/2022/02/2022-honda-pilot-touring-suv-angular-front.png?fit=around%7C875:492.1875",
      },
      {
        id: 106,
        make: "Hyundai",
        model: "Santa Fe",
        year: 2022,
        price_per_day: 82,
        location: {
          name: "Kukatpally, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/10/2021/09/2021-hyundai-santa-fe-hybrid-limited-hev-4wd-suv-angular-front.png?fit=around%7C770:481.25",
      },
      {
        id: 107,
        make: "Jeep",
        model: "Grand Cherokee",
        year: 2022,
        price_per_day: 95,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "3.6L V6",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/10/2021/09/2021-jeep-grand-cherokee-l-limited-4wd-suv-angular-front.png?fit=around%7C875:492.1875",
      },
      {
        id: 108,
        make: "Mitsubishi",
        model: "Outlander",
        year: 2022,
        price_per_day: 78,
        location: {
          name: "Secunderabad, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.4L Inline-4",
          transmission: "CVT",
          seating_capacity: 7,
        },
        image_url:
          "https://www.motortrend.com/uploads/izmo/mitsubishi/outlander/2022/outlander.png?fit=around%7C875:492.1875",
      },
      {
        id: 109,
        make: "Subaru",
        model: "Ascent",
        year: 2022,
        price_per_day: 86,
        location: {
          name: "Ameerpet, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.4L Turbocharged Boxer-4",
          transmission: "CVT",
          seating_capacity: 8,
        },
        image_url:
          "https://www.motortrend.com/uploads/2023/06/039-2024-Subaru-Ascent-Front-view.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 110,
        make: "Kia",
        model: "Telluride",
        year: 2022,
        price_per_day: 92,
        location: {
          name: "Uppal, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "3.8L V6",
          transmission: "Automatic",
          seating_capacity: 8,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/04/2023-Kia-Telluride-14.jpg?fit=around%7C770:481.25",
      },
      {
        id: 111,
        make: "GMC",
        model: "Acadia",
        year: 2022,
        price_per_day: 79,
        location: {
          name: "L.B. Nagar, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 7,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/09/001-2023-GMC-Acadia.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 112,
        make: "Volkswagen",
        model: "Atlas",
        year: 2022,
        price_per_day: 81,
        location: {
          name: "Charminar, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "3.6L V6",
          transmission: "Automatic",
          seating_capacity: 7,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/08/2022-Volkswagen-Atlas-SEL-V6-4Motion-Basecamp-34.jpg?fit=around%7C770:481.25",
      },
    ],
  },
  {
    id: 2,
    name: "Sedan",
    image_url:
      "https://www.motortrend.com/uploads/2023/02/2024-Toyota-Camry-rendering-front.jpg?fit=around%7C875:492.1875",
    cars: [
      {
        id: 201,
        make: "Toyota",
        model: "Camry",
        year: 2022,
        price_per_day: 70,
        location: {
          name: "Himayat Nagar, Hyderabad",
          lat: 17.399162,
          lng: 78.489998,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2023/02/2024-Toyota-Camry-rendering-front.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 202,
        make: "Honda",
        model: "Civic",
        year: 2022,
        price_per_day: 65,
        location: {
          name: "Koti, Hyderabad",
          lat: 17.384886,
          lng: 78.479025,
        },
        available: true,
        specifications: {
          engine: "1.5L Turbocharged Inline-4",
          transmission: "CVT",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/09/2023-Honda-Civic-Sport-HPD-exterior-6.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 203,
        make: "Nissan",
        model: "Altima",
        year: 2022,
        price_per_day: 68,
        location: {
          name: "Panjagutta, Hyderabad",
          lat: 17.427426,
          lng: 78.462657,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/06/2023-Nissan-Altima-SR-2.0-VC-Turbo-29.jpg?fit=around%7C770:481.25",
      },
      {
        id: 204,
        make: "Ford",
        model: "Fusion",
        year: 2022,
        price_per_day: 63,
        location: {
          name: "Secunderabad, Hyderabad",
          lat: 17.439929,
          lng: 78.498274,
        },
        available: true,
        specifications: {
          engine: "2.0L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2020/06/2020-ford-fusion-hybrid.png?fit=around%7C875:492.1875",
      },
      {
        id: 205,
        make: "Chevrolet",
        model: "Malibu",
        year: 2022,
        price_per_day: 66,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.448665,
          lng: 78.449493,
        },
        available: true,
        specifications: {
          engine: "1.5L Turbocharged Inline-4",
          transmission: "CVT",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2020/12/2021-Chevrolet-Malibu-4.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 206,
        make: "Hyundai",
        model: "Elantra",
        year: 2022,
        price_per_day: 67,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.448765,
          lng: 78.388443,
        },
        available: true,
        specifications: {
          engine: "2.0L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/07/2023-Hyundai-Elantra-Hybrid-Limited-4.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 207,
        make: "Kia",
        model: "Optima",
        year: 2022,
        price_per_day: 69,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.iihs.org/cdn-cgi/image/width=636/api/ratings/model-year-images/2906/",
      },
      {
        id: 208,
        make: "Mazda",
        model: "Mazda3",
        year: 2022,
        price_per_day: 72,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.443622,
          lng: 78.351461,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 209,
        make: "Volkswagen",
        model: "Jetta",
        year: 2022,
        price_per_day: 71,
        location: {
          name: "Charminar, Hyderabad",
          lat: 17.361622,
          lng: 78.47473,
        },
        available: true,
        specifications: {
          engine: "1.4L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 210,
        make: "Subaru",
        model: "Impreza",
        year: 2022,
        price_per_day: 64,
        location: {
          name: "Ameerpet, Hyderabad",
          lat: 17.437462,
          lng: 78.448288,
        },
        available: true,
        specifications: {
          engine: "2.0L Flat-4",
          transmission: "CVT",
          seating_capacity: 5,
        },
      },
      {
        id: 211,
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2022,
        price_per_day: 80,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 212,
        make: "BMW",
        model: "3 Series",
        year: 2022,
        price_per_day: 82,
        location: {
          name: "Kukatpally, Hyderabad",
          lat: 17.493084,
          lng: 78.413768,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 213,
        make: "Audi",
        model: "A4",
        year: 2022,
        price_per_day: 85,
        location: {
          name: "Uppal, Hyderabad",
          lat: 17.396221,
          lng: 78.559047,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 214,
        make: "Lexus",
        model: "ES",
        year: 2022,
        price_per_day: 78,
        location: {
          name: "Hitech City, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 215,
        make: "Infiniti",
        model: "Q50",
        year: 2022,
        price_per_day: 76,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "3.0L Twin-Turbo V6",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 216,
        make: "Cadillac",
        model: "CTS",
        year: 2022,
        price_per_day: 83,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.443622,
          lng: 78.351461,
        },
        available: true,
        specifications: {
          engine: "3.6L V6",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 217,
        make: "Lincoln",
        model: "MKZ",
        year: 2022,
        price_per_day: 77,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.448765,
          lng: 78.388443,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 218,
        make: "Jaguar",
        model: "XE",
        year: 2022,
        price_per_day: 79,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 219,
        make: "Volvo",
        model: "S60",
        year: 2022,
        price_per_day: 74,
        location: {
          name: "Koti, Hyderabad",
          lat: 17.384886,
          lng: 78.479025,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 220,
        make: "Tesla",
        model: "Model 3",
        year: 2022,
        price_per_day: 90,
        location: {
          name: "Himayat Nagar, Hyderabad",
          lat: 17.399162,
          lng: 78.489998,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
    ],
  },
  {
    id: 3,
    name: "Hatchback",
    image_url:
      "https://www.motortrend.com/uploads/sites/5/2021/06/2022-toyota-corolla-cross-exterior-03.jpg?fit=around%7C770:481.25",
    cars: [
      {
        id: 301,
        make: "Toyota",
        model: "Corolla Hatchback",
        year: 2022,
        price_per_day: 60,
        location: {
          name: "Himayat Nagar, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.0L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/06/2022-toyota-corolla-cross-exterior-03.jpg?fit=around%7C770:481.25",
      },
      {
        id: 302,
        make: "Honda",
        model: "Fit",
        year: 2022,
        price_per_day: 55,
        location: {
          name: "Koti, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "1.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/10/2017/10/2018-honda-fit-ex-hatchback-angular-front.png?fit=around%7C875:492.1875",
      },
      {
        id: 303,
        make: "Nissan",
        model: "Versa",
        year: 2022,
        price_per_day: 58,
        location: {
          name: "Panjagutta, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "1.6L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/10/2023-Nissan-Versa-sedan-debut-20.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 304,
        make: "Ford",
        model: "Fiesta",
        year: 2022,
        price_per_day: 53,
        location: {
          name: "Secunderabad, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "1.6L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://stimg.cardekho.com/car-images/carexteriorimages/large/Ford/Ford-Fiesta/side-view-(left)-090.jpg?tr=w-456",
      },
      {
        id: 305,
        make: "Chevrolet",
        model: "Spark",
        year: 2022,
        price_per_day: 56,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "1.4L Inline-4",
          transmission: "Automatic",
          seating_capacity: 4,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/10/2020/12/2021-chevrolet-spark-ls-5door-hatchback-angular-front.png?fit=around%7C875:492.1875",
      },
      {
        id: 306,
        make: "Hyundai",
        model: "i30",
        year: 2022,
        price_per_day: 57,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "2.0L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/11/2016/09/2017-Hyundai-I30-European-Spec-front-side-1.jpg?fit=around%7C875:492",
      },
      {
        id: 307,
        make: "Kia",
        model: "Rio",
        year: 2022,
        price_per_day: 59,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "1.6L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2021/11/2022-Kia-Rio-77.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 308,
        make: "Mazda",
        model: "Mazda2",
        year: 2022,
        price_per_day: 62,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "1.5L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/11/2014/11/Mazda2-sedan-front-side-view-in-motion-city.jpg?fit=around%7C875:492",
      },
      {
        id: 309,
        make: "Volkswagen",
        model: "Golf",
        year: 2022,
        price_per_day: 61,
        location: {
          name: "Charminar, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "1.4L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/06/2021-volkswagen-golf-exterior-01.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 310,
        make: "Subaru",
        model: "Impreza Hatchback",
        year: 2022,
        price_per_day: 54,
        location: {
          name: "Ameerpet, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "2.0L Flat-4",
          transmission: "CVT",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2021/12/2022-Subaru-Impreza.jpg?fit=around%7C875:492.1875",
      },
    ],
  },
  {
    id: 4,
    name: "Convertible",
    image_url:
      "https://www.motortrend.com/uploads/2022/11/2023-Mazda-MX-5-RF-Club-front-three-quarter-view-25.jpg?fit=around%7C875:492.1875",
    cars: [
      {
        id: 401,
        make: "Mazda",
        model: "MX-5 Miata",
        year: 2022,
        price_per_day: 85,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.0L Inline-4",
          transmission: "Manual",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/11/2023-Mazda-MX-5-RF-Club-front-three-quarter-view-25.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 402,
        make: "Ford",
        model: "Mustang Convertible",
        year: 2022,
        price_per_day: 95,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "2.3L EcoBoost Inline-4",
          transmission: "Automatic",
          seating_capacity: 4,
        },
        image_url:
          "https://www.motortrend.com/uploads/2021/10/2022-Ford-Mustang-GT-California-Special_02-1.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 403,
        make: "Chevrolet",
        model: "Camaro Convertible",
        year: 2022,
        price_per_day: 90,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "3.6L V6",
          transmission: "Automatic",
          seating_capacity: 4,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/08/2022-Chevrolet-Camaro-RS-31.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 404,
        make: "BMW",
        model: "Z4",
        year: 2022,
        price_per_day: 100,
        location: {
          name: "Hitech City, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/08/2022-BMW-Z4-m40i-350.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 405,
        make: "Porsche",
        model: "911 Cabriolet",
        year: 2022,
        price_per_day: 150,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "3.0L Twin-Turbo Flat-6",
          transmission: "Automatic",
          seating_capacity: 4,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2013/09/2014-Porsche-911-Turbo-S-Cabriolet-front-three-quarter-in-motion-032.jpg?fit=around%7C875:492",
      },
      {
        id: 406,
        make: "Audi",
        model: "A3 Cabriolet",
        year: 2022,
        price_per_day: 110,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "2.0L Turbocharged Inline-4",
          transmission: "Automatic",
          seating_capacity: 4,
        },
        image_url:
          "https://www.motortrend.com/uploads/2021/10/2022-Audi-A3-49.jpg?fit=around%7C875:492",
      },
    ],
  },
  {
    id: 5,
    name: "Luxury",
    image_url:
      "https://www.motortrend.com/uploads/sites/5/2021/08/2022-Mercedes-Benz-S-500-S-580-4Matic-28.jpg?fit=around%7C875:492.1875",
    cars: [
      {
        id: 501,
        make: "Mercedes-Benz",
        model: "S-Class",
        year: 2022,
        price_per_day: 250,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "3.0L Turbocharged Inline-6",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/08/2022-Mercedes-Benz-S-500-S-580-4Matic-28.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 502,
        make: "BMW",
        model: "7 Series",
        year: 2022,
        price_per_day: 240,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "3.0L Turbocharged Inline-6",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/04/2021-bmw-7series-exterior-01.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 503,
        make: "Audi",
        model: "A8",
        year: 2022,
        price_per_day: 230,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "3.0L Turbocharged V6",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/07/2023-Audi-A8-42-front-three-quarter-view.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 504,
        make: "Lexus",
        model: "LS",
        year: 2022,
        price_per_day: 220,
        location: {
          name: "Hitech City, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "3.5L V6 Hybrid",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/02/2022-Lexus-LS-500-RWD-1.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 505,
        make: "Jaguar",
        model: "XJ",
        year: 2022,
        price_per_day: 210,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.721476,
          lng: 83.226425,
        },
        available: true,
        specifications: {
          engine: "3.0L Supercharged V6",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/11/2020/11/1990-Jaguar-XJ-V-12-front-three-quarter-1.jpg?fit=around%7C875:492",
      },
      {
        id: 506,
        make: "Tesla",
        model: "Model S",
        year: 2022,
        price_per_day: 280,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.721476,
          lng: 83.226425,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/11/2023-Tesla-Model-S-Plaid-Offsite-38.jpg?fit=around%7C875:492.1875",
      },
    ],
  },
  {
    id: 6,
    name: "Sports",
    image_url:
      "https://www.motortrend.com/uploads/sites/5/2021/06/2022-Porsche-911-GT3-Touring-17.jpg?fit=around%7C875:492",
    cars: [
      {
        id: 601,
        make: "Porsche",
        model: "911",
        year: 2022,
        price_per_day: 300,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "3.0L Twin-Turbo Flat-6",
          transmission: "Automatic",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/06/2022-Porsche-911-GT3-Touring-17.jpg?fit=around%7C875:492",
      },
      {
        id: 602,
        make: "Ferrari",
        model: "488 GTB",
        year: 2022,
        price_per_day: 500,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "3.9L Twin-Turbo V8",
          transmission: "Automatic",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2015/03/2016-Ferrari-488-gtb-front-three-quarters1.jpg?fit=around%7C875:492",
      },
      {
        id: 603,
        make: "Lamborghini",
        model: "Huracán",
        year: 2022,
        price_per_day: 550,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "5.2L V10",
          transmission: "Automatic",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/2023/01/2023-Lamborghini-Huracan-Tecnica-6.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 604,
        make: "McLaren",
        model: "720S",
        year: 2022,
        price_per_day: 450,
        location: {
          name: "Hitech City, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "4.0L Twin-Turbo V8",
          transmission: "Automatic",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/2023/02/2023-McLaren-720S-Spider-13.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 605,
        make: "Aston Martin",
        model: "DB11",
        year: 2022,
        price_per_day: 400,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.721476,
          lng: 83.226425,
        },
        available: true,
        specifications: {
          engine: "4.0L Twin-Turbo V8",
          transmission: "Automatic",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/sites/5/2021/09/2022-Aston-Martin-DB11-front-side-01.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 606,
        make: "Nissan",
        model: "GT-R",
        year: 2022,
        price_per_day: 320,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.722949,
          lng: 83.328109,
        },
        available: true,
        specifications: {
          engine: "3.8L Twin-Turbo V6",
          transmission: "Automatic",
          seating_capacity: 2,
        },
        image_url:
          "https://www.motortrend.com/uploads/2023/06/2024-Nissan-GT-R-NISMO-front-view-25.jpg?fit=around%7C875:492.1875",
      },
    ],
  },
  {
    id: 7,
    name: "Electric",
    image_url:
      "https://www.motortrend.com/uploads/2022/11/2023-Tesla-Model-S-Plaid-Offsite-38.jpg?fit=around%7C875:492.1875",
    cars: [
      {
        id: 701,
        make: "Tesla",
        model: "Model S",
        year: 2022,
        price_per_day: 180,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 5,
        },
        image_url:
          "https://www.motortrend.com/uploads/2022/11/2023-Tesla-Model-S-Plaid-Offsite-38.jpg?fit=around%7C875:492.1875",
      },
      {
        id: 702,
        make: "Nissan",
        model: "Leaf",
        year: 2022,
        price_per_day: 150,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 703,
        make: "Chevrolet",
        model: "Bolt EV",
        year: 2022,
        price_per_day: 160,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 704,
        make: "Kia",
        model: "Niro EV",
        year: 2022,
        price_per_day: 170,
        location: {
          name: "Hitech City, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 705,
        make: "BMW",
        model: "i3",
        year: 2022,
        price_per_day: 190,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.721476,
          lng: 83.226425,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 4,
        },
      },
      {
        id: 706,
        make: "Hyundai",
        model: "Kona Electric",
        year: 2022,
        price_per_day: 155,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.722949,
          lng: 83.328109,
        },
        available: true,
        specifications: {
          engine: "Electric",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
    ],
  },
  {
    id: 8,
    name: "Minivan",
    image_url:
      "https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/sienna/xse/5410/1j9/2.png?fm=webp&&w=768&h=328&q=90",
    cars: [
      {
        id: 801,
        make: "Toyota",
        model: "Sienna",
        year: 2022,
        price_per_day: 120,
        location: {
          name: "Banjara Hills, Hyderabad",
          lat: 17.415432,
          lng: 78.434799,
        },
        available: true,
        specifications: {
          engine: "2.5L Inline-4 Hybrid",
          transmission: "CVT",
          seating_capacity: 7,
        },
        image_url:
          "https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/sienna/xse/5410/1j9/2.png?fm=webp&&w=768&h=328&q=90",
      },
      {
        id: 802,
        make: "Honda",
        model: "Odyssey",
        year: 2022,
        price_per_day: 130,
        location: {
          name: "Jubilee Hills, Hyderabad",
          lat: 17.421306,
          lng: 78.434202,
        },
        available: true,
        specifications: {
          engine: "3.5L V6",
          transmission: "Automatic",
          seating_capacity: 8,
        },
      },
      {
        id: 803,
        make: "Chrysler",
        model: "Pacifica",
        year: 2022,
        price_per_day: 125,
        location: {
          name: "Gachibowli, Hyderabad",
          lat: 17.441136,
          lng: 78.393282,
        },
        available: true,
        specifications: {
          engine: "3.6L V6 Hybrid",
          transmission: "Automatic",
          seating_capacity: 7,
        },
      },
      {
        id: 804,
        make: "Kia",
        model: "Carnival",
        year: 2022,
        price_per_day: 140,
        location: {
          name: "Hitech City, Hyderabad",
          lat: 17.433489,
          lng: 78.500862,
        },
        available: true,
        specifications: {
          engine: "3.5L V6",
          transmission: "Automatic",
          seating_capacity: 8,
        },
      },
      {
        id: 805,
        make: "Ford",
        model: "Transit Connect",
        year: 2022,
        price_per_day: 110,
        location: {
          name: "Begumpet, Hyderabad",
          lat: 17.721476,
          lng: 83.226425,
        },
        available: true,
        specifications: {
          engine: "2.0L Inline-4",
          transmission: "Automatic",
          seating_capacity: 5,
        },
      },
      {
        id: 806,
        make: "Dodge",
        model: "Grand Caravan",
        year: 2022,
        price_per_day: 115,
        location: {
          name: "Madhapur, Hyderabad",
          lat: 17.722949,
          lng: 83.328109,
        },
        available: true,
        specifications: {
          engine: "3.6L V6",
          transmission: "Automatic",
          seating_capacity: 7,
        },
      },
    ],
  },
];

module.exports = { car_categories, locations };
