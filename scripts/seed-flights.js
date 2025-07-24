
import 'dotenv/config';

import { createClient } from '@supabase/supabase-js';

import { faker } from '@faker-js/faker';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Las variables de entorno SUPABASE_URL o SUPABASE_SERVICE_KEY no están configuradas.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false
    }
});


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

        // --- ✈️ Paso 5: Poblar la tabla 'flights' (Vuelos) ---
        console.log('✈️ Insertando vuelos...');
        const numFlights = 20; // Cantidad de vuelos a generar
        const flightsToInsert = [];
        // Generar datos para cada vuelo
        for (let i = 0; i < numFlights; i++) {
            const departureAirport = faker.airline.airport();
            let destinationAirport = faker.airline.airport();

            const classOptions = [
                { type: 'economy', minPrice: 100, maxPrice: 1000 },
                { type: 'business', minPrice: 1200, maxPrice: 3000 },
                { type: 'first_class', minPrice: 4000, maxPrice: 8000 },
            ];

            const selectedClass = faker.helpers.arrayElement(classOptions);
            const generatedPrice = faker.commerce.price({
                min: selectedClass.minPrice,
                max: selectedClass.maxPrice,
                dec: 2,
            });

            while (destinationAirport === departureAirport) {
                destinationAirport = faker.airline.airport();
            }

            const departureTime = faker.date.future({ years: 1 });
            const arrivalTime = faker.date.future({ years: 1, refDate: departureTime });

            flightsToInsert.push({
                id: faker.string.uuid(),
                departure_airport: departureAirport,
                destination_airport: destinationAirport,
                departure_at: departureTime.toISOString(),
                arrival_at: arrivalTime.toISOString(),
                flight_number: `${departureAirport.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
                airline: faker.airline.airline(),
                class_type: selectedClass.type,
                price: generatedPrice,
                // duration_minutes se puede calcular en la app, o añadir aquí si lo deseas
            });
        }
        // Insertar los vuelos
        const { data: insertedFlights, error: flightsError } = await supabase.from('flights').insert(flightsToInsert).select('id');
        if (flightsError) throw flightsError;
        console.log(`✅ ${numFlights} vuelos insertados.`);

        console.log('\n🎉 ¡Base de datos poblada exitosamente! 🎉');

    } catch (error) {
        // Manejo de errores general para cualquier problema durante el seeding
        console.error('❌ Error durante la inserción de datos:', error.message);
        process.exit(1); // Salir con un código de error
    } finally {

    }
}


seedDatabase();