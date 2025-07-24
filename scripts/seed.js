
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
});

async function seedDatabaseLimited() {
    try {
        console.log('Iniciando inserción limitada de datos...');

        // --- PASO 1: Insertar un Perfil ---
        const user1Id = faker.string.uuid(); // Genera un UUID para el primer usuario
        const profileData = {
            id: user1Id,
            username: 'testuser1',
            full_name: 'Usuario de Prueba Uno',
            avatar_url: faker.image.avatar(),
        };
        const { data: profileResult, error: profileError } = await supabase.from('profiles').insert([profileData]);
        if (profileError) throw profileError;
        console.log('Perfil insertado:', profileResult);

        // --- PASO 2: Insertar un Vuelo ---
        const flight1Id = faker.string.uuid(); // Genera un UUID para el primer vuelo
        const flightData = {
            id: flight1Id,
            departure_airport_code: 'CCS',
            destination_airport_code: 'MIA',
            departure_at: '2025-09-10T10:00:00-04:00', // Ejemplo de fecha y hora con zona horaria
            arrival_at: '2025-09-10T14:00:00-04:00',
            price_economy: 350.75,
            price_business: 800.00, // Con valor
            price_first_class: null, // Sin valor (nullable)
            flight_number: 'AA123',
            airline: 'American Airlines',
        };
        const { data: flightResult, error: flightError } = await supabase.from('flights').insert([flightData]);
        if (flightError) throw flightError;
        console.log('Vuelo insertado:', flightResult);

        // --- PASO 3: Insertar una Reserva (usando los IDs generados arriba) ---
        const booking1Id = faker.string.uuid(); // Genera un UUID para la reserva
        const bookingData = {
            id: booking1Id,
            user_id: user1Id,   // ✨ Clave Foránea: ID del perfil insertado
            flight_id: flight1Id, // ✨ Clave Foránea: ID del vuelo insertado
            booking_date: new Date().toISOString(),
            number_of_travelers: 2,
            total_price: 701.50, // 2 * 350.75
            flight_class_booked: 'Economy',
            status: 'confirmed',
        };
        const { data: bookingResult, error: bookingError } = await supabase.from('bookings').insert([bookingData]);
        if (bookingError) throw bookingError;
        console.log('Reserva insertada:', bookingResult);

        // --- PASO 4: Insertar Viajeros (usando el ID de la reserva) ---
        const traveler1Id = faker.string.uuid();
        const traveler2Id = faker.string.uuid();
        const travelersData = [
            {
                id: traveler1Id,
                booking_id: booking1Id, // ✨ Clave Foránea: ID de la reserva insertada
                full_name: 'Juan Pérez',
                date_of_birth: '1990-05-15',
                document_type: 'Passport',
                document_number: 'P1234567',
                is_primary_traveler: true,
            },
            {
                id: traveler2Id,
                booking_id: booking1Id, // ✨ Clave Foránea: ID de la reserva insertada
                full_name: 'María García',
                date_of_birth: '1992-11-20',
                document_type: 'ID Card',
                document_number: 'V-87654321',
                is_primary_traveler: false,
            },
        ];
        const { data: travelersResult, error: travelersError } = await supabase.from('travelers').insert(travelersData);
        if (travelersError) throw travelersError;
        console.log('Viajeros insertados:', travelersResult);

        // --- PASO 5: Insertar un Vuelo Favorito (usando IDs de perfil y vuelo) ---
        const favoriteFlightData = {
            user_id: user1Id,   // ✨ Clave Foránea: ID del perfil insertado
            flight_id: flight1Id, // ✨ Clave Foránea: ID del vuelo insertado
        };
        const { data: favoriteResult, error: favoriteError } = await supabase.from('favorite_flights').insert([favoriteFlightData]);
        if (favoriteError) throw favoriteError;
        console.log('Vuelo favorito insertado:', favoriteResult);


        console.log('Inserción datos completada.');

    } catch (error) {
        console.error('Error durante la inserción de datos:', error.message);
        process.exit(1); // Salir con error
    } finally {
        // Si usas un cliente de base de datos que necesita cerrar la conexión
        // (no es estrictamente necesario con el cliente de Supabase en un script simple)
        // await supabase.disconnect();
    }
}

// seedDatabaseLimited();
seedDatabaseLimited().catch(console.error);