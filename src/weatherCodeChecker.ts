// based on weathercode type

// 0		Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77		Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *		Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail

const weatherCodeChecker = (codeProp: number) => {
  if (codeProp === 0) return "Clear sky"
  if (codeProp === 1 || codeProp === 2 || codeProp === 3) return "Partly Cloudy"
  if (codeProp === 45 || codeProp === 48) return "Fog"
  if (codeProp === 51 || codeProp === 53 || codeProp === 55) return "Drizzle"
  if (codeProp === 56 || codeProp === 57) return "Freezing Drizzle"
  if (codeProp === 61 || codeProp === 63 || codeProp === 65) return "Rain"
  if (codeProp === 66 || codeProp === 67) return "Freezing Rain"
  if (codeProp === 71 || codeProp === 73 || codeProp === 75) return "Snow Fall"
  if (codeProp === 77) return "Snow Grains"
  if (codeProp === 80 || codeProp === 81 || codeProp === 82)
    return "Rain showers"
  if (codeProp === 85 || codeProp === 86) return "Snow showers"
  return "Thunderstorm"
}

export default weatherCodeChecker
