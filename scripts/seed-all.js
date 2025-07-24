// scripts/seed.js

// 🚀 Paso 1: Importar librerías necesarias
// Para cargar tus variables de entorno desde el archivo .env
import 'dotenv/config';
// El cliente de Supabase para interactuar con tu base de datos
import { createClient } from '@supabase/supabase-js';
// Para generar datos falsos y realistas (nombres, fechas, UUIDs, etc.)
import { faker } from '@faker-js/faker';

// 🎯 Paso 2: Configurar el cliente de Supabase
// Obtener la URL de tu proyecto Supabase desde las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Obtener la clave de rol de servicio (SERVICE_ROLE_KEY) desde las variables de entorno.
// ¡Esta clave tiene permisos de administrador y debe mantenerse SECRETA!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Verificar que las variables de entorno cruciales estén cargadas
if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Las variables de entorno SUPABASE_URL o SUPABASE_SERVICE_KEY no están configuradas.');
    // Si falta alguna clave, el script termina aquí
    process.exit(1);
}

// Inicializar el cliente de Supabase con la URL y la clave de servicio
// 'persistSession: false' es bueno para scripts, no necesitamos manejar sesiones de usuario.
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false
    }
});

// 🚀 Paso 3: Función principal para poblar la base de datos
async function seedDatabase() {
    try {
        console.log('✨ Iniciando el proceso de poblar la base de datos...');

        // Opcional: Borrar todos los datos existentes para empezar desde cero
        // ¡Ten mucho cuidado con estas líneas en producción!
        // Se usa 'neq('id', '000...')' como un truco simple para "borrar todo"
        // en lugar de un 'delete()' vacío, que RLS a veces restringe sin una política DELETE ALL.
        console.log('🗑️ Borrando datos existentes...');
        await supabase.from('favorite_flights').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('travelers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('flights').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        console.log('✅ Datos existentes borrados.');

        // --- 🎯 Paso 4: Poblar la tabla 'profiles' (Perfiles de Usuario) ---
        console.log('👨‍👩‍👧‍👦 Insertando perfiles...');
        const numProfiles = 50; // Cantidad de perfiles a generar
        const profilesToInsert = [];
        // Generar datos para cada perfil
        for (let i = 0; i < numProfiles; i++) {
            profilesToInsert.push({
                id: faker.string.uuid(), // Genera un ID único (UUID) para cada perfil
                username: faker.internet.userName(),
                full_name: faker.person.fullName(),
                avatar_url: faker.image.avatar(),
            });
        }
        // Insertar los perfiles y seleccionar los IDs que fueron insertados
        const { data: insertedProfiles, error: profilesError } = await supabase.from('profiles').insert(profilesToInsert).select('id');
        if (profilesError) throw profilesError;
        // Guardar solo los IDs de los perfiles para usarlos como claves foráneas más tarde
        const profileIds = insertedProfiles.map(p => p.id);
        console.log(`✅ ${numProfiles} perfiles insertados.`);

        // --- ✈️ Paso 5: Poblar la tabla 'flights' (Vuelos) ---
        console.log('✈️ Insertando vuelos...');
        const numFlights = 100; // Cantidad de vuelos a generar
        const flightsToInsert = [];
        const airportCodes = ['MAD', 'LAX', 'LHR', 'CDG', 'GRU', 'MIA', 'JFK', 'ORD', 'DFW', 'MEX', 'CCS', 'BOG', 'LIM'];
        // Generar datos para cada vuelo
        for (let i = 0; i < numFlights; i++) {
            const departureAirport = faker.helpers.arrayElement(airportCodes);
            let destinationAirport = faker.helpers.arrayElement(airportCodes);
            // Asegurarse de que el destino no sea igual al origen
            while (destinationAirport === departureAirport) {
                destinationAirport = faker.helpers.arrayElement(airportCodes);
            }

            const departureTime = faker.date.future({ years: 1 });
            const arrivalTime = faker.date.future({ years: 1, refDate: departureTime });

            flightsToInsert.push({
                id: faker.string.uuid(), // Genera un ID único (UUID) para cada vuelo
                departure_airport_code: departureAirport,
                destination_airport_code: destinationAirport,
                departure_at: departureTime.toISOString(),
                arrival_at: arrivalTime.toISOString(),
                // Simular precios diferentes para cada clase, o nulo si no se ofrece
                price_economy: faker.commerce.price({ min: 100, max: 1000, dec: 2 }),
                price_business: faker.datatype.boolean() ? faker.commerce.price({ min: 1200, max: 3000, dec: 2 }) : null,
                price_first_class: faker.datatype.boolean() ? faker.commerce.price({ min: 4000, max: 8000, dec: 2 }) : null,
                flight_number: faker.string.alphanumeric({ length: { min: 4, max: 6 }, casing: 'upper' }),
                airline: faker.company.name(),
                // duration_minutes se puede calcular en la app, o añadir aquí si lo deseas
            });
        }
        // Insertar los vuelos y seleccionar los IDs
        const { data: insertedFlights, error: flightsError } = await supabase.from('flights').insert(flightsToInsert).select('id');
        if (flightsError) throw flightsError;
        // Guardar los IDs de los vuelos para usarlos como claves foráneas
        const flightIds = insertedFlights.map(f => f.id);
        console.log(`✅ ${numFlights} vuelos insertados.`);

        // --- 🎟️ Paso 6: Poblar la tabla 'bookings' (Reservas) ---
        console.log('🎟️ Insertando reservas...');
        const numBookings = 70; // Cantidad de reservas a generar
        const bookingsToInsert = [];
        const flightClasses = ['Economy', 'Business', 'First Class'];
        // Generar datos para cada reserva
        for (let i = 0; i < numBookings; i++) {
            // ✨ CLAVES FORÁNEAS ✨: Seleccionar IDs aleatorios de los perfiles y vuelos ya creados
            const randomProfileId = faker.helpers.arrayElement(profileIds);
            const randomFlightId = faker.helpers.arrayElement(flightIds);
            const selectedClass = faker.helpers.arrayElement(flightClasses);

            bookingsToInsert.push({
                id: faker.string.uuid(), // ID único para la reserva
                user_id: randomProfileId,   // ID del perfil que hace la reserva
                flight_id: randomFlightId,  // ID del vuelo reservado
                booking_date: faker.date.recent({ days: 30 }).toISOString(),
                number_of_travelers: faker.number.int({ min: 1, max: 4 }),
                total_price: faker.commerce.price({ min: 100, max: 4000, dec: 2 }),
                flight_class_booked: selectedClass,
                status: faker.helpers.arrayElement(['confirmed', 'pending', 'cancelled', 'completed']),
            });
        }
        // Insertar las reservas y seleccionar sus IDs
        const { data: insertedBookings, error: bookingsError } = await supabase.from('bookings').insert(bookingsToInsert).select('id, user_id, number_of_travelers'); // También necesitamos user_id y travelers para la siguiente tabla
        if (bookingsError) throw bookingsError;
        // Guardar los IDs de las reservas para los viajeros
        const bookingDetails = insertedBookings; // Guardamos el objeto completo para tener travelers_count y user_id
        console.log(`✅ ${numBookings} reservas insertadas.`);

        // --- 👥 Paso 7: Poblar la tabla 'travelers' (Viajeros) ---
        console.log('👥 Insertando viajeros...');
        const travelersToInsert = [];
        const documentTypes = ['Passport', 'ID Card', 'Visa'];
        // Iterar sobre cada reserva para añadir sus viajeros
        for (const booking of bookingDetails) {
            for (let i = 0; i < booking.number_of_travelers; i++) {
                travelersToInsert.push({
                    id: faker.string.uuid(), // ID único para el viajero
                    booking_id: booking.id, // ✨ CLAVE FORÁNEA ✨: ID de la reserva a la que pertenece
                    full_name: faker.person.fullName(),
                    date_of_birth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).toISOString().split('T')[0], // Solo fecha
                    document_type: faker.helpers.arrayElement(documentTypes),
                    document_number: faker.string.alphanumeric(10).toUpperCase(),
                    // El primer viajero en la lista de una reserva es el principal
                    is_primary_traveler: i === 0,
                });
            }
        }
        // Insertar los viajeros
        const { error: travelersError } = await supabase.from('travelers').insert(travelersToInsert);
        if (travelersError) throw travelersError;
        console.log(`✅ ${travelersToInsert.length} viajeros insertados.`);

        // --- ⭐ Paso 8: Poblar la tabla 'favorite_flights' (Vuelos Favoritos) ---
        console.log('⭐ Insertando vuelos favoritos...');
        const numFavoriteFlights = 40; // Cantidad de favoritos a generar
        const favoriteFlightsToInsert = [];
        // Generar datos para cada favorito
        for (let i = 0; i < numFavoriteFlights; i++) {
            // ✨ CLAVES FORÁNEAS ✨: Seleccionar IDs aleatorios de perfiles y vuelos
            const randomProfileId = faker.helpers.arrayElement(profileIds);
            const randomFlightId = faker.helpers.arrayElement(flightIds);

            favoriteFlightsToInsert.push({
                user_id: randomProfileId, // ID del usuario
                flight_id: randomFlightId, // ID del vuelo favorito
                // created_at se genera automáticamente por el DEFAULT NOW()
            });
        }
        // Insertar los vuelos favoritos
        const { error: favoriteFlightsError } = await supabase.from('favorite_flights').insert(favoriteFlightsToInsert);
        if (favoriteFlightsError) {
            // Los errores de clave primaria combinada (duplicados) son normales aquí, no detienen el script
            if (favoriteFlightsError.code === '23505') {
                console.warn('⚠️ Se detectaron e ignoraron algunos intentos de insertar favoritos duplicados.');
            } else {
                throw favoriteFlightsError; // Lanzar otros errores
            }
        }
        console.log(`✅ ${numFavoriteFlights} intentos de vuelos favoritos procesados.`);

        console.log('\n🎉 ¡Base de datos poblada exitosamente! 🎉');

    } catch (error) {
        // Manejo de errores general para cualquier problema durante el seeding
        console.error('❌ Error durante la inserción de datos:', error.message);
        process.exit(1); // Salir con un código de error
    } finally {
        // Si usaras una conexión de base de datos que necesita ser cerrada explícitamente, iría aquí.
        // Con el cliente de Supabase, no es estrictamente necesario en un script simple.
    }
}

// 🚀 Paso 9: Ejecutar la función de seeding
seedDatabase();