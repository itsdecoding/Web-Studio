/**
 * Pinsite Web Studio: Universal Niche Image Vault
 * Phase 1: Curated, high-resolution CDN assets across 12 primary industries
 */

import { NicheVault, StudioImageItem } from './types';

export const NICHE_VAULTS: Record<string, NicheVault> = {
  dental: {
    id: 'dental',
    name: 'Dental & Orthodontics',
    category: 'Healthcare',
    description: 'Modern dental practices, cosmetic dentistry, implants, and pediatric oral care.',
    hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Microscopic Root Canal',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
        description: 'Single-sitting painless root canal under surgical magnification.',
      },
      {
        title: 'Ceramic Crowns & Veneers',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        description: 'CAD/CAM engineered Zirconia crowns with natural enamel translucency.',
      },
      {
        title: 'Laser Teeth Whitening',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
        description: 'In-office cold light laser brightening up to 8 shades in 45 minutes.',
      },
      {
        title: 'Precision Dental Implants',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        description: 'Guided keyhole titanium implants designed for lifelong stability.',
      },
      {
        title: 'Clear Aligners & Braces',
        image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
        description: 'Invisible digital orthodontic aligners for teeth straightening.',
      },
      {
        title: 'Gentle Pediatric Dentistry',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        description: 'Zero-fear checkups and fluoride sealants for young smiles.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    ],
  },

  medical: {
    id: 'medical',
    name: 'Medical Clinic & MedSpa',
    category: 'Healthcare',
    description: 'Private medical clinics, dermatology, wellness spas, and family care practices.',
    hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Comprehensive Health Screening',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        description: 'Advanced diagnostic blood panels and preventative screenings.',
      },
      {
        title: 'Dermatology & Skin Care',
        image: 'https://images.unsplash.com/photo-1512290900672-1a4c979d460e?auto=format&fit=crop&w=800&q=80',
        description: 'Customized treatments for acne, pigmentation, and skin rejuvenation.',
      },
      {
        title: 'IV Hydration & Vitamin Therapy',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        description: 'Direct nutritional infusion for peak immunity and rapid recovery.',
      },
      {
        title: 'Aesthetic Anti-Aging Injectables',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        description: 'Subtle, physician-administered neuromodulators and natural dermal fillers.',
      },
      {
        title: 'Orthopedic & Joint Consultation',
        image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
        description: 'Targeted mobility assessments and non-surgical pain management.',
      },
      {
        title: 'Holistic Functional Medicine',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        description: 'Root-cause medicine tailored to your personal biology.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    ],
  },

  roofing: {
    id: 'roofing',
    name: 'Roofing & Exterior Contractors',
    category: 'Home Services',
    description: 'Residential & commercial roofing, exterior siding, gutter installations, and storm restoration.',
    hero: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Full Roof Replacement',
        image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80',
        description: 'Lifetime architectural shingles with guaranteed wind and hail warranty.',
      },
      {
        title: 'Emergency Storm Repair',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
        description: 'Rapid 2-hour response for missing shingles, punctures, and structural leaks.',
      },
      {
        title: 'Drone Roof Inspections',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
        description: 'High-definition 4K thermal drone inspection with zero roof foot-traffic damage.',
      },
      {
        title: 'Seamless Gutter Systems',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'Custom on-site extruded aluminum gutters designed for maximum rainfall runoff.',
      },
      {
        title: 'Commercial Flat Roofing',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
        description: 'Heat-welded TPO and EPDM membrane solutions for business properties.',
      },
      {
        title: 'Insulation & Ventilation',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
        description: 'Attic airflow balancing and energy-saving thermal barrier insulation.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    ],
  },

  plumbing_hvac: {
    id: 'plumbing_hvac',
    name: 'Plumbing, HVAC & Mechanical',
    category: 'Home Services',
    description: '24/7 emergency plumbing, air conditioning, furnace repairs, and clean air filtration.',
    hero: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: '24/7 Emergency Plumbing',
        image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
        description: 'Burst pipes, overflowing fixtures, and immediate water shut-off dispatch.',
      },
      {
        title: 'AC Installation & Repair',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
        description: 'High-efficiency heat pumps and precision central air conditioning systems.',
      },
      {
        title: 'Tankless Water Heaters',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
        description: 'Endless on-demand hot water units with up to 40% energy bill reduction.',
      },
      {
        title: 'Hydro-Jetting & Drain Snaking',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        description: 'High-pressure 4000 PSI water blasting to clear tree roots and line blockages.',
      },
      {
        title: 'Furnace & Heating Tune-Up',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        description: 'Comprehensive 25-point safety inspection and burner recalibration.',
      },
      {
        title: 'Whole-Home Water Filtration',
        image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
        description: 'Multi-stage reverse osmosis and water softening for clean drinking water.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    ],
  },

  detailing: {
    id: 'detailing',
    name: 'Auto Detailing & Ceramic Studio',
    category: 'Automotive',
    description: 'Precision auto detailing, paint correction, ceramic coatings, and premium window tinting.',
    hero: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Multi-Stage Paint Correction',
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
        description: 'Eliminates 90%+ of swirl marks, scratches, and oxidation under studio LED lighting.',
      },
      {
        title: '9H Ceramic Coating Protection',
        image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
        description: 'Hydrophobic glass-like shield with 5-year warrantied UV and chemical defense.',
      },
      {
        title: 'Deep Interior Steam & Sanitization',
        image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80',
        description: 'Hot-water extraction, leather conditioning, and ozone odor elimination.',
      },
      {
        title: 'Paint Protection Film (PPF)',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        description: 'Self-healing urethane armor for front bumpers, hoods, and high-impact areas.',
      },
      {
        title: 'Ceramic Window Tinting',
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
        description: 'Blocks 99% UV rays and 85% infrared heat without signal interference.',
      },
      {
        title: 'Wheels-Off Caliper & Rim Detail',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
        description: 'Brake dust de-ironing, barrel polish, and high-temperature rim ceramic coat.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    ],
  },

  legal: {
    id: 'legal',
    name: 'Legal Counsel & Law Firms',
    category: 'Professional Services',
    description: 'Corporate law, personal injury litigation, estate planning, and trial defense.',
    hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Corporate Governance & M&A',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        description: 'Bulletproof contract drafting, regulatory compliance, and cross-border deals.',
      },
      {
        title: 'Trial & Civil Litigation',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        description: 'Tenacious courtroom representation backed by rigorous forensic research.',
      },
      {
        title: 'High-Net-Worth Estate Planning',
        image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80',
        description: 'Living trusts, asset protection structures, and multi-generational succession.',
      },
      {
        title: 'Intellectual Property Protection',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
        description: 'Trademark defense, patent filing, and proprietary trade secret safeguards.',
      },
      {
        title: 'Employment & Labor Advisory',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        description: 'Executive compensation agreements and employee rights guidance.',
      },
      {
        title: 'Real Estate & Commercial Lease',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        description: 'Title dispute mediation, zoning advocacy, and closing representation.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    ],
  },

  real_estate: {
    id: 'real_estate',
    name: 'Luxury Real Estate & Development',
    category: 'Real Estate',
    description: 'Bespoke residential properties, high-rise developments, architectural estates, and property advisory.',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Prime Estate Acquisitions',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        description: 'Private off-market transactions and ultra-luxury residence brokerage.',
      },
      {
        title: 'Architectural Staging & Showcase',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        description: 'Couture interior curation to command top-of-market valuations.',
      },
      {
        title: 'Commercial Property Investment',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        description: 'Yield analysis and portfolio diversification across premium retail and tech hubs.',
      },
      {
        title: 'Exclusive Penthouse Portfolios',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        description: 'Skyline sanctuaries with panoramic views and bespoke concierge amenities.',
      },
      {
        title: 'International Buyer Representation',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        description: 'Seamless cross-border transaction structuring and legal escrow management.',
      },
      {
        title: 'Property Valuation & Advisory',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        description: 'Comprehensive market comps and forward appreciation forecasts.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    ],
  },

  fitness: {
    id: 'fitness',
    name: 'Fitness & Performance Training',
    category: 'Wellness & Fitness',
    description: 'High-performance gym facilities, private personal training, strength coaching, and mobility.',
    hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: '1-on-1 Precision Coaching',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
        description: 'Biomechanical movement screen and periodized strength programming.',
      },
      {
        title: 'High-Intensity Tactical Conditioning',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        description: 'Cardiovascular output acceleration with heart-rate zone tracking.',
      },
      {
        title: 'Nutritional Protocol & Macro Design',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
        description: 'Data-driven caloric and macronutrient roadmaps for body recomposition.',
      },
      {
        title: 'Mobility & Injury Prehabilitation',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
        description: 'Joint decompressions, soft-tissue work, and active recovery flows.',
      },
      {
        title: 'Small-Group Strength Cohorts',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        description: 'High-accountability squad training with dedicated rack stations.',
      },
      {
        title: 'Body Composition DXA Scans',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
        description: 'Clinical-grade visceral fat and lean muscle mass quantification.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    ],
  },

  restaurant_cafe: {
    id: 'restaurant_cafe',
    name: 'Artisan Cafe & Dining',
    category: 'Hospitality',
    description: 'Specialty coffee roasters, sourdough bakeries, farm-to-table bistros, and cocktail lounges.',
    hero: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Single-Origin Pour Over & Espresso',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
        description: 'Micro-lot beans roasted in-house with precise brew ratio extractions.',
      },
      {
        title: 'Handcrafted Sourdough & Pastries',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        description: '36-hour cold fermented doughs baked fresh every morning at 5 AM.',
      },
      {
        title: 'Farm-to-Table Seasonal Brunch',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        description: 'Locally-sourced organic eggs, heirloom greens, and artisanal cheeses.',
      },
      {
        title: 'Private Event Dining & Catering',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        description: 'Custom multi-course chef tasting menus for private celebrations.',
      },
      {
        title: 'Craft Cocktail & Botanical Bar',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
        description: 'House-made bitters, cold-pressed fruit syrups, and small-batch spirits.',
      },
      {
        title: 'Whole-Bean Coffee Subscription',
        image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80',
        description: 'Freshly roasted whole-bean bags delivered straight to your door.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    ],
  },

  salon_barber: {
    id: 'salon_barber',
    name: 'Salon, Barbershop & Aesthetics',
    category: 'Beauty & Personal Care',
    description: 'Precision haircutting, balayage colorists, luxury beard grooming, and facial aesthetics.',
    hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Precision Master Haircut',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        description: 'Tailored shear cutting designed to complement facial bone structure.',
      },
      {
        title: 'Custom Balayage & Gloss',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        description: 'Hand-painted dimensional highlights with damage-free bond builders.',
      },
      {
        title: 'Hot Towel Straight Razor Shave',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
        description: 'Traditional 3-step hot towel treatment with essential oils and cold finish.',
      },
      {
        title: 'Keratin Smoothing Treatment',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
        description: 'Zero-frizz restorative smoothing lasting up to 16 weeks.',
      },
      {
        title: 'Beard Sculpting & Conditioning',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
        description: 'Sharp razor edge-up, organic beard oil soak, and thermal styling.',
      },
      {
        title: 'Deep Scalp Detox & Massage',
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
        description: 'Exfoliating botanical scalp peel and pressure point relief.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    ],
  },

  consulting_b2b: {
    id: 'consulting_b2b',
    name: 'Consulting & Financial Advisory',
    category: 'B2B & Enterprise',
    description: 'Management consulting, CPA tax advisory, enterprise software, and growth strategy.',
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Executive Financial Auditing',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        description: 'Deep fiscal health checks and margin leak remediation.',
      },
      {
        title: 'Strategic Revenue Growth',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        description: 'Customer acquisition roadmap and enterprise sales enablement.',
      },
      {
        title: 'CFO-as-a-Service',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        description: 'Fractional executive leadership for fast-scaling growth ventures.',
      },
      {
        title: 'Operational Process Optimization',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
        description: 'Workflow automation and efficiency engineering across teams.',
      },
      {
        title: 'Risk Governance & Compliance',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
        description: 'SOC2, GDPR, and enterprise vendor security auditing.',
      },
      {
        title: 'Tax Mitigation Architecture',
        image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
        description: 'Proactive corporate structure optimization to retain peak capital.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    ],
  },

  general_business: {
    id: 'general_business',
    name: 'Universal Local Business',
    category: 'General',
    description: 'Clean, modern imagery suited for any retail storefront, modern studio, or service business.',
    hero: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    tilts: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    ],
    services: [
      {
        title: 'Premium Client Service',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        description: 'Dedicated attention to detail and personalized white-glove delivery.',
      },
      {
        title: 'Modern Consultation',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
        description: 'Direct 1-on-1 strategy sessions tailored to your exact requirements.',
      },
      {
        title: 'Verified Quality Guarantee',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        description: 'Backed by hundreds of verified 5-star customer reviews and satisfaction guarantee.',
      },
      {
        title: 'Rapid Turnaround Times',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        description: 'Fast, reliable execution without sacrificing precision or quality.',
      },
      {
        title: 'Bespoke Custom Solutions',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
        description: 'Every project crafted from the ground up for your specific goals.',
      },
      {
        title: 'Direct Lifetime Support',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        description: 'Always reachable by phone, WhatsApp, or in-person consultation.',
      },
    ],
    founder: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    facility: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    ],
  },
};

