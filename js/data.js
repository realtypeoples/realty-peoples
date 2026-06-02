/* ===========================================================================
   SITE DATA — edit these freely. Used by main.js to build page sections.
   =========================================================================== */
const TESTIMONIALS = [
  {q:"They treated our first home like it was their own. Patient, honest, and always a step ahead.", who:"— Former Customer"},
  {q:"We sold above asking and closed without a single surprise. The communication was incredible.", who:"— Former Customer"},
  {q:"More than agents — they felt like family who genuinely wanted us to be happy in our new home.", who:"— Former Customer"}
];

const RESIDENTIAL_LISTINGS = [
  {city:"San Diego, CA", desc:"4 bed · 3 bath · 2,850 sqft — sun-filled Spanish revival with a private courtyard.", tag:"Sold", img:"https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80", detail:"Sold in 2024. A sun-filled Spanish revival with a private courtyard, chef's kitchen, and detached casita. Add full property details here."},
  {city:"Irvine, CA", desc:"5 bed · 4 bath · 3,400 sqft — modern estate near top-rated schools.", tag:"Sold", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80", detail:"A modern estate near top-rated schools with an open floor plan and resort-style backyard. Add full property details here."},
  {city:"Fullerton, CA", desc:"3 bed · 2 bath · 1,920 sqft — charming hillside home with city views.", tag:"Sold", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80", detail:"A charming hillside home with sweeping city views and updated interiors. Add full property details here."},
  {city:"Newport Beach, CA", desc:"4 bed · 4 bath · 3,100 sqft — coastal contemporary steps from the water.", tag:"For Sale", img:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80", detail:"Coastal contemporary just steps from the water. Floor-to-ceiling glass, rooftop deck. Add full property details here."},
  {city:"Pasadena, CA", desc:"5 bed · 3 bath · 2,700 sqft — classic craftsman, fully reimagined.", tag:"Sold", img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80", detail:"A classic craftsman, fully reimagined with modern systems and original character. Add full property details here."}
];

const COMMERCIAL_LISTINGS = [
  {city:"City, CA", desc:"Commercial space — add details later.", tag:"For Lease", img:"", detail:"Add full commercial property details here — size, location, lease terms, etc."},
  {city:"City, CA", desc:"Commercial space — add details later.", tag:"For Lease", img:"", detail:"Add full commercial property details here."},
  {city:"City, CA", desc:"Commercial space — add details later.", tag:"For Sale", img:"", detail:"Add full commercial property details here."},
  {city:"City, CA", desc:"Commercial space — add details later.", tag:"For Lease", img:"", detail:"Add full commercial property details here."}
];

const BUSINESS_LISTINGS = [
  {city:"Business Name, CA", desc:"Retail business — add details later.", tag:"For Sale", img:"", detail:"Add full business-for-sale details here — revenue, lease, inventory, etc."},
  {city:"Business Name, CA", desc:"Retail business — add details later.", tag:"Sold", img:"", detail:"Add full business details here."},
  {city:"Business Name, CA", desc:"Retail business — add details later.", tag:"For Sale", img:"", detail:"Add full business details here."},
  {city:"Business Name, CA", desc:"Retail business — add details later.", tag:"For Sale", img:"", detail:"Add full business details here."}
];

const TEAM = [
  {name:"Megan Kim", lic:"DRE# 02181947 · NMLS# 2342350", bio:"A dedicated agent with deep roots in Orange County, known for client-first service and sharp market insight.", img:""},
  {name:"David Han", lic:"DRE# 02440338", bio:"An agent with a calm, detail-driven approach, speaking fluent English and Korean.", img:""},
  {name:"Aiden Lee", lic:"DRE# 102230874 · NMLS# 0000000", bio:"An agent with a positive attitude that helps buyers and investors alike navigate Southern California with confidence.", img:""},
  {name:"Edwin Ro", lic:"DRE# 01320323", bio:"Commercial and residential expertise, fluent in serving the region's diverse communities.", img:""}
];

const CAFE_CHANNELS = [
  {t:"# Homebuyers Lounge", d:"Introduce yourself and ask anything."},
  {t:"# Plumbing", d:"Connect with vetted plumbers and get quotes."},
  {t:"# Interior Design", d:"Ideas, sourcing, and designer consults."},
  {t:"# General Contractors", d:"Renovations, builds, and remodels."},
  {t:"# Lending & Mortgages", d:"Rates, pre-approvals, and loan questions."},
  {t:"# Inspections", d:"Find inspectors and understand reports."},
  {t:"# Landscaping", d:"Yards, hardscape, and curb appeal."},
  {t:"# Off-Topic", d:"Community chat and everything else."}
];

const FAQS = [
  {q:"How much does it cost to work with Realty Peoples?", a:"For buyers, our guidance is typically free — commissions are generally paid through the transaction. For sellers, we'll walk you through our straightforward fee structure during your consultation."},
  {q:"Do I need to be pre-approved before looking at homes?", a:"It's strongly recommended. A pre-approval clarifies your budget and makes your offer far more competitive. We can connect you with trusted lenders in our network."},
  {q:"Which areas do you serve?", a:"Orange County, LA County, and the greater Southern California region — including Fullerton, Irvine, Anaheim, Newport Beach, Pasadena, and more."},
  {q:"What is the Online Cafe?", a:"A members-only community where buyers and owners chat directly with each other and with service pros — plumbers, designers, contractors, lenders — to ask questions and gather quotes in one place. Free for buyers and owners."},
  {q:"Do you help with commercial property?", a:"Yes. We handle retail, office, and investment opportunities. Reach out through the Contact page and tell us what you're looking for."}
];
