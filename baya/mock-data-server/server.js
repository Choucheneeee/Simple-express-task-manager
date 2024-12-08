const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
const port = 8081; // Matches the port in your service

app.use(bodyParser.json({ limit: '10mb' })); // Adjust size as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors()); // Enable CORS

// Mock Data
let admins = [
  { id: 1, nom: 'ahmed', prenom: 'baya', email: 'baya@gmail.com', mdp: '123', role: 'superadmin' },
  { id: 2, nom: 'Super', prenom: 'Admin2', email: 'superadmin2@example.com', mdp: '123', role: 'superadmin' },
  { id: 3, nom: 'Super', prenom: 'Admin3', email: 'superadmin3@example.com', mdp: '123', role: 'superadmin' },
  { id: 4, nom: 'Admin', prenom: 'Admin1', email: 'admin1@example.com', mdp: '123', role: 'admin' },
  { id: 5, nom: 'Admin', prenom: 'Admin2', email: 'admin2@example.com', mdp: '123', role: 'admin' },
];

let clients = [
  { id: 1, nom: 'ahmed', prenom: 'baya', email: 'baya@gmail.com', tel: '123456789', address: '123 Main St', mdp: '123' },
  { id: 2, nom: 'Jane', prenom: 'Smith', email: 'jane.smith@example.com', tel: '987654321', address: '456 Elm St', mdp: '123' },
  { id: 3, nom: 'Alice', prenom: 'Johnson', email: 'alice.johnson@example.com', tel: '111222333', address: '789 Oak St', mdp: '123' },
  { id: 4, nom: 'Bob', prenom: 'Brown', email: 'bob.brown@example.com', tel: '444555666', address: '321 Pine St', mdp: '123' },
  { id: 5, nom: 'Charlie', prenom: 'Davis', email: 'charlie.davis@example.com', tel: '777888999', address: '654 Maple St', mdp: '123' },
];

let offres = [
  { id: 1, nom: 'Offre 1', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', prix: '100', date_deb: '2024-01-01', date_fin: '2024-01-07' },
  { id: 2, nom: 'Offre 2', image: 'https://images.pexels.com/photos/4258279/pexels-photo-4258279.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', prix: '200', date_deb: '2024-02-01', date_fin: '2024-02-10' },
  { id: 3, nom: 'Offre 3', image: 'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', prix: '150', date_deb: '2024-03-01', date_fin: '2024-03-07' },
  { id: 4, nom: 'Offre 4', image: 'https://images.pexels.com/photos/8100759/pexels-photo-8100759.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', prix: '300', date_deb: '2024-04-01', date_fin: '2024-04-10' },
  { id: 5, nom: 'Offre 5', image: 'https://images.pexels.com/photos/8031873/pexels-photo-8031873.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', prix: '250', date_deb: '2024-05-01', date_fin: '2024-05-07' },
  { id: 6, nom: 'Offre 6', image: 'https://images.pexels.com/photos/5517853/pexels-photo-5517853.png?auto=compress&cs=tinysrgb&w=600&lazy=load', prix: '180', date_deb: '2024-06-01', date_fin: '2024-06-10' },
  { id: 7, nom: 'Offre 7', image: 'https://images.pexels.com/photos/16655113/pexels-photo-16655113/free-photo-of-facade-of-a-big-suburban-house-with-a-yard-covered-in-snow.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', prix: '120', date_deb: '2024-07-01', date_fin: '2024-07-07' },
  { id: 8, nom: 'Offre 8', image: 'https://media.gettyimages.com/id/848549286/photo/dream-home-luxury-house-success.jpg?s=1024x1024&w=gi&k=20&c=oZ8OMBgezjOP7cOlPhilGdjTC8OFM_RhKldS6_b69kI=', prix: '400', date_deb: '2024-08-01', date_fin: '2024-08-10' },
  { id: 9, nom: 'Offre 9', image: 'https://media.gettyimages.com/id/76805366/photo/home-exterior.jpg?s=1024x1024&w=gi&k=20&c=bc2Qsmkiq4f2rJR02OMezkg5tboJNosmkfkEZjCFWsQ=', prix: '350', date_deb: '2024-09-01', date_fin: '2024-09-07' },
  { id: 10, nom: 'Offre 10', image: 'https://media.gettyimages.com/id/78434191/photo/house-in-suburban-neighborhood.jpg?s=1024x1024&w=gi&k=20&c=Eydm1iCA34aMKlXjd5BmPwufOAtHEoUabKZvg8m1Ec0=', prix: '500', date_deb: '2024-10-01', date_fin: '2024-10-10' },
];

let reservations = [
  { id: 1, offre: offres[0], client: clients[0] },
  { id: 2, offre: offres[1], client: clients[1] },
  { id: 3, offre: offres[2], client: clients[2] },
];

let contacts = [
  { id: 1, nom: 'Alice', email: 'alice@example.com', tel: '987654321', sujet: 'Inquiry', msg: 'I have a question about your services.' },
  { id: 2, nom: 'Bob', email: 'bob@example.com', tel: '123456789', sujet: 'Feedback', msg: 'Your service was excellent!' },
  { id: 3, nom: 'Charlie', email: 'charlie@example.com', tel: '555666777', sujet: 'Complaint', msg: 'I had an issue with my reservation.' },
  { id: 4, nom: 'Diana', email: 'diana@example.com', tel: '888999000', sujet: 'Support', msg: 'I need help with my account.' },
  { id: 5, nom: 'Eve', email: 'eve@example.com', tel: '333444555', sujet: 'Question', msg: 'Can I change my reservation date?' },
];


// API Routes
const jwt = require('jsonwebtoken'); // Install this: npm install jsonwebtoken
const SECRET_KEY = 'chouchene'; // Replace with a secure secret key
app.get('/api/reservation/Get-All-ByIdClient/:id', (req, res) => {
  const clientId = parseInt(req.params.id);

  // Find reservations for the given client ID
  const clientReservations = reservations.filter((r) => r.client.id === clientId);

  if (clientReservations.length === 0) {
    return res.status(404).json({ message: 'No reservations found for this client' });
  }

  res.json(clientReservations); // Return matching reservations
});
// Add login route
app.post('/api/admin/login', (req, res) => {
  console.log('Request body:', req.body); // Log the payload

  const { email, mdp } = req.body;

  const admin = admins.find((user) => user.email === email && user.mdp === mdp);

  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token, admin });
});

