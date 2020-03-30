

const emissionFactors = {
    // tCO2e per mile, four significant figures
    // using _ to separate words for easier reading

    motor_gasoline_passenger: 0.0003832,        // 'EF Hub'!$G$107
    diesel_fuel_medium_heavy_duty: 0.001023,    // 'EF Hub'!$G$102
    
    rail_light_rail_and_tram: 0.03967 / 1000,   // 'DEFRA Rail 2018'!$D$14/1000 - Wrong unit
    rail_national: 0.07120 / 1000,              // 'DEFRA Rail 2018'!$I$12/1000

    air_short_haul: 0.2536 / 1000,              // 'DEFRA Air 2018'!$M9/1000
  
    air_mid_haul_average: 0.1380 / 1000,        // 'DEFRA Air 2018'!$M10/1000
    air_mid_haul_economy: 0.1357 / 1000,        // 'DEFRA Air 2018'!$M11/1000
    air_mid_haul_business: 0.2036/ 1000,        // 'DEFRA Air 2018'!$M12/1000
    
    air_long_haul_average: 0.1807/ 1000,        // 'DEFRA Air 2018'!$M13/1000
    air_long_haul_economy: 0.1384/ 1000,        // 'DEFRA Air 2018'!$M14/1000
    air_long_haul_premium_econ: 0.2214/ 1000,   // 'DEFRA Air 2018'!$M15/1000
    air_long_haul_business: 0.4013/ 1000,       // 'DEFRA Air 2018'!$M16/1000
    air_long_haul_first: 0.5535/ 1000,          // 'DEFRA Air 2018'!$M17/1000

  }

export { emissionFactors }
