import { StaticImageData } from 'next/image';

import metLifeStadium from '@/assets/images/stadiums/MetLife Stadium.jpg';
import attStadium from '@/assets/images/stadiums/AT&T Stadium.webp';
import soFiStadium from '@/assets/images/stadiums/SoFi Stadium.webp';
import levisStadium from '@/assets/images/stadiums/Levis Stadium.webp';
import mercedesBenzStadium from '@/assets/images/stadiums/Mercedes-Benz Stadium.webp';
import arrowheadStadium from '@/assets/images/stadiums/Arrowhead Stadium.webp';
import lincolnFinancialField from '@/assets/images/stadiums/Lincoln Financial Field.webp';
import gilletteStadium from '@/assets/images/stadiums/Gillette Stadium.webp';
import hardRockStadium from '@/assets/images/stadiums/Hard Rock Stadium.webp';
import nrgStadium from '@/assets/images/stadiums/NRG Stadium.webp';
import lumenField from '@/assets/images/stadiums/Lumen Field.webp';
import bcPlace from '@/assets/images/stadiums/BC Place.webp';
import bmoField from '@/assets/images/stadiums/BMO Field.webp';
import estadioAzteca from '@/assets/images/stadiums/Estadio Azteca.jpg';
import estadioAkron from '@/assets/images/stadiums/Estadio Akron.webp';
import estadioBbva from '@/assets/images/stadiums/Estadio BBVA.webp';

export const stadiumImages: Record<string, StaticImageData> = {
  'MetLife Stadium': metLifeStadium,
  'AT&T Stadium': attStadium,
  'SoFi Stadium': soFiStadium,
  "Levis Stadium": levisStadium,
  'Mercedes-Benz Stadium': mercedesBenzStadium,
  'Arrowhead Stadium': arrowheadStadium,
  'Lincoln Financial Field': lincolnFinancialField,
  'Gillette Stadium': gilletteStadium,
  'Hard Rock Stadium': hardRockStadium,
  'NRG Stadium': nrgStadium,
  'Lumen Field': lumenField,
  'BC Place': bcPlace,
  'BMO Field': bmoField,
  'Estadio Azteca': estadioAzteca,
  'Estadio Akron': estadioAkron,
  'Estadio BBVA': estadioBbva,
};
