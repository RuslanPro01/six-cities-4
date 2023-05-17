import {RentalOffer} from '../types/rental-offer.js';

export function createOffer(offerData: string): RentalOffer {
  const [
    title,
    description,
    publishDate,
    city,
    previewImage,
    mainImages,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCounter,
    guestsCounter,
    cost,
    amenities,
    userId,
    numberComments,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const coordinatesArray = coordinates.split(';').map((coordinate) => parseFloat(coordinate));
  return {
    title,
    description,
    publishDate: new Date(publishDate),
    city: city,
    previewImage,
    mainImages: mainImages.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    type: type,
    roomsCounter: parseInt(roomsCounter, 10),
    guestsCounter: parseInt(guestsCounter, 10),
    cost: parseInt(cost, 10),
    amenities: amenities.split(';'),
    userId: parseInt(userId, 10),
    numberComments: parseInt(numberComments, 10),
    coordinates: {
      latitude: coordinatesArray[0],
      longitude: coordinatesArray[1]
    }
  } as RentalOffer;
}