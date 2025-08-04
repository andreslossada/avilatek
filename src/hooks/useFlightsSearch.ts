// 🎭 Hook personalizado para extraer la lógica si crece mucho
export function useFlightSearch() {
    const [searchData, setSearchData] = useState<FlightSearchData>({
        departureCity: '',
        destinationCity: '',
        departureDate: null,
        returnDate: null,
        flightClass: 'economy',
        numberOfTravelers: 1,
    });

    const [searchResults, setSearchResults] = useState<SearchResults>({
        flights: [],
        isLoading: false,
        error: null,
        hasSearched: false,
    });

    // Funciones del hook...
    const updateSearchData = (updates: Partial<FlightSearchData>) => {
        setSearchData((prev) => ({ ...prev, ...updates }));
    };

    const resetSearch = () => {
        setSearchData({
            departureCity: '',
            destinationCity: '',
            departureDate: null,
            returnDate: null,
            flightClass: 'economy',
            numberOfTravelers: 1,
        });
        setSearchResults({
            flights: [],
            isLoading: false,
            error: null,
            hasSearched: false,
        });
    };

    return {
        searchData,
        searchResults,
        updateSearchData,
        setSearchResults,
        resetSearch,
    };
}
