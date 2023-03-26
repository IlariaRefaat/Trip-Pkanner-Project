import { CityDto } from "./CityDto";

export interface RestaurantDto {
    id: number;
    restaurantCode: string;
    label: string;
    city: CityDto;
    address: string;
    phone: string;
    website: string;
    food: string;
    rating: number;
    email: string;
    long: number;
    lat: number;
    avgMealPerPerson: number;
    imageUrl: string;
}