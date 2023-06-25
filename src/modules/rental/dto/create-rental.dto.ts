import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsString, Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import {
  OfferDescriptionLimit,
  OFFER_IMAGES_LIMIT,
  OfferTitleLimit,
  OfferRoomsLimit,
  OfferGuestsLimit, OfferPriceLimit,
} from '../../../common/const';
import {Amenity, City, Coordinates, HouseType} from '../../../types/rental-offer';


export default class CreateRentalDto {
  @MinLength(OfferTitleLimit.MIN, {message: 'Minimum title length must be 10'})
  @MaxLength(OfferTitleLimit.MAX, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(OfferDescriptionLimit.MIN, {message: 'Minimum description length must be 20'})
  @MaxLength(OfferDescriptionLimit.MAX, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsEnum(City, {message: 'City must be one of the represented'})
  public city!: City;

  @IsString({message: 'Field "previewImage" must be a string'})
  public previewImage!: string;

  @IsArray({message: 'Field "mainImages" must be an array'})
  @ArrayMinSize(OFFER_IMAGES_LIMIT, {message: `Length of "mainImages" must be ${OFFER_IMAGES_LIMIT}`})
  @ArrayMaxSize(OFFER_IMAGES_LIMIT, {message: `Length of "mainImages" must be ${OFFER_IMAGES_LIMIT}`})
  @IsString({each: true, message: 'Each "mainImage" must be a string'})
  public mainImages!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsBoolean()
  public isFavorite!: boolean;

  @IsEnum(HouseType, {message: 'Field "housingType" must be a value from HouseType'})
  public housingType!: HouseType;

  @Min(OfferRoomsLimit.MIN, {message: `Minimum rooms number is ${OfferRoomsLimit.MIN}`})
  @Max(OfferRoomsLimit.MAX, {message: `Maximum rooms number is ${OfferRoomsLimit.MAX}`})
  public roomsCounter!: number;

  @Min(OfferGuestsLimit.MIN, {message: `Minimum guests number is ${OfferGuestsLimit.MIN}`})
  @Max(OfferGuestsLimit.MAX, {message: `Maximum guests number is ${OfferGuestsLimit.MAX}`})
  public guestsCounter!: number;

  @Min(OfferPriceLimit.MIN, {message: `Minimum price is ${OfferPriceLimit.MIN}`})
  @Max(OfferPriceLimit.MAX, {message: `Maximum price is ${OfferPriceLimit.MAX}`})
  public rentalCost!: number;

  @IsArray({message: 'Field "amenities" must be an array'})
  @IsEnum({each: true, message: 'Each "amenity" must be an element of Amenity enum'})
  public amenities!: Amenity[];

  public userId!: string;

  public coordinates!: Coordinates;
}
