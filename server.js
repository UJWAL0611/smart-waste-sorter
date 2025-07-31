const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Dummy waste items data with categories and disposal tips
const wasteItems = {
  'plastic-bottle': {
    name: 'Plastic Bottle',
    category: 'Plastic',
    color: '#3498db',
    icon: '♻️',
    disposalTips: [
      'Remove cap and label if possible',
      'Rinse the bottle to remove any residue',
      'Place in recycling bin',
      'Check local recycling guidelines for specific plastic types'
    ],
    environmentalImpact: 'Takes 450+ years to decompose in landfills',
    recyclable: true
  },
  'banana-peel': {
    name: 'Banana Peel',
    category: 'Organic',
    color: '#27ae60',
    icon: '🍌',
    disposalTips: [
      'Add to compost bin',
      'Can be used as natural fertilizer',
      'Bury in garden soil',
      'Do not throw in regular trash'
    ],
    environmentalImpact: 'Decomposes naturally in 2-5 weeks',
    recyclable: false
  },
  'old-phone': {
    name: 'Old Smartphone',
    category: 'E-Waste',
    color: '#e74c3c',
    icon: '📱',
    disposalTips: [
      'Remove personal data and factory reset',
      'Take to certified e-waste recycling center',
      'Contact manufacturer for take-back programs',
      'Never throw in regular trash due to toxic materials'
    ],
    environmentalImpact: 'Contains precious metals and toxic substances',
    recyclable: true
  },
  'aluminum-can': {
    name: 'Aluminum Can',
    category: 'Metal',
    color: '#95a5a6',
    icon: '🥤',
    disposalTips: [
      'Rinse to remove any liquid residue',
      'Crush to save space (optional)',
      'Place in recycling bin',
      'One of the most recyclable materials'
    ],
    environmentalImpact: 'Can be recycled infinitely without quality loss',
    recyclable: true
  },
  'glass-jar': {
    name: 'Glass Jar',
    category: 'Glass',
    color: '#16a085',
    icon: '🫙',
    disposalTips: [
      'Remove labels and lids',
      'Rinse thoroughly',
      'Place in glass recycling bin',
      'Separate by color if required locally'
    ],
    environmentalImpact: '100% recyclable and can be recycled endlessly',
    recyclable: true
  },
  'paper-magazine': {
    name: 'Magazine',
    category: 'Paper',
    color: '#f39c12',
    icon: '📖',
    disposalTips: [
      'Remove any plastic wrapping',
      'Place in paper recycling bin',
      'Can be composted if no glossy coating',
      'Reuse for crafts before recycling'
    ],
    environmentalImpact: 'Decomposes in 2-6 weeks, saves trees when recycled',
    recyclable: true
  }
};

// Waste statistics for infographics
const wasteStatistics = {
  household: {
    title: 'Household Waste',
    totalWaste: '292 million tons/year',
    breakdown: {
      organic: 30,
      paper: 25,
      plastic: 20,
      glass: 10,
      metal: 8,
      other: 7
    },
    recyclingRate: 35,
    tips: [
      'Separate waste at source',
      'Compost organic waste',
      'Reduce single-use plastics'
    ]
  },
  industrial: {
    title: 'Industrial Waste',
    totalWaste: '7.6 billion tons/year',
    breakdown: {
      construction: 40,
      manufacturing: 25,
      mining: 20,
      chemical: 10,
      other: 5
    },
    recyclingRate: 65,
    tips: [
      'Implement circular economy principles',
      'Reduce material waste in production',
      'Invest in waste-to-energy technologies'
    ]
  },
  campus: {
    title: 'Campus Waste',
    totalWaste: '8.8 million tons/year',
    breakdown: {
      paper: 35,
      food: 30,
      plastic: 15,
      cardboard: 10,
      other: 10
    },
    recyclingRate: 45,
    tips: [
      'Digital-first approach to reduce paper',
      'Implement campus-wide composting',
      'Education programs for students'
    ]
  }
};

// API Routes
app.get('/api/waste-items', (req, res) => {
  res.json(wasteItems);
});

app.get('/api/waste-item/:id', (req, res) => {
  const item = wasteItems[req.params.id];
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.get('/api/statistics', (req, res) => {
  res.json(wasteStatistics);
});

app.get('/api/statistics/:sector', (req, res) => {
  const sector = wasteStatistics[req.params.sector];
  if (sector) {
    res.json(sector);
  } else {
    res.status(404).json({ error: 'Sector not found' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});