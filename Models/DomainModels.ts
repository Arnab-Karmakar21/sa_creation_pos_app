export interface DomainState {
    cities: CityItem[];
    states: StateItem[];
    countries: CountryItem[];
    districts : DistrictItem[];
}

export interface DomainData {
    domain_code: number;
    domain_data_type: string;
    domain_id: number;
    domain_text: string;
    domain_type: string;
    domain_value: string;
}

export interface CityItem {
    city_code: string;
    city_id: number;
    city_name: string;
}

export interface StateItem {
    states_code: string;
    states_id: number;
    states_name: string;
}

export interface CountryItem {
    countries_code: string;
    countries_id: number;
    countries_name: string;
}

export interface DistrictItem { 
    district_id: number;
    district_name: string;
}