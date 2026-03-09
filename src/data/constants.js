export const DISTRIBUTORS = [
  { id: 1, name: 'AutoNorte CDMX', zones: ['Gustavo A. Madero', 'Azcapotzalco', 'Tlalnepantla', 'Ecatepec'], brands: ['Toyota', 'Honda'], color: '#71b248' },
  { id: 2, name: 'MotorSur Valle', zones: ['Coyoacán', 'Xochimilco', 'Tlalpan', 'Tláhuac'], brands: ['Nissan', 'Chevrolet', 'Volkswagen'], color: '#2d7dd2' },
  { id: 3, name: 'AutoOriente Max', zones: ['Iztapalapa', 'Iztacalco', 'Nezahualcóyotl', 'Chimalhuacán'], brands: ['Ford', 'Chevrolet', 'Kia'], color: '#d4850f' },
  { id: 4, name: 'PremiumWest MX', zones: ['Miguel Hidalgo', 'Cuajimalpa', 'Huixquilucan', 'Naucalpan'], brands: ['Toyota', 'Ford', 'Honda', 'Volkswagen'], color: '#9b59b6' },
];

export const RULES = [
  { icon: '📍', label: 'Zona coincide con distribuidor', pts: 25 },
  { icon: '🚘', label: 'Marca en portafolio del dist.', pts: 20 },
  { icon: '💰', label: 'Presupuesto ≥ $350k MXN', pts: 20 },
  { icon: '⚡', label: 'Compra en menos de 30 días', pts: 15 },
  { icon: '🏦', label: 'Enganche disponible', pts: 10 },
  { icon: '⭐', label: 'Fuente: Showroom o Referido', pts: 10 },
  { icon: '👤', label: 'Cliente previo', pts: 5 },
  { icon: '❌', label: 'Sin datos de contacto', pts: -20 },
  { icon: '⌛', label: 'Compra en más de 6 meses', pts: -15 },
  { icon: '📉', label: 'Presupuesto menor a $150k MXN', pts: -10 },
];

