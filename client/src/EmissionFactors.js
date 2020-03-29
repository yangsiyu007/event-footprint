

const emissionFactors = {
    // tCO2e per mile, four significant figures

    travelAtEvent: {
        motor_gasoline_passenger:  0.0003832 ,  // 'EF Hub'!$G$107
        diesel_fuel_medium_heavy_duty:  0.001023 , // 'EF Hub'!$G$102
        light_rail_and_tram: 0.03967/1000, // 'DEFRA Rail 2018'!$D$14/1000
    }
  }

export { emissionFactors }
