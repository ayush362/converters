"use client";
import React, { useState, useEffect } from "react";

const ComprehensiveUnitConverter = () => {
    const [category, setCategory] = useState("length");
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");

    // New state variables for API data
    const [currencies, setCurrencies] = useState({});
    const [lastCurrencyUpdate, setLastCurrencyUpdate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // API endpoints
    const CURRENCY_API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
    const TIMEZONE_API_URL = "http://worldtimeapi.org/api/timezone";

    // Fetch currency rates
    useEffect(() => {
        const fetchCurrencyRates = async () => {
            try {
                setLoading(true);
                const response = await fetch(CURRENCY_API_URL);
                const data = await response.json();
                setCurrencies(data.rates);
                setLastCurrencyUpdate(new Date().toLocaleString());
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch currency rates");
                setLoading(false);
            }
        };

        if (category === "currency") {
            fetchCurrencyRates();
        }
    }, [category]);

    // Add currency to categories
    const currencyCategory = {
        currency: {
            name: "Currency",
            units: currencies,
        },
    };

    // Add color conversion functions
    const colorConversions = {
        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
                hex
            );
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16),
                  }
                : null;
        },
        rgbToHex(r, g, b) {
            return (
                "#" +
                [r, g, b]
                    .map((x) => {
                        const hex = x.toString(16);
                        return hex.length === 1 ? "0" + hex : hex;
                    })
                    .join("")
            );
        },
        rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h,
                s,
                l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100),
            };
        },
    };

    // Add text encoding functions
    const textEncodings = {
        base64Encode: (text) => btoa(text),
        base64Decode: (text) => atob(text),
        urlEncode: (text) => encodeURIComponent(text),
        urlDecode: (text) => decodeURIComponent(text),
        asciiToText: (ascii) =>
            String.fromCharCode(
                ...ascii.split(",").map((num) => parseInt(num.trim()))
            ),
        textToAscii: (text) =>
            Array.from(text)
                .map((char) => char.charCodeAt(0))
                .join(", "),
    };

    // Add BMI calculation
    const calculateBMI = (weight, height, unit) => {
        if (unit === "metric") {
            return (weight / (height / 100) ** 2).toFixed(1);
        } else {
            return ((weight * 703) / height ** 2).toFixed(1);
        }
    };

    // Add pH calculations
    const pHCalculations = {
        pHtoH: (pH) => Math.pow(10, -pH),
        HtopH: (h) => -Math.log10(h),
        pHtopOH: (pH) => 14 - pH,
        pOHtopH: (pOH) => 14 - pOH,
    };

    const categories = {
        length: {
            name: "Length",
            units: {
                meter: 1,
                kilometer: 1000,
                centimeter: 0.01,
                millimeter: 0.001,
                inch: 0.0254,
                foot: 0.3048,
                yard: 0.9144,
                mile: 1609.344,
                nauticalMile: 1852,
                lightYear: 9.461e15,
                parsec: 3.086e16,
                astronomicalUnit: 1.496e11,
            },
        },
        weight: {
            name: "Weight/Mass",
            units: {
                gram: 1,
                kilogram: 1000,
                milligram: 0.001,
                metricTon: 1000000,
                ounce: 28.3495,
                pound: 453.592,
                stone: 6350.29,
                shortTon: 907185,
                longTon: 1016047,
                solarMass: 1.989e30,
                earthMass: 5.972e24,
            },
        },
        volume: {
            name: "Volume",
            units: {
                liter: 1,
                milliliter: 0.001,
                cubicMeter: 1000,
                gallon: 3.78541,
                quart: 0.946353,
                pint: 0.473176,
                cup: 0.236588,
                fluidOunce: 0.0295735,
                tablespoon: 0.0147868,
                teaspoon: 0.00492892,
                cubicFoot: 28.3168,
                cubicInch: 0.0163871,
            },
        },
        temperature: {
            name: "Temperature",
            units: {
                celsius: "C",
                fahrenheit: "F",
                kelvin: "K",
                gasmark: "G",
            },
        },
        area: {
            name: "Area",
            units: {
                squareMeter: 1,
                squareKilometer: 1000000,
                hectare: 10000,
                squareFoot: 0.092903,
                squareYard: 0.836127,
                acre: 4046.86,
                squareMile: 2589988.11,
            },
        },
        speed: {
            name: "Speed",
            units: {
                meterPerSecond: 1,
                kilometerPerHour: 0.277778,
                milePerHour: 0.44704,
                knot: 0.514444,
                footPerSecond: 0.3048,
            },
        },
        time: {
            name: "Time",
            units: {
                second: 1,
                minute: 60,
                hour: 3600,
                day: 86400,
                week: 604800,
                month: 2629746,
                year: 31556952,
                julianYear: 31557600,
            },
        },
        data: {
            name: "Data Storage",
            units: {
                bit: 1 / 8,
                byte: 1,
                kilobyte: 1024,
                megabyte: 1048576,
                gigabyte: 1073741824,
                terabyte: 1099511627776,
                petabyte: 1125899906842624,
            },
        },
        pressure: {
            name: "Pressure",
            units: {
                pascal: 1,
                kilopascal: 1000,
                bar: 100000,
                atmosphere: 101325,
                psi: 6894.76,
                torr: 133.322,
                mmHg: 133.322,
            },
        },
        energy: {
            name: "Energy",
            units: {
                joule: 1,
                kilojoule: 1000,
                calorie: 4.184,
                kilocalorie: 4184,
                wattHour: 3600,
                kilowattHour: 3600000,
                btu: 1055.06,
            },
        },
        power: {
            name: "Power",
            units: {
                watt: 1,
                kilowatt: 1000,
                horsepower: 745.7,
                btuPerHour: 0.29307,
            },
        },
        frequency: {
            name: "Frequency",
            units: {
                hertz: 1,
                kilohertz: 1000,
                megahertz: 1000000,
                gigahertz: 1000000000,
            },
        },
        angle: {
            name: "Angle",
            units: {
                degree: 1,
                radian: 57.2958,
                gradian: 0.9,
            },
        },
        fuelEconomy: {
            name: "Fuel Economy",
            units: {
                milesPerGallon: 1,
                litersPer100km: 235.215,
                kilometersPerLiter: 2.35215,
            },
        },
        force: {
            name: "Force",
            units: {
                newton: 1,
                poundForce: 4.44822,
                kilogramForce: 9.80665,
            },
        },
        density: {
            name: "Density",
            units: {
                kilogramPerCubicMeter: 1,
                gramPerCubicCentimeter: 1000,
                poundPerCubicFoot: 16.0185,
            },
        },
        flowRate: {
            name: "Flow Rate",
            units: {
                literPerSecond: 1,
                gallonPerMinute: 0.0630902,
                cubicMeterPerHour: 3.6,
            },
        },
        numberBase: {
            name: "Number Base",
            units: {
                decimal: "10",
                binary: "2",
                hexadecimal: "16",
                octal: "8",
            },
        },
        typography: {
            name: "Typography",
            units: {
                point: 1,
                pixel: 1.333333,
                em: 16,
                percent: 0.75,
            },
        },
        torque: {
            name: "Torque",
            units: {
                newtonMeter: 1,
                poundFoot: 1.35582,
                kilogramMeter: 9.80665,
            },
        },
        electricalUnits: {
            name: "Electrical Units",
            units: {
                ampere: 1,
                volt: 1,
                ohm: 1,
                watt: 1,
            },
        },
        radiation: {
            name: "Radiation",
            units: {
                sievert: 1,
                rem: 0.01,
                gray: 1,
                rad: 0.01,
            },
        },
        magnetic: {
            name: "Magnetic",
            units: {
                tesla: 1,
                gauss: 0.0001,
            },
        },
        viscosity: {
            name: "Viscosity",
            units: {
                pascalSecond: 1,
                poise: 0.1,
            },
        },
        luminance: {
            name: "Luminance",
            units: {
                lumen: 1,
                lux: 1,
                candela: 1,
            },
        },
        clothingSize: {
            name: "Clothing Size",
            units: {
                us: 1,
                uk: 1,
                eu: 1,
                international: 1,
            },
        },
        colorCode: {
            name: "Color Codes",
            units: {
                hex: "HEX",
                rgb: "RGB",
                hsl: "HSL",
            },
        },
        textEncoding: {
            name: "Text Encoding",
            units: {
                text: "Plain Text",
                base64: "Base64",
                url: "URL Encoded",
                ascii: "ASCII",
            },
        },
        bmi: {
            name: "BMI Calculator",
            units: {
                metric: "Metric (kg/cm)",
                imperial: "Imperial (lb/in)",
            },
        },
        ph: {
            name: "pH Calculations",
            units: {
                pH: "pH",
                h: "H+ Concentration",
                pOH: "pOH",
            },
        },
    };

    const convert = (value, from, to, category) => {
        if (!value || !from || !to) return "";

        const numValue = parseFloat(value);
        if (isNaN(numValue)) return "Invalid input";

        // Special handling for temperature
        if (category === "temperature") {
            if (from === to) return numValue;

            // Convert to Celsius first
            let celsius;
            if (from === "fahrenheit") {
                celsius = (numValue - 32) * (5 / 9);
            } else if (from === "kelvin") {
                celsius = numValue - 273.15;
            } else if (from === "gasmark") {
                celsius = numValue * 14 + 121;
            } else {
                celsius = numValue;
            }

            // Convert from Celsius to target unit
            if (to === "fahrenheit") {
                return (celsius * (9 / 5) + 32).toFixed(2);
            } else if (to === "kelvin") {
                return (celsius + 273.15).toFixed(2);
            } else if (to === "gasmark") {
                return ((celsius - 121) / 14).toFixed(2);
            }
            return celsius.toFixed(2);
        }

        // Special handling for number base conversions
        if (category === "numberBase") {
            const fromBase = parseInt(categories[category].units[from]);
            const toBase = parseInt(categories[category].units[to]);
            // Convert to decimal first, then to target base
            const decimal = parseInt(value.toString(), fromBase);
            return decimal.toString(toBase);
        }

        // Special handling for clothing sizes
        if (category === "clothingSize") {
            // This would need a lookup table for accurate conversions
            // Simplified example:
            const sizeChart = {
                us: { uk: 1.0, eu: 1.0, international: 1.0 },
                uk: { us: 1.0, eu: 1.0, international: 1.0 },
                eu: { us: 1.0, uk: 1.0, international: 1.0 },
                international: { us: 1.0, uk: 1.0, eu: 1.0 },
            };
            return (numValue * sizeChart[from][to]).toFixed(0);
        }
        if (category === "currency") {
            if (!currencies[from] || !currencies[to])
                return "Currency rates not available";
            const inUSD = parseFloat(value) / currencies[from];
            return (inUSD * currencies[to]).toFixed(2);
        }

        // Handle color code conversion
        if (category === "colorCode") {
            if (from === "hex" && to === "rgb") {
                const rgb = colorConversions.hexToRgb(value);
                return rgb
                    ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
                    : "Invalid HEX";
            }
            if (from === "rgb" && to === "hex") {
                const [r, g, b] = value
                    .replace(/[rgb\(\)]/g, "")
                    .split(",")
                    .map(Number);
                return colorConversions.rgbToHex(r, g, b);
            }
            if (from === "rgb" && to === "hsl") {
                const [r, g, b] = value
                    .replace(/[rgb\(\)]/g, "")
                    .split(",")
                    .map(Number);
                const hsl = colorConversions.rgbToHsl(r, g, b);
                return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            }
        }

        // Handle text encoding
        if (category === "textEncoding") {
            if (from === "text" && to === "base64")
                return textEncodings.base64Encode(value);
            if (from === "base64" && to === "text")
                return textEncodings.base64Decode(value);
            if (from === "text" && to === "url")
                return textEncodings.urlEncode(value);
            if (from === "url" && to === "text")
                return textEncodings.urlDecode(value);
            if (from === "text" && to === "ascii")
                return textEncodings.textToAscii(value);
            if (from === "ascii" && to === "text")
                return textEncodings.asciiToText(value);
        }

        // Handle BMI calculation
        if (category === "bmi") {
            const [weight, height] = value.split(",").map(Number);
            return calculateBMI(weight, height, from);
        }

        // Handle pH calculations
        if (category === "ph") {
            const num = parseFloat(value);
            if (from === "pH" && to === "h")
                return pHCalculations.pHtoH(num).toExponential(2);
            if (from === "h" && to === "pH")
                return pHCalculations.HtopH(num).toFixed(2);
            if (from === "pH" && to === "pOH")
                return pHCalculations.pHtopOH(num).toFixed(2);
            if (from === "pOH" && to === "pH")
                return pHCalculations.pOHtopH(num).toFixed(2);
        }

        // For other units, use conversion factors
        const categoryUnits = categories[category].units;
        const result = (numValue * categoryUnits[from]) / categoryUnits[to];
        return result.toFixed(6);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setFromUnit("");
        setToUnit("");
        setResult("");
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Comprehensive Unit Converter
            </h1>

            <div className="space-y-4">
                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        className="w-full p-2 border rounded-md bg-white"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        {Object.entries(categories).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value.name}
                            </option>
                        ))}
                    </select>
                    {category === "currency" && lastCurrencyUpdate && (
                        <div className="text-sm text-gray-500 mb-4">
                            Last updated: {lastCurrencyUpdate}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* From Unit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From
                        </label>
                        <select
                            className="w-full p-2 border rounded-md bg-white mb-2"
                            value={fromUnit}
                            onChange={(e) => {
                                setFromUnit(e.target.value);
                                if (inputValue && toUnit) {
                                    setResult(
                                        convert(
                                            inputValue,
                                            e.target.value,
                                            toUnit,
                                            category
                                        )
                                    );
                                }
                            }}
                        >
                            <option value="">Select unit</option>
                            {Object.keys(categories[category].units).map(
                                (unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                )
                            )}
                        </select>
                        <input
                            type="text"
                            placeholder="Enter value"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                if (fromUnit && toUnit) {
                                    setResult(
                                        convert(
                                            e.target.value,
                                            fromUnit,
                                            toUnit,
                                            category
                                        )
                                    );
                                }
                            }}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    {/* To Unit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To
                        </label>
                        <select
                            className="w-full p-2 border rounded-md bg-white mb-2"
                            value={toUnit}
                            onChange={(e) => {
                                setToUnit(e.target.value);
                                if (inputValue && fromUnit) {
                                    setResult(
                                        convert(
                                            inputValue,
                                            fromUnit,
                                            e.target.value,
                                            category
                                        )
                                    );
                                }
                            }}
                        >
                            <option value="">Select unit</option>
                            {Object.keys(categories[category].units).map(
                                (unit) => (
                                    <option key={unit} value={unit}>
                                        {unit}
                                    </option>
                                )
                            )}
                        </select>
                        <input
                            type="text"
                            readOnly
                            value={result}
                            className="w-full p-2 border rounded-md bg-gray-50"
                            placeholder="Result"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComprehensiveUnitConverter;