/**
 * Resolves the closest matching niche vault from any freeform niche or business query
 */
export function resolveVaultNiche(query: string): NicheVault {
  const q = (query || '').toLowerCase().trim();

  if (q.includes('dent') || q.includes('ortho') || q.includes('teeth') || q.includes('smile')) {
    return NICHE_VAULTS.dental;
  }
  if (q.includes('medic') || q.includes('clinic') || q.includes('doctor') || q.includes('dermatol') || q.includes('medspa')) {
    return NICHE_VAULTS.medical;
  }
  if (q.includes('roof') || q.includes('siding') || q.includes('gutter') || q.includes('shingle')) {
    return NICHE_VAULTS.roofing;
  }
  if (q.includes('plumb') || q.includes('hvac') || q.includes('pipe') || q.includes('heat') || q.includes('cool') || q.includes('air cond')) {
    return NICHE_VAULTS.plumbing_hvac;
  }
  if (q.includes('detail') || q.includes('tint') || q.includes('auto') || q.includes('ceramic') || q.includes('car wash') || q.includes('mechanic')) {
    return NICHE_VAULTS.detailing;
  }
  if (q.includes('law') || q.includes('legal') || q.includes('attorney') || q.includes('lawyer') || q.includes('counsel') || q.includes('litigat')) {
    return NICHE_VAULTS.legal;
  }
  if (q.includes('real estate') || q.includes('realtor') || q.includes('property') || q.includes('estate') || q.includes('villa') || q.includes('condo')) {
    return NICHE_VAULTS.real_estate;
  }
  if (q.includes('gym') || q.includes('fit') || q.includes('train') || q.includes('coach') || q.includes('crossfit') || q.includes('yoga') || q.includes('pilates')) {
    return NICHE_VAULTS.fitness;
  }
  if (q.includes('cafe') || q.includes('coffee') || q.includes('bake') || q.includes('restaur') || q.includes('food') || q.includes('bistro') || q.includes('bar')) {
    return NICHE_VAULTS.restaurant_cafe;
  }
  if (q.includes('salon') || q.includes('barber') || q.includes('hair') || q.includes('beauty') || q.includes('lash') || q.includes('nail') || q.includes('spa')) {
    return NICHE_VAULTS.salon_barber;
  }
  if (q.includes('consult') || q.includes('financ') || q.includes('cpa') || q.includes('account') || q.includes('advis') || q.includes('agency') || q.includes('b2b')) {
    return NICHE_VAULTS.consulting_b2b;
  }

  return NICHE_VAULTS.general_business;
}

/**
 * Returns summary catalog of all available niches
 */
export function listAllVaultNiches() {
  return Object.values(NICHE_VAULTS).map((v) => ({
    id: v.id,
    name: v.name,
    category: v.category,
    description: v.description,
    previewThumb: v.hero,
    serviceCount: v.services.length,
    galleryCount: v.gallery.length,
  }));
}