// Client Login Route
app.post('/api/client/login', (req, res) => {
  const { email, mdp } = req.body;

  // Find the client
  const client = clients.find((user) => user.email === email && user.mdp === mdp);
  if (!client) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Prepare the payload
  const payload = {
    data: {
      id: client.id,
      email: client.email,
      nom: client.nom,
      prenom: client.prenom,
      role: 'client',
    },
  };

  // Generate the token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});
app.post('/api/reservation', (req, res) => {
  const { id_client, id_offre } = req.body;

  // Validate client and offer existence
  const client = clients.find((c) => c.id === id_client);
  const offre = offres.find((o) => o.id === id_offre);

  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }

  if (!offre) {
    return res.status(404).json({ message: 'Offer not found' });
  }

  // Create a new reservation
  const newReservation = {
    id: reservations.length + 1, // Auto-generate an ID
    client,
    offre,
  };

  // Add the reservation to the array
  reservations.push(newReservation);

  // Respond with the created reservation
  res.status(201).json(newReservation);
});

// Admin CRUD
app.get('/api/admin', (req, res) => {
  res.json(admins);
});

app.post('/api/admin', (req, res) => {
  const admin = { id: admins.length + 1, ...req.body };
  admins.push(admin);
  res.status(201).json(admin);
});

app.delete('/api/admin/:id', (req, res) => {
  const id = parseInt(req.params.id);
  admins = admins.filter((admin) => admin.id !== id);
  res.status(204).send();
});

app.put('/api/admin/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = admins.findIndex((admin) => admin.id === id);
  if (index === -1) return res.status(404).send('Admin not found');
  admins[index] = { ...admins[index], ...req.body };
  res.json(admins[index]);
});

// Client CRUD
app.get('/api/client', (req, res) => {
  res.json(clients);
});

app.delete('/api/client/:id', (req, res) => {
  const id = parseInt(req.params.id);
  clients = clients.filter((client) => client.id !== id);
  res.status(204).send();
});

// Offre CRUD
app.get('/api/offre', (req, res) => {
  res.json(offres);
});

app.post('/api/offre', (req, res) => {
  const offre = { id: offres.length + 1, ...req.body };
  offres.push(offre);
  res.status(201).json(offre);
});
app.post('/api/contact', (req, res) => {
  const newContact = req.body;

  // Validate the incoming data
  if (!newContact.nom || !newContact.email || !newContact.tel || !newContact.sujet || !newContact.msg) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Add an ID to the new contact
  newContact.id = contacts.length + 1;

  // Add the new contact to the list
  contacts.push(newContact);

  // Return the created contact
  res.status(201).json(newContact);
});

app.put('/api/offre/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedOffre = req.body;

  const index = offres.findIndex((offre) => offre.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Offer not found' });
  }

  offres[index] = { ...offres[index], ...updatedOffre }; // Update the offer
  res.json(offres[index]); // Send the updated offer back
});


app.delete('/api/offre/:id', (req, res) => {
  const id = parseInt(req.params.id);
  offres = offres.filter((offre) => offre.id !== id);
  res.status(204).send();
});

// Contact CRUD
app.get('/api/contact', (req, res) => {
  res.json(contacts);
});

app.delete('/api/contact/:id', (req, res) => {
  const id = parseInt(req.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);
  res.status(204).send();
});

// Reservation READ
app.get('/api/reservation', (req, res) => {
  res.json(reservations);
});

// Start Server
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
jwt 