export const BRANDS = {
  Toyota: { models: ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Land Cruiser', 'Yaris'], icon: '🚗' },
  Nissan: { models: ['Versa', 'Sentra', 'X-Trail', 'Frontier', 'Kicks', 'Altima'], icon: '🚙' },
  Chevrolet: { models: ['Onix', 'Tracker', 'Equinox', 'Colorado', 'Trailblazer', 'Aveo'], icon: '🏎' },
  Ford: { models: ['Figo', 'Territory', 'Bronco Sport', 'F-150', 'Mustang', 'Escape'], icon: '🚘' },
  Honda: { models: ['City', 'Civic', 'CR-V', 'HR-V', 'Pilot', 'Accord'], icon: '🚗' },
  Volkswagen: { models: ['Vento', 'Virtus', 'Tiguan', 'T-Cross', 'Taos', 'Jetta'], icon: '🚙' },
  Kia: { models: ['Rio', 'Forte', 'Sportage', 'Sorento', 'Seltos', 'Telluride'], icon: '🚗' },
};

const NOMBRES = ['Carlos', 'Sofía', 'Luis', 'Ana', 'Roberto', 'María', 'Javier', 'Daniela', 'Fernando', 'Paola', 'Héctor', 'Carmen', 'Miguel', 'Laura', 'Ernesto', 'Valeria', 'Jorge', 'Isabela', 'Andrés', 'Natalia', 'Ricardo', 'Gabriela', 'Alejandro', 'Diana', 'Marco', 'Verónica', 'Pablo', 'Claudia', 'Sebastián', 'Adriana', 'Eduardo', 'Patricia', 'Rafael', 'Sandra', 'Arturo', 'Lucía', 'Rodrigo', 'Mónica', 'Diego', 'Fernanda', 'Guillermo', 'Silvia', 'Oscar', 'Elena', 'Enrique', 'Rosa', 'Alberto', 'Beatriz', 'Sergio', 'Alicia', 'Jesús', 'Irma', 'Manuel', 'Gloria', 'Mauricio', 'Esperanza', 'Lorenzo', 'Martha', 'Ignacio', 'Teresa', 'Salvador', 'Cristina', 'Raúl', 'Pilar', 'Rubén', 'Dolores', 'Alfredo', 'Elisa', 'Ramón', 'Yolanda', 'Tomás', 'Norma', 'Ernestina', 'Felipe', 'Susana', 'Octavio', 'Rebeca', 'Joaquín', 'Amalia', 'Gerardo', 'Josefina', 'Julio', 'Concepción', 'Hugo', 'Angélica', 'Pedro', 'Graciela', 'Ismael', 'Blanca', 'Francisco', 'Leticia', 'Víctor', 'Esther', 'David', 'Inés', 'Antonio', 'Lupita'];
const APELLIDOS = ['Mendoza', 'Ramírez', 'Torres', 'Gutiérrez', 'Ávila', 'Cruz', 'Morales', 'Soto', 'Ramos', 'Jiménez', 'Villanueva', 'López', 'Díaz', 'Hernández', 'Fuentes', 'García', 'Martínez', 'Rodríguez', 'Pérez', 'Sánchez', 'González', 'Flores', 'Rivera', 'Castillo', 'Reyes', 'Vega', 'Mora', 'Peña', 'Barrera', 'Ríos', 'Castro', 'Vargas', 'Ortiz', 'Ruiz', 'Navarro', 'Delgado', 'Núñez', 'Rojo', 'Aguilar', 'Guerrero', 'Luna', 'Medina', 'Salazar', 'Domínguez', 'Espinoza', 'Herrera', 'Bravo', 'Cabrera', 'Ibáñez', 'Lara'];
const ZONAS = ['Gustavo A. Madero', 'Azcapotzalco', 'Tlalnepantla', 'Ecatepec', 'Coyoacán', 'Xochimilco', 'Tlalpan', 'Tláhuac', 'Iztapalapa', 'Iztacalco', 'Nezahualcóyotl', 'Chimalhuacán', 'Miguel Hidalgo', 'Cuajimalpa', 'Huixquilucan', 'Naucalpan', 'Benito Juárez', 'Álvaro Obregón', 'Cuauhtémoc', 'Venustiano Carranza'];
const FUENTES = ['Showroom', 'Referido', 'Facebook Ads', 'Google Ads', 'Instagram', 'TikTok', 'Email Campaign', 'Walk-in', 'Llamada entrante', 'Agencia'];
const FINANC = ['Contado', 'Crédito bancario', 'Crédito agencia', 'Arrendamiento', 'Sin definir'];
const MARCA_LIST = Object.keys(BRANDS);

let seed = 42;
function seededRnd() {
  seed = (seed * 1664525 + 1013904223) & 0xffffffff;
  return (seed >>> 0) / 0xffffffff;
}
function srnd(arr) { return arr[Math.floor(seededRnd() * arr.length)]; }
function srndInt(a, b) { return Math.floor(seededRnd() * (b - a + 1)) + a; }

export function generateLeads() {
  const raw = [];
  const usedNames = new Set();
  for (let i = 1; i <= 100; i++) {
    let name;
    do {
      name = `${srnd(NOMBRES)} ${srnd(APELLIDOS)} ${srnd(APELLIDOS)}`;
    } while (usedNames.has(name));
    usedNames.add(name);
    const marca = srnd(MARCA_LIST);
    const modelo = srnd(BRANDS[marca].models);
    const zona = srnd(ZONAS);
    const hasContact = seededRnd() > 0.12;
    const email = hasContact ? (name.split(' ')[0].toLowerCase() + srndInt(10, 99) + '@' + srnd(['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com'])) : '';
    const phone = hasContact ? `55-${srndInt(1000, 9999)}-${srndInt(1000, 9999)}` : '';
    raw.push({
      id: i,
      name,
      email,
      phone,
      zona,
      marca,
      modelo,
      presupuesto: srndInt(80, 90) * 10000,
      diasCompra: srnd([3, 5, 7, 10, 14, 21, 30, 45, 60, 90, 120, 180, 240, 365]),
      enganche: seededRnd() > 0.45,
      fuente: srnd(FUENTES),
      financiamiento: srnd(FINANC),
      previoCliente: seededRnd() > 0.75,
    });
  }
  return raw;
}
