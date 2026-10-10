// src/data/products.js
// All prices in Indian Rupees (Rs)
// Uses verified product images from public/images/

export const products = [
  {
    id: 'p001',
    name: 'Seed-paper notebook',
    category: 'Notebooks',
    tag: 'Plantable',
    price: 240,
    description:
      'Handmade textured notebook embedded with viable wildflower and herb seeds. Once every page is filled with notes or sketches, plant the cover in potting soil, keep it moist, and watch it grow into green blooms. 100 pages, eco-friendly binding.',
    images: ['/images/seed-paper-notebook.jpg'],
  },
  {
    id: 'p002',
    name: 'Bamboo ruler set',
    category: 'Desk goods',
    tag: 'Bamboo',
    price: 180,
    description:
      'Precision measurement ruler set crafted from 100% natural, sustainable bamboo. Distinct high-contrast laser markings for metric and imperial scales with smooth, splinter-free rounded edges and zero plastic.',
    images: ['/images/bamboo-ruler-set.jpg'],
  },
  {
    id: 'p003',
    name: 'Plantable pencils (pack of 10)',
    category: 'Pens and pencils',
    tag: 'Plantable',
    price: 150,
    description:
      'Pack of 10 premium HB graphite writing pencils made from compressed recycled newspaper instead of wood. Each pencil tip features a biodegradable cellulose seed capsule that sprouts herbs and flowers when planted stub-down.',
    images: ['/images/plantable-pencils.jpg'],
  },
  {
    id: 'p004',
    name: 'Plantable seed pen (pack of 5)',
    category: 'Pens and pencils',
    tag: 'Plantable',
    price: 200,
    description:
      'Set of 5 everyday writing pens constructed with recycled kraft paper barrels and non-toxic ink. Contains plantable seeds nestled in the rear cap — simply insert into soil after the ink runs out to germinate fresh seedlings.',
    images: ['/images/plantable-pen.jpg'],
  },
  {
    id: 'p005',
    name: 'Cork desk organiser',
    category: 'Desk goods',
    tag: 'Cork',
    price: 560,
    description:
      'Organic desktop desk organiser handcrafted from sustainably harvested natural cork bark. Divided compartments hold pens, rulers, memo pads, and loose stationery while bringing warm, earthy texture to your workspace.',
    images: ['/images/cork-desk-organiser.jpg'],
  },
  {
    id: 'p006',
    name: 'Recycled sticky notes',
    category: 'Desk goods',
    tag: 'Recycled',
    price: 90,
    description:
      'Eco-conscious self-stick memo pads made with 100% post-consumer recycled paper and water-based, solvent-free adhesive. Perfect for reminders, bookmarks, and quick notes without contributing to deforestation.',
    images: ['/images/recycled-sticky-notes.jpg'],
  },
  {
    id: 'p007',
    name: 'Recycled paper notebook',
    category: 'Notebooks',
    tag: 'Recycled',
    price: 220,
    description:
      'Spiral-bound notebooks with kraft covers and plain pages, made from recycled paper. Light enough to carry everywhere.',
    images: ['/images/recycled-paper-notebook.jpg'],
  },
  {
    id: 'p008',
    name: 'Recycled paper envelope',
    category: 'Desk goods',
    tag: 'Recycled',
    price: 120,
    description:
      'Kraft paper envelopes with a string-and-button closure. Plastic-free and ideal for letters, cards and documents.',
    images: ['/images/recycled-paper-envelope.jpg'],
  },
  {
    id: 'p009',
    name: 'Premium bamboo fountain pen',
    category: 'Pens and pencils',
    tag: 'Bamboo',
    price: 650,
    description:
      'A smooth fountain pen with a natural bamboo barrel and cap. A plastic-free pen made to last.',
    images: ['/images/bamboo-fountain-pen.jpg'],
    imageFit: 'contain',
  },
  {
    id: 'p010',
    name: 'Recycled craft paper',
    category: 'Desk goods',
    tag: 'Recycled',
    price: 300,
    description:
      'Handmade recycled paper sheets in soft pastel colours, some with pressed flowers. Perfect for crafts, cards and gifts.',
    images: ['/images/recycled-craft-paper.jpg'],
    imageFit: 'cover',
    imagePosition: 'center',
  },
];

export const categories = ['All', 'Notebooks', 'Pens and pencils', 'Desk goods'];

export const getProductById = (id) => products.find((p) => p.id === id);

export const getRelated = (id, count = 3) =>
  products.filter((p) => p.id !== id).slice(0, count);
