import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
// Class provider
class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// Factory function provider
@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  controllers: [
    CoffeesController
  ],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === 'development' ?
      DevelopmentConfigService : ConfigService
    },
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ....');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        console.log('!Async factory');
        return coffeeBrands;
      },
      inject: [Connection]
    }
  ],
  exports: [
    CoffeesService,
  ],
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ]
})
export class CoffeesModule { }
