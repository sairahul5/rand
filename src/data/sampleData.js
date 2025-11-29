export const sampleData = {
  homestays: [
    {
      id: 1,
      title: "Cozy Mountain Cabin",
      city: "Shimla",
      state: "Himachal Pradesh",
      price: 2500,
      rating: 4.5,
      images: ["/src/assets/cozy-mountain-cabin.jpg"],
      description: "Beautiful cabin with mountain views",
      amenities: ["WiFi", "Kitchen", "Fireplace"],
      hostId: 1,
      availability: true
    },
    {
      id: 2,
      title: "Beachside Villa",
      city: "Goa",
      state: "Goa",
      price: 3500,
      rating: 4.8,
      images: ["/src/assets/Beach House Bliss_ 15 Chic Bloxburg Interior_.jpeg"],
      description: "Luxurious villa right on the beach",
      amenities: ["Pool", "WiFi", "Ocean View"],
      hostId: 2,
      availability: true
    },
    {
      id: 3,
      title: "Heritage Haveli",
      city: "Jaipur",
      state: "Rajasthan",
      price: 1800,
      rating: 4.2,
      images: ["/src/assets/Chowmahalla Palace Hyderabad.jpeg"],
      description: "Traditional Rajasthani architecture",
      amenities: ["WiFi", "Traditional Decor", "Garden"],
      hostId: 3,
      availability: true
    }
  ],
  places: [
    {
      id: 1,
      name: "Taj Mahal",
      city: "Agra",
      state: "Uttar Pradesh",
      category: "Historical",
      rating: 4.9,
      description: "Iconic white marble mausoleum",
      images: ["/src/assets/taj-mahal-history.jpeg"],
      lat: 27.1751,
      lng: 78.0421
    },
    {
      id: 2,
      name: "Golden Temple",
      city: "Amritsar",
      state: "Punjab",
      category: "Religious",
      rating: 4.8,
      description: "Sacred Sikh temple",
      images: ["/src/assets/golden-temple-amritsar.jpeg"],
      lat: 31.6200,
      lng: 74.8765
    },
    {
      id: 3,
      name: "Marina Beach",
      city: "Chennai",
      state: "Tamil Nadu",
      category: "Beach",
      rating: 4.3,
      description: "Longest urban beach in India",
      images: ["/src/assets/marina-beach.avif"],
      lat: 13.0827,
      lng: 80.2707
    }
  ],
  guides: [
    {
      id: 1,
      name: "Rajesh Kumar",
      city: "Delhi",
      state: "Delhi",
      rating: 4.7,
      price: 1500,
      languages: ["English", "Hindi"],
      specialties: ["Historical Sites", "Culture"],
      description: "Experienced guide with 10+ years",
      contact: "+91-9876543210",
      guideId: 1,
      availability: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      city: "Mumbai",
      state: "Maharashtra",
      rating: 4.9,
      price: 2000,
      languages: ["English", "Hindi", "Marathi"],
      specialties: ["City Tours", "Food"],
      description: "Local expert in Mumbai culture",
      contact: "+91-9876543211",
      guideId: 2,
      availability: true
    }
  ],
  reviews: [
    {
      id: 1,
      homestayId: 1,
      userId: 1,
      rating: 5,
      comment: "Amazing stay! Highly recommended.",
      date: "2024-01-15"
    },
    {
      id: 2,
      placeId: 1,
      userId: 2,
      rating: 5,
      comment: "Breathtaking monument!",
      date: "2024-01-10"
    }
  ]
}